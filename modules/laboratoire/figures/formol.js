/* Figure : vapeurs de formol à la table de macroscopie ; seuils VLEP 0,3 et 0,6 ppm, alarme à 0,5 ppm ; aspiration par le bas ou vers le haut. */
(function () {
  "use strict";
  var R = RM, A = LABO, C = A.C;

  var f = R.figure("fig-formol", {
    largeur: 960, hauteur: 540, titre: "Garder les vapeurs loin du visage",
    essai: "<strong>Essaie</strong> : monte la concentration, puis change le sens de l'aspiration. <strong>Observe</strong> : l'alarme sonne avant la limite des pics ; aspirées vers le haut, les vapeurs passent devant le visage."
  });
  var g = A.s("g", null, f.svg), basAsp = true;
  var cc = R.curseur(f.reglages, { nom: "Formol", min: 0, max: 1, pas: 0.05, val: 0.2, unite: " ppm", dec: 2 });
  var b = R.boutons(f.reglages), bt = R.bouton(b, "Aspirer vers le haut", function () { basAsp = !basAsp; bt.textContent = basAsp ? "Aspirer vers le haut" : "Aspirer par le bas"; dessiner(); });
  var zone = R.h("div", null, "", f.direct);
  function dessiner() {
    A.vider(g);
    var c = cc.v;
    // technicien, table, bac de formol
    A.s("circle", { cx: 150, cy: 150, r: 42, fill: "#fff", stroke: C.encre, "stroke-width": 5 }, g);
    A.s("path", { d: "M90 330 Q90 220 150 205 Q210 220 210 330", fill: "#fff", stroke: C.encre, "stroke-width": 5 }, g);
    A.s("line", { x1: 200, y1: 260, x2: 300, y2: 300, stroke: C.encre, "stroke-width": 8, "stroke-linecap": "round" }, g);
    A.s("rect", { x: 230, y: 320, width: 360, height: 26, rx: 6, fill: C.pale, stroke: C.encre, "stroke-width": 4 }, g);
    A.s("rect", { x: 300, y: 290, width: 160, height: 30, rx: 6, fill: C.froidPale, stroke: C.froid, "stroke-width": 3 }, g);
    A.texte(g, "bac de formol", [380, 372], { taille: 17, coul: C.doux });
    // grille d'aspiration
    if (basAsp) {
      A.s("rect", { x: 560, y: 220, width: 30, height: 100, rx: 4, fill: C.fond, stroke: C.encre, "stroke-width": 3 }, g);
      A.texte(g, "dosseret aspirant", [575, 196], { taille: 17, coul: C.doux });
      for (var i = 0; i < 4; i++) A.chemin(g, [[340 + i * 30, 284], [400 + i * 30, 270 - i * 6], [552, 270 + i * 10]], { coul: C.froid, ep: 3.5 });
    } else {
      A.s("path", { d: "M250 60 L520 60 L480 110 L290 110 Z", fill: C.fond, stroke: C.encre, "stroke-width": 3 }, g);
      A.texte(g, "hotte en hauteur", [385, 38], { taille: 17, coul: C.doux });
      for (var k = 0; k < 4; k++) A.chemin(g, [[330 + k * 35, 284], [250 + k * 25, 200], [300 + k * 40, 116]], { coul: C.ko, ep: 3.5 });
      A.texte(g, "devant le visage", [150, 70], { taille: 19, gras: 800, coul: C.ko });
    }
    // jauge verticale : 0 en bas, 1 ppm en haut, seuils à droite
    var yb = 470, yh = 130, Y = function (v) { return yb - (yb - yh) * v; }, xg = 700, col = c >= 0.6 ? C.ko : c >= 0.3 ? C.chaud : C.ok;
    A.texte(g, "au poste", [715, 70], { taille: 18, gras: 700 });
    A.texte(g, c.toFixed(2).replace(".", ",") + " ppm", [715, 104], { taille: 26, gras: 800, mono: true, coul: col });
    A.s("rect", { x: xg, y: yh, width: 30, height: yb - yh, rx: 15, fill: C.pale }, g);
    A.s("rect", { x: xg, y: Math.min(Y(c), yb - 30), width: 30, height: Math.max(30, yb - Y(c)), rx: 15, fill: col }, g);
    [[0.3, "0,3 ppm : VLEP 8 h"], [0.5, "0,5 ppm : alarme"], [0.6, "0,6 ppm : VLEP 15 min"]].forEach(function (m) {
      A.s("line", { x1: xg - 6, y1: Y(m[0]), x2: xg + 46, y2: Y(m[0]), stroke: C.encre, "stroke-width": 3 }, g);
      A.texte(g, m[1], [xg + 56, Y(m[0])], { taille: 16, gras: 700, ancre: "start" });
    });
    if (c >= 0.5) A.icone(g, "danger", [620, 130], 44, C.ko);
    var txt = c >= 0.6 ? "Au-dessus de la limite des pics (0,6 ppm sur 15 min) : on arrête et on ventile." :
      c >= 0.5 ? "Le détecteur de la table déclenche son alarme sonore et visuelle dès 0,5 ppm." :
      c > 0.3 ? "Au-dessus de la VLEP sur 8 h (0,3 ppm) : acceptable seulement pour un pic court." : "Sous la VLEP sur 8 h (0,3 ppm).";
    zone.innerHTML = txt + (basAsp ? " Captage par le bas ou par l'arrière : les vapeurs s'éloignent du visage." : " <strong>Aspiration vers le haut : à proscrire</strong>, elle fait passer les vapeurs devant les voies respiratoires.");
  }
  cc.surChange(dessiner);
  dessiner();
})();
