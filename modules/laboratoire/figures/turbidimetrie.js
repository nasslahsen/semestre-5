/* Figure : un faisceau traverse une suspension de complexes ; détecteur en face (turbidimétrie) et de côté (néphélométrie) ; effet crochet. */
(function () {
  "use strict";
  var R = RM, A = LABO, C = A.C;

  var f = R.figure("fig-turbidimetrie", {
    largeur: 960, hauteur: 540, titre: "Lumière transmise, lumière diffusée, effet crochet",
    essai: "<strong>Essaie</strong> : augmente l'antigène jusqu'au bout. <strong>Observe</strong> : les complexes se forment, la lumière transmise baisse et la lumière diffusée monte ; puis, en excès d'antigène, le signal redescend."
  });
  var g = A.s("g", null, f.svg);
  var cu = R.curseur(f.reglages, { nom: "Antigène", min: 0, max: 100, pas: 1, val: 30, unite: " %", dec: 0 });
  var zone = R.h("div", null, "", f.direct);
  // signal (formation de complexes) : monte, culmine vers 50 %, redescend (effet crochet)
  function signal(x) { return x <= 50 ? x / 50 : Math.max(0.1, 1 - (x - 50) / 55); }
  var PTS = [[205, 160], [255, 210], [228, 300], [280, 250], [210, 245], [262, 145], [240, 330], [292, 180], [218, 200], [270, 300], [248, 270], [225, 135]];
  function dessiner() {
    var x = cu.v, s = signal(x), y = 240;
    A.vider(g);
    // faisceau incident
    A.s("rect", { x: 20, y: y - 22, width: 160, height: 44, fill: C.jeuPale }, g);
    A.texte(g, "lumière incidente", [100, y - 40], { taille: 17, gras: 700, coul: C.jeu });
    // cuve et complexes
    A.s("rect", { x: 180, y: 110, width: 130, height: 260, rx: 8, fill: "#fff", stroke: C.encre, "stroke-width": 3 }, g);
    var nb = Math.round(s * PTS.length);
    PTS.slice(0, nb).forEach(function (p) { A.s("circle", { cx: p[0], cy: p[1], r: 9, fill: C.v, opacity: 0.75 }, g); });
    // transmis
    var h = 44 * (1 - 0.8 * s);
    A.s("rect", { x: 310, y: y - h / 2, width: 160, height: h, fill: C.jeuPale }, g);
    A.boite(g, 470, y - 45, 110, 90, { fond: "#fff", bord: C.encre, ep: 3, rx: 10 });
    A.texte(g, "turbidimètre", [525, y + 75], { taille: 17, gras: 800 });
    // diffusé, à un angle
    A.s("line", { x1: 300, y1: 160, x2: 410, y2: 70, stroke: C.v, "stroke-width": 2 + 10 * s, opacity: 0.6 }, g);
    A.boite(g, 400, 20, 110, 80, { fond: "#fff", bord: C.v, ep: 3, rx: 10 });
    A.texte(g, "néphélomètre", [455, 125], { taille: 17, gras: 800, coul: C.v });
    // courbe du signal en fonction de l'antigène
    var gx0 = 630, gx1 = 930, gy0 = 440, gy1 = 160, X = function (v) { return gx0 + v / 100 * (gx1 - gx0); }, Y = function (v) { return gy0 - v * (gy0 - gy1); };
    A.s("line", { x1: gx0, y1: gy0, x2: gx1, y2: gy0, stroke: C.encre, "stroke-width": 3 }, g);
    A.s("line", { x1: gx0, y1: gy0, x2: gx0, y2: gy1 - 20, stroke: C.encre, "stroke-width": 3 }, g);
    A.texte(g, "antigène", [gx1 - 40, gy0 + 30], { taille: 17, gras: 700 });
    A.texte(g, "signal", [gx0 + 36, gy1 - 34], { taille: 17, gras: 700 });
    var pts = []; for (var v = 0; v <= 100; v += 2) pts.push([X(v), Y(signal(v))]);
    A.s("polyline", { points: pts.map(function (p) { return p.join(","); }).join(" "), fill: "none", stroke: C.jeu, "stroke-width": 4 }, g);
    A.s("circle", { cx: X(x), cy: Y(s), r: 10, fill: C.jeu, stroke: "#fff", "stroke-width": 3 }, g);
    if (x > 50) A.texte(g, "effet crochet", [X(80), Y(signal(80)) - 34], { taille: 18, gras: 800, coul: C.ko });
    zone.innerHTML = x > 50 ? "Excès d'antigène : moins de complexes, le signal diminue alors que l'antigène augmente." : "Les complexes antigène-anticorps troublent la solution : moins de lumière transmise, plus de lumière diffusée.";
  }
  cu.surChange(dessiner);
  dessiner();
})();
