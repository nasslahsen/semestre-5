/* Niveau : loi de Beer-Lambert (3.1, 3.9) : transmittance, absorbance, proportionnalité, étalon, modes de mesure, validité. */
NIVEAU(LABO.rejouable({
  id: "beer-lambert",
  init: function (fig) {
    var A = LABO, C = A.C, g = A.s("g", null, fig.svg);
    var n = { g: g, libre: true, pl: { P: function (v) { return v; } } };
    // une cuve avec I0 et It
    n.cuve = function (I0, It, teinte, txt) {
      A.vider(g);
      A.s("rect", { x: 40, y: 230, width: 200, height: 70, fill: C.jeuPale }, g);
      A.s("rect", { x: 240, y: 160, width: 160, height: 210, rx: 8, fill: teinte, stroke: C.encre, "stroke-width": 3 }, g);
      var h = It === null ? 70 : 70 * It / I0;
      A.s("rect", { x: 400, y: 265 - h / 2, width: 240, height: Math.max(2, h), fill: C.jeuPale }, g);
      A.texte(g, "I₀ = " + I0, [140, 200], { taille: 26, gras: 800, coul: C.jeu });
      A.texte(g, It === null ? "It = ?" : "It = " + It, [520, 200], { taille: 26, gras: 800, coul: C.jeu });
      if (txt) A.texte(g, txt, [340, 450], { taille: 24, gras: 800 });
    };
    return n;
  },
  etapes: [
    { nom: "La transmittance", jouer: function (j, n) {
      n.cuve(800, 200, "rgba(201,42,42,0.45)");
      j.titre("Le détecteur reçoit 800 unités sans échantillon et 200 unités à travers la cuve. Quelle est la transmittance ?");
      j.nombre({ avant: "T =", cases: [{ attendu: 0.25, tol: 0.001 }],
        aide: function () { return "T = It / I₀ : la fraction de la lumière qui traverse."; },
        ok: function () { j.bravo("T = 0,25 : un quart de la lumière passe."); j.suite(); } });
    } },
    { nom: "L'absorbance", jouer: function (j, n) {
      n.cuve(1000, 10, "rgba(201,42,42,0.8)", "T = 0,01");
      j.titre("Une solution foncée ne laisse passer qu'un centième de la lumière. Quelle est son absorbance ?");
      j.nombre({ avant: "A =", cases: [{ attendu: 2, tol: 0.001 }],
        aide: function () { return "A = log₁₀(1 / T). Ici 1 / T = 100."; },
        ok: function () {
          j.bravo("A = 2.");
          j.expliquer("<p>\\(A = \\log_{10}(1/0{,}01) = \\log_{10} 100 = 2\\). Chaque fois que l'absorbance augmente de 1, la lumière transmise est divisée par 10.</p>");
          j.suite();
        } });
    } },
    { nom: "Deux fois plus concentré", jouer: function (j, n) {
      n.cuve(100, null, "rgba(201,42,42,0.6)", "c × 2");
      j.titre("Une solution a une absorbance de 0,3. On mesure la même substance deux fois plus concentrée, dans la même cuve. Que prévois-tu ?");
      j.choix([
        { html: "L'absorbance double : 0,6", juste: true },
        { html: "La transmittance double", aide: "Plus de substance absorbe plus : la lumière qui passe ne peut pas augmenter." },
        { html: "L'absorbance reste 0,3", aide: "A = ε × l × c : qu'est-ce qui a changé dans ce produit ?" }
      ], { colonnes: 1, ok: function () {
        j.bravo("A est proportionnelle à c : 0,6.");
        j.expliquer("<p>C'est l'absorbance, pas la transmittance, qui est proportionnelle à la concentration. La transmittance, elle, passe de \\(10^{-0{,}3} \\approx 0{,}50\\) à \\(10^{-0{,}6} \\approx 0{,}25\\).</p>");
        j.suite();
      } });
    } },
    { nom: "Avec un étalon", jouer: function (j, n) {
      var A = LABO, C = A.C; A.vider(n.g);
      [["étalon", "5 mmol/L", "A = 0,40", 0.4], ["patient", "c = ?", "A = 0,30", 0.3]].forEach(function (t, i) {
        A.s("rect", { x: 150 + i * 240, y: 150, width: 140, height: 220, rx: 8, fill: "rgba(201,42,42," + t[3] + ")", stroke: C.encre, "stroke-width": 3 }, n.g);
        A.texte(n.g, t[0], [220 + i * 240, 120], { taille: 22, gras: 800 });
        A.texte(n.g, t[1], [220 + i * 240, 410], { taille: 22, gras: 700 });
        A.texte(n.g, t[2], [220 + i * 240, 450], { taille: 22, gras: 800, coul: C.jeu });
      });
      j.titre("Même réaction, même cuve, même longueur d'onde. Quelle est la concentration du patient ?");
      j.nombre({ avant: "c =", apres: "\\text{mmol/L}", cases: [{ attendu: 3.75, tol: 0.005 }],
        aide: function () { return "A est proportionnelle à c : la concentration est dans le même rapport que les absorbances."; },
        ok: function () { j.bravo("3,75 mmol/L."); j.expliquer("<p>\\(c = 5 \\times \\dfrac{0{,}30}{0{,}40} = 3{,}75\\) mmol/L : ε et l sont les mêmes pour les deux tubes, ils s'éliminent.</p>"); j.suite(); } });
    } },
    { nom: "Point final ou cinétique ?", jouer: function (j, n) {
      var A = LABO, C = A.C; A.vider(n.g);
      A.s("line", { x1: 80, y1: 470, x2: 620, y2: 470, stroke: C.encre, "stroke-width": 3 }, n.g);
      A.s("line", { x1: 80, y1: 470, x2: 80, y2: 90, stroke: C.encre, "stroke-width": 3 }, n.g);
      A.texte(n.g, "temps", [600, 505], { taille: 18, gras: 700 }); A.texte(n.g, "A", [60, 100], { taille: 20, gras: 800 });
      A.s("polyline", { points: "80,440 200,360 320,280 440,200 560,120", fill: "none", stroke: C.jeu, "stroke-width": 5 }, n.g);
      j.titre("On dose l'activité de l'ALT : l'absorbance varie en ligne droite pendant la réaction. Quel mode de mesure ?");
      j.choix([
        { html: "Point final", aide: "Le point final sert quand l'absorbance ne change plus. Ici, c'est sa vitesse de variation qui compte." },
        { html: "Cinétique", juste: true }
      ], { colonnes: 2, ok: function () { j.bravo("Cinétique : la vitesse de variation de A, pendant la phase linéaire."); j.expliquer("<p>Méthode cinétique : enzymes (ALT, AST, LDH). Point final : glucose, protéines totales, cholestérol ; à deux points, on élimine la couleur propre de l'échantillon.</p>"); j.suite(); } });
    } },
    { nom: "Les limites de la loi", jouer: function (j, n) {
      var A = LABO; A.vider(n.g); A.icone(n.g, "lampe", [340, 260], 200, A.C.jeu);
      j.titre("Dans quelles conditions la loi de Beer-Lambert s'applique-t-elle ?");
      j.choix([
        { html: "Lumière blanche et solution concentrée", aide: "La loi suppose une seule longueur d'onde." },
        { html: "Lumière monochromatique et solution suffisamment diluée", juste: true },
        { html: "N'importe quelle lumière, pourvu que la cuve soit en quartz", aide: "Le quartz sert pour l'UV ; il ne change pas les conditions de la loi." }
      ], { colonnes: 1, ok: function () { j.bravo("Monochromatique, et assez diluée pour que les molécules ne s'associent pas."); j.suite(); } });
    } }
  ]
}));
