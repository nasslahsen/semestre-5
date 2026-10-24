// Capture chaque figure des pages de cours d'un module (tests/navigateur/captures/<module>/figures/<page>-<n>.png),
// pour les relire une à une avant de publier. Planche contact : python3 tests/navigateur/planche.py <dossier> <prefixe>
// Lancer : node tests/navigateur/figures.js <module> [page ...]
"use strict";
const { BASE, lancer, dossier, pagesCours, cheminPage, W, H } = require("./commun");
const mid = process.argv[2];
if (!mid) { console.error("usage : node tests/navigateur/figures.js <module> [page ...]"); process.exit(2); }

(async () => {
  const b = await lancer();
  const pg = await (await b.newContext({ viewport: { width: W, height: H } })).newPage();
  const out = dossier(mid, "figures");
  const pages = process.argv.slice(3).length ? process.argv.slice(3).map(cheminPage) : pagesCours(mid);
  for (const p of pages) {
    await pg.goto(`${BASE}modules/${mid}/${p}.html`, { waitUntil: "networkidle" });
    await pg.addStyleTag({ content: ".site-barre{position:static!important}" }); await pg.waitForTimeout(400);
    const figs = await pg.$$(".fig");
    for (let i = 0; i < figs.length; i++) { await figs[i].scrollIntoViewIfNeeded(); await pg.waitForTimeout(120); await figs[i].screenshot({ path: `${out}/${p.split("/").pop()}-${String(i).padStart(2, "0")}.png` }); }
    console.log(p, figs.length + " figure(s)");
  }
  await b.close();
  console.log("captures dans " + out);
})();
