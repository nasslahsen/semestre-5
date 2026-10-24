// Outils communs aux tests dans le navigateur (Chromium piloté par playwright-core).
// Prérequis : un serveur statique à la racine du dépôt (python3 -m http.server 8765)
// et playwright-core installé (npm install --no-save playwright-core). Voir CLAUDE.md, « Vérifier ».
"use strict";
const fs = require("fs"), path = require("path");
const BASE = process.env.BASE || "http://127.0.0.1:8765/";
// RACINE : dossier servi sous BASE
const RACINE = process.env.RACINE ? path.resolve(process.env.RACINE) : path.join(__dirname, "..", "..");
const CAPTURES = path.join(__dirname, "captures");

async function lancer() {
  const { chromium } = require("playwright-core");
  const chemin = process.env.CHROMIUM || ["/opt/pw-browsers/chromium-1194/chrome-linux/chrome", "/opt/pw-browsers/chromium"].find(p => fs.existsSync(p));
  return chromium.launch(chemin ? { executablePath: chemin } : {});
}
function dossier(...p) { const d = path.join(CAPTURES, ...p); fs.mkdirSync(d, { recursive: true }); return d; }
// Pages de cours d'un module, chemins depuis modules/<id>/ sans « .html » : les pages de chapitre (chapitres/chapitre-<n>),
// ou, pour un module sans chapitres, les pages de cours (cours/<page>). Un nom seul donné en argument vise cours/<nom>.
function pagesCours(mid) {
  const ch = path.join(RACINE, "modules", mid, "chapitres"), d = path.join(RACINE, "modules", mid, "cours");
  if (fs.existsSync(ch)) return fs.readdirSync(ch).filter(f => /^chapitre-\d+\.html$/.test(f))
    .sort((a, b) => parseInt(a.slice(9), 10) - parseInt(b.slice(9), 10)).map(f => "chapitres/" + f.replace(".html", ""));
  return fs.existsSync(d) ? fs.readdirSync(d).filter(f => f.endsWith(".html") && f !== "index.html").map(f => "cours/" + f.replace(".html", "")) : [];
}
const cheminPage = p => p.includes("/") ? p : "cours/" + p;

module.exports = { BASE, RACINE, lancer, dossier, pagesCours, cheminPage, W: +(process.env.W || 1180), H: +(process.env.H || 820) };
