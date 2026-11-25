/* Figure : trois moments d'audit, avec ce qu'on vérifie à chacun (S5, diapo 10). */
(function () {
  "use strict";
  var R = RM, A = SIS, C = A.C;
  var E = [
    ["Avant l'achat", "dossier, site de référence, démonstration", "dossier fournisseur, site de référence, démonstration scénarisée."],
    ["À la réception", "livraison, qualification, tests", "contrôle de la livraison, qualification, tests avec identités fictives."],
    ["Après l'ouverture", "indicateurs, retours, incidents", "indicateurs, retours des utilisateurs, incidents."]
  ];
  var f = R.figure("fig-moments", { largeur: 960, hauteur: 360, titre: "Trois moments d'audit",
    essai: "<strong>Essaie</strong> : avance d'un moment à l'autre. <strong>Observe</strong> : la preuve change de nature, du dossier papier à l'usage réel." });
  var N = E.map(function (e, i) { return { t: e[0], sous: e[1], x: 20 + i * 315, y: 30, w: 290, h: 140, taille: 20, tailleSous: 16 }; });
  A.etapesFig(f, N, E.map(function (e) { return "<strong>" + e[0] + "</strong> : " + e[2]; }), {
    fond: function (g, k) {
      if (k < E.length) return;
      A.boite(g, 20, 210, 920, 110, { titre: "Fait, écart, opinion", sous: "un constat s'appuie sur une preuve vérifiable", taille: 20, tailleSous: 18, fond: C.jeuPale, bord: C.jeu });
    }, depart: "Avance pour suivre la solution, de l'achat à l'usage."
  });
})();
