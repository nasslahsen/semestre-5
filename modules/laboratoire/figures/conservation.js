/* Figure : l'échelle des températures de conservation, de l'ambiante à l'azote liquide. */
(function () {
  "use strict";
  var R = RM, A = LABO, C = A.C;

  var f = R.figure("fig-conservation", {
    largeur: 960, hauteur: 540, titre: "Les températures de conservation",
    essai: "<strong>Essaie</strong> : fais descendre la température, ou touche une bande. <strong>Observe</strong> : plus il fait froid, plus on peut conserver longtemps."
  });
  var g = A.s("g", null, f.svg);
  var B = [
    { t: "Ambiante, 15 à 25 °C", de: 25, a: 15, u: "Transport court, certains examens", ex: "Hématologie, cytologie", coul: "#f59f00" },
    { t: "+2 à +8 °C", de: 8, a: 2, u: "Conservation de courte durée", ex: "Biochimie, sérologie, ECBU", coul: "#74c0fc" },
    { t: "−20 °C", de: -20, a: -20, u: "Conservation de moyenne durée", ex: "Aliquotes de sérum ou de plasma", coul: "#339af0" },
    { t: "−70 à −80 °C", de: -70, a: -80, u: "Conservation de longue durée", ex: "Biologie moléculaire, virologie", coul: "#1c7ed6" },
    { t: "Azote liquide, −196 °C", de: -196, a: -196, u: "Cellules, tissus", ex: "Cryopréservation, PMA", coul: "#1864ab" }
  ];
  var cu = R.curseur(f.reglages, { nom: "Bande", min: 0, max: 4, pas: 1, val: 1, dec: 0 });
  var zone = R.h("div", null, "", f.direct);
  function dessiner() {
    var k = cu.v;
    A.vider(g);
    // thermomètre stylisé à gauche
    A.s("rect", { x: 70, y: 30, width: 40, height: 440, rx: 20, fill: "#fff", stroke: C.encre, "stroke-width": 3 }, g);
    A.s("circle", { cx: 90, cy: 490, r: 34, fill: B[k].coul, stroke: C.encre, "stroke-width": 3 }, g);
    A.s("rect", { x: 80, y: 60 + k * 90, width: 20, height: 440 - (60 + k * 90) + 20, fill: B[k].coul }, g);
    B.forEach(function (b, i) {
      var y = 30 + i * 96, on = i === k;
      A.boite(g, 170, y, 760, 82, { fond: on ? C.froidPale : "#fff", bord: on ? b.coul : C.trait, ep: on ? 4 : 2, rx: 14 });
      A.s("rect", { x: 180, y: y + 12, width: 14, height: 58, rx: 5, fill: b.coul }, g);
      A.texte(g, b.t, [210, y + 28], { taille: 21, gras: 800, ancre: "start", halo: false });
      A.texte(g, b.u + " : " + b.ex, [210, y + 58], { taille: 18, gras: 500, ancre: "start", coul: C.doux, halo: false });
      A.cible(g, 170, y, 760, 82, function () { cu.set(i); dessiner(); });
    });
    zone.innerHTML = "<strong>" + B[k].t + "</strong> : " + B[k].u.toLowerCase() + ". Exemples : " + B[k].ex.toLowerCase() + ".";
  }
  cu.surChange(dessiner);
  dessiner();
})();
