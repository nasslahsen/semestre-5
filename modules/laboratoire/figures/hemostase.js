/* Figure : une brèche dans un vaisseau, de la vasoconstriction à la dissolution du caillot. */
(function () {
  "use strict";
  var R = RM, A = LABO, C = A.C;

  var f = R.figure("fig-hemostase", {
    largeur: 960, hauteur: 540, titre: "De la brèche à la réparation",
    essai: "<strong>Essaie</strong> : avance étape par étape. <strong>Observe</strong> : le clou de plaquettes arrive en quelques minutes, la fibrine le consolide, et le caillot n'est dissous qu'après plusieurs jours."
  });
  var g = A.s("g", null, f.svg);
  var E = [
    { t: "Lésion", d: "La paroi est rompue : le sous-endothélium et le collagène sont mis à nu." },
    { t: "Temps vasculaire", d: "Vasoconstriction réflexe : le flux ralentit, plaquettes et protéines coagulantes se regroupent sur la brèche." },
    { t: "Clou plaquettaire", d: "Hémostase primaire, 3 à 5 minutes : adhésion par le facteur de von Willebrand, activation, agrégation par des ponts de fibrinogène." },
    { t: "Caillot de fibrine", d: "Coagulation, 5 à 10 minutes : la thrombine transforme le fibrinogène en fibrine, qui consolide le clou." },
    { t: "Fibrinolyse", d: "48 à 72 heures : la plasmine dégrade la fibrine, le caillot se dissout, la circulation redevient normale." }
  ];
  var zone = R.h("div", null, "", f.direct);
  function dessiner(k) {
    A.vider(g);
    var serre = k >= 2 && k < 5 ? 30 : 0;
    // vaisseau : deux parois, la brèche au milieu de la paroi du bas
    A.s("rect", { x: 40, y: 100 + serre, width: 880, height: 40, fill: "#f4c7c3", stroke: C.encre, "stroke-width": 3 }, g);
    if (k === 0 || k === 5) A.s("rect", { x: 40, y: 380, width: 880, height: 40, fill: "#f4c7c3", stroke: C.encre, "stroke-width": 3 }, g);
    else {
      A.s("rect", { x: 40, y: 380 - serre, width: 360, height: 40, fill: "#f4c7c3", stroke: C.encre, "stroke-width": 3 }, g);
      A.s("rect", { x: 560, y: 380 - serre, width: 360, height: 40, fill: "#f4c7c3", stroke: C.encre, "stroke-width": 3 }, g);
    }
    A.s("rect", { x: 40, y: 140 + serre, width: 880, height: 240 - 2 * serre, fill: "#fdf0ee" }, g);
    if (k >= 1 && k < 5) A.s("rect", { x: 400, y: 410 - serre, width: 160, height: 14, fill: "#e8b04a" }, g);
    // globules et plaquettes qui circulent
    [[120, 220], [260, 300], [700, 230], [820, 310]].forEach(function (p) { A.s("ellipse", { cx: p[0], cy: p[1], rx: 26, ry: 14, fill: C.sang }, g); });
    if (k >= 3 && k < 5) for (var i = 0; i < 9; i++) A.s("circle", { cx: 420 + (i % 5) * 30, cy: 370 - serre - Math.floor(i / 5) * 26, r: 11, fill: C.v, stroke: C.encre, "stroke-width": 1.5 }, g);
    if (k === 4) for (var l = 0; l < 7; l++) A.s("line", { x1: 395 + l * 25, y1: 320 - serre, x2: 445 + l * 15, y2: 410 - serre, stroke: C.chaud, "stroke-width": 3 }, g);
    if (k === 5) A.texte(g, "fibrine dégradée (PDF)", [480, 330], { taille: 20, gras: 800, coul: C.chaud });
    if (k === 2) { A.fleche(g, [480, 40], [480, 96 + serre], { coul: C.jeu, ep: 4 }); A.fleche(g, [480, 490], [480, 424 - serre], { coul: C.jeu, ep: 4 }); }
    if (k >= 1 && k < 5) A.texte(g, "brèche", [480, 470], { taille: 20, gras: 800 });
    zone.innerHTML = k ? "<strong>" + E[k - 1].t + "</strong> : " + E[k - 1].d : "Un vaisseau intact. Avance pour provoquer une brèche.";
  }
  var e = R.etapes(f.reglages, 5, ["", "lésion", "vasoconstriction", "clou", "caillot", "fibrinolyse"], dessiner);
  e.aller(0);
})();
