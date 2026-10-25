/* Défi du chapitre 3 : une journée en biochimie, sans aide avant le premier essai. */
NIVEAU(LABO.rejouable({
  id: "boss-biochimie",
  init: function (fig) {
    var A = LABO, g = A.s("g", null, fig.svg);
    return { g: g, pl: { P: function (v) { return v; } } };
  },
  etapes: [
    { nom: "Avec ε", jouer: function (j, n) {
      var A = LABO, C = A.C; A.vider(n.g);
      A.s("rect", { x: 270, y: 120, width: 140, height: 260, rx: 8, fill: "rgba(201,42,42,0.45)", stroke: C.encre, "stroke-width": 3 }, n.g);
      A.texte(n.g, "A = 0,45 · l = 1 cm", [340, 440], { taille: 26, gras: 800 });
      A.texte(n.g, "ε = 9 000 L·mol⁻¹·cm⁻¹", [340, 490], { taille: 24, gras: 800, coul: C.jeu });
      j.titre("Quelle est la concentration, en µmol/L ?");
      j.nombre({ avant: "c =", apres: "\\mu\\text{mol/L}", cases: [{ attendu: 50, tol: 0.1 }],
        aide: function () { return "c = A / (ε × l) donne des mol/L ; 1 mol/L = 10⁶ µmol/L."; },
        ok: function () { j.bravo("50 µmol/L."); j.expliquer("<p>\\(c = \\dfrac{0{,}45}{9\\,000 \\times 1} = 5 \\times 10^{-5}\\) mol/L \\(= 50\\) µmol/L.</p>"); j.suite(); } });
    } },
    { nom: "Deux décades", jouer: function (j, n) {
      var A = LABO; A.vider(n.g); A.icone(n.g, "eclair", [340, 260], 200, A.C.jeu);
      j.titre("À 25 °C, la pente est de 59,2 mV par décade pour un ion de charge 1. La concentration est multipliée par 100. De combien le potentiel varie-t-il ?");
      j.nombre({ avant: "\\Delta E \\approx", apres: "\\text{mV}", cases: [{ attendu: 118.3, tol: 0.3 }],
        aide: function () { return "Multiplier par 100, c'est deux décades."; },
        ok: function () { j.bravo("Environ 118,3 mV : deux pas de 59,2 mV."); j.suite(); } });
    } },
    { nom: "Avec un étalon", jouer: function (j, n) {
      var A = LABO, C = A.C; A.vider(n.g);
      [["étalon 8 mmol/L", "A = 0,25", 0.3], ["patient", "A = 0,40", 0.5]].forEach(function (t, i) {
        A.s("rect", { x: 150 + i * 240, y: 150, width: 140, height: 220, rx: 8, fill: "rgba(201,42,42," + t[2] + ")", stroke: C.encre, "stroke-width": 3 }, n.g);
        A.texte(n.g, t[0], [220 + i * 240, 120], { taille: 20, gras: 800 });
        A.texte(n.g, t[1], [220 + i * 240, 420], { taille: 22, gras: 800, coul: C.jeu });
      });
      j.titre("Même réaction, même cuve. Quelle est la concentration du patient ?");
      j.nombre({ avant: "c =", apres: "\\text{mmol/L}", cases: [{ attendu: 12.8, tol: 0.01 }],
        aide: function () { return "c patient = c étalon × A patient / A étalon."; },
        ok: function () { j.bravo("12,8 mmol/L."); j.suite(); } });
    } },
    { nom: "Pour la culture cellulaire", jouer: function (j, n) {
      var A = LABO; A.vider(n.g); A.icone(n.g, "goutte", [340, 260], 200, A.C.froid);
      j.titre("L'eau d'un laboratoire de culture cellulaire doit être sans pyrogènes ni nucléases. Quel étage placer en sortie du purificateur ?");
      j.choix([
        { html: "Un lit de déionisation", aide: "Les résines n'éliminent pas les pyrogènes." },
        { html: "Un ultrafiltre", juste: true },
        { html: "Un filtre à charbon actif", aide: "Le charbon retient les organiques et le chlore." },
        { html: "Un filtre en profondeur", aide: "Il sert au prétraitement, pour les grosses particules." }
      ], { colonnes: 1, ok: function () { j.bravo("L'ultrafiltration, en sortie de système."); j.suite(); } });
    } },
    { nom: "Trouve l'erreur", jouer: function (j, n) {
      var A = LABO; A.vider(n.g); A.icone(n.g, "automate", [340, 260], 220, A.C.jeu);
      j.titre("Un technicien raconte son début de journée sur l'automate. Une phrase est fausse : laquelle ?");
      j.choix([
        { html: "« J'ai vérifié que les réactifs sont au froid dans le carrousel de réactifs. »", aide: "C'est le rôle du RCU." },
        { html: "« Pour la CRP, j'ai calibré avec deux points et tracé une droite. »", juste: true },
        { html: "« L'unité de lavage a contrôlé la propreté optique des cuves. »", aide: "C'est bien son rôle." },
        { html: "« J'ai nettoyé une éclaboussure tout de suite. »", aide: "C'est l'entretien quotidien." }
      ], { colonnes: 1, ok: function () { j.bravo("Turbidimétrie : calibration multipoint, régression non linéaire."); j.suite(); } });
    } }
  ]
}));
