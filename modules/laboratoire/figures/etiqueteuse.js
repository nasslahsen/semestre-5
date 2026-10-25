/* Figure : un tube passe par les étapes de l'étiqueteuse, de l'ordre du LIS à l'éjection. */
(function () {
  "use strict";
  var R = RM, A = LABO, C = A.C;

  var f = R.figure("fig-etiqueteuse", {
    largeur: 960, hauteur: 540, titre: "Le parcours d'un tube dans l'étiqueteuse",
    essai: "<strong>Essaie</strong> : avance étape par étape. <strong>Observe</strong> : le tube est tourné pour que l'étiquette tombe au bon endroit, puis il roule pour l'enrouler sans pli."
  });
  var g = A.s("g", null, f.svg);
  var E = [
    { t: "Ordre du LIS", d: "Le LIS envoie la prescription ; l'appareil génère le numéro d'accession et le code-barres." },
    { t: "Choix du tube", d: "Le bon type de tube (EDTA, sérum, citrate) sort du carrousel ou de la trémie." },
    { t: "Position", d: "Un capteur photoélectrique repère les marques du tube ; le moteur le tourne de R = R_B + R_P." },
    { t: "Impression", d: "Impression thermique à la demande, en transfert thermique au laboratoire." },
    { t: "Collage", d: "Le bord avant est posé, le tube fait un tour complet : étiquette lisse, sans bulle ni pli." },
    { t: "Éjection", d: "Le tube étiqueté est délivré, normal ou urgent ; son statut est enregistré." }
  ];
  var zone = R.h("div", null, "", f.direct);
  function dessiner(k) {
    A.vider(g);
    E.forEach(function (e, i) {
      var x = 20 + i * 155, on = k === i + 1, vu = k >= i + 1;
      A.boite(g, x, 40, 140, 70, { fond: on ? C.jeu : vu ? C.jeuPale : "#fff", bord: vu ? C.jeu : C.trait, ep: 3, rx: 12, titre: e.t, taille: 17, coul: on ? "#fff" : C.encre });
    });
    // le tube, au centre
    var lab = k >= 5, rot = k >= 3 ? 1 : 0;
    A.tube(g, 420, 170, { bouchon: "edta", w: 120, h: 300, couches: [{ h: 0.65, coul: C.sang }] });
    if (k === 4) {
      A.s("rect", { x: 620, y: 220, width: 112, height: 160, fill: "#fff", stroke: C.encre, "stroke-width": 2 }, g);
      for (var q = 0; q < 16; q++) A.s("rect", { x: 632 + q * 6, y: 240, width: q % 3 ? 3 : 5, height: 70, fill: C.encre }, g);
      A.texte(g, "étiquette imprimée", [676, 410], { taille: 17, gras: 800, coul: C.jeu });
    }
    if (lab) {
      A.s("rect", { x: 424, y: 220, width: 112, height: 160, fill: "#fff", stroke: C.encre, "stroke-width": 2 }, g);
      for (var b = 0; b < 16; b++) A.s("rect", { x: 436 + b * 6, y: 240, width: b % 3 ? 3 : 5, height: 70, fill: C.encre }, g);
      A.texte(g, "patient · EDTA", [480, 345], { taille: 15, gras: 700 });
    }
    if (rot) { A.s("path", { d: "M380 420 A110 30 0 0 0 580 420", fill: "none", stroke: C.v, "stroke-width": 4 }, g); A.fleche(g, [570, 425], [585, 415], { coul: C.v, ep: 4 }); }
    if (k === 3) A.texte(g, "capteur", [660, 300], { taille: 18, gras: 800, coul: C.v });
    if (k === 6) A.fleche(g, [600, 330], [760, 330], { coul: C.ok, ep: 6 });
    zone.innerHTML = k ? "<strong>" + E[k - 1].t + "</strong> : " + E[k - 1].d : "Avance pour suivre un tube, de la prescription au tube étiqueté.";
  }
  var e = R.etapes(f.reglages, 6, ["", "ordre", "tube", "position", "impression", "collage", "éjection"], dessiner);
  e.aller(0);
})();
