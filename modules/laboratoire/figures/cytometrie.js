/* Figure : scattergrammes FSC / SSC (3 populations) et SSC / fluorescence (5 populations) ; toucher un nuage pour le nommer. */
(function () {
  "use strict";
  var R = RM, A = LABO, C = A.C;

  var f = R.figure("fig-cytometrie", {
    largeur: 960, hauteur: 540, titre: "Scattergrammes : chaque point est une cellule",
    essai: "<strong>Essaie</strong> : touche un nuage, puis passe à la vue avec fluorescence. <strong>Observe</strong> : la taille et la granulosité séparent trois populations ; la fluorescence en sépare cinq."
  });
  var g = A.s("g", null, f.svg), vue = 0, sel = null;
  // nuages : centre (en unités 0 à 1000), étalement, nom, description
  var V = [
    { ax: ["FSC (taille)", "SSC (granulosité)"], P: [
      { c: [250, 160], e: [110, 70], n: "Lymphocytes", d: "petits, peu granuleux." },
      { c: [520, 430], e: [100, 70], n: "Monocytes", d: "plus grands, granulosité moyenne." },
      { c: [620, 830], e: [140, 90], n: "Granulocytes", d: "neutrophiles et éosinophiles, très granuleux." }] },
    { ax: ["SSC", "FL (ADN / ARN)"], P: [
      { c: [180, 160], e: [90, 60], n: "Lymphocytes", d: "fluorescence la plus faible." },
      { c: [330, 360], e: [90, 55], n: "Monocytes", d: "un peu plus de fluorescence." },
      { c: [640, 520], e: [130, 60], n: "Neutrophiles", d: "très granuleux." },
      { c: [800, 700], e: [90, 50], n: "Éosinophiles", d: "les plus granuleux." },
      { c: [330, 860], e: [80, 50], n: "Basophiles", d: "fluorescence la plus forte." }] }
  ];
  var b = R.boutons(f.reglages), bts = [R.bouton(b, "FSC / SSC", function () { vue = 0; sel = null; dessiner(); }), R.bouton(b, "Avec fluorescence", function () { vue = 1; sel = null; dessiner(); })];
  var zone = R.h("div", null, "", f.direct);
  // points pseudo-aléatoires reproductibles
  function hasard(k) { var x = Math.sin(k * 12.9898) * 43758.5453; return x - Math.floor(x); }
  function dessiner() {
    bts.forEach(function (bt, i) { bt.classList.toggle("actif", i === vue); });
    A.vider(g);
    var x0 = 110, x1 = 900, y0 = 470, y1 = 40, X = function (v) { return x0 + v / 1000 * (x1 - x0); }, Y = function (v) { return y0 - v / 1000 * (y0 - y1); };
    A.s("line", { x1: x0, y1: y0, x2: x1, y2: y0, stroke: C.encre, "stroke-width": 3 }, g);
    A.s("line", { x1: x0, y1: y0, x2: x0, y2: y1, stroke: C.encre, "stroke-width": 3 }, g);
    A.texte(g, V[vue].ax[0], [x1 - 90, y0 + 32], { taille: 18, gras: 800 });
    A.texte(g, V[vue].ax[1], [x0 + 110, 22], { taille: 18, gras: 800 });
    V[vue].P.forEach(function (p, i) {
      var on = sel === i, coul = on ? C.jeu : [C.froid, C.ok, C.v, C.chaud, C.sang][i];
      for (var k = 0; k < 60; k++) {
        var u = hasard(k + 100 * i + 7) * 2 * Math.PI, r = Math.sqrt(hasard(k * 3 + 11 * i + 1));
        A.s("circle", { cx: X(p.c[0] + Math.cos(u) * r * p.e[0]), cy: Y(p.c[1] + Math.sin(u) * r * p.e[1]), r: 4.5, fill: coul, opacity: on ? 0.95 : 0.6 }, g);
      }
      A.texte(g, p.n, [X(p.c[0]) + (p.c[0] > 700 ? -40 : 0), Y(p.c[1] + p.e[1]) - 16], { taille: 18, gras: 800, coul: on ? C.jeu : C.encre });
      A.cible(g, X(p.c[0] - p.e[0]), Y(p.c[1] + p.e[1]), X(p.c[0] + p.e[0]) - X(p.c[0] - p.e[0]), Y(p.c[1] - p.e[1]) - Y(p.c[1] + p.e[1]), function () { sel = i; dessiner(); });
    });
    zone.innerHTML = sel === null ? "Touche un nuage de points." : "<strong>" + V[vue].P[sel].n + "</strong> : " + V[vue].P[sel].d;
  }
  dessiner();
})();
