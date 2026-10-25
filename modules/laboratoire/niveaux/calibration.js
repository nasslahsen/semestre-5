/* Niveau : calibration (3.7) : nombre de niveaux, lire la courbe, calibration ou ajustement, non-linéarité, ISO 9001. */
NIVEAU(LABO.rejouable({
  id: "calibration",
  init: function (fig) {
    var A = LABO, C = A.C, g = A.s("g", null, fig.svg);
    var n = { g: g, pl: { P: function (v) { return v; } } };
    n.courbe = function (pts, patient) {
      A.vider(g);
      var x0 = 80, x1 = 620, y0 = 500, y1 = 60, X = function (c) { return x0 + c / 12 * (x1 - x0); }, Y = function (s) { return y0 - s / 0.8 * (y0 - y1); };
      A.s("line", { x1: x0, y1: y0, x2: x1, y2: y0, stroke: C.encre, "stroke-width": 3 }, g);
      A.s("line", { x1: x0, y1: y0, x2: x0, y2: y1, stroke: C.encre, "stroke-width": 3 }, g);
      [0, 3, 6, 9, 12].forEach(function (c) { A.texte(g, String(c), [X(c), y0 + 26], { taille: 17, coul: C.doux, gras: 600 }); });
      [0.2, 0.4, 0.6].forEach(function (s) { A.texte(g, String(s).replace(".", ","), [x0 - 34, Y(s)], { taille: 17, coul: C.doux, gras: 600 }); });
      A.texte(g, "mmol/L", [x1 - 20, y0 + 54], { taille: 17, gras: 700 });
      A.s("line", { x1: X(0), y1: Y(0), x2: X(12), y2: Y(0.6), stroke: C.jeu, "stroke-width": 4 }, g);
      pts.forEach(function (c) { A.s("rect", { x: X(c) - 10, y: Y(c * 0.05) - 10, width: 20, height: 20, fill: "#fff", stroke: C.encre, "stroke-width": 3 }, g); });
      if (patient) { A.s("line", { x1: x0, y1: Y(patient), x2: x1, y2: Y(patient), stroke: C.v, "stroke-width": 3, "stroke-dasharray": "9 6" }, g); A.texte(g, "patient : " + String(patient).replace(".", ","), [x0 + 110, Y(patient) - 20], { taille: 19, gras: 800, coul: C.v }); }
    };
    return n;
  },
  etapes: [
    { nom: "Combien de points ?", jouer: function (j, n) {
      n.courbe([4]);
      j.titre("Le cours parle de calibration multipoint. Combien de niveaux de concentration au minimum ?");
      j.nombre({ avant: "\\text{au moins}", apres: "\\text{niveaux}", cases: [{ attendu: 3, tol: 0 }],
        aide: function () { return "Avec deux points on trace toujours une droite, sans savoir si la relation en est une."; },
        ok: function () { j.bravo("Au moins 3 niveaux, avec des calibrateurs traçables."); j.suite(); } });
    } },
    { nom: "Lire la courbe", jouer: function (j, n) {
      n.courbe([2, 6, 10], 0.35);
      j.titre("Les calibrateurs sont alignés : le signal vaut 0,05 par mmol/L. Un patient donne un signal de 0,35. Quelle concentration ?");
      j.nombre({ avant: "c =", apres: "\\text{mmol/L}", cases: [{ attendu: 7, tol: 0.01 }],
        aide: function () { return "On lit la courbe à l'envers : concentration = signal / pente."; },
        ok: function () { j.bravo("7 mmol/L, entre les calibrateurs de 6 et 10."); j.suite(); } });
    } },
    { nom: "Calibrer ou ajuster ?", jouer: function (j, n) {
      var A = LABO; A.vider(n.g); A.icone(n.g, "cle", [340, 260], 200, A.C.jeu);
      j.titre("Le technicien règle l'appareil pour qu'il retrouve les performances annoncées par le fabricant. Comment s'appelle cette opération ?");
      j.choix([
        { html: "Une calibration", aide: "La calibration détermine la relation entre valeur indiquée et valeur standard ; elle ne règle rien." },
        { html: "Un ajustement", juste: true }
      ], { colonnes: 2, ok: function () { j.bravo("Ajustement : amener l'instrument aux performances spécifiées."); j.suite(); } });
    } },
    { nom: "Une courbe qui se courbe", jouer: function (j, n) {
      var A = LABO, C = A.C; A.vider(n.g);
      A.s("line", { x1: 80, y1: 500, x2: 620, y2: 500, stroke: C.encre, "stroke-width": 3 }, n.g);
      A.s("line", { x1: 80, y1: 500, x2: 80, y2: 60, stroke: C.encre, "stroke-width": 3 }, n.g);
      A.s("path", { d: "M80 500 Q240 120 620 100", fill: "none", stroke: C.jeu, "stroke-width": 5 }, n.g);
      j.titre("Pour un dosage de CRP par turbidimétrie, quelle courbe de calibration le cours indique-t-il ?");
      j.choix([
        { html: "Une droite par deux points suffit", aide: "La turbidimétrie immunologique ne répond pas en ligne droite, à cause de l'effet crochet notamment." },
        { html: "Multipoint, avec une régression non linéaire", juste: true },
        { html: "Pas de calibration : la turbidimétrie mesure directement", aide: "Toute mesure de signal demande une relation signal ↔ concentration." }
      ], { colonnes: 1, ok: function () { j.bravo("Multipoint et non linéaire."); j.suite(); } });
    } },
    { nom: "Ce qu'exige la norme", jouer: function (j, n) {
      var A = LABO; A.vider(n.g); A.icone(n.g, "document", [340, 260], 200, A.C.jeu);
      j.titre("Que demande la norme ISO 9001 pour les équipements de mesure, d'après le cours ?");
      j.choix([
        { html: "Une calibration ou une vérification traçable", juste: true },
        { html: "Le remplacement de l'appareil tous les cinq ans", aide: "La norme parle de la mesure, pas de la durée de vie." },
        { html: "Une calibration seulement à l'installation", aide: "Une seule fois ne suffit pas : pense au spectrophotomètre, étalonné à chaque série." }
      ], { colonnes: 1, ok: function () { j.bravo("Calibration ou vérification traçable."); j.suite(); } });
    } }
  ]
}));
