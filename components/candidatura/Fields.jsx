// components/candidatura/Fields.jsx
"use client";
import React from "react";

export function Field({ label, children, required = false }) {
  return (
    <label className="field">
      <span className="label">{label} {required && <em>*</em>}</span>
      {children}
      <style jsx>{`
        .field{ display:block; margin: 12px 0 12px }
        .label{ display:inline-block; font-size: 13px; opacity:.9; margin-bottom: 6px }
        .label em{ font-style: normal; color: var(--gold, #f7d77b); }
      `}</style>
    </label>
  );
}

export function Row({ children }) {
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

export function Actions({ label = "Invia candidatura" }) {
  return (
    <div className="actions">
      <button className="btn" type="submit">
        {label}
        <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden>
          <path d="M5 12h14M13 5l7 7-7 7" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" />
        </svg>
      </button>
      <style jsx>{`
        .actions{ display:flex; justify-content:flex-end; margin-top: 14px }
        .btn{
          display:inline-flex; align-items:center; gap:8px; border:0; cursor:pointer; border-radius: 12px; padding: 10px 14px;
          color:#141a30; font-weight: 700; letter-spacing:.2px;
          background: linear-gradient(180deg, var(--gold, #f7d77b), #caa86e);
          box-shadow: 0 10px 26px rgba(0,0,0,.35), inset 0 0 0 1px rgba(255,255,255,.22);
          transition: transform .08s ease, filter .08s ease;
        }
        .btn:hover{ transform: translateY(-1px) }
        .btn:active{ transform: translateY(0) scale(.98) }
      `}</style>
    </div>
  );
}

export function Consent() {
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
