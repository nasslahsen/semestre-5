(function () {
  "use strict";
  var R = RM, C = R.C;
  function T(g, s, p, o) { o = o || {}; o.italique = false; return R.texte(g, s, p, o); }

  /* ---------- Un comblement osseux qui se résorbe ---------- */
  (function () {
    var f = R.figure("fig-resorption", {
      largeur: 960, hauteur: 480, titre: "Comblement d'un défaut osseux par une céramique poreuse résorbable (allure)",
      essai: "<strong>Essaie</strong> : fais passer les semaines, avec une céramique dense puis poreuse. <strong>Observe</strong> : l'os entre par les pores et remplace la céramique au fur et à mesure. Allure qualitative."
    });
    var g = R.el("g", null, f.svg), zone = R.h("div", null, "", f.direct);
    var cT = R.curseur(f.reglages, { nom: "Semaines", min: 0, max: 12, pas: 1, val: 3, surChange: dessin });
    var poreux = R.bascule(f.reglages, "Céramique poreuse", true, dessin);
    function dessin() {
      R.vider(g);
      var t = cT.v / 12, por = poreux.checked, v = por ? t : t * 0.5;
      R.el("rect", { x: 80, y: 60, width: 560, height: 380, rx: 36, fill: "#f4ead8", stroke: "#cbb893", "stroke-width": 3 }, g);
      T(g, "os du patient", [360, 90], { taille: 18, couleur: "#8a6d3b", gras: true });
      // le défaut, rempli de grains de céramique ; l'os avance depuis les bords
      var x0 = 180, y0 = 130, W = 360, H = 260;
      R.el("rect", { x: x0, y: y0, width: W, height: H, rx: 20, fill: "#fff", stroke: "#cbb893", "stroke-width": 2, "stroke-dasharray": "6 5" }, g);
      var nc = 0, no = 0;
      for (var i = 0; i < 12; i++) for (var j = 0; j < 8; j++) {
        var cx = x0 + 18 + i * 29, cy = y0 + 18 + j * 32;
        // distance au bord, normalisée : l'os avance depuis la périphérie
        var bord = Math.min(i, 11 - i, j, 7 - j) / 3.5;
        if (bord < v * 1.15) { R.el("circle", { cx: cx, cy: cy, r: 13, fill: "#d9c39a" }, g); no++; }
        else { R.el("circle", { cx: cx, cy: cy, r: por ? 10 : 14, fill: C.acc, opacity: 0.85 }, g); nc++; }
      }
      // barres : céramique et os
      var tot = nc + no;
      R.el("rect", { x: 700, y: 120, width: 60, height: 260, rx: 10, fill: "#fff", stroke: C.fonce, "stroke-width": 2.5 }, g);
      R.el("rect", { x: 700, y: 380 - 260 * nc / tot, width: 60, height: 260 * nc / tot, rx: 10, fill: C.acc }, g);
      R.el("rect", { x: 810, y: 120, width: 60, height: 260, rx: 10, fill: "#fff", stroke: C.fonce, "stroke-width": 2.5 }, g);
      R.el("rect", { x: 810, y: 380 - 260 * no / tot, width: 60, height: 260 * no / tot, rx: 10, fill: "#d9c39a" }, g);
      T(g, "céramique", [730, 410], { taille: 17, gras: true });
      T(g, "os neuf", [840, 410], { taille: 17, gras: true });
      zone.innerHTML = (por ? "Céramique poreuse : " : "Céramique dense : ") + Math.round(100 * no / tot) + " % du défaut occupé par de l'os neuf après " + cT.v + " semaine" + (cT.v > 1 ? "s" : "") + ".";
    }
    dessin();
  })();
})();
