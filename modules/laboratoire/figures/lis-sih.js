/* Figure : la demande descend du SIH vers le LIS, le résultat validé remonte ; étapes du flux. */
(function () {
  "use strict";
  var R = RM, A = LABO, C = A.C;

  var f = R.figure("fig-lis-sih", {
    largeur: 960, hauteur: 540, titre: "Du dossier patient au laboratoire, et retour",
    essai: "<strong>Essaie</strong> : avance étape par étape. <strong>Observe</strong> : la prescription part du SIH, le travail se fait dans le LIS, le résultat validé revient dans le dossier."
  });
  var g = A.s("g", null, f.svg);
  var E = [
    { t: "Prescription", d: "Le médecin saisit la demande dans le dossier patient du SIH ; elle part automatiquement vers le LIS." },
    { t: "Étiquetage", d: "Le LIS reçoit la demande et édite les étiquettes à code-barres." },
    { t: "Analyse", d: "Les automates mesurent ; les résultats bruts remontent au LIS (HL7, ASTM, middleware)." },
    { t: "Validation", d: "Le biologiste valide dans le LIS ; la traçabilité garde qui a fait quoi, quand, avec quel instrument." },
    { t: "Restitution", d: "Le résultat validé est renvoyé en temps réel vers le SIH, dans le dossier clinique du patient." }
  ];
  var zone = R.h("div", null, "", f.direct);
  function dessiner(k) {
    A.vider(g);
    A.boite(g, 40, 60, 330, 420, { fond: C.fond, bord: C.encre, ep: 3, rx: 18 });
    A.texte(g, "SIH (hôpital)", [205, 95], { taille: 24, gras: 800 });
    ["clinique", "administrative et financière", "technique et logistique"].forEach(function (c, i) {
      A.boite(g, 70, 130 + i * 110, 270, 86, { fond: i === 0 && (k === 1 || k === 5) ? C.jeuPale : "#fff", bord: i === 0 && (k === 1 || k === 5) ? C.jeu : C.trait, ep: 3, rx: 12, titre: "couche " + c, taille: 18 });
    });
    A.boite(g, 590, 60, 330, 420, { fond: C.fond, bord: C.encre, ep: 3, rx: 18 });
    A.texte(g, "LIS (laboratoire)", [755, 95], { taille: 24, gras: 800 });
    ["étiquettes, code-barres", "automates", "validation, traçabilité"].forEach(function (c, i) {
      var on = k === i + 2;
      A.boite(g, 620, 130 + i * 110, 270, 86, { fond: on ? C.jeuPale : "#fff", bord: on ? C.jeu : C.trait, ep: 3, rx: 12, titre: c, taille: 18 });
    });
    if (k >= 1) { A.fleche(g, [372, 170], [588, 170], { coul: C.jeu, ep: 5 }); A.texte(g, "demande", [480, 145], { taille: 18, gras: 800, coul: C.jeu }); }
    if (k >= 5) { A.fleche(g, [588, 390], [372, 210], { coul: C.ok, ep: 5 }); A.texte(g, "résultat validé", [480, 330], { taille: 18, gras: 800, coul: C.ok }); }
    zone.innerHTML = k ? "<strong>" + E[k - 1].t + "</strong> : " + E[k - 1].d : "Avance pour suivre une demande d'examen.";
  }
  var e = R.etapes(f.reglages, 5, ["", "prescription", "étiquetage", "analyse", "validation", "restitution"], dessiner);
  e.aller(0);
})();
