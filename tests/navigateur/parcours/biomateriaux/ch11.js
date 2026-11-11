// Parcours de test du chapitre 11 (affiché chapitre 7 : polymères biomédicaux et matériaux naturels).
"use strict";
const tous = {};
tous.viscoelasticite = async (a) => {
  await a.jetons(['e', 'p', 'v']); await a.suite();
  await a.svg([480, 300]); await a.attendre(1300); await a.suite();
  await a.nombres([12]); await a.suite();
  await a.nombres([0.005, 0.25]); await a.suite();
  await a.choix(0); await a.suite();
};
tous['polymeres-medicaux'] = async (a) => {
  await a.svg([500, 160]); await a.suite();
  await a.jetons(['pc', 'psu', 'pei']); await a.suite();
  await a.nombres([150]); await a.suite();
  await a.choix(0); await a.suite();
  await a.choix(0); await a.suite();
};
tous['biomateriaux-naturels'] = async (a) => {
  await a.svg([190, 220]); await a.suite();
  await a.choix(0); await a.suite();
  await a.jetons(['o', 'd', 'a']); await a.suite();
  await a.choix(0); await a.suite();
  await a.choix(0); await a.suite();
};
tous['revision-polymeres-medicaux'] = async (a) => {
  await a.choix(0); await a.attendre(1100); await a.suite();
  await a.nombres([0.005]); await a.suite();
  await a.jetons(['m', 'l', 't']); await a.suite();
  await a.choix(0); await a.suite();
  await a.nombres([250]); await a.suite();
};
tous['boss-polymeres-medicaux'] = async (a) => {
  await a.jetons(['c', 'u', 'p']); await a.suite();
  await a.nombres([200]); await a.suite();
  await a.nombres([0.05]); await a.suite();
  await a.choix(0); await a.suite();
  await a.choix(0); await a.suite();
};
module.exports = tous;
