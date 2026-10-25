/* Figure : des cellules traversent le micro-orifice ; chaque passage donne une impulsion, classée par les seuils de volume. */
(function () {
  "use strict";
  var R = RM, A = LABO, C = A.C, K = A.calc;

  var f = R.figure("fig-impedance", {
    largeur: 960, hauteur: 540, titre: "Le principe de Coulter : une impulsion par cellule",
    essai: "<strong>Essaie</strong> : fais passer des cellules une à une. <strong>Observe</strong> : la hauteur de chaque impulsion suit le volume de la cellule, et les seuils la rangent en plaquette, débris ou globule rouge."
  });
  var g = A.s("g", null, f.svg);
  var V = [90, 12, 28, 85, 8, 110, 16, 95, 24, 75, 14, 100];
  var COUL = { PLT: C.v, bruit: C.gris, GR: C.sang };
  var passes = 0;
  var b = R.boutons(f.reglages);
  R.bouton(b, "Faire passer une cellule", function () { if (passes < V.length) passes++; dessiner(); });
  R.bouton(b, "Recommencer", function () { passes = 0; dessiner(); });
  var zone = R.h("div", null, "", f.direct);
  function dessiner() {
    A.vider(g);
    // l'orifice entre deux électrodes
    A.s("rect", { x: 30, y: 60, width: 250, height: 400, rx: 16, fill: C.froidPale, stroke: C.encre, "stroke-width": 3 }, g);
    A.s("rect", { x: 30, y: 245, width: 105, height: 30, fill: C.encre }, g);
    A.s("rect", { x: 175, y: 245, width: 105, height: 30, fill: C.encre }, g);
    A.texte(g, "+", [155, 100], { taille: 34, gras: 800 }); A.texte(g, "−", [155, 430], { taille: 34, gras: 800 });
    A.texte(g, "micro-orifice", [155, 300], { taille: 16, gras: 700, coul: C.doux });
    if (passes) { var v = V[passes - 1], cl = K.classeVolume(v); A.s("circle", { cx: 155, cy: 260, r: 6 + Math.sqrt(v) * 1.4, fill: COUL[cl], stroke: C.encre, "stroke-width": 2 }, g); }
    // tracé des impulsions
    var x0 = 330, x1 = 930, y0 = 440, Y = function (vol) { return y0 - vol / 120 * 360; };
    A.s("line", { x1: x0, y1: y0, x2: x1, y2: y0, stroke: C.encre, "stroke-width": 3 }, g);
    A.s("line", { x1: x0, y1: y0, x2: x0, y2: 50, stroke: C.encre, "stroke-width": 3 }, g);
    A.texte(g, "temps", [x1 - 30, y0 + 28], { taille: 17, gras: 700 });
    A.texte(g, "amplitude", [x0 + 60, 40], { taille: 17, gras: 700 });
    [[20, "20 fL"], [35, "35 fL"]].forEach(function (s) {
      A.s("line", { x1: x0, y1: Y(s[0]), x2: x1, y2: Y(s[0]), stroke: C.jeu, "stroke-width": 2.5, "stroke-dasharray": "8 6" }, g);
      A.texte(g, s[1], [x1 - 34, Y(s[0]) - 14], { taille: 16, gras: 800, coul: C.jeu });
    });
    var n = { PLT: 0, bruit: 0, GR: 0 };
    for (var i = 0; i < passes; i++) {
      var vol = V[i], c = K.classeVolume(vol), x = x0 + 30 + i * 48;
      n[c]++;
      A.s("path", { d: "M" + (x - 14) + " " + y0 + " Q" + x + " " + (2 * Y(vol) - y0) + " " + (x + 14) + " " + y0, fill: "none", stroke: COUL[c], "stroke-width": 4 }, g);
    }
    zone.innerHTML = passes ? "Dernière cellule : " + V[passes - 1] + " fL, rangée en <strong>" + { PLT: "plaquette", bruit: "bruit (ignorée)", GR: "globule rouge" }[K.classeVolume(V[passes - 1])] + "</strong>. Comptées : " + n.GR + " GR, " + n.PLT + " plaquettes, " + n.bruit + " débris écartés." : "Aucune cellule n'est encore passée.";
  }
  dessiner();
})();
