// Parcours de test du module Technologies de laboratoire : pour chaque niveau, la suite de gestes qui le réussit sans erreur.
// Lancer : node tests/navigateur/jouer.js laboratoire [id ...]
"use strict";
const tous = {};

// appariement : chaque élément de gauche puis son partenaire à droite
const paires = async (a, g, d, bon) => { for (let i = 0; i < bon.length; i++) { await a.svg(g(i)); await a.svg(d(bon[i])); } };
// classement par touches successives : clics[i] = nombre de touches sur la case i
const classer = async (a, centre, clics) => { for (let i = 0; i < clics.length; i++) for (let k = 0; k < clics[i]; k++) await a.svg(centre(i)); await a.bouton("Vérifier"); };
// tracé : toucher les étapes dans l'ordre
const tracer = async (a, centre, ordre) => { for (const i of ordre) await a.svg(centre(i)); };

// ---------- Chapitre 1 : le laboratoire médical ----------
tous.lbm = async (a) => {
  await a.choix(1); await a.suite();
  await paires(a, (i) => [185, 122 + 130 * i], (k) => [530, 122 + 130 * k], [2, 0, 3, 1]); await a.suite();
  await a.choix(1); await a.suite();
  await a.choix(1); await a.suite();
  await a.choix(0); await a.suite();
};
tous.secteurs = async (a) => {
  await tracer(a, (i) => [[515, 475], [165, 115], [515, 115], [165, 475], [340, 295]][i], [1, 3, 0]); await a.suite();
  await paires(a, (i) => [170, 94 + 108 * i], (k) => [520, 94 + 108 * k], [2, 4, 0, 3, 1]); await a.suite();
  await a.choix(1); await a.suite();
  await a.nombres([500]); await a.suite();
  await a.choix(0); await a.suite();
};
tous.circuit = async (a) => {
  await tracer(a, (i) => [340, 50 + 82 * i], [2, 6, 4, 1, 5, 0, 3]); await a.suite();
  await a.choix(1); await a.suite();
  await a.choix(1); await a.suite();
  await a.choix(0); await a.suite();
  await a.jetons(["p", "n", "t"]); await a.suite();
};
tous.phases = async (a) => {
  await classer(a, (i) => [120 + 220 * (i % 3), 115 + 180 * Math.floor(i / 3)], [1, 2, 3, 1, 2, 3, 1, 2, 3]); await a.suite();
  await a.choix(1); await a.suite();
  await tracer(a, (i) => [340, 75 + 112 * i], [1, 4, 3, 0, 2]); await a.suite();
  await a.choix(1); await a.suite();
  await a.choix(0); await a.suite();
};
tous.biosecurite = async (a) => {
  await a.choix(2); await a.suite();
  await paires(a, (i) => [145, 112 + 134 * i], (k) => [495, 112 + 134 * k], [2, 0, 3, 1]); await a.suite();
  await classer(a, (i) => [180 + 320 * (i % 2), 115 + 180 * Math.floor(i / 2)], [1, 2, 3, 1, 2, 3]); await a.suite();
  await a.choix(1); await a.suite();
  await a.choix(1); await a.suite();
};
tous["revision-laboratoire"] = async (a) => {
  await a.choix(0); await a.suite();
  await a.choix(2); await a.suite();
  await a.choix(1); await a.suite();
  await a.jetons(["p", "r", "a"]); await a.suite();
  await a.choix(1); await a.suite();
};
tous["boss-laboratoire"] = async (a) => {
  await tracer(a, (i) => [340, 50 + 82 * i], [1, 4, 5, 6, 2, 0, 3]); await a.suite();
  await a.choix(1); await a.suite();
  await a.choix(1); await a.suite();
  await a.choix(0); await a.suite();
  await a.choix(0); await a.suite();
};

module.exports = tous;
