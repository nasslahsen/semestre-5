/* Niveau : analyseurs de la coagulation (4.10) : principes de détection, cupules, INR, ictère, Clauss, D-dimères. */
NIVEAU(LABO.rejouable({
  id: "coagulometres",
  init: function (fig) {
    var A = LABO, g = A.s("g", null, fig.svg);
    return { g: g, pl: { P: function (v) { return v; } } };
  },
  etapes: [
    { nom: "Trois façons de voir le caillot", jouer: function (j, n) {
      var A = LABO;
      j.titre("Relie chaque méthode de détection à son principe.");
      j.consigne("Touche une méthode, puis son principe.");
      var p = A.paires({
        g: n.g, gauche: ["Viscosimétrie", "Chromogénique", "Immunologique"],
        droite: ["Latex couvert d'anticorps qui s'agglutine", "Bille magnétique qui cesse de bouger", "Substrat qui libère une couleur (pNA)"],
        bon: [1, 2, 0], xg: 20, wg: 260, xd: 340, wd: 320, y0: 90, h: 110, pas: 160, taille: 20,
        erreur: function (m) { j.erreur(m); },
        aide: function (i) { return ["Une méthode mécanique : le caillot freine un mouvement.", "Une enzyme coupe un substrat coloré.", "Des anticorps, comme en turbidimétrie."][i]; },
        fin: function () { j.bravo("Bille, couleur, agglutination."); j.suite(); }
      });
      j.reponse(function () { p.resoudre(); });
    } },
    { nom: "Les cupules", jouer: function (j, n) {
      var A = LABO, C = A.C; A.vider(n.g);
      [0, 1, 2, 3].forEach(function (i) { A.s("rect", { x: 130 + i * 110, y: 230, width: 80, height: 110, rx: 12, fill: "#fff", stroke: C.encre, "stroke-width": 3 }, n.g); });
      A.texte(n.g, "cupules à usage unique", [340, 400], { taille: 22, gras: 800 });
      j.titre("Pourquoi les réactions se font-elles dans des cupules jetées après chaque test ?");
      j.choix([
        { html: "Pour éviter toute contamination croisée d'un échantillon à l'autre", juste: true },
        { html: "Parce que le plastique accélère la coagulation", aide: "Le cours ne parle pas d'effet du plastique : pense à ce qui resterait dans une cupule réutilisée." },
        { html: "Pour économiser du réactif", aide: "Jeter les cupules coûte plutôt plus cher. La raison est la qualité du résultat." }
      ], { colonnes: 1, ok: function () { j.bravo("Pas de résidus de réactifs ni de fibrine d'un test à l'autre."); j.suite(); } });
    } },
    { nom: "Calculer l'INR", jouer: function (j, n) {
      var A = LABO, C = A.C; A.vider(n.g);
      [["patient", "30 s"], ["témoin", "12 s"], ["ISI", "1,0"]].forEach(function (r, i) {
        A.boite(n.g, 120, 100 + i * 130, 440, 100, { fond: "#fff", bord: C.encre, ep: 2.5, rx: 14 });
        A.texte(n.g, r[0], [230, 158 + i * 130], { taille: 26, gras: 800 });
        A.texte(n.g, r[1], [440, 158 + i * 130], { taille: 26, gras: 800, coul: C.jeu });
      });
      j.titre("Un patient sous antivitamine K a un TP de 30 s ; le témoin est à 12 s et le réactif a un ISI de 1,0. Quel est son INR ?");
      j.nombre({ avant: "\\text{INR} =", cases: [{ attendu: 2.5, tol: 0.005 }],
        aide: function () { return "INR = (TP patient / TP témoin) puissance ISI ; avec un ISI de 1, la puissance ne change rien."; },
        ok: function () { j.bravo("INR = 2,5."); j.suite(); } });
    } },
    { nom: "Un plasma ictérique", jouer: function (j, n) {
      var A = LABO, C = A.C; A.vider(n.g);
      A.tube(n.g, 290, 130, { bouchon: "citrate", w: 100, h: 320, couches: [{ h: 0.35, coul: C.sang }, { h: 0.45, coul: "#e8c22a" }] });
      A.texte(n.g, "plasma très jaune (ictère)", [340, 500], { taille: 22, gras: 800 });
      j.titre("Le plasma est très ictérique et légèrement hémolysé. Quelle détection du caillot le cours dit-elle insensible à ces interférences ?");
      j.choix([
        { html: "La viscosimétrie", juste: true },
        { html: "La méthode chromogénique", aide: "Elle lit une couleur : un plasma très jaune la gêne." },
        { html: "La méthode immunologique", aide: "Elle lit un trouble, optiquement." }
      ], { colonnes: 1, ok: function () { j.bravo("Viscosimétrie : une mesure mécanique, pas optique."); j.suite(); } });
    } },
    { nom: "Le fibrinogène", jouer: function (j, n) {
      var A = LABO, C = A.C; A.vider(n.g); A.icone(n.g, "horloge", [340, 240], 200, C.jeu);
      j.titre("Méthode de Clauss : le plasma d'un patient coagule bien plus lentement que celui du témoin. Que peux-tu prévoir ?");
      j.choix([
        { html: "Son fibrinogène est plus bas", juste: true },
        { html: "Son fibrinogène est plus haut", aide: "Le cours parle d'une relation inverse entre le temps et la concentration." },
        { html: "On ne peut rien dire sans l'INR", aide: "L'INR concerne le TP. Pour le fibrinogène, la relation temps-concentration suffit." }
      ], { colonnes: 1, ok: function () { j.bravo("Plus le temps est long, moins il y a de fibrinogène."); j.expliquer("<p>\\(\\log C = \\alpha \\log t + b\\), avec une pente négative : l'automate lit la concentration sur la droite d'étalonnage en log-log.</p>"); j.suite(); } });
    } }
  ]
}));
