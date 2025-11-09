// components/candidatura/CandidaturaModal.jsx
"use client";

import React from "react";

export default function CandidaturaModal({ open = false, kind = "agenti", onClose = () => {} }) {
  const refBackdrop = React.useRef(null);
  const refScroll = React.useRef(null);
  const [sending, setSending] = React.useState(false);
  const [msg, setMsg] = React.useState(null);

  // ESC per chiudere
  React.useEffect(() => {
    const onKey = (e) => { if (e.key === "Escape") onClose(); };
    if (open) document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  // 🔧 PATCH: solo scroll-lock del body (niente inert/pointer-events su #__next)
  React.useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = prev; };
  }, [open]);

  const onBackdrop = (e) => { if (e.target === refBackdrop.current) onClose(); };

  const Title = {
    agenti: "Candidatura — Agente Immobiliare",
    back: "Candidatura — Back Office",
    spontanea: "Candidatura Spontanea",
    collabo: "Richiedi Collaborazione",
  }[kind] || "Candidatura";

  async function onSubmit(e) {
    e.preventDefault();
    setMsg(null);
    try {
      setSending(true);
      const fd = new FormData(e.currentTarget);
      if (fd.get("website")) { setSending(false); onClose(); return; } // honeypot
      fd.append("kind", Title);
      const res = await fetch("/api/candidatura", { method: "POST", body: fd });
      const out = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(out?.error || "Errore invio");
      setMsg({ type: "success", text: "Candidatura inviata correttamente. Ti ricontatteremo a breve." });
      e.currentTarget.reset();
    } catch (err) {
      setMsg({ type: "error", text: err.message || "Invio non riuscito" });
    } finally {
      setSending(false);
    }
  }

  if (!open) return null;

  return (
    <div
      ref={refBackdrop}
      onClick={onBackdrop}
      className="fixed inset-0 z-[2147483647] flex items-center justify-center bg-black/70 overscroll-contain overflow-x-hidden"
      role="dialog"
      aria-modal="true"
    >
      {/* Wrapper: fullscreen su mobile, contenuto su desktop */}
      <div className="mx-0 w-full max-w-none md:mx-4 md:max-w-3xl overflow-hidden rounded-none md:rounded-2xl border border-white/10 bg-[#0e142c] shadow-2xl">
        {/* Header sticky */}
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-white/10 bg-[#0e142c] px-4 py-3">
          <h3 className="text-sm font-semibold tracking-wider text-white">{Title}</h3>
          <button
            onClick={onClose}
            className="rounded-lg border border-white/20 bg-white/10 px-3 py-1 text-sm text-white hover:bg-white/15"
          >
            Chiudi
          </button>
        </div>

        {/* Contenuto scrollabile */}
        <div
          ref={refScroll}
          className="relative max-h-[calc(100vh-56px)] md:max-h-[70vh] overflow-y-auto overflow-x-hidden px-4 py-4"
          style={{ WebkitOverflowScrolling: "touch", scrollbarGutter: "stable" }}
        >
          <form onSubmit={onSubmit} className="grid gap-4 pb-24 sm:pb-0" encType="multipart/form-data">
            {/* honeypot antispam */}
            <input name="website" tabIndex={-1} autoComplete="off" className="hidden" />

            {/* Blocchi per tipo */}
            {kind === "agenti" && <BlockAgenti />}
            {kind === "back" && <BlockBack />}
            {kind === "spontanea" && <BlockSpontanea />}
            {kind === "collabo" && <BlockCollabo />}

            {/* Consenso + file */}
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <label className="block text-[12px] uppercase tracking-wide text-white/70">Allega CV (PDF/DOC)</label>
                <input
                  type="file"
                  name="cv"
                  accept=".pdf,.doc,.docx"
                  className="mt-2 w-full rounded-xl border border-white/15 bg-white/5 px-3 py-2 text-white outline-none ring-0 file:mr-3 file:cursor-pointer file:rounded-lg file:border-0 file:bg-gradient-to-b file:from-[#f7d77b] file:to-[#caa86e] file:px-3 file:py-2 file:font-semibold file:text-[#141a30] hover:file:opacity-95"
                />
              </div>
              <div className="sm:col-span-2">
                <label className="mt-1 flex items-center gap-2 text-sm text-white">
                  <input type="checkbox" name="privacy" required className="accent-[#e6c06a]" />
                  Dichiaro di aver letto e accettato l’informativa privacy <span className="text-white/50">*</span>
                </label>
              </div>
            </div>

            {/* azioni desktop */}
            <div className="hidden sm:flex items-center justify-end gap-3">
              <button type="button" onClick={onClose} className="rounded-xl border border-white/20 bg-white/5 px-4 py-2 text-sm text-white hover:bg-white/10">
                Annulla
              </button>
              <button
                disabled={sending}
                type="submit"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#caa86e]/40 bg-gradient-to-b from-[#f7d77b] to-[#caa86e] px-4 py-2 font-semibold text-black shadow-[0_10px_26px_rgba(0,0,0,.35)] disabled:opacity-80"
              >
                {sending ? "Invio…" : "Invia candidatura"}
              </button>
            </div>

            {/* feedback */}
            {msg && (
              <div
                className={
                  "mt-2 rounded-xl border px-3 py-2 text-sm " +
                  (msg.type === "success"
                    ? "border-emerald-400/40 bg-emerald-400/10 text-emerald-100"
                    : "border-rose-400/40 bg-rose-400/10 text-rose-100")
                }
              >
                {msg.text}
              </div>
            )}
          </form>
        </div>

        {/* ACTIONS mobile sticky */}
        <div
          className="sm:hidden sticky bottom-0 left-0 right-0 px-4 py-3 border-t border-white/10 bg-[#0e142c]/95 flex items-center justify-between gap-2"
          style={{ paddingBottom: "calc(env(safe-area-inset-bottom) + 12px)" }}
        >
          <button type="button" onClick={onClose} className="rounded-lg border border-white/20 bg-white/5 px-3 py-2 text-sm text-white">
            Annulla
          </button>
          <button
            form=""
            disabled={sending}
            type="submit"
            className="rounded-lg border border-[#caa86e]/40 bg-gradient-to-b from-[#f7d77b] to-[#caa86e] px-4 py-2 text-sm font-semibold text-black shadow-[0_10px_26px_rgba(0,0,0,.35)] disabled:opacity-80"
            onClick={() => {
              const form = refScroll.current?.querySelector("form");
              form?.requestSubmit();
            }}
          >
            {sending ? "Invio…" : "Invia candidatura"}
          </button>
        </div>
      </div>
    </div>
  );
}

/* ====== Blocchi contenuto per tipo (identici ai tuoi) ====== */

function Field({ label, children, required }) {
  return (
    <label className="block">
      <span className="block text-[12px] uppercase tracking-wide text-white/70">
        {label} {required && <em className="not-italic text-[#ffd479]">*</em>}
      </span>
      <div className="mt-2">{children}</div>
    </label>
  );
}

function Input(props) {
  return (
    <input
      {...props}
      className={
        "w-full rounded-xl border border-white/15 bg-white/5 px-3 py-2 text-white outline-none ring-0 focus:border-[#caa86e]/50 " +
        (props.className || "")
      }
    />
  );
}

function Select(props) {
  return (
    <select
      {...props}
      className={
        "w-full rounded-xl border border-white/15 bg-white/5 px-3 py-2 text-white outline-none ring-0 focus:border-[#caa86e]/50 appearance-none " +
        "bg-[image:linear-gradient(45deg,transparent_50%,#caa86e_50%),linear-gradient(135deg,#caa86e_50%,transparent_50%)] " +
        "bg-[position:calc(100%-18px)_50%,calc(100%-12px)_50%] bg-[size:6px_6px,6px_6px] bg-no-repeat " +
        (props.className || "")
      }
    >
      {props.children}
    </select>
  );
}

function BlockAgenti() {
  return (
    <section className="rounded-xl border border-white/10 bg-white/5 p-4">
      <div className="grid gap-4">
        <Field label="Seleziona il tuo ruolo" required>
          <Select name="ruolo" required defaultValue="">
            <option value="" disabled>— Seleziona —</option>
            <option>Junior Executive</option>
            <option>Corporate Senior</option>
            <option>Leader Corporate</option>
          </Select>
        </Field>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Nome" required><Input name="nome" required /></Field>
          <Field label="Cognome" required><Input name="cognome" required /></Field>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Email" required><Input type="email" name="email" required /></Field>
          <Field label="Telefono" required><Input type="tel" name="telefono" required /></Field>
        </div>
      </div>
    </section>
  );
}

function BlockBack() {
  return (
    <section className="rounded-xl border border-white/10 bg-white/5 p-4">
      <div className="grid gap-4">
        <Field label="Ruolo"><Input name="ruolo" defaultValue="Back Office" readOnly /></Field>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Nome" required><Input name="nome" required /></Field>
          <Field label="Cognome" required><Input name="cognome" required /></Field>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Email" required><Input type="email" name="email" required /></Field>
          <Field label="Telefono" required><Input type="tel" name="telefono" required /></Field>
        </div>
      </div>
    </section>
  );
}

function BlockSpontanea() {
  return (
    <section className="rounded-xl border border-white/10 bg-white/5 p-4">
      <div className="grid gap-4">
        <Field label="Posizione desiderata" required><Input name="posizione" placeholder="Es. Marketing Specialist, Sales, Designer…" required /></Field>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Nome" required><Input name="nome" required /></Field>
          <Field label="Cognome" required><Input name="cognome" required /></Field>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Email" required><Input type="email" name="email" required /></Field>
          <Field label="Telefono" required><Input type="tel" name="telefono" required /></Field>
        </div>
      </div>
    </section>
  );
}

function BlockCollabo() {
  const [mode, setMode] = React.useState("indipendente");
  return (
    <section className="rounded-xl border border-white/10 bg-white/5 p-4">
      <div className="grid gap-4">
        <Field label="Seleziona tipologia" required>
          <div className="flex flex-wrap gap-2 text-sm">
            <label className={"inline-flex items-center gap-2 rounded-xl border px-3 py-2 " + (mode==="indipendente" ? "border-[#caa86e]/60 bg-[#caa86e]/10" : "border-white/15 bg-white/5")}>
              <input type="radio" name="tipo" value="indipendente" checked={mode==="indipendente"} onChange={()=>setMode("indipendente")} /> Indipendente
            </label>
            <label className={"inline-flex items-center gap-2 rounded-xl border px-3 py-2 " + (mode==="societa" ? "border-[#caa86e]/60 bg-[#caa86e]/10" : "border-white/15 bg-white/5")}>
              <input type="radio" name="tipo" value="societa" checked={mode==="societa"} onChange={()=>setMode("societa")} /> Società
            </label>
          </div>
        </Field>

        {mode === "indipendente" ? (
          <>
            <Field label="Ambito / Ruolo proposto" required><Input name="ruolo" placeholder="Es. Media buyer, Fotografo, PM…" required /></Field>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Nome" required><Input name="nome" required /></Field>
              <Field label="Cognome" required><Input name="cognome" required /></Field>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Email" required><Input type="email" name="email" required /></Field>
              <Field label="Telefono" required><Input type="tel" name="telefono" required /></Field>
            </div>
          </>
        ) : (
          <>
            <Field label="Ragione sociale" required><Input name="ragione_sociale" required /></Field>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Sito web (opzionale)"><Input type="url" name="sito" placeholder="https://…" /></Field>
              <Field label="P. IVA (opzionale)"><Input name="piva" /></Field>
            </div>
            <Field label="Ambito di collaborazione" required><Input name="ambito" placeholder="Es. Produzione contenuti, Lead gen, Consulenza…" required /></Field>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Referente — Nome" required><Input name="ref_nome" required /></Field>
              <Field label="Referente — Cognome" required><Input name="ref_cognome" required /></Field>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Email" required><Input type="email" name="email" required /></Field>
              <Field label="Telefono" required><Input type="tel" name="telefono" required /></Field>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
