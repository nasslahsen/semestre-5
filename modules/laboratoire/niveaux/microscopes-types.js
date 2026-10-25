/* Niveau : types de microscopes (chapitre 5, I) : usages, fond clair, effet tunnel, électronique, chambre noire. */
NIVEAU(LABO.rejouable({
  id: "microscopes-types",
  init: function (fig) {
    var A = LABO, g = A.s("g", null, fig.svg);
    return { g: g, pl: { P: function (v) { return v; } } };
  },
  etapes: [
    { nom: "À chacun son usage", jouer: function (j, n) {
      var A = LABO;
      j.titre("Relie chaque microscope à l'usage que le cours lui donne.");
      j.consigne("Touche un microscope, puis son usage.");
      var p = A.paires({
        g: n.g, gauche: ["Fond noir", "Fluorescence", "Inversé", "Polarisant"],
        droite: ["Cultures cellulaires, en virologie", "Cristaux d'un sédiment urinaire", "Observer le vivant", "Immunofluorescence indirecte"],
        bon: [2, 3, 0, 1], xg: 20, wg: 240, xd: 320, wd: 340, y0: 60, h: 104, pas: 134, taille: 20,
        erreur: function (m) { j.erreur(m); },
        aide: function (i) { return ["Le contraste augmenté sert à voir sans colorer, donc sans tuer.", "L'immunologie marque des anticorps.", "L'objectif est sous la platine : on regarde le fond d'un flacon.", "La lumière polarisée fait s'allumer certains solides."][i]; },
        fin: function () { j.bravo("Vivant, IFI, cultures, cristaux."); j.suite(); }
      });
      j.reponse(function () { p.resoudre(); });
    } },
    { nom: "Le plus courant", jouer: function (j, n) {
      var A = LABO; A.vider(n.g); A.icone(n.g, "microscope", [340, 260], 240, A.C.jeu);
      j.titre("Quel microscope le cours dit-il très utile au laboratoire d'analyses médicales, avec une coloration des lames ?");
      j.choix([
        { html: "Le microscope à fond clair", juste: true },
        { html: "Le microscope à effet tunnel", aide: "Celui-là sert à la recherche, à l'échelle des atomes." },
        { html: "Le microscope électronique", aide: "Il ne fait pas partie de la routine d'un laboratoire d'analyses." }
      ], { colonnes: 1, ok: function () { j.bravo("Fond clair : faible contraste, d'où la coloration."); j.suite(); } });
    } },
    { nom: "Voir les atomes", jouer: function (j, n) {
      var A = LABO, C = A.C; A.vider(n.g);
      for (var i = 0; i < 8; i++) A.s("circle", { cx: 100 + i * 70, cy: 420, r: 30, fill: C.vPale, stroke: C.v, "stroke-width": 3 }, n.g);
      A.s("path", { d: "M300 120 L380 120 L345 360 Z", fill: C.gris, stroke: C.encre, "stroke-width": 3 }, n.g);
      j.titre("Une pointe terminée par un seul atome balaie une surface ligne par ligne et en suit le relief. Quel microscope ?");
      j.choix([
        { html: "Microscope à contraste de phase", aide: "Il travaille avec la lumière." },
        { html: "Microscope à effet tunnel", juste: true },
        { html: "Stéréomicroscope", aide: "C'est une loupe binoculaire." }
      ], { colonnes: 1, ok: function () { j.bravo("Effet tunnel : il visualise les atomes, sans lumière."); j.suite(); } });
    } },
    { nom: "Le premier électronique", jouer: function (j, n) {
      var A = LABO; A.vider(n.g); A.icone(n.g, "eclair", [340, 260], 200, A.C.jeu);
      j.titre("En quelle année Ernst Ruska et Max Knoll construisent-ils le premier prototype de microscope électronique ?");
      j.nombre({ avant: "\\text{année}", cases: [{ attendu: 1931, tol: 0 }],
        aide: function () { return "Au XXᵉ siècle, au début des années 1930."; },
        ok: function () { j.bravo("1931."); j.suite(); } });
    } },
    { nom: "Une pièce sombre", jouer: function (j, n) {
      var A = LABO, C = A.C; A.vider(n.g);
      A.s("rect", { x: 120, y: 100, width: 440, height: 360, rx: 20, fill: "#15171f" }, n.g);
      A.icone(n.g, "microscope", [340, 280], 200, "#2bd46a");
      j.titre("Quel microscope demande une installation spéciale, une chambre noire ?");
      j.choix([
        { html: "Le microscope à fluorescence", juste: true },
        { html: "Le microscope à fond clair", aide: "Il s'utilise sur une paillasse ordinaire." },
        { html: "Le microscope inversé", aide: "Rien dans le cours ne lui impose de chambre noire." }
      ], { colonnes: 1, ok: function () { j.bravo("La fluorescence : la lumière émise est faible, il faut l'obscurité."); j.suite(); } });
    } }
  ]
}));
