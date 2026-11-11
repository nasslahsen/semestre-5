(function () {
  "use strict";
  var R = RM, C = R.C;
  function T(g, s, p, o) { o = o || {}; o.italique = false; return R.texte(g, s, p, o); }

  /* ---------- 302, 316, 316L : ce qui change ---------- */
  (function () {
    var f = R.figure("fig-nuances", {
      largeur: 960, hauteur: 480, titre: "Composition des aciers inoxydables d'implant (en % massique)",
      essai: "<strong>Essaie</strong> : passe d'une nuance à l'autre. <strong>Observe</strong> : le molybdène arrive avec le 316, le carbone baisse avec le 316L ; le chrome reste au-dessus du seuil de 11 %."
    });
    var g = R.el("g", null, f.svg), zone = R.h("div", null, "", f.direct), k = 2;
    var N = [
      { n: "18-8 (302)", v: { Cr: 18, Ni: 8, Mo: 0, C: 0.08 }, d: "Le premier inox des implants : 18 % de chrome, 8 % de nickel." },
      { n: "316", v: { Cr: 17.25, Ni: 11.75, Mo: 2.25, C: 0.08 }, d: "Un peu de molybdène : meilleure résistance à la corrosion en milieu salé." },
      { n: "316L", v: { Cr: 17.25, Ni: 11.75, Mo: 2.25, C: 0.03 }, d: "1950 : carbone ramené à 0,03 % au plus. Meilleure tenue en milieu salé, moins d'hypersensibilité." }
    ];
    var b = R.boutons(f.reglages);
    N.forEach(function (x, i) { R.bouton(b, x.n, function () { k = i; dessin(); }); });
    function dessin() {
      R.vider(g);
      var v = N[k].v, O = [120, 400], H = 300, max = 20;
      R.fleche(g, O, [O[0], O[1] - H - 30], { couleur: C.fonce, epaisseur: 2.5 });
      R.ligne(g, O, [O[0] + 560, O[1]], { couleur: C.fonce, epaisseur: 2.5 });
      [0, 5, 10, 15, 20].forEach(function (q) { var y = O[1] - q / max * H; R.ligne(g, [O[0] - 8, y], [O[0], y], { couleur: C.fonce, epaisseur: 2 }); T(g, q + " %", [O[0] - 40, y], { taille: 16, couleur: C.doux }); });
      var yS = O[1] - 11 / max * H;
      R.ligne(g, [O[0], yS], [O[0] + 560, yS], { couleur: "#12a26b", epaisseur: 3, tirets: "8 6" });
      T(g, "seuil du chrome : 11 %", [O[0] + 440, yS - 18], { taille: 16, couleur: "#12a26b", gras: true });
      ["Cr", "Ni", "Mo"].forEach(function (e, i) {
        var x = O[0] + 60 + i * 160, h = v[e] / max * H;
        R.el("rect", { x: x, y: O[1] - h, width: 90, height: h, rx: 8, fill: e === "Cr" ? C.acc : e === "Ni" ? "#8e97a6" : "#3b5bdb" }, g);
        T(g, e, [x + 45, O[1] + 26], { taille: 20, gras: true });
        T(g, R.fmt(v[e], 2).replace(/,?0+$/, "") + " %", [x + 45, O[1] - h - 18], { taille: 17, gras: true });
      });
      // carbone : jauge à part, à une autre échelle
      R.el("rect", { x: 760, y: 100, width: 60, height: 300, rx: 10, fill: "#fff", stroke: C.fonce, "stroke-width": 2.5 }, g);
      var hc = v.C / 0.1 * 300;
      R.el("rect", { x: 760, y: 400 - hc, width: 60, height: hc, rx: 10, fill: "#5b6172" }, g);
      T(g, "carbone", [790, 426], { taille: 18, gras: true });
      T(g, R.fmt(v.C, 2) + " %", [880, 400 - hc], { taille: 17, gras: true });
      T(g, "0,1 %", [880, 100], { taille: 15, couleur: C.doux });
      T(g, N[k].n, [480, 50], { taille: 26, gras: true, couleur: C.acc });
      zone.innerHTML = "<strong>" + N[k].n + "</strong> : " + N[k].d + (k ? " Valeurs au milieu des fourchettes du 316L pour Cr, Ni et Mo." : "");
    }
    dessin();
  })();
})();
