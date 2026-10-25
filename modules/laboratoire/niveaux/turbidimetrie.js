/* Niveau : turbidimétrie et néphélométrie (3.2) : ce que mesure chacune, position du détecteur, effet crochet, applications, longueur d'onde. */
NIVEAU(LABO.rejouable({
  id: "turbidimetrie",
  init: function (fig) {
    var A = LABO, C = A.C, g = A.s("g", null, fig.svg);
    var n = { g: g, libre: true, pl: { P: function (v) { return v; } } };
    // cuve vue de dessus, faisceau de gauche à droite, quatre positions possibles pour un détecteur
    n.POS = [[600, 300], [500, 110], [80, 470], [340, 520]];
    n.banc = function (sel, faux) {
      A.vider(g);
      A.s("rect", { x: 20, y: 280, width: 230, height: 40, fill: C.jeuPale }, g);
      A.s("rect", { x: 250, y: 210, width: 180, height: 180, rx: 10, fill: C.vPale, stroke: C.encre, "stroke-width": 3 }, g);
      A.s("rect", { x: 430, y: 285, width: 120, height: 30, fill: C.jeuPale }, g);
      n.POS.forEach(function (p, i) {
        var on = sel === i, ko = faux === i;
        A.s("rect", { x: p[0] - 40, y: p[1] - 35, width: 80, height: 70, rx: 10, fill: on ? C.v : "#fff", stroke: ko ? C.ko : on ? C.v : C.encre, "stroke-width": ko || on ? 4 : 2.5, "stroke-dasharray": on ? null : "8 6" }, g);
        A.cible(g, p[0] - 50, p[1] - 45, 100, 90, function () { if (n.toucher) n.toucher(i); });
      });
    };
    return n;
  },
  etapes: [
    { nom: "Ce qu'on mesure", jouer: function (j, n) {
      var A = LABO; A.vider(n.g); A.icone(n.g, "lampe", [340, 260], 200, A.C.jeu);
      j.titre("Quelle méthode mesure la diminution de la lumière transmise, c'est-à-dire l'augmentation de l'absorbance ?");
      j.choix([
        { html: "Turbidimétrie", juste: true },
        { html: "Néphélométrie", aide: "La néphélométrie mesure la lumière renvoyée sur le côté, pas celle qui passe." }
      ], { colonnes: 2, ok: function () { j.bravo("Turbidimétrie : ce qui manque à la lumière transmise."); j.suite(); } });
    } },
    { nom: "Placer le néphélomètre", jouer: function (j, n) {
      n.banc();
      j.titre("La lumière arrive de la gauche. Où placer le détecteur d'un néphélomètre ?");
      j.consigne("Touche la bonne position.");
      function gagner() {
        n.toucher = null; n.banc(1);
        j.bravo("À un angle par rapport à la lumière incidente, en angle frontal.");
        j.expliquer("<p>Le néphélomètre mesure l'intensité de la lumière diffusée à un certain angle, généralement vers l'avant. En face, dans l'axe, on mesurerait la lumière transmise : ce serait un turbidimètre.</p>");
        j.suite();
      }
      n.toucher = function (i) {
        if (i !== 1) { n.banc(null, i); j.erreur(i === 0 ? "Dans l'axe du faisceau, on mesure la lumière transmise : c'est le turbidimètre." : "Le cours parle d'un angle frontal : vers l'avant, du côté où la lumière sort de la cuve."); return; }
        gagner();
      };
      j.reponse(gagner);
    } },
    { nom: "Un signal trop faible", jouer: function (j, n) {
      var A = LABO, C = A.C; A.vider(n.g);
      A.s("line", { x1: 80, y1: 470, x2: 620, y2: 470, stroke: C.encre, "stroke-width": 3 }, n.g);
      A.s("line", { x1: 80, y1: 470, x2: 80, y2: 90, stroke: C.encre, "stroke-width": 3 }, n.g);
      A.s("polyline", { points: "80,470 200,300 320,140 440,250 560,370", fill: "none", stroke: C.jeu, "stroke-width": 5 }, n.g);
      A.texte(n.g, "antigène", [580, 505], { taille: 18, gras: 700 }); A.texte(n.g, "signal", [120, 80], { taille: 18, gras: 700 });
      A.s("circle", { cx: 540, cy: 350, r: 12, fill: C.ko }, n.g);
      j.titre("Un patient a une CRP très élevée, mais l'automate rend un signal faible. Que se passe-t-il ?");
      j.choix([
        { html: "La lampe est usée", aide: "Regarde la courbe : où se trouve le point rouge ?" },
        { html: "L'effet crochet : l'excès d'antigène fait baisser le signal", juste: true },
        { html: "La CRP n'est pas dosable par cette méthode", aide: "La CRP fait partie des protéines spécifiques dosées ainsi." }
      ], { colonnes: 1, ok: function () { j.bravo("Effet crochet : trop d'antigène, signal paradoxalement diminué."); j.expliquer("<p>C'est pour cela que la méthode exige une calibration multipoint et une régression non linéaire.</p>"); j.suite(); } });
    } },
    { nom: "Quelle analyse ?", jouer: function (j, n) {
      var A = LABO; A.vider(n.g); A.icone(n.g, "tube", [340, 260], 220, A.C.jeu);
      j.titre("Laquelle de ces analyses fait partie des dosages par turbidimétrie ou néphélométrie cités au cours ?");
      j.choix([
        { html: "La transferrine", juste: true },
        { html: "Le sodium", aide: "Un ion ne forme pas de complexe antigène-anticorps : il se dose autrement." },
        { html: "L'activité de l'ALT", aide: "L'activité d'une enzyme se suit en cinétique, en photométrie." }
      ], { colonnes: 3, ok: function () { j.bravo("Transferrine : une protéine spécifique sérique."); j.suite(); } });
    } },
    { nom: "La longueur d'onde", jouer: function (j, n) {
      var A = LABO, C = A.C; A.vider(n.g); A.icone(n.g, "lampe", [340, 260], 200, C.v);
      j.titre("À quelle longueur d'onde, en dehors de la région bleue, la turbidimétrie se mesure-t-elle généralement ?");
      j.nombre({ avant: "\\lambda =", apres: "\\text{nm}", cases: [{ attendu: 340, tol: 0 }],
        aide: function () { return "C'est dans l'UV proche, une longueur d'onde qu'on retrouve aussi sur les filtres des automates."; },
        ok: function () { j.bravo("340 nm, ou la région bleue (435 à 480 nm)."); j.expliquer("<p>On ajoute des agents renforçateurs comme le polyéthylène glycol, pour des complexes immuns stables.</p>"); j.suite(); } });
    } }
  ]
}));
