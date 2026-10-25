/* Figure : objet, image intermédiaire et image finale ; le grossissement total selon l'objectif choisi. */
(function () {
  "use strict";
  var R = RM, A = LABO, C = A.C, K = A.calc;

  var f = R.figure("fig-microscope-optique", {
    largeur: 960, hauteur: 540, titre: "Deux lentilles : objectif puis oculaire",
    essai: "<strong>Essaie</strong> : change d'objectif. <strong>Observe</strong> : l'objectif fait une image réelle renversée dans le tube, l'oculaire la grossit encore ; les grossissements se multiplient."
  });
  var g = A.s("g", null, f.svg), obj = 10, OC = 10;
  var b = R.boutons(f.reglages), bts = [4, 10, 40, 100].map(function (o) { return R.bouton(b, o + "×", function () { obj = o; dessiner(); }); });
  var zone = R.h("div", null, "", f.direct);
  function lentille(x, h, t) {
    A.s("ellipse", { cx: x, cy: 260, rx: 22, ry: h, fill: C.froidPale, stroke: C.froid, "stroke-width": 4 }, g);
    A.texte(g, t, [x, 260 + h + 32], { taille: 22, gras: 800, coul: C.froid });
  }
  function fleche(x, h, coul, pointille) {
    A.s("line", { x1: x, y1: 260, x2: x, y2: 260 - h, stroke: coul, "stroke-width": 6, "stroke-dasharray": pointille ? "10 7" : null }, g);
    var s = h > 0 ? 1 : -1;
    A.s("polygon", { points: [x, 260 - h - s * 4, x - 12, 260 - h + s * 16, x + 12, 260 - h + s * 16].join(","), fill: coul }, g);
  }
  function dessiner() {
    bts.forEach(function (bt, i) { bt.classList.toggle("actif", [4, 10, 40, 100][i] === obj); });
    A.vider(g);
    A.s("line", { x1: 20, y1: 260, x2: 940, y2: 260, stroke: C.trait, "stroke-width": 2 }, g);
    var h1 = Math.min(170, 30 + 14 * Math.sqrt(obj)), h2 = 230;
    fleche(60, 40, C.encre); A.texte(g, "objet", [60, 300], { taille: 20, gras: 800 });
    lentille(190, 140, "objectif");
    fleche(430, -h1, C.jeu); A.texte(g, "image réelle, renversée", [430, 260 + h1 + 36], { taille: 20, gras: 800, coul: C.jeu });
    lentille(650, 160, "oculaire");
    fleche(870, -h2, C.v, true); A.texte(g, "image virtuelle", [850, 528], { taille: 20, gras: 800, coul: C.v });
    A.texte(g, "× " + obj, [310, 70], { taille: 30, gras: 800, coul: C.jeu });
    A.texte(g, "× " + OC, [760, 70], { taille: 30, gras: 800, coul: C.v });
    zone.innerHTML = "Objectif " + obj + "× et oculaire " + OC + "× : grossissement total " + obj + " × " + OC + " = <strong>" + K.grossissement(obj, OC) + "</strong>" + (obj === 100 ? " (objectif à immersion, avec de l'huile)." : ".");
  }
  dessiner();
})();
