"use client";

import React from "react";
import SectionHeader, { SectionP } from "@/common/section/SectionHeader";
import { ButtonGold, ButtonGhost } from "@/common/section/Buttons";
import {
  PROVVIGIONE_BASE,
  BONUS_SHARES,
  DEFAULTS,
  formatEUR,
} from "@/components/carriere/vecchi misti/calcolatore/data";
import { useCalcolo } from "@/components/carriere/vecchi misti/calcolatore/state/CalcoloContext";

/* ========= HELPERS (definiti prima) ========= */
function sanitizeNumber(v, min, max){
  const n = Number(v) || 0;
  return Math.max(min, Math.min(max, n));
}
function Field({ label, children }) {
  return (
    <label className="block">
      <div className="text-sm text-white/70 mb-1">{label}</div>
      {children}
    </label>
  );
}
function NumberField({ label, value, setValue, step = 1000 }) {
  return (
    <Field label={label}>
      <input
        type="number"
        inputMode="numeric"
        min={0}
        step={step}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="w-full rounded-lg bg-white/5 ring-1 ring-white/10 px-3 py-2"
      />
    </Field>
  );
}
function SelectField({ label, value, setValue, options }) {
  return (
    <Field label={label}>
      <select
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="w-full rounded-lg bg-white/5 ring-1 ring-white/10 px-3 py-2"
      >
        {options.map((o) => (
          <option key={o.key} value={o.key}>
            {o.label}
          </option>
        ))}
      </select>
    </Field>
  );
}
function Stat({ label, value, big = false }) {
  return (
    <div className="rounded-lg bg-white/5 ring-1 ring-white/10 p-3">
      <div className="text-white/60">{label}</div>
      <div className={`mt-1 tabular-nums ${big ? "text-xl font-semibold text-white" : ""}`}>
        {value}
      </div>
    </div>
  );
}
function KpiStrip({ efficiency, share, personal }) {
  const items = [
    { label: "Efficienza stimata", value: efficiency },
    { label: "Quota premio (Top 3)", value: share },
    { label: "Personale (trim.)", value: personal },
  ];
  return (
    <div className="grid sm:grid-cols-3 gap-3">
      {items.map((it, i) => (
        <div key={i} className="kpi-chip rounded-xl px-4 py-3">
          <div className="text-[12px] text-white/60">{it.label}</div>
          <div className="mt-0.5 font-semibold tabular-nums">{it.value}</div>
        </div>
      ))}
    </div>
  );
}
function BreakdownBar({ provvigione, premio, totale }) {
  const provvPct = totale > 0 ? (provvigione / totale) * 100 : 0;
  const premioPct = totale > 0 ? (premio / totale) * 100 : 0;

  return (
    <div className="breakdown-wrap rounded-xl p-3 md:p-4">
      <div className="flex items-center justify-between text-xs text-white/60 mb-2">
        <span>Ripartizione ricavi</span>
        <span className="tabular-nums">
          {Math.round(provvPct)}% provv. • {Math.round(premioPct)}% premio
        </span>
      </div>

      <div className="h-3 w-full overflow-hidden rounded-full ring-1 ring-white/10">
        <div
          className="seg-provv h-full inline-block align-top transition-[width] duration-500 ease-out"
          style={{ width: `${provvPct}%` }}
          aria-label="Quota provvigione"
        />
        <div
          className="seg-premio h-full inline-block align-top transition-[width] duration-500 ease-out"
          style={{ width: `${premioPct}%` }}
          aria-label="Quota premio"
        />
      </div>

      <div className="mt-2 grid grid-cols-2 gap-2 text-[12px] text-white/70">
        <div className="flex items-center gap-2">
          <span className="inline-block h-2 w-2 rounded-full seg-provv" />
          <span>Provvigione 60%</span>
        </div>
        <div className="flex items-center gap-2 justify-end">
          <span className="inline-block h-2 w-2 rounded-full seg-premio" />
          <span>Premio gara</span>
        </div>
      </div>
    </div>
  );
}
function DecorBottom() {
  return (
    <div
      aria-hidden
      className="gold-rays pointer-events-none absolute inset-x-0 bottom-0 -z-10"
      style={{ height: "220px" }}
    />
  );
}

/* ========= QUICKSLIDERS (DEFINITO PRIMA DELL'USO) ========= */
function QuickSliders({ personal, setPersonal, company, setCompany }) {
  return (
    <div className="rounded-xl bg-white/5 ring-1 ring-white/10 p-4">
      <div className="grid sm:grid-cols-2 gap-6">
        <div>
          <div className="flex items-center justify-between text-sm text-white/70">
            <span>Fatturato personale</span>
            <b className="tabular-nums text-white/85">
              {Number(personal).toLocaleString("it-IT")} €
            </b>
          </div>
          <input
            type="range"
            min={0}
            max={150000}
            step={1000}
            value={Number(personal)}
            onChange={(e) => setPersonal(e.target.value)}
            className="w-full mt-2"
            style={{ accentColor: "var(--gold)" }}
          />
        </div>
        <div>
          <div className="flex items-center justify-between text-sm text-white/70">
            <span>Fatturato aziendale</span>
            <b className="tabular-nums text-white/85">
              {Number(company).toLocaleString("it-IT")} €
            </b>
          </div>
          <input
            type="range"
            min={100000}
            max={8000000}
            step={10000}
            value={Number(company)}
            onChange={(e) => setCompany(e.target.value)}
            className="w-full mt-2"
            style={{ accentColor: "var(--gold)" }}
          />
        </div>
      </div>
    </div>
  );
}

/* ========= COMPONENTE PRINCIPALE ========= */
export default function Calculator() {
  const [personal, setPersonal] = React.useState(DEFAULTS.personal);
  const [company, setCompany]   = React.useState(DEFAULTS.company);
  const [position, setPosition] = React.useState(DEFAULTS.position);

  const { setLiveValue, setLabel } = useCalcolo();

  const bonusObj = React.useMemo(
    () => BONUS_SHARES.find((b) => b.key === position) || BONUS_SHARES[0],
    [position]
  );

  const provvigione = Math.round(Math.max(0, personal) * PROVVIGIONE_BASE);
  const premio      = Math.round(Math.max(0, company)  * (bonusObj?.pct || 0));
  const totale      = provvigione + premio;

  const percentOnPersonal =
    personal > 0 ? Math.round((totale / personal) * 100) : null;
  const sharePct = Math.round((bonusObj?.pct || 0) * 100);

  /* Sync con HERO dinamico */
  React.useEffect(() => {
    setLabel("Totale stimato (trim.)");
    setLiveValue(totale);
  }, [totale, setLiveValue, setLabel]);

  return (
    <section className="relative py-16 sm:py-20 md:py-24">
      {/* BG + glare */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div
          className="absolute inset-0 opacity-[.06]"
          style={{
            backgroundImage:
              "repeating-linear-gradient(135deg, rgba(255,255,255,.9) 0 1px, transparent 1px 10px)",
          }}
        />
        <div
          className="absolute -top-10 left-1/2 h-60 w-[78%] -translate-x-1/2 blur-3xl opacity-60"
          style={{
            background:
              "radial-gradient(60% 60% at 50% 0%, rgba(201,168,110,.28), transparent 60%)",
          }}
        />
      </div>

      <DecorBottom />

      <div className="container">
        <SectionHeader kicker="Calcolatore" title="Stima immediata — Senior">
          <SectionP>
            Inserisci il tuo fatturato personale e la posizione in classifica
            trimestrale (gara). La stima considera <b>provvigione 60%</b> e
            l’eventuale <b>premio aziendale</b> per Top 3.
          </SectionP>
        </SectionHeader>

        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {/* COLONNA INPUT */}
          <div className="md:col-span-2 space-y-5">
            <div className="grid sm:grid-cols-2 gap-4">
              <NumberField
                label="Fatturato personale (trimestre)"
                value={personal}
                setValue={(v) => setPersonal(sanitizeNumber(v, 0, 1500000))}
                step={1000}
              />
              <SelectField
                label="Posizione in classifica (gara trimestrale)"
                value={position}
                setValue={setPosition}
                options={BONUS_SHARES}
              />
            </div>

            <NumberField
              label="Fatturato aziendale (trimestre)"
              value={company}
              setValue={(v) => setCompany(sanitizeNumber(v, 100000, 8000000))}
              step={10000}
            />

            {/* QUI ORA ESISTE E VIENE USATO */}
            <QuickSliders
              personal={personal}
              setPersonal={(v) => setPersonal(sanitizeNumber(v, 0, 1500000))}
              company={company}
              setCompany={(v) => setCompany(sanitizeNumber(v, 100000, 8000000))}
            />

            {/* KPI STRIP */}
            <KpiStrip
              efficiency={percentOnPersonal != null ? `${percentOnPersonal}%` : "—"}
              share={`${sharePct}%`}
              personal={formatEUR(personal)}
            />

            {/* BREAKDOWN BAR */}
            <BreakdownBar provvigione={provvigione} premio={premio} totale={totale} />

            {/* NOTE sintetiche */}
            <ul className="mt-3 grid gap-2 text-xs text-white/60">
              <li>• La provvigione base è fissata al <b>60%</b> sul personale.</li>
              <li>• Il premio di gara (solo Senior) è calcolato sul fatturato aziendale del trimestre.</li>
              <li>• Stima dimostrativa: prevalgono sempre regolamento e contratti firmati.</li>
            </ul>
          </div>

          {/* COLONNA OUTPUT */}
          <aside
            className="rounded-2xl p-5 md:p-6 ring-1"
            style={{
              background: "var(--glass-bg)",
              border: "1px solid var(--glass-stroke)",
              boxShadow: "var(--shadow-gold)",
            }}
          >
            <div className="grid gap-4">
              <Stat label="Provvigione 60%" value={formatEUR(provvigione)} />
              <Stat
                label="Premio (gara)"
                value={bonusObj?.pct ? formatEUR(premio) : "—"}
              />

              <div
                className="h-px w-full my-1"
                style={{
                  background:
                    "linear-gradient(90deg, transparent, var(--gold), transparent)",
                }}
              />

              <Stat label="Totale stimato" value={formatEUR(totale)} big />
              <Stat
                label="% sul fatturato personale"
                value={percentOnPersonal != null ? `${percentOnPersonal}%` : "—"}
              />

              <div className="mt-1 flex flex-wrap gap-2">
                <ButtonGold
                  as="a"
                  href="/carriere/candidatura?topic=calcolatore&ruolo=agente-senior"
                >
                  Candidati ora
                </ButtonGold>
                <ButtonGhost as="a" href="/carriere/benefit">
                  Vedi benefit & strumenti
                </ButtonGhost>
              </div>

              <p className="text-[12px] text-white/60">
                I valori sopra sono indicativi e non costituiscono proposta economica.
              </p>
            </div>
          </aside>
        </div>
      </div>

      {/* Scoped CSS */}
      <style jsx>{`
        @media (prefers-reduced-motion: reduce) {
          .gold-rays::before,
          .gold-rays::after {
            animation: none !important;
          }
        }
        .kpi-chip {
          background: linear-gradient(
              180deg,
              color-mix(in oklab, var(--brand) 12%, black),
              transparent
            ),
            rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(255, 255, 255, 0.08);
        }
        .breakdown-wrap {
          background: linear-gradient(
              180deg,
              rgba(255, 255, 255, 0.06),
              rgba(255, 255, 255, 0.03)
            );
          border: 1px solid rgba(255, 255, 255, 0.08);
        }
        .seg-provv {
          background: linear-gradient(
            90deg,
            color-mix(in oklab, var(--brand) 68%, black),
            var(--brand)
          );
        }
        .seg-premio {
          background: linear-gradient(
            90deg,
            color-mix(in oklab, var(--gold) 80%, #fff 20%),
            color-mix(in oklab, var(--gold) 70%, #000 30%)
          );
        }
        .gold-rays {
          mask-image: radial-gradient(70% 70% at 50% 100%, black, transparent 70%);
        }
        .gold-rays::before {
          content: "";
          position: absolute;
          inset: -20% -10% -40% -10%;
          background:
            conic-gradient(
              from 180deg at 50% 100%,
              rgba(201,168,110,0) 0deg,
              rgba(201,168,110,0.25) 25deg,
              rgba(201,168,110,0) 50deg
            );
          filter: blur(18px);
          animation: sweep 6s ease-in-out infinite alternate;
          opacity: .7;
        }
        .gold-rays::after {
          content: "";
          position: absolute;
          left: 50%;
          bottom: -2rem;
          transform: translateX(-50%);
          width: min(1100px, 92vw);
          height: 100px;
          background:
            linear-gradient(90deg, transparent, rgba(255,255,255,.08), transparent);
          border-radius: 9999px;
          filter: blur(6px);
          opacity: .8;
        }
        @keyframes sweep {
          0%   { transform: rotate(-8deg); }
          100% { transform: rotate(8deg); }
        }
      `}</style>
    </section>
  );
}
