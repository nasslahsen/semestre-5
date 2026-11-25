/* Figures : le cycle de décision d'un projet d'extension, puis la matrice R / C du projet (S5, diapos 5 et 6). */
(function () {
  "use strict";
  var R = RM, A = SIS, C = A.C;
  var E = [
    ["Étude d'opportunité", "faisabilité, business case, charte projet", "analyse de faisabilité, business case, charte projet."],
    ["Programme technique", "CPT, règlement de consultation, CPS", "cahier de prescriptions techniques, règlement de consultation, CPS."],
    ["Consultation et choix", "offres comparées", "les offres sont reçues et comparées."],
    ["Déploiement et qualification", "réception, tests, formation", "réception, tests, formation."],
    ["Ouverture et évaluation", "indicateurs, retours", "le centre ouvre ; on suit les indicateurs et les retours."]
  ];
  var f = R.figure("fig-cycle", { largeur: 960, hauteur: 360, titre: "Cycle de décision d'un projet d'extension",
    essai: "<strong>Essaie</strong> : avance étape par étape. <strong>Observe</strong> : à chaque étape, les mêmes trois questions reviennent." });
  var N = E.map(function (e, i) { return { t: e[0], sous: e[1], x: 10 + i * 190, y: 30, w: 175, h: 140, taille: 17, tailleSous: 14 }; });
  A.etapesFig(f, N, E.map(function (e) { return "<strong>" + e[0] + "</strong> : " + e[2]; }), {
    fond: function (g, k) {
      if (k < E.length) return;
      A.boite(g, 10, 210, 940, 110, { titre: "À chaque étape", sous: "qui décide, qui est consulté, quelle trace écrite ?", taille: 20, tailleSous: 18, fond: C.jeuPale, bord: C.jeu });
    }, depart: "Avance pour suivre le projet, de l'idée à l'ouverture."
  });

  var m = R.figure("fig-raci", { largeur: 960, hauteur: 500, titre: "Matrice de responsabilités du projet",
    essai: "<strong>Essaie</strong> : touche une activité. <strong>Observe</strong> : le mode dégradé est le seul où tous les acteurs de l'hôpital sont responsables." });
  var ACT = ["Exigences de sécurité des équipements", "Protocoles et paramétrage clinique", "Recette de l'intégration au SIH", "Qualification avant la 1re préparation", "Formation des opérateurs", "Mode dégradé en cas de panne"];
  var QUI = ["Biomédical", "Pharmacie", "Oncologues", "DSI", "Soins", "Fournisseur"];
  var MAT = [["R", "C", "C", "C", "C", "C"], ["C", "R", "R", "C", "R", "C"], ["R", "C", "C", "R", "C", "C"], ["R", "C", "C", "C", "C", "R"], ["C", "R", "R", "C", "R", "R"], ["R", "R", "R", "R", "R", "C"]];
  var it = ACT.map(function (t, i) { return { x: 10, y: 70 + i * 70, w: 330, h: 60, t: t, taille: 16,
    texte: "responsables : " + QUI.filter(function (q, k) { return MAT[i][k] === "R"; }).join(", ") + ". Consultés : " + QUI.filter(function (q, k) { return MAT[i][k] === "C"; }).join(", ") + "." }; });
  A.explorer(m, it, { fond: function (g) {
    QUI.forEach(function (q, k) { A.texte(g, q, [400 + k * 96, 40], { taille: 15, gras: 700, largeur: 94 }); });
  }, devant: function (g, ch) {
    MAT.forEach(function (l, i) {
      l.forEach(function (v, k) {
        var on = i === ch, x = 358 + k * 96, y = 70 + i * 70;
        var fond = v === "R" ? (on ? C.jeu : C.jeuPale) : (on ? C.accPale : C.fond);
        A.boite(g, x, y, 84, 60, { titre: v, taille: 22, fond: fond, bord: on ? C.encre : C.trait, ep: on ? 3 : 1.5, coul: v === "R" && on ? "#fff" : C.encre, mono: true });
      });
    });
  }, invite: "Touche une activité." });
})();
