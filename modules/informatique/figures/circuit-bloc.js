/* Figure : le circuit périopératoire (bloc opératoire), étape par étape (S3-S4, diapo 9). */
(function () {
  "use strict";
  var R = RM, A = SIS, C = A.C;
  var E = [
    ["Programmation", "planning, consultation d'anesthésie", "le planning du bloc et la consultation d'anesthésie. Risque : déprogrammation ; indicateur : occupation des salles."],
    ["Accueil et check-list", "identité, site, consentement", "on vérifie l'identité, le site opératoire et le consentement. Risque : erreur de patient ou de site ; indicateur : check-list complétée."],
    ["Intervention", "DM, actes, implantables", "les DM, les actes et les implantables sont tracés. Risque : DM implantable non tracé (matériovigilance)."],
    ["Salle de réveil", "surveillance post-opératoire", "le patient est surveillé avant de remonter dans son service."],
    ["Comptes rendus et actes", "codage et facturation", "les comptes rendus sont rédigés, les actes codés et facturés. Indicateur : retard de première intervention, suivi sur le planning."]
  ];
  var f = R.figure("fig-bloc", { largeur: 960, hauteur: 380, titre: "Bloc opératoire : circuit périopératoire",
    essai: "<strong>Essaie</strong> : avance étape par étape. <strong>Observe</strong> : l'identité et le site sont vérifiés avant l'intervention, les implantables sont tracés pendant." });
  var N = E.map(function (e, i) { return { t: e[0], sous: e[1], x: 10 + i * 190, y: 30, w: 175, h: 120, taille: 17, tailleSous: 14 }; });
  A.etapesFig(f, N, E.map(function (e) { return "<strong>" + e[0] + "</strong> : " + e[2]; }), {
    fond: function (g, k) {
      if (k < E.length) return;
      A.boite(g, 10, 190, 940, 150, { titre: "Côté biomédical", sous: "table, scialytique, respirateur d'anesthésie, colonne vidéo : maintenance, stérilisation, traçabilité", taille: 19, tailleSous: 17, fond: C.turqPale, bord: C.turq });
    }, depart: "Avance pour suivre le patient au bloc."
  });
})();
