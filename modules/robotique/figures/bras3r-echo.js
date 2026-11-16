// Exercice de révision : le bras 3R de l'échographie, construit étape par étape.
// Vue 3D (le robot dans la salle) et vue de côté (le plan vertical du bras).
(function () {
  "use strict";
  var R = RM, C = R.C, m = R.m, DEG = R.DEG;
  var d1 = 30, a2 = 40, a3 = 25;
  var BUTS = [[0, 0, 0], [30, 0, 0], [30, 45, 0], [30, 45, -30], [30, 45, -30], [30, 45, -30], [30, 45, -30]];
  var NOMS = ["le robot au repos", "la base tourne de θ₁", "le bras 1 se lève de θ₂", "le coude se replie de θ₃",
    "la hauteur z", "la portée ρ", "x et y"];

  var f = R.figure("fig-bras3r", {
    directCote: true,
    dessins: [{ l: 620, h: 430, titre: "Le robot dans la salle (vue 3D)" }, { l: 620, h: 360, titre: "Le plan vertical du bras, vu de côté" }],
    essai: "<strong>Essaie</strong> : avance étape par étape. Chaque articulation bouge l'une après l'autre. " +
      "<strong>Observe</strong> : θ₁ fait tourner tout le bras autour de l'axe vertical, puis θ₂ et θ₃ ne bougent le bras que dans son plan vertical (en bas)."
  });
  if (!f) return;
  var V = R.vue3D(215, 345, 4.3, -50 * DEG, 26 * DEG);
  var g3 = R.el("g", null, f.svgs[0]);
  var P = R.plan(110, 262, 3.4);
  var g2 = R.el("g", null, f.svgs[1]);
  var zone = R.h("div", null, "", f.direct);
  var b = R.boutons(f.reglages);
  var tourne = R.basculeOrbite(b);
  var q = [0, 0, 0], k = 0;

  function geo(t) {
    var c1 = Math.cos(t[0] * DEG), s1 = Math.sin(t[0] * DEG);
    var u = [c1, s1, 0], z = [0, 0, 1];
    var S = [0, 0, d1];
    var E = m.add(S, m.add(m.scale(u, a2 * Math.cos(t[1] * DEG)), m.scale(z, a2 * Math.sin(t[1] * DEG))));
    var b23 = (t[1] + t[2]) * DEG;
    var M = m.add(E, m.add(m.scale(u, a3 * Math.cos(b23)), m.scale(z, a3 * Math.sin(b23))));
    var rho = a2 * Math.cos(t[1] * DEG) + a3 * Math.cos(b23);
    return { u: u, S: S, E: E, M: M, rho: rho };
  }
  function arc3(centre, r, e1, e2, a0, a1, o) {
    var pts = [];
    for (var i = 0; i <= 30; i++) {
      var a = a0 + (a1 - a0) * i / 30;
      pts.push(V.p(m.add(centre, m.add(m.scale(e1, r * Math.cos(a)), m.scale(e2, r * Math.sin(a))))));
    }
    R.el("polyline", { points: pts.map(String).join(" "), fill: "none", stroke: o.couleur, "stroke-width": o.epaisseur || 2.5 }, g3);
  }
  function lab(g, s, p, couleur, taille) { R.texte(g, s, p, { couleur: couleur, gras: true, italique: false, taille: taille || 17 }); }

  function dessiner3D() {
    R.vider(g3);
    var G = geo(q), O = [0, 0, 0];
    // sol
    for (var s = -10; s <= 70; s += 10) {
      R.ligne(g3, V.p([s, -10, 0]), V.p([s, 50, 0]), { couleur: C.trait, epaisseur: 1 });
      if (s <= 50) R.ligne(g3, V.p([-10, s, 0]), V.p([70, s, 0]), { couleur: C.trait, epaisseur: 1 });
    }
    R.fleche(g3, V.p(O), V.p([75, 0, 0]), { couleur: C.x, epaisseur: 2 });
    R.fleche(g3, V.p(O), V.p([0, 55, 0]), { couleur: C.y, epaisseur: 2 });
    R.fleche(g3, V.p(O), V.p([0, 0, 85]), { couleur: C.z, epaisseur: 2 });
    lab(g3, "x₀", m.add(V.p([75, 0, 0]), [14, 8]), C.x);
    lab(g3, "y₀", m.add(V.p([0, 55, 0]), [16, -4]), C.y);
    lab(g3, "z₀", m.add(V.p([0, 0, 85]), [-18, -4]), C.z);
    // plan vertical du bras
    if (k >= 1) {
      var coins = [O, m.scale(G.u, 72), m.add(m.scale(G.u, 72), [0, 0, 74]), [0, 0, 74]].map(V.p);
      R.el("polygon", { points: coins.map(String).join(" "), fill: C.acc, opacity: 0.07, stroke: C.acc, "stroke-opacity": 0.25 }, g3);
      arc3(O, 22, [1, 0, 0], [0, 1, 0], 0, q[0] * DEG, { couleur: C.acc });
      if (q[0] > 8) lab(g3, "θ₁", V.p([29 * Math.cos(q[0] * DEG / 2), 29 * Math.sin(q[0] * DEG / 2), 0]), C.acc);
    }
    // ombre au sol, hauteur, x et y
    var Q = [G.M[0], G.M[1], 0];
    if (k >= 4) {
      R.ligne(g3, V.p(G.M), V.p(Q), { couleur: C.z, epaisseur: 2, tirets: "6 5" });
      lab(g3, "z", m.add(V.p([Q[0], Q[1], G.M[2] / 2]), [16, 0]), C.z);
    }
    if (k >= 5) {
      R.ligne(g3, V.p(O), V.p(Q), { couleur: C.v, epaisseur: 4 });
      lab(g3, "ρ", m.add(V.p(m.scale(Q, 0.55)), [0, 20]), C.v);
      R.point(g3, V.p(Q), { couleur: C.v, r: 5 });
    }
    if (k >= 6) {
      R.ligne(g3, V.p(Q), V.p([Q[0], 0, 0]), { couleur: C.x, epaisseur: 2, tirets: "5 4" });
      R.ligne(g3, V.p(Q), V.p([0, Q[1], 0]), { couleur: C.y, epaisseur: 2, tirets: "5 4" });
      lab(g3, "x", m.add(V.p([Q[0], 0, 0]), [4, 22]), C.x);
      lab(g3, "y", m.add(V.p([0, Q[1], 0]), [-20, 4]), C.y);
    }
    // le robot : colonne, bras 1, bras 2
    R.ligne(g3, V.p(O), V.p(G.S), { couleur: C.fonce, epaisseur: 10 });
    R.ligne(g3, V.p(G.S), V.p(G.E), { couleur: C.fonce, epaisseur: 8 });
    R.ligne(g3, V.p(G.E), V.p(G.M), { couleur: C.doux, epaisseur: 7 });
    [G.S, G.E].forEach(function (p) { R.point(g3, V.p(p), { couleur: "#fff", r: 6 }); R.el("circle", { cx: V.p(p)[0], cy: V.p(p)[1], r: 6, fill: "none", stroke: C.fonce, "stroke-width": 2.5 }, g3); });
    R.point(g3, V.p(G.M), { couleur: C.acc, r: 8 });
    lab(g3, "M", m.add(V.p(G.M), [16, -12]), C.acc, 19);
    lab(g3, "d₁", m.add(V.p([0, 0, d1 / 2]), [-24, 0]), C.doux);
  }

  function dessinerCote() {
    R.vider(g2);
    var t2 = q[1] * DEG, b23 = (q[1] + q[2]) * DEG;
    var S = [0, d1], E = [a2 * Math.cos(t2), d1 + a2 * Math.sin(t2)], M = [E[0] + a3 * Math.cos(b23), E[1] + a3 * Math.sin(b23)];
    // sol et axes du plan
    R.ligne(g2, P.p([-8, 0]), P.p([135, 0]), { couleur: C.trait, epaisseur: 2 });
    R.fleche(g2, P.p([0, 0]), P.p([140, 0]), { couleur: C.v, epaisseur: 2 });
    R.fleche(g2, P.p([0, 0]), P.p([0, 72]), { couleur: C.z, epaisseur: 2 });
    lab(g2, "dans le plan du bras", m.add(P.p([140, 0]), [-80, -14]), C.v, 16);
    lab(g2, "z", m.add(P.p([0, 72]), [-16, 6]), C.z);
    // horizontale de repère au coude et à l'épaule
    if (k >= 2) R.ligne(g2, P.p(S), P.p([S[0] + 30, S[1]]), { couleur: C.gris, epaisseur: 1.5, tirets: "4 4" });
    if (k >= 3) {
      R.ligne(g2, P.p(E), P.p([E[0] + 28, E[1]]), { couleur: C.gris, epaisseur: 1.5, tirets: "4 4" });
      var prol = [E[0] + 22 * Math.cos(t2), E[1] + 22 * Math.sin(t2)];
      R.ligne(g2, P.p(E), P.p(prol), { couleur: C.gris, epaisseur: 1.5, tirets: "2 4" });
    }
    // décompositions
    if (k >= 4) {
      var xz = M[0] + 8;
      [[0, d1, "d₁ = 30"], [d1, E[1], "a₂ sin θ₂ ≈ 28,3"], [E[1], M[1], "a₃ sin β ≈ 6,5"]].forEach(function (s, i) {
        R.ligne(g2, P.p([xz, s[0]]), P.p([xz, s[1]]), { couleur: C.z, epaisseur: 3 });
        R.ligne(g2, P.p([xz - 2, s[1]]), P.p([xz + 2, s[1]]), { couleur: C.z, epaisseur: 2 });
        lab(g2, s[2], m.add(P.p([xz, (s[0] + s[1]) / 2]), [i === 2 ? 66 : 70, 6]), C.z, 16);
      });
    }
    if (k >= 5) {
      var yh = -9;
      [[0, E[0], "28,3"], [E[0], M[0], "24,1"]].forEach(function (s) {
        R.ligne(g2, P.p([s[0], yh]), P.p([s[1], yh]), { couleur: C.v, epaisseur: 3 });
        R.ligne(g2, P.p([s[1], yh - 2]), P.p([s[1], yh + 2]), { couleur: C.v, epaisseur: 2 });
        lab(g2, s[2], m.add(P.p([(s[0] + s[1]) / 2, yh]), [0, 22]), C.v, 16);
      });
      lab(g2, "ρ = a₂ cos θ₂ + a₃ cos β ≈ 52,4", m.add(P.p([M[0] / 2, yh]), [30, 46]), C.v, 16);
      R.ligne(g2, P.p([M[0], 0]), P.p(M), { couleur: C.gris, epaisseur: 1.5, tirets: "4 4" });
    }
    // le bras
    R.ligne(g2, P.p([0, 0]), P.p(S), { couleur: C.fonce, epaisseur: 10 });
    R.ligne(g2, P.p(S), P.p(E), { couleur: C.fonce, epaisseur: 8 });
    R.ligne(g2, P.p(E), P.p(M), { couleur: C.doux, epaisseur: 7 });
    // angles
    if (k >= 2 && q[1] > 3) {
      R.arc(g2, P.p(S), 46, 0, t2, { couleur: C.acc, epaisseur: 2.5 });
      lab(g2, "θ₂", m.add(P.p(S), [62 * Math.cos(t2 / 2), -62 * Math.sin(t2 / 2)]), C.acc);
    }
    if (k >= 3 && q[2] < -3) {
      R.arc(g2, P.p(E), 54, b23, t2, { couleur: C.x, epaisseur: 2.5 });
      lab(g2, "θ₃", m.add(P.p(E), [70 * Math.cos((t2 + b23) / 2), -70 * Math.sin((t2 + b23) / 2)]), C.x);
      R.arc(g2, P.p(E), 34, 0, b23, { couleur: C.v, epaisseur: 2.5 });
      lab(g2, "β", m.add(P.p(E), [50, 18]), C.v);
    }
    [S, E].forEach(function (p) { R.el("circle", { cx: P.p(p)[0], cy: P.p(p)[1], r: 6, fill: "#fff", stroke: C.fonce, "stroke-width": 2.5 }, g2); });
    R.point(g2, P.p(M), { couleur: C.acc, r: 8 });
    lab(g2, "M", m.add(P.p(M), [14, -14]), C.acc, 19);
  }

  var TEX = [
    "\\text{Tout à zéro : les deux bras sont alignés à l'horizontale,}\\\\\\text{à la hauteur } d_1 = 30\\text{ cm, le long de } x_0.",
    "\\theta_1 = 30° : \\text{ la base tourne autour de } z_0.\\\\\\text{Tout le bras tourne avec elle :}\\\\\\text{il travaille maintenant dans un plan vertical}\\\\\\text{tourné de 30° (en rouge clair).}",
    "\\theta_2 = 45° : \\text{ le bras 1 se lève dans ce plan.}\\\\\\text{Il avance de } a_2\\cos\\theta_2 = 40 \\times 0{,}707 \\approx 28{,}3\\text{ cm}\\\\\\text{et monte de } a_2\\sin\\theta_2 \\approx 28{,}3\\text{ cm.}",
    "\\theta_3 = -30° : \\text{ le coude replie le bras 2 de 30°}\\\\\\text{par rapport au prolongement du bras 1.}\\\\\\beta = \\theta_2 + \\theta_3 = 45° - 30° = 15°\\\\\\text{Le bras 2 monte de 15° au-dessus de l'horizontale.}",
    "\\text{La hauteur : on empile ce que chaque pièce fait monter.}\\\\z_M = d_1 + a_2\\sin\\theta_2 + a_3\\sin\\beta\\\\= 30 + 28{,}28 + 6{,}47 \\approx 64{,}76\\text{ cm}",
    "\\text{La portée : ce que chaque bras fait avancer}\\\\\\text{dans son plan (l'ombre du bras au sol).}\\\\\\rho = a_2\\cos\\theta_2 + a_3\\cos\\beta\\\\= 28{,}28 + 24{,}15 \\approx 52{,}43\\text{ cm}",
    "\\text{L'ombre } \\rho \\text{ est tournée de } \\theta_1 = 30° \\text{ au sol :}\\\\\\text{comme en coordonnées cylindriques.}\\\\x_M = \\rho\\cos\\theta_1 = 52{,}43 \\times 0{,}866 \\approx 45{,}41\\text{ cm}\\\\y_M = \\rho\\sin\\theta_1 = 52{,}43 \\times 0{,}5 \\approx 26{,}22\\text{ cm}"
  ];
  function dessiner() { dessiner3D(); dessinerCote(); }
  var nav = R.etapes(f.reglages, 6, NOMS, function (i) {
    var depart = q.slice(), but = BUTS[i];
    k = i;
    R.rendre(zone, TEX[i], true);
    R.animer(900, function (u) { q = depart.map(function (a, j) { return a + (but[j] - a) * u; }); dessiner(); });
  });
  R.orbite(f.svgs[0], V, dessiner, tourne);
  nav.aller(0);
})();
