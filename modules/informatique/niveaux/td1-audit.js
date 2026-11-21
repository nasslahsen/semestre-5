/* Niveau du TD 1 (CHU Atlas), atelier 3 : plan d'audit en trois moments et mode dégradé (24 h sans SIH).
   Les réponses du mode dégradé sont un plan proposé (le cours reçu ne détaille pas de procédure). */
NIVEAU(SIS.rejouable({
  id: "td1-audit",
  init: function (fig) {
    var A = SIS, g = A.s("g", null, fig.svg);
    return { g: g };
  },
  etapes: [
    { nom: "Trois moments", jouer: function (j, n) {
      var A = SIS;
      j.titre("Plan d'audit. Range chaque vérification au moment où elle doit être faite.");
      var cartes = [
        { t: "Certificats de tous les modules", bac: 0 },
        { t: "Tests avec identités fictives sur le DPI", bac: 0 },
        { t: "Recette avec le SIH", bac: 1 },
        { t: "Essai du mode dégradé avant ouverture", bac: 1 },
        { t: "Indicateurs de l'AMDEC chaque mois", bac: 2 },
        { t: "Journaux des accès à distance", bac: 2 }
      ];
      var t = A.trier({
        g: n.g, cartes: cartes, bacs: [{ t: "Avant l'achat" }, { t: "À la réception" }, { t: "Après l'ouverture" }],
        pos: A.grille(6, 2, 20, 20, 640, 76, 12),
        bacsPos: function (k) { return { x: 20 + k * 220, y: 320, w: 200, h: 220 }; },
        taille: 16, tailleBac: 20,
        erreur: j.erreur, info: j.info,
        aide: function (i) { return [
          "Sans certificat, on ne signe pas : c'est avant.",
          "L'offre B accepte ces tests avant la signature : profites-en.",
          "La recette se fait quand le système est installé chez toi.",
          "On l'essaie sur place, une fois installé, avant les premiers patients.",
          "Un indicateur se suit quand le centre tourne.",
          "Les accès ne laissent des traces qu'une fois le système en service."][i]; },
        fin: function () { j.bravo("Avant : on vérifie ce qu'on achète. À la réception : ce qu'on reçoit. Après : ce qui se passe."); j.suite(); }
      });
      j.reponse(function () { t.resoudre(); });
    } },
    { nom: "24 h sans SIH", jouer: function (j, n) {
      var A = SIS, noms = ["Administration", "Déclenchement", "Retour à la normale", "Prescription et identité", "Priorisation", "Préparation et étiquetage"];
      j.titre("Jeudi matin, le SIH tombe pour 24 h. Touche les étapes du mode dégradé dans l'ordre.");
      var tr = A.trace({
        g: n.g, coul: A.C.jeu, taille: 18, fleches: false,
        noeuds: noms.map(function (t, i) { return { t: t, x: 20 + 220 * (i % 3), y: 80 + 250 * Math.floor(i / 3), w: 200, h: 160 }; }),
        ordre: [1, 4, 3, 5, 0, 2],
        erreur: j.erreur,
        aide: function (i, att) { return ["On décide d'abord d'entrer en mode dégradé.", "Ensuite, qui est traité aujourd'hui ?", "Avant de préparer, il faut une prescription et un patient identifié.", "La poche se prépare avant d'être posée.", "On administre ce qui a été préparé.", "Le retour vient à la fin."][[1, 4, 3, 5, 0, 2].indexOf(att)]; },
        fin: function () { j.bravo("Déclencher, prioriser, prescrire, préparer, administrer, revenir."); j.suite(); }
      });
      j.reponse(function () { tr.resoudre(); });
    } },
    { nom: "Qui décide ?", jouer: function (j, n) {
      var A = SIS;
      j.titre("Relie chaque décision du mode dégradé à celui qui la prend.");
      var p = A.paires({
        g: n.g, xg: 20, wg: 300, xd: 380, wd: 280, y0: 40, pas: 130, h: 110, taille: 18, tailleD: 19,
        gauche: ["Déclencher le mode dégradé", "Choisir les patients reportés", "Valider les doses recalculées", "Rapprocher les identités au retour"],
        droite: ["Pharmacien", "Identitovigilance", "Direction générale", "Oncologue"],
        bon: [2, 3, 0, 1],
        erreur: j.erreur, info: j.info,
        aide: function (i) { return ["C'est une décision pour tout l'établissement.", "C'est une décision médicale, sur le traitement de chaque patient.", "La validation des doses est le métier de la pharmacie.", "Chapitre 6 : une cellule s'occupe des doublons et des identités."][i]; },
        fin: function () { j.bravo("Chaque décision a un nom : personne ne se demande qui doit agir."); j.suite(); }
      });
      j.reponse(function () { p.resoudre(); });
    } },
    { nom: "Au chevet", jouer: function (j, n) {
      var A = SIS;
      A.vider(n.g);
      A.scene(n.g, { icones: ["patient", "pompe"], titre: "Sans SIH ni scan", sous: "comment vérifier avant de poser la poche ?" });
      j.titre("Le scanner ne marche plus : impossible de scanner le bracelet et la poche. Que fais-tu avant d'administrer ?");
      j.choix([
        { html: "On reporte toutes les chimiothérapies de la journée", aide: "Certaines cures ne peuvent pas attendre : la priorisation a déjà gardé celles-là." },
        { html: "Deux infirmiers vérifient le bracelet, la poche, l'ordonnance papier et lisent la programmation de la pompe à voix haute", juste: true },
        { html: "L'infirmier se fie à la chambre et au nom écrit sur la poche", aide: "Le numéro de chambre n'identifie pas un patient. Il faut un contrôle croisé." }
      ], { colonnes: 1, ok: function () { j.bravo("Le contrôle automatique perdu est remplacé par un double contrôle humain."); j.suite(); } });
    } },
    { nom: "Une ligne utilisable", jouer: function (j, n) {
      var A = SIS;
      A.vider(n.g);
      A.scene(n.g, { icones: ["document"], titre: "Plan d'audit", sous: "avant l'achat" });
      j.titre("Quelle ligne du plan d'audit est utilisable telle quelle ?");
      j.choix([
        { html: "Vérifier que l'interface marche bien", aide: "Il manque la preuve, le responsable et l'échéance." },
        { html: "Le fournisseur garantit l'interface", aide: "C'est une promesse, pas une vérification." },
        { html: "Interface avec le DPI : PV de tests avec identités fictives, signé par le DSI, avant signature", juste: true }
      ], { colonnes: 1, ok: function () { j.bravo("Quoi, quelle preuve, qui, quand : les quatre colonnes du plan."); j.suite(); } });
    } }
  ]
}));
