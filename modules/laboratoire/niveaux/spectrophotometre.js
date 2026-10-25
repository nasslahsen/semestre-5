/* Niveau : le spectrophotomètre (3.9) : ordre des éléments, lampe et cuve, détecteurs, installation, bonnes pratiques. */
NIVEAU(LABO.rejouable({
  id: "spectrophotometre",
  init: function (fig) {
    var A = LABO, g = A.s("g", null, fig.svg);
    return { g: g, pl: { P: function (v) { return v; } } };
  },
  etapes: [
    { nom: "Le trajet de la lumière", jouer: function (j, n) {
      var A = LABO, C = A.C;
      j.titre("Remets les éléments du spectrophotomètre dans l'ordre où la lumière les traverse.");
      j.consigne("Touche les éléments dans l'ordre.");
      var N = ["Porte-échantillons", "Système de lecture", "Source lumineuse", "Détecteur", "Monochromateur"];
      var t = A.trace({
        g: n.g, coul: C.jeu, taille: 22, fleches: false,
        noeuds: N.map(function (x, i) { return { t: x, x: 140, y: 40 + i * 108, w: 400, h: 84 }; }),
        ordre: [2, 4, 0, 3, 1],
        erreur: function (m) { j.erreur(m); },
        aide: function (i, att, k) { return ["D'abord, il faut de la lumière.", "Avant l'échantillon, on ne garde qu'une longueur d'onde.", "La lumière choisie traverse l'échantillon.", "Ce qui ressort est transformé en signal électrique.", "Il reste à afficher le résultat."][k]; },
        fin: function () { j.bravo("Source, monochromateur, cuve, détecteur, lecture."); j.suite(); }
      });
      j.reponse(function () { t.resoudre(); });
    } },
    { nom: "Lire dans l'UV", jouer: function (j, n) {
      var A = LABO, C = A.C; A.vider(n.g); A.icone(n.g, "lampe", [340, 240], 200, C.v);
      A.texte(n.g, "λ = 260 nm", [340, 420], { taille: 30, gras: 800, coul: C.v });
      j.titre("On veut mesurer une absorbance à 260 nm. Quelle lampe et quelle cuve ?");
      j.choix([
        { html: "Tungstène et cuve en plastique", aide: "Le tungstène émet dans le visible, à partir de 350 nm." },
        { html: "Deutérium et cuve en verre", aide: "La lampe convient. Mais le cours impose une matière précise pour la cuve sous 310 nm." },
        { html: "Deutérium et cuve en quartz", juste: true }
      ], { colonnes: 1, ok: function () { j.bravo("Deutérium (190 à 400 nm) et quartz, obligatoire sous 310 nm."); j.suite(); } });
    } },
    { nom: "Les détecteurs", jouer: function (j, n) {
      var A = LABO;
      j.titre("Relie chaque détecteur à ce qui le caractérise.");
      j.consigne("Touche un détecteur, puis sa description.");
      var p = A.paires({
        g: n.g, gauche: ["Photodiode", "Barrette de diodes", "Photomultiplicateur"],
        droite: ["Mesure tout le spectre en même temps", "Jusqu'à 10⁶ électrons pour un électron arraché", "Un photon crée une paire électron-trou"],
        bon: [2, 0, 1], xg: 20, wg: 260, xd: 340, wd: 320, y0: 90, h: 110, pas: 160, taille: 19,
        erreur: function (m) { j.erreur(m); },
        aide: function (i) { return ["Le capteur le plus simple : un semi-conducteur.", "Beaucoup de petites photodiodes alignées.", "Des dynodes en cascade multiplient les électrons."][i]; },
        fin: function () { j.bravo("Photodiode, barrette, photomultiplicateur."); j.suite(); }
      });
      j.reponse(function () { p.resoudre(); });
    } },
    { nom: "La tension du secteur", jouer: function (j, n) {
      var A = LABO, C = A.C; A.vider(n.g); A.icone(n.g, "eclair", [340, 230], 200, C.jeu);
      A.texte(n.g, "plaque de l'appareil : 230 V", [340, 420], { taille: 24, gras: 800 });
      j.titre("Lors de l'inspection annuelle, quelle est la tension la plus basse acceptable pour un appareil prévu pour 230 V ?");
      j.nombre({ avant: "U_{\\min} =", apres: "\\text{V}", cases: [{ attendu: 218.5, tol: 0.05 }],
        aide: function () { return "La tension ne doit pas s'écarter de plus de 5 % de celle de la plaque."; },
        ok: function () { j.bravo("218,5 V : 230 V moins 5 %."); j.expliquer("<p>\\(230 \\times 0{,}95 = 218{,}5\\) V. La prise doit aussi être reliée à la terre, en bon état, à moins de 1,5 m de l'appareil.</p>"); j.suite(); } });
    } },
    { nom: "Trouve l'erreur", jouer: function (j, n) {
      var A = LABO; A.vider(n.g); A.icone(n.g, "document", [340, 260], 200, A.C.jeu);
      j.titre("Une stagiaire décrit sa série de mesures. Quelle phrase va contre les bonnes pratiques ?");
      j.choix([
        { html: "« J'ai étalonné avant la nouvelle série. »", aide: "C'est exactement la règle." },
        { html: "« J'ai fermé le couvercle pendant la mesure. »", aide: "C'est ce qui assure une lecture correcte." },
        { html: "« J'ai mesuré l'échantillon dans un solvant organique avec une cuve en plastique. »", juste: true },
        { html: "« J'ai préparé les étalons dans du verre borosilicaté. »", aide: "C'est la verrerie recommandée." }
      ], { colonnes: 1, ok: function () { j.bravo("Pas de cuve en plastique avec des solvants organiques."); j.suite(); } });
    } }
  ]
}));
