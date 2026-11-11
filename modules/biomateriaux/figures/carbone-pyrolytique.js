(function () {
  "use strict";
  var R = RM, C = R.C, B = window.BIO;
  function T(g, s, p, o) { o = o || {}; o.italique = false; return R.texte(g, s, p, o); }

  /* ---------- Module et rupture selon la densité ---------- */
  (function () {
    var f = R.figure("fig-pyro", {
      largeur: 960, hauteur: 480, titre: "Carbone pyrolytique : module et limite de rupture selon la densité (lecture des courbes du cours)",
      essai: "<strong>Essaie</strong> : change la densité du pyrocarbone. <strong>Observe</strong> : le module et la limite de rupture augmentent ensemble. Valeurs lues sur les courbes LTI Pyrolite du cours."
    });
    var g = R.el("g", null, f.svg), zone = R.h("div", null, "", f.direct);
    var cD = R.curseur(f.reglages, { nom: "Densité", min: 1.4, max: 1.85, pas: 0.05, val: 1.6, dec: 2, unite: " g/cm³", surChange: dessin });
    function graphe(x0, titre, fn, ymin, ymax, unite, d) {
      var W = 340, H = 280, y0 = 380;
      var X = function (v) { return x0 + (v - 1.4) / 0.45 * W; }, Y = function (v) { return y0 - (v - ymin) / (ymax - ymin) * H; };
      R.fleche(g, [x0, y0], [x0 + W + 25, y0], { couleur: C.fonce, epaisseur: 2.5 });
      R.fleche(g, [x0, y0], [x0, y0 - H - 25], { couleur: C.fonce, epaisseur: 2.5 });
      T(g, titre, [x0 + W / 2, 50], { taille: 20, gras: true });
      [1.4, 1.6, 1.8].forEach(function (v) { R.ligne(g, [X(v), y0], [X(v), y0 + 8], { couleur: C.fonce, epaisseur: 2 }); T(g, R.fmt(v, 1), [X(v), y0 + 28], { taille: 16, couleur: C.doux }); });
      [ymin, (ymin + ymax) / 2, ymax].forEach(function (v) { R.ligne(g, [x0 - 8, Y(v)], [x0, Y(v)], { couleur: C.fonce, epaisseur: 2 }); T(g, String(Math.round(v)), [x0 - 30, Y(v)], { taille: 16, couleur: C.doux }); });
      var pts = [];
      for (var v = 1.4; v <= 1.851; v += 0.01) pts.push(X(v).toFixed(1) + "," + Y(fn(v)).toFixed(1));
      R.el("polyline", { points: pts.join(" "), fill: "none", stroke: C.acc, "stroke-width": 5 }, g);
      var y = fn(d);
      R.ligne(g, [X(d), y0], [X(d), Y(y)], { couleur: C.doux, epaisseur: 2, tirets: "6 5" });
      R.ligne(g, [x0, Y(y)], [X(d), Y(y)], { couleur: C.doux, epaisseur: 2, tirets: "6 5" });
      R.el("circle", { cx: X(d), cy: Y(y), r: 10, fill: C.acc, stroke: "#fff", "stroke-width": 3 }, g);
      T(g, "densité (g/cm³)", [x0 + W / 2, y0 + 60], { taille: 16, couleur: C.doux });
      T(g, unite, [x0 + 10, y0 - H - 40], { taille: 16, couleur: C.doux, ancre: "start" });
      return y;
    }
    function dessin() {
      R.vider(g);
      var d = cD.v;
      var E = graphe(90, "module de Young", B.pyroModule, 16, 28, "GPa", d);
      var Rr = graphe(560, "limite de rupture", B.pyroRupture, 300, 600, "MPa", d);
      zone.innerHTML = "Densité " + R.fmt(d, 2) + " g/cm³ : module ≈ " + R.fmt(E, 0) + " GPa, rupture ≈ " + R.fmt(Rr, 0) + " MPa.";
    }
    dessin();
  })();
})();
