/* Niveau : qui décide de l'investissement, ce que porte l'ingénieur biomédical (S5, diapos 4 et 5). */
NIVEAU(SIS.rejouable({
  id: "decideurs",
  init: function (fig) { var A = SIS; return { g: A.s("g", null, fig.svg) }; },
  etapes: [
    { nom: "Qui fait quoi", jouer: function (j, n) {
      var A = SIS;
      j.titre("Relie chaque acteur du projet à son rôle.");
      var p = A.paires({
        g: n.g, gauche: ["Direction générale", "Comité de pilotage", "Pharmacie", "DSI et DIM", "Services techniques", "Ingénieur biomédical"],
        droite: ["Arbitre le projet", "Exigences techniques et sécurité", "Décide et finance", "Locaux et fluides", "Prépare et valide les doses", "Système et données"],
        bon: [2, 0, 4, 5, 3, 1],
        xg: 20, wg: 270, xd: 360, wd: 300, y0: 25, h: 78, pas: 92, taille: 18, tailleD: 17,
        erreur: j.erreur, info: j.info,
        aide: function (i) { return ["C'est elle qui paie.", "Il tranche entre les acteurs.", "Elle travaille sur les médicaments.", "Informatique et information médicale.", "Ils gèrent le bâtiment.", "Il porte la partie technique et la sécurité des équipements."][i]; },
        fin: function () { j.bravo("La direction générale décide et finance, le comité arbitre, chacun porte sa part."); j.suite(); }
      });
      j.reponse(function () { p.resoudre(); });
    } },
    { nom: "Son périmètre", jouer: function (j, n) {
      var A = SIS;
      j.titre("Range chaque tâche : l'ingénieur biomédical la porte, ou il ne la décide pas ?");
      var cartes = [
        { t: "Programme et descriptifs techniques", bac: 0 }, { t: "Protocoles thérapeutiques", bac: 1 }, { t: "Réception et qualification", bac: 0 },
        { t: "Maintenance et métrologie", bac: 0 }, { t: "Paramétrage clinique des protocoles", bac: 1 }, { t: "Analyse technique des offres", bac: 0 }
      ];
      var t = A.trier({
        g: n.g, cartes: cartes, bacs: [{ t: "Il porte" }, { t: "Il ne décide pas" }],
        pos: A.grille(6, 2, 20, 20, 640, 74, 12), bacsPos: function (k) { return { x: 20 + k * 330, y: 300, w: 310, h: 260 }; },
        taille: 17, tailleBac: 24, erreur: j.erreur, info: j.info,
        aide: function (i) { return cartes[i].bac === 0 ? "C'est technique : l'équipement, sa réception, son entretien." : "C'est clinique : cela relève des oncologues et des pharmaciens."; },
        fin: function () { j.bravo("Il porte le technique. Les protocoles et leur paramétrage clinique restent aux oncologues et aux pharmaciens."); j.suite(); }
      });
      j.reponse(function () { t.resoudre(); });
    } },
    { nom: "La dose maximale", jouer: function (j, n) {
      var A = SIS;
      A.scene(n.g, { icones: ["pilule", "ecran"], titre: "Relever la dose maximale d'un protocole dans le logiciel ?", alerte: false });
      j.titre("Un oncologue demande de relever la dose maximale d'un protocole dans le logiciel. Qui en décide ?");
      j.choix([
        { html: "L'ingénieur biomédical, puisque c'est le logiciel de son équipement", aide: "Le paramétrage clinique n'est pas dans son périmètre." },
        { html: "Les oncologues et les pharmaciens", juste: true },
        { html: "Le fournisseur", aide: "Il peut faire la manipulation, mais la décision est clinique." }
      ], { colonnes: 1, ok: function () {
        j.bravo("Paramétrage clinique : oncologues et pharmaciens.");
        j.expliquer("<p>L'ingénieur biomédical ne décide pas des <b>protocoles thérapeutiques</b> ni de leur <b>paramétrage clinique</b>. Il veille en revanche à ce que l'équipement et le logiciel soient conformes et qualifiés.</p>");
        j.suite();
      } });
    } }
  ]
}));
