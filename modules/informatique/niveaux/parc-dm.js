/* Niveau : le parc de DM dans le SIH (GMAO) et les DM communicants (S3-S4, diapo 11). */
NIVEAU(SIS.rejouable({
  id: "parc-dm",
  init: function (fig) { var A = SIS; return { g: A.s("g", null, fig.svg) }; },
  etapes: [
    { nom: "Ce que fait la GMAO", jouer: function (j, n) {
      var A = SIS;
      j.titre("Range chaque élément : ce que la GMAO gère, ou un indicateur qu'elle suit ?");
      var cartes = [
        { t: "Inventaire des DM", bac: 0 }, { t: "Taux de disponibilité", bac: 1 }, { t: "Maintenance préventive et corrective", bac: 0 }, { t: "Délai d'intervention", bac: 1 },
        { t: "Traçabilité des interventions", bac: 0 }, { t: "Coût de maintenance", bac: 1 }, { t: "Lien avec le service et le patient", bac: 0 }, { t: "Cycle de vie", bac: 1 }
      ];
      var t = A.trier({
        g: n.g, cartes: cartes, bacs: [{ t: "La GMAO gère" }, { t: "Indicateur" }],
        pos: A.grille(8, 2, 20, 14, 640, 60, 10), bacsPos: function (k) { return { x: 20 + k * 330, y: 310, w: 310, h: 250 }; },
        taille: 16, tailleBac: 24, erreur: j.erreur, info: j.info,
        aide: function (i) { return cartes[i].bac === 0 ? "C'est une tâche ou une donnée que la GMAO enregistre." : "C'est un chiffre qu'on mesure pour piloter le parc."; },
        fin: function () { j.bravo("La GMAO gère inventaire, maintenance, traçabilité, lien service – patient. Elle suit disponibilité, délai, coût, cycle de vie."); j.suite(); }
      });
      j.reponse(function () { t.resoudre(); });
    } },
    { nom: "Le scanner en panne", jouer: function (j, n) {
      var A = SIS;
      A.scene(n.g, { icones: ["radiation", "alerte"], titre: "Le scanner est en panne" });
      j.titre("Le scanner tombe en panne à 10 h. Quel circuit du SIH est bloqué ?");
      j.choix([
        { html: "Le circuit RIS, celui de l'imagerie", juste: true },
        { html: "Le circuit LIS, celui du laboratoire", aide: "Le scanner n'analyse pas de prélèvements." },
        { html: "Le circuit transfusionnel", aide: "Le scanner sert à l'imagerie." }
      ], { colonnes: 1, ok: function () {
        j.bravo("Le RIS : radio et scanner sont des DM qui l'alimentent.");
        j.expliquer("<p>La question du cours : <b>qui est le premier informé</b>, et quelles étapes pour la remise en marche ? Dans la matrice, la panne d'un scanner relève du biomédical et du fournisseur (responsables), la DSI et le service étant consultés.</p>");
        j.suite();
      } });
    } },
    { nom: "Trois incidents", jouer: function (j, n) {
      var A = SIS;
      j.titre("Relie chaque situation au type d'incident des DM communicants.");
      var p = A.paires({
        g: n.g, gauche: ["Le patient a changé de chambre : le moniteur envoie les courbes du nouveau patient dans son dossier", "Les mesures de la pompe arrivent avec une heure d'avance", "Une SpO2 à 3 % entre dans la pancarte sans alerte"],
        droite: ["Valeur aberrante", "Mauvais rattachement", "Horodatage erroné"],
        bon: [1, 2, 0],
        xg: 20, wg: 380, xd: 450, wd: 210, y0: 40, h: 150, pas: 180, taille: 16, tailleD: 18,
        erreur: j.erreur, info: j.info,
        aide: function (i) { return ["L'appareil est associé à quelqu'un d'autre.", "C'est l'heure qui ne va pas.", "La valeur est impossible, et personne ne l'a contrôlée."][i]; },
        fin: function () { j.bravo("Mauvais rattachement, horodatage erroné, valeur aberrante."); j.suite(); }
      });
      j.reponse(function () { p.resoudre(); });
    } },
    { nom: "Qui est concerné ?", jouer: function (j, n) {
      var A = SIS;
      A.scene(n.g, { icones: ["moniteur", "pompe", "tube"], titre: "Des appareils qui envoient leurs données au dossier", alerte: false });
      j.titre("Le cours cite les appareils concernés par ces incidents. Laquelle de ces listes est la sienne ?");
      j.choix([
        { html: "Moniteurs, pompes, ventilateurs, automates de biologie, imagerie", juste: true },
        { html: "Seulement les ordinateurs de la DSI", aide: "On parle des DM qui envoient des données patient." },
        { html: "Seulement les appareils d'imagerie", aide: "Le moniteur du changement de chambre n'est pas un appareil d'imagerie." }
      ], { colonnes: 1, ok: function () { j.bravo("Moniteurs, pompes, ventilateurs, automates de biologie, imagerie."); j.suite(); } });
    } }
  ]
}));
