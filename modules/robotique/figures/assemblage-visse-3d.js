(function () {
  "use strict";
  if (!window.M3D) return;
  var T = M3D.T;

  /* ---------- Serrer un boulon M6 en 3D : la vis en traction, les pièces en compression ---------- */
  var V = M3D.figure("fig-serrage-3d", {
    titre: "Serrage d'un boulon M6 en 3D",
    essai: "<strong>Essaie</strong> : tourne l'écrou avec « Serrage », change K. " +
      "<strong>Observe</strong> : tant que l'écrou n'appuie pas, rien ne se passe ; ensuite chaque tour crée de la précharge F₀ : la vis est tirée (traction), les pièces sont écrasées (compression).",
    vue: { distance: 165, az: 0.7, el: 0.3 }
  });
  if (!V) return;
  var d = 6, G = new T.Group(); V.ajouter(G, true);
  var transp = M3D.mat("bleu", { opacite: 0.35 }), plein = M3D.mat("bleu", { metal: 0.2 });
  function plaque(y, c) {
    var p = M3D.prisme([[-30, -20], [30, -20], [30, 20], [-30, 20]], 10, null, { trous: [M3D.cercle(3.3, 32, 0, 0, -1)], mat: c });
    p.rotation.x = Math.PI / 2; p.position.y = y; return p;
  }
  var p1 = plaque(5, plein), p2 = plaque(-5, M3D.mat("vert", { metal: 0.2 }));
  G.add(p1); G.add(p2);
  V.piece(p1, { nom: "pièce serrée", role: "travaille en compression" }); V.piece(p2, { nom: "pièce serrée", role: "travaille en compression" });
  var vis = M3D.vis(d, 32, { lisse: 6 }); vis.position.y = 10; G.add(vis);
  V.piece(vis, { nom: "vis", role: "travaille en traction sous la précharge F₀" });
  var ron = M3D.revolution([[3.3, 0], [6.5, 0], [6.5, 1.2], [3.3, 1.2]], "acier"); ron.position.y = -11.2; G.add(ron);
  var ec = M3D.ecrou(d); G.add(ec);
  V.piece(ec, { nom: "écrou", role: "on le tourne : il avance d'un pas par tour" });
  M3D.contours(vis); M3D.contours(ec);
  var fl = new T.Group(); G.add(fl);
  var S = RM.curseur(V.f.reglages, { nom: "Serrage", min: 0, max: 1, pas: 0.01, val: 0, dec: 0 });
  S.input.parentNode.querySelector("output").style.display = "none";
  var K = RM.curseur(V.f.reglages, { nom: "K", min: 0.10, max: 0.30, pas: 0.01, val: 0.20, dec: 2 });
  var tr = RM.bascule(V.f.reglages, "Pièces transparentes", false, function () { maj(); });
  var out = RM.h("div", null, "", V.f.direct);
  function maj() {
    var u = S.v, contact = 0.3, F0 = u <= contact ? 0 : (u - contact) / (1 - contact) * 4000;
    var h = (ec.children[0] && 4.8) || 4.8;
    ec.position.y = -12.4 - h / 2 - (1 - Math.min(1, u / contact)) * 9;
    ec.rotation.y = -u * Math.PI * 6;
    p1.material = tr.checked ? transp : plein;
    p2.material = tr.checked ? M3D.mat("vert", { opacite: 0.35 }) : M3D.mat("vert", { metal: 0.2 });
    while (fl.children.length) fl.remove(fl.children[0]);
    if (F0 > 0) {
      var L = 8 + F0 / 4000 * 22;
      fl.add(M3D.fleche([0, 15, 0], [0, 15 + L, 0], "acc", { r: 1.1 }));
      fl.add(M3D.fleche([0, -17, 0], [0, -17 - L, 0], "acc", { r: 1.1 }));
      fl.add(M3D.fleche([22, 10 + L, 14], [22, 10.5, 14], "bleu", { r: 1.1 }));
      fl.add(M3D.fleche([22, -10 - L, 14], [22, -10.5, 14], "vert", { r: 1.1 }));
    }
    var Tn = K.v * F0 * d / 1000;
    RM.rendre(out, F0 > 0 ? "F_0 \\approx " + RM.fmt(F0 / 1000, 2) + "\\ \\text{kN} \\qquad T \\simeq K F_0 d = " + RM.fmt(K.v, 2) + " \\times " + Math.round(F0) + " \\times 0{,}006 = " + RM.fmt(Tn, 2) + "\\ \\text{N}\\cdot\\text{m}" : "\\text{L'écrou n'appuie pas encore : } F_0 = 0");
    V.rendre();
  }
  S.surChange(maj); K.surChange(maj);
  V.etiquette("traction", function () { return S.v > 0.3 ? new T.Vector3(0, 30, 0) : null; }, { dx: -40, dy: -30, couleur: M3D.ACC, taille: 17 });
  V.etiquette("compression", function () { return S.v > 0.3 ? new T.Vector3(22, 22, 14) : null; }, { dx: 50, dy: -30, couleur: M3D.COUL.bleu, taille: 17 });
  maj();
})();
