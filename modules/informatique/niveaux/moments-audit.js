/* Niveau : trois moments d'audit, fait / écart / opinion, indicateurs et effets pervers, étude de cas du centre de référence (S5, diapos 10 et 11). */
NIVEAU(SIS.rejouable({
  id: "moments-audit",
  init: function (fig) { var A = SIS; return { g: A.s("g", null, fig.svg) }; },
  etapes: [
    { nom: "Trois moments", jouer: function (j, n) {
      var A = SIS;
      j.titre("Range chaque vérification dans son moment d'audit.");
      var cartes = [
        { t: "Démonstration scénarisée", bac: 0 }, { t: "Qualification", bac: 1 }, { t: "Retours des utilisateurs", bac: 2 },
        { t: "Site de référence", bac: 0 }, { t: "Tests avec identités fictives", bac: 1 }, { t: "Incidents", bac: 2 }
      ];
      var t = A.trier({
        g: n.g, cartes: cartes, bacs: [{ t: "Avant l'achat" }, { t: "À la réception" }, { t: "Après l'ouverture" }],
        pos: A.grille(6, 3, 10, 30, 660, 80, 12), bacsPos: function (k) { return { x: 10 + k * 225, y: 280, w: 210, h: 260 }; },
        taille: 17, tailleBac: 20, erreur: j.erreur, info: j.info,
        aide: function (i) { return ["L'équipement n'est pas encore acheté : on regarde ailleurs ou en démonstration.", "L'équipement vient d'arriver : on le contrôle avant de s'en servir.", "Le centre tourne : on écoute et on compte."][cartes[i].bac]; },
        fin: function () { j.bravo("Avant : dossier, référence, démonstration. Réception : qualification, tests. Après : indicateurs, retours, incidents."); j.suite(); }
      });
      j.reponse(function () { t.resoudre(); });
    } },
    { nom: "Un vrai constat", jouer: function (j, n) {
      var A = SIS;
      A.scene(n.g, { icones: ["document", "personne"], titre: "Visite du site de référence", alerte: false });
      j.titre("De retour d'une visite, trois phrases sont notées. Laquelle est un constat d'audit ?");
      j.choix([
        { html: "« Le personnel a l'air débordé. »", aide: "C'est une impression : sur quelle preuve s'appuie-t-elle ?" },
        { html: "« Sur 20 fiches de préparation relevées, 6 n'ont pas de double contrôle signé. »", juste: true },
        { html: "« Le robot semble fiable. »", aide: "C'est une opinion, sans preuve vérifiable." }
      ], { colonnes: 1, ok: function () {
        j.bravo("Un fait, mesuré sur des fiches : on peut le vérifier.");
        j.expliquer("<p><b>Fait, écart, opinion</b> : un constat s'appuie sur une preuve vérifiable. Les deux autres phrases sont des opinions.</p>");
        j.suite();
      } });
    } },
    { nom: "Le délai qui baisse", jouer: function (j, n) {
      var A = SIS;
      A.scene(n.g, { icones: ["horloge", "alerte"], titre: "Le délai de préparation baisse de 30 %", sous: "surtout aux heures de pointe" });
      j.titre("Trois mois après l'ouverture, le délai de préparation baisse nettement aux heures de pointe. Que faut-il vérifier avant de s'en féliciter ?");
      j.choix([
        { html: "Rien : un délai plus court prouve un système meilleur", aide: "Le cours pose justement la question : est-ce une preuve ?" },
        { html: "Que les contrôles ne sont pas contournés en période de pointe", juste: true },
        { html: "Le prix des consommables", aide: "Le lien avec le délai est faible." }
      ], { colonnes: 1, ok: function () {
        j.bravo("Effet pervers possible : contourner les contrôles pour aller plus vite.");
        j.expliquer("<p>On regarde le délai avec d'autres indicateurs : <b>préparations conformes du premier coup</b>, <b>erreurs interceptées</b>, <b>incidents signalés</b>.</p>");
        j.suite();
      } });
    } },
    { nom: "Le centre de référence", jouer: function (j, n) {
      var A = SIS;
      j.titre("Quatre constats sur le centre de référence. Relie chacun à la famille d'exigences à renforcer.");
      j.consigne("Réponse proposée : le cours donne la consigne, pas la correction.");
      var p = A.paires({
        g: n.g, gauche: ["Double contrôle contourné aux heures de pointe", "Imprimante d'étiquettes en panne : étiquetage manuel", "Compte du fournisseur partagé pour l'accès à distance", "Identité sans dossier à jour saisie à la main"],
        droite: ["Cybersécurité", "Intégration au SIH", "Sécurité du patient", "Continuité"],
        bon: [2, 3, 0, 1],
        xg: 20, wg: 360, xd: 430, wd: 230, y0: 30, h: 110, pas: 130, taille: 16, tailleD: 18,
        erreur: j.erreur, info: j.info,
        aide: function (i) { return ["Le double contrôle protège contre l'erreur de dose ou de patient.", "Que fait-on si un appareil tombe ?", "Qui accède, qui trace ?", "La bonne prescription doit arriver sur le bon patient, sans ressaisie."][i]; },
        fin: function () { j.bravo("Pour chacun : l'écart, la preuve manquante, l'exigence à ajouter au cahier des charges."); j.suite(); }
      });
      j.reponse(function () { p.resoudre(); });
    } }
  ]
}));
