/* TD 1, devoir 1 : polymères possibles, fibre pour le ressort, densité du nylon cristallin. */
NIVEAU({
  id: "td1-devoir",
  init: function (fig) {
    var C = D.C, svg = fig.svg, g = E.s("g", null, svg);
    var n = { barres: {} };
    var L = [["A", -120, -75, 0], ["B", -120, -75, 0.1], ["C", 80, 175, 0], ["D", 175, 175, 0], ["E", -20, 175, 0.9], ["F", 175, -80, 0.9], ["G", 175, 275, 0], ["H", 50, 275, 0.9], ["I", 175, 275, 0.9], ["J", 75, 275, 0]];
    n.dessin = function () {
      E.vider(g);
      ["", "Tg", "Tf", "X"].forEach(function (h, i) { D.texte(g, h, [140 + i * 140, 70], { taille: 19, coul: C.doux }); });
      L.forEach(function (r, k) {
        var y = 110 + k * 47, barre = n.barres[r[0]];
        r.forEach(function (v, i) { D.texte(g, i ? E.fmt(v, i === 3 && v % 1 ? 1 : 0) : v, [140 + i * 140, y], { taille: 20, mono: i > 0, coul: barre ? C.gris : C.encre }); });
        if (barre) D.ligne(g, [110, y], [600, y], C.ko, 3);
      });
    };
    n.dessin();
    return n;
  },
  etapes: [
    { nom: "Impossible", jouer: function (j, n) {
      j.titre("Le polymère F a Tg = 175 °C et Tf = −80 °C. Pourquoi ne peut-il pas exister ?");
      j.choix([
        { html: "Sa Tf est inférieure à sa Tg", juste: true },
        { html: "Son X est trop élevé", aide: "E a aussi X = 0,9 et il existe. Compare Tg et Tf." },
        { html: "Sa Tg est trop haute", aide: "I a aussi Tg = 175 °C. Compare Tg et Tf." }
      ], { colonnes: 1, ok: function () { n.barres.F = 1; n.dessin(); j.bravo("Il faut Tf > Tg."); j.suite(); } });
    } },
    { nom: "Cristallin à 20 °C ?", jouer: function (j, n) {
      j.titre("B : Tg = −120 °C, Tf = −75 °C, X = 0,1 à 20 °C. Pourquoi l'élimine-t-on ?");
      j.choix([
        { html: "À 20 °C, il est au-dessus de Tf mais encore cristallin : impossible", juste: true },
        { html: "Sa Tf est inférieure à sa Tg", aide: "−75 °C est bien au-dessus de −120 °C." }
      ], { colonnes: 1, ok: function () { n.barres.A = 1; n.barres.B = 1; n.barres.C = 1; n.barres.D = 1; n.barres.G = 1; n.barres.J = 1; n.dessin(); j.bravo("Au-dessus de Tf, X = 0. Avec les amorphes (C, G, J) et D (Tf = Tg), il reste E, H, I."); j.suite(); } });
    } },
    { nom: "La fibre du ressort", jouer: function (j, n) {
      j.titre("Le ressort doit se relâcher quand on chauffe le mécanisme entre 150 et 200 °C (condition de la solution). Parmi E, H et I, quelle fibre choisir ?");
      j.choix([
        { html: "E", juste: true },
        { html: "H", aide: "H fond à 275 °C : entre 150 et 200 °C, il reste cristallin et rigide." },
        { html: "I", aide: "I fond à 275 °C, comme H." }
      ], { ok: function () { n.barres.H = 1; n.barres.I = 1; n.dessin(); j.bravo("E fond à 175 °C : la fibre lâche, le ressort se détend."); j.suite(); } });
    } },
    { nom: "Le nylon cristallin", jouer: function (j, n) {
      j.titre("Un nylon à X = 0,33 a une densité de 1,11 g/cm³ ; sa phase amorphe, 1,07 g/cm³. Densité du nylon cristallin à 100 % ?");
      j.nombre({ avant: "\\rho_c =", apres: "\\text{g/cm}^3", cases: [{ attendu: 1.19, tol: 0.005 }], ligne: true,
        aide: function () { return "1,11 = 0,33 ρc + 0,67 × 1,07."; },
        ok: function () { j.bravo("ρc ≈ 1,19 g/cm³."); j.expliquer("<p>\\[\\rho_c = \\frac{\\rho - (1 - X)\\rho_a}{X}\\]</p>"); j.suite(); } });
    } }
  ]
});
