/* Figure : le distillateur, du réseau d'eau au récipient de stockage, élément par élément. */
(function () {
  "use strict";
  var R = RM, A = LABO, C = A.C;

  var f = R.figure("fig-distillateur", {
    largeur: 960, hauteur: 540, titre: "Le chemin de l'eau dans un distillateur",
    essai: "<strong>Essaie</strong> : avance pas à pas. <strong>Observe</strong> : l'eau est chauffée jusqu'à devenir vapeur, les impuretés restent dans le bouilleur, la vapeur refroidie redevient de l'eau pure."
  });
  var g = A.s("g", null, f.svg);
  var E = [
    { t: "Arrivée d'eau", d: "Le raccordement au réseau d'eau potable alimente le bouilleur ; la vanne règle le débit, la jauge maintient le niveau." },
    { t: "Bouilleur", d: "Les résistances à immersion chauffent l'eau jusqu'à 100 °C : elle devient vapeur, les impuretés restent au fond (tartre)." },
    { t: "Condenseur", d: "L'eau froide circule autour du serpentin : la vapeur perd sa chaleur et redevient liquide." },
    { t: "Récipient", d: "Le distillat est recueilli dans un récipient en plastique, pour éviter une contamination par des ions." }
  ];
  var zone = R.h("div", null, "", f.direct);
  function dessiner(k) {
    A.vider(g);
    var on = function (i) { return k === i + 1; }, vu = function (i) { return k >= i + 1; };
    // arrivée d'eau
    A.chemin(g, [[30, 430], [150, 430]], { coul: vu(0) ? C.froid : C.trait, ep: 8 });
    A.s("circle", { cx: 100, cy: 430, r: 16, fill: "#fff", stroke: on(0) ? C.jeu : C.encre, "stroke-width": 3 }, g);
    A.texte(g, "vanne", [100, 470], { taille: 17, gras: 700 });
    // bouilleur
    A.s("rect", { x: 150, y: 260, width: 220, height: 220, rx: 18, fill: on(1) ? C.jeuPale : "#fff", stroke: on(1) ? C.jeu : C.encre, "stroke-width": on(1) ? 4.5 : 3 }, g);
    A.s("rect", { x: 155, y: 340, width: 210, height: 135, rx: 12, fill: vu(0) ? C.froidPale : C.fond }, g);
    A.s("path", { d: "M190 440 q20 -30 40 0 t40 0 t40 0 t40 0", fill: "none", stroke: vu(1) ? C.chaud : C.gris, "stroke-width": 6 }, g);
    if (vu(1)) [210, 260, 310].forEach(function (x) { A.s("circle", { cx: x, cy: 370, r: 8, fill: "#fff", stroke: C.froid, "stroke-width": 2 }, g); });
    A.s("line", { x1: 350, y1: 340, x2: 350, y2: 290, stroke: C.encre, "stroke-width": 3 }, g);
    A.texte(g, "jauge", [330, 280], { taille: 16, gras: 700 });
    A.texte(g, "bouilleur", [195, 236], { taille: 20, gras: 800 });
    // vapeur vers le condenseur
    A.chemin(g, [[260, 260], [260, 120], [520, 120]], { coul: vu(1) ? C.gris : C.trait, ep: 10 });
    if (vu(1)) A.texte(g, "vapeur", [390, 96], { taille: 18, gras: 700, coul: C.doux });
    // condenseur : serpentin dans une enveloppe d'eau froide
    A.s("rect", { x: 520, y: 80, width: 200, height: 260, rx: 16, fill: on(2) ? C.jeuPale : "#fff", stroke: on(2) ? C.jeu : C.encre, "stroke-width": on(2) ? 4.5 : 3 }, g);
    A.s("path", { d: "M540 120 h160 q20 0 0 40 h-150 q-20 0 0 40 h150 q20 0 0 40 h-150 q-20 0 0 40 h150", fill: "none", stroke: vu(2) ? C.froid : C.gris, "stroke-width": 7 }, g);
    A.texte(g, "condenseur", [620, 60], { taille: 20, gras: 800 });
    A.fleche(g, [800, 300], [722, 300], { coul: vu(2) ? C.froid : C.trait, ep: 5 }); A.texte(g, "eau froide", [860, 300], { taille: 17, gras: 700, coul: C.froid });
    // récipient
    A.chemin(g, [[700, 290], [700, 400]], { coul: vu(2) ? C.froid : C.trait, ep: 6 });
    A.s("rect", { x: 620, y: 400, width: 160, height: 120, rx: 14, fill: on(3) ? C.jeuPale : "#fff", stroke: on(3) ? C.jeu : C.encre, "stroke-width": on(3) ? 4.5 : 3 }, g);
    if (vu(3)) A.s("rect", { x: 625, y: 450, width: 150, height: 65, rx: 10, fill: "#dbeeff" }, g);
    A.texte(g, "eau distillée", [700, 430], { taille: 18, gras: 800 });
    zone.innerHTML = k ? "<strong>" + E[k - 1].t + "</strong> : " + E[k - 1].d : "Avance pour suivre l'eau, du réseau au récipient.";
  }
  var e = R.etapes(f.reglages, 4, ["", "arrivée", "bouilleur", "condenseur", "récipient"], dessiner);
  e.aller(0);
})();
