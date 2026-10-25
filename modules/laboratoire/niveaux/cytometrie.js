/* Niveau : cytométrie en flux (4.3) : signaux optiques, gaine, scattergramme, laser, hémoglobine, intérêt par rapport à l'impédance. */
NIVEAU(LABO.rejouable({
  id: "cytometrie",
  init: function (fig) {
    var A = LABO, C = A.C, g = A.s("g", null, fig.svg);
    var n = { g: g, pl: { P: function (v) { return v; } } };
    // scattergramme FSC / SSC, trois nuages à toucher
    n.NUAGES = [{ c: [180, 420], n: "1" }, { c: [340, 290], n: "2" }, { c: [440, 130], n: "3" }];
    n.scatter = function (sel, faux) {
      A.vider(g);
      A.s("line", { x1: 60, y1: 520, x2: 640, y2: 520, stroke: C.encre, "stroke-width": 3 }, g);
      A.s("line", { x1: 60, y1: 520, x2: 60, y2: 40, stroke: C.encre, "stroke-width": 3 }, g);
      A.texte(g, "FSC (taille)", [560, 556], { taille: 19, gras: 800 }); A.texte(g, "SSC", [100, 30], { taille: 19, gras: 800 });
      n.NUAGES.forEach(function (p, i) {
        var on = sel === i, ko = faux === i;
        for (var k = 0; k < 40; k++) { var u = k * 2.4, r = 10 + (k % 7) * 9; A.s("circle", { cx: p.c[0] + Math.cos(u) * r * 1.3, cy: p.c[1] + Math.sin(u) * r * 0.8, r: 5, fill: on ? C.jeu : ko ? C.ko : C.froid, opacity: 0.7 }, g); }
        A.texte(g, p.n, [p.c[0], p.c[1] - 85], { taille: 24, gras: 800, coul: on ? C.jeu : C.encre });
        A.cible(g, p.c[0] - 100, p.c[1] - 70, 200, 140, function () { if (n.toucher) n.toucher(i); });
      });
    };
    return n;
  },
  etapes: [
    { nom: "Quatre signaux", jouer: function (j, n) {
      var A = LABO;
      j.titre("Chaque signal du cytomètre renseigne sur autre chose. Relie-les.");
      j.consigne("Touche un signal, puis ce qu'il mesure.");
      var p = A.paires({
        g: n.g, gauche: ["FSC, faible angle", "SSC, à 90°", "FL3, rouge", "FL1, verte"],
        droite: ["Granulosité, complexité interne", "ADN (iodure de propidium)", "Taille de la cellule", "Acides nucléiques (thiazole orange)"],
        bon: [2, 0, 1, 3], xg: 20, wg: 260, xd: 340, wd: 320, y0: 60, h: 104, pas: 134, taille: 19,
        erreur: function (m) { j.erreur(m); },
        aide: function (i) { return ["La lumière déviée vers l'avant dépend surtout de la taille.", "Sur le côté, la lumière renvoyée par l'intérieur de la cellule.", "Le colorant rouge du cours se fixe sur l'ADN.", "Le colorant vert du cours, aussi utilisé pour les réticulocytes."][i]; },
        fin: function () { j.bravo("Taille, granulosité, ADN, acides nucléiques."); j.suite(); }
      });
      j.reponse(function () { p.resoudre(); });
    } },
    { nom: "La gaine liquide", jouer: function (j, n) {
      var A = LABO, C = A.C; A.vider(n.g);
      A.s("path", { d: "M180 60 L500 60 L380 400 L300 400 Z", fill: C.froidPale, stroke: C.encre, "stroke-width": 3 }, n.g);
      A.s("rect", { x: 325, y: 60, width: 30, height: 340, fill: "#f9d6d6" }, n.g);
      [120, 200, 280, 360, 440, 500].forEach(function (y) { A.s("circle", { cx: 340, cy: y, r: 10, fill: C.sang }, n.g); });
      A.s("line", { x1: 120, y1: 470, x2: 560, y2: 470, stroke: C.chaud, "stroke-width": 6 }, n.g);
      A.texte(n.g, "laser", [600, 470], { taille: 20, gras: 800, coul: C.chaud });
      j.titre("Pourquoi entoure-t-on l'échantillon d'un liquide de gaine ?");
      j.choix([
        { html: "Pour diluer les cellules et réduire le coût", aide: "La gaine ne se mélange pas à l'échantillon : elle le comprime." },
        { html: "Pour que les cellules passent une par une devant le laser", juste: true },
        { html: "Pour colorer les cellules", aide: "Le marquage fluorescent est un réactif à part." }
      ], { colonnes: 1, ok: function () { j.bravo("Focalisation hydrodynamique : un filet central, une cellule à la fois."); j.suite(); } });
    } },
    { nom: "Lire le scattergramme", jouer: function (j, n) {
      n.scatter();
      j.titre("Sur ce scattergramme FSC / SSC, où sont les lymphocytes ?");
      j.consigne("Touche le bon nuage.");
      function gagner() {
        n.toucher = null; n.scatter(0);
        j.bravo("En bas à gauche : petits et peu granuleux.");
        j.expliquer("<p>Les monocytes sont au milieu, les granulocytes (neutrophiles, éosinophiles) en haut : leur granulosité renvoie beaucoup de lumière sur le côté.</p>");
        j.suite();
      }
      n.toucher = function (i) {
        if (i !== 0) { n.scatter(null, i); j.erreur("Les lymphocytes sont les plus petits et les moins granuleux : quelles valeurs de FSC et de SSC ?"); return; }
        gagner();
      };
      j.reponse(gagner);
    } },
    { nom: "Le laser", jouer: function (j, n) {
      var A = LABO, C = A.C; A.vider(n.g); A.icone(n.g, "lampe", [340, 240], 200, C.chaud);
      j.titre("Quelle est la longueur d'onde du laser indiquée dans le schéma du cours ?");
      j.nombre({ avant: "\\lambda =", apres: "\\text{nm}", cases: [{ attendu: 488, tol: 0 }],
        aide: function () { return "Un laser bleu, dans le visible, entre 450 et 500 nm."; },
        ok: function () { j.bravo("488 nm."); j.suite(); } });
    } },
    { nom: "Et l'hémoglobine ?", jouer: function (j, n) {
      var A = LABO; A.vider(n.g); A.icone(n.g, "tube", [340, 260], 220, A.C.sang);
      j.titre("Ni l'impédance ni la diffusion laser ne dosent l'hémoglobine. Comment l'automate la mesure-t-il ?");
      j.choix([
        { html: "Par spectrophotométrie à 525 à 550 nm, après lyse des hématies", juste: true },
        { html: "En comptant les globules rouges", aide: "Le nombre de GR ne dit pas combien d'hémoglobine chacun porte." },
        { html: "Par potentiométrie", aide: "L'hémoglobine n'est pas un ion." }
      ], { colonnes: 1, ok: function () { j.bravo("Spectrophotométrie après lyse : méthode cyanméthémoglobine ou SLS."); j.suite(); } });
    } }
  ]
}));
