// Parcours de test du TD 1 (chapitre 12, espace TD).
"use strict";
const tous = {};
tous.td1 = async (a) => {
  await a.svg([80 + 150 / 260 * 540, 470 - (6 + 3.3 * Math.sqrt(0.5) - 0.15 - 5.5) / 4.5 * 300]); await a.suite();
  await a.nombres([1.1, 11]); await a.suite();
  await a.nombres([10]); await a.suite();
  await a.nombres([11]); await a.suite();
};
tous['td1-vrai-faux'] = async (a) => {
  await a.choix(0); await a.suite();
  await a.choix(0); await a.suite();
  await a.choix(1); await a.suite();
  await a.nombres([70]); await a.suite();
};
tous['td1-polyethylene'] = async (a) => {
  await a.choix(1); await a.suite();
  await a.choix(1); await a.suite();
  await a.choix(0); await a.suite();
  await a.nombres([1000]); await a.suite();
};
tous['td1-pvc'] = async (a) => {
  await a.nombres([4.83]); await a.attendre(1000); await a.suite();
  await a.jetons(['g', 'r', 'p']); await a.suite();
};
tous['td1-devoir'] = async (a) => {
  await a.choix(0); await a.suite();
  await a.choix(0); await a.suite();
  await a.choix(0); await a.suite();
  await a.nombres([1.19]); await a.suite();
};
module.exports = tous;
