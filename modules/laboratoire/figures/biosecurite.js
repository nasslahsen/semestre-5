/* Figure : les quatre niveaux de biosécurité, du laboratoire ouvert au laboratoire le plus fermé. */
(function () {
  "use strict";
  var R = RM, A = LABO, C = A.C;

  var f = R.figure("fig-biosecurite", {
    largeur: 960, hauteur: 540, titre: "Les quatre niveaux de biosécurité",
    essai: "<strong>Essaie</strong> : fais varier le niveau. <strong>Observe</strong> : plus l'agent est dangereux, plus il y a de barrières entre lui et l'extérieur."
  });
  var g = A.s("g", null, f.svg);
  var N = [
    { t: "BSL-1", d: "Micro-organismes non pathogènes (enseignement de base)." },
    { t: "BSL-2", d: "Pathogènes du groupe 2 : la plupart des laboratoires cliniques." },
    { t: "BSL-3", d: "Pathogènes pouvant causer des maladies graves par inhalation, par exemple Mycobacterium tuberculosis." },
    { t: "BSL-4", d: "Pathogènes hautement dangereux, par exemple le virus Ebola." }
  ];
  var cu = R.curseur(f.reglages, { nom: "Niveau", min: 1, max: 4, pas: 1, val: 2, dec: 0 });
  var zone = R.h("div", null, "", f.direct);
  function dessiner() {
    var k = cu.v;
    A.vider(g);
    // barrières concentriques autour de l'agent : une par niveau, du cadre extérieur (4) au cadre intérieur (1)
    for (var i = 4; i >= 1; i--) {
      var on = i <= k, d = (i - 1) * 60;
      A.boite(g, 400 - d, 150 - d * 0.75, 260 + 2 * d, 230 + 2 * d * 0.75, { fond: on && i === k ? C.jeuPale : "#fff", bord: on ? C.jeu : C.trait, ep: on ? 4 : 2, rx: 24, tirets: on ? null : "8 7" });
    }
    A.icone(g, "danger", [530, 235], 80, k >= 3 ? C.ko : C.jeu);
    A.texte(g, N[k - 1].t, [530, 320], { taille: 30, gras: 800, coul: C.jeu });
    N.forEach(function (x, i) {
      A.boite(g, 20, 40 + i * 120, 200, 90, { fond: i === k - 1 ? C.jeu : "#fff", bord: i < k ? C.jeu : C.trait, ep: 2.5, rx: 14, titre: x.t, taille: 22, coul: i === k - 1 ? "#fff" : C.encre });
      A.cible(g, 20, 40 + i * 120, 200, 90, function () { cu.set(i + 1); dessiner(); });
    });
    zone.innerHTML = "<strong>" + N[k - 1].t + "</strong> : " + N[k - 1].d;
  }
  cu.surChange(dessiner);
  dessiner();
})();
