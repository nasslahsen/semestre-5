// Parcours de test du chapitre 10 (affiché chapitre 5 : biocéramiques).
"use strict";
const tous = {};
tous.bioceramiques = async (a) => {
  await a.jetons(['i', 'r', 'i', 'r']); await a.suite();
  await a.svg([190, 350]); await a.suite();
  await a.choix(0); await a.suite();
  await a.choix(0); await a.suite();
  await a.choix(0); await a.suite();
};
tous['alumine-zircone'] = async (a) => {
  await a.svg([340, 120]); await a.suite();
  await a.nombres([497.5, 0.5]); await a.suite();
  await a.choix(0); await a.suite();
  await a.jetons(['t', 'p', 'r']); await a.suite();
  await a.nombres([2680]); await a.suite();
};
tous['carbone-pyrolytique'] = async (a) => {
  await a.choix(2); await a.suite();
  await a.curseur(0, 1.7); await a.suite();
  await a.nombres([460]); await a.suite();
  await a.choix(0); await a.suite();
  await a.choix(0); await a.suite();
};
tous['ceramiques-resorbables'] = async (a) => {
  await a.curseur(0, 12); await a.suite();
  await a.choix(0); await a.suite();
  await a.jetons(['h', 't', 'c']); await a.suite();
  await a.nombres([72, 8]); await a.suite();
  await a.choix(0); await a.suite();
};
tous['revision-bioceramiques'] = async (a) => {
  await a.choix(1); await a.suite();
  await a.nombres([9, 6]); await a.suite();
  await a.jetons(['a', 'z', 't']); await a.suite();
  await a.choix(0); await a.suite();
  await a.nombres([18.95]); await a.suite();
};
tous['boss-bioceramiques'] = async (a) => {
  await a.jetons(['m', 'u', 'a', 'm']); await a.suite();
  await a.nombres([1194, 1.2]); await a.suite();
  await a.choix(0); await a.suite();
  await a.nombres([12]); await a.suite();
  await a.choix(0); await a.suite();
};
module.exports = tous;
