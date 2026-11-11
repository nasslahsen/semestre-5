// Chapitre 11 du module Biomatériaux (affiché 7 : polymères biomédicaux et naturels) : réponses attendues des niveaux.
"use strict";
const B = require("../../modules/biomateriaux/calculs.js");
module.exports = ({ test, proche, assert }) => {
  test("biomatériaux ch. 11 (affiché 7) : Hooke, Newton, masse moléculaire du PE, stérilisation", () => {
    // ressort : E = 3 GPa, ε = 0,004 (page : 2 GPa et 0,005)
    proche(B.ressort(3000, 0.004), 12, 1e-9); proche(B.ressort(2000, 0.005), 10, 1e-9);
    // révision : ε = σ / E = 15 / 3000
    proche(15 / 3000, 0.005, 1e-12);
    // amortisseur : η = 400 MPa·s, σ = 2 MPa ; vitesse puis déformation à 50 s (page : 500 MPa·s, 1 MPa, 60 s)
    proche(2 / 400, 0.005, 1e-12); proche(B.amortisseur(400, 0.005), 2, 1e-12);
    proche(B.fluageAmortisseur(2, 400, 50), 0.25, 1e-12);
    proche(B.fluageAmortisseur(1, 500, 60), 0.12, 1e-12);
    // boss : η = 8000 MPa·s, σ = 4 MPa, 100 s
    proche(B.fluageAmortisseur(4, 8000, 100), 0.05, 1e-12);
    // PE : M = 28 n (en milliers de motifs) ; page n = 50 000
    proche(4.2e6 / 28 / 1000, 150, 1e-9); proche(5.6e6 / 28 / 1000, 200, 1e-9);
    proche(28 * 50000, 1.4e6, 1e-6);
    // stérilisation : 1000 cycles à 4 par jour ; page 600 cycles par an
    proche(1000 / 4, 250, 0); proche(1000 / 600, 1.7, 0.05);
  });
};
