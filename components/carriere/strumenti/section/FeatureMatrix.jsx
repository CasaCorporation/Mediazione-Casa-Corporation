// components/carriere/strumenti/section/FeatureMatrix.jsx
"use client";

import React from "react";
import SectionHeader, { SectionP } from "@/common/section/SectionHeader";

const FEATURES = [
  { k:"lead-capture",    name:"Acquisizione lead",          casa:"Automatica", altri:"Manuale/Parziale", tag:"crm" },
  { k:"pipeline",        name:"Pipeline non aggirabile",    casa:"Sì",         altri:"No",              tag:"processo" },
  { k:"sla-alert",       name:"SLA & alert",                casa:"Sì",         altri:"Limitati",        tag:"processo" },
  { k:"ads-sync",        name:"Sync portali & Ads",         casa:"Completa",   altri:"Parziale",        tag:"marketing" },
  { k:"templates",       name:"Template ufficiali",         casa:"Sì",         altri:"Variabili",       tag:"qualita" },
  { k:"audit",           name:"Audit trail",                casa:"Completo",   altri:"Assente",         tag:"compliance" },
  { k:"mobile",          name:"App mobile",                 casa:"Sì",         altri:"Parziale",        tag:"mobilita" },
  { k:"kpi",             name:"Dashboard KPI",              casa:"Live + storico", altri:"Report manuali", tag:"dati" },
  { k:"exports",         name:"Export CSV/Excel",           casa:"Sì",         altri:"Limitati",        tag:"dati" },
  { k:"permissions",     name:"Permessi & ruoli",           casa:"Granulari",  altri:"Base",            tag:"compliance" },
];

const TAGS = [
  { k:"all", label:"Tutte" },
  { k:"crm", label:"CRM" },
  { k:"processo", label:"Processo" },
  { k:"marketing", label:"Marketing" },
  { k:"qualita", label:"Qualità" },
  { k:"compliance", label:"Compliance" },
  { k:"mobilita", label:"Mobilità" },
  { k:"dati", label:"Dati" },
];

export default function FeatureMatrix(){
  const [q, setQ] = React.useState("");
  const [tag, setTag] = React.useState("all");
  const [sort, setSort] = React.useState({ by:"name", dir:"asc" });

  const rows = React.useMemo(()=>{
    let r = FEATURES.filter(f => (tag==="all" || f.tag===tag) && f.name.toLowerCase().includes(q.toLowerCase()));
    r.sort((a,b)=>{
      const av = a[sort.by]?.toString().toLowerCase() || "";
      const bv = b[sort.by]?.toString().toLowerCase() || "";
      return (av>bv?1:av<bv?-1:0) * (sort.dir==="asc"?1:-1);
    });
    return r;
  }, [q, tag, sort]);

  const changeSort = (by) => setSort(s => s.by===by ? { by, dir: s.dir==="asc"?"desc":"asc" } : { by, dir:"asc" });

  return (
    <section id="funzioni" aria-labelledby="fx-title" className="relative py-16 sm:py-20 md:py-24">
      <div className="container">
        <SectionHeader
          id="fx-title"
          title="Cosa fa davvero lo stack"
          size="lg"
          tone="dark"
          underline
          className="mb-4 sm:mb-5 text-center"
        />
        <div className="mx-auto mb-6 max-w-[74ch] text-center">
          <SectionP className="text-white/85">Filtra per categoria, cerca e ordina le funzionalità.</SectionP>
        </div>

        <div className="mb-3 flex flex-wrap items-center justify-center gap-2">
          <label className="sr-only" htmlFor="fx-search">Cerca funzione</label>
          <input
            id="fx-search"
            type="search" value={q} onChange={(e)=>setQ(e.target.value)}
            className="h-9 w-[200px] rounded-lg bg-white/[.06] ring-1 ring-white/10 border border-white/15 px-2"
            placeholder="Cerca funzione…"
          />
          <label className="sr-only" htmlFor="fx-tag">Categoria</label>
          <select
            id="fx-tag"
            value={tag} onChange={(e)=>setTag(e.target.value)}
            className="h-9 rounded-lg bg-white/[.06] ring-1 ring-white/10 border border-white/15 px-2"
          >
            {TAGS.map(t => <option key={t.k} value={t.k}>{t.label}</option>)}
          </select>
        </div>

        <div className="relative overflow-hidden rounded-xl ring-1 ring-white/10">
          <div className="max-h-[520px] overflow-auto [scrollbar-gutter:stable]">
            <table className="min-w-full text-sm">
              <thead className="sticky top-0 z-10 bg-[color:var(--brand-dark)]/80 backdrop-blur supports-[backdrop-filter]:bg-[color:var(--brand-dark)]/50">
                <tr className="text-left text-white/70">
                  <Th label="Funzione" sortable active={sort.by==="name"} dir={sort.dir} onClick={()=>changeSort("name")} />
                  <Th label="Casa Corporation" />
                  <Th label="Altri modelli" />
                  <Th label="Categoria" sortable active={sort.by==="tag"} dir={sort.dir} onClick={()=>changeSort("tag")} />
                </tr>
              </thead>
              <tbody>
                {rows.map(r => (
                  <tr key={r.k} className="border-t border-white/10">
                    <td className="px-4 py-3">{r.name}</td>
                    <td className="px-4 py-3 font-semibold text-white">{r.casa}</td>
                    <td className="px-4 py-3 text-white/85">{r.altri}</td>
                    <td className="px-4 py-3">
                      <span className="rounded-md bg-white/5 ring-1 ring-white/10 px-2 py-1 text-[12px]">{tagLabel(r.tag)}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div aria-hidden className="pointer-events-none absolute inset-0 rounded-xl" style={{ boxShadow: "inset 0 0 0 1px var(--glass-stroke)" }}/>
        </div>
      </div>
    </section>
  );
}

function Th({ label, sortable=false, active=false, dir="asc", onClick }){
  return (
    <th className="px-4 py-3 font-medium whitespace-nowrap">
      {sortable ? (
        <button onClick={onClick} className="inline-flex items-center gap-1">
          {label} <SortIcon active={active} dir={dir}/>
        </button>
      ) : label}
    </th>
  );
}
function SortIcon({active, dir}) {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" aria-hidden className={`opacity-${active? "90":"40"}`}>
      {dir==="asc"
        ? <path d="M7 14l5-5 5 5" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" />
        : <path d="M7 10l5 5 5-5" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" />}
    </svg>
  );
}
function tagLabel(k){
  const t = {
    crm:"CRM", processo:"Processo", marketing:"Marketing", qualita:"Qualità",
    compliance:"Compliance", mobilita:"Mobilità", dati:"Dati"
  }[k];
  return t || k;
}
