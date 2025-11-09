// pages/api/candidatura.js
import fs from "fs";
import path from "path";
import formidable from "formidable";
import nodemailer from "nodemailer";

export const config = {
  api: { bodyParser: false, responseLimit: false },
  runtime: "nodejs",
};

const ALLOWED_MIME = new Set([
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
]);
const MAX_TOTAL_ATTACH = 12 * 1024 * 1024; // 12MB totali

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method Not Allowed" });
  try {
    const { fields, files, totalSize } = await parseMultipart(req);

    // honeypot lato server
    if (fields.website) return res.status(200).json({ ok: true });

    if (totalSize > MAX_TOTAL_ATTACH) {
      return res.status(413).json({ error: "Allegati troppo pesanti (max 12MB in totale)" });
    }

    const info = await sendMail({ fields, files });
    return res.status(200).json({ ok: true, id: info.messageId });
  } catch (err) {
    console.error("API /candidatura error:", err);
    return res.status(500).json({ error: "Impossibile inviare la candidatura" });
  }
}

function parseMultipart(req) {
  const uploadDir = path.join(process.cwd(), "tmp");
  if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

  const form = formidable({
    multiples: true,
    uploadDir,
    keepExtensions: true,
    maxFileSize: 15 * 1024 * 1024, // 15MB per file
  });

  return new Promise((resolve, reject) => {
    form.parse(req, (err, fields, files) => {
      if (err) return reject(err);
      const fArr = [];
      let total = 0;
      for (const key of Object.keys(files)) {
        const val = files[key];
        const arr = Array.isArray(val) ? val : [val];
        for (const file of arr) {
          if (!file || !file.filepath) continue;
          if (file.mimetype && !ALLOWED_MIME.has(file.mimetype)) continue;
          try { total += fs.statSync(file.filepath).size; } catch {}
          fArr.push(file);
        }
      }
      resolve({ fields, files: fArr, totalSize: total });
    });
  });
}

async function sendMail({ fields, files }) {
  const {
    SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, SMTP_SECURE = "true",
    HR_MAIL_TO, HR_MAIL_FROM = SMTP_USER, HR_MAIL_BCC,
  } = process.env;

  if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASS || !HR_MAIL_TO) {
    throw new Error("Missing SMTP/HR env vars");
  }

  const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(SMTP_PORT),
    secure: String(SMTP_SECURE) === "true",
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  });

  const kind = firstVal(fields.kind) || "Candidatura";
  const who = [firstVal(fields.nome), firstVal(fields.cognome)].filter(Boolean).join(" ") || "Anonimo";

  const plain = formatPlain(fields);
  const html = formatHtml(fields);

  const attachments = (files || []).map((f) => ({
    filename: f.originalFilename || path.basename(f.filepath),
    content: fs.createReadStream(f.filepath),
    contentType: f.mimetype,
  }));

  const info = await transporter.sendMail({
    from: HR_MAIL_FROM,
    to: HR_MAIL_TO,
    bcc: HR_MAIL_BCC || undefined,
    subject: `[Casa Corporation] ${kind} — ${who}`,
    text: plain,
    html,
    attachments,
  });

  // cleanup best-effort
  try { for (const f of files || []) fs.unlink(f.filepath, () => {}); } catch {}
  return info;
}

function firstVal(v) { return Array.isArray(v) ? v[0] : v; }

function formatPlain(fields) {
  const hidden = new Set(["privacy", "kind", "website"]);
  const lines = ["Nuova candidatura ricevuta:", ""];
  for (const key of Object.keys(fields)) {
    if (hidden.has(key)) continue;
    const val = firstVal(fields[key]);
    lines.push(`${key}: ${val}`);
  }
  return lines.join("\n");
}

function formatHtml(fields) {
  const hidden = new Set(["privacy", "kind", "website"]);
  const rows = Object.keys(fields)
    .filter((k) => !hidden.has(k))
    .map((k) => {
      const v = firstVal(fields[k]);
      return `<tr>
        <td style="padding:6px 10px;border:1px solid #e5e7eb;background:#0f1428;color:#fff;">${escapeHtml(k)}</td>
        <td style="padding:6px 10px;border:1px solid #e5e7eb;color:#111827;background:#f9fafb;">${escapeHtml(String(v))}</td>
      </tr>`;
    }).join("");
  return `
    <div style="font-family:ui-sans-serif,system-ui,Segoe UI,Roboto,Helvetica,Arial;">
      <h2 style="margin:0 0 8px">Nuova candidatura</h2>
      <table style="border-collapse:collapse;font-size:14px;min-width:420px">${rows}</table>
      <p style="font-size:12px;color:#6b7280">Allegati inclusi in questa email.</p>
    </div>`;
}

function escapeHtml(s) {
  return s
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}
