/* Figure : un chemin du poste au PACS ; on double chaque maillon et on regarde si une panne coupe encore le service. */
(function () {
  "use strict";
  var R = RM, A = SIS, C = A.C;
  var f = R.figure("fig-spof", {
    largeur: 960, hauteur: 420, titre: "Doubler chaque maillon",
    essai: "<strong>Essaie</strong> : mets un maillon en panne, puis active la redondance. <strong>Observe</strong> : sans redondance, chaque maillon est un SPOF ; avec, le service tient."
  });
  var g = A.s("g", null, f.svg), panne = 1, red = false;
  var M = ["Pare-feu", "Cœur de réseau", "Lien", "Serveur PACS"];
  function dessiner() {
    A.vider(g);
    A.icone(g, "ecran", [60, 200], 60); A.texte(g, "Poste", [60, 250], { taille: 16, gras: 700 });
    var ok = red || panne < 0;
    M.forEach(function (m, i) {
      var x = 140 + i * 200;
      [0, 1].forEach(function (d) {
        if (d === 1 && !red) return;
        var y = red ? (d ? 250 : 110) : 170, hs = i === panne && d === 0;
        A.boite(g, x, y, 170, 70, { titre: m + (red ? (d ? " B" : " A") : ""), fond: hs ? C.koPale : C.okPale, bord: hs ? C.ko : C.ok, taille: 17 });
        if (hs) A.texte(g, "en panne", [x + 85, y + 88], { taille: 16, gras: 700, coul: C.ko });
      });
    });
    A.texte(g, ok ? "Service disponible" : "Service coupé : SPOF", [480, 380], { taille: 24, gras: 800, coul: ok ? C.ok : C.ko });
    f.direct.innerHTML = red ? "Chaque maillon est doublé : la panne de « " + M[panne] + " A » bascule sur « " + M[panne] + " B »." : "Un seul exemplaire de chaque maillon : la panne du « " + M[panne] + " » coupe tout le chemin.";
  }
  var bt = R.boutons(f.reglages);
  M.forEach(function (m, i) { R.bouton(bt, m, function () { panne = i; dessiner(); }); });
  R.bascule(f.reglages, "Redondance", false, function (e) { red = e.target.checked; dessiner(); });
  dessiner();
})();
