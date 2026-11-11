// Parcours de test du chapitre 8 (affiché chapitre 2 : histoire, exigences et applications).
"use strict";
const tous = {};
tous.historique = async (a) => {
  await a.jetons(['e', 'i', 't', 'x']); await a.suite();
  await a.choix(0); await a.suite();
  await a.choix(1); await a.suite();
  await a.svg([490, 300]); await a.suite();
  await a.nombres([40, 8]); await a.suite();
};
tous.exigences = async (a) => {
  await a.svg([300, 350]); await a.suite();
  await a.choix(1); await a.suite();
  await a.jetons(['n', 'e', 'f']); await a.suite();
  await a.choix(0); await a.suite();
  await a.choix(1); await a.suite();
};
tous['choisir-valider'] = async (a) => {
  await a.jetons(['s', 'm', 'c', 'a', 'h']); await a.attendre(1000); await a.suite();
  await a.choix(2); await a.suite();
  await a.svg([600, 360]); await a.suite();
  await a.choix(1); await a.suite();
  await a.nombres([94]); await a.suite();
};
tous['domaines-application'] = async (a) => {
  await a.svg([370, 320]); await a.suite();
  await a.jetons(['s', 'p', 'v', 'o']); await a.suite();
  await a.choix(0); await a.suite();
  await a.choix(1); await a.suite();
  await a.choix(0); await a.suite();
};
tous['revision-histoire'] = async (a) => {
  await a.choix(0); await a.suite();
  await a.jetons(['p', 'i', 't']); await a.suite();
  await a.nombres([95]); await a.suite();
  await a.choix(1); await a.suite();
  await a.choix(0); await a.suite();
};
tous['boss-histoire'] = async (a) => {
  await a.jetons(['b', 'v', 'h', 'c', 's', 'q']); await a.suite();
  await a.choix(0); await a.suite();
  await a.nombres([97, 95]); await a.suite();
  await a.choix(1); await a.suite();
  await a.choix(0); await a.suite();
};
module.exports = tous;
