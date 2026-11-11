// Parcours de test du module Langues : chaque niveau est construit par ANG.niveau à partir de données ;
// le parcours lit ces données et joue la bonne réponse de chaque étape (choix, vrai ou faux, jetons, tri, paires).
// Lancer : node tests/navigateur/jouer.js langues [id ...]
"use strict";
const fs = require("fs"), path = require("path"), vm = require("vm");
const ANG = require("../../../modules/langues/anglais.js");
const dir = path.join(__dirname, "../../../modules/langues/niveaux");

// données d'un niveau : le fichier est exécuté avec un NIVEAU qui garde la définition
function donnees(id) {
  let def = null;
  const bac = { ANG, NIVEAU: (d) => { def = d.donnees; } };
  vm.createContext(bac); vm.runInContext(fs.readFileSync(path.join(dir, id + ".js"), "utf8"), bac);
  return def;
}

async function jouerEtape(a, e) {
  const D = ANG.disposition, C = ANG.centre;
  switch (e.type) {
    case "choix": await a.choix(e.options.findIndex(o => o.ok)); break;
    case "vf": await a.choix(e.vrai ? 0 : 1); break;
    case "trous": {
      const ordre = [];
      for (const p of e.phrases) for (const m of p.matchAll(/\[([^\]]+)\]/g)) ordre.push("m" + e.jetons.indexOf(m[1]));
      await a.jetons(ordre); break;
    }
    case "options":
      for (let i = 0; i < e.items.length; i++) {
        const k = [].concat(e.items[i].bon)[0];
        await a.page.click(`.etape:not(.sortie) .options-phrases button[data-i="${i}"][data-k="${k}"]`);
      }
      await a.page.click(".etape:not(.sortie) .verifier-options"); await a.attendre(600);
      break;
    case "trier":
      for (let i = 0; i < e.cartes.length; i++) { await a.svg(C(D.carte(i, e.cartes.length))); await a.svg(C(D.bac(e.cartes[i].bac, e.bacs.length))); }
      break;
    case "paires":
      for (let i = 0; i < e.gauche.length; i++) { await a.svg(C(D.gauche(i, e.gauche.length))); await a.svg(C(D.droite(e.bon[i], e.gauche.length))); }
      break;
    default: throw new Error("type d'étape inconnu " + e.type);
  }
  await a.suite();
}

const tous = {};
for (const f of fs.readdirSync(dir).filter(f => f.endsWith(".js")).sort()) {
  const id = f.replace(/\.js$/, "");
  tous[id] = async (a, pg) => { a.page = pg; for (const e of donnees(id).etapes) await jouerEtape(a, e); };
}

module.exports = tous;
Object.defineProperty(tous, "donnees", { value: donnees, enumerable: false });
