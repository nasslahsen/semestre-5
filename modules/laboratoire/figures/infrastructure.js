/* Figure : le laboratoire au centre, ses réseaux autour ; toucher un réseau montre ce qu'il faut maîtriser. */
(function () {
  "use strict";
  var R = RM, A = LABO, C = A.C;

  var f = R.figure("fig-infrastructure", {
    largeur: 960, hauteur: 540, titre: "Ce qui alimente le laboratoire",
    essai: "<strong>Essaie</strong> : touche un réseau. <strong>Observe</strong> : chacun a ses points à maîtriser ; tous conditionnent la fiabilité du résultat."
  });
  var g = A.s("g", null, f.svg), sel = 0;
  var N = [
    { t: "Électricité", ic: "eclair", p: [150, 110], d: "Réseau, terre, protections, onduleur (UPS), groupe électrogène." },
    { t: "Réfrigération", ic: "flocon", p: [480, 70], d: "2 à 8 °C, congélation, alarmes de dérive." },
    { t: "HVAC", ic: "thermo", p: [810, 110], d: "Température, humidité, renouvellement et pression de l'air." },
    { t: "Eau", ic: "goutte", p: [810, 400], d: "Qualité, traitement, surveillance continue selon l'activité." },
    { t: "Gaz, incendie", ic: "feu", p: [480, 410], d: "Réseau de gaz, détection et protection incendie." },
    { t: "Réseau, déchets", ic: "ordi", p: [150, 400], d: "Réseau informatique et gestion des déchets." }
  ];
  var zone = R.h("div", null, "", f.direct);
  function dessiner() {
    A.vider(g);
    N.forEach(function (n, i) { A.s("line", { x1: 480, y1: 270, x2: n.p[0], y2: n.p[1], stroke: sel === i ? C.jeu : C.trait, "stroke-width": sel === i ? 6 : 4 }, g); });
    A.boite(g, 380, 210, 200, 120, { fond: C.fond, bord: C.encre, ep: 3, rx: 16, titre: "Laboratoire", taille: 24 });
    N.forEach(function (n, i) {
      var on = sel === i;
      A.s("circle", { cx: n.p[0], cy: n.p[1], r: 62, fill: on ? C.jeuPale : "#fff", stroke: on ? C.jeu : C.encre, "stroke-width": on ? 5 : 3 }, g);
      A.icone(g, n.ic, [n.p[0], n.p[1] - 8], 54, on ? C.jeu : C.doux);
      A.texte(g, n.t, [n.p[0], n.p[1] + 86], { taille: 18, gras: 800, coul: on ? C.jeu : C.encre });
      A.cible(g, n.p[0] - 70, n.p[1] - 70, 140, 170, function () { sel = i; dessiner(); });
    });
    zone.innerHTML = "<strong>" + N[sel].t + "</strong> : " + N[sel].d;
  }
  dessiner();
})();
