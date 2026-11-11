// Parcours de test du chapitre 9 (affiché chapitre 4 : biomatériaux métalliques).
"use strict";
const tous = {};
tous['classes-biomateriaux'] = async (a) => {
  await a.svg([300, 400]); await a.suite();
  await a.jetons(['n', 'z', 's', 'c']); await a.suite();
  await a.choix(0); await a.suite();
  await a.choix(1); await a.suite();
  await a.nombres([30, 45]); await a.suite();
};
tous['aciers-inox'] = async (a) => {
  await a.curseur(0, 11); await a.suite();
  await a.jetons(['a', 'b', 'c']); await a.suite();
  await a.choix(0); await a.suite();
  await a.svg([460, 330]); await a.suite();
  await a.nombres([14, 0.024]); await a.suite();
};
tous['cobalt-chrome'] = async (a) => {
  await a.choix(1); await a.suite();
  await a.jetons(['b', 'o', 'g']); await a.suite();
  await a.nombres([350, 200]); await a.suite();
  await a.nombres([33.6, 2400]); await a.attendre(1000); await a.suite();
  await a.choix(0); await a.suite();
};
tous.titane = async (a) => {
  await a.curseur(0, 110); await a.suite();
  await a.nombres([8]); await a.suite();
  await a.choix(0); await a.suite();
  await a.jetons(['v', 'p', 'm']); await a.suite();
  await a.choix(0); await a.suite();
};
tous['nitinol-tantale'] = async (a) => {
  await a.jetons(['d', 'r', 'c', 'f']); await a.suite();
  await a.svg([480, 466]); await a.attendre(800); await a.suite();
  await a.choix(0); await a.suite();
  await a.nombres([2.4, 15]); await a.suite();
  await a.choix(0); await a.suite();
};
tous['comparer-metaux'] = async (a) => {
  await a.jetons(['n', 't', 'ta', 'c']); await a.suite();
  await a.nombres([112.5, 415]); await a.suite();
  await a.choix(2); await a.suite();
  await a.nombres([1.5]); await a.suite();
  await a.jetons(['m', 'c', 'r', 'e']); await a.suite();
};
tous['revision-metalliques'] = async (a) => {
  await a.choix(1); await a.suite();
  await a.nombres([9.09]); await a.suite();
  await a.jetons(['n', 'f', 'i']); await a.suite();
  await a.choix(0); await a.suite();
  await a.choix(0); await a.suite();
};
tous['boss-metalliques'] = async (a) => {
  await a.jetons(['t', 'c', 'p']); await a.suite();
  await a.nombres([198, 373.5]); await a.suite();
  await a.nombres([16.67]); await a.suite();
  await a.nombres([20]); await a.suite();
  await a.choix(0); await a.suite();
};
module.exports = tous;
