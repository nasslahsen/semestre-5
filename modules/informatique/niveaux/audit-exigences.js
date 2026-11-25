/* Niveau : l'audit (objectif, types, condition, critères) et le cahier d'exigences de l'ingénieur biomédical (S5, diapos 8 et 9). */
NIVEAU(SIS.rejouable({
  id: "audit-exigences",
  init: function (fig) { var A = SIS; return { g: A.s("g", null, fig.svg) }; },
  etapes: [
    { nom: "La condition d'audit", jouer: function (j, n) {
      var A = SIS;
      A.scene(n.g, { icones: ["document", "personne"], titre: "Auditer les deux offres", alerte: false });
      j.titre("Sans quoi ne peut-on pas mener un audit, selon le cours ?");
      j.choix([
        { html: "Un référentiel et une méthodologie", juste: true },
        { html: "Un fournisseur d'accord pour être audité", aide: "Le cours parle de ce dont l'auditeur a besoin pour juger." },
        { html: "Un budget validé", aide: "Ce n'est pas une condition d'audit." }
      ], { colonnes: 1, ok: function () {
        j.bravo("Un référentiel et une méthodologie.");
        j.expliquer("<p>Les critères d'audit : <b>objectivité</b> et <b>neutralité</b>. Ici, l'objectif est la <b>sélection sur évaluation</b>. Il existe d'autres types : conformité, contrôle, certification, interne, externe.</p>");
        j.suite();
      } });
    } },
    { nom: "Une preuve par famille", jouer: function (j, n) {
      var A = SIS;
      j.titre("Relie chaque famille d'exigences à la preuve à exiger.");
      var p = A.paires({
        g: n.g, gauche: ["Conformité réglementaire", "Sécurité du personnel", "Intégration au SIH", "Cybersécurité", "Continuité"],
        droite: ["Accès à distance encadré", "Tests avec identités fictives", "Certificats, déclaration de conformité", "Procédure de mode dégradé testée", "Mesures de contamination"],
        bon: [2, 4, 1, 0, 3],
        xg: 20, wg: 280, xd: 360, wd: 300, y0: 30, h: 90, pas: 110, taille: 18, tailleD: 17,
        erreur: j.erreur, info: j.info,
        aide: function (i) { return ["Le DM est-il autorisé ? Un document officiel le prouve.", "On mesure l'exposition aux cytotoxiques.", "La bonne prescription arrive-t-elle sur le bon patient ? On teste.", "Qui accède à distance ?", "Que fait-on si le système tombe ?"][i]; },
        fin: function () { j.bravo("Chaque famille a sa preuve vérifiable."); j.suite(); }
      });
      j.reponse(function () { p.resoudre(); });
    } },
    { nom: "L'exigence mal écrite", jouer: function (j, n) {
      var A = SIS, C = A.C;
      A.vider(n.g);
      A.boite(n.g, 60, 170, 560, 200, { titre: "« Le robot doit être rapide, moderne et fiable. »", sous: "ligne proposée pour le cahier d'exigences", taille: 26, tailleSous: 17, fond: C.koPale, bord: C.ko });
      j.titre("Un collègue propose cette ligne pour le cahier d'exigences. Qu'est-ce qui ne va pas ?");
      j.choix([
        { html: "Rien : elle couvre la sécurité et la performance", aide: "Comment le fournisseur pourrait-il prouver « moderne » ?" },
        { html: "C'est une description, sans question précise ni preuve à exiger", juste: true },
        { html: "Elle devrait parler du prix", aide: "Le prix est dans le coût complet, pas dans cette ligne." }
      ], { colonnes: 1, ok: function () {
        j.bravo("Chaque ligne est une exigence et une preuve, pas une description technique.");
        j.expliquer("<p>Mieux : « Que fait le système pour empêcher une erreur de dose ou de patient ? » avec comme preuve des <b>rapports de validation</b>, les <b>incidents signalés ailleurs</b> et des <b>scénarios de test</b>.</p>");
        j.suite();
      } });
    } },
    { nom: "La bonne famille", jouer: function (j, n) {
      var A = SIS;
      j.titre("Relie chaque question de l'ingénieur biomédical à sa famille.");
      var p = A.paires({
        g: n.g, gauche: ["Qui accède, qui trace, jusqu'à quand les correctifs ?", "Quelle disponibilité garantie, quelle fin de vie ?", "Que fait le système pour empêcher une erreur de dose ?"],
        droite: ["Sécurité du patient", "Cybersécurité", "Maintenance et cycle de vie"],
        bon: [1, 2, 0],
        xg: 20, wg: 380, xd: 450, wd: 210, y0: 40, h: 140, pas: 180, taille: 17, tailleD: 18,
        erreur: j.erreur, info: j.info,
        aide: function (i) { return ["Accès, traces, correctifs : la sécurité informatique.", "Disponibilité, durée de vie : l'entretien.", "Erreur de dose : le risque pour le patient."][i]; },
        fin: function () { j.bravo("Cybersécurité, maintenance et cycle de vie, sécurité du patient."); j.suite(); }
      });
      j.reponse(function () { p.resoudre(); });
    } }
  ]
}));
