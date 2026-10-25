/* Figure : une longueur d'onde, sa fréquence, son domaine (UV, visible, IR) et le type de transition qu'elle provoque. */
(function () {
  "use strict";
  var R = RM, A = LABO, C = A.C, K = A.calc;

  var f = R.figure("fig-lumiere", {
    largeur: 960, hauteur: 540, titre: "Longueur d'onde, fréquence et domaine",
    essai: "<strong>Essaie</strong> : fais glisser la longueur d'onde de l'UV à l'infrarouge. <strong>Observe</strong> : plus l'onde est courte, plus sa fréquence est grande ; seule la bande de 400 à 700 nm se voit."
  });
  var g = A.s("g", null, f.svg);
  var cu = R.curseur(f.reglages, { nom: "λ", min: 200, max: 1000, pas: 5, val: 550, unite: " nm", dec: 0 });
  var zone = R.h("div", null, "", f.direct);
  // couleur approchée d'une longueur d'onde visible
  function couleur(l) {
    var st = [[400, [130, 0, 200]], [440, [40, 60, 255]], [490, [0, 190, 230]], [530, [40, 200, 60]], [580, [240, 220, 0]], [620, [255, 120, 0]], [700, [220, 0, 0]]];
    if (l < 400 || l > 700) return null;
    for (var i = 0; i < st.length - 1; i++) if (l <= st[i + 1][0]) {
      var u = (l - st[i][0]) / (st[i + 1][0] - st[i][0]), a = st[i][1], b = st[i + 1][1];
      return "rgb(" + a.map(function (x, k) { return Math.round(x + u * (b[k] - x)); }).join(",") + ")";
    }
  }
  var x0 = 80, x1 = 880, X = function (l) { return x0 + (l - 200) / 800 * (x1 - x0); };
  function dessiner() {
    var l = cu.v, nu = 3e8 / (l * 1e-9), col = couleur(l), dom = l < 400 ? "ultraviolet" : l > 700 ? "infrarouge" : "visible";
    A.vider(g);
    // bande des domaines
    A.s("rect", { x: X(200), y: 300, width: X(400) - X(200), height: 60, fill: C.vPale, stroke: C.trait }, g);
    A.s("rect", { x: X(700), y: 300, width: X(1000) - X(700), height: 60, fill: C.koPale, stroke: C.trait }, g);
    for (var k = 400; k < 700; k += 5) A.s("rect", { x: X(k), y: 300, width: X(k + 5) - X(k) + 0.5, height: 60, fill: couleur(k + 2) }, g);
    A.texte(g, "UV", [X(300), 335], { taille: 22, gras: 800, coul: C.v });
    A.texte(g, "IR", [X(850), 335], { taille: 22, gras: 800, coul: C.ko });
    [200, 400, 700, 1000].forEach(function (q) { A.texte(g, q + " nm", [X(q), 392], { taille: 17, coul: C.doux, gras: 600 }); });
    // onde dessinée : une période proportionnelle à λ
    var per = 40 + (l - 200) / 800 * 200, pts = [];
    for (var x = 80; x <= 880; x += 4) pts.push([x, 160 + 60 * Math.sin(2 * Math.PI * (x - 80) / per)]);
    A.s("polyline", { points: pts.map(function (p) { return p.join(","); }).join(" "), fill: "none", stroke: col || C.encre, "stroke-width": 5, "stroke-dasharray": col ? null : "10 8" }, g);
    A.fleche(g, [80, 250], [80 + per, 250], { coul: C.encre, ep: 3 }); A.fleche(g, [80 + per, 250], [80, 250], { coul: C.encre, ep: 3 });
    A.texte(g, "λ", [80 + per / 2, 276], { taille: 22, gras: 800 });
    // curseur sur la bande
    A.s("polygon", { points: [X(l), 296, X(l) - 12, 276, X(l) + 12, 276].join(","), fill: C.encre }, g);
    A.s("line", { x1: X(l), y1: 296, x2: X(l), y2: 364, stroke: C.encre, "stroke-width": 4 }, g);
    var tr = l < 400 || l <= 700 ? "transition électronique (UV-visible)" : "transition vibrationnelle (infrarouge)";
    A.texte(g, dom + " · " + tr, [480, 450], { taille: 24, gras: 800, coul: dom === "visible" ? C.encre : dom === "ultraviolet" ? C.v : C.ko });
    var e = Math.floor(Math.log10(nu)), m = nu / Math.pow(10, e);
    zone.innerHTML = "\\(\\nu = \\dfrac{C}{\\lambda} = \\dfrac{3 \\times 10^{8}}{" + l + " \\times 10^{-9}} \\approx " + R.fmt(m, 2) + " \\times 10^{" + e + "}\\ \\text{Hz}\\)";
    if (window.renderMathInElement) window.renderMathInElement(zone, { delimiters: [{ left: "\\(", right: "\\)", display: false }], throwOnError: false });
  }
  cu.surChange(dessiner);
  dessiner();
})();
