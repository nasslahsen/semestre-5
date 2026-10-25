/* Figure : plaque chauffante et barreau aimanté ; température et vitesse ; la plaque reste chaude après l'arrêt. */
(function () {
  "use strict";
  var R = RM, A = LABO, C = A.C;

  var f = R.figure("fig-agitateur", {
    largeur: 960, hauteur: 540, titre: "Chauffer et agiter",
    essai: "<strong>Essaie</strong> : règle la température et la vitesse, puis éteins la plaque. <strong>Observe</strong> : l'agitation s'arrête tout de suite, mais la surface reste chaude."
  });
  var g = A.s("g", null, f.svg), allume = true, reste = 0;
  var ct = R.curseur(f.reglages, { nom: "Température", min: 20, max: 500, pas: 10, val: 120, unite: " °C", dec: 0 });
  var cv = R.curseur(f.reglages, { nom: "Vitesse", min: 60, max: 1200, pas: 20, val: 400, unite: " tr/min", dec: 0 });
  var b = R.boutons(f.reglages), bt = R.bouton(b, "Éteindre", function () { allume = !allume; reste = allume ? 0 : ct.v; bt.textContent = allume ? "Éteindre" : "Allumer"; dessiner(); });
  var zone = R.h("div", null, "", f.direct);
  function dessiner() {
    A.vider(g);
    var T = allume ? ct.v : reste, v = allume ? cv.v : 0, chaud = (T - 20) / 480;
    // bécher et liquide, avec un tourbillon selon la vitesse
    A.s("path", { d: "M330 90 L330 360 Q330 380 350 380 L570 380 Q590 380 590 360 L590 90", fill: "none", stroke: C.encre, "stroke-width": 5 }, g);
    var creux = Math.min(90, v / 1200 * 90);
    A.s("path", { d: "M334 170 Q460 " + (170 + creux) + " 586 170 L586 360 Q586 376 570 376 L350 376 Q334 376 334 360 Z", fill: "rgba(28,126,214," + (0.18 + 0.2 * chaud) + ")" }, g);
    A.s("rect", { x: 425, y: 352, width: 70, height: 16, rx: 8, fill: C.encre, transform: "rotate(" + (v ? 25 : 0) + " 460 360)" }, g);
    // plaque
    A.s("rect", { x: 240, y: 384, width: 440, height: 30, rx: 8, fill: "rgb(" + Math.round(230 + 25 * chaud) + "," + Math.round(232 - 140 * chaud) + "," + Math.round(238 - 200 * chaud) + ")", stroke: C.encre, "stroke-width": 4 }, g);
    A.s("rect", { x: 260, y: 414, width: 400, height: 90, rx: 14, fill: C.fond, stroke: C.encre, "stroke-width": 4 }, g);
    A.texte(g, Math.round(T) + " °C", [360, 460], { taille: 24, gras: 800, coul: chaud > 0.1 ? C.chaud : C.encre });
    A.texte(g, v + " tr/min", [560, 460], { taille: 24, gras: 800 });
    if (!allume && T > 50) A.texte(g, "surface encore chaude", [780, 400], { taille: 22, gras: 800, coul: C.ko, largeur: 200 });
    zone.innerHTML = allume ? "Chauffage et agitation se règlent séparément : de l'ambiante à environ 500 °C, de 60 à environ 1 200 tr/min." : "Plaque éteinte : l'agitation s'arrête, mais la surface peut rester chaude longtemps.";
  }
  ct.surChange(function () { if (allume) dessiner(); }); cv.surChange(function () { if (allume) dessiner(); });
  dessiner();
})();
