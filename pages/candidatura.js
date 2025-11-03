// pages/candidatura.js
"use client";

import React from "react";
import ReactDOM from "react-dom";
import { motion, useReducedMotion } from "framer-motion";
import Header from "@common/layout/Header";
import Footer from "@common/layout/Footer";
import SectionHeader from "@/components/home/SectionHeader"; // ✅ importa il SectionHeader “giusto”

/**
 * Pagina Candidatura — Ultra
 * - SectionHeader coerente con il resto del sito
 * - 1 card grande + 3 card piccole (tilt+glow)
 * - Modali in PORTAL (body), z-index 9999, max-height responsivo (zero tagli), focus trap, scroll-lock
 */

export default function CandidaturaPage() {
  const [activeModal, setActiveModal] = React.useState(null); // "agenti" | "back" | "spontanea" | "collabo" | null
  const [toast, setToast] = React.useState(null);
  const reduce = useReducedMotion();

  React.useEffect(() => {
    const onKey = (e) => { if (e.key === "Escape") setActiveModal(null); };
    if (activeModal) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [activeModal]);

  function handleSubmit(kind, e) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const data = Object.fromEntries(fd.entries());
    for (const [k, v] of fd.entries()) if (v instanceof File) data[k] = v?.name || "";
    console.log(`[SUBMIT:${kind}]`, data);
    setToast("Invio disabilitato in questa fase — collegheremo il mailer più tardi.");
    setActiveModal(null);
    setTimeout(() => setToast(null), 4200);
  }

  return (
    <main className="page">
      <Header />
      {/* Spacer per header fixed */}
      <div aria-hidden style={{ height: "calc(var(--header-h, 56px) + env(safe-area-inset-top, 0px))" }} />

      {/* HERO con SectionHeader */}
      <section className="hero wrap">
        <SectionHeader
          eyebrow="Candidatura"
          titlePre="Scegli"
          titleHighlight="il tuo percorso"
          titlePost=""
          subtitle="Inizia dalla strada che ti rappresenta: il resto lo ottimizziamo insieme. Compila il modulo in pochi secondi."
          align="center"
          as="h1"
          className="mb-3"
        />
      </section>

      {/* CARDS */}
      <section className="cards wrap">
        {/* Big card */}
        <CardBig
          title="Agente Immobiliare"
          desc="Candidati ora e scegli il ruolo più adatto al tuo profilo."
          cta="Apri modulo"
          onClick={() => setActiveModal("agenti")}
        />

        {/* Small row */}
        <div className="grid-sm">
          <CardSmall
            title="Back Office"
            desc="Operatività, controllo qualità, coordinamento."
            onClick={() => setActiveModal("back")}
          />
          <CardSmall
            title="Candidatura Spontanea"
            desc="Indicaci la posizione che vorresti ricoprire."
            onClick={() => setActiveModal("spontanea")}
          />
          <CardSmall
            title="Richiedi Collaborazione"
            desc="Freelance o società? Proponi il tuo modello."
            onClick={() => setActiveModal("collabo")}
          />
        </div>
      </section>

      {/* MODALS */}
      <Modal
        open={activeModal === "agenti"}
        title="Candidatura — Agente Immobiliare"
        onClose={() => setActiveModal(null)}
      >
        <form onSubmit={(e) => handleSubmit("agenti", e)} className="form">
          <Field label="Seleziona il tuo ruolo" required>
            <select name="ruolo" required defaultValue="">
              <option value="" disabled>— Seleziona —</option>
              <option>Junior Executive</option>
              <option>Corporate Senior</option>
              <option>Leader Corporate</option>
            </select>
          </Field>

          <Row>
            <Field label="Nome" required><input name="nome" required /></Field>
            <Field label="Cognome" required><input name="cognome" required /></Field>
          </Row>

          <Row>
            <Field label="Email" required><input type="email" name="email" required /></Field>
            <Field label="Telefono" required><input type="tel" name="telefono" required /></Field>
          </Row>

          <Field label="Allega CV (PDF, DOC)">
            <input type="file" name="cv" accept=".pdf,.doc,.docx" />
          </Field>

          <Consent />
          <Actions />
        </form>
      </Modal>

      <Modal
        open={activeModal === "back"}
        title="Candidatura — Back Office"
        onClose={() => setActiveModal(null)}
      >
        <form onSubmit={(e) => handleSubmit("back-office", e)} className="form">
          <Field label="Ruolo">
            <input name="ruolo" defaultValue="Back Office" readOnly />
          </Field>

          <Row>
            <Field label="Nome" required><input name="nome" required /></Field>
            <Field label="Cognome" required><input name="cognome" required /></Field>
          </Row>

          <Row>
            <Field label="Email" required><input type="email" name="email" required /></Field>
            <Field label="Telefono" required><input type="tel" name="telefono" required /></Field>
          </Row>

          <Field label="Allega CV (PDF, DOC)">
            <input type="file" name="cv" accept=".pdf,.doc,.docx" />
          </Field>

          <Consent />
          <Actions />
        </form>
      </Modal>

      <Modal
        open={activeModal === "spontanea"}
        title="Candidatura Spontanea"
        onClose={() => setActiveModal(null)}
      >
        <form onSubmit={(e) => handleSubmit("spontanea", e)} className="form">
          <Field label="Posizione desiderata" required>
            <input name="posizione" placeholder="Es. Marketing Specialist, Sales, Designer…" required />
          </Field>

          <Row>
            <Field label="Nome" required><input name="nome" required /></Field>
            <Field label="Cognome" required><input name="cognome" required /></Field>
          </Row>

          <Row>
            <Field label="Email" required><input type="email" name="email" required /></Field>
            <Field label="Telefono" required><input type="tel" name="telefono" required /></Field>
          </Row>

          <Field label="Allega CV (PDF, DOC)">
            <input type="file" name="cv" accept=".pdf,.doc,.docx" />
          </Field>

          <Consent />
          <Actions />
        </form>
      </Modal>

      <Modal
        open={activeModal === "collabo"}
        title="Richiedi Collaborazione"
        onClose={() => setActiveModal(null)}
      >
        <CollabForm onSubmit={(e) => handleSubmit("collaborazione", e)} />
      </Modal>

      <Footer />

      {/* TOAST */}
      {toast && <div className="toast" role="status">{toast}</div>}

      <style jsx>{styles}</style>
    </main>
  );
}

/* ========================= UI PRIMITIVES ========================= */

function CardBig({ title, desc, cta, onClick }) {
  const reduce = useReducedMotion();
  const [t, setT] = React.useState({ rx: 0, ry: 0, tx: 0, ty: 0 });
  const ref = React.useRef(null);

  function onMove(e) {
    if (reduce) return;
    const r = ref.current?.getBoundingClientRect(); if (!r) return;
    const x = e.clientX - r.left, y = e.clientY - r.top;
    const px = (x / r.width) * 2 - 1, py = (y / r.height) * 2 - 1;
    setT({ rx: -py * 5, ry: px * 7, tx: px * 6, ty: py * 6 });
  }
  function onLeave() { setT({ rx: 0, ry: 0, tx: 0, ty: 0 }); }

  return (
    <motion.article
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      initial={reduce ? false : { opacity: 0, y: 18 }}
      whileInView={reduce ? {} : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="card card-big"
      style={{
        transform: reduce ? undefined : `
          perspective(1000px)
          rotateX(${t.rx}deg)
          rotateY(${t.ry}deg)
          translate3d(${t.tx}px, ${t.ty}px, 0)
        `,
        transition: "transform 120ms ease-out",
      }}
      onClick={onClick}
    >
      <div className="card-inner">
        <h2>{title}</h2>
        <p>{desc}</p>
        <span className="cta">{cta}</span>
        <BgBurst />
      </div>
    </motion.article>
  );
}

function CardSmall({ title, desc, onClick }) {
  const reduce = useReducedMotion();
  const [t, setT] = React.useState({ rx: 0, ry: 0, tx: 0, ty: 0 });
  const ref = React.useRef(null);
  function onMove(e) {
    if (reduce) return;
    const r = ref.current?.getBoundingClientRect(); if (!r) return;
    const x = e.clientX - r.left, y = e.clientY - r.top;
    const px = (x / r.width) * 2 - 1, py = (y / r.height) * 2 - 1;
    setT({ rx: -py * 5, ry: px * 7, tx: px * 5, ty: py * 5 });
  }
  function onLeave() { setT({ rx: 0, ry: 0, tx: 0, ty: 0 }); }

  return (
    <motion.article
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      initial={reduce ? false : { opacity: 0, y: 18 }}
      whileInView={reduce ? {} : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="card"
      style={{
        transform: reduce ? undefined : `
          perspective(900px)
          rotateX(${t.rx}deg)
          rotateY(${t.ry}deg)
          translate3d(${t.tx}px, ${t.ty}px, 0)
        `,
        transition: "transform 120ms ease-out",
      }}
      onClick={onClick}
    >
      <div className="card-inner">
        <h3>{title}</h3>
        <p>{desc}</p>
        <span className="cta">Apri modulo</span>
        <BgBurst />
      </div>
    </motion.article>
  );
}

/* ----------------------- MODAL (Portal + trap) ---------------------- */

function Modal({ open, title, onClose, children }) {
  const mounted = useMounted();
  const reduce = useReducedMotion();
  const panelRef = React.useRef(null);

  // Scroll lock
  React.useEffect(() => {
    if (!open) return;
    const prev = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    return () => { document.documentElement.style.overflow = prev; };
  }, [open]);

  // Focus trap
  React.useEffect(() => {
    if (!open) return;
    const panel = panelRef.current;
    if (!panel) return;
    const focusables = panel.querySelectorAll(
      'a,button,input,select,textarea,[tabindex]:not([tabindex="-1"])'
    );
    const first = focusables[0], last = focusables[focusables.length - 1];
    const prevActive = document.activeElement;
    first?.focus();
    function onKey(e) {
      if (e.key !== "Tab") return;
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault(); last?.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault(); first?.focus();
      }
    }
    panel.addEventListener("keydown", onKey);
    return () => {
      panel.removeEventListener("keydown", onKey);
      if (prevActive && prevActive instanceof HTMLElement) prevActive.focus();
    };
  }, [open]);

  if (!open || !mounted) return null;

  return ReactDOM.createPortal(
    <div
      className="modal"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      onMouseDown={(e) => {
        if (e.currentTarget === e.target) onClose();
      }}
    >
      {/* background */}
      <motion.div
        className="modal-bg"
        initial={reduce ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.18, ease: "easeOut" }}
      />
      {/* panel */}
      <motion.div
        ref={panelRef}
        className="modal-panel"
        initial={reduce ? false : { y: 10, scale: 0.98, opacity: 0.6 }}
        animate={{ y: 0, scale: 1, opacity: 1 }}
        exit={{ y: 6, scale: 0.98, opacity: 0.6 }}
        transition={{ duration: 0.18, ease: "easeOut" }}
      >
        <div className="modal-head">
          <h4 id="modal-title">{title}</h4>
          <button className="x" onClick={onClose} aria-label="Chiudi">
            <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden>
              <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
        </div>
        <div className="modal-body">{children}</div>
      </motion.div>

      <style jsx>{`
        .modal {
          position: fixed; inset: 0; z-index: 9999; /* sopra TUTTO */
          display: grid; place-items: center;
          padding: clamp(12px, 2vw, 24px);
        }
        .modal-bg{
          position:absolute; inset:0;
          background: color-mix(in oklab, black 68%, transparent);
          backdrop-filter: blur(4px);
        }
        .modal-panel{
          position: relative;
          width: min(920px, 100%);
          max-height: calc(100svh - 2*clamp(12px, 2vw, 24px) - env(safe-area-inset-top) - env(safe-area-inset-bottom));
          border-radius: 18px; overflow: hidden auto;
          background:
            radial-gradient(120% 120% at 100% 0%, rgba(255,255,255,.06), transparent 40%),
            rgba(20, 26, 48, .86);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(255,255,255,.12);
          box-shadow: 0 24px 80px rgba(0,0,0,.55);
        }
        .modal-head{ position: sticky; top: 0; z-index: 1;
          display: flex; align-items:center; justify-content:space-between;
          padding: 18px; background: linear-gradient(to bottom, rgba(20,26,48,.92), rgba(20,26,48,.78));
          border-bottom: 1px solid rgba(255,255,255,.08);
        }
        .modal-head h4{ margin:0; font-size: 18px; letter-spacing: .2px }
        .x{ border:0; background:transparent; color:#fff; opacity:.9; cursor:pointer; }
        .modal-body{ padding: 16px 18px 18px }
      `}</style>
    </div>,
    document.body
  );
}

/* ---------------------- Helpers & Fields ---------------------- */

function Field({ label, children, required = false }) {
  return (
    <label className="field">
      <span className="label">
        {label} {required && <em>*</em>}
      </span>
      {children}
      <style jsx>{`
        .field{ display:block; margin: 12px 0 12px }
        .label{ display:inline-block; font-size: 13px; opacity:.9; margin-bottom: 6px }
        .label em{ font-style: normal; color: #ffd479; }
      `}</style>
    </label>
  );
}

function Row({ children }) {
  return (
    <div className="row">
      {children}
      <style jsx>{`
        .row{ display:grid; grid-template-columns: 1fr; gap: 12px; }
        @media (min-width: 720px){ .row{ grid-template-columns: 1fr 1fr } }
      `}</style>
    </div>
  );
}

function Actions() {
  return (
    <div className="actions">
      <button className="btn" type="submit">
        Invia candidatura
        <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden>
          <path d="M5 12h14M13 5l7 7-7 7" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" />
        </svg>
      </button>
      <style jsx>{`
        .actions{ display:flex; justify-content:flex-end; margin-top: 14px }
        .btn{
          display:inline-flex; align-items:center; gap:8px;
          border:0; cursor:pointer; border-radius: 12px; padding: 10px 14px;
          color:#141a30; font-weight: 700; letter-spacing:.2px;
          background: linear-gradient(180deg, #f7d77b, #caa86e);
          box-shadow: 0 10px 26px rgba(0,0,0,.35), inset 0 0 0 1px rgba(255,255,255,.22);
          transition: transform .08s ease, filter .08s ease;
        }
        .btn:hover{ transform: translateY(-1px) }
        .btn:active{ transform: translateY(0) scale(.98) }
      `}</style>
    </div>
  );
}

function Consent() {
  return (
    <div className="consent">
      <input id="cons" type="checkbox" name="privacy" required />
      <label htmlFor="cons">Dichiaro di aver letto e accettato l’informativa privacy.</label>
      <style jsx>{`
        .consent{ display:flex; align-items:center; gap:10px; margin-top: 10px; font-size: 13px }
        .consent input{ width:18px; height:18px; accent-color: #e6c06a; }
      `}</style>
    </div>
  );
}

function CollabForm({ onSubmit }) {
  const [mode, setMode] = React.useState("indipendente"); // "indipendente" | "societa"
  return (
    <form onSubmit={onSubmit} className="form">
      <Field label="Seleziona tipologia" required>
        <div className="seg">
          <label className={`seg-it ${mode==="indipendente" ? "active":""}`}>
            <input type="radio" name="tipo" value="indipendente" checked={mode==="indipendente"} onChange={()=>setMode("indipendente")} />
            <span>Indipendente</span>
          </label>
          <label className={`seg-it ${mode==="societa" ? "active":""}`}>
            <input type="radio" name="tipo" value="societa" checked={mode==="societa"} onChange={()=>setMode("societa")} />
            <span>Società</span>
          </label>
        </div>
      </Field>

      {mode==="indipendente" ? (
        <>
          <Field label="Ambito / Ruolo proposto" required>
            <input name="ruolo" placeholder="Es. Media buyer, Fotografo, PM…" required />
          </Field>
          <Row>
            <Field label="Nome" required><input name="nome" required /></Field>
            <Field label="Cognome" required><input name="cognome" required /></Field>
          </Row>
          <Row>
            <Field label="Email" required><input type="email" name="email" required /></Field>
            <Field label="Telefono" required><input type="tel" name="telefono" required /></Field>
          </Row>
          <Field label="Portfolio / CV (opzionale)">
            <input type="file" name="allegato" accept=".pdf,.doc,.docx" />
          </Field>
        </>
      ) : (
        <>
          <Field label="Ragione sociale" required>
            <input name="ragione_sociale" required />
          </Field>
          <Row>
            <Field label="Sito web (opzionale)">
              <input type="url" name="sito" placeholder="https://…" />
            </Field>
            <Field label="P. IVA (opzionale)">
              <input name="piva" />
            </Field>
          </Row>
          <Field label="Ambito di collaborazione" required>
            <input name="ambito" placeholder="Es. Produzione contenuti, Lead gen, Consulenza…" required />
          </Field>
          <Row>
            <Field label="Referente — Nome" required><input name="ref_nome" required /></Field>
            <Field label="Referente — Cognome" required><input name="ref_cognome" required /></Field>
          </Row>
          <Row>
            <Field label="Email" required><input type="email" name="email" required /></Field>
            <Field label="Telefono" required><input type="tel" name="telefono" required /></Field>
          </Row>
          <Field label="Company profile (opzionale)">
            <input type="file" name="allegato" accept=".pdf,.doc,.docx" />
          </Field>
        </>
      )}

      <Consent />
      <Actions />

      <style jsx>{`
        .seg{ display:inline-flex; background: rgba(255,255,255,.06); border:1px solid rgba(255,255,255,.12); border-radius: 12px; overflow:hidden }
        .seg-it{ display:flex; align-items:center; gap:8px; padding:8px 12px; cursor:pointer; user-select:none }
        .seg-it input{ display:none }
        .seg-it span{ opacity:.85 }
        .seg-it.active{ background: rgba(255,255,255,.08) }
      `}</style>
    </form>
  );
}

function BgBurst() {
  return (
    <svg className="burst" viewBox="0 0 120 120" aria-hidden>
      <defs>
        <radialGradient id="g" cx="50%" cy="50%" r="60%">
          <stop offset="0%" stopColor="rgba(255,215,130,.65)" />
          <stop offset="60%" stopColor="rgba(255,215,130,.15)" />
          <stop offset="100%" stopColor="rgba(255,215,130,0)" />
        </radialGradient>
      </defs>
      <circle cx="60" cy="60" r="58" fill="url(#g)" />
      <style jsx>{`
        .burst{
          position:absolute; right:-28px; bottom:-28px; width:180px; height:180px;
          opacity:.8; transform: rotate(-6deg);
        }
      `}</style>
    </svg>
  );
}

/* -------------------------- HOOKS -------------------------- */
function useMounted() {
  const [m, setM] = React.useState(false);
  React.useEffect(() => setM(true), []);
  return m;
}

/* =========================== STYLES =========================== */

const styles = `
:root{
  --bg: #0f1428;
  --ink: #ffffff;
  --muted: rgba(255,255,255,.78);
  --card: rgba(255,255,255,.06);
  --stroke: rgba(255,255,255,.12);
  --ring: rgba(255,255,255,.18);
  --gold1: #f7d77b;
  --gold2: #caa86e;
}
*{ box-sizing: border-box }
.page{ min-height: 100svh; display:flex; flex-direction: column; background: var(--bg); color: var(--ink) }

.wrap{ width: 100%; max-width: 1180px; margin: 0 auto; padding: 0 16px; }

/* HERO */
.hero{
  padding: 40px 0 10px;
  position: relative;
  background:
    radial-gradient(100% 40% at 50% 0%, rgba(255, 212, 130, .06), transparent 60%),
    radial-gradient(60% 60% at 100% 0%, rgba(80, 120, 255, .12), transparent 60%);
}

/* CARDS */
.cards{ padding: 22px 0 56px; }
.card{
  position: relative; overflow: hidden;
  background: var(--card);
  border: 1px solid var(--stroke);
  border-radius: 20px;
  cursor: pointer;
  isolation: isolate;
}
.card::after{
  content:""; position:absolute; inset:0; pointer-events:none;
  background: radial-gradient(120% 100% at 0% 0%, rgba(255,255,255,.06), transparent 50%);
  opacity:0; transition: opacity .18s ease;
}
.card:hover::after{ opacity: 1 }
.card .card-inner{ padding: 24px 24px 60px; min-height: 220px; display:flex; flex-direction: column; gap:8px }
.card h2, .card h3{ margin:0 }
.card p{ margin:0; opacity:.85 }
.card .cta{
  margin-top: auto; display:inline-flex; align-items:center; gap:8px; font-weight:700; color:#141a30;
  padding: 10px 14px; border-radius: 12px;
  background: linear-gradient(180deg, var(--gold1), var(--gold2));
  box-shadow: 0 10px 26px rgba(0,0,0,.35), inset 0 0 0 1px rgba(255,255,255,.22);
  width: fit-content;
}

/* Layout: big + three small */
.card-big{ margin-bottom: 14px }
.card-big .card-inner{ min-height: 280px; padding: 28px 28px 70px }
.grid-sm{ display:grid; grid-template-columns: 1fr; gap: 14px }
@media (min-width: 740px){
  .grid-sm{ grid-template-columns: repeat(3, 1fr) }
}

/* FORM */
.form input, .form select, .form textarea {
  width: 100%; height: 42px; padding: 10px 12px;
  border-radius: 12px; border: 1px solid var(--stroke);
  background: rgba(255,255,255,.06); color: var(--ink);
  outline: none;
}
.form textarea{ min-height: 96px; height: auto; resize: vertical }
.form input:focus, .form select:focus, .form textarea:focus{
  border-color: var(--ring); box-shadow: 0 0 0 3px rgba(255,255,255,.08);
}

/* TOAST */
.toast{
  position: fixed; left: 50%; bottom: 22px; transform: translateX(-50%);
  background: rgba(20, 26, 48, .92);
  border: 1px solid var(--stroke);
  border-radius: 12px;
  padding: 10px 14px;
  box-shadow: 0 16px 40px rgba(0,0,0,.4);
  z-index: 10000;
}
`;
