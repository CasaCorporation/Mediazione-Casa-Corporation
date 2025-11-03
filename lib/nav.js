// common/nav/mediazione-nav.js — READY TO PASTE
//
// Adattato da “Carriere” → “Mediazione”.
// - Mantiene SOLO le sezioni/pagine che oggi esistono nell’area Carriere.
// - Aggiorna gli href al nuovo namespace “/mediazione/*”.
// - Rimosso tutto ciò che non è pertinente (es. Area Riservata, Software fallback).
// - Le preview usano gli hero già presenti nelle rispettive cartelle.
//
// Se tieni la struttura file degli hero identica, basta rinominare la root folder in /mediazione/hero/*

/* Helper: path hero standard per pagina */
const hero = (slug) => `/mediazione/hero/${slug}/desktop.avif`;

/* NAV Mediazione — 3 macro-sezioni */
const NAV = [
/* 1) Offerte di lavoro */
{
label: "Offerte di lavoro",
href: "/mediazione",
preview: {
title: "Offerte di lavoro",
desc: "Posizioni aperte e collaborazioni.",
image: hero("agenti"), // hero generico per la landing di Mediazione
},
groups: [
{
title: "Offerte di lavoro",
items: [
{
label: "Agenti Immobiliari",
href: "/mediazione/agenti-immobiliari",
preview: {
title: "Agenti",
desc: "Junior, Senior, Leader.",
image: hero("agenti"),
},
},
{
label: "Back Office",
href: "/mediazione/back-office",
preview: {
title: "Back Office",
desc: "Agenda, workflow, pubblicazioni.",
image: hero("back-office"),
},
},
],
},
{
title: "Partnership & Altre figure",
items: [
{
label: "Collaborazioni",
href: "/mediazione/collaborazioni",
preview: {
title: "Collaborazioni",
desc: "Partner e studi tecnici.",
image: hero("collaborazioni"),
},
},
{
label: "Altre posizioni",
href: "/mediazione/altre-posizioni",
preview: {
title: "Altre figure",
desc: "Fotografo, IT, Marketing.",
image: hero("altre-posizioni"),
},
},
],
},
{
title: "Processo di selezione",
items: [
{
label: "Processo di selezione",
href: "/mediazione/processo",
preview: {
title: "Processo di selezione",
desc: "Step, tempi e cosa aspettarti.",
image: hero("processo"),
},
},
],
},
],
},

/* 2) Gara Aziendale */
{
label: "Gara Aziendale",
href: "/mediazione/gara",
preview: {
title: "Gara aziendale",
desc: "Economics, vantaggi e simulazioni.",
image: hero("gara"),
},
groups: [
{
title: "Economics & Vantaggi",
items: [
{
label: "Gara Trimestrale",
href: "/mediazione/gara",
preview: {
title: "Gara",
desc: "Montepremi trimestrale.",
image: hero("gara"),
},
},
{
label: "Confronto modelli",
href: "/mediazione/confronto",
preview: {
title: "Confronto",
desc: "Numeri a confronto.",
image: hero("confronto"),
},
},
{
label: "Calcolatore guadagni",
href: "/mediazione/calcolatore",
preview: {
title: "Calcolatore",
desc: "Simulazioni provvigioni.",
image: hero("calcolatore"),
},
},
],
},
],
},

/* 3) Metodo, Formazione, Strumenti */
{
label: "Metodo, Formazione, Strumenti",
href: "/mediazione/metodo",
preview: {
title: "Metodo, Formazione, Strumenti",
desc: "Processi, onboarding e tool di lavoro.",
image: hero("metodo"),
},
groups: [
{
title: "Metodo & Formazione",
items: [
{
label: "Metodo",
href: "/mediazione/metodo",
preview: {
title: "Metodo",
desc: "Processo non aggirabile.",
image: hero("metodo"),
},
},
{
label: "Formazione",
href: "/mediazione/formazione",
preview: {
title: "Formazione",
desc: "Onboarding e tutoring.",
image: hero("formazione"),
},
},
],
},
{
title: "Strumenti",
items: [
{
label: "Strumenti",
href: "/mediazione/strumenti",
preview: {
title: "Strumenti",
desc: "Portali, materiali, supporto.",
image: hero("strumenti"),
},
},
],
},
],
},
];

export default NAV;
