/* Figure : une interférence choisie fausse certains paramètres de l'hémogramme ; flèches sur les barres. */
(function () {
  "use strict";
  var R = RM, A = LABO, C = A.C;

  var f = R.figure("fig-interferences", {
    largeur: 960, hauteur: 540, titre: "Ce qu'une interférence fait à l'hémogramme",
    essai: "<strong>Essaie</strong> : touche une interférence. <strong>Observe</strong> : chacune fausse des paramètres précis, et le mécanisme explique lesquels."
  });
  var g = A.s("g", null, f.svg), sel = 0;
  var P = ["GB", "GR", "Hb", "PLT"];
  var I = [
    { t: "Agrégats plaquettaires", e: { PLT: -1, GB: 1 }, m: "plaquettes comptées comme GB." },
    { t: "Cryoglobulines", e: { GB: 1, Hb: 1 }, m: "précipitation faussant les mesures." },
    { t: "Hyperlipémie", e: { Hb: 1 }, m: "turbidité augmentant l'absorbance." },
    { t: "Hyperbilirubinémie", e: { Hb: 1 }, m: "interférence spectrophotométrique." },
    { t: "GR résistants", e: { GR: -1 }, m: "hémolyse incomplète." },
    { t: "Fragments de GR", e: { PLT: 1 }, m: "schizocytes comptés comme plaquettes." },
    { t: "Caillots", e: { GR: -1, PLT: -1 }, m: "échantillon non homogène." },
    { t: "Dilution (perfusion)", e: { GB: -1, GR: -1, Hb: -1, PLT: -1 }, m: "prélèvement non conforme." }
  ];
  var zone = R.h("div", null, "", f.direct);
  function dessiner() {
    A.vider(g);
    I.forEach(function (it, i) {
      var on = sel === i, y = 20 + i * 63;
      A.boite(g, 20, y, 330, 54, { fond: on ? C.jeu : "#fff", bord: on ? C.jeu : C.encre, ep: 2.5, rx: 10, titre: it.t, taille: 19, coul: on ? "#fff" : C.encre });
      A.cible(g, 20, y, 330, 54, function () { sel = i; dessiner(); });
    });
    P.forEach(function (p, k) {
      var x = 430 + k * 125, base = 300, e = I[sel].e[p] || 0, h = 150 + e * 90;
      A.s("rect", { x: x, y: base - 150, width: 80, height: 150, fill: "none", stroke: C.trait, "stroke-width": 2, "stroke-dasharray": "6 5" }, g);
      A.s("rect", { x: x, y: base - h, width: 80, height: h, rx: 6, fill: e ? (e > 0 ? C.chaudPale : C.froidPale) : C.fond, stroke: e ? (e > 0 ? C.chaud : C.froid) : C.encre, "stroke-width": 3 }, g);
      A.texte(g, p, [x + 40, base + 36], { taille: 24, gras: 800 });
      if (e) A.texte(g, e > 0 ? "↑" : "↓", [x + 40, base - h - 30], { taille: 40, gras: 800, coul: e > 0 ? C.chaud : C.froid });
    });
    A.texte(g, "pointillés : valeur vraie", [680, 420], { taille: 17, gras: 600, coul: C.doux });
    zone.innerHTML = "<strong>" + I[sel].t + "</strong> : " + I[sel].m;
  }
  dessiner();
})();
