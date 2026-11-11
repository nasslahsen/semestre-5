(function () {
  "use strict";
  var R = RM, C = R.C;
  function T(g, s, p, o) { o = o || {}; o.italique = false; return R.texte(g, s, p, o); }

  /* ---------- Les quatre pièces d'une prothèse totale de hanche ---------- */
  (function () {
    var f = R.figure("fig-pth", {
      largeur: 960, hauteur: 540, titre: "Prothèse totale de hanche : les quatre pièces",
      essai: "<strong>Essaie</strong> : écarte les pièces, puis touche-en une. <strong>Observe</strong> : son rôle et les matériaux possibles."
    });
    var g = R.el("g", null, f.svg), zone = R.h("div", null, "", f.direct), k = 2;
    var cX = R.curseur(f.reglages, { nom: "Écarter", min: 0, max: 100, pas: 5, val: 60, unite: " %", surChange: dessin });
    var P = [
      { n: "cupule", d: "La cupule métallique est impactée dans l'os du bassin.", m: "métal" },
      { n: "insert", d: "L'insert est posé dans la cupule ; la tête frotte contre lui.", m: "métal, céramique ou polyéthylène" },
      { n: "tête", d: "La tête est placée sur la tige ; elle frotte contre l'insert.", m: "céramique (alumine, zircone) ou métal" },
      { n: "tige", d: "La tige est placée dans le canal fémoral.", m: "métal" }
    ];
    function dessin() {
      R.vider(g);
      var e = cX.v / 100, cx = 330, cy = 210, dy = [-150 * e, -80 * e, 0, 60 * e];
      function anneau(r1, r2, y) {
        var Pt = function (r, a) { return (cx + r * Math.cos(a)).toFixed(1) + " " + (y - r * Math.sin(a)).toFixed(1); };
        return "M" + Pt(r2, 0) + " A" + r2 + " " + r2 + " 0 0 0 " + Pt(r2, Math.PI) + " L" + Pt(r1, Math.PI) + " A" + r1 + " " + r1 + " 0 0 1 " + Pt(r1, 0) + " Z";
      }
      var piece = [
        function (b) { R.el("path", { d: anneau(78, 96, cy + dy[0]), fill: k === 0 ? C.acc : "#a9b0bc", stroke: C.fonce, "stroke-width": 3 }, b); },
        function (b) { R.el("path", { d: anneau(58, 78, cy + dy[1]), fill: k === 1 ? C.acc : "#f2f2f2", stroke: C.fonce, "stroke-width": 3 }, b); },
        function (b) { R.el("circle", { cx: cx, cy: cy + dy[2], r: 56, fill: k === 2 ? C.acc : "#efe3cc", stroke: C.fonce, "stroke-width": 3 }, b); },
        function (b) { var y = cy + dy[3]; R.el("path", { d: "M" + (cx - 12) + " " + (y + 40) + " L" + (cx + 12) + " " + (y + 40) + " L" + (cx + 30) + " " + (y + 120) + " Q" + (cx + 10) + " " + (y + 200) + " " + (cx + 10) + " " + (y + 300) + " L" + (cx - 20) + " " + (y + 300) + " Q" + (cx - 24) + " " + (y + 190) + " " + (cx - 40) + " " + (y + 120) + " Z", fill: k === 3 ? C.acc : "#c3c8d2", stroke: C.fonce, "stroke-width": 3 }, b); }
      ];
      [3, 2, 1, 0].forEach(function (i) {
        var b = R.el("g", { style: "cursor:pointer" }, g);
        piece[i](b);
        b.addEventListener("click", function () { k = i; dessin(); });
      });
      var lab = [[cy + dy[0] - 110, "cupule"], [cy + dy[1] - 50, "insert"], [cy + dy[2], "tête"], [cy + dy[3] + 220, "tige"]];
      if (e > 0.3) lab.forEach(function (l, i) { T(g, l[1], [cx - 150, l[0]], { taille: 18, gras: i === k, ancre: "end" }); R.ligne(g, [cx - 140, l[0]], [cx - 70, l[0]], { couleur: C.doux, epaisseur: 1.5 }); });
      var p = P[k];
      R.el("rect", { x: 560, y: 120, width: 370, height: 90, rx: 18, fill: PLATEFORME.teinte(0.15), stroke: C.acc, "stroke-width": 3 }, g);
      T(g, (k + 1) + ". " + p.n, [745, 165], { taille: 26, gras: true });
      T(g, "matériaux", [745, 260], { taille: 17, couleur: C.doux });
      p.m.split(" ou ").forEach(function (m, i, l) { T(g, m + (i < l.length - 1 ? " ou" : ""), [745, 295 + i * 32], { taille: 20, gras: true }); });
      zone.innerHTML = p.d;
    }
    dessin();
  })();

  /* ---------- Les trois mailles de la zircone ---------- */
  (function () {
    var f = R.figure("fig-mailles", {
      largeur: 960, hauteur: 420, titre: "Les trois structures cristallines de la zircone ZrO₂ (schéma)",
      essai: "<strong>Essaie</strong> : passe d'une maille à l'autre. <strong>Observe</strong> : la cubique a ses trois côtés égaux et droits, la tétragonale s'allonge dans un sens, la monoclinique penche. Schéma qualitatif."
    });
    var g = R.el("g", null, f.svg), zone = R.h("div", null, "", f.direct), k = 1;
    var M = [
      { n: "cubique", h: 1, s: 0, d: "Propriétés modestes." },
      { n: "tétragonale (quadratique)", h: 1.35, s: 0, d: "Propriétés satisfaisantes : c'est la phase stabilisée dans la zircone Y-TZP." },
      { n: "monoclinique", h: 1.15, s: 0.35, d: "Plus de cohésion des grains, plus dense." }
    ];
    var b = R.boutons(f.reglages);
    M.forEach(function (m, i) { R.bouton(b, m.n.split(" ")[0].charAt(0).toUpperCase() + m.n.split(" ")[0].slice(1), function () { k = i; dessin(); }); });
    function dessin() {
      R.vider(g);
      M.forEach(function (m, i) {
        var x0 = 110 + i * 290, y0 = 330, a = 130, h = a * m.h, sx = a * m.s, sel = i === k;
        var d = [[x0, y0], [x0 + a, y0], [x0 + a + sx, y0 - h], [x0 + sx, y0 - h]];
        var o = [40, -40];
        var back = d.map(function (p) { return [p[0] + o[0], p[1] + o[1]]; });
        R.el("polygon", { points: back.map(function (p) { return p.join(","); }).join(" "), fill: "none", stroke: sel ? C.acc : C.doux, "stroke-width": sel ? 3 : 2, "stroke-dasharray": "6 5" }, g);
        d.forEach(function (p, j) { R.ligne(g, p, back[j], { couleur: sel ? C.acc : C.doux, epaisseur: sel ? 3 : 2 }); });
        R.el("polygon", { points: d.map(function (p) { return p.join(","); }).join(" "), fill: sel ? PLATEFORME.teinte(0.15) : "none", stroke: sel ? C.acc : C.fonce, "stroke-width": sel ? 4 : 2.5 }, g);
        d.concat(back).forEach(function (p) { R.el("circle", { cx: p[0], cy: p[1], r: 9, fill: "#3b5bdb" }, g); });
        T(g, m.n.split(" ")[0], [x0 + 85, 380], { taille: 19, gras: sel });
      });
      zone.innerHTML = "<strong>" + M[k].n.charAt(0).toUpperCase() + M[k].n.slice(1) + "</strong> : " + M[k].d;
    }
    dessin();
  })();
})();
