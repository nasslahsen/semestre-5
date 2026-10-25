/* Figure : l'ordre de remplissage des tubes, et ce qui arrive quand on l'inverse. */
(function () {
  "use strict";
  var R = RM, A = LABO, C = A.C, B = A.BOUCHONS;

  var f = R.figure("fig-prelevement", {
    largeur: 960, hauteur: 540, titre: "Ordre de remplissage des tubes (recommandations CLSI)",
    essai: "<strong>Essaie</strong> : touche un tube, puis « Inverser citrate et EDTA ». <strong>Observe</strong> : l'aiguille porte un peu d'additif d'un tube au suivant ; dans le mauvais ordre, l'EDTA contamine le tube de coagulation."
  });
  var g = A.s("g", null, f.svg), sel = null, inverse = false;
  var O = [["hemoc", "Hémoculture"], ["sec", "Sec (sérum)"], ["citrate", "Citrate"], ["heparine", "Héparine"], ["edta", "EDTA"], ["fluorure", "Fluorure"]];
  var D = { hemoc: "En premier : le flacon d'hémoculture doit rester stérile.", sec: "Sérum : tube sec ou à gel, sans anticoagulant.", citrate: "Coagulation : à remplir jusqu'au trait de jauge.", heparine: "Héparine : un anticoagulant.", edta: "EDTA : un anticoagulant, pour l'hématologie.", fluorure: "Fluorure / oxalate : pour la glycémie." };
  var b = R.boutons(f.reglages);
  var bi = R.bouton(b, "Inverser citrate et EDTA", function () { inverse = !inverse; bi.classList.toggle("actif", inverse); dessiner(); });
  var zone = R.h("div", null, "", f.direct);
  function dessiner() {
    A.vider(g);
    var ordre = O.slice();
    if (inverse) { var c = ordre[2]; ordre[2] = ordre[4]; ordre[4] = c; }
    A.fleche(g, [60, 70], [900, 70], { coul: C.gris, ep: 4 });
    A.texte(g, "ordre de remplissage", [480, 42], { taille: 18, coul: C.doux, gras: 600 });
    ordre.forEach(function (t, i) {
      var x = 70 + i * 145, faux = inverse && t[0] === "citrate";
      A.texte(g, String(i + 1), [x + 30, 120], { taille: 22, gras: 800, coul: C.jeu });
      A.tube(g, x, 170, { bouchon: t[0], w: 60, h: 230, couches: [{ h: 0.75, coul: C.sang }], etiquette: t[1], taille: 17, op: sel && sel !== t[0] ? 0.45 : 1 });
      if (faux) { A.s("rect", { x: x - 10, y: 140, width: 80, height: 300, rx: 12, fill: "none", stroke: C.ko, "stroke-width": 4 }, g); A.texte(g, "contaminé par l'EDTA", [x + 30, 480], { taille: 17, coul: C.ko, gras: 700, largeur: 150 }); }
      if (i > 0) A.fleche(g, [x - 70, 300], [x - 12, 300], { coul: C.trait, ep: 3 });
      A.cible(g, x - 10, 140, 80, 300, function () { sel = t[0]; dessiner(); });
    });
    zone.innerHTML = sel ? "<strong>" + B[sel].nom + "</strong> : " + D[sel] : inverse ? "Mauvais ordre : l'aiguille a d'abord traversé l'EDTA, puis le citrate. Les résultats de coagulation sont faussés." : "Hémoculture, sec, citrate, héparine, EDTA, fluorure, puis les autres additifs.";
  }
  dessiner();
})();
