// Cours d'un chapitre sur une seule page : réunit les pages de cours (notions) du chapitre, section par section
// (sections de module.js), dans modules/<id>/chapitres/chapitre-<n>.html, sans rien changer à leur contenu.
// Chaque section devient <section class="partie" id="s-<section>"> (titre h2) ; chaque notion <article class="notion" id="n-<notion>">,
// son titre en h3, ses sections en h4, h5. Les scripts propres au module (figures, dessins) suivent.
// Lancer : node outils/regrouper.js <module> [...]   ou   node outils/regrouper.js --tous
// (tests/static-check.js vérifie que les pages sont à jour).
"use strict";
const fs = require("fs"), path = require("path");

// Mots d'un titre, sans balises, accents ni ponctuation : pour repérer les titres qui se répètent.
function mots(t) {
  return t.replace(/<[^>]+>|\\\(.*?\\\)/g, "").normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase()
    .replace(/[^a-z0-9 ]/g, " ").split(/\s+/).filter(Boolean);
}

// Page du cours du chapitre ch du module mid (dossier d, module.js P).
function pageChapitre(mid, d, P, ch) {
  const profond = "../../../", local = "../";
  const ss = P.sections.filter(s => s.chapitre === ch.id);
  let corps = "";
  const scripts = [];
  let avecSchemas = false; // une page de cours au moins a des schémas en blocs (commun/js/schema.js)
  let lang = "fr"; // la langue des pages de cours réunies (le cours d'anglais : en)
  ss.forEach((s, k) => {
    // pas de titre répété : la section ne redit pas le titre du chapitre
    const titreSection = mots(s.titre).join(" ") === mots(ch.titre).join(" ") ? "" : `<h2>${s.titre}</h2>\n`;
    corps += `<section class="partie" id="s-${s.id}">\n<p class="rang-partie">${k + 1} / ${ss.length}</p>\n${titreSection}\n`;
    for (const nid of s.notions) {
      const html = fs.readFileSync(path.join(d, "cours", nid + ".html"), "utf8");
      lang = (html.match(/<html lang="([a-z]+)"/) || [0, lang])[1];
      let m = html.match(/<main>([\s\S]*?)<\/main>/)[1];
      // liens vers d'autres pages de cours : vers la page du chapitre qui les réunit, au même passage
      m = m.replace(/href="([a-z0-9-]+)\.html(?:#([^"]*))?"/g, (tout, page, ancre) => {
        const sec = P.sections.find(x => x.notions.includes(page));
        if (!sec) return tout;
        return 'href="chapitre-' + sec.chapitre + ".html#" + (ancre ? page + "-" + ancre : "n-" + page) + '"';
      });
      // titre de la notion : pas répété s'il redit celui du chapitre ou de la section, ou, pour la seule notion d'une
      // section, s'il ne fait que le prolonger (« UART » puis « UART : transmission asynchrone »)
      m = m.replace(/<h1>([\s\S]*?)<\/h1>\s*/, (tout, t) => {
        const a = mots(t), b = mots(s.titre), c = mots(ch.titre);
        const egal = (x, y) => x.join(" ") === y.join(" ");
        const prolonge = s.notions.length === 1 && (egal(a.slice(0, b.length), b) || egal(b.slice(0, a.length), a));
        return egal(a, b) || egal(a, c) || prolonge ? "" : tout;
      });
      m = m.replace(/\s*<p class="etiquette" data-etiquette><\/p>\s*/, "\n")
        .replace(/<(\/?)h3>/g, "<$1h5>").replace(/<(\/?)h2>/g, "<$1h4>").replace(/<(\/?)h1>/g, "<$1h3>");
      corps += '<article class="notion" id="n-' + nid + '">' + m.replace(/\s+$/, "\n") + "</article>\n\n";
      for (const f of html.matchAll(/<script src="\.\.\/([^"]+)"><\/script>/g)) if (f[1] !== "module.js" && !f[1].startsWith("../") && !scripts.includes(f[1])) scripts.push(f[1]);
      if (html.includes('<script src="../../../commun/js/schema.js"></script>')) avecSchemas = true;
    }
    corps += `<div class="fin-partie" data-section="${s.id}"></div>\n</section>\n\n`;
  });
  return `<!doctype html>
<html lang="${lang}" data-module="${mid}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,500;12..96,700;12..96,800&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@500;700&display=swap" rel="stylesheet">
<title>${ch.titre}</title>
<link rel="stylesheet" href="${profond}commun/vendor/katex/katex.min.css">
<link rel="stylesheet" href="${profond}commun/css/cours.css">
<link rel="stylesheet" href="${profond}commun/css/barre.css">
<script src="${profond}registre.js"></script>
<script src="${profond}commun/js/plateforme.js"></script>
<script src="${local}module.js"></script>
</head>
<body>
<!-- Généré par outils/regrouper.js à partir des pages de cours du chapitre ${ch.id}. -->
<main class="cours-chapitre" data-chapitre="${ch.id}">
<p class="etiquette" data-etiquette></p>
<h1>${ch.titre}</h1>

${corps}</main>
<script src="${profond}commun/vendor/katex/katex.min.js"></script>
<script src="${profond}commun/vendor/katex/auto-render.min.js"></script>
<script src="${profond}commun/js/lib.js"></script>
<script src="${profond}commun/js/section.js"></script>
${avecSchemas ? `<script src="${profond}commun/js/schema.js"></script>\n` : ""}${scripts.map(f => `<script src="${local}${f}"></script>`).join("\n")}
</body>
</html>
`;
}
// Chapitres qui ont des sections.
function chapitresAvecSections(P) { return P.chapitres.filter(c => P.sections.some(s => s.chapitre === c.id)); }
module.exports = { pageChapitre, chapitresAvecSections };

if (require.main === module) {
  const racine = path.join(__dirname, "..", "modules");
  let ids = process.argv.slice(2);
  if (!ids.length) { console.error("usage : node outils/regrouper.js <module> [...]   ou   --tous"); process.exit(2); }
  if (ids[0] === "--tous") ids = fs.readdirSync(racine).filter(m => fs.existsSync(path.join(racine, m, "module.js")));
  for (const mid of ids) {
    const d = path.join(racine, mid);
    let P = null;
    global.PLATEFORME = { parcours: (id, p) => { P = p; } };
    delete require.cache[require.resolve(path.join(d, "module.js"))];
    require(path.join(d, "module.js"));
    if (!P.sections) { console.log(mid + " : pas de sections"); continue; }
    const dossier = path.join(d, "chapitres");
    fs.mkdirSync(dossier, { recursive: true });
    for (const f of fs.readdirSync(dossier)) if (/^chapitre-\d+\.html$/.test(f)) fs.unlinkSync(path.join(dossier, f));
    for (const ch of chapitresAvecSections(P)) fs.writeFileSync(path.join(dossier, "chapitre-" + ch.id + ".html"), pageChapitre(mid, d, P, ch));
    console.log(mid + " : " + chapitresAvecSections(P).length + " chapitres, " + P.sections.length + " sections");
  }
}
