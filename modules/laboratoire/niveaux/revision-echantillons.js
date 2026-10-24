/* Révision du chapitre 2 : échantillons, prélèvement, conservation, centrifugation, erreurs, dans des situations nouvelles. */
NIVEAU(LABO.rejouable({
  id: "revision-echantillons",
  init: function (fig) {
    var A = LABO, g = A.s("g", null, fig.svg);
    return { g: g, pl: { P: function (v) { return v; } } };
  },
  etapes: [
    { nom: "Trois tubes", jouer: function (j, n) {
      var A = LABO, C = A.C; A.vider(n.g);
      [["edta", "EDTA"], ["sec", "sec"], ["citrate", "citrate"]].forEach(function (t, i) { A.tube(n.g, 150 + i * 160, 150, { bouchon: t[0], w: 80, h: 280, couches: [{ h: 0.7, coul: C.sang }], etiquette: t[1] }); });
      j.titre("Ce matin, on prélève un EDTA, un sec et un citrate. Remets-les dans l'ordre de remplissage.");
      var res = j.zone("", "");
      var z = j.zone("", '<div style="display:flex;gap:8px;align-items:center">1 <span class="trou" data-attendu="s"></span>2 <span class="trou" data-attendu="c"></span>3 <span class="trou" data-attendu="e"></span></div>');
      j.jetons({
        reserve: res, trous: [].slice.call(z.querySelectorAll(".trou")),
        jetons: [{ id: "e", html: "EDTA" }, { id: "s", html: "Sec" }, { id: "c", html: "Citrate" }],
        aide: "Le tube sans additif d'abord ; le citrate avant tout autre anticoagulant ; l'EDTA après.",
        ok: function () { j.bravo("Sec, citrate, EDTA."); j.expliquer("<p>Dans le désordre, de l'EDTA entraîné dans le citrate fausserait les résultats de coagulation.</p>"); j.suite(); }
      });
    } },
    { nom: "Une hémoculture de nuit", jouer: function (j, n) {
      var A = LABO; A.vider(n.g); A.icone(n.g, "frigo", [340, 260], 200, A.C.froid);
      j.titre("À 3 h du matin, une infirmière veut mettre un flacon d'hémoculture au réfrigérateur jusqu'au passage du coursier. Que lui dis-tu ?");
      j.choix([
        { html: "Bonne idée : le froid garde les bactéries", aide: "On veut les bactéries vivantes : quelle température le cours donne-t-il pour une hémoculture ?" },
        { html: "Non : 35 à 37 °C, jamais réfrigérer", juste: true },
        { html: "Il faut le congeler à −20 °C", aide: "Encore plus froid, encore pire pour des bactéries qu'on veut cultiver." }
      ], { colonnes: 1, ok: function () { j.bravo("Hémoculture : 35 à 37 °C, jamais au froid."); j.suite(); } });
    } },
    { nom: "Une autre centrifugeuse", jouer: function (j, n) {
      var A = LABO; A.vider(n.g); A.icone(n.g, "centrifugeuse", [340, 260], 220, A.C.jeu);
      j.titre("Une centrifugeuse de paillasse a un rotor de 10 cm et tourne à 4 000 tours par minute. Quelle force centrifuge relative ?");
      j.nombre({ avant: "\\text{RCF} \\approx", apres: "\\times g", cases: [{ attendu: 1788.8, tol: 3 }],
        aide: function () { return "RCF = 1,118 × 10⁻⁵ × r × N², r en centimètres, N en tours par minute."; },
        ok: function () { j.bravo("Environ 1 789 × g."); j.expliquer("<p>\\(1{,}118 \\times 10^{-5} \\times 10 \\times 4\\,000^2 \\approx 1\\,789 \\times g\\) : un peu court pour un sérum (2 000 à 2 500 × g).</p>"); j.suite(); } });
    } },
    { nom: "Un TP surprenant", jouer: function (j, n) {
      var A = LABO, C = A.C; A.vider(n.g);
      A.tube(n.g, 290, 130, { bouchon: "citrate", w: 100, h: 320, couches: [{ h: 0.4, coul: C.sang }] });
      A.texte(n.g, "rempli à moitié", [340, 500], { taille: 22, gras: 700, coul: C.ko });
      j.titre("Le TP et le TCA d'un patient sans traitement sortent anormaux. Le tube citrate est à moitié rempli. Qu'en conclus-tu ?");
      j.choix([
        { html: "Le patient a un trouble de la coagulation", aide: "Avant de conclure sur le patient, regarde le tube." },
        { html: "Rapport sang / anticoagulant incorrect : résultat faussé, nouveau prélèvement", juste: true },
        { html: "Il suffit de centrifuger plus longtemps", aide: "La centrifugation ne corrige pas une erreur de remplissage." }
      ], { colonnes: 1, ok: function () { j.bravo("Erreur de prélèvement : tube citrate sous-rempli."); j.suite(); } });
    } },
    { nom: "Cinq ans de stockage", jouer: function (j, n) {
      var A = LABO; A.vider(n.g); A.icone(n.g, "flocon", [340, 260], 200, A.C.froid);
      j.titre("Une étude de biologie moléculaire veut garder des extraits d'ADN pendant des années. Quelle conservation ?");
      j.choix([
        { html: "+2 à +8 °C", aide: "C'est la courte durée." },
        { html: "−20 °C", aide: "C'est la moyenne durée, pour des aliquotes." },
        { html: "−70 à −80 °C", juste: true }
      ], { colonnes: 3, ok: function () { j.bravo("−70 à −80 °C : longue durée, biologie moléculaire et virologie."); j.suite(); } });
    } }
  ]
}));
