/* Niveau : circuit transfusionnel, chaîne d'un incident type et ses barrières, vue comparée des circuits (S3-S4, diapos 9 et 10). */
NIVEAU(SIS.rejouable({
  id: "circuit-sang",
  init: function (fig) {
    var A = SIS, g = A.s("g", null, fig.svg);
    var n = { g: g };
    n.cinq = function (noms, place) { return noms.map(function (e, i) { var c = place[i]; return { t: e[0], sous: e[1], x: c === 4 ? 185 : 20 + (c % 2) * 330, y: 40 + Math.floor(c / 2) * 180, w: 310, h: 110 }; }); };
    return n;
  },
  etapes: [
    { nom: "Le circuit du sang", jouer: function (j, n) {
      var A = SIS, C = A.C;
      j.titre("Une transfusion est décidée. Touche les cinq étapes du circuit transfusionnel, dans l'ordre.");
      var nd = n.cinq([["Prescription de PSL", "produits sanguins labiles"], ["Bilan pré-transfusionnel", "groupage ABO / Rh, RAI"], ["Dépôt de sang", "réception, délivrance"], ["Contrôle ultime", "au lit du malade"], ["Traçabilité", "donneur, poche, receveur"]], [1, 4, 0, 3, 2]);
      var tr = A.trace({ g: n.g, noeuds: nd, ordre: [0, 1, 2, 3, 4], coul: C.jeu, taille: 19, erreur: j.erreur,
        aide: function (i, att, k) { return ["D'abord le médecin prescrit.", "Avant de délivrer, il faut connaître le groupe du patient.", "La poche sort du dépôt.", "Au lit, une dernière vérification.", "On garde le lien donneur – poche – receveur."][k]; },
        fin: function () { j.bravo("Prescription de PSL → bilan pré-transfusionnel → dépôt de sang → contrôle ultime → traçabilité."); j.suite(); } });
      j.reponse(function () { tr.resoudre(); });
    } },
    { nom: "Remonter la chaîne", jouer: function (j, n) {
      var A = SIS, C = A.C;
      j.titre("Un patient a fait une incompatibilité ABO. Reconstitue la chaîne de l'incident : touche les maillons dans l'ordre, de la cause à l'effet.");
      var nd = n.cinq([["Prélèvement mal étiqueté", ""], ["Groupage sur la mauvaise identité", ""], ["Poche délivrée sur ce groupage", ""], ["Contrôle ultime non fait ou mal fait", ""], ["Incompatibilité ABO", ""]], [2, 0, 3, 4, 1]);
      nd.forEach(function (x) { delete x.sous; });
      var tr = A.trace({ g: n.g, noeuds: nd, ordre: [0, 1, 2, 3, 4], coul: C.ko, taille: 19, erreur: j.erreur,
        aide: function (i, att, k) { return ["Tout part d'une erreur d'identité sur le tube.", "Le labo analyse ce tube sous le mauvais nom.", "Le dépôt délivre une poche selon ce groupe faux.", "La dernière barrière au lit ne joue pas.", "L'effet final."][k]; },
        fin: function () { j.bravo("Prélèvement → groupage → délivrance → contrôle ultime → incompatibilité."); j.suite(); } });
      j.reponse(function () { tr.resoudre(); });
    } },
    { nom: "Les barrières", jouer: function (j, n) {
      var A = SIS;
      j.titre("Quatre barrières ont cédé. Range chacune : informatique ou humaine ?");
      var cartes = [{ t: "Rapprochement poche – patient", bac: 0 }, { t: "Vérification d'identité", bac: 1 }, { t: "Alerte de compatibilité", bac: 0 }, { t: "Contrôle ultime au lit", bac: 1 }];
      var t = A.trier({
        g: n.g, cartes: cartes, bacs: [{ t: "Informatique", sous: "le SIH" }, { t: "Humaine", sous: "un soignant" }],
        pos: A.grille(4, 2, 20, 30, 640, 90, 16), bacsPos: function (k) { return { x: 20 + k * 330, y: 290, w: 310, h: 260 }; },
        taille: 18, tailleBac: 24, erreur: j.erreur, info: j.info,
        aide: function (i) { return cartes[i].bac === 0 ? "C'est le système qui le fait, sans geste humain." : "C'est un geste du soignant."; },
        fin: function () { j.bravo("Informatiques : rapprochement et alerte. Humaines : vérification d'identité et contrôle ultime."); j.suite(); }
      });
      j.reponse(function () { t.resoudre(); });
    } },
    { nom: "Vue comparée", jouer: function (j, n) {
      var A = SIS;
      j.titre("Relie chaque module à son risque majeur.");
      var p = A.paires({
        g: n.g, gauche: ["Admission", "LIS", "RIS", "PIS", "Bloc opératoire", "Circuit du sang"],
        droite: ["Compte rendu tardif", "Incompatibilité ABO", "Doublon, collision", "Erreur de patient ou de site", "Alerte ignorée", "Prélèvement mal identifié"],
        bon: [2, 5, 0, 4, 3, 1],
        xg: 20, wg: 230, xd: 330, wd: 330, y0: 25, h: 78, pas: 92, taille: 18, tailleD: 17,
        erreur: j.erreur, info: j.info,
        aide: function (i) { return ["On y crée l'identité et le séjour.", "Le laboratoire : tout se joue au prélèvement.", "L'imagerie : le patient attend le résultat.", "Le médicament : trop d'alertes.", "Le bloc : la check-list vise ce risque.", "La transfusion : groupes sanguins."][i]; },
        fin: function () { j.bravo("Chaque module a sa donnée clé, son risque majeur et son indicateur phare."); j.suite(); }
      });
      j.reponse(function () { p.resoudre(); });
    } }
  ]
}));
