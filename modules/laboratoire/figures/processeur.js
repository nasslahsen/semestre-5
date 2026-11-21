/* Figure : processeur de tissus à carrousel ; le panier passe des alcools au xylène puis à la paraffine, et le tissu change de contenu. */
(function () {
  "use strict";
  var R = RM, A = LABO, C = A.C;

  var f = R.figure("fig-processeur", {
    largeur: 960, hauteur: 540, titre: "Le tour du carrousel",
    essai: "<strong>Essaie</strong> : avance étape par étape. <strong>Observe</strong> : le panier change de bain, et dans le tissu l'eau laisse la place à l'alcool, puis au xylène, puis à la paraffine. Le nombre de bains de chaque groupe dépend du programme."
  });
  var g = A.s("g", null, f.svg);
  // 12 stations : 10 de réactifs (alcools puis xylène), 2 de paraffine
  var ST = [];
  for (var i = 0; i < 12; i++) ST.push({ grp: i < 7 ? "alc" : i < 10 ? "xyl" : "par" });
  var GR = {
    alc: { t: "alcools croissants", c: C.froid, f: C.froidPale },
    xyl: { t: "xylène", c: C.v, f: C.vPale },
    par: { t: "paraffine vers 60 °C", c: "#c08a00", f: "#fff3c4" }
  };
  var ETAT = [
    { grp: null, cont: "eau", coul: "#9ec9f0", d: "Tissu fixé au formol, en cassette : il est plein d'eau, et la paraffine ne se mélange pas à l'eau." },
    { grp: "alc", cont: "alcool", coul: "#cfe3f7", d: "Déshydratation : des alcools de plus en plus concentrés retirent l'eau peu à peu." },
    { grp: "xyl", cont: "xylène", coul: "#e2cff7", d: "Clarification : le xylène (ou un substitut) remplace l'alcool ; il se mélange à l'alcool et à la paraffine." },
    { grp: "par", cont: "paraffine", coul: "#f6dc7a", d: "Imprégnation : la paraffine fondue, vers 60 °C, souvent sous vide, entre au cœur des cellules." }
  ];
  var O = [300, 280], Rr = 190;
  function P(i) { var a = -Math.PI / 2 + i * 2 * Math.PI / 12; return [O[0] + Rr * Math.cos(a), O[1] + Rr * Math.sin(a)]; }
  var zone = R.h("div", null, "", f.direct);
  function dessiner(k) {
    A.vider(g);
    var et = ETAT[k];
    A.s("circle", { cx: O[0], cy: O[1], r: Rr, fill: "none", stroke: C.trait, "stroke-width": 3, "stroke-dasharray": "8 8" }, g);
    var idx = { alc: 0, xyl: 0, par: 0 };
    ST.forEach(function (s, i) {
      var p = P(i), gr = GR[s.grp], on = et.grp === s.grp;
      var nAlc = 7, op = s.grp === "alc" ? 0.35 + 0.65 * (idx.alc / (nAlc - 1)) : 1;
      idx[s.grp]++;
      A.s("rect", { x: p[0] - 32, y: p[1] - 32, width: 64, height: 64, rx: 12, fill: gr.f, stroke: gr.c, "stroke-width": on ? 5 : 2.5, opacity: on || !et.grp ? 1 : 0.55 }, g);
      if (s.grp === "alc") A.s("rect", { x: p[0] - 22, y: p[1] + 22 - 44 * op, width: 44, height: 44 * op, rx: 6, fill: gr.c, opacity: 0.35 }, g);
    });
    // panier au centre de son groupe
    if (et.grp) {
      var ids = ST.map(function (s, i) { return s.grp === et.grp ? i : -1; }).filter(function (i) { return i >= 0; });
      var m = P(ids[Math.floor(ids.length / 2)]);
      A.s("line", { x1: O[0], y1: O[1], x2: m[0], y2: m[1], stroke: C.encre, "stroke-width": 6, "stroke-linecap": "round" }, g);
      A.s("rect", { x: m[0] - 18, y: m[1] - 18, width: 36, height: 36, rx: 6, fill: "#fff", stroke: C.encre, "stroke-width": 4 }, g);
    }
    A.s("circle", { cx: O[0], cy: O[1], r: 16, fill: C.encre }, g);
    // légende des groupes
    ["alc", "xyl", "par"].forEach(function (cle, j) {
      A.s("rect", { x: 580, y: 60 + j * 46, width: 26, height: 26, rx: 6, fill: GR[cle].f, stroke: GR[cle].c, "stroke-width": 3 }, g);
      A.texte(g, GR[cle].t, [618, 73 + j * 46], { taille: 18, ancre: "start", gras: et.grp === cle ? 800 : 600 });
    });
    // le tissu, en coupe : des cellules remplies du liquide du moment
    A.texte(g, "dans le tissu", [760, 250], { taille: 18, gras: 700 });
    A.s("rect", { x: 620, y: 275, width: 280, height: 170, rx: 20, fill: "#fff", stroke: C.encre, "stroke-width": 4 }, g);
    for (var r = 0; r < 3; r++) for (var c2 = 0; c2 < 5; c2++) {
      A.s("ellipse", { cx: 655 + c2 * 52, cy: 310 + r * 50, rx: 22, ry: 18, fill: et.coul, stroke: C.doux, "stroke-width": 2 }, g);
      A.s("circle", { cx: 655 + c2 * 52, cy: 310 + r * 50, r: 6, fill: C.v, opacity: 0.6 }, g);
    }
    A.texte(g, et.cont, [760, 480], { taille: 22, gras: 800 });
    zone.innerHTML = et.d;
  }
  var e = R.etapes(f.reglages, 3, ["", "déshydratation", "clarification", "imprégnation"], dessiner);
  e.aller(0);
})();
