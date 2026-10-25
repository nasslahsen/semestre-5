/* Niveau : robots coursiers et caissons (7.3) : capteurs, sécurité des casiers, triple emballage, traçabilité thermique et logistique. */
NIVEAU(LABO.rejouable({
  id: "transport-robot",
  init: function (fig) {
    var A = LABO, g = A.s("g", null, fig.svg);
    return { g: g, pl: { P: function (v) { return v; } } };
  },
  etapes: [
    { nom: "Les sens du robot", jouer: function (j, n) {
      var A = LABO;
      j.titre("Relie chaque organe du robot coursier à son rôle.");
      j.consigne("Touche un organe, puis son rôle.");
      var p = A.paires({
        g: n.g, gauche: ["LiDAR", "Centrale inertielle (IMU)", "BMS", "Badge RFID des casiers"],
        droite: ["Surveille la charge des batteries", "N'ouvre qu'aux personnes autorisées", "Détecte les obstacles à 360°", "Donne l'orientation du robot"],
        bon: [2, 3, 0, 1], xg: 20, wg: 260, xd: 340, wd: 320, y0: 60, h: 104, pas: 134, taille: 19,
        erreur: function (m) { j.erreur(m); },
        aide: function (i) { return ["Un télémètre laser qui balaie tout autour.", "Elle mesure les rotations et accélérations.", "Le système de gestion de la batterie.", "Une sécurité d'accès aux échantillons."][i]; },
        fin: function () { j.bravo("Obstacles, orientation, batterie, accès."); j.suite(); }
      });
      j.reponse(function () { p.resoudre(); });
    } },
    { nom: "La vitesse du robot", jouer: function (j, n) {
      var A = LABO; A.vider(n.g); A.icone(n.g, "robot", [340, 240], 220, A.C.jeu);
      j.titre("À quelle vitesse moyenne, en km/h, le cours dit-il que roulent les robots coursiers ?");
      j.nombre({ avant: "v \\approx", apres: "\\text{km/h}", cases: [{ attendu: 9, tol: 0 }],
        aide: function () { return "Un peu plus vite qu'une personne qui marche d'un bon pas."; },
        ok: function () { j.bravo("Environ 9 km/h."); j.suite(); } });
    } },
    { nom: "Le triple emballage", jouer: function (j, n) {
      var A = LABO, C = A.C; A.vider(n.g);
      [[60, 60, 560, 480, C.fond], [150, 140, 380, 320, "#fff"], [250, 210, 180, 180, C.fond]].forEach(function (r) { A.s("rect", { x: r[0], y: r[1], width: r[2], height: r[3], rx: 18, fill: r[4], stroke: C.encre, "stroke-width": 3 }, n.g); });
      A.tube(n.g, 320, 250, { bouchon: "sec", w: 40, h: 110, couches: [{ h: 0.6, coul: C.sang }] });
      j.titre("Dans le caisson, qu'est-ce qui entoure directement le récipient primaire, pour retenir le liquide en cas de fuite ?");
      j.choix([
        { html: "Un matériau absorbant", juste: true },
        { html: "Un enregistreur de température", aide: "L'enregistreur est près des tubes, mais il ne retient pas le liquide." },
        { html: "L'emballage extérieur rigide", aide: "C'est la couche la plus externe." }
      ], { colonnes: 1, ok: function () { j.bravo("Un absorbant capable de retenir tout le liquide ; puis le secondaire, puis l'extérieur rigide."); j.suite(); } });
    } },
    { nom: "Avant l'arrivée", jouer: function (j, n) {
      var A = LABO, C = A.C; A.vider(n.g); A.icone(n.g, "thermo", [340, 240], 200, C.ko);
      A.texte(n.g, "+11 °C pendant le trajet", [340, 430], { taille: 26, gras: 800, coul: C.ko });
      j.titre("Quel dispositif permet au laboratoire d'apprendre la rupture du froid avant même l'arrivée du coursier ?");
      j.choix([
        { html: "Un enregistreur de type bouton", aide: "Il garde l'historique, mais on ne le lit qu'à l'arrivée." },
        { html: "Un capteur connecté (Bluetooth, 4G)", juste: true },
        { html: "Un code-barres sur le caisson", aide: "Le code-barres trace le caisson, pas sa température." }
      ], { colonnes: 1, ok: function () { j.bravo("Le capteur connecté alerte en temps réel."); j.suite(); } });
    } },
    { nom: "Qui, quand ?", jouer: function (j, n) {
      var A = LABO; A.vider(n.g); A.icone(n.g, "codebarre", [340, 260], 200, A.C.encre);
      j.titre("Qu'enregistre une puce RFID sur le caisson, d'après le cours ?");
      j.choix([
        { html: "L'heure de départ, l'identité du coursier et l'heure de dépôt", juste: true },
        { html: "La température en continu", aide: "C'est le rôle des enregistreurs et des capteurs thermiques." },
        { html: "Le trajet exact du véhicule", aide: "C'est le GPS." }
      ], { colonnes: 1, ok: function () { j.bravo("La chaîne de possession : départ, coursier, dépôt."); j.suite(); } });
    } }
  ]
}));
