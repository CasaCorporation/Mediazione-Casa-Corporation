// pages/candidatura.js
"use client";

import React from "react";
import Header from "@common/layout/Header";
import Footer from "@common/layout/Footer";
import SectionHeader from "@/components/home/SectionHeader";
import Modal from "@/components/candidatura/Modal";
import { CardBig, CardSmall } from "@/components/candidatura/Cards";
import { Field, Row, Actions, Consent } from "@/components/candidatura/Fields";

export default function CandidaturaPage() {
  const [activeModal, setActiveModal] = React.useState(null);
  const [toast, setToast] = React.useState(null);
  const [loading, setLoading] = React.useState(false);

  async function handleSubmit(kind, e) {
    e.preventDefault();
    try {
      setLoading(true);
      const fd = new FormData(e.currentTarget);
      fd.append("kind", kind);
      // honeypot
      if (fd.get("website")) return setToast("✅ Grazie!"); 
      const res = await fetch("/api/candidatura", { method: "POST", body: fd });
      const out = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(out?.error || "Errore invio");
      setToast("✅ Candidatura inviata. Ti risponderemo a breve.");
      e.currentTarget.reset();
      setActiveModal(null);
    } catch (err) {
      setToast(`❌ ${err.message || "Invio non riuscito"}`);
    } finally {
      setLoading(false);
      setTimeout(() => setToast(null), 5000);
    }
  }

  return (
    <main className="page">
      <Header />
      <div aria-hidden style={{ height: "calc(var(--header-h, 56px) + env(safe-area-inset-top, 0px))" }} />

      <section className="hero wrap">
        <SectionHeader
          eyebrow="Candidatura"
          titlePre="Scegli"
          titleHighlight="il tuo percorso"
          subtitle="Inizia dalla strada che ti rappresenta: il resto lo ottimizziamo insieme. Compila il modulo in pochi secondi."
          align="center"
          as="h1"
          className="mb-3"
        />
      </section>

      <section className="cards wrap">
        <CardBig
          title="Agente Immobiliare"
          desc="Candidati ora e scegli il ruolo più adatto al tuo profilo."
          cta={loading && activeModal === "agenti" ? "Invio…" : "Apri modulo"}
          onClick={() => setActiveModal("agenti")}
        />
        <div className="grid-sm">
          <CardSmall title="Back Office" desc="Operatività, controllo qualità, coordinamento." onClick={() => setActiveModal("back")} />
          <CardSmall title="Candidatura Spontanea" desc="Indicaci la posizione che vorresti ricoprire." onClick={() => setActiveModal("spontanea")} />
          <CardSmall title="Richiedi Collaborazione" desc="Freelance o società? Proponi il tuo modello." onClick={() => setActiveModal("collabo")} />
        </div>
      </section>

      {/* MODALI */}
      <Modal open={activeModal === "agenti"} title="Candidatura — Agente Immobiliare" onClose={() => setActiveModal(null)}>
        <form onSubmit={(e) => handleSubmit("Agente Immobiliare", e)} className="form" encType="multipart/form-data">
          <input name="website" tabIndex={-1} autoComplete="off" style={{ position: "absolute", left: "-9999px" }} aria-hidden />
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

      <Modal open={activeModal === "back"} title="Candidatura — Back Office" onClose={() => setActiveModal(null)}>
        <form onSubmit={(e) => handleSubmit("Back Office", e)} className="form" encType="multipart/form-data">
          <input name="website" tabIndex={-1} autoComplete="off" style={{ position: "absolute", left: "-9999px" }} aria-hidden />
          <Field label="Ruolo"><input name="ruolo" defaultValue="Back Office" readOnly /></Field>
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

      <Modal open={activeModal === "spontanea"} title="Candidatura Spontanea" onClose={() => setActiveModal(null)}>
        <form onSubmit={(e) => handleSubmit("Candidatura Spontanea", e)} className="form" encType="multipart/form-data">
          <input name="website" tabIndex={-1} autoComplete="off" style={{ position: "absolute", left: "-9999px" }} aria-hidden />
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

      <Modal open={activeModal === "collabo"} title="Richiedi Collaborazione" onClose={() => setActiveModal(null)}>
        <form onSubmit={(e) => handleSubmit("Collaborazione", e)} className="form" encType="multipart/form-data">
          <input name="website" tabIndex={-1} autoComplete="off" style={{ position: "absolute", left: "-9999px" }} aria-hidden />
          <Field label="Seleziona tipologia" required>
            <div className="seg">
              <label className="seg-it"><input type="radio" name="tipo" value="indipendente" defaultChecked /><span>Indipendente</span></label>
              <label className="seg-it"><input type="radio" name="tipo" value="societa" /><span>Società</span></label>
            </div>
          </Field>
          <Field label="Ambito / Ruolo proposto" required>
            <input name="ambito_ruolo" placeholder="Es. Media buyer, Fotografo, PM…" required />
          </Field>
          <Row>
            <Field label="Nome / Referente" required><input name="nome" required /></Field>
            <Field label="Cognome / Referente" required><input name="cognome" required /></Field>
          </Row>
          <Row>
            <Field label="Email" required><input type="email" name="email" required /></Field>
            <Field label="Telefono" required><input type="tel" name="telefono" required /></Field>
          </Row>
          <Field label="Portfolio / Company profile (opz.)">
            <input type="file" name="allegato" accept=".pdf,.doc,.docx" />
          </Field>
          <Consent />
          <Actions label="Invia richiesta" />
        </form>
      </Modal>

      <Footer />

      {toast && <div className="toast" role="status">{toast}</div>}

      <style jsx>{`
        :root{
          --bg: var(--brand-dark, #0f1428);
          --ink: #ffffff; --gold1: #f7d77b; --gold2: #caa86e;
        }
        .page{ min-height: 100svh; display:flex; flex-direction: column; background: var(--bg); color: var(--ink) }
        .wrap{ width: 100%; max-width: 1180px; margin: 0 auto; padding: 0 16px; }
        .hero{
          padding: 40px 0 10px;
          background:
            radial-gradient(100% 40% at 50% 0%, color-mix(in oklab, var(--gold1) 14%, transparent), transparent 60%),
            radial-gradient(60% 60% at 100% 0%, rgba(80,120,255,.12), transparent 60%);
        }
        .cards{ padding: 22px 0 56px; }
        .grid-sm{ display:grid; grid-template-columns: 1fr; gap: 14px }
        @media (min-width: 740px){ .grid-sm{ grid-template-columns: repeat(3, 1fr) } }

        .form input, .form select, .form textarea {
          width: 100%; height: 42px; padding: 10px 12px;
          border-radius: 12px; border: 1px solid rgba(255,255,255,.12);
          background: rgba(255,255,255,.06); color: var(--ink);
          outline: none;
        }
        .form textarea{ min-height: 96px; height: auto; resize: vertical }
        .form input:focus, .form select:focus, .form textarea:focus{
          border-color: rgba(255,255,255,.18); box-shadow: 0 0 0 3px rgba(255,255,255,.08);
        }

        /* SELECT fix + arrow custom + opzioni leggibili */
        .form select { 
          color-scheme: dark; appearance: none;
          background-image:
            linear-gradient(45deg, transparent 50%, var(--gold2) 50%),
            linear-gradient(135deg, var(--gold2) 50%, transparent 50%),
            linear-gradient(to right, transparent, transparent);
          background-position:
            calc(100% - 18px) 50%,
            calc(100% - 12px) 50%,
            0 0;
          background-size: 6px 6px, 6px 6px, 100% 100%;
          background-repeat: no-repeat;
          padding-right: 34px;
        }
        .form select option { color:#111827; background:#fff; }

        .form input[type="file"]::file-selector-button{
          border: 0; border-radius: 10px; padding: 8px 12px; margin-right:10px;
          background: linear-gradient(180deg, var(--gold1), var(--gold2)); color: #141a30; font-weight: 700; cursor: pointer;
        }

        @media (max-width: 640px){ .form input, .form select, .form textarea { height: 48px } }

        .seg{ display:inline-flex; background: rgba(255,255,255,.06); border:1px solid rgba(255,255,255,.12); border-radius: 12px; overflow:hidden }
        .seg-it{ display:flex; align-items:center; gap:8px; padding:8px 12px; cursor:pointer; user-select:none }
        .seg-it input{ display:none } .seg-it span{ opacity:.85 }

        .toast{
          position: fixed; left: 50%; bottom: 22px; transform: translateX(-50%);
          background: rgba(20,26,48,.92); border: 1px solid rgba(255,255,255,.12);
          border-radius: 12px; padding: 10px 14px; box-shadow: 0 16px 40px rgba(0,0,0,.4);
          z-index: 10000;
        }
      `}</style>
    </main>
  );
}
