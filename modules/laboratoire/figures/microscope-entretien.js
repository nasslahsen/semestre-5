/* Figure : un microscope dessiné ; toucher une partie montre ses problèmes et son entretien. */
(function () {
  "use strict";
  var R = RM, A = LABO, C = A.C;

  var f = R.figure("fig-microscope-entretien", {
    largeur: 960, hauteur: 540, titre: "Chaque partie, son problème, son entretien",
    essai: "<strong>Essaie</strong> : touche une partie du microscope. <strong>Observe</strong> : la plupart des soucis viennent de ce qui se dépose sur le trajet de la lumière."
  });
  var g = A.s("g", { transform: "translate(-30 -35) scale(1.1)" }, f.svg), sel = 0;
  var P = [
    { t: "Oculaires", z: [300, 40, 120, 70], d: "Poussière : ombres, surtout à 40× à 100×. Rayures (toile d'araignée) : remplacer l'oculaire. Toujours les capuchons quand on les retire." },
    { t: "Tête binoculaire", z: [280, 110, 160, 70], d: "Prismes et miroirs qui se corrodent ; ne pas les démonter sans formation." },
    { t: "Objectifs", z: [300, 200, 120, 80], d: "Essuyer l'huile du 100× chaque jour ; ne pas appuyer l'objectif sur la lame." },
    { t: "Platine", z: [240, 285, 240, 40], d: "Propre, lubrifiée, bien ajustée ; elle doit se déplacer en X et Y et tenir sa position." },
    { t: "Condenseur", z: [310, 330, 100, 50], d: "Nettoyé au pinceau en poil de chameau ; les réglages mécaniques demandent les outils du fabricant." },
    { t: "Éclairage", z: [300, 420, 120, 50], d: "Ampoule : consommable, ne pas la toucher, en garder une de rechange ; intensité minimale utile, tension correcte." },
    { t: "Corps et socle", z: [500, 120, 120, 380], d: "Détergent au pinceau puis eau distillée et éthanol à 95 % (jamais sur l'optique) ; porter à deux mains, bras et socle." }
  ];
  var zone = R.h("div", null, "", f.direct);
  function dessiner() {
    A.vider(g);
    var on = function (i) { return sel === i ? C.jeu : C.encre; }, fond = function (i) { return sel === i ? C.jeuPale : "#fff"; };
    // socle et bras
    A.s("rect", { x: 220, y: 470, width: 420, height: 40, rx: 14, fill: fond(6), stroke: on(6), "stroke-width": 4 }, g);
    A.s("path", { d: "M560 470 L560 230 Q560 130 470 130 L440 130 L440 170 L470 170 Q520 170 520 230 L520 470 Z", fill: fond(6), stroke: on(6), "stroke-width": 4 }, g);
    // oculaires et tête
    A.s("rect", { x: 320, y: 50, width: 34, height: 70, rx: 6, fill: fond(0), stroke: on(0), "stroke-width": 4, transform: "rotate(-12 337 85)" }, g);
    A.s("rect", { x: 370, y: 50, width: 34, height: 70, rx: 6, fill: fond(0), stroke: on(0), "stroke-width": 4, transform: "rotate(12 387 85)" }, g);
    A.s("rect", { x: 290, y: 120, width: 160, height: 60, rx: 14, fill: fond(1), stroke: on(1), "stroke-width": 4 }, g);
    // revolver et objectifs
    A.s("rect", { x: 320, y: 180, width: 100, height: 26, rx: 10, fill: fond(2), stroke: on(2), "stroke-width": 4 }, g);
    [330, 360, 392].forEach(function (x, i) { A.s("rect", { x: x, y: 206, width: 22, height: 56 - i * 6, rx: 5, fill: fond(2), stroke: on(2), "stroke-width": 3 }, g); });
    // platine, condenseur, éclairage
    A.s("rect", { x: 240, y: 290, width: 280, height: 26, rx: 6, fill: fond(3), stroke: on(3), "stroke-width": 4 }, g);
    A.s("rect", { x: 330, y: 330, width: 70, height: 40, rx: 8, fill: fond(4), stroke: on(4), "stroke-width": 4 }, g);
    A.s("circle", { cx: 365, cy: 440, r: 24, fill: sel === 5 ? "#fff2b3" : "#fff", stroke: on(5), "stroke-width": 4 }, g);
    P.forEach(function (p, i) {
      A.cible(g, p.z[0], p.z[1], p.z[2], p.z[3], function () { sel = i; dessiner(); });
    });
    A.texte(g, P[sel].t, [720, 250], { taille: 26, gras: 800, coul: C.jeu, largeur: 200 });
    zone.innerHTML = "<strong>" + P[sel].t + "</strong> : " + P[sel].d;
  }
  dessiner();
})();
