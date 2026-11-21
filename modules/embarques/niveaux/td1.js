/* TD 1, questions 1 à 3 : surface d'un capteur de force, force et pression maximales, patient de 70 kg. */
NIVEAU({
  id: "td1",
  init: function (fig) {
    var C = EMB.C, g = E.s("g", null, fig.svg);
    var n = { mode: "forme", surface: false, pression: false, talon: false };
    n.dessin = function () {
      EMB.vider(g);
      // le capteur : deux disques de 11 mm, entraxe 15 mm (échelle 14 px/mm)
      var k = 14, cx = 340, cy = 230, r = 5.5 * k, l = 15 * k;
      var x1 = cx - l / 2, x2 = cx + l / 2;
      EMB.el("path", { d: "M" + x1 + " " + (cy - r) + " H" + x2 + " A" + r + " " + r + " 0 0 1 " + x2 + " " + (cy + r) + " H" + x1 + " A" + r + " " + r + " 0 0 1 " + x1 + " " + (cy - r) + " Z", fill: n.surface ? EMB.teinte(0.35) : "#d9dce4", stroke: C.encre, "stroke-width": 3 }, g);
      if (n.surface) {
        EMB.el("rect", { x: x1, y: cy - r, width: l, height: 2 * r, fill: "none", stroke: C.acc, "stroke-width": 3, "stroke-dasharray": "8 6" }, g);
        EMB.texte(g, "L × D", [cx, cy], { taille: 22, coul: C.acc });
        EMB.texte(g, "½ disque", [x1 - r / 2, cy], { taille: 16, gras: false });
        EMB.texte(g, "½ disque", [x2 + r / 2, cy], { taille: 16, gras: false });
      }
      [x1, x2].forEach(function (x) { EMB.el("circle", { cx: x, cy: cy, r: r, fill: "none", stroke: C.doux, "stroke-width": 1.5, "stroke-dasharray": "5 5" }, g); });
      // cotes
      EMB.fleche(g, [x1, cy + r + 40], [x2, cy + r + 40], { double: true, ep: 2.5 });
      EMB.texte(g, "L = 15 mm", [cx, cy + r + 66], { taille: 18 });
      EMB.fleche(g, [x1 - r, cy + r + 100], [x2 + r, cy + r + 100], { double: true, ep: 2.5 });
      EMB.texte(g, "LT = 26 mm", [cx, cy + r + 126], { taille: 18 });
      EMB.fleche(g, [x1 - r - 40, cy - r], [x1 - r - 40, cy + r], { double: true, ep: 2.5 });
      EMB.texte(g, "D = 11 mm", [x1 - r - 50, cy - r - 28], { taille: 18 });
      if (n.pression) {
        EMB.texte(g, "P = F / S", [cx, 70], { taille: 24, coul: C.acc });
        for (var i = -2; i <= 2; i++) EMB.fleche(g, [cx + i * 60, 100], [cx + i * 60, cy - r - 8], { ep: 3, coul: C.acc });
      }
      if (n.talon) EMB.texte(g, "686,7 N sur 2 capteurs : 343 N chacun", [cx, 565], { taille: 19, coul: C.ko });
    };
    n.dessin();
    return n;
  },
  etapes: [
    { nom: "Surface", jouer: function (j, n) {
      j.titre("Question 1 : quelle est la surface active d'un capteur, en mm² ?");
      j.nombre({ avant: "S =", apres: "\\text{mm}^2", cases: [{ attendu: 260.03, tol: 0.6 }], ligne: true,
        aide: function () { return "Découpe la forme : un rectangle L × D au milieu, et deux demi-disques de diamètre D aux bouts, soit un disque entier."; },
        ok: function () {
          n.surface = true; n.dessin();
          j.bravo("S = 15 × 11 + π × 11² / 4 ≈ 260 mm².");
          j.expliquer("<p>Les deux demi-disques des bouts font un disque entier de diamètre \\(D\\).</p><p>\\[S = L\\,D + \\frac{\\pi D^2}{4}\\]</p>");
          j.suite();
        } });
    } },
    { nom: "Force max", jouer: function (j, n) {
      j.titre("Question 2 : la fiche de la semelle donne une plage de 500 g à 10 kg. Quelle force maximale, en newtons ?");
      j.choix([
        { html: "10 N", aide: "10, c'est une masse en kilogrammes. Une force, c'est une masse multipliée par g." },
        { html: "98,1 N", juste: true },
        { html: "4,9 N", aide: "C'est le seuil de déclenchement (500 g), le bas de la plage." },
        { html: "445 N", aide: "C'est la pleine échelle du capteur de référence FUTEK, pas celle de la semelle." }
      ], { colonnes: 2, ok: function () {
        j.bravo("10 kg × 9,81 m/s² = 98,1 N.");
        j.expliquer("<p>La fiche donne la plage en masse. On repasse en force avec \\(F = m\\,g\\).</p>");
        j.suite();
      } });
    } },
    { nom: "Pression max", jouer: function (j, n) {
      n.pression = true; n.dessin();
      j.titre("Toujours question 2 : quelle pression maximale, en kPa ?");
      j.nombre({ avant: "P_{max} = \\dfrac{98{,}1\\ \\text{N}}{260\\ \\text{mm}^2} =", apres: "\\text{kPa}", cases: [{ attendu: 377.3, tol: 1.5 }], ligne: true,
        aide: function () { return "Convertis la surface en m² (260 mm² = 260 × 10⁻⁶ m²), ou souviens-toi que 1 N/mm² = 1 MPa = 1 000 kPa."; },
        ok: function () {
          j.bravo("98,1 / 260 ≈ 0,377 N/mm², soit environ 377 kPa.");
          j.expliquer("<p>\\[P = \\frac{F}{S}\\]</p><p>Les newtons par mm² sont des mégapascals : 0,377 MPa = 377 kPa.</p>");
          j.suite();
        } });
    } },
    { nom: "70 kg", jouer: function (j, n) {
      n.talon = true; n.dessin();
      j.titre("Question 3 : un patient de 70 kg marche. Ses capteurs restent-ils dans leur zone de mesure ?");
      j.choix([
        { html: "Oui, toujours : 686,7 / 16 ≈ 43 N par capteur", aide: "C'est le cas moyen. Pense à l'attaque du talon : combien de capteurs portent tout le poids ?" },
        { html: "Réparti, oui ; à l'attaque du talon, non : 343 N saturent les capteurs du talon", juste: true },
        { html: "Jamais : 686,7 N dépasse 98,1 N", aide: "686,7 N, c'est tout le poids. Il se partage entre plusieurs capteurs." }
      ], { colonnes: 1, ok: function () {
        j.bravo("Les pics saturent les capteurs les plus chargés.");
        j.expliquer("<p>On lit la fiche pour le cas réel. Ici la saturation aux pics n'empêche pas l'objectif : suivre l'évolution et l'asymétrie de l'appui, pas une mesure absolue.</p>");
        j.suite();
      } });
    } }
  ]
});
