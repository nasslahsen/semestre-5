// Le MGI du bras 2R, animé : la cible, l'accessibilité, les deux coudes possibles, Al-Kashi,
// α et β, θ₁, la vérification par la MGD, puis l'autre solution (coude haut).
(function () {
  "use strict";
  var R = RM, C = R.C, m = R.m, DEG = R.DEG;
  var L1 = 40, L2 = 30, X = 50, Y = 40;
  var r = Math.hypot(X, Y);
  var t2 = Math.acos((X * X + Y * Y - L1 * L1 - L2 * L2) / (2 * L1 * L2)) / DEG;
  var al = Math.atan2(Y, X) / DEG;
  var be = Math.acos((L1 * L1 + r * r - L2 * L2) / (2 * L1 * r)) / DEG;
  var BAS = [al - be, t2], HAUT = [al + be, -t2];
  var BUTS = [[0, 0], [0, 0], [0, 0], BAS, BAS, BAS, BAS, HAUT];
  var NOMS = ["la cible", "accessible ?", "où peut être le coude ?", "θ₂ par Al-Kashi", "α et β", "θ₁ = α − β",
    "vérification par la MGD", "l'autre solution : coude haut"];

  var f = R.figure("fig-mgi-anime", {
    largeur: 700, hauteur: 540,
    titre: "Le MGI du bras 2R, étape par étape",
    essai: "<strong>Essaie</strong> : avance étape par étape. Le bras ne bouge que quand on connaît ses angles. " +
      "<strong>Observe</strong> : le coude doit être à 40 cm de O et à 30 cm de la cible. Les deux cercles se coupent en deux points : deux solutions, coude bas et coude haut."
  });
  if (!f) return;
  var P = R.plan(95, 470, 5.3);
  var g = R.el("g", null, f.svg);
  var zone = R.h("div", null, "", f.direct);
  var q = [0, 0], k = 0;

  function lab(s, p, couleur, taille) { R.texte(g, s, p, { couleur: couleur, gras: true, italique: false, taille: taille || 17 }); }
  function cercle(c, rr, o) {
    var e = P.p(c);
    R.el("circle", { cx: e[0], cy: e[1], r: rr * P.s, fill: o.fond || "none", "fill-opacity": o.opFond || 1, stroke: o.couleur, "stroke-width": o.epaisseur || 2, "stroke-dasharray": o.tirets || null, opacity: o.opacite || 1 }, g);
  }
  function bras(t, o) {
    var A = [L1 * Math.cos(t[0] * DEG), L1 * Math.sin(t[0] * DEG)];
    var M = m.add(A, [L2 * Math.cos((t[0] + t[1]) * DEG), L2 * Math.sin((t[0] + t[1]) * DEG)]);
    var op = o && o.fantome ? 0.25 : 1;
    R.ligne(g, P.p([0, 0]), P.p(A), { couleur: C.fonce, epaisseur: 9, opacite: op });
    R.ligne(g, P.p(A), P.p(M), { couleur: C.doux, epaisseur: 7, opacite: op });
    R.el("circle", { cx: P.p(A)[0], cy: P.p(A)[1], r: 6, fill: "#fff", stroke: C.fonce, "stroke-width": 2.5, opacity: op }, g);
    return { A: A, M: M };
  }

  function dessiner() {
    R.vider(g);
    var O = P.p([0, 0]), T = P.p([X, Y]);
    // quadrillage léger et axes
    for (var s = 0; s <= 70; s += 10) {
      R.ligne(g, P.p([s, -5]), P.p([s, 75]), { couleur: C.trait, epaisseur: 1 });
      R.ligne(g, P.p([-5, s]), P.p([80, s]), { couleur: C.trait, epaisseur: 1 });
    }
    R.fleche(g, P.p([-8, 0]), P.p([100, 0]), { couleur: C.x, epaisseur: 2 });
    R.fleche(g, P.p([0, -8]), P.p([0, 80]), { couleur: C.y, epaisseur: 2 });
    lab("x", m.add(P.p([100, 0]), [-4, 22]), C.x);
    lab("y", m.add(P.p([0, 80]), [-16, 6]), C.y);
    // accessibilité : l'anneau
    if (k >= 1) {
      cercle([0, 0], L1 + L2, { couleur: C.z, tirets: "6 5", fond: C.z, opFond: 0.05 });
      cercle([0, 0], L1 - L2, { couleur: C.z, tirets: "6 5", fond: "#fff" });
      lab("portée max 70", m.add(P.p([0, 70]), [70, -6]), C.z, 16);
      R.ligne(g, O, T, { couleur: C.v, epaisseur: 2.5, tirets: k >= 3 ? null : "7 5" });
      if (k < 4) lab("r ≈ 64", m.add(P.p([X * 0.5, Y * 0.5]), [-40, -10]), C.v);
    }
    // les deux cercles qui donnent le coude
    var Abas = [L1 * Math.cos(BAS[0] * DEG), L1 * Math.sin(BAS[0] * DEG)], Ahaut = [L1 * Math.cos(HAUT[0] * DEG), L1 * Math.sin(HAUT[0] * DEG)];
    if (k >= 2) {
      cercle([0, 0], L1, { couleur: C.gris, tirets: "3 5", epaisseur: 2 });
      cercle([X, Y], L2, { couleur: C.acc, tirets: "3 5", epaisseur: 2 });
      if (k === 2) {
        lab("à 40 cm de O", m.add(P.p([0, 40]), [-10, -12]), C.doux, 16);
        lab("à 30 cm de P", m.add(P.p([X, Y + L2]), [0, -12]), C.acc, 16);
        [[Abas, "coude bas"], [Ahaut, "coude haut"]].forEach(function (a) {
          R.point(g, P.p(a[0]), { couleur: C.v, r: 7 });
          lab(a[1], m.add(P.p(a[0]), a[1] === "coude bas" ? [44, 26] : [-56, -14]), C.v, 16);
        });
      }
    }
    // la solution coude bas en fantôme quand on montre le coude haut
    if (k >= 7) bras(BAS, { fantome: true });
    var G = bras(q);
    var a1 = q[0] * DEG, a12 = (q[0] + q[1]) * DEG;
    // triangle OAP et angles
    if (k >= 3) {
      if (k < 7) R.polygone(g, [O, P.p(G.A), T], { remplissage: C.v, opacite: 0.08 });
      var prol = m.add(G.A, [16 * Math.cos(a1), 16 * Math.sin(a1)]);
      R.ligne(g, P.p(G.A), P.p(prol), { couleur: C.gris, epaisseur: 1.5, tirets: "3 4" });
      R.arc(g, P.p(G.A), 42, a1, a12, { couleur: C.x, epaisseur: 2.5 });
      lab("θ₂", m.add(P.p(G.A), [58 * Math.cos((a1 + a12) / 2), -58 * Math.sin((a1 + a12) / 2)]), C.x);
    }
    if (k >= 4 && k < 7) {
      R.arc(g, O, 120, 0, al * DEG, { couleur: C.z, epaisseur: 2.5 });
      lab("α", m.add(O, [136 * Math.cos(al * DEG * 0.75), -136 * Math.sin(al * DEG * 0.75)]), C.z);
      R.arc(g, O, 82, q[0] * DEG, al * DEG, { couleur: C.v, epaisseur: 2.5 });
      lab("β", m.add(O, [98 * Math.cos((q[0] + al) / 2 * DEG), -98 * Math.sin((q[0] + al) / 2 * DEG)]), C.v);
    }
    if (k >= 5) {
      R.arc(g, O, 56, 0, q[0] * DEG, { couleur: C.acc, epaisseur: 3 });
      lab("θ₁", m.add(O, [72 * Math.cos(q[0] * DEG / 2), -72 * Math.sin(q[0] * DEG / 2)]), C.acc);
    }
    if (k === 6) {
      var yb = -7;
      [[0, G.A[0], "37,99"], [G.A[0], G.M[0], "12,01"]].forEach(function (s0) {
        R.ligne(g, P.p([s0[0], yb]), P.p([s0[1], yb]), { couleur: C.x, epaisseur: 3 });
        R.ligne(g, P.p([s0[1], yb - 1.5]), P.p([s0[1], yb + 1.5]), { couleur: C.x, epaisseur: 2 });
        lab(s0[2], m.add(P.p([(s0[0] + s0[1]) / 2, yb]), [0, 22]), C.x, 16);
      });
      var xb = G.M[0] + 8;
      [[0, G.A[1], "12,51"], [G.A[1], G.M[1], "27,49"]].forEach(function (s0) {
        R.ligne(g, P.p([xb, s0[0]]), P.p([xb, s0[1]]), { couleur: C.y, epaisseur: 3 });
        R.ligne(g, P.p([xb - 1.5, s0[1]]), P.p([xb + 1.5, s0[1]]), { couleur: C.y, epaisseur: 2 });
        lab(s0[2], m.add(P.p([xb, (s0[0] + s0[1]) / 2]), [32, 6]), C.y, 16);
      });
      R.ligne(g, P.p(G.A), P.p([G.A[0], 0]), { couleur: C.gris, epaisseur: 1.5, tirets: "4 4" });
      R.ligne(g, P.p(G.A), P.p([xb, G.A[1]]), { couleur: C.gris, epaisseur: 1.5, tirets: "4 4" });
    }
    if (k >= 7) {
      lab("coude bas (retenu)", m.add(P.p(Abas), [70, 24]), C.gris, 16);
      lab("coude haut", m.add(P.p(G.A), [-50, -16]), C.v, 16);
    }
    // base et cible
    R.el("rect", { x: O[0] - 14, y: O[1], width: 28, height: 12, fill: C.fonce }, g);
    R.el("circle", { cx: O[0], cy: O[1], r: 7, fill: "#fff", stroke: C.fonce, "stroke-width": 2.5 }, g);
    lab("O", m.add(O, [-18, 22]), C.fonce);
    R.ligne(g, m.add(T, [-9, -9]), m.add(T, [9, 9]), { couleur: C.acc, epaisseur: 3 });
    R.ligne(g, m.add(T, [-9, 9]), m.add(T, [9, -9]), { couleur: C.acc, epaisseur: 3 });
    lab("P (50 ; 40)", m.add(T, [58, -12]), C.acc);
    R.point(g, P.p(G.M), { couleur: C.acc, r: 6 });
  }

  var TEX = [
    "\\text{La cible : } P = (50 ;\\ 40)\\text{ cm. On cherche } \\theta_1, \\theta_2.\\\\\\text{Le bras ne peut pas encore bouger :}\\\\\\text{on ne connaît pas ses angles.}",
    "r = \\sqrt{x_c^2 + y_c^2} = \\sqrt{50^2 + 40^2} \\approx 64{,}03\\text{ cm}\\\\|L_1 - L_2| = 10 \\le 64{,}03 \\le 70 = L_1 + L_2\\\\\\text{P est dans l'anneau bleu : accessible.}",
    "\\text{Le coude A est à } L_1 = 40 \\text{ de O (cercle gris)}\\\\\\text{et à } L_2 = 30 \\text{ de P (cercle rouge).}\\\\\\text{Deux cercles se coupent en deux points :}\\\\\\text{deux solutions, d'où le } \\pm \\text{ de } \\theta_2.",
    "\\text{Triangle OAP : trois côtés connus (40, 30, r).}\\\\\\cos\\theta_2 = \\dfrac{r^2 - L_1^2 - L_2^2}{2L_1L_2} = \\dfrac{4100 - 1600 - 900}{2400} = \\dfrac{2}{3}\\\\\\theta_2 \\approx 48{,}19°",
    "\\alpha = \\arctan\\dfrac{y_c}{x_c} = \\arctan\\dfrac{40}{50} \\approx 38{,}66°\\;\\text{(direction de P)}\\\\\\cos\\beta = \\dfrac{L_1^2 + r^2 - L_2^2}{2L_1 r} \\Rightarrow \\beta \\approx 20{,}44°\\;\\text{(entre OA et OP)}",
    "\\text{Coude bas : le bras 1 est sous la droite OP.}\\\\\\theta_1 = \\alpha - \\beta = 38{,}66° - 20{,}44° = 18{,}22°",
    "\\text{MGD :}\\\\x = 40\\cos 18{,}22° + 30\\cos 66{,}41° = 37{,}99 + 12{,}01 = 50\\\\y = 40\\sin 18{,}22° + 30\\sin 66{,}41° = 12{,}51 + 27{,}49 = 40\\\\\\text{On retrouve la cible.}",
    "\\text{Coude haut : le bras 1 au-dessus de OP.}\\\\\\theta_1 = \\alpha + \\beta = 59{,}10°,\\quad \\theta_2 = -48{,}19°\\\\\\text{Même cible, autre posture. On la rejette :}\\\\\\text{elle rencontre l'équipement fixe.}"
  ];
  var nav = R.etapes(f.reglages, 7, NOMS, function (i) {
    var depart = q.slice(), but = BUTS[i];
    k = i;
    R.rendre(zone, TEX[i], true);
    R.animer(900, function (u) { q = depart.map(function (a, j) { return a + (but[j] - a) * u; }); dessiner(); });
  });
  nav.aller(0);
})();
