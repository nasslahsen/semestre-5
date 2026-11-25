/* Figure : les couches de défense autour d'un bien critique ; une attaque qui franchit une couche bute sur la suivante. */
(function () {
  "use strict";
  var R = RM, A = SIS, C = A.C;
  var f = R.figure("fig-couches", {
    largeur: 960, hauteur: 520, titre: "Des couches autour du bien à protéger",
    essai: "<strong>Essaie</strong> : franchis les couches une à une. <strong>Observe</strong> : tant qu'il reste une couche, le bien est encore protégé."
  });
  var g = A.s("g", null, f.svg);
  var L = ["Sécurité physique", "Pare-feu", "IDS / IPS", "VPN", "Journalisation, supervision", "Antivirus"];
  function dessiner(k) {
    A.vider(g);
    L.forEach(function (l, i) {
      var rx = 450 - i * 62, ry = 250 - i * 37, franchie = i < k;
      A.s("ellipse", { cx: 480, cy: 262, rx: rx, ry: ry, fill: franchie ? C.koPale : i % 2 ? "#fff" : C.fond, stroke: franchie ? C.ko : C.jeu, "stroke-width": franchie ? 2 : 3.5, "stroke-dasharray": franchie ? "6 6" : null }, g);
      A.texte(g, l, [480, 262 - ry + 19], { taille: 17, gras: 700, coul: franchie ? C.ko : C.encre });
    });
    A.icone(g, "base", [480, 270], 50, k >= 6 ? C.ko : C.ok);
    A.texte(g, "DPI, PACS", [480, 312], { taille: 16, gras: 800 });
    f.direct.innerHTML = k === 0 ? "Six couches entourent le bien critique." : k < 6 ? k + " couche" + (k > 1 ? "s" : "") + " franchie" + (k > 1 ? "s" : "") + " : la couche « " + L[k] + " » peut encore réagir." : "Toutes les couches sont franchies : c'est le seul cas où le bien est atteint.";
  }
  var et = R.etapes(f.reglages, 6, ["Intact"].concat(L.map(function (l) { return "Franchir : " + l; })), dessiner);
  et.aller(0);
})();
