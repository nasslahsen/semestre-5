/* Figure : sang total, plasma, sérum : le même sang, trois échantillons. */
(function () {
  "use strict";
  var R = RM, A = LABO, C = A.C;

  var f = R.figure("fig-echantillons", {
    largeur: 960, hauteur: 540, titre: "Sang total, plasma et sérum",
    essai: "<strong>Essaie</strong> : choisis l'échantillon voulu. <strong>Observe</strong> : le plasma vient d'un sang qui n'a pas coagulé ; le sérum, d'un sang qui a coagulé avant la centrifugation."
  });
  var g = A.s("g", null, f.svg), choix = "total";
  var T = {
    total: { t: "Sang total", tube: "edta", couches: [{ h: 0.82, coul: C.sang }], etapes: ["Tube avec anticoagulant", "On garde tout : cellules et plasma"], d: "Sang complet, avec cellules et plasma, dans un tube avec anticoagulant (EDTA, citrate, héparine)." },
    plasma: { t: "Plasma", tube: "citrate", couches: [{ h: 0.4, coul: C.sang }, { h: 0.04, coul: "#f8f0e0" }, { h: 0.38, coul: C.plasma }], etapes: ["Tube avec anticoagulant", "Centrifugation", "Liquide du dessus : plasma"], d: "Fraction liquide après centrifugation du sang anticoagulé (tube EDTA, citrate ou héparine)." },
    serum: { t: "Sérum", tube: "sec", couches: [{ h: 0.42, coul: "#8f1d1d" }, { h: 0.06, coul: "#c9ccd3" }, { h: 0.34, coul: "#f5d76e" }], etapes: ["Tube sec ou à gel", "Coagulation complète", "Centrifugation", "Liquide du dessus : sérum"], d: "Fraction liquide après coagulation complète (tube sec ou avec gel séparateur), puis centrifugation." }
  };
  var b = R.boutons(f.reglages), bts = {};
  Object.keys(T).forEach(function (k) { bts[k] = R.bouton(b, T[k].t, function () { choix = k; dessiner(); }); });
  var zone = R.h("div", null, "", f.direct);
  function dessiner() {
    var t = T[choix];
    A.vider(g);
    Object.keys(bts).forEach(function (k) { bts[k].classList.toggle("actif", k === choix); });
    A.tube(g, 110, 120, { bouchon: t.tube, w: 90, h: 340, couches: t.couches });
    A.texte(g, t.t, [155, 70], { taille: 26, gras: 800, coul: C.jeu });
    if (choix === "plasma") { A.texte(g, "plasma", [290, 300], { taille: 20, gras: 700 }); A.fleche(g, [250, 300], [208, 300], { coul: C.encre, ep: 3 }); A.texte(g, "cellules", [290, 420], { taille: 20, gras: 700 }); A.fleche(g, [250, 420], [208, 420], { coul: C.encre, ep: 3 }); }
    if (choix === "serum") { A.texte(g, "sérum", [290, 300], { taille: 20, gras: 700 }); A.fleche(g, [250, 300], [208, 300], { coul: C.encre, ep: 3 }); A.texte(g, "gel", [290, 352], { taille: 20, gras: 700 }); A.texte(g, "caillot", [290, 420], { taille: 20, gras: 700 }); A.fleche(g, [250, 420], [208, 420], { coul: C.encre, ep: 3 }); }
    t.etapes.forEach(function (e, i) {
      var y = 110 + i * 100;
      A.boite(g, 420, y, 480, 72, { fond: i === t.etapes.length - 1 ? C.jeuPale : "#fff", bord: i === t.etapes.length - 1 ? C.jeu : C.encre, rx: 14, titre: (i + 1) + ". " + e, taille: 20 });
      if (i) A.fleche(g, [660, y - 26], [660, y - 4], { coul: C.gris, ep: 4 });
    });
    zone.innerHTML = "<strong>" + t.t + "</strong> : " + t.d;
  }
  dessiner();
})();
