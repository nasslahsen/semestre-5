// Chapitre 9 du module Biomatériaux (affiché 4 : biomatériaux métalliques) : réponses attendues des niveaux.
"use strict";
const B = require("../../modules/biomateriaux/calculs.js");
module.exports = ({ test, proche, assert }) => {
  test("biomatériaux ch. 9 (affiché 4) : hypersensibilité, inox, CoCr, titane, NiTi, comparaison", () => {
    // classes : 10 à 15 % de 300 patients (page : 200 patients)
    proche(0.10 * 300, 30, 1e-9); proche(0.15 * 300, 45, 1e-9);
    // inox : seuil du chrome ; plaque de 80 g à 17,5 % de Cr, carbone au plus 0,03 %
    assert.ok(11 >= 11 && 10 < 11);
    proche(0.175 * 80, 14, 1e-9); proche(0.0003 * 80, 0.024, 1e-12);
    // page : plaque de 60 g
    proche(0.17 * 60, 10.2, 1e-9); proche(0.12 * 60, 7.2, 1e-9);
    // CoCr : écrouissage (limite 300 -> 650, rupture 800 -> 1000) ; usure en 8 ans
    proche(650 - 300, 350, 0); proche(1000 - 800, 200, 0);
    proche(4.2 * 8, 33.6, 1e-9); proche(300 * 8, 2400, 0);
    // page : 5 ans, rapport d'environ 48
    proche(4.2 * 5, 21, 1e-9); proche(Math.round(1000 / 21), 48, 0);
    // titane : part de l'os (modèle ajouté) ; page 8,7 % et 15,4 %, niveaux CoCr 8 %, révision 316L 9,09 %, boss Ti-Cp 16,67 %
    proche(100 * B.partOs(20, 210), 8.7, 0.05); proche(100 * B.partOs(20, 110), 15.4, 0.05);
    proche(100 * B.partOs(20, 230), 8, 1e-9);
    proche(100 * B.partOs(20, 200), 9.09, 0.005);
    proche(100 * B.partOs(20, 100), 16.67, 0.005);
    assert.ok(B.partOs(20, 110) > B.partOs(20, 210));
    // NiTi : 8 % de 30 mm, 5 J/g × 3 g (page : 50 mm, 2 g)
    proche(0.08 * 30, 2.4, 1e-9); proche(5 * 3, 15, 0);
    proche(0.08 * 50, 4, 1e-9); proche(5 * 2, 10, 0);
    // comparaison : plaque 25 cm³ (Ti-Cp 4,5 ; tantale 16,6) ; alumine/PEhd 0,1 mm/an pendant 15 ans
    proche(4.5 * 25, 112.5, 1e-9); proche(16.6 * 25, 415, 1e-9);
    proche(0.1 * 15, 1.5, 1e-9);
    // ordre des modules (GPa) : Nitinol 48, Ti-Cp 100, tantale 190, Co-Cr-Mo 230
    const mod = [48, 100, 190, 230]; assert.deepStrictEqual(mod.slice().sort((a, b) => a - b), mod);
    // boss : tige 45 cm³ (Ti-6Al-4V 4,4 ; Co-Cr-Mo 8,3) ; 3 mm à 0,15 mm/an
    proche(4.4 * 45, 198, 1e-9); proche(8.3 * 45, 373.5, 1e-9);
    proche(3 / 0.15, 20, 1e-9); proche(3 / 0.05, 60, 1e-9);
  });
};
