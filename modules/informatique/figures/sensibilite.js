/* Figure : analyse de sensibilité. On déplace des points de la sécurité vers le coût (intégration 25, maintenance 15, ergonomie 10 fixes) :
   les totaux des offres A et B se croisent (S5, diapos 13 et 14). */
(function () {
  "use strict";
  var R = RM, A = SIS, C = A.C;
  var NA = [5, 3, 2, 4, 3], NB = [3, 4, 4, 3, 4];
  var f = R.figure("fig-sensibilite", { largeur: 960, hauteur: 440, titre: "La pondération change le classement",
    essai: "<strong>Essaie</strong> : déplace le poids du coût. <strong>Observe</strong> : à 20 %, les deux offres sont à égalité ; au-delà, B passe devant." });
  var g = A.s("g", null, f.svg);
  var cc = R.curseur(f.reglages, { nom: "Poids du coût", min: 15, max: 25, pas: 1, val: 15, unite: " %", surChange: dessiner });
  function dessiner() {
    A.vider(g);
    var c = cc.v, w = [50 - c, 25, c, 15, 10], ta = A.calc.totalPondere(w, NA), tb = A.calc.totalPondere(w, NB);
    var noms = ["Sécurité", "Intégration", "Coût", "Maintenance", "Ergonomie"];
    noms.forEach(function (nm, k) {
      var y = 40 + k * 58;
      A.texte(g, nm, [110, y + 20], { taille: 17, gras: 600 });
      A.s("rect", { x: 200, y: y, width: w[k] * 6, height: 40, rx: 6, fill: k === 0 || k === 2 ? C.jeu : C.pale, stroke: C.encre, "stroke-width": 1.5 }, g);
      A.texte(g, w[k] + " %", [200 + w[k] * 6 + 34, y + 20], { taille: 16, mono: true });
    });
    var base = 380, ech = 70;
    [["A", ta, C.acc], ["B", tb, C.v]].forEach(function (o, i) {
      var x = 640 + i * 150, hh = o[1] * ech;
      A.s("rect", { x: x, y: base - hh, width: 100, height: hh, rx: 8, fill: o[2] }, g);
      A.texte(g, R.fmt(o[1], 2), [x + 50, base - hh - 20], { taille: 22, mono: true, gras: 700 });
      A.texte(g, "Offre " + o[0], [x + 50, base + 24], { taille: 18, gras: 700 });
    });
    A.s("line", { x1: 620, y1: base, x2: 920, y2: base, stroke: C.encre, "stroke-width": 2 }, g);
    var res = Math.abs(ta - tb) < 1e-9 ? "égalité" : ta > tb ? "A en tête" : "B en tête";
    f.direct.innerHTML = "Poids " + w.join(" / ") + " : total A = " + R.fmt(ta, 2) + ", total B = " + R.fmt(tb, 2) + ", <strong>" + res + "</strong>.";
  }
  dessiner();
})();
