// Chapitre 10 du module Biomatériaux (affiché 5 : biocéramiques) : réponses attendues des niveaux.
"use strict";
const B = require("../../modules/biomateriaux/calculs.js");
module.exports = ({ test, proche, assert }) => {
  test("biomatériaux ch. 10 (affiché 5) : alumine, zircone, pyrocarbone, céramiques résorbables", () => {
    // alumine ASTM : lot de 500 g, de 1200 g (page : 2000 g)
    proche(0.995 * 500, 497.5, 1e-9); proche(0.001 * 500, 0.5, 1e-12);
    proche(0.995 * 1200, 1194, 1e-9); proche(0.001 * 1200, 1.2, 1e-12);
    proche(0.995 * 2000, 1990, 1e-9);
    // zircone : 2953 K en °C ; frittage à 2700 °C impossible
    proche(2953 - 273, 2680, 0); assert.ok(2700 > 2953 - 273);
    // pyrocarbone : lecture des courbes (module vers 24 GPa à 1,7 ; rupture à 1,75 ; module à 1,5)
    assert.ok(Math.abs(B.pyroModule(1.7) - 24) < 0.6 && Math.abs(B.pyroModule(1.65) - 24) >= 0.6 && Math.abs(B.pyroModule(1.75) - 24) >= 0.6);
    proche(B.pyroRupture(1.75), (430 + 490) / 2, 1e-9); proche(B.pyroRupture(1.75), 460, 1e-9);
    proche(B.pyroModule(1.5), 18.95, 0.05);
    proche(B.pyroModule(1.42), 17, 1e-9); proche(B.pyroModule(1.85), 27.5, 1e-9);
    // page : densité 1,6 et 1,8
    proche(Math.round(B.pyroModule(1.6)), 21, 0); proche(Math.round(B.pyroModule(1.8)), 26, 0);
    proche(B.pyroRupture(1.6), 375, 1e-9); proche(B.pyroRupture(1.8), 490, 1e-9);
    // résorbables : 90 % de 80 tiges, de 120 tiges (page : 50)
    proche(0.9 * 80, 72, 1e-9); proche(80 - 0.9 * 80, 8, 1e-9);
    proche(0.1 * 120, 12, 1e-9); proche(0.9 * 50, 45, 1e-9);
    // Ca/P : TCP 1,5 ; HAP 1,67 ; 3 unités de Ca3(PO4)2
    proche(3 / 2, 1.5, 1e-12); proche(10 / 6, 1.667, 0.001);
    proche(3 * 3, 9, 0); proche(3 * 2, 6, 0);
  });
};
