/* Figure : grille pondérée des offres A et B (TD 1) et sensibilité au poids de la sécurité.
   Notes du modèle de l'enseignant ; les quatre autres poids gardent leurs proportions 25 / 15 / 15 / 10. */
(function () {
  "use strict";
  var R = RM, A = SIS, C = A.C;
  var f = R.figure("fig-td1-offres", {
    largeur: 960, hauteur: 540, titre: "Grille pondérée : qui passe devant ?",
    essai: "<strong>Essaie</strong> : augmente le poids de la sécurité. <strong>Observe</strong> : sous environ 28 %, B passe devant ; au-dessus, A mène, mais elle reste écartée faute de mode dégradé."
  });
  var g = A.s("g", null, f.svg);
  var cs = R.curseur(f.reglages, { nom: "Poids sécurité (%)", min: 10, max: 80, pas: 5, val: 35 });
  var CRIT = ["Sécurité", "Intégration et cyber", "Coût sur 7 ans", "Maintenance", "Ergonomie"];
  var NA = [5, 3, 2, 4, 3], NB = [3, 4, 4, 3, 4], REF = [25, 15, 15, 10];
  function poids(ws) { var reste = 100 - ws; return [ws].concat(REF.map(function (w) { return w * reste / 65; })); }
  function fmt(v) { return v.toFixed(2).replace(".", ","); }
  function dessiner() {
    A.vider(g);
    var w = poids(cs.v), tA = A.calc.totalPondere(w, NA), tB = A.calc.totalPondere(w, NB);
    var lignes = [["Critère", "Poids", "A", "B"]].concat(CRIT.map(function (c, i) { return [c, String(Math.round(w[i])), String(NA[i]), String(NB[i])]; }));
    A.tableau(g, 30, 30, [250, 90, 70, 70], 52, lignes, { taille: 17, gauche: true, style: function (i) { return i === 1 ? { gras: 700 } : null; } });
    A.texte(g, "notes du modèle de l'enseignant", [270, 360], { taille: 14, coul: C.doux, gras: 500 });
    // barres des totaux, sur 5
    var X0 = 600, H = 300, Yb = 380;
    [["A", tA, C.v], ["B", tB, C.turq]].forEach(function (t, k) {
      var bx = X0 + k * 160, h = H * t[1] / 5, tete = (k === 0 ? tA > tB : tB > tA);
      A.s("rect", { x: bx, y: Yb - h, width: 100, height: h, rx: 10, fill: t[2], opacity: tete ? 1 : 0.45 }, g);
      A.texte(g, fmt(t[1]), [bx + 50, Yb - h - 24], { taille: 24, mono: true, gras: 700 });
      A.texte(g, "Offre " + t[0], [bx + 50, Yb + 28], { taille: 19, gras: 800, coul: t[2] });
    });
    A.s("line", { x1: X0 - 20, y1: Yb, x2: X0 + 280, y2: Yb, stroke: C.encre, "stroke-width": 2.5 }, g);
    var tete = Math.abs(tA - tB) < 0.005 ? "Égalité" : (tA > tB ? "A" : "B") + " devant, écart " + fmt(Math.abs(tA - tB));
    A.texte(g, tete, [X0 + 130, Yb + 80], { taille: 20, gras: 800 });
    R.rendre(f.direct, "\\text{Total} = \\frac{\\sum(\\text{poids} \\times \\text{note})}{100} : \\quad A = " + fmt(tA).replace(",", "{,}") + ", \\quad B = " + fmt(tB).replace(",", "{,}"));
  }
  cs.surChange(dessiner);
  dessiner();
})();
