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

// ---------- Chapitre 2 : échantillons et phase pré-analytique ----------
const G = (i) => [170, 112 + 134 * i], D2 = (k) => [520, 112 + 134 * k];       // paires larges (300 / 280)
const Gs = (i) => [140, 112 + 134 * i], Ds = (k) => [490, 112 + 134 * k];      // paires étroites (240 / 340)
const case2 = (i) => [180 + 320 * (i % 2), 115 + 180 * Math.floor(i / 2)];
tous.echantillons = async (a) => {
  await a.choix(2); await a.suite();
  await a.jetons(["a", "c"]); await a.suite();
  await paires(a, G, D2, [2, 3, 0, 1]); await a.suite();
  await a.choix(0); await a.suite();
  await a.choix(1); await a.suite();
};
tous.prelevement = async (a) => {
  await tracer(a, (i) => [82 + 108 * i, 180], [4, 1, 3, 5, 0, 2]); await a.suite();
  for (let k = 0; k < 4; k++) { await a.choix(1); await a.suite(); }
};
tous.identification = async (a) => {
  await classer(a, case2, [1, 2, 3, 1, 3, 2]); await a.suite();
  await tracer(a, (i) => [340, 50 + 82 * i], [4, 1, 6, 3, 0, 5, 2]); await a.suite();
  await a.choix(2); await a.suite();
  await a.nombres([5]); await a.suite();
  await a.choix(0); await a.suite();
};
tous.conservation = async (a) => {
  await a.svg([340, 300]); await a.suite();
  await paires(a, Gs, Ds, [2, 3, 0, 1]); await a.suite();
  await a.jetons(["p", "s", "e"]); await a.suite();
  await a.nombres([2]); await a.suite();
  await a.choix(0); await a.suite();
};
tous.froid = async (a) => {
  await tracer(a, (i) => [[545, 290], [340, 100], [135, 290], [340, 480]][i], [2, 3, 0, 1]); await a.suite();
  await paires(a, Gs, Ds, [2, 3, 0, 1]); await a.suite();
  await a.nombres([-88, -72]); await a.suite();
  await a.choix(1); await a.suite();
  await a.choix(2); await a.suite();
};
tous.centrifugation = async (a) => {
  await a.nombres([1643.4]); await a.suite();
  await a.curseur(0, 3550); await a.bouton("Lancer"); await a.suite();
  await a.choix(1); await a.suite();
  await a.choix(0); await a.suite();
  await a.svg([198.6, 158.6]); await a.suite();
};
tous.centrifugeuse = async (a) => {
  await a.choix(1); await a.suite();
  await a.nombres([9]); await a.suite();
  await classer(a, case2, [1, 2, 1, 2, 1, 2]); await a.suite();
  await a.choix(0); await a.suite();
  await a.choix(1); await a.suite();
};
tous["erreurs-preanalytiques"] = async (a) => {
  await a.choix(2); await a.suite();
  await paires(a, G, D2, [1, 3, 2, 0]); await a.suite();
  await a.choix(0); await a.suite();
  await a.nombres([25]); await a.suite();
  await a.choix(1); await a.suite();
};
tous["revision-echantillons"] = async (a) => {
  await a.jetons(["s", "c", "e"]); await a.suite();
  await a.choix(1); await a.suite();
  await a.nombres([1788.8]); await a.suite();
  await a.choix(1); await a.suite();
  await a.choix(2); await a.suite();
};
tous["boss-echantillons"] = async (a) => {
  await a.nombres([3306.4]); await a.suite();
  await paires(a, G, D2, [2, 3, 1, 0]); await a.suite();
  await a.choix(1); await a.suite();
  await a.nombres([-11]); await a.suite();
};

// ---------- Chapitre 3 : technologies de biochimie clinique ----------
tous.lumiere = async (a) => {
  await a.nombres([500]); await a.suite();
  await a.choix(0); await a.suite();
  await paires(a, (i) => [160, 145 + 160 * i], (k) => [520, 145 + 160 * k], [1, 2, 0]); await a.suite();
  await a.choix(1); await a.suite();
  await a.nombres([2]); await a.suite();
};
tous["beer-lambert"] = async (a) => {
  await a.nombres([0.25]); await a.suite();
  await a.nombres([2]); await a.suite();
  await a.choix(0); await a.suite();
  await a.nombres([3.75]); await a.suite();
  await a.choix(1); await a.suite();
  await a.choix(1); await a.suite();
};
tous.spectrophotometre = async (a) => {
  await tracer(a, (i) => [340, 82 + 108 * i], [2, 4, 0, 3, 1]); await a.suite();
  await a.choix(2); await a.suite();
  await paires(a, (i) => [150, 145 + 160 * i], (k) => [500, 145 + 160 * k], [2, 0, 1]); await a.suite();
  await a.nombres([218.5]); await a.suite();
  await a.choix(2); await a.suite();
};
tous.turbidimetrie = async (a) => {
  await a.choix(0); await a.suite();
  await a.svg([500, 110]); await a.suite();
  await a.choix(1); await a.suite();
  await a.choix(0); await a.suite();
  await a.nombres([340]); await a.suite();
};
tous.potentiometrie = async (a) => {
  await paires(a, (i) => [160, 112 + 134 * i], (k) => [510, 112 + 134 * k], [2, 3, 0, 1]); await a.suite();
  await a.nombres([61.54]); await a.suite();
  await a.nombres([29.6]); await a.suite();
  await a.choix(1); await a.suite();
  await a.choix(0); await a.suite();
};
tous["automates-biochimie"] = async (a) => {
  await tracer(a, (i) => [340, 50 + 82 * i], [4, 1, 5, 3, 6, 0, 2]); await a.suite();
  await paires(a, (i) => [120, 112 + 134 * i], (k) => [470, 112 + 134 * k], [2, 3, 0, 1]); await a.suite();
  await a.choix(0); await a.suite();
  await a.nombres([37]); await a.suite();
  await a.choix(0); await a.suite();
};
tous.calibration = async (a) => {
  await a.nombres([3]); await a.suite();
  await a.nombres([7]); await a.suite();
  await a.choix(1); await a.suite();
  await a.choix(1); await a.suite();
  await a.choix(0); await a.suite();
};
tous.distillateur = async (a) => {
  await tracer(a, (i) => [340, 100 + 130 * i], [1, 3, 0, 2]); await a.suite();
  await paires(a, G, D2, [2, 3, 0, 1]); await a.suite();
  await a.choix(0); await a.suite();
  await classer(a, (i) => [180 + 320 * (i % 2), 160 + 250 * Math.floor(i / 2)], [1, 2, 3, 1]); await a.suite();
  await a.choix(1); await a.suite();
};
tous.purificateurs = async (a) => {
  await a.choix(1); await a.suite();
  await paires(a, Gs, Ds, [1, 3, 2, 0]); await a.suite();
  await a.nombres([10]); await a.suite();
  await a.choix(1); await a.suite();
  await a.choix(1); await a.suite();
};
tous["revision-biochimie"] = async (a) => {
  await a.nombres([31.6]); await a.suite();
  await a.choix(1); await a.suite();
  await a.choix(0); await a.suite();
  await a.choix(0); await a.suite();
  await a.nombres([0.055]); await a.suite();
};
tous["boss-biochimie"] = async (a) => {
  await a.nombres([50]); await a.suite();
  await a.nombres([118.3]); await a.suite();
  await a.nombres([12.8]); await a.suite();
  await a.choix(1); await a.suite();
  await a.choix(1); await a.suite();
};

// ---------- Chapitre 4 : technologies d'hématologie et d'hémostase ----------
const P3g = (i) => [150, 145 + 160 * i], P3d = (k) => [500, 145 + 160 * k];   // trois paires (260 / 320)
const case4 = (i) => [180 + 320 * (i % 2), 160 + 250 * Math.floor(i / 2)];
tous.hemogramme = async (a) => {
  await a.nombres([39.9]); await a.suite();
  await a.nombres([30]); await a.suite();
  await classer(a, case2, [1, 2, 1, 2, 1, 2]); await a.suite();
  await a.choix(1); await a.suite();
  await paires(a, G, D2, [2, 3, 0, 1]); await a.suite();
};
tous.impedance = async (a) => {
  await a.choix(0); await a.suite();
  await classer(a, case2, [1, 2, 3, 1, 3, 2]); await a.suite();
  await a.nombres([55258.5]); await a.suite();
  await a.choix(2); await a.suite();
  await a.choix(0); await a.suite();
};
tous.cytometrie = async (a) => {
  await paires(a, (i) => [150, 112 + 134 * i], (k) => [500, 112 + 134 * k], [2, 0, 1, 3]); await a.suite();
  await a.choix(1); await a.suite();
  await a.svg([180, 420]); await a.suite();
  await a.nombres([488]); await a.suite();
  await a.choix(0); await a.suite();
};
tous["automate-hemato"] = async (a) => {
  await tracer(a, (i) => [340, 67 + 92 * i], [2, 4, 0, 5, 3, 1]); await a.suite();
  await paires(a, Gs, Ds, [2, 3, 0, 1]); await a.suite();
  await classer(a, case4, [2, 4, 1, 3]); await a.suite();
  await a.nombres([4]); await a.suite();
  await a.nombres([50]); await a.suite();
};
tous.interferences = async (a) => {
  await paires(a, G, D2, [2, 3, 1, 0]); await a.suite();
  await a.choix(1); await a.suite();
  await a.nombres([2]); await a.suite();
  await a.choix(0); await a.suite();
  await a.choix(1); await a.suite();
};
tous.hemostase = async (a) => {
  await tracer(a, (i) => [340, 67 + 92 * i], [2, 4, 5, 0, 3, 1]); await a.suite();
  await paires(a, (i) => [170, 145 + 160 * i], (k) => [520, 145 + 160 * k], [1, 2, 0]); await a.suite();
  await classer(a, case2, [1, 2, 1, 2, 1, 1]); await a.suite();
  await a.choix(0); await a.suite();
  await a.nombres([5]); await a.suite();
};
tous.coagulometres = async (a) => {
  await paires(a, P3g, P3d, [1, 2, 0]); await a.suite();
  await a.choix(0); await a.suite();
  await a.nombres([2.5]); await a.suite();
  await a.choix(0); await a.suite();
  await a.choix(0); await a.suite();
};
tous["revision-hemato"] = async (a) => {
  await a.nombres([33.33]); await a.suite();
  await a.choix(1); await a.suite();
  await a.choix(0); await a.suite();
  await a.choix(0); await a.suite();
  await a.nombres([2.30]); await a.suite();
};
tous["boss-hemato"] = async (a) => {
  await a.nombres([41.82, 23.14]); await a.suite();
  await a.choix(1); await a.suite();
  await a.nombres([2.64]); await a.suite();
  await a.choix(1); await a.suite();
  await a.choix(2); await a.suite();
};

// ---------- Chapitre 5 : microscopes et agitateurs chauffants ----------
tous["microscopes-types"] = async (a) => {
  await paires(a, Gs, Ds, [2, 3, 0, 1]); await a.suite();
  await a.choix(0); await a.suite();
  await a.choix(1); await a.suite();
  await a.nombres([1931]); await a.suite();
  await a.choix(0); await a.suite();
};
tous["microscope-optique"] = async (a) => {
  await tracer(a, (i) => [340, 67 + 92 * i], [3, 1, 4, 0, 5, 2]); await a.suite();
  await a.choix(0); await a.suite();
  await a.nombres([400]); await a.suite();
  await a.choix(0); await a.suite();
  await a.choix(1); await a.suite();
};
tous["microscope-entretien"] = async (a) => {
  await classer(a, case4, [1, 2, 3, 1]); await a.suite();
  await a.choix(1); await a.suite();
  await a.choix(1); await a.suite();
  await a.choix(0); await a.suite();
  await a.choix(1); await a.suite();
};
tous.agitateur = async (a) => {
  await a.nombres([500]); await a.suite();
  await a.choix(1); await a.suite();
  await classer(a, case2, [1, 2, 1, 2, 2, 1]); await a.suite();
  await a.choix(1); await a.suite();
  await a.nombres([15]); await a.suite();
};
tous["revision-microscopes"] = async (a) => {
  await a.choix(0); await a.suite();
  await a.nombres([1000]); await a.suite();
  await a.choix(2); await a.suite();
  await a.choix(0); await a.suite();
  await a.choix(0); await a.suite();
};
tous["boss-microscopes"] = async (a) => {
  await a.nombres([40]); await a.suite();
  await a.choix(1); await a.suite();
  await a.choix(2); await a.suite();
  await a.choix(1); await a.suite();
};

// ---------- Chapitre 7 : automatisation et informatisation ----------
tous.automatisation = async (a) => {
  await tracer(a, (i) => [340, 135 + 150 * i], [1, 2, 0]); await a.suite();
  await a.choix(1); await a.suite();
  await a.choix(0); await a.suite();
  await a.choix(2); await a.suite();
  await paires(a, G, D2, [2, 0, 3, 1]); await a.suite();
};
tous["lis-sih"] = async (a) => {
  await a.choix(0); await a.suite();
  await classer(a, case2, [2, 1, 3, 2, 1, 3]); await a.suite();
  await a.choix(1); await a.suite();
  await a.choix(0); await a.suite();
  await a.choix(1); await a.suite();
};
tous.etiqueteuse = async (a) => {
  await tracer(a, (i) => [340, 67 + 92 * i], [2, 1, 4, 5, 0, 3]); await a.suite();
  await a.choix(1); await a.suite();
  await classer(a, case2, [1, 2, 3, 3, 1, 2]); await a.suite();
  await a.choix(1); await a.suite();
  await a.choix(0); await a.suite();
};
tous.pneumatique = async (a) => {
  await tracer(a, (i) => [340, 82 + 108 * i], [3, 1, 4, 0, 2]); await a.suite();
  await a.choix(0); await a.suite();
  await a.svg([165, 280]); await a.suite();
  await classer(a, case4, [2, 1, 2, 1]); await a.suite();
  await a.nombres([5.5]); await a.suite();
};
tous["transport-robot"] = async (a) => {
  await paires(a, (i) => [150, 112 + 134 * i], (k) => [500, 112 + 134 * k], [2, 3, 0, 1]); await a.suite();
  await a.nombres([9]); await a.suite();
  await a.choix(0); await a.suite();
  await a.choix(1); await a.suite();
  await a.choix(0); await a.suite();
};
tous["automate-tri"] = async (a) => {
  await classer(a, case4, [1, 2, 2, 1]); await a.suite();
  await tracer(a, (i) => [340, 82 + 108 * i], [3, 1, 4, 0, 2]); await a.suite();
  await a.choix(0); await a.suite();
  await a.choix(0); await a.suite();
  await a.nombres([1000]); await a.suite();
};
tous["revision-automatisation"] = async (a) => {
  await a.choix(0); await a.suite();
  await a.choix(1); await a.suite();
  await paires(a, G, D2, [2, 3, 0, 1]); await a.suite();
  await a.choix(0); await a.suite();
  await a.choix(0); await a.suite();
};
tous["boss-automatisation"] = async (a) => {
  await tracer(a, (i) => [340, 67 + 92 * i], [2, 4, 3, 0, 5, 1]); await a.suite();
  await a.nombres([80]); await a.suite();
  await a.choix(1); await a.suite();
  await a.choix(1); await a.suite();
};

// ---------- Chapitre 8 : maintenance et gestion des équipements ----------
tous["cycle-vie"] = async (a) => {
  await tracer(a, (i) => [340, 41 + 66 * i], [4, 1, 6, 3, 7, 0, 5, 2]); await a.suite();
  await a.jetons(["a", "i", "f", "p", "m"]); await a.suite();
  await a.choix(0); await a.suite();
  await a.choix(2); await a.suite();
  await a.choix(1); await a.suite();
};
tous.maintenance = async (a) => {
  await classer(a, case2, [1, 2, 1, 2, 1, 2]); await a.suite();
  await tracer(a, (i) => [340, 100 + 130 * i], [2, 3, 0, 1]); await a.suite();
  await a.choix(1); await a.suite();
  await a.choix(0); await a.suite();
};
tous["metrologie-cqi"] = async (a) => {
  await a.choix(1); await a.suite();
  await paires(a, (i) => [170, 145 + 160 * i], (k) => [520, 145 + 160 * k], [2, 0, 1]); await a.suite();
  await a.nombres([2.5]); await a.suite();
  await a.choix(1); await a.suite();
  await a.choix(1); await a.suite();
};
tous.infrastructure = async (a) => {
  await paires(a, Gs, Ds, [1, 3, 2, 0]); await a.suite();
  await paires(a, (i) => [120, 112 + 134 * i], (k) => [470, 112 + 134 * k], [2, 3, 0, 1]); await a.suite();
  await a.choix(1); await a.suite();
  await a.choix(2); await a.suite();
};
tous.criticite = async (a) => {
  await a.choix(0); await a.suite();
  await a.choix(1); await a.suite();
  await paires(a, Gs, Ds, [2, 3, 0, 1]); await a.suite();
  await a.choix(0); await a.suite();
};
tous["revision-equipements"] = async (a) => {
  await a.choix(0); await a.suite();
  await a.choix(0); await a.suite();
  await a.nombres([3.5]); await a.suite();
  await a.choix(0); await a.suite();
  await tracer(a, (i) => [340, 100 + 130 * i], [3, 1, 2, 0]); await a.suite();
};
tous["boss-equipements"] = async (a) => {
  await a.jetons(["a", "i", "f", "p", "m"]); await a.suite();
  await a.nombres([-2, 3.5]); await a.suite();
  await a.choix(1); await a.suite();
  await a.choix(1); await a.suite();
};

module.exports = tous;
