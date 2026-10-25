/* Niveau : la lumière et la matière (3.1, 3.9) : λ = C / ν, domaines, transitions, devenir de la lumière, V0 = C / N. */
NIVEAU(LABO.rejouable({
  id: "lumiere",
  init: function (fig) {
    var A = LABO, g = A.s("g", null, fig.svg);
    return { g: g, pl: { P: function (v) { return v; } } };
  },
  etapes: [
    { nom: "De la fréquence à la longueur d'onde", jouer: function (j, n) {
      var A = LABO, C = A.C; A.vider(n.g);
      var pts = []; for (var x = 60; x <= 620; x += 4) pts.push([x, 260 + 70 * Math.sin(2 * Math.PI * (x - 60) / 110)]);
      A.s("polyline", { points: pts.map(function (p) { return p.join(","); }).join(" "), fill: "none", stroke: C.jeu, "stroke-width": 5 }, n.g);
      A.texte(n.g, "ν = 6 × 10¹⁴ Hz", [340, 420], { taille: 28, gras: 800 });
      j.titre("Une lampe émet une radiation de fréquence \\(6 \\times 10^{14}\\) Hz. Quelle est sa longueur d'onde, en nanomètres ?");
      j.nombre({ avant: "\\lambda =", apres: "\\text{nm}", cases: [{ attendu: 500, tol: 0.5 }],
        aide: function () { return "λ = C / ν, avec C = 3 × 10⁸ m/s. Le résultat sort en mètres : 1 nm = 10⁻⁹ m."; },
        ok: function () {
          j.bravo("500 nm : du vert-bleu, dans le visible.");
          j.expliquer("<p>\\(\\lambda = \\dfrac{3 \\times 10^{8}}{6 \\times 10^{14}} = 5 \\times 10^{-7}\\) m \\(= 500\\) nm. Plus la fréquence est grande, plus la longueur d'onde est courte.</p>");
          j.suite();
        } });
    } },
    { nom: "Quel domaine ?", jouer: function (j, n) {
      var A = LABO, C = A.C; A.vider(n.g); A.icone(n.g, "lampe", [340, 240], 200, C.v);
      A.texte(n.g, "λ = 254 nm", [340, 420], { taille: 30, gras: 800, coul: C.v });
      j.titre("Une lampe de désinfection émet à 254 nm. Dans quel domaine est cette radiation ?");
      j.choix([
        { html: "Ultraviolet", juste: true },
        { html: "Visible", aide: "Le visible commence vers 400 nm." },
        { html: "Infrarouge", aide: "L'infrarouge est au-delà du rouge, après 700 nm." }
      ], { colonnes: 3, ok: function () { j.bravo("Ultraviolet : en dessous de 400 nm."); j.suite(); } });
    } },
    { nom: "Quelle transition ?", jouer: function (j, n) {
      var A = LABO;
      j.titre("Chaque domaine du rayonnement provoque un type de transition dans la molécule. Relie-les.");
      j.consigne("Touche un domaine, puis sa transition.");
      var p = A.paires({
        g: n.g, gauche: ["UV et visible", "Infrarouge", "Hyperfréquences"],
        droite: ["Transition rotationnelle", "Transition électronique", "Transition vibrationnelle"],
        bon: [1, 2, 0], xg: 20, wg: 280, xd: 380, wd: 280, y0: 90, h: 110, pas: 160, taille: 20,
        erreur: function (m) { j.erreur(m); },
        aide: function (i) { return ["Le rayonnement le plus énergétique fait changer l'énergie la plus grande, l'énergie électronique.", "Énergie intermédiaire : la vibration.", "Énergie la plus faible : la rotation."][i]; },
        fin: function () {
          j.bravo("Électronique, vibrationnelle, rotationnelle.");
          j.expliquer("<p>\\(E = E_r + E_v + E_e\\) avec \\(E_e \\gg E_v \\gg E_r\\) : plus le rayonnement est énergétique (onde courte), plus le niveau qu'il excite est élevé.</p>");
          j.suite();
        }
      });
      j.reponse(function () { p.resoudre(); });
    } },
    { nom: "Après l'absorption", jouer: function (j, n) {
      var A = LABO, C = A.C; A.vider(n.g);
      A.s("line", { x1: 120, y1: 420, x2: 560, y2: 420, stroke: C.encre, "stroke-width": 5 }, n.g);
      A.s("line", { x1: 120, y1: 160, x2: 560, y2: 160, stroke: C.encre, "stroke-width": 5 }, n.g);
      A.texte(n.g, "état fondamental", [340, 460], { taille: 20, gras: 700 });
      A.texte(n.g, "état excité", [340, 125], { taille: 20, gras: 700 });
      A.fleche(n.g, [260, 410], [260, 172], { coul: C.jeu, ep: 6 }); A.texte(n.g, "photon absorbé", [170, 290], { taille: 18, gras: 700, coul: C.jeu, largeur: 140 });
      A.texte(n.g, "?", [440, 290], { taille: 60, gras: 800, coul: C.doux });
      j.titre("La molécule a absorbé un photon et se trouve dans un état excité. Comment revient-elle à l'état fondamental ?");
      j.choix([
        { html: "Elle reste excitée tant que la lumière est allumée", aide: "L'état excité n'est pas stable : la molécule rend l'énergie reçue." },
        { html: "En émettant de la chaleur ou de la lumière (fluorescence)", juste: true },
        { html: "En se cassant en deux molécules", aide: "Le cours décrit un retour à l'état fondamental, pas une réaction." }
      ], { colonnes: 1, ok: function () { j.bravo("Chaleur, ou lumière : c'est la fluorescence."); j.suite(); } });
    } },
    { nom: "Plus lente dans le verre", jouer: function (j, n) {
      var A = LABO, C = A.C; A.vider(n.g);
      A.s("rect", { x: 250, y: 120, width: 180, height: 360, rx: 10, fill: C.froidPale, stroke: C.froid, "stroke-width": 4 }, n.g);
      A.fleche(n.g, [40, 300], [240, 300], { coul: C.jeu, ep: 6 }); A.fleche(n.g, [440, 300], [640, 300], { coul: C.jeu, ep: 6 });
      A.texte(n.g, "N = 1,5", [340, 300], { taille: 28, gras: 800, coul: C.froid });
      j.titre("La lumière traverse une cuve en verre d'indice de réfraction 1,5. À quelle vitesse y va-t-elle ?");
      j.nombre({ avant: "V_0 =", apres: "\\times 10^{8}\\ \\text{m/s}", cases: [{ attendu: 2, tol: 0.01 }],
        aide: function () { return "V₀ = C / N, avec C = 3 × 10⁸ m/s."; },
        ok: function () { j.bravo("2 × 10⁸ m/s : un tiers plus lent que dans le vide."); j.suite(); } });
    } }
  ]
}));
