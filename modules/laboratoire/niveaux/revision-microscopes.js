/* Révision du chapitre 5 : types de microscopes, optique, entretien, agitateur, dans des situations nouvelles. */
NIVEAU(LABO.rejouable({
  id: "revision-microscopes",
  init: function (fig) {
    var A = LABO, g = A.s("g", null, fig.svg);
    return { g: g, pl: { P: function (v) { return v; } } };
  },
  etapes: [
    { nom: "Des cristaux", jouer: function (j, n) {
      var A = LABO, C = A.C; A.vider(n.g);
      A.s("circle", { cx: 340, cy: 280, r: 200, fill: "#16181f", stroke: C.encre, "stroke-width": 6 }, n.g);
      [[280, 220, "#ffd43b"], [400, 300, "#74c0fc"], [320, 360, "#ff8787"]].forEach(function (c) { A.s("polygon", { points: [c[0], c[1] - 40, c[0] + 40, c[1], c[0], c[1] + 40, c[0] - 40, c[1]].join(","), fill: c[2] }, n.g); });
      j.titre("Dans un sédiment urinaire, on veut identifier des cristaux d'acide urique. Quel microscope ?");
      j.choix([
        { html: "Polarisant", juste: true },
        { html: "Inversé", aide: "L'inversé sert aux cultures cellulaires." },
        { html: "À effet tunnel", aide: "Il voit les atomes, en recherche." }
      ], { colonnes: 3, ok: function () { j.bravo("Polarisant : oxalate de calcium, acide urique, struvite, cystine."); j.suite(); } });
    } },
    { nom: "Le plus fort grossissement", jouer: function (j, n) {
      var A = LABO; A.vider(n.g); A.icone(n.g, "microscope", [340, 230], 220, A.C.jeu);
      A.texte(n.g, "objectif 100× à immersion · oculaire 10×", [340, 430], { taille: 24, gras: 800 });
      j.titre("Quel est le grossissement total ?");
      j.nombre({ avant: "G =", cases: [{ attendu: 1000, tol: 0 }],
        aide: function () { return "Objectif × oculaire."; },
        ok: function () { j.bravo("1 000 fois. Et l'huile s'essuie après chaque utilisation."); j.suite(); } });
    } },
    { nom: "Où le ranger ?", jouer: function (j, n) {
      var A = LABO; A.vider(n.g); A.icone(n.g, "microscope", [340, 260], 240, A.C.jeu);
      j.titre("Quel emplacement convient le mieux pour installer un microscope ?");
      j.choix([
        { html: "À côté de la centrifugeuse, pour gagner de la place", aide: "Les centrifugeuses vibrent." },
        { html: "Près de l'évier, pour rincer les lames", aide: "Le cours demande de l'éloigner des points d'eau." },
        { html: "Dans un local sec et fermé à clé, loin des vibrations et du soleil", juste: true }
      ], { colonnes: 1, ok: function () { j.bravo("Sec, propre, fermé, loin des vibrations, de l'eau, des produits chimiques et du soleil."); j.suite(); } });
    } },
    { nom: "Ce que fait l'oculaire", jouer: function (j, n) {
      var A = LABO, C = A.C; A.vider(n.g);
      A.s("ellipse", { cx: 340, cy: 280, rx: 20, ry: 120, fill: C.froidPale, stroke: C.froid, "stroke-width": 4 }, n.g);
      A.texte(n.g, "oculaire", [340, 450], { taille: 24, gras: 800, coul: C.froid });
      j.titre("Comment l'oculaire fonctionne-t-il ?");
      j.choix([
        { html: "Comme une loupe : il grossit l'image donnée par l'objectif", juste: true },
        { html: "Il remet l'image à l'endroit", aide: "L'image finale reste renversée par rapport à l'objet." },
        { html: "Il concentre la lumière sur l'échantillon", aide: "C'est le rôle du condenseur." }
      ], { colonnes: 1, ok: function () { j.bravo("Une loupe : il donne l'image virtuelle finale."); j.suite(); } });
    } },
    { nom: "Entretien de l'agitateur", jouer: function (j, n) {
      var A = LABO; A.vider(n.g); A.icone(n.g, "feu", [340, 260], 200, A.C.chaud);
      j.titre("Pour le nettoyage mensuel de l'agitateur chauffant, dans quelle position garder l'appareil ?");
      j.choix([
        { html: "Verticale, pour que le produit n'atteigne pas l'intérieur", juste: true },
        { html: "Retourné, plaque en bas", aide: "Retourné, c'est pour remplacer la céramique, pas pour nettoyer." },
        { html: "À plat, plaque encore chaude pour sécher plus vite", aide: "On le débranche et on le laisse refroidir ; il doit être sec avant d'être rebranché." }
      ], { colonnes: 1, ok: function () { j.bravo("Verticale, détergent doux, et bien sec avant de rebrancher."); j.suite(); } });
    } }
  ]
}));
