/* Boss du chapitre 7 (cours SIS) : le comité du centre d'oncologie, de l'éliminatoire à la grille, à la matrice et à l'audit. */
NIVEAU(SIS.rejouable({
  id: "boss-gouvernance",
  init: function (fig) { var A = SIS; return { g: A.s("g", null, fig.svg) }; },
  etapes: [
    { nom: "Deux offres, deux défauts", jouer: function (j, n) {
      var A = SIS, C = A.C;
      A.vider(n.g);
      A.tableau(n.g, 30, 120, [220, 200, 200], 90, [["", "Offre E", "Offre F"], ["Score pondéré", "3,9", "3,6"], ["Mode dégradé", "aucun", "documenté et testé"], ["Certificat du logiciel", "fourni", "en cours"]], { taille: 18 });
      A.texte(n.g, "Exemple ajouté. Éliminatoires : conformité, continuité.", [340, 520], { taille: 15, coul: C.doux });
      j.titre("Continuité et conformité sont des critères éliminatoires. Quel verdict ?");
      j.choix([
        { html: "E retenue : meilleur score", aide: "Un critère éliminatoire raté écarte l'offre, quel que soit son score." },
        { html: "E écartée (pas de mode dégradé). F retenue sous condition : certificat avant la signature", juste: true },
        { html: "Les deux écartées", aide: "Un certificat en cours peut devenir une condition suspensive. Une absence de mode dégradé, non." }
      ], { colonnes: 1, ok: function () {
        j.bravo("Un manque qu'un document peut combler devient une condition suspensive.");
        j.suite();
      } });
    } },
    { nom: "La grille du comité", jouer: function (j, n) {
      var A = SIS, C = A.C;
      A.vider(n.g);
      A.tableau(n.g, 40, 90, [220, 100, 120, 120], 62, [["Critère", "Poids", "A", "B"], ["Sécurité", "40 %", "5", "3"], ["Intégration", "25 %", "3", "4"], ["Coût complet", "15 %", "2", "4"], ["Maintenance", "10 %", "4", "3"], ["Ergonomie", "10 %", "3", "4"]], { taille: 19, style: function (i, k) { return i > 0 && k > 0 ? { mono: true } : null; } });
      A.texte(n.g, "Notes du cours, poids choisis par le comité", [340, 500], { taille: 15, coul: C.doux });
      j.titre("Calcule les totaux des deux offres avec ces poids.");
      j.nombre({ cases: [{ attendu: 3.75, tol: 0.001 }, { attendu: 3.5, tol: 0.001 }], ligne: true, avant: "\\text{Total}_A,\\ \\text{Total}_B :", aide: function (k) { return k === 0 ? "A : (40 × 5 + 25 × 3 + 15 × 2 + 10 × 4 + 10 × 3) / 100." : "B : (40 × 3 + 25 × 4 + 15 × 4 + 10 × 3 + 10 × 4) / 100."; }, ok: function () { j.bravo("A = 3,75, B = 3,50 : plus la sécurité pèse, plus A s'éloigne."); j.suite(); } });
    } },
    { nom: "R ou C", jouer: function (j, n) {
      var A = SIS;
      j.titre("Dans la matrice du projet, range chaque activité selon le rôle de l'ingénieur biomédical.");
      var cartes = [
        { t: "Exigences de sécurité des équipements", bac: 0 }, { t: "Protocoles et paramétrage clinique", bac: 1 }, { t: "Recette de l'intégration au SIH", bac: 0 },
        { t: "Qualification avant la 1re préparation", bac: 0 }, { t: "Formation des opérateurs", bac: 1 }, { t: "Mode dégradé en cas de panne", bac: 0 }
      ];
      var t = A.trier({
        g: n.g, cartes: cartes, bacs: [{ t: "Biomédical R" }, { t: "Biomédical C" }],
        pos: A.grille(6, 2, 20, 20, 640, 74, 12), bacsPos: function (k) { return { x: 20 + k * 330, y: 300, w: 310, h: 260 }; },
        taille: 16, tailleBac: 24, erreur: j.erreur, info: j.info,
        aide: function (i) { return cartes[i].bac === 0 ? "Équipement, sécurité, recette, panne : c'est son cœur de métier." : "C'est porté par les métiers : il est consulté."; },
        fin: function () { j.bravo("R : exigences, recette, qualification, mode dégradé. C : protocoles, formation."); j.suite(); }
      });
      j.reponse(function () { t.resoudre(); });
    } },
    { nom: "Le compte partagé", jouer: function (j, n) {
      SIS.scene(n.g, { icones: ["cle", "pirate"], titre: "Accès à distance par un compte fournisseur partagé" });
      j.titre("À la réception, on découvre un accès à distance par un compte fournisseur partagé. Quelle exigence et quelle preuve ajouter ?");
      j.choix([
        { html: "Cybersécurité : comptes nominatifs, accès à distance encadré, engagement contractuel", juste: true },
        { html: "Continuité : stock de secours", aide: "Le compte partagé pose la question de qui accède et qui trace." },
        { html: "Conformité : notice en langue d'usage", aide: "La conformité ne règle pas les accès." }
      ], { colonnes: 1, ok: function () { j.bravo("Qui accède, qui trace : cybersécurité, avec une preuve contractuelle."); j.suite(); } });
    } }
  ]
}));
