// TD 1 du module Biomatériaux (chapitre 12, espace TD) : réponses attendues des niveaux et du corrigé.
"use strict";
const B = require("../../modules/biomateriaux/calculs.js");
module.exports = ({ test, proche, assert }) => {
  test("biomatériaux TD 1 : plaque, vrai ou faux, PVC, devoir", () => {
    // 1.1 : plaque 10 × 10 × 0,1, X = 0,5, ρa = 1, ρc = 1,2
    const V = 10 * 10 * 0.1, rho = B.densiteSemiCristallin(1.2, 1, 0.5);
    proche(V, 10, 1e-12); proche(rho, 1.1, 1e-12); proche(rho * V, 11, 1e-9);
    proche(B.tauxCristallinite(rho, 1, 1.2), 0.5, 1e-12);
    proche(rho * V / 1, 11, 1e-9); // d : refroidie sans cristalliser, ρ = ρa
    // 1.2 f et page : (Tf + Tg) / 2
    proche(B.temperatureCristallisationMax(-10, 150), 70, 0);
    proche(B.temperatureCristallisationMax(0, 120), 60, 0);
    // 1.4 e : 10^9 / 10^6
    proche(1e9 / 1e6, 1000, 0);
    // 1.5 a : 1,45 / 0,3
    proche(1.45 / 0.3, 4.83, 0.005);
    // devoir, exercice 1 : Tf > Tg, X = 0 au-dessus de Tf, X > 0 à 20 °C ; restent E, H, I ; E fond entre 150 et 200 °C
    const L = { A: [-120, -75, 0], B: [-120, -75, 0.1], C: [80, 175, 0], D: [175, 175, 0], E: [-20, 175, 0.9], F: [175, -80, 0.9], G: [175, 275, 0], H: [50, 275, 0.9], I: [175, 275, 0.9], J: [75, 275, 0] };
    const possibles = Object.keys(L).filter(k => { const [tg, tf, x] = L[k]; return tf > tg && !(20 > tf && x > 0) && 20 < tf && x > 0; });
    assert.deepStrictEqual(possibles, ["E", "H", "I"]);
    assert.deepStrictEqual(possibles.filter(k => L[k][1] >= 150 && L[k][1] <= 200), ["E"]);
    // devoir, exercice 2 : nylon
    proche(B.densiteCristalline(1.11, 1.07, 0.33), 1.19, 0.005);
  });
};
