// components/candidatura/Cards.jsx
"use client";
import React from "react";
import { motion, useReducedMotion } from "framer-motion";

export function CardBig({ title, desc, cta, onClick }) {
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
        transform: reduce ? undefined : `perspective(1000px) rotateX(${t.rx}deg) rotateY(${t.ry}deg) translate3d(${t.tx}px, ${t.ty}px, 0)`,
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
      <style jsx>{baseCardCss}</style>
    </motion.article>
  );
}

export function CardSmall({ title, desc, onClick }) {
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
        transform: reduce ? undefined : `perspective(900px) rotateX(${t.rx}deg) rotateY(${t.ry}deg) translate3d(${t.tx}px, ${t.ty}px, 0)`,
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
      <style jsx>{baseCardCss}</style>
    </motion.article>
  );
}

export function BgBurst() {
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
        .burst{ position:absolute; right:-28px; bottom:-28px; width:180px; height:180px; opacity:.8; transform: rotate(-6deg); }
      `}</style>
    </svg>
  );
}

const baseCardCss = `
  .card{ position: relative; overflow: hidden; background: rgba(255,255,255,.06); border: 1px solid rgba(255,255,255,.12); border-radius: 20px; cursor: pointer; isolation: isolate; }
  .card::after{ content:""; position:absolute; inset:0; pointer-events:none; background: radial-gradient(120% 100% at 0% 0%, rgba(255,255,255,.06), transparent 50%); opacity:0; transition: opacity .18s ease; }
  .card:hover::after{ opacity: 1 }
  .card .card-inner{ padding: 24px 24px 60px; min-height: 220px; display:flex; flex-direction: column; gap:8px }
  .card h2, .card h3{ margin:0 }
  .card p{ margin:0; opacity:.85 }
  .card .cta{ margin-top: auto; display:inline-flex; align-items:center; gap:8px; font-weight:700; color:#141a30; padding: 10px 14px; border-radius: 12px; background: linear-gradient(180deg, var(--gold, #f7d77b), #caa86e); box-shadow: 0 10px 26px rgba(0,0,0,.35), inset 0 0 0 1px rgba(255,255,255,.22); width: fit-content; }
  .card-big{ margin-bottom: 14px }
  .card-big .card-inner{ min-height: 280px; padding: 28px 28px 70px }
`;
