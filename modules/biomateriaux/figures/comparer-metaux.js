(function () {
  "use strict";
  var R = RM, C = R.C;
  function T(g, s, p, o) { o = o || {}; o.italique = false; return R.texte(g, s, p, o); }

  /* ---------- Les métaux côte à côte ---------- */
  (function () {
    var f = R.figure("fig-comparer", {
      largeur: 960, hauteur: 500, titre: "Les métaux d'implant côte à côte (valeurs du cours)",
      essai: "<strong>Essaie</strong> : choisis la grandeur à comparer. <strong>Observe</strong> : le titane est le plus proche de l'os et le plus léger ; le tantale massif est très lourd ; la zircone use le moins le polyéthylène."
    });
    var g = R.el("g", null, f.svg), zone = R.h("div", null, "", f.direct), k = 0;
    var G = [
      { n: "Module (GPa)", max: 250, ref: ["os", 20], L: [["Nitinol", 48], ["Ti-Cp", 100], ["Ti-6Al-4V", 110], ["Tantale", 190], ["316L", 200], ["Co-Cr-Mo", 230]], d: "Le Nitinol (au moins 48 GPa) et le titane sont les plus proches de l'os (20 GPa)." },
      { n: "Densité (g/cm³)", max: 18, L: [["Ti-6Al-4V", 4.4], ["Ti-Cp", 4.5], ["Nitinol", 6.5], ["316L", 7.9], ["Co-Cr-Mo", 8.3], ["Tantale", 16.6]], d: "Le titane est près de deux fois plus léger que l'inox ; le tantale massif est le plus lourd." },
      { n: "Pénétration du PEhd (mm/an)", max: 0.2, L: [["zircone", 0.05], ["alumine", 0.1], ["inox", 0.15], ["CoCr", 0.15]], d: "Contre un polyéthylène haute densité, la tête en zircone pénètre le moins : 0,05 mm/an." }
    ];
    var b = R.boutons(f.reglages);
    G.forEach(function (x, i) { R.bouton(b, x.n.split(" (")[0], function () { k = i; dessin(); }); });
    function dessin() {
      R.vider(g);
      var x = G[k], X0 = 230, W = 640, n = x.L.length, pas = Math.min(64, 360 / n);
      T(g, x.n, [X0 + W / 2, 50], { taille: 22, gras: true, couleur: C.acc });
      R.ligne(g, [X0, 80], [X0, 90 + n * pas], { couleur: C.fonce, epaisseur: 2.5 });
      x.L.forEach(function (l, i) {
        var y = 96 + i * pas, w = l[1] / x.max * W;
        T(g, l[0], [X0 - 14, y + pas * 0.38], { taille: 19, ancre: "end", gras: true });
        R.el("rect", { x: X0, y: y, width: w, height: pas * 0.76, rx: 8, fill: /Ti/.test(l[0]) ? C.acc : "#8e97a6" }, g);
        T(g, R.fmt(l[1], l[1] < 1 ? 2 : l[1] % 1 ? 1 : 0), [X0 + w + 12, y + pas * 0.38], { taille: 18, ancre: "start", gras: true });
      });
      if (x.ref) {
        var xr = X0 + x.ref[1] / x.max * W;
        R.ligne(g, [xr, 80], [xr, 100 + n * pas], { couleur: "#b89b6a", epaisseur: 4, tirets: "8 6" });
        T(g, x.ref[0] + " (" + x.ref[1] + ")", [xr, 120 + n * pas], { taille: 18, gras: true, couleur: "#8a6d3b" });
      }
      zone.innerHTML = x.d;
    }
    dessin();
  })();
})();
