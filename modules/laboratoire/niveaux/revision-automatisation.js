/* Révision du chapitre 7 : automatisation, LIS et SIH, étiquetage, transport, tri, dans des situations nouvelles. */
NIVEAU(LABO.rejouable({
  id: "revision-automatisation",
  init: function (fig) {
    var A = LABO, g = A.s("g", null, fig.svg);
    return { g: g, pl: { P: function (v) { return v; } } };
  },
  etapes: [
    { nom: "Une étiquette illisible", jouer: function (j, n) {
      var A = LABO; A.vider(n.g); A.icone(n.g, "codebarre", [340, 260], 200, A.C.gris);
      j.titre("Des codes-barres imprimés il y a un mois ont grisé et ne sont plus lus par les automates. Quelle impression a sans doute été utilisée ?");
      j.choix([
        { html: "Thermique directe", juste: true },
        { html: "Transfert thermique sur résine", aide: "Celle-là est justement choisie pour sa longévité." }
      ], { colonnes: 2, ok: function () { j.bravo("La thermique directe s'altère avec le temps, la lumière, la chaleur."); j.suite(); } });
    } },
    { nom: "Une urgence", jouer: function (j, n) {
      var A = LABO; A.vider(n.g); A.icone(n.g, "danger", [340, 260], 200, A.C.ko);
      j.titre("Une troponine urgente et dix bilans de routine attendent sur le même réseau pneumatique. Que fait le logiciel, d'après le cours ?");
      j.choix([
        { html: "Il envoie dans l'ordre d'arrivée", aide: "Le cours prévoit une logique de priorité." },
        { html: "Il fait passer l'urgence en priorité absolue, en suspendant les envois standards", juste: true },
        { html: "Il envoie la troponine par robot coursier", aide: "Le pneumatique gère lui-même les priorités." }
      ], { colonnes: 1, ok: function () { j.bravo("Logique de priorité STAT : gaz du sang, troponines passent en premier."); j.suite(); } });
    } },
    { nom: "Qui fait quoi ?", jouer: function (j, n) {
      var A = LABO;
      j.titre("Relie chaque tâche au système ou à l'appareil qui l'assure.");
      j.consigne("Touche une tâche, puis le bon système.");
      var p = A.paires({
        g: n.g, gauche: ["Facturer le séjour", "Valider et diffuser le compte rendu", "Coller le code-barres", "Déboucher le tube"],
        droite: ["Automate d'étiquetage", "Automate de tri", "SIH, couche administrative", "LIS"],
        bon: [2, 3, 0, 1], xg: 20, wg: 300, xd: 380, wd: 280, y0: 60, h: 104, pas: 134, taille: 19,
        erreur: function (m) { j.erreur(m); },
        aide: function (i) { return ["Une affaire d'argent et d'admission, à l'échelle de l'hôpital.", "Le système du laboratoire édite et envoie les comptes rendus.", "Une machine dédiée à l'identification des tubes.", "Le trieur ouvre les tubes avant l'analyse."][i]; },
        fin: function () { j.bravo("SIH, LIS, étiqueteuse, trieur."); j.suite(); }
      });
      j.reponse(function () { p.resoudre(); });
    } },
    { nom: "Des tubes secoués", jouer: function (j, n) {
      var A = LABO; A.vider(n.g); A.icone(n.g, "aimant", [340, 260], 200, A.C.jeu);
      j.titre("Pourquoi les chaînes modernes transportent-elles les tubes sur des pistes magnétiques plutôt que sur des courroies ?");
      j.choix([
        { html: "Pour éviter les secousses qui remélangeraient le sang centrifugé", juste: true },
        { html: "Pour identifier les tubes", aide: "L'identification se fait par code-barres, caméra ou RFID." },
        { html: "Pour chauffer les tubes", aide: "Les pistes ne chauffent pas." }
      ], { colonnes: 1, ok: function () { j.bravo("Accélérations et arrêts sans secousse : le plasma reste séparé."); j.suite(); } });
    } },
    { nom: "Un caisson de nuit", jouer: function (j, n) {
      var A = LABO; A.vider(n.g); A.icone(n.g, "camion", [340, 260], 220, A.C.jeu);
      j.titre("Un caisson voyage entre deux hôpitaux. Quel dispositif permet de suivre le trajet exact du véhicule ?");
      j.choix([
        { html: "Une balise GPS", juste: true },
        { html: "Un enregistreur de type bouton", aide: "Il enregistre la température." },
        { html: "Un QR code", aide: "Il faut le scanner : il marque des étapes, pas un trajet continu." }
      ], { colonnes: 3, ok: function () { j.bravo("La géolocalisation GPS, pour les malles interhospitalières."); j.suite(); } });
    } }
  ]
}));
