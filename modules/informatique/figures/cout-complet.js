/* Figure : coût complet sur 7 ans, bénéfices attendus et coûts cachés (S5, diapo 7). */
(function () {
  "use strict";
  var R = RM, A = SIS, C = A.C;
  var f = R.figure("fig-cout", { largeur: 960, hauteur: 460, titre: "Ce que coûte et ce que rapporte la solution",
    essai: "<strong>Essaie</strong> : touche chaque bloc. <strong>Observe</strong> : le prix d'achat n'est qu'un bloc sur six, et les coûts cachés sont sous la ligne du budget." });
  var COUT = [["Investissement", "le prix d'achat de la solution."], ["Locaux adaptés", "salle, isolation, fluides pour accueillir l'équipement."], ["Consommables spécifiques", "ce que la solution consomme, parfois chez un seul fournisseur."], ["Maintenance", "le contrat sur toute la durée."], ["Formation", "le temps de formation des opérateurs."], ["Remplacement", "la fin de vie et le renouvellement."]];
  var BEN = [["Sécurité du patient", "moins d'erreurs de dose ou de patient."], ["Sécurité du personnel", "moins d'exposition aux cytotoxiques."], ["Médicaments non gaspillés", "des médicaments coûteux qu'on ne jette plus."], ["Temps soignant", "du temps rendu aux soignants."], ["Attractivité du centre", "le centre attire patients et professionnels."]];
  var items = COUT.map(function (c, i) { return { x: 20 + (i % 2) * 220, y: 50 + Math.floor(i / 2) * 82, w: 205, h: 70, t: c[0], texte: c[1], taille: 16, coul: C.ko, pale: C.koPale }; })
    .concat(BEN.map(function (b, i) { return { x: 520 + (i % 2) * 220, y: 50 + Math.floor(i / 2) * 82, w: 205, h: 70, t: b[0], texte: b[1], taille: 16, coul: C.ok, pale: C.okPale }; }))
    .concat([{ x: 20, y: 340, w: 920, h: 100, t: "Coûts cachés", sous: "interfaçage non prévu, périmètre mal exprimé, trop de réunions de validation", texte: "dépenses, pertes ou manques à gagner absents du budget initial et de la comptabilité traditionnelle.", taille: 19, tailleSous: 16, coul: C.v, pale: C.vPale }]);
  A.explorer(f, items, { fond: function (g) {
    A.texte(g, "Coût sur 7 ans", [235, 25], { taille: 19, gras: 800, coul: C.ko });
    A.texte(g, "Bénéfices attendus", [735, 25], { taille: 19, gras: 800, coul: C.ok });
    A.s("line", { x1: 20, y1: 318, x2: 940, y2: 318, stroke: C.encre, "stroke-width": 3, "stroke-dasharray": "12 8" }, g);
    A.texte(g, "ligne du budget initial", [820, 304], { taille: 14, coul: C.doux });
  }, invite: "Touche un bloc." });
})();
