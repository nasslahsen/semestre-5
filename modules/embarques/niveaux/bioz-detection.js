/* Bio-impédance, questions 26 et 27 : moyenne d'une sinusoïde, composante continue de M1, fréquences, voie 90°, série de Fourier. */
NIVEAU({
  id: "bioz-detection",
  init: function (fig) {
    var g = E.s("g", null, fig.svg), n = { act: {} };
    var B = [
      { id: "mes", x: 30, y: 250, w: 150, h: 80, t: "VMES" },
      { id: "m1", x: 250, y: 120, w: 130, h: 80, t: "× P0°" },
      { id: "m2", x: 250, y: 380, w: 130, h: 80, t: "× P90°" },
      { id: "f1", x: 450, y: 120, w: 200, h: 80, t: "passe-bas → Re" },
      { id: "f2", x: 450, y: 380, w: 200, h: 80, t: "passe-bas → Im" }
    ];
    var L = [["mes", "m1"], ["mes", "m2"], ["m1", "f1"], ["m2", "f2"]];
    n.dessin = function () { EMB.scene(g, B, L, n.act); };
    n.dessin();
    return n;
  },
  etapes: [
    { nom: "Moyenne", jouer: function (j, n) {
      j.titre("Que vaut la valeur moyenne de \\(\\cos(2\\omega t + \\varphi)\\) ?");
      j.nombre({ avant: "\\text{moyenne} =", cases: [{ attendu: 0, tol: 0 }], ligne: true,
        aide: function () { return "Une sinusoïde passe autant de temps au-dessus qu'au-dessous de zéro."; },
        ok: function () { j.bravo("Zéro : le filtre passe-bas l'enlève."); j.suite(); } });
    } },
    { nom: "Composante continue", jouer: function (j, n) {
      n.act = { m1: true, f1: true }; n.dessin();
      j.titre("La composante continue de \\(V_{M1}\\) vaut \\(\\frac{2}{\\pi} A \\cos\\varphi\\). Pour \\(\\varphi = -60°\\), combien vaut-elle, en fraction de \\(A\\) ?");
      j.nombre({ avant: "\\frac{2}{\\pi}\\cos\\varphi =", cases: [{ attendu: 0.318, tol: 0.005 }], ligne: true,
        aide: function () { return "cos(−60°) = 0,5."; },
        ok: function () { j.bravo("2/π × 0,5 ≈ 0,318."); j.suite(); } });
    } },
    { nom: "Fréquences", jouer: function (j, n) {
      j.titre("Avec les trois premiers termes de \\(P_{0°}\\), à quelles fréquences sont les composantes variables de \\(V_{M1}\\) ?");
      j.choix([
        { html: "\\(f\\), \\(3f\\), \\(5f\\)", aide: "Un produit de sinus donne les fréquences somme et différence : (3f − f), (3f + f)…" },
        { html: "\\(2f\\), \\(4f\\), \\(6f\\)", juste: true },
        { html: "seulement \\(2f\\)", aide: "Les harmoniques 3 et 5 du carré donnent aussi des composantes." }
      ], { colonnes: 3, ok: function () { j.bravo("f + f, 3f ± f, 5f ± f : 2f, 4f, 6f."); j.suite(); } });
    } },
    { nom: "Voie 90°", jouer: function (j, n) {
      n.act = { m2: true, f2: true }; n.dessin();
      j.titre("La voie M2 multiplie par \\(P_{90°}\\). Sa composante continue est proportionnelle à…");
      j.choix([
        { html: "\\(|\\underline{Z}| \\cos\\varphi\\), la partie réelle", aide: "Ça, c'est la voie M1. Le carré décalé de 90° fait apparaître l'autre fonction trigonométrique." },
        { html: "\\(|\\underline{Z}| \\sin\\varphi\\), la partie imaginaire", juste: true }
      ], { colonnes: 1, ok: function () { j.bravo("Deux voies, deux nombres : Re et Im."); j.suite(); } });
    } },
    { nom: "Fourier", jouer: function (j, n) {
      j.titre("Dans la série de Fourier d'un carré ±1, quelle est l'amplitude de l'harmonique 3 ?");
      j.nombre({ avant: "\\text{amplitude} =", cases: [{ attendu: 0.424, tol: 0.005 }], ligne: true,
        aide: function () { return "Amplitude de l'harmonique n : 4 / (π n)."; },
        ok: function () { j.bravo("4 / (3π) ≈ 0,424."); j.suite(); } });
    } }
  ]
});
