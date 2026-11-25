/* Figure : la frise du scénario de 22 h 40, avec la solution du professeur (module, processus, acteurs). */
(function () {
  "use strict";
  var R = RM, A = SIS, C = A.C;
  var f = R.figure("fig-frise", {
    largeur: 960, hauteur: 460, titre: "La frise du patient de 22 h 40",
    essai: "<strong>Essaie</strong> : touche chaque étape. <strong>Observe</strong> : module, processus et acteurs changent à chaque étape ; l'identité, elle, suit le patient partout."
  });
  var S = [
    ["N1", "Accueil urgences", "Module : DPI-Urgences. Processus : identitovigilance, accueil et tri IAO, prise des constantes de base. Acteur : infirmier (assistance et orientation)."],
    ["N2", "Guichet d'admission", "Module : Admission. Processus : création ou mise à jour de l'identité, identitovigilance, identité provisoire. Acteur : agent d'admission."],
    ["N3", "Consultation des urgences", "Module : DPI-Urgences. Processus : saisie du questionnaire, prescriptions médicales, déplacement vers la zone d'observation. Acteur : médecin urgentiste."],
    ["N4.1", "Laboratoire", "Module : LIS. Processus : pré-analytique, analytique et post-analytique. Acteurs : techniciens biologistes, médecin biologiste."],
    ["N4.2", "Imagerie", "Module : RIS. Processus : accueil, réalisation, validation du compte rendu, archivage. Acteurs : manipulateur radio, médecin radiologue."],
    ["N5", "Zone d'observation", "Module : DPI-Urgences. Processus : plan de soins, questionnaire de sortie, ordonnances, sortie médicale, cotation des actes. Acteurs : infirmier, médecin urgentiste."],
    ["N6", "Guichet de sortie", "Module : Admission / facturation. Processus : sortie administrative, facturation, encaissement (selon la catégorie du patient). Acteurs : agents d'admission et de facturation, caissier."]
  ];
  var pos = [[20, 170], [150, 170], [280, 170], [450, 50], [450, 290], [620, 170], [790, 170]];
  var items = S.map(function (s, i) { return { x: pos[i][0], y: pos[i][1], w: 130, h: 110, t: s[1], sous: s[0], texte: s[2], taille: 16, tailleSous: 14, coul: C.jeu, pale: C.jeuPale }; });
  A.explorer(f, items, { fond: function (g) {
    A.s("line", { x1: 30, y1: 420, x2: 930, y2: 420, stroke: C.trait, "stroke-width": 6, "stroke-linecap": "round" }, g);
    A.texte(g, "22 h 40", [60, 445], { taille: 15, mono: true, coul: C.doux });
    A.texte(g, "Homme, 68 ans, douleur thoracique, sans pièce d'identité, avec un proche", [200, 30], { taille: 15, gras: 700, largeur: 360 });
    [[0, 1], [1, 2], [2, 3], [2, 4], [3, 5], [4, 5], [5, 6]].forEach(function (l) { A.relier(g, items[l[0]], items[l[1]], { ep: 3, coul: C.doux }); });
  } });
})();
