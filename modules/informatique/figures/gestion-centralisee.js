/* Figure : une plateforme de gestion qui pilote tous les équipements ; la prendre, c'est tout prendre. */
(function () {
  "use strict";
  var R = RM, A = SIS, C = A.C;
  var f = R.figure("fig-centrale", {
    largeur: 960, hauteur: 440, titre: "Une plateforme pour tout piloter",
    essai: "<strong>Essaie</strong> : bascule « plateforme compromise ». <strong>Observe</strong> : tous les équipements passent sous le contrôle de l'attaquant en même temps."
  });
  var g = A.s("g", null, f.svg), pris = false;
  function dessiner() {
    A.vider(g);
    var E = [["Pare-feu", 120], ["Switchs", 330], ["Bornes Wi-Fi", 540], ["Routeurs", 750]];
    E.forEach(function (e) { A.s("line", { x1: 480, y1: 150, x2: e[1] + 90, y2: 300, stroke: pris ? C.ko : C.jeu, "stroke-width": 4 }, g); });
    A.boite(g, 300, 40, 360, 110, { titre: "Plateforme de gestion", sous: "configuration, accès, supervision, journaux, correctifs", fond: pris ? C.koPale : C.jeuPale, bord: pris ? C.ko : C.jeu, ep: 4, taille: 22 });
    if (pris) A.icone(g, "pirate", [700, 95], 60, C.ko);
    E.forEach(function (e) { A.boite(g, e[1], 300, 180, 80, { titre: e[0], fond: pris ? C.koPale : "#fff", bord: pris ? C.ko : C.encre, taille: 20 }); });
    f.direct.innerHTML = pris ? "<strong>Plateforme compromise</strong> : l'attaquant peut réécrire les règles de chaque équipement et contourner toute la segmentation." : "Depuis un seul endroit, l'équipe applique la même politique partout : cohérence, visibilité, rapidité.";
  }
  R.bascule(f.reglages, "Plateforme compromise", false, function (e) { pris = e.target.checked; dessiner(); });
  dessiner();
})();
