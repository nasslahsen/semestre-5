/* Révision du chapitre 3 : photométrie, turbidimétrie, potentiométrie, spectrophotomètre, eau, dans des situations nouvelles. */
NIVEAU(LABO.rejouable({
  id: "revision-biochimie",
  init: function (fig) {
    var A = LABO, g = A.s("g", null, fig.svg);
    return { g: g, pl: { P: function (v) { return v; } } };
  },
  etapes: [
    { nom: "Ce qui passe encore", jouer: function (j, n) {
      var A = LABO, C = A.C; A.vider(n.g);
      A.s("rect", { x: 250, y: 150, width: 180, height: 260, rx: 8, fill: "rgba(201,42,42,0.45)", stroke: C.encre, "stroke-width": 3 }, n.g);
      A.texte(n.g, "A = 0,5", [340, 470], { taille: 30, gras: 800, coul: C.jeu });
      j.titre("Une solution a une absorbance de 0,5. Quel pourcentage de la lumière incidente traverse la cuve ?");
      j.nombre({ avant: "T \\approx", apres: "\\%", cases: [{ attendu: 31.6, tol: 0.2 }],
        aide: function () { return "A = log₁₀(1 / T), donc T = 10 puissance (−A)."; },
        ok: function () { j.bravo("Environ 31,6 %."); j.suite(); } });
    } },
    { nom: "Une protéine sans couleur", jouer: function (j, n) {
      var A = LABO; A.vider(n.g); A.icone(n.g, "tube", [340, 260], 220, A.C.jeu);
      j.titre("On veut doser l'haptoglobine, qui ne donne pas de réaction colorée. Quelle méthode le cours associe-t-il à ce dosage ?");
      j.choix([
        { html: "Potentiométrie", aide: "La potentiométrie dose des ions." },
        { html: "Turbidimétrie ou néphélométrie", juste: true },
        { html: "Méthode cinétique en photométrie", aide: "La cinétique sert à l'activité des enzymes." }
      ], { colonnes: 1, ok: function () { j.bravo("Complexes antigène-anticorps : turbidimétrie ou néphélométrie."); j.suite(); } });
    } },
    { nom: "Un ionogramme", jouer: function (j, n) {
      var A = LABO; A.vider(n.g); A.icone(n.g, "eclair", [340, 260], 200, A.C.jeu);
      j.titre("Sodium, potassium, chlorure : par quel principe l'automate les mesure-t-il ?");
      j.choix([
        { html: "Une tension entre une électrode sélective et une référence", juste: true },
        { html: "La lumière diffusée par les ions", aide: "Les ions sont bien trop petits pour diffuser la lumière comme des complexes immuns." },
        { html: "La réflectance d'une bandelette", aide: "Ce n'est pas ce que le cours décrit pour les électrolytes." }
      ], { colonnes: 1, ok: function () { j.bravo("Potentiométrie : électrodes sélectives aux ions."); j.suite(); } });
    } },
    { nom: "Une cuve de trop", jouer: function (j, n) {
      var A = LABO, C = A.C; A.vider(n.g);
      A.s("rect", { x: 270, y: 150, width: 140, height: 260, rx: 8, fill: "#f2f6ff", stroke: C.encre, "stroke-width": 3 }, n.g);
      A.texte(n.g, "verre", [340, 280], { taille: 26, gras: 800 }); A.texte(n.g, "λ = 300 nm", [340, 470], { taille: 28, gras: 800, coul: C.v });
      j.titre("Une mesure à 300 nm donne une absorbance énorme, même avec de l'eau. La cuve est en verre. Pourquoi ?");
      j.choix([
        { html: "Le verre absorbe sous 310 nm : il faut une cuve en quartz", juste: true },
        { html: "L'eau absorbe à 300 nm", aide: "Le blanc d'eau ne devrait pas donner une absorbance énorme. Regarde la cuve." },
        { html: "La lampe au deutérium est trop forte", aide: "Une lampe plus forte donnerait plus de lumière, pas moins." }
      ], { colonnes: 1, ok: function () { j.bravo("Sous 310 nm, uniquement des cuves en quartz."); j.suite(); } });
    } },
    { nom: "L'eau ultrapure", jouer: function (j, n) {
      var A = LABO, C = A.C; A.vider(n.g); A.icone(n.g, "goutte", [340, 230], 200, C.froid);
      A.texte(n.g, "ρ = 18,2 MΩ·cm", [340, 420], { taille: 30, gras: 800, coul: C.froid });
      j.titre("Une eau ultrapure atteint le maximum théorique de 18,2 MΩ·cm. Quelle est sa conductivité ?");
      j.nombre({ avant: "\\sigma \\approx", apres: "\\mu\\text{S/cm}", cases: [{ attendu: 0.055, tol: 0.001 }],
        aide: function () { return "σ (µS/cm) = 1 / ρ (MΩ·cm)."; },
        ok: function () { j.bravo("Environ 0,055 µS/cm."); j.suite(); } });
    } }
  ]
}));
