/* Niveau : bloc opératoire, circuit périopératoire : étapes, check-list, risques et indicateurs, matériovigilance (S3-S4, diapo 9). */
NIVEAU(SIS.rejouable({
  id: "circuit-bloc",
  init: function (fig) {
    var A = SIS, g = A.s("g", null, fig.svg);
    var n = { g: g };
    n.cinq = function (noms, place) { return noms.map(function (e, i) { var c = place[i]; return { t: e[0], sous: e[1], x: c === 4 ? 185 : 20 + (c % 2) * 330, y: 40 + Math.floor(c / 2) * 180, w: 310, h: 110 }; }); };
    return n;
  },
  etapes: [
    { nom: "Le circuit du bloc", jouer: function (j, n) {
      var A = SIS, C = A.C;
      j.titre("Une prothèse de hanche est posée ce matin. Touche les cinq étapes du circuit périopératoire, dans l'ordre.");
      var nd = n.cinq([["Programmation", "planning, consultation d'anesthésie"], ["Accueil et check-list", "identité, site, consentement"], ["Intervention", "DM, actes, implantables"], ["Salle de réveil", "surveillance post-opératoire"], ["Comptes rendus et actes", "codage et facturation"]], [3, 1, 4, 0, 2]);
      var tr = A.trace({ g: n.g, noeuds: nd, ordre: [0, 1, 2, 3, 4], coul: C.jeu, taille: 19, erreur: j.erreur,
        aide: function (i, att, k) { return ["D'abord on planifie l'intervention et on voit l'anesthésiste.", "Le jour J, on accueille le patient avec la check-list.", "Puis l'opération elle-même.", "Après l'opération, la surveillance.", "Enfin les comptes rendus, le codage et la facture."][k]; },
        fin: function () { j.bravo("Programmation → accueil et check-list → intervention → salle de réveil → comptes rendus et actes."); j.suite(); } });
      j.reponse(function () { tr.resoudre(); });
    } },
    { nom: "La check-list", jouer: function (j, n) {
      var A = SIS;
      A.scene(n.g, { icones: ["patient", "document"], titre: "Accueil au bloc, avant l'intervention", sous: "la check-list est ouverte" });
      j.titre("À l'accueil au bloc, que vérifie la check-list ?");
      j.choix([
        { html: "Le planning des salles et la consultation d'anesthésie", aide: "C'est l'étape d'avant : la programmation." },
        { html: "L'identité, le site opératoire et le consentement", juste: true },
        { html: "Le codage des actes et la facture", aide: "Cela vient à la fin, avec les comptes rendus." }
      ], { colonnes: 1, ok: function () {
        j.bravo("Identité, site, consentement.");
        j.expliquer("<p>La check-list vise le risque le plus grave du bloc : l'<b>erreur de patient ou de site</b>. Son indicateur : le taux de check-lists complétées.</p>");
        j.suite();
      } });
    } },
    { nom: "Risques et indicateurs", jouer: function (j, n) {
      var A = SIS;
      j.titre("Range chaque élément : risque du bloc, ou indicateur du bloc ?");
      var cartes = [
        { t: "Erreur de patient ou de site", bac: 0 }, { t: "Occupation des salles", bac: 1 }, { t: "DM implantable non tracé", bac: 0 },
        { t: "Retard de première intervention", bac: 1 }, { t: "Déprogrammation", bac: 0 }, { t: "Check-list complétée", bac: 1 }
      ];
      var t = A.trier({
        g: n.g, cartes: cartes, bacs: [{ t: "Risque" }, { t: "Indicateur" }],
        pos: A.grille(6, 2, 20, 20, 640, 74, 12), bacsPos: function (k) { return { x: 20 + k * 330, y: 300, w: 310, h: 260 }; },
        taille: 17, tailleBac: 24, erreur: j.erreur, info: j.info,
        aide: function (i) { return cartes[i].bac === 0 ? "C'est quelque chose qui peut mal tourner." : "C'est quelque chose qu'on mesure pour piloter le bloc."; },
        fin: function () { j.bravo("Risques : erreur de patient ou de site, implantable non tracé, déprogrammation. Indicateurs : occupation, retard, check-list."); j.suite(); }
      });
      j.reponse(function () { t.resoudre(); });
    } },
    { nom: "La prothèse qui se descelle", jouer: function (j, n) {
      var A = SIS;
      A.scene(n.g, { icones: ["patient", "alerte"], titre: "Une prothèse se descelle six mois après la pose", sous: "plusieurs cas signalés, même modèle" });
      j.titre("Plusieurs prothèses du même modèle se descellent après la pose. Quel système de surveillance s'en occupe ?");
      j.choix([
        { html: "L'hémovigilance", aide: "L'hémovigilance couvre la chaîne transfusionnelle." },
        { html: "La matériovigilance", juste: true },
        { html: "La pharmacovigilance", aide: "La pharmacovigilance concerne les médicaments." }
      ], { colonnes: 3, ok: function () {
        j.bravo("La matériovigilance : incidents liés à un DM après sa mise sur le marché.");
        j.expliquer("<p>Elle <b>détecte, enregistre, analyse et corrige</b> les incidents graves liés à un DM. Pour retrouver les patients porteurs, il faut que l'implantable ait été <b>tracé</b> pendant l'intervention.</p>");
        j.suite();
      } });
    } }
  ]
}));
