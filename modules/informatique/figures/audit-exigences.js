/* Figure : le cahier d'exigences de l'ingénieur biomédical, sept familles (S5, diapo 9). */
(function () {
  "use strict";
  var R = RM, A = SIS, C = A.C;
  var f = R.figure("fig-exigences", { largeur: 960, hauteur: 420, titre: "Sept familles d'exigences",
    essai: "<strong>Essaie</strong> : touche une famille. <strong>Observe</strong> : chaque famille pose une question et réclame une preuve, jamais une simple description." });
  var F = [
    ["Conformité réglementaire", "Les DM et le logiciel sont-ils conformes et autorisés ?", "certificats, déclaration de conformité, notice en langue d'usage"],
    ["Sécurité du patient", "Que fait le système pour empêcher une erreur de dose ou de patient ?", "rapports de validation, incidents signalés ailleurs, scénarios de test"],
    ["Sécurité du personnel", "Comment limite-t-on l'exposition aux produits cytotoxiques ?", "rapports de qualification, mesures de contamination, ergonomie du poste"],
    ["Intégration au SIH", "La bonne prescription arrive-t-elle sur le bon patient, sans ressaisie ?", "site de référence comparable, tests avec identités fictives, engagement contractuel"],
    ["Cybersécurité", "Qui accède, qui trace, jusqu'à quand les correctifs ?", "engagements contractuels, accès à distance encadré, durée de support"],
    ["Continuité", "Que fait-on si le système, l'étiqueteuse ou le réseau tombe ?", "procédure de mode dégradé testée, délai de reprise, stock de secours"],
    ["Maintenance et cycle de vie", "Quelle disponibilité garantie, quel délai d'intervention, quelle fin de vie ?", "contrat de maintenance, pénalités, plan de renouvellement, réversibilité"]
  ];
  var pos = function (i) { return i < 4 ? { x: 20 + i * 235, y: 40 } : { x: 137 + (i - 4) * 235, y: 210 }; };
  var items = F.map(function (x, i) { var p = pos(i); return { x: p.x, y: p.y, w: 215, h: 140, t: x[0], texte: "<em>" + x[1] + "</em> Preuve : " + x[2] + ".", taille: 18, coul: C.jeu, pale: C.jeuPale }; });
  A.explorer(f, items, { fond: function (g) {
    A.texte(g, "Chaque ligne est une exigence et une preuve", [480, 395], { taille: 16, coul: C.doux });
  }, invite: "Touche une famille." });
})();
