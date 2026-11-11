// Textes pour générer des podcasts (NotebookLM par exemple) : le cours de chaque chapitre en texte simple,
// tiré des pages de cours du site (donc des documents reçus), dans textes-podcast/<module>/ (pas commité).
// Un fichier par chapitre de cours (pas les TD ni les labs), plus consignes.md : la consigne à donner pour chaque chapitre.
// Les figures interactives et les photos ne passent pas dans le texte ; les formules restent en LaTeX.
// Lancer : node outils/textes-podcast.js <module> [...]   ou   node outils/textes-podcast.js --tous
"use strict";
const fs = require("fs"), path = require("path"), vm = require("vm");
const racine = path.join(__dirname, "..");

function entites(t) {
  return t.replace(/&nbsp;/g, " ").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"').replace(/&#39;/g, "'")
    .replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(+n)).replace(/&amp;/g, "&");
}
const sansBalises = t => entites(t.replace(/<br\s*\/?>/g, " ").replace(/<[^>]+>/g, "")).replace(/[ \t]+/g, " ").trim();

// Corps d'une page de cours (<main>) en Markdown simple.
function texte(html) {
  let m = html.match(/<main>([\s\S]*?)<\/main>/)[1];
  const codes = [];
  m = m.replace(/<pre[^>]*?(?:data-titre="([^"]*)")?[^>]*><code>([\s\S]*?)<\/code><\/pre>/g, (_, titre, c) => {
    codes.push((titre ? entites(titre) + " :\n" : "") + "```\n" + entites(c).replace(/\n+$/, "") + "\n```");
    return "\n\n@@CODE" + (codes.length - 1) + "@@\n\n";
  });
  m = m.replace(/<script[\s\S]*?<\/script>/g, "")
    .replace(/<figure class="photo[\s\S]*?<\/figure>/g, "")
    .replace(/<div id="fig-[^"]*"[^>]*><\/div>/g, "")
    .replace(/<p class="etiquette"[^>]*><\/p>/g, "")
    .replace(/<h1>[\s\S]*?<\/h1>/g, "")
    .replace(/<summary>[\s\S]*?<\/summary>/g, "\n\nCorrection :\n\n");
  // tableaux : une ligne par rangée
  m = m.replace(/<table[\s\S]*?<\/table>/g, t => {
    const rangs = [...t.matchAll(/<tr[\s\S]*?<\/tr>/g)].map(r => [...r[0].matchAll(/<t[hd][^>]*>([\s\S]*?)<\/t[hd]>/g)].map(c => sansBalises(c[1])));
    if (!rangs.length) return "";
    const lignes = rangs.map(r => "| " + r.join(" | ") + " |");
    lignes.splice(1, 0, "|" + rangs[0].map(() => " --- |").join(""));
    return "\n\n" + lignes.join("\n") + "\n\n";
  });
  m = m.replace(/<h2[^>]*>([\s\S]*?)<\/h2>/g, (_, t) => "\n\n### " + sansBalises(t) + "\n\n")
    .replace(/<h3[^>]*>([\s\S]*?)<\/h3>/g, (_, t) => "\n\n#### " + sansBalises(t) + "\n\n")
    .replace(/<li[^>]*>([\s\S]*?)<\/li>/g, (_, t) => "\n- " + sansBalises(t) + "\n")
    .replace(/<\/?(ul|ol)[^>]*>/g, "\n")
    .replace(/<(p|div|figcaption|details|section)[^>]*>/g, "\n\n").replace(/<\/(p|div|figcaption|details|section)>/g, "\n\n");
  m = m.split("\n").map(l => /^(#|- |\|)/.test(l.trim()) ? l.trim() : sansBalises(l)).join("\n");
  m = m.replace(/@@CODE(\d+)@@/g, (_, k) => codes[+k]);
  m = m.replace(/\n{3,}/g, "\n\n");
  while (/(\n- [^\n]*)\n\n(?=- )/.test(m)) m = m.replace(/(\n- [^\n]*)\n\n(?=- )/g, "$1\n");
  return m.trim();
}

function consigne(ch, notions) {
  return `Podcast en français pour une étudiante ingénieure en génie biomédical qui révise le chapitre « ${ch.titre} ». ` +
    `Suivez l'ordre du cours : ${notions.join(", ")}. Pour chaque notion, partez d'une situation concrète, puis donnez la définition exacte ` +
    `et la formule avec la notation du cours, en lisant les symboles à voix haute. Faites un exemple chiffré pas à pas. ` +
    `Signalez les pièges et confusions fréquentes. N'inventez rien qui ne soit pas dans les sources. ` +
    `Terminez par un résumé de ce qu'il faut retenir et trois questions pour se tester, avec leurs réponses.`;
}

function module_(mid) {
  const bac = { window: {}, parcours: {} };
  bac.PLATEFORME = { parcours: (id, p) => { bac.parcours[id] = p; }, couleur: () => "#000", clair: () => "#fff", teinte: () => "#000" };
  vm.createContext(bac);
  vm.runInContext(fs.readFileSync(path.join(racine, "registre.js"), "utf8"), bac);
  vm.runInContext(fs.readFileSync(path.join(racine, "modules", mid, "module.js"), "utf8"), bac);
  const P = bac.parcours[mid], reg = bac.window.REGISTRE.modules.find(m => m.id === mid) || { titre: mid, sousModules: [] };
  const smDe = ch => ch.sousModule || (reg.sousModules[0] || {}).id;
  // même numérotation que PLATEFORME.numero : à partir de 1 dans chaque sous-module (0 pour « Les bases »)
  const numero = ch => {
    if (ch.numero !== undefined) return ch.numero;
    const chs = P.chapitres.filter(c => smDe(c) === smDe(ch));
    return ch.id - chs[0].id + (chs[0].id === 0 ? 0 : 1);
  };
  const dossier = path.join(racine, "textes-podcast", mid);
  fs.rmSync(dossier, { recursive: true, force: true });
  fs.mkdirSync(dossier, { recursive: true });
  let consignes = `# Podcasts : ${reg.titre}\n\nDans NotebookLM : un carnet par chapitre, le fichier du chapitre comme source (ou son texte collé), ` +
    `langue de sortie : français, puis la consigne ci-dessous dans le champ de personnalisation du résumé audio.\n`;
  let nb = 0;
  for (const ch of P.chapitres) {
    if (ch.td || ch.lab) continue;
    const ss = (P.sections || []).filter(s => s.chapitre === ch.id);
    if (!ss.length) continue;
    const sm = reg.sousModules.find(s => s.id === smDe(ch));
    const n = numero(ch), titreCours = id => ((P.cours || []).find(c => c.id === id) || { titre: id }).titre;
    const notions = ss.flatMap(s => s.notions.map(titreCours));
    let md = `# ${reg.titre}${sm && reg.sousModules.length > 1 ? " · " + sm.titre : ""}\n\n# Chapitre ${n} : ${ch.titre}\n\n`;
    if (ch.sous) md += ch.sous + "\n\n";
    for (const s of ss) {
      md += `\n## ${s.titre}\n\n`;
      for (const nid of s.notions) {
        const f = path.join(racine, "modules", mid, "cours", nid + ".html");
        if (!fs.existsSync(f)) continue;
        md += (titreCours(nid) === s.titre ? "" : `\n## ${titreCours(nid)}\n\n`) + texte(fs.readFileSync(f, "utf8")) + "\n\n";
      }
    }
    const nom = (sm && reg.sousModules.length > 1 ? sm.id + "-" : "") + "chapitre-" + n + ".md";
    fs.writeFileSync(path.join(dossier, nom), md.replace(/\n{3,}/g, "\n\n"));
    consignes += `\n## Chapitre ${n} : ${ch.titre}${sm && reg.sousModules.length > 1 ? " (" + sm.titre + ")" : ""}\n\nSource : ${nom}\n\n${consigne(ch, notions)}\n`;
    nb++;
  }
  fs.writeFileSync(path.join(dossier, "consignes.md"), consignes);
  console.log(`${mid} : ${nb} chapitres dans textes-podcast/${mid}/`);
}

if (require.main === module) {
  let ids = process.argv.slice(2);
  if (!ids.length) { console.error("usage : node outils/textes-podcast.js <module> [...]   ou   --tous"); process.exit(2); }
  if (ids[0] === "--tous") ids = fs.readdirSync(path.join(racine, "modules")).filter(m => m !== "_modele" && fs.existsSync(path.join(racine, "modules", m, "module.js")));
  ids.forEach(module_);
}
