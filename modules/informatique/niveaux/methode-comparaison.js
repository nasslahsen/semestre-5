/* Niveau : trois niveaux de comparaison, méthode en cinq étapes, critère éliminatoire, trois scénarios de démonstration (S5, diapos 12 et 13). */
NIVEAU(SIS.rejouable({
  id: "methode-comparaison",
  init: function (fig) {
    var A = SIS, g = A.s("g", null, fig.svg);
    var n = { g: g };
    n.cinq = function (noms, place) { return noms.map(function (e, i) { var c = place[i]; return { t: e[0], sous: e[1], x: c === 4 ? 185 : 20 + (c % 2) * 330, y: 40 + Math.floor(c / 2) * 180, w: 310, h: 110 }; }); };
    return n;
  },
  etapes: [
    { nom: "La méthode", jouer: function (j, n) {
      var A = SIS, C = A.C;
      j.titre("Touche les cinq étapes de la méthode de comparaison, dans l'ordre.");
      var nd = n.cinq([["Critères éliminatoires", "conformité, sécurité, intégration"], ["Critères pondérés", "poids fixés avant"], ["Notes sur preuves", "démonstrations, visites"], ["Coût complet sur 7 ans", "au-delà du prix d'achat"], ["Analyse de sensibilité", "le classement résiste-t-il ?"]], [3, 0, 4, 1, 2]);
      var tr = A.trace({ g: n.g, noeuds: nd, ordre: [0, 1, 2, 3, 4], coul: C.jeu, taille: 19, erreur: j.erreur,
        aide: function (i, att, k) { return ["D'abord on écarte ce qui ne passe pas.", "Puis on fixe les poids.", "On note, preuves à l'appui.", "On chiffre sur toute la durée.", "Enfin, on teste la solidité du classement."][k]; },
        fin: function () { j.bravo("Éliminatoires → pondérés → notes sur preuves → coût complet → sensibilité."); j.suite(); } });
      j.reponse(function () { tr.resoudre(); });
    } },
    { nom: "Quel niveau ?", jouer: function (j, n) {
      var A = SIS;
      A.scene(n.g, { icones: ["personne", "serveur"], titre: "Visite d'un hôpital qui utilise déjà l'offre B", alerte: false });
      j.titre("L'équipe visite un hôpital qui utilise déjà l'offre B. Quel niveau de comparaison est-ce ?");
      j.choix([
        { html: "Les offres entre elles", aide: "On ne compare pas deux dossiers : on va voir la solution en service." },
        { html: "Les sites de référence", juste: true },
        { html: "Des établissements comparables", aide: "Ce niveau compare des hôpitaux proches du CHU, qu'ils aient ou non la solution." }
      ], { colonnes: 1, ok: function () { j.bravo("Un site de référence : un établissement qui utilise déjà la solution."); j.suite(); } });
    } },
    { nom: "Le meilleur score", jouer: function (j, n) {
      var A = SIS, C = A.C;
      A.vider(n.g);
      A.tableau(n.g, 60, 170, [200, 180, 180], 80, [["", "Offre X", "Offre Y"], ["Score pondéré", "4,2", "3,1"], ["Certificat du logiciel", "absent", "fourni"]], { taille: 20, style: function (i, k) { return i === 2 && k === 1 ? { fond: C.koPale, bord: C.ko, ep: 2.5, gras: 700 } : null; } });
      A.texte(n.g, "La conformité est un critère éliminatoire (exemple ajouté)", [340, 450], { taille: 15, coul: C.doux });
      j.titre("L'offre X a le meilleur score, mais n'a pas de certificat pour son logiciel. Que retient le comité ?");
      j.choix([
        { html: "X : son score est bien meilleur", aide: "Relis la règle sur les critères éliminatoires." },
        { html: "Y : X est écartée, quel que soit son score", juste: true },
        { html: "On fait la moyenne des deux", aide: "Un critère éliminatoire ne se moyenne pas." }
      ], { colonnes: 1, ok: function () { j.bravo("Une offre qui échoue à un critère éliminatoire est écartée, quel que soit son score."); j.suite(); } });
    } },
    { nom: "Trois scénarios", jouer: function (j, n) {
      var A = SIS;
      j.titre("Relie chaque scénario de démonstration à ce qu'il teste.");
      var p = A.paires({
        g: n.g, gauche: ["Identité provisoire", "Protocole modifié en urgence", "Panne de l'étiqueteuse"],
        droite: ["Les validations et la traçabilité d'une dose changée", "Le mode dégradé en cours de préparation", "L'identité et son rapprochement ultérieur"],
        bon: [2, 0, 1],
        xg: 20, wg: 250, xd: 320, wd: 340, y0: 50, h: 130, pas: 170, taille: 19, tailleD: 17,
        erreur: j.erreur, info: j.info,
        aide: function (i) { return ["Le patient arrive sans dossier à jour.", "L'oncologue change une dose.", "Un appareil tombe pendant la préparation."][i]; },
        fin: function () { j.bravo("Identité, modification, panne : les scénarios de l'hôpital, pas ceux de l'éditeur."); j.suite(); }
      });
      j.reponse(function () { p.resoudre(); });
    } },
    { nom: "Les poids avant", jouer: function (j, n) {
      var A = SIS;
      A.scene(n.g, { icones: ["document", "cadenas"], titre: "Poids fixés avant d'ouvrir les offres", alerte: false });
      j.titre("Pourquoi fixer les poids des critères avant de voir les offres ?");
      j.choix([
        { html: "Pour ne pas les ajuster, même sans le vouloir, à l'offre qu'on préfère", juste: true },
        { html: "Parce que c'est plus rapide", aide: "La raison touche à l'objectivité." },
        { html: "Pour que le fournisseur les connaisse", aide: "La raison touche au comité, pas au fournisseur." }
      ], { colonnes: 1, ok: function () { j.bravo("Des poids fixés avant : la comparaison reste objective."); j.suite(); } });
    } }
  ]
}));
