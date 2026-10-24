// Structure par chapitres : la carte (un nœud par chapitre) et la grande page de chaque chapitre.
// Vérifie : aucune erreur ; carte : un nœud par chapitre, un seul bouton Reprendre, nœuds dans l'écran ;
// page du chapitre : sections et notions dans l'ordre, aucun bouton entre les sections, « 2 / 4 » dans la barre qui suit la lecture,
// section lue quand on passe sa fin, un bloc « Jouer » facultatif après chaque notion qui a un niveau, révision et défi final en fin
// de chapitre, « Chapitre suivant » ; un exercice s'ouvre par-dessus la page et « Revenir au cours » la retrouve à la même place ;
// « Revoir dans le cours » vise le cours du chapitre ; Reprendre. Une capture par écran.
// Lancer : node tests/navigateur/chapitres.js <module>      (W et H pour la taille d'écran)
"use strict";
const path = require("path");
const { BASE, lancer, dossier, W, H } = require("./commun");
const mid = process.argv[2];
if (!mid) { console.error("usage : node tests/navigateur/chapitres.js <module>"); process.exit(2); }
let P = null;
global.PLATEFORME = { parcours: (id, p) => { P = p; } };
require(path.join(__dirname, "..", "..", "modules", mid, "module.js"));
const dc = `${BASE}modules/${mid}/`;

(async () => {
  const b = await lancer();
  const pg = await (await b.newContext({ viewport: { width: W, height: H }, hasTouch: true })).newPage();
  const out = dossier(mid, "chapitres-" + W + "x" + H);
  let ko = 0;
  const pb = m => { ko++; console.error("ÉCHEC", m); };
  const errs = []; pg.on("pageerror", e => errs.push(String(e))); pg.on("console", m => { if (m.type() === "error") errs.push(m.text()); });
  const verifErr = ou => { if (errs.length) pb(`${ou} : ${errs.splice(0).join(" | ")}`); };

  await pg.goto(BASE + "index.html", { waitUntil: "networkidle" }); await pg.evaluate(() => localStorage.clear()); await pg.waitForTimeout(300); errs.splice(0);
  // chapitres qui ont un cours, groupés par sous-module (ordre de module.js)
  const smDe = ch => (P.chapitres.find(c => c.id === ch) || {}).sousModule || "";
  const chs = P.chapitres.map(c => c.id).filter(id => P.sections.some(s => s.chapitre === id));
  const sms = [...new Set(chs.map(smDe))];

  for (const sm of sms) {
    const chsm = chs.filter(c => smDe(c) === sm), urlCarte = dc + "index.html" + (sm ? "?sm=" + sm : "");
    // Carte du sous-module
    await pg.goto(urlCarte, { waitUntil: "networkidle" }); await pg.waitForTimeout(300);
    verifErr("carte " + sm);
    const noeuds = await pg.$$eval(".noeud-chapitre", l => l.map(a => { const r = a.getBoundingClientRect(); return { href: a.href, r: [r.left, r.right] }; }));
    if (noeuds.length !== chsm.length) pb(`carte ${sm} : ${noeuds.length} nœuds pour ${chsm.length} chapitres`);
    noeuds.forEach((n, i) => { if (n.r[0] < 0 || n.r[1] > W) pb(`carte ${sm} : nœud ${i} hors de l'écran`); if (!n.href.endsWith(`chapitre-${chsm[i]}.html`)) pb(`carte ${sm} : nœud ${i} mène à ${n.href}`); });
    if (await pg.$$eval(".btn.reprendre", l => l.length) !== 1) pb(`carte ${sm} : pas un seul bouton Reprendre`);
    const liens = await pg.$$eval("#entete a, #chapitres a", l => l.length);
    if (liens > chsm.length + 4) pb(`carte ${sm} : ${liens} liens, trop de choses à toucher`);
    await pg.screenshot({ path: path.join(out, `carte${sm ? "-" + sm : ""}.png`), fullPage: true });

    for (const [ic, ch] of chsm.entries()) {
      const ss = P.sections.filter(s => s.chapitre === ch);
      const niv = P.niveaux.filter(n => n.chapitre === ch && n.pret);
      const notions = ss.flatMap(x => x.notions);
      await pg.goto(dc + `chapitres/chapitre-${ch}.html`, { waitUntil: "networkidle" }); await pg.waitForTimeout(300);
      verifErr("chapitre " + ch);
      const v = await pg.evaluate(() => ({ parties: [...document.querySelectorAll("section.partie")].map(x => x.id), notions: [...document.querySelectorAll("article.notion")].map(a => a.id),
        katexErr: document.querySelectorAll(".katex-error").length, figs: document.querySelectorAll(".fig .dessin").length, vides: [...document.querySelectorAll(".fig")].filter(f => !f.querySelector(".dessin")).length,
        jouer: [...document.querySelectorAll(".jouer")].map(j => j.dataset.niveau), suite: (document.querySelector(".fin-cours a.aller") || {}).href || "",
        apresNotion: [...document.querySelectorAll("article.notion + .jouer")].length }));
      if (v.parties.join() !== ss.map(x => "s-" + x.id).join()) pb(`chapitre ${ch} : sections ${v.parties}`);
      if (v.notions.join() !== notions.map(n => "n-" + n).join()) pb(`chapitre ${ch} : notions ${v.notions}`);
      if (v.katexErr) pb(`chapitre ${ch} : ${v.katexErr} formules en erreur`);
      if (v.vides) pb(`chapitre ${ch} : ${v.vides} figures pas dessinées`);
      const avecPage = notions.filter(n => niv.some(x => x.id === n));
      const attendus = avecPage.concat(niv.filter(n => !n.revision && !n.boss && !notions.includes(n.id)).map(n => n.id), niv.filter(n => n.revision || n.boss).map(n => n.id));
      if (v.jouer.join() !== attendus.join()) pb(`chapitre ${ch} : blocs Jouer ${v.jouer} au lieu de ${attendus}`);
      if (v.apresNotion !== avecPage.length) pb(`chapitre ${ch} : un bloc Jouer n'est pas juste après sa notion`);
      const suivant = chsm[ic + 1];
      if (suivant !== undefined ? !v.suite.endsWith(`chapitre-${suivant}.html`) : !v.suite.includes("index.html")) pb(`chapitre ${ch} : la fin mène à ${v.suite}`);
      if (ic === 0) await pg.screenshot({ path: path.join(out, `chapitre-${ch}-debut.png`) });
      for (let k = 0; k < ss.length; k++) {
        await pg.evaluate(id => document.getElementById(id).scrollIntoView({ block: "start" }), "s-" + ss[k].id); await pg.waitForTimeout(250);
        const r = await pg.$eval(".rang-barre", e => e.textContent);
        if (k < ss.length - 1 && r !== `${k + 1} / ${ss.length}`) pb(`chapitre ${ch}, section ${k + 1} : la barre indique « ${r} »`);
        await pg.evaluate(id => document.querySelector(`.fin-partie[data-section="${id}"]`).scrollIntoView({ block: "center" }), ss[k].id); await pg.waitForTimeout(200);
        const lue = await pg.evaluate(([m, s]) => !!(JSON.parse(localStorage.getItem("s5-progres"))[m].sections || {})[s], [mid, ss[k].id]);
        if (!lue) pb(`${ss[k].id} : pas marquée lue en passant sa fin`);
      }
      if (ic === 0 && v.jouer.length) {
        await pg.evaluate(() => document.querySelector(".jouer").scrollIntoView({ block: "center" })); await pg.waitForTimeout(200);
        await pg.screenshot({ path: path.join(out, `chapitre-${ch}-jouer.png`) });
      }
      await pg.evaluate(() => scrollTo(0, 1e7)); await pg.waitForTimeout(900);
      if (await pg.$eval(".rang-barre", e => e.textContent) !== `${ss.length} / ${ss.length}`) pb(`chapitre ${ch} : en bas, la barre n'indique pas la dernière section`);
      if (ic === 0) await pg.screenshot({ path: path.join(out, `chapitre-${ch}-fin.png`) });
    }
    // Carte après lecture : chapitres lus en vert ; Reprendre mène à la dernière section lue
    await pg.goto(urlCarte, { waitUntil: "networkidle" }); await pg.waitForTimeout(200);
    if (await pg.$$eval(".noeud-chapitre.fait", l => l.length) !== chsm.length) pb(`carte ${sm} : les chapitres lus ne sont pas marqués faits`);
    const rep = await pg.$eval(".btn.reprendre", a => a.href);
    const der = chsm[chsm.length - 1];
    if (!rep.endsWith(`chapitre-${der}.html#s-` + P.sections.filter(s => s.chapitre === der).pop().id)) pb(`carte ${sm} : Reprendre ne mène pas à la dernière section lue : ` + rep);
  }

  // Un exercice par-dessus la page : la page ne bouge pas, « Revenir au cours » la retrouve
  const ch0 = chs[0], n0 = P.niveaux.find(n => n.chapitre === ch0 && n.pret && !n.revision && !n.boss);
  await pg.goto(dc + `chapitres/chapitre-${ch0}.html`, { waitUntil: "networkidle" }); await pg.waitForTimeout(300);
  await pg.evaluate(id => document.querySelector(`.jouer[data-niveau="${id}"]`).scrollIntoView({ block: "center" }), n0.id); await pg.waitForTimeout(200);
  const y0 = await pg.evaluate(() => scrollY);
  await pg.click(`.jouer[data-niveau="${n0.id}"] button`); await pg.waitForTimeout(1200);
  const fr = pg.frames().find(f => f.url().includes("jouer.html"));
  if (!fr) pb("Jouer n'ouvre pas l'exercice");
  else {
    if (!fr.url().endsWith("#" + n0.id)) pb("Jouer n'ouvre pas le bon exercice : " + fr.url());
    await pg.screenshot({ path: path.join(out, "exercice.png") });
    // voir la réponse, puis Revoir dans le cours (cours du chapitre), puis finir le niveau
    for (let i = 0; i < 10; i++) {
      if (await fr.evaluate(() => document.getElementById("resultat").classList.contains("on"))) break;
      const bs = await fr.$$eval(".etape:not(.sortie) button", l => l.map(x => x.textContent.trim()));
      let k = bs.findIndex(t => /Voir la réponse/.test(t));
      if (k >= 0) {
        await (await fr.$$(".etape:not(.sortie) button"))[k].click(); await fr.waitForTimeout(500);
        if (i === 0) {
          const rv = await fr.$(".etape:not(.sortie) .revoir");
          if (!rv) pb("pas de lien Revoir dans le cours après une réponse vue");
          else {
            await rv.click(); await fr.waitForTimeout(900);
            const src = await fr.$eval("#fenetre-cours iframe", f => f.src);
            if (!/\/chapitres\/chapitre-\d+\.html\?dans=1#/.test(src)) pb("Revoir dans le cours n'ouvre pas la page du chapitre : " + src);
            await pg.screenshot({ path: path.join(out, "revoir.png") });
            await fr.click("#fenetre-cours .fc-tete button");
          }
        }
      }
      k = (await fr.$$eval(".etape:not(.sortie) button", l => l.map(x => x.textContent.trim()))).findIndex(t => /Continuer|Terminer/.test(t));
      if (k >= 0) { await (await fr.$$(".etape:not(.sortie) button"))[k].click(); await fr.waitForTimeout(400); }
    }
    const b1 = await fr.$eval("#resultat .btn-suivant", a => a.textContent).catch(() => "");
    if (!/Revenir au cours/.test(b1)) pb("fin de l'exercice : pas de « Revenir au cours » : " + b1);
    await pg.screenshot({ path: path.join(out, "fin-exercice.png") });
    await fr.click("#resultat .btn-suivant"); await pg.waitForTimeout(500);
    const etat = await pg.evaluate(() => ({ ouvert: document.querySelector(".fenetre-jeu.on") !== null, y: scrollY }));
    if (etat.ouvert) pb("Revenir au cours ne ferme pas l'exercice");
    if (Math.abs(etat.y - y0) > 2) pb(`la page a bougé pendant l'exercice (${y0} → ${etat.y})`);
  }
  verifErr("exercice");
  await b.close();
  console.log(ko ? `${ko} échec(s)` : `structure par chapitres : ${chs.length} chapitres, ${P.sections.length} sections, tout est bon (${W} × ${H})`);
  process.exit(ko ? 1 : 0);
})();
