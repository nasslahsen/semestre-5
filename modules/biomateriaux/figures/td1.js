(function () {
  "use strict";
  var R = RM, C = R.C;
  function T(g, s, p, o) { o = o || {}; o.italique = false; return R.texte(g, s, p, o); }

  /* ---------- Module, transparence et état d'un semi-cristallin ---------- */
  (function () {
    var f = R.figure("fig-td1", {
      largeur: 960, hauteur: 500, titre: "Module de relaxation d'un polymère semi-cristallin de très haute masse moléculaire (allure)",
      essai: "<strong>Essaie</strong> : choisis une application du TD, puis déplace la température. <strong>Observe</strong> : l'état, la transparence et le module. Allure qualitative : plateaux vers 3 GPa et 1 MPa."
    });
    var g = R.el("g", null, f.svg), zone = R.h("div", null, "", f.direct);
    var P = { "1.1": [100, 200, 0.5], "1.2": [-10, 150, 0.5], "1.4": [-10, 165, 0.9] }, cle = "1.1";
    var b = R.boutons(f.reglages);
    Object.keys(P).forEach(function (k) { R.bouton(b, "Application " + k, function () { cle = k; cT.set(25); dessin(); }); });
    var cT = R.curseur(f.reglages, { nom: "Température", min: -50, max: 260, pas: 5, val: 25, unite: " °C", surChange: dessin });
    // log10 du module (Pa) : vitreux 9,48 ; entre Tg et Tf, d'autant plus haut que X est grand ; fondu 6
    function logE(t, Tg, Tf, X) {
      if (t < Tg) return 9.48;
      if (t < Tf) return 6 + 3.3 * Math.sqrt(X) - 0.3 * (t - Tg) / (Tf - Tg);
      return 6;
    }
    function dessin() {
      R.vider(g);
      var p = P[cle], Tg = p[0], Tf = p[1], X = p[2], t = cT.v;
      var X0 = 110, W = 560, Y0 = 420, H = 320;
      var x = function (u) { return X0 + (u + 50) / 310 * W; }, y = function (l) { return Y0 - (l - 5.5) / 4.5 * H; };
      R.fleche(g, [X0, Y0], [X0 + W + 25, Y0], { couleur: C.fonce, epaisseur: 2.5 }); R.fleche(g, [X0, Y0], [X0, Y0 - H - 25], { couleur: C.fonce, epaisseur: 2.5 });
      T(g, "log Er (Pa)", [X0 + 10, Y0 - H - 40], { taille: 17, ancre: "start", couleur: C.doux }); T(g, "T (°C)", [X0 + W + 10, Y0 - 22], { taille: 17, couleur: C.doux });
      [6, 9.48].forEach(function (l) { R.ligne(g, [X0 - 8, y(l)], [X0, y(l)], { couleur: C.fonce, epaisseur: 2 }); T(g, R.fmt(l, l % 1 ? 2 : 0), [X0 - 34, y(l)], { taille: 16, couleur: C.doux }); });
      R.el("rect", { x: x(Tg), y: Y0 - H, width: x(Tf) - x(Tg), height: H, fill: PLATEFORME.teinte(0.08) }, g);
      [["Tg", Tg], ["Tf", Tf]].forEach(function (q) { R.ligne(g, [x(q[1]), Y0], [x(q[1]), Y0 - H], { couleur: C.doux, epaisseur: 2, tirets: "6 5" }); T(g, q[0] + " = " + q[1] + " °C", [x(q[1]), Y0 + 26], { taille: 16, gras: true }); });
      var pts = [];
      for (var u = -50; u <= 260; u += 1) pts.push(x(u).toFixed(1) + "," + y(logE(u, Tg, Tf, X)).toFixed(1));
      R.el("polyline", { points: pts.join(" "), fill: "none", stroke: C.acc, "stroke-width": 5, "stroke-linejoin": "round" }, g);
      T(g, "vitreux", [(x(-50) + x(Tg)) / 2, y(9.48) - 22], { taille: 16, couleur: C.doux });
      T(g, "cristaux + amorphe caoutchouteux", [(x(Tg) + x(Tf)) / 2, Y0 - H + 18], { taille: 16, couleur: C.doux });
      T(g, "fondu", [(x(Tf) + x(260)) / 2, y(6) - 22], { taille: 16, couleur: C.doux });
      var l = logE(t, Tg, Tf, X);
      R.ligne(g, [x(t), Y0], [x(t), y(l)], { couleur: C.fonce, epaisseur: 2 });
      R.el("circle", { cx: x(t), cy: y(l), r: 11, fill: C.acc, stroke: "#fff", "stroke-width": 3 }, g);
      // l'échantillon : opaque si cristaux, transparent si fondu
      var cristaux = t < Tf;
      R.el("rect", { x: 760, y: 150, width: 150, height: 150, rx: 16, fill: cristaux ? "#e9e6f0" : "rgba(255,255,255,0.2)", stroke: C.fonce, "stroke-width": 3, "stroke-dasharray": cristaux ? null : "8 6" }, g);
      if (!cristaux) T(g, "TD 1", [835, 225], { taille: 28, gras: true, couleur: C.doux, halo: false });
      T(g, cristaux ? "translucide ou opaque" : "transparent", [835, 330], { taille: 18, gras: true });
      T(g, "X = " + (cristaux ? R.fmt(t < Tf ? X : 0, 1) : "0"), [835, 120], { taille: 20, gras: true, couleur: C.acc });
      var etat = t < Tg ? "vitreux (sous Tg)" : cristaux ? "entre Tg et Tf : amorphe caoutchouteux, cristaux présents" : "au-dessus de Tf : cristaux fondus";
      zone.innerHTML = "<strong>Application " + cle + "</strong>, " + t + " °C : " + etat + " ; module ≈ " + (l > 9 ? "GPa" : l > 6.5 ? "entre le MPa et le GPa" : "1 MPa") + ".";
    }
    dessin();
  })();
})();
