/* Niveau : traçabilité des DM et des actes, matrice des responsabilités, trois messages de la séance (S3-S4, diapos 12 à 14). */
NIVEAU(SIS.rejouable({
  id: "tracabilite-dm",
  init: function (fig) { var A = SIS; return { g: A.s("g", null, fig.svg) }; },
  etapes: [
    { nom: "Trois traçabilités", jouer: function (j, n) {
      var A = SIS;
      j.titre("Relie chaque type de dispositif à ce qu'on doit tracer.");
      var p = A.paires({
        g: n.g, gauche: ["DM implantables", "Stérilisation", "Usage unique"],
        droite: ["Consommables rattachés à l'acte et au patient", "Lien dispositif, lot, patient", "Cycles, charges, dispositifs réutilisables"],
        bon: [1, 2, 0],
        xg: 20, wg: 240, xd: 320, wd: 340, y0: 50, h: 130, pas: 170, taille: 19, tailleD: 17,
        erreur: j.erreur, info: j.info,
        aide: function (i) { return ["Il reste dans le patient : il faut savoir lequel, de quel lot, chez qui.", "On réutilise le dispositif : on trace chaque passage à l'autoclave.", "Il est jeté après l'acte : on le rattache à l'acte et au patient."][i]; },
        fin: function () { j.bravo("Implantable : dispositif – lot – patient. Stérilisation : cycles et charges. Usage unique : acte et patient."); j.suite(); }
      });
      j.reponse(function () { p.resoudre(); });
    } },
    { nom: "Le lot rappelé", jouer: function (j, n) {
      var A = SIS, C = A.C;
      j.titre("Alerte de matériovigilance sur un lot de prothèses. Touche les maillons, dans l'ordre, pour retrouver les patients.");
      var nd = [
        { t: "Patients", sous: "à rappeler", x: 380, y: 330, w: 270, h: 110 },
        { t: "Alerte", sous: "matériovigilance", x: 30, y: 60, w: 270, h: 110 },
        { t: "Dispositifs", sous: "tracés au bloc", x: 30, y: 330, w: 270, h: 110 },
        { t: "Lot", sous: "numéro visé", x: 380, y: 60, w: 270, h: 110 }
      ];
      var tr = A.trace({ g: n.g, noeuds: nd, ordre: [1, 3, 2, 0], coul: C.jeu, taille: 22, erreur: j.erreur,
        aide: function (i, att, k) { return ["On part de l'alerte.", "L'alerte vise un lot.", "Du lot, on trouve les dispositifs implantés.", "Chaque dispositif est lié à un patient."][k]; },
        fin: function () { j.bravo("Alerte → lot → dispositifs → patients : grâce au lien obligatoire dispositif – lot – patient."); j.suite(); } });
      j.reponse(function () { tr.resoudre(); });
    } },
    { nom: "Responsable ou consulté", jouer: function (j, n) {
      var A = SIS;
      j.titre("Dans la matrice du cours, le biomédical est-il responsable (R) ou consulté (C) ? Range chaque activité.");
      var cartes = [
        { t: "Mise en service d'un moniteur", bac: 0 }, { t: "Association moniteur – patient", bac: 1 }, { t: "Panne d'un scanner", bac: 0 },
        { t: "Mise à jour logicielle d'un automate", bac: 0 }, { t: "Alerte de matériovigilance", bac: 0 }
      ];
      var t = A.trier({
        g: n.g, cartes: cartes, bacs: [{ t: "Biomédical R", sous: "responsable" }, { t: "Biomédical C", sous: "consulté" }],
        pos: A.grille(5, 1, 20, 14, 640, 50, 8), bacsPos: function (k) { return { x: 20 + k * 330, y: 320, w: 310, h: 240 }; },
        taille: 17, tailleBac: 24, erreur: j.erreur, info: j.info,
        aide: function (i) { return cartes[i].bac === 0 ? "C'est un appareil, sa mise en route, sa panne ou sa sécurité : le cœur du métier biomédical." : "Savoir quel patient est dans quel lit, c'est l'affaire du service."; },
        fin: function () { j.bravo("Le biomédical est responsable partout, sauf pour l'association moniteur – patient, où il est consulté."); j.suite(); }
      });
      j.reponse(function () { t.resoudre(); });
    } },
    { nom: "Le changement de chambre", jouer: function (j, n) {
      var A = SIS;
      A.scene(n.g, { icones: ["lit", "moniteur", "patient"], titre: "Nouveau patient dans la chambre 12", sous: "le moniteur doit être associé au bon patient", alerte: false });
      j.titre("Qui est responsable d'associer le moniteur au bon patient ?");
      j.choix([
        { html: "Le biomédical", aide: "Il est consulté : il connaît l'appareil, pas le patient du lit." },
        { html: "La DSI", aide: "Elle est consultée seulement." },
        { html: "Le service clinique", juste: true },
        { html: "Le fournisseur", aide: "Il n'est pas concerné par cette activité." }
      ], { colonnes: 2, ok: function () { j.bravo("Le service clinique : c'est lui qui sait quel patient est dans quel lit."); j.suite(); } });
    } },
    { nom: "Trois mondes", jouer: function (j, n) {
      var A = SIS;
      A.scene(n.g, { icones: ["patient", "engrenage", "document"], titre: "L'ingénieur biomédical dans le SIH", alerte: false });
      j.titre("Le cours conclut : l'ingénieur biomédical est à l'interface de trois mondes. Lesquels ?");
      j.choix([
        { html: "Le clinique, le technique et l'information médicale", juste: true },
        { html: "La finance, le juridique et le marketing", aide: "Pense à ce qu'il touche chaque jour : les soins, les appareils, les données." },
        { html: "Le laboratoire, la radiologie et la pharmacie", aide: "Ce sont des circuits, pas des mondes." }
      ], { colonnes: 1, ok: function () {
        j.bravo("Clinique, technique, information médicale.");
        j.expliquer("<p>Les trois messages de la séance : des <b>circuits interdépendants</b>, l'<b>identité</b> qui traverse tous les modules, et l'ingénieur biomédical à l'interface de <b>trois mondes</b>.</p>");
        j.suite();
      } });
    } }
  ]
}));
