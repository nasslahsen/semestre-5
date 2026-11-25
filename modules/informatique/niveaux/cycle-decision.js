/* Niveau : cycle de décision d'un projet d'extension et matrice R / C (S5, diapos 5 et 6). */
NIVEAU(SIS.rejouable({
  id: "cycle-decision",
  init: function (fig) {
    var A = SIS, g = A.s("g", null, fig.svg);
    var n = { g: g };
    n.cinq = function (noms, place) { return noms.map(function (e, i) { var c = place[i]; return { t: e[0], sous: e[1], x: c === 4 ? 185 : 20 + (c % 2) * 330, y: 40 + Math.floor(c / 2) * 180, w: 310, h: 110 }; }); };
    return n;
  },
  etapes: [
    { nom: "Les cinq étapes", jouer: function (j, n) {
      var A = SIS, C = A.C;
      j.titre("Touche les cinq étapes du cycle de décision, dans l'ordre.");
      var nd = n.cinq([["Étude d'opportunité", "faisabilité, business case"], ["Programme technique", "CPT, règlement, CPS"], ["Consultation et choix", "offres comparées"], ["Déploiement et qualification", "réception, tests, formation"], ["Ouverture et évaluation", "indicateurs, retours"]], [2, 4, 1, 0, 3]);
      var tr = A.trace({ g: n.g, noeuds: nd, ordre: [0, 1, 2, 3, 4], coul: C.jeu, taille: 19, erreur: j.erreur,
        aide: function (i, att, k) { return ["D'abord : le projet vaut-il la peine ?", "Puis on écrit ce qu'on attend.", "On reçoit et compare les offres.", "On installe, on teste, on forme.", "Le centre ouvre, on mesure."][k]; },
        fin: function () { j.bravo("Opportunité → programme technique → consultation et choix → déploiement et qualification → ouverture et évaluation."); j.suite(); } });
      j.reponse(function () { tr.resoudre(); });
    } },
    { nom: "Les documents", jouer: function (j, n) {
      var A = SIS;
      j.titre("Relie chaque document ou activité à son étape.");
      var p = A.paires({
        g: n.g, gauche: ["Business case", "Règlement de consultation, CPS", "Offres comparées", "Tests et formation", "Indicateurs et retours"],
        droite: ["Consultation et choix", "Ouverture et évaluation", "Étude d'opportunité", "Déploiement et qualification", "Programme technique"],
        bon: [2, 4, 0, 3, 1],
        xg: 20, wg: 290, xd: 370, wd: 290, y0: 30, h: 90, pas: 110, taille: 18, tailleD: 18,
        erreur: j.erreur, info: j.info,
        aide: function (i) { return ["Il justifie le projet, tout au début.", "Ils préparent l'appel aux fournisseurs.", "On choisit entre elles.", "Ils précèdent l'ouverture.", "On les suit une fois le centre ouvert."][i]; },
        fin: function () { j.bravo("Chaque étape laisse sa trace écrite."); j.suite(); }
      });
      j.reponse(function () { p.resoudre(); });
    } },
    { nom: "Le mode dégradé", jouer: function (j, n) {
      var A = SIS;
      A.scene(n.g, { icones: ["engrenage", "alerte"], titre: "Le robot de préparation tombe en panne" });
      j.titre("Dans la matrice du projet, qui est responsable (R) du mode dégradé en cas de panne ?");
      j.choix([
        { html: "Le fournisseur seul", aide: "Dans la matrice, le fournisseur est seulement consulté pour cette ligne." },
        { html: "Le biomédical seul", aide: "Il est responsable, mais il n'est pas le seul." },
        { html: "Biomédical, pharmacie, oncologues, DSI et soins, le fournisseur étant consulté", juste: true }
      ], { colonnes: 1, ok: function () {
        j.bravo("Tous les acteurs de l'hôpital : le mode dégradé touche tout le circuit.");
        j.expliquer("<p>C'est la seule ligne où tous les acteurs de l'hôpital sont <b>R</b>. Pour les <b>protocoles</b>, au contraire, le biomédical n'est que consulté.</p>");
        j.suite();
      } });
    } },
    { nom: "La recette de l'intégration", jouer: function (j, n) {
      var A = SIS;
      A.scene(n.g, { icones: ["serveur", "document"], titre: "Recette de l'intégration au SIH", alerte: false });
      j.titre("Qui est responsable de la recette de l'intégration au SIH ?");
      j.choix([
        { html: "Le biomédical et la DSI", juste: true },
        { html: "La pharmacie et les oncologues", aide: "Ils sont consultés : ce sont des utilisateurs." },
        { html: "Le fournisseur", aide: "Il est consulté : on ne laisse pas le fournisseur valider son propre travail." }
      ], { colonnes: 1, ok: function () { j.bravo("Biomédical et DSI : l'équipement d'un côté, le SIH de l'autre."); j.suite(); } });
    } },
    { nom: "Trois questions", jouer: function (j, n) {
      var A = SIS;
      A.scene(n.g, { icones: ["document", "personne"], titre: "À chaque étape du cycle", alerte: false });
      j.titre("Le cours pose trois questions à chaque étape du cycle. Lesquelles ?");
      j.choix([
        { html: "Combien ça coûte, combien ça rapporte, quand ça ouvre", aide: "Le coût vient plus tard. Ici on parle de responsabilités." },
        { html: "Qui décide, qui est consulté, quelle trace écrite", juste: true },
        { html: "Quel fournisseur, quel robot, quel logiciel", aide: "Ce sont les choix eux-mêmes, pas la façon de les prendre." }
      ], { colonnes: 1, ok: function () { j.bravo("Qui décide, qui est consulté, quelle trace écrite."); j.suite(); } });
    } }
  ]
}));
