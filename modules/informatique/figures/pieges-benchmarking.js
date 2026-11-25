/* Figure : cinq pièges du benchmarking, et ce que le cours oppose à chacun (S5, diapos 15 et 16). */
(function () {
  "use strict";
  var R = RM, A = SIS, C = A.C;
  var f = R.figure("fig-pieges", { largeur: 960, hauteur: 380, titre: "Cinq pièges du benchmarking",
    essai: "<strong>Essaie</strong> : touche chaque piège. <strong>Observe</strong> : chacun se déjoue par un outil vu dans la séance." });
  var P = [
    ["Démonstration préparée", "le scénario est choisi par l'éditeur.", "imposer les trois scénarios de l'hôpital (identité provisoire, protocole modifié, panne de l'étiqueteuse)."],
    ["Intégration non prouvée", "une promesse sans site de référence.", "exiger un site de référence comparable et des tests avec identités fictives."],
    ["Périmètres différents", "les offres ne couvrent pas la même chose.", "comparer sur les mêmes critères, avec le coût complet sur 7 ans."],
    ["Références non comparables", "taille ou organisation différentes.", "chercher des établissements comparables : taille, activité, organisation proches."],
    ["Dépendance fournisseur", "on ne peut plus changer de fournisseur.", "une clause de réversibilité, comme le dit le cours."]
  ];
  var items = P.map(function (p, i) { return { x: 10 + i * 190, y: 60, w: 175, h: 150, t: p[0], texte: p[1] + " Parade : " + p[2], taille: 18, coul: C.ko, pale: C.koPale }; });
  A.explorer(f, items, { fond: function (g) {
    A.boite(g, 10, 250, 940, 100, { titre: "Rôle de l'ingénieur biomédical", sous: "critères et preuves, démonstrations, sites de référence, coût de maintenance, points non prouvés signalés au comité", taille: 19, tailleSous: 16, fond: C.turqPale, bord: C.turq });
  }, invite: "Touche un piège." });
})();
