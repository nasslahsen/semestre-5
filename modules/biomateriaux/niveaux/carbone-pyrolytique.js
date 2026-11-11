/* Niveau : carbone pyrolytique. Formes du carbone, module selon la densité (lecture de courbe), rupture, valves, conductivité. */
NIVEAU({
  id: "carbone-pyrolytique",
  init: function (fig) {
    var C = D.C, svg = fig.svg, g = E.s("g", null, svg), B = window.BIO;
    var n = { d: 1.45, vue: "couches" };
    var X0 = 120, W = 460, Y0 = 470, H = 300;
    function X(v) { return X0 + (v - 1.4) / 0.45 * W; }
    n.dessin = function () {
      E.vider(g);
      if (n.vue === "couches") {
        // feuillets de graphène empilés irrégulièrement
        D.texte(g, "carbone pyrolytique : feuillets empilés irrégulièrement", [340, 120], { taille: 18, coul: C.doux, gras: false });
        for (var c = 0; c < 5; c++) {
          var y = 200 + c * 70, dx = [0, 18, -12, 26, 6][c], pts = [];
          for (var i = 0; i < 9; i++) pts.push([120 + dx + i * 55, y + (i % 2 ? 14 : 0)]);
          E.s("polyline", { points: pts.map(function (p) { return p.join(","); }).join(" "), fill: "none", stroke: C.encre, "stroke-width": 3 }, g);
          pts.forEach(function (p) { D.rond(g, p, 8, { fill: "#3a3d46" }); });
        }
        return;
      }
      var E_ = B.pyroModule, Y = function (v) { return Y0 - (v - 16) / 12 * H; };
      D.fleche(g, [X0, Y0], [X0 + W + 30, Y0], C.encre, 3); D.fleche(g, [X0, Y0], [X0, Y0 - H - 30], C.encre, 3);
      D.texte(g, "module (GPa)", [X0 + 10, Y0 - H - 45], { taille: 17, ancre: "start", gras: false });
      D.texte(g, "densité (g/cm³)", [X0 + W / 2, Y0 + 55], { taille: 17, gras: false });
      [1.4, 1.6, 1.8].forEach(function (v) { D.ligne(g, [X(v), Y0], [X(v), Y0 + 8], C.encre, 2); D.texte(g, E.fmt(v, 1), [X(v), Y0 + 26], { taille: 16, gras: false, mono: true }); });
      [16, 20, 24, 28].forEach(function (v) { D.ligne(g, [X0 - 8, Y(v)], [X0, Y(v)], C.encre, 2); D.texte(g, String(v), [X0 - 28, Y(v)], { taille: 16, gras: false, mono: true }); });
      var pts = [];
      for (var v = 1.4; v <= 1.851; v += 0.01) pts.push(X(v).toFixed(1) + "," + Y(E_(v)).toFixed(1));
      E.s("polyline", { points: pts.join(" "), fill: "none", stroke: C.jeu, "stroke-width": 5 }, g);
      var e = E_(n.d);
      D.ligne(g, [X(n.d), Y0], [X(n.d), Y(e)], C.doux, 2, "6 5"); D.ligne(g, [X0, Y(e)], [X(n.d), Y(e)], C.doux, 2, "6 5");
      D.rond(g, [X(n.d), Y(e)], 11, { fill: D.C.acc, stroke: "#fff", ep: 3 });
      fig.chip("E ≈ " + E.fmt(e, 1) + " GPa");
    };
    n.dessin();
    return n;
  },
  etapes: [
    { nom: "Quasi cristallin", jouer: function (j, n) {
      j.fig.astuce("");
      j.titre("Le carbone existe sous des formes cristallines, non cristalline et quasi cristalline. Laquelle est quasi cristalline ?");
      j.choix([
        { html: "Le diamant", aide: "Le diamant est cristallin, comme le graphite." },
        { html: "Le carbone vitreux", aide: "Le carbone vitreux est non cristallin." },
        { html: "Le carbone pyrolytique", juste: true }
      ], { ok: function () { j.bravo("Le carbone pyrolytique."); j.expliquer("<p>Seul le carbone pyrolytique est largement utilisé dans les implants, surtout en <b>revêtement</b>. C'est un matériau synthétique, inexistant dans la nature, fait de couches de graphène empilées moins régulièrement que dans le graphite.</p>"); j.suite(); } });
    } },
    { nom: "Viser un module", jouer: function (j, n) {
      n.vue = "courbe"; n.dessin();
      j.fig.astuce("Règle la densité.");
      j.titre("D'après la courbe du cours, quelle densité faut-il pour un module d'environ 24 GPa ? Règle-la.");
      var fini = false, B = window.BIO;
      var gagne = function () {
        if (fini) return; fini = true; n.d = 1.7; n.dessin();
        j.bravo("Vers 1,7 g/cm³.");
        j.expliquer("<p>Le module de Young du carbone pyrolytique augmente avec sa densité : environ 17 GPa vers 1,4 g/cm³, environ 28 GPa vers 1,85 g/cm³ (courbes LTI Pyrolite ; l'axe est gradué en MPa sur la diapositive).</p>");
        j.suite();
      };
      j.curseur({ nom: "Densité", min: 1.4, max: 1.85, pas: 0.05, val: 1.45, dec: 2, unite: " g/cm³", change: function (v) { if (fini) return; n.d = v; n.dessin(); if (Math.abs(B.pyroModule(v) - 24) < 0.6) gagne(); } });
      j.reponse(gagne);
    } },
    { nom: "La rupture", jouer: function (j, n) {
      j.fig.chip(null); j.fig.astuce("");
      j.titre("Sur la deuxième courbe du cours, la limite de rupture vaut environ 430 MPa à 1,7 g/cm³ et 490 MPa à 1,8 g/cm³. Estime-la à 1,75 g/cm³, à mi-chemin.");
      j.nombre({ avant: "R_r \\approx", apres: "\\text{MPa}", cases: [{ attendu: 460, tol: 5 }], ligne: true,
        aide: function () { return "À mi-chemin : la moyenne de 430 et 490."; },
        ok: function () { j.bravo("Environ 460 MPa."); j.expliquer("<p>Module et limite de rupture augmentent avec la densité : un pyrocarbone plus dense est plus rigide et plus résistant.</p>"); j.suite(); } });
    } },
    { nom: "Pourquoi les valves ?", jouer: function (j, n) {
      j.titre("Pourquoi le carbone pyrolytique est-il si utilisé dans les valves cardiaques ?");
      j.choix([
        { html: "Les implants couverts de carbone pyrolytique sont biocompatibles avec le sang", juste: true },
        { html: "Il est résorbable", aide: "Une valve doit durer : le carbone pyrolytique est bio-inerte." },
        { html: "Il est transparent", aide: "Le carbone pyrolytique est noir et opaque." }
      ], { colonnes: 1, ok: function () { j.bravo("Compatible avec le sang."); j.expliquer("<p>On trouve des valves à disque en carbone pyrolytique et des valves entièrement en carbone pyrolytique.</p>"); j.suite(); } });
    } },
    { nom: "Trouve l'erreur", jouer: function (j, n) {
      n.vue = "couches"; n.dessin();
      j.titre("Un camarade écrit : « Comme toutes les céramiques, le carbone pyrolytique est un isolant électrique. » Où est l'erreur ?");
      j.choix([
        { html: "Dans ses feuillets, des électrons de valence sont libres : il conduit bien l'électricité", juste: true },
        { html: "Ce n'est pas une céramique, c'est un métal", aide: "C'est bien une céramique : un corps simple du carbone, inorganique." },
        { html: "Il n'y a pas d'erreur", aide: "Relis la description du réseau : matrice hexagonale, liaisons covalentes, électrons..." }
      ], { colonnes: 1, ok: function () { j.bravo("Électrons libres dans les plans : bonne conductivité."); j.suite(); } });
    } }
  ]
});
