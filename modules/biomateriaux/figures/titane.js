(function () {
  "use strict";
  var R = RM, C = R.C;
  function T(g, s, p, o) { o = o || {}; o.italique = false; return R.texte(g, s, p, o); }

  /* ---------- Stress-shielding : qui porte la charge ? ---------- */
  (function () {
    var f = R.figure("fig-stress", {
      largeur: 960, hauteur: 520, titre: "Tige dans le fémur : partage de la charge (modèle ajouté)",
      essai: "<strong>Essaie</strong> : change le matériau de la tige, ou règle son module. <strong>Observe</strong> : plus la tige est rigide, moins l'os travaille ; l'os peu sollicité perd de sa densité. Modèle ajouté : même section, même allongement."
    });
    var g = R.el("g", null, f.svg), zone = R.h("div", null, "", f.direct);
    var cE = R.curseur(f.reglages, { nom: "E de la tige", min: 20, max: 240, pas: 5, val: 110, unite: " GPa", surChange: dessin });
    var b = R.boutons(f.reglages);
    [["Titane", 110], ["Inox", 210], ["CoCr", 230]].forEach(function (m) { R.bouton(b, m[0], function () { cE.set(m[1]); dessin(); }); });
    var Eos = 20;
    function dessin() {
      R.vider(g);
      var Et = cE.v, part = Eos / (Eos + Et);
      // fémur : l'os s'éclaircit quand il porte peu
      var dens = 0.35 + 0.65 * Math.min(1, part / 0.5);
      R.el("path", { d: "M170 70 Q230 40 290 70 L300 120 Q280 160 282 220 L290 470 L170 470 L178 220 Q180 160 160 120 Z", fill: "rgba(184,155,106," + dens.toFixed(2) + ")", stroke: "#8a6d3b", "stroke-width": 3 }, g);
      R.el("rect", { x: 212, y: 90, width: 36, height: 300, rx: 16, fill: "#c3c8d2", stroke: C.fonce, "stroke-width": 3 }, g);
      R.fleche(g, [230, 10], [230, 80], { couleur: C.fonce, epaisseur: 5, tete: 20 });
      T(g, "poids du corps", [330, 30], { taille: 17, ancre: "start" });
      T(g, "os", [150, 300], { taille: 19, gras: true, couleur: "#8a6d3b" });
      // barre de partage
      var X0 = 420, W = 480;
      T(g, "part de la charge", [X0 + W / 2, 130], { taille: 19, couleur: C.doux });
      R.el("rect", { x: X0, y: 160, width: W * part, height: 70, fill: "#b89b6a" }, g);
      R.el("rect", { x: X0 + W * part, y: 160, width: W * (1 - part), height: 70, fill: "#c3c8d2" }, g);
      R.el("rect", { x: X0, y: 160, width: W, height: 70, fill: "none", stroke: C.fonce, "stroke-width": 2.5 }, g);
      T(g, "os " + R.fmt(100 * part, 1) + " %", [X0, 260], { taille: 20, gras: true, ancre: "start", couleur: "#8a6d3b" });
      T(g, "tige " + R.fmt(100 * (1 - part), 1) + " %", [X0 + W, 260], { taille: 20, gras: true, ancre: "end" });
      // échelle des modules
      var y = 380, x = function (E) { return X0 + E / 240 * W; };
      R.ligne(g, [X0, y], [X0 + W, y], { couleur: C.fonce, epaisseur: 2.5 });
      [["os", 20], ["Ti", 110], ["inox", 210]].forEach(function (m) { R.ligne(g, [x(m[1]), y - 10], [x(m[1]), y + 10], { couleur: C.fonce, epaisseur: 2.5 }); T(g, m[0], [x(m[1]), y + 32], { taille: 17 }); });
      R.el("circle", { cx: x(Et), cy: y, r: 11, fill: C.acc, stroke: "#fff", "stroke-width": 3 }, g);
      T(g, "module E (GPa)", [X0 + W / 2, 460], { taille: 17, couleur: C.doux });
      R.rendre(zone, "\\dfrac{E_{os}}{E_{os} + E_{tige}} = \\dfrac{20}{20 + " + Et + "} \\approx " + R.fmt(100 * part, 1).replace(",", "{,}") + "\\ \\%");
    }
    dessin();
  })();
})();
