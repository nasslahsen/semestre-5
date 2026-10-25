/* Niveau : métrologie et contrôle de qualité (chapitre 8) : fonctionnement et performance, CQI et EEQ, z, Levey-Jennings, grandeurs critiques. */
NIVEAU(LABO.rejouable({
  id: "metrologie-cqi",
  init: function (fig) {
    var A = LABO, C = A.C, g = A.s("g", null, fig.svg);
    var n = { g: g, pl: { P: function (v) { return v; } } };
    n.lj = function (z) {
      A.vider(g);
      var Y = function (v) { return 280 - v * 70; };
      [[3, C.ko], [2, C.chaud], [0, C.encre], [-2, C.chaud], [-3, C.ko]].forEach(function (l) {
        A.s("line", { x1: 90, y1: Y(l[0]), x2: 640, y2: Y(l[0]), stroke: l[1], "stroke-width": 2.5, "stroke-dasharray": l[0] ? "9 6" : null }, g);
        A.texte(g, l[0] ? (l[0] > 0 ? "+" : "−") + Math.abs(l[0]) + "s" : "m", [55, Y(l[0])], { taille: 20, gras: 800, coul: l[1] });
      });
      [0.4, -0.6, 0.9, -0.2, 0.5, -1.1, 0.3].forEach(function (v, i) { A.s("circle", { cx: 130 + i * 65, cy: Y(v), r: 10, fill: C.jeu }, g); });
      if (z !== undefined) A.s("circle", { cx: 600, cy: Y(z), r: 14, fill: "#fff", stroke: C.v, "stroke-width": 5 }, g);
    };
    return n;
  },
  etapes: [
    { nom: "Il s'allume", jouer: function (j, n) {
      var A = LABO; A.vider(n.g); A.icone(n.g, "automate", [340, 260], 220, A.C.jeu);
      j.titre("Après une coupure de courant, l'analyseur redémarre et répond normalement. Que rappelle le cours ?");
      j.choix([
        { html: "Il fonctionne, donc il mesure juste", aide: "C'est exactement l'idée que le cours met en garde." },
        { html: "Fonctionnement n'est pas performance : il faut vérifier qu'il mesure juste", juste: true }
      ], { colonnes: 1, ok: function () { j.bravo("Un appareil qui répond n'est pas forcément un appareil qui mesure juste."); j.suite(); } });
    } },
    { nom: "CQI ou EEQ ?", jouer: function (j, n) {
      var A = LABO;
      j.titre("Relie chaque démarche à ce qu'elle fait.");
      j.consigne("Touche une démarche, puis sa description.");
      var p = A.paires({
        g: n.g, gauche: ["Contrôle de qualité interne", "Évaluation externe de la qualité", "Étalonnage d'une grandeur"],
        droite: ["Comparer les laboratoires entre eux", "Comparer la mesure à une référence", "Surveiller l'analyseur en continu, chaque jour"],
        bon: [2, 0, 1], xg: 20, wg: 300, xd: 380, wd: 280, y0: 90, h: 110, pas: 160, taille: 19,
        erreur: function (m) { j.erreur(m); },
        aide: function (i) { return ["Interne : dans le laboratoire, au quotidien.", "Externe : avec d'autres laboratoires, pour la justesse.", "On rattache l'appareil à un étalon."][i]; },
        fin: function () { j.bravo("Interne et continu, externe et comparatif, étalonnage par rapport à une référence."); j.suite(); }
      });
      j.reponse(function () { p.resoudre(); });
    } },
    { nom: "Combien d'écarts-types ?", jouer: function (j, n) {
      n.lj();
      j.titre("Le contrôle a pour moyenne 4,0 et pour écart-type 0,2. Ce matin, il donne 4,5. À combien d'écarts-types de la moyenne ?");
      j.nombre({ avant: "z =", cases: [{ attendu: 2.5, tol: 0.005 }],
        aide: function () { return "z = (valeur − moyenne) / écart-type."; },
        ok: function () { n.lj(2.5); j.bravo("z = 2,5."); j.suite(); } });
    } },
    { nom: "Que faire ?", jouer: function (j, n) {
      n.lj(2.5);
      j.titre("Ce contrôle est à 2,5 écarts-types. D'après les règles rappelées dans le cours, qu'est-ce que c'est ?");
      j.choix([
        { html: "Rien de notable", aide: "Il dépasse une des lignes du graphique." },
        { html: "Un avertissement : au-delà de 2s, mais pas de 3s", juste: true },
        { html: "Un rejet de la série : au-delà de 3s", aide: "Il n'atteint pas 3s." }
      ], { colonnes: 1, ok: function () { j.bravo("Avertissement : on regarde les jours précédents et on repasse le contrôle."); j.suite(); } });
    } },
    { nom: "Une grandeur critique", jouer: function (j, n) {
      var A = LABO; A.vider(n.g); A.icone(n.g, "thermo", [340, 260], 200, A.C.jeu);
      j.titre("Laquelle de ces grandeurs le cours ne cite-t-il pas parmi les grandeurs critiques à étalonner ?");
      j.choix([
        { html: "La longueur d'onde", aide: "Elle est citée : c'est celle des photomètres." },
        { html: "La couleur du boîtier de l'appareil", juste: true },
        { html: "Le temps", aide: "Il est cité : pense au minuteur de la centrifugeuse." },
        { html: "La conductivité", aide: "Elle est citée : pense à l'eau pure." }
      ], { colonnes: 1, ok: function () { j.bravo("Température, temps, volume, vitesse, pression, masse, pH, conductivité, longueur d'onde."); j.suite(); } });
    } }
  ]
}));
