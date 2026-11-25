/* Figure : propagation d'un rançongiciel dans un LAN ouvert et dans un réseau micro-segmenté. */
(function () {
  "use strict";
  var R = RM, A = SIS, C = A.C;
  var f = R.figure("fig-zt", {
    largeur: 960, hauteur: 460, titre: "LAN ouvert ou micro-segmentation",
    essai: "<strong>Essaie</strong> : bascule entre les deux réseaux. <strong>Observe</strong> : jusqu'où va le rançongiciel parti du poste A."
  });
  var g = A.s("g", null, f.svg), zt = false;
  var N = [["Poste A", "ecran", 150, 120], ["Poste B", "ecran", 480, 120], ["IoMT", "moniteur", 810, 120], ["DPI", "serveur", 150, 330], ["PACS", "serveur", 480, 330], ["Données", "base", 810, 330]];
  function dessiner() {
    A.vider(g);
    if (!zt) A.s("rect", { x: 40, y: 40, width: 880, height: 380, rx: 26, fill: C.koPale, stroke: C.ko, "stroke-width": 2 }, g);
    N.forEach(function (n, i) {
      var inf = i === 0 || !zt;
      if (zt) A.s("rect", { x: n[2] - 120, y: n[3] - 80, width: 240, height: 160, rx: 20, fill: i === 0 ? C.koPale : C.okPale, stroke: i === 0 ? C.ko : C.ok, "stroke-width": 3 }, g);
      A.icone(g, n[1], [n[2], n[3] - 10], 70, inf ? C.ko : C.ok);
      A.texte(g, n[0], [n[2], n[3] + 50], { taille: 19, gras: 800, coul: inf ? C.ko : C.encre });
      if (i > 0 && !zt) A.fleche(g, [150 + (n[2] - 150) * 0.32, 120 + (n[3] - 120) * 0.42], [150 + (n[2] - 150) * 0.72, 120 + (n[3] - 120) * 0.72], { ep: 3.5, coul: C.ko });
    });
    if (zt) { A.texte(g, "×", [315, 120], { taille: 44, gras: 800, coul: C.ko }); A.texte(g, "×", [150, 230], { taille: 44, gras: 800, coul: C.ko }); }
    f.direct.innerHTML = zt ? "<strong>Micro-segmentation</strong> : chaque ressource est un îlot ; le poste A infecté reste seul, la propagation latérale est bloquée." : "<strong>LAN ouvert</strong> : tout le monde voit tout ; le rançongiciel parti du poste A atteint les autres postes, l'IoMT et les serveurs.";
  }
  R.bascule(f.reglages, "Micro-segmentation", false, function (e) { zt = e.target.checked; dessiner(); });
  dessiner();
})();
