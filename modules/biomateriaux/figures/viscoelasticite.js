(function () {
  "use strict";
  var R = RM, C = R.C;
  function T(g, s, p, o) { o = o || {}; o.italique = false; return R.texte(g, s, p, o); }

  /* ---------- Ressort et amortisseur sous une contrainte constante ---------- */
  (function () {
    var f = R.figure("fig-modeles", {
      largeur: 960, hauteur: 480, titre: "Ressort et amortisseur : une contrainte constante appliquée de 0 à 6 s, puis retirée",
      essai: "<strong>Essaie</strong> : choisis un modèle et fais avancer le temps. <strong>Observe</strong> : le ressort se déforme tout de suite et revient ; l'amortisseur se déforme peu à peu et garde sa déformation."
    });
    var g = R.el("g", null, f.svg), zone = R.h("div", null, "", f.direct), mod = 0;
    var b = R.boutons(f.reglages);
    R.bouton(b, "Ressort", function () { mod = 0; dessin(); });
    R.bouton(b, "Amortisseur", function () { mod = 1; dessin(); });
    var cT = R.curseur(f.reglages, { nom: "Temps", min: 0, max: 10, pas: 0.5, val: 3, dec: 1, unite: " s", surChange: dessin });
    // déformation (unités arbitraires) : ressort ε = σ/E pendant la charge ; amortisseur ε = σ t / η, gardée après
    function eps(m, t) { return m === 0 ? (t > 0 && t <= 6 ? 0.6 : 0) : Math.min(t, 6) / 6; }
    function dessin() {
      R.vider(g);
      var t = cT.v, e = eps(mod, t), charge = t > 0 && t <= 6;
      // le modèle dessiné, qui s'allonge
      var x = 150, y0 = 80, L = 200 + 120 * e;
      R.ligne(g, [x - 60, y0], [x + 60, y0], { couleur: C.fonce, epaisseur: 6 });
      if (mod === 0) {
        var pts = [[x, y0], [x, y0 + 30]], n = 10;
        for (var i = 1; i <= n; i++) pts.push([x + (i % 2 ? 28 : -28), y0 + 30 + i * (L - 60) / (n + 1)]);
        pts.push([x, y0 + L - 30], [x, y0 + L]);
        R.el("polyline", { points: pts.map(function (p) { return p.join(","); }).join(" "), fill: "none", stroke: C.acc, "stroke-width": 5, "stroke-linejoin": "round" }, g);
      } else {
        R.ligne(g, [x, y0], [x, y0 + 60], { couleur: C.fonce, epaisseur: 4 });
        R.el("path", { d: "M" + (x - 34) + " " + (y0 + 60) + " L" + (x - 34) + " " + (y0 + 200) + " L" + (x + 34) + " " + (y0 + 200) + " L" + (x + 34) + " " + (y0 + 60), fill: PLATEFORME.teinte(0.2), stroke: C.fonce, "stroke-width": 4 }, g);
        R.ligne(g, [x - 26, y0 + 70 + 100 * e], [x + 26, y0 + 70 + 100 * e], { couleur: C.acc, epaisseur: 8 });
        R.ligne(g, [x, y0 + 70 + 100 * e], [x, y0 + L], { couleur: C.acc, epaisseur: 5 });
      }
      R.el("rect", { x: x - 30, y: y0 + L, width: 60, height: 24, rx: 6, fill: "#5b6172" }, g);
      if (charge) { R.fleche(g, [x, y0 + L + 30], [x, y0 + L + 80], { couleur: "#e5484d", epaisseur: 6, tete: 20 }); T(g, "σ", [x + 30, y0 + L + 60], { taille: 22, gras: true, couleur: "#e5484d" }); }
      T(g, mod ? "amortisseur" : "ressort", [x, 40], { taille: 20, gras: true });
      // courbe ε(t)
      var X0 = 400, W = 500, Y0 = 400, H = 280, X = function (u) { return X0 + u / 10 * W; }, Y = function (v) { return Y0 - v * H; };
      R.fleche(g, [X0, Y0], [X0 + W + 25, Y0], { couleur: C.fonce, epaisseur: 2.5 }); R.fleche(g, [X0, Y0], [X0, Y0 - H - 30], { couleur: C.fonce, epaisseur: 2.5 });
      T(g, "ε", [X0 - 22, Y0 - H - 20], { taille: 22, gras: true }); T(g, "t (s)", [X0 + W + 10, Y0 - 24], { taille: 17 });
      [0, 6, 10].forEach(function (u) { R.ligne(g, [X(u), Y0], [X(u), Y0 + 8], { couleur: C.fonce, epaisseur: 2 }); T(g, String(u), [X(u), Y0 + 26], { taille: 16, couleur: C.doux }); });
      R.el("rect", { x: X(0), y: Y0 - H - 10, width: X(6) - X(0), height: H + 10, fill: "#fde8e8", opacity: 0.5 }, g);
      T(g, "contrainte appliquée", [X(3), Y0 - H - 20], { taille: 16, couleur: "#e5484d" });
      var pts2 = [];
      for (var u = 0; u <= t + 1e-9; u += 0.05) pts2.push(X(u).toFixed(1) + "," + Y(eps(mod, u)).toFixed(1));
      R.el("polyline", { points: pts2.join(" "), fill: "none", stroke: C.acc, "stroke-width": 5, "stroke-linejoin": "round" }, g);
      zone.innerHTML = mod === 0
        ? "Ressort, loi de Hooke \\(\\sigma = E\\,\\varepsilon\\) : la déformation suit la contrainte, tout de suite, et disparaît quand elle cesse (élastique)."
        : "Amortisseur, loi de Newton \\(\\sigma = \\eta\\,d\\varepsilon/dt\\) : sous contrainte constante, la déformation croît à vitesse constante, et reste quand la contrainte cesse (visqueux).";
      if (window.renderMathInElement) window.renderMathInElement(zone, { delimiters: [{ left: "\\(", right: "\\)", display: false }], throwOnError: false });
    }
    dessin();
  })();
})();
