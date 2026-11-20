/* Figure : criticité d'un mode de défaillance, C = G × O × D (AMDEC du TD 1), avec le seuil de priorité 100. */
(function () {
  "use strict";
  var R = RM, A = SIS, C = A.C;
  var f = R.figure("fig-td1-amdec", {
    largeur: 960, hauteur: 540, titre: "Criticité = gravité × occurrence × détectabilité",
    essai: "<strong>Essaie</strong> : règle les trois notes d'une défaillance. <strong>Observe</strong> : une erreur grave et fréquente peut rester sous le seuil si on la détecte presque toujours ; une erreur invisible monte vite."
  });
  var g = A.s("g", null, f.svg);
  var cg = R.curseur(f.reglages, { nom: "Gravité G", min: 1, max: 10, pas: 1, val: 9 });
  var co = R.curseur(f.reglages, { nom: "Occurrence O", min: 1, max: 10, pas: 1, val: 4 });
  var cd = R.curseur(f.reglages, { nom: "Détectabilité D", min: 1, max: 10, pas: 1, val: 2 });
  var X0 = 70, L = 820, Y = 400, MAX = 1000;
  function x(v) { return X0 + L * Math.min(v, MAX) / MAX; }
  function dessiner() {
    A.vider(g);
    var G = cg.v, O = co.v, D = cd.v, c = A.calc.criticite(G, O, D), prio = c >= 100;
    var notes = [["G", G, "gravité"], ["O", O, "occurrence"], ["D", D, "détectabilité"]];
    notes.forEach(function (t, k) {
      var bx = 60 + k * 200;
      A.boite(g, bx, 60, 140, 140, { titre: String(t[1]), taille: 56, mono: true, fond: "#fff", bord: C.encre });
      A.texte(g, t[0] + " : " + t[2], [bx + 70, 225], { taille: 17, coul: C.doux, gras: 600 });
      A.texte(g, k < 2 ? "×" : "=", [bx + 170, 130], { taille: 44, gras: 700 });
    });
    A.boite(g, 660, 60, 240, 140, { titre: String(c), taille: 60, mono: true, fond: prio ? C.koPale : C.okPale, bord: prio ? C.ko : C.ok, ep: 4 });
    A.texte(g, prio ? "C ≥ 100 : prioritaire" : "C < 100 : sous le seuil", [780, 225], { taille: 18, gras: 700, coul: prio ? C.ko : C.ok });
    // jauge de 0 à 1000
    A.s("rect", { x: X0, y: Y - 18, width: L, height: 36, rx: 18, fill: C.pale }, g);
    A.s("rect", { x: X0, y: Y - 18, width: Math.max(36, x(c) - X0), height: 36, rx: 18, fill: prio ? C.ko : C.ok, opacity: 0.85 }, g);
    A.s("line", { x1: x(100), y1: Y - 40, x2: x(100), y2: Y + 40, stroke: C.encre, "stroke-width": 3, "stroke-dasharray": "8 6" }, g);
    A.texte(g, "seuil 100", [x(100), Y - 56], { taille: 16, gras: 700 });
    [0, 250, 500, 750, 1000].forEach(function (v) { A.texte(g, String(v), [x(v), Y + 62], { taille: 15, coul: C.doux, mono: true, gras: 500 }); });
    A.texte(g, "Criticité (1000 au maximum)", [X0 + L / 2, Y + 100], { taille: 16, coul: C.doux, gras: 600 });
    R.rendre(f.direct, "C = " + G + " \\times " + O + " \\times " + D + " = " + c);
  }
  cg.surChange(dessiner); co.surChange(dessiner); cd.surChange(dessiner);
  dessiner();
})();
