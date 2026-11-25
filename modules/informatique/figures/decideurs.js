/* Figure : qui décide de l'investissement ? Neuf acteurs et leur rôle (S5, diapo 4). */
(function () {
  "use strict";
  var R = RM, A = SIS, C = A.C;
  var f = R.figure("fig-decideurs", { largeur: 960, hauteur: 420, titre: "Qui décide de l'investissement ?",
    essai: "<strong>Essaie</strong> : touche chaque acteur. <strong>Observe</strong> : un seul décide et finance, un autre arbitre, les autres portent chacun une partie du projet." });
  var L = [
    ["Direction générale", "décide et finance."], ["Comité de pilotage", "arbitre le projet."], ["Commission médicale et oncologues", "activité et protocoles."],
    ["Pharmacie", "prépare et valide les doses."], ["Direction des soins", "parcours infirmier."], ["DSI et DIM", "système et données."],
    ["Qualité et risques", "analyse des risques."], ["Services techniques", "locaux et fluides."], ["Ingénieur biomédical", "exigences techniques et sécurité. Il ne décide pas des protocoles thérapeutiques ni de leur paramétrage clinique."]
  ];
  var items = L.map(function (l, i) { var bio = i === 8; return { x: 20 + (i % 3) * 315, y: 20 + Math.floor(i / 3) * 130, w: 295, h: 112, t: l[0], texte: l[1], taille: 19, coul: bio ? C.turq : C.jeu, pale: bio ? C.turqPale : C.jeuPale, bord: bio ? C.turq : C.encre }; });
  A.explorer(f, items, { invite: "Touche un acteur." });
})();
