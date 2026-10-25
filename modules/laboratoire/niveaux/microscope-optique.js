/* Niveau : le microscope optique (chapitre 5, I-2 et II) : trajet de la lumière, images, grossissement, lentilles, revolver. */
NIVEAU(LABO.rejouable({
  id: "microscope-optique",
  init: function (fig) {
    var A = LABO, g = A.s("g", null, fig.svg);
    return { g: g, pl: { P: function (v) { return v; } } };
  },
  etapes: [
    { nom: "Le trajet de la lumière", jouer: function (j, n) {
      var A = LABO, C = A.C;
      j.titre("La lumière part de la lampe et arrive à l'œil. Remets les éléments dans l'ordre qu'elle traverse.");
      j.consigne("Touche les éléments dans l'ordre.");
      var N = ["Objectif", "Condenseur", "Oculaire", "Éclairage", "Lame sur la platine", "Tête binoculaire"];
      var t = A.trace({
        g: n.g, coul: C.jeu, taille: 22, fleches: false,
        noeuds: N.map(function (x, i) { return { t: x, x: 140, y: 30 + i * 92, w: 400, h: 74 }; }),
        ordre: [3, 1, 4, 0, 5, 2],
        erreur: function (m) { j.erreur(m); },
        aide: function (i, att, k) { return ["La lumière naît en bas, dans le socle.", "Elle est concentrée sous la platine.", "Elle traverse l'échantillon.", "Le premier groupe de lentilles, tourné vers l'objet.", "Prismes et miroirs la renvoient vers les yeux.", "La loupe finale, côté œil."][k]; },
        fin: function () { j.bravo("Éclairage, condenseur, lame, objectif, tête, oculaire."); j.suite(); }
      });
      j.reponse(function () { t.resoudre(); });
    } },
    { nom: "L'image de l'objectif", jouer: function (j, n) {
      var A = LABO, C = A.C; A.vider(n.g);
      A.s("ellipse", { cx: 200, cy: 280, rx: 18, ry: 110, fill: C.froidPale, stroke: C.froid, "stroke-width": 3 }, n.g);
      A.s("line", { x1: 60, y1: 280, x2: 60, y2: 230, stroke: C.encre, "stroke-width": 6 }, n.g);
      A.texte(n.g, "?", [460, 290], { taille: 70, gras: 800, coul: C.jeu });
      j.titre("Quelle image l'objectif donne-t-il de l'objet, à l'intérieur du tube ?");
      j.choix([
        { html: "Réelle, renversée et agrandie", juste: true },
        { html: "Virtuelle, droite et agrandie", aide: "C'est plutôt ce que fait une loupe. L'objectif forme une image dans le tube, qu'on pourrait recueillir sur un écran." },
        { html: "Réelle, droite et réduite", aide: "Le but de l'objectif est de grossir." }
      ], { colonnes: 1, ok: function () { j.bravo("Réelle, renversée, agrandie : l'image intermédiaire."); j.suite(); } });
    } },
    { nom: "Le grossissement", jouer: function (j, n) {
      var A = LABO, C = A.C; A.vider(n.g); A.icone(n.g, "microscope", [340, 230], 220, C.jeu);
      A.texte(n.g, "objectif 40× · oculaire 10×", [340, 430], { taille: 26, gras: 800 });
      j.titre("Quel est le grossissement total ?");
      j.nombre({ avant: "G =", cases: [{ attendu: 400, tol: 0 }],
        aide: function () { return "Les grossissements de l'objectif et de l'oculaire se multiplient."; },
        ok: function () { j.bravo("400 fois."); j.suite(); } });
    } },
    { nom: "Quelle lentille ?", jouer: function (j, n) {
      var A = LABO, C = A.C; A.vider(n.g);
      A.s("ellipse", { cx: 340, cy: 280, rx: 30, ry: 140, fill: C.froidPale, stroke: C.froid, "stroke-width": 4 }, n.g);
      [-90, -45, 0, 45, 90].forEach(function (d) { A.s("polyline", { points: [60, 280 + d, 340, 280 + d, 560, 280].join(","), fill: "none", stroke: C.chaud, "stroke-width": 3 }, n.g); });
      A.texte(n.g, "F", [580, 260], { taille: 28, gras: 800 });
      j.titre("Les rayons qui la traversent se rejoignent en un point F. Comment s'appelle cette lentille ?");
      j.choix([
        { html: "Convexe, convergente", juste: true },
        { html: "Concave, divergente", aide: "Une lentille divergente écarte les rayons." }
      ], { colonnes: 2, ok: function () { j.bravo("Convexe et convergente ; la distance au point F est la distance focale."); j.suite(); } });
    } },
    { nom: "Le revolver", jouer: function (j, n) {
      var A = LABO, C = A.C; A.vider(n.g);
      A.s("circle", { cx: 340, cy: 200, r: 90, fill: C.fond, stroke: C.encre, "stroke-width": 4 }, n.g);
      [-50, -15, 20, 55].forEach(function (a) { var r = a * Math.PI / 180; A.s("rect", { x: 340 + 110 * Math.sin(r) - 22, y: 270, width: 44, height: 110, rx: 8, fill: "#fff", stroke: C.encre, "stroke-width": 3, transform: "rotate(" + (-a / 3) + " " + (340 + 110 * Math.sin(r)) + " 270)" }, n.g); });
      j.titre("Dans la plupart des cas, combien d'objectifs le revolver porte-objectifs porte-t-il ?");
      j.choix([
        { html: "Un seul", aide: "Le revolver sert justement à passer d'un objectif à l'autre." },
        { html: "De trois à cinq", juste: true },
        { html: "Une dizaine", aide: "Le cours donne une fourchette plus petite." }
      ], { colonnes: 3, ok: function () { j.bravo("De trois à cinq, alignés par un encliquetage."); j.suite(); } });
    } }
  ]
}));
