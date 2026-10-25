/* Figure : le trajet de la lumière dans un spectrophotomètre, élément par élément. */
(function () {
  "use strict";
  var R = RM, A = LABO, C = A.C;

  var f = R.figure("fig-spectrophotometre", {
    largeur: 960, hauteur: 540, titre: "Les éléments d'un spectrophotomètre",
    essai: "<strong>Essaie</strong> : avance d'élément en élément. <strong>Observe</strong> : la lumière blanche est étalée en couleurs, une seule passe la fente, l'échantillon en absorbe une partie, le détecteur mesure le reste."
  });
  var g = A.s("g", null, f.svg);
  var E = [
    { t: "Source", x: 20, d: "Tungstène pour le visible (350 à 800 nm), deutérium pour l'UV (190 à 400 nm), parfois xénon en lumière pulsée." },
    { t: "Monochromateur", x: 200, d: "Fente d'entrée, miroirs, prisme ou réseau qui étale le spectre, fente de sortie qui choisit la longueur d'onde." },
    { t: "Cuve", x: 420, d: "Plastique ou verre pour le visible ; quartz pour l'UV, obligatoire sous 310 nm." },
    { t: "Détecteur", x: 600, d: "Photodiode, barrette de diodes ou photomultiplicateur : la lumière transmise devient un signal électrique." },
    { t: "Lecture", x: 780, d: "Affichage numérique, bien plus précis qu'une lecture analogique." }
  ];
  var zone = R.h("div", null, "", f.direct);
  var ARC = ["#8b3fd9", "#3b5bdb", "#1c9fd6", "#2f9e44", "#f2c94c", "#e8590c", "#c92a2a"];
  function dessiner(k) {
    A.vider(g);
    var y = 250;
    // les cinq éléments, nom dessous ; les faisceaux passent par-dessus
    E.forEach(function (e, i) {
      var on = k === i + 1, vu = k >= i + 1, w = i === 1 ? 190 : 150;
      A.boite(g, e.x, y - 70, w, 140, { fond: on ? C.jeuPale : "#fff", bord: on ? C.jeu : vu ? C.encre : C.trait, ep: on ? 4.5 : 2.5, rx: 14 });
      A.texte(g, e.t, [e.x + w / 2, y + 105], { taille: 21, gras: 800, coul: on ? C.jeu : vu ? C.encre : C.gris });
    });
    if (k >= 1) A.s("circle", { cx: 95, cy: y, r: 30, fill: "#fff2b3", stroke: C.chaud, "stroke-width": 3 }, g);
    // faisceaux : blanc jusqu'au monochromateur, étalé dedans, une seule couleur ensuite
    if (k >= 1) A.s("rect", { x: 125, y: y - 14, width: 175, height: 28, fill: "#fff2b3" }, g);
    if (k >= 2) {
      ARC.forEach(function (c, i) { A.s("line", { x1: 300, y1: y, x2: 390, y2: y - 90 + i * 30, stroke: c, "stroke-width": 6 }, g); });
      A.s("line", { x1: 390, y1: y, x2: 440, y2: y, stroke: ARC[3], "stroke-width": 14 }, g);
    }
    if (k >= 3) A.s("line", { x1: 540, y1: y, x2: 620, y2: y, stroke: ARC[3], "stroke-width": 6 }, g);
    if (k >= 4) { A.s("rect", { x: 640, y: y - 25, width: 70, height: 50, rx: 6, fill: C.fond, stroke: C.encre, "stroke-width": 2.5 }, g); A.fleche(g, [710, y], [800, y], { coul: C.encre, ep: 4 }); }
    if (k >= 2) { A.s("rect", { x: 380, y: y - 40, width: 10, height: 30, fill: C.encre }, g); A.s("rect", { x: 380, y: y + 10, width: 10, height: 30, fill: C.encre }, g); A.texte(g, "fente de sortie", [385, y - 100], { taille: 17, gras: 700, coul: C.doux }); }
    if (k >= 3) A.s("rect", { x: 465, y: y - 50, width: 60, height: 100, rx: 4, fill: "rgba(201,42,42,0.35)", stroke: C.encre, "stroke-width": 2 }, g);
    if (k >= 5) A.texte(g, "A = 0,42", [855, y + 8], { taille: 26, gras: 800, coul: C.jeu });
    zone.innerHTML = k ? "<strong>" + E[k - 1].t + "</strong> : " + E[k - 1].d : "Avance pour suivre la lumière, de la lampe à l'affichage.";
  }
  var e = R.etapes(f.reglages, 5, ["", "source", "monochromateur", "cuve", "détecteur", "lecture"], dessiner);
  e.aller(0);
})();
