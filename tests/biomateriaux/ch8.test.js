// Chapitre 8 du module Biomatériaux (affiché 2 : histoire, exigences, applications) : réponses attendues des niveaux.
"use strict";
const B = require("../../modules/biomateriaux/calculs.js");
module.exports = ({ test, proche, assert }) => {
  test("biomatériaux ch. 8 (affiché 2) : hydroxyapatite, taux de survie", () => {
    // hydroxyapatite : Ca10(PO4)6(OH)2 = 2 motifs Ca5(PO4)3(OH) ; 4 mailles
    proche(2 * 5, 10, 0); proche(2 * 3, 6, 0);
    proche(4 * 10, 40, 0); proche(4 * 2, 8, 0);
    // choisir et valider : 250 prothèses, 15 échecs
    proche(B.survie(250, 15), 94, 1e-9);
    // révision : 160 implants, 8 perdus
    proche(B.survie(160, 8), 95, 1e-9);
    // boss : nouvelle cupule 300 / 9, ancienne 500 / 25
    proche(B.survie(300, 9), 97, 1e-9); proche(B.survie(500, 25), 95, 1e-9);
    assert.ok(B.survie(300, 9) > B.survie(500, 25));
  });
};
