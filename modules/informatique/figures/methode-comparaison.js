/* Figure : la méthode de comparaison de deux offres en cinq étapes (S5, diapo 12). */
(function () {
  "use strict";
  var R = RM, A = SIS, C = A.C;
  var E = [
    ["Critères éliminatoires", "conformité, sécurité, intégration prouvée", "une offre qui échoue ici est écartée, quel que soit son score."],
    ["Critères pondérés", "poids fixés avant de voir les offres", "les poids sont fixés avant d'ouvrir les offres, pour ne pas les ajuster au favori."],
    ["Notes sur preuves", "démonstrations, visites, utilisateurs", "chaque note s'appuie sur une preuve : démonstration, visite, retour d'utilisateurs."],
    ["Coût complet sur 7 ans", "au-delà du prix d'achat", "on compare le coût complet, pas seulement le prix d'achat."],
    ["Analyse de sensibilité", "le classement résiste-t-il ?", "on refait le calcul avec d'autres poids : le classement tient-il ?"]
  ];
  var f = R.figure("fig-methode", { largeur: 960, hauteur: 380, titre: "Méthode de comparaison de deux offres",
    essai: "<strong>Essaie</strong> : avance étape par étape. <strong>Observe</strong> : le filtre éliminatoire passe avant toute note." });
  var N = E.map(function (e, i) { return { t: e[0], sous: e[1], x: 10 + i * 190, y: 30, w: 175, h: 140, taille: 17, tailleSous: 14 }; });
  A.etapesFig(f, N, E.map(function (e) { return "<strong>" + e[0] + "</strong> : " + e[2]; }), {
    fond: function (g, k) {
      if (k < 1) return;
      A.boite(g, 10, 220, 940, 110, { titre: "Règle", sous: "une offre qui échoue à un critère éliminatoire est écartée, quel que soit son score", taille: 20, tailleSous: 18, fond: C.koPale, bord: C.ko });
    }, depart: "Avance pour comparer les offres A et B."
  });
})();
