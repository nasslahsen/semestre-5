/* Bio-impédance, questions 15 à 17 : condensateur et fréquence, modèle de Cole aux deux extrêmes, sommet du demi-cercle. */
NIVEAU({
  id: "bioz",
  init: function (fig) {
    var g = E.s("g", null, fig.svg), n = { act: {} };
    var B = [
      { id: "re", x: 260, y: 40, w: 160, h: 90, t: "RE\n1 kΩ" },
      { id: "rm", x: 120, y: 260, w: 160, h: 90, t: "RM\n4 kΩ" },
      { id: "cm", x: 400, y: 260, w: 160, h: 90, t: "CM\n1 nF" },
      { id: "z", x: 160, y: 460, w: 360, h: 80, t: "ZBIO = RE + RM ∥ CM", taille: 17 }
    ];
    var L = [["re", "rm"], ["re", "cm"]];
    n.dessin = function () { EMB.scene(g, B, L, n.act); };
    n.dessin();
    return n;
  },
  etapes: [
    { nom: "Le condensateur", jouer: function (j, n) {
      n.act = { cm: true }; n.dessin();
      j.titre("À très haute fréquence, comment se comporte le condensateur \\(C_M\\) ?");
      j.choix([
        { html: "Comme un fil : son impédance devient très petite", juste: true },
        { html: "Comme un circuit coupé", aide: "Regarde \\(|Z_C| = 1 / (C\\omega)\\) : que devient-elle quand \\(\\omega\\) est très grand ?" },
        { html: "Comme une résistance fixe", aide: "L'impédance d'un condensateur dépend de la fréquence." }
      ], { colonnes: 1, ok: function () {
        j.bravo("\\(1 / (C\\omega)\\) tend vers 0 : il court-circuite \\(R_M\\).");
        j.suite();
      } });
    } },
    { nom: "Fréquence nulle", jouer: function (j, n) {
      n.act = { re: true, rm: true }; n.dessin();
      j.titre("À fréquence nulle, le condensateur bloque. Que vaut \\(Z_{BIO}\\), avec \\(R_E = 1\\) kΩ et \\(R_M = 4\\) kΩ ?");
      j.nombre({ avant: "Z_{BIO}(0) =", apres: "\\text{k}\\Omega", cases: [{ attendu: 5, tol: 0 }], ligne: true,
        aide: function () { return "Le courant passe par RE puis par RM, en série."; },
        ok: function () { j.bravo("RE + RM = 5 kΩ : le départ du demi-cercle."); j.suite(); } });
    } },
    { nom: "Fréquence infinie", jouer: function (j, n) {
      n.act = { re: true, cm: true }; n.dessin();
      j.titre("À fréquence infinie, que vaut \\(Z_{BIO}\\) ?");
      j.nombre({ avant: "Z_{BIO}(\\infty) =", apres: "\\text{k}\\Omega", cases: [{ attendu: 1, tol: 0 }], ligne: true,
        aide: function () { return "Le condensateur court-circuite RM : il ne reste que RE."; },
        ok: function () { j.bravo("RE = 1 kΩ : l'arrivée du demi-cercle."); j.suite(); } });
    } },
    { nom: "Le sommet", jouer: function (j, n) {
      n.act = { rm: true, cm: true }; n.dessin();
      j.titre("Le sommet du demi-cercle est à \\(\\omega_0 = 1 / (R_M C_M)\\). Avec \\(R_M = 4\\) kΩ et \\(C_M = 1\\) nF, que vaut \\(f_0\\) ?");
      j.nombre({ avant: "f_0 =", apres: "\\text{kHz}", cases: [{ attendu: 39.8, tol: 0.2 }], ligne: true,
        aide: function () { return "ω0 = 1 / (4000 × 10⁻⁹) = 250 000 rad/s, puis f0 = ω0 / 2π."; },
        ok: function () { j.bravo("250 000 / 2π ≈ 39,8 kHz."); j.suite(); } });
    } },
    { nom: "Profondeur", jouer: function (j, n) {
      n.act = { z: true }; n.dessin();
      j.titre("À ce sommet, quelle est la partie imaginaire (en valeur absolue) ?");
      j.nombre({ avant: "|\\text{Im}| =", apres: "\\text{k}\\Omega", cases: [{ attendu: 2, tol: 0 }], ligne: true,
        aide: function () { return "Le rayon du demi-cercle vaut RM / 2."; },
        ok: function () { j.bravo("RM / 2 = 2 kΩ, au point Re = RE + RM/2 = 3 kΩ."); j.expliquer("<p>\\[\\underline{Z}_{BIO} = R_E + \\frac{R_M}{1 + j R_M C_M \\omega}\\]</p>"); j.suite(); } });
    } }
  ]
});
