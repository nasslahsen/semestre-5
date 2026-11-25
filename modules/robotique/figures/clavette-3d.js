(function () {
  "use strict";
  if (!window.M3D) return;
  var T = M3D.T;

  /* ---------- Clavette parallèle en 3D : arbre, clavette, moyeu, plan cisaillé ---------- */
  var V = M3D.figure("fig-clavette-3d", {
    titre: "Clavette parallèle en 3D",
    essai: "<strong>Essaie</strong> : écarte les pièces, puis règle le couple C et la longueur utile L. " +
      "<strong>Observe</strong> : le couple passe de l'arbre au moyeu par la clavette, qui est cisaillée sur la surface b × L (en couleur).",
    vue: { distance: 150, az: 0.75, el: 0.42 }
  });
  if (!V) return;
  var r = 6, b = 4, t = 2.5, h = 4;
  var G = new T.Group(); G.rotation.z = -Math.PI / 2; V.ajouter(G, true);
  var arbre = M3D.arbre([[-45, 35, r]], { rainure: { y0: -10, y1: 10, b: b, t: t } }); M3D.contours(arbre); G.add(arbre);
  V.piece(arbre, { nom: "arbre", role: "rainure fermée usinée dans l'arbre (diamètre d = 12 mm)" });
  var moyeu = M3D.engrenage({ m: 1, Z: 30, b: 24, alesage: r + 0.05, rainure: { b: b, t: 1.8 }, c: "bronze" }); moyeu.position.y = -12; M3D.contours(moyeu); G.add(moyeu);
  V.piece(moyeu, { nom: "moyeu (roue)", role: "rainure débouchante dans le moyeu ; liaison cylindre-cylindre avec l'arbre" });
  var clav = new T.Group(); G.add(clav);
  var cc = M3D.clavette(20, b, h); cc.rotation.y = Math.PI / 2; clav.add(cc); M3D.contours(cc);
  V.piece(clav, { nom: "clavette", role: "transmet le couple entre l'arbre et le moyeu ; cisaillée au niveau de la surface de l'arbre" });
  var plan = M3D.boite(0.3, 20, b + 0.6, "acc", { opacite: 0.75 }); plan.position.x = r; clav.add(plan);
  var fl = new T.Group(); G.add(fl);
  var u = 0;
  var e0 = M3D.eclate(V, function (x) { u = x; placer(); });
  var C = RM.curseur(V.f.reglages, { nom: "C", min: 2, max: 16, pas: 1, val: 8, unite: " N·m" });
  var L = RM.curseur(V.f.reglages, { nom: "L", min: 10, max: 30, pas: 1, val: 20, unite: " mm" });
  var out = RM.h("div", null, "", V.f.direct);
  function placer() {
    var l = L.v;
    cc.scale.set(1, 1, 1); clav.scale.y = l / 20;
    clav.position.set(r - t + h / 2 + u * 14, 0, 0);
    moyeu.position.y = -12 + u * 48;
    while (fl.children.length) fl.remove(fl.children[0]);
    var F = 2 * C.v / 0.012;
    if (u < 0.5) fl.add(M3D.fleche([r + 1, 0, -6 - F / 300], [r + 1, 0, -b / 2 - 0.3], "rouge", { r: 0.5 }));
    V.rendre();
  }
  function maj() {
    var Ft = 2 * C.v / 0.012, tau = Ft / (b * L.v);
    RM.rendre(out, "F_t = \\frac{2C}{d} = \\frac{2 \\times " + C.v + "}{0{,}012} = " + Math.round(Ft) + "\\ \\text{N} \\qquad \\tau \\simeq \\frac{F_t}{bL} = \\frac{" + Math.round(Ft) + "}{4 \\times " + L.v + "} = " + RM.fmt(tau, 1) + "\\ \\text{MPa}");
    placer();
  }
  C.surChange(maj); L.surChange(maj);
  V.etiquette("b × L", function () { return clav.localToWorld(new T.Vector3(r, 6, 0)); }, { dx: 60, dy: -50, couleur: M3D.ACC, taille: 18 });
  V.etiquette("F", function () { return u < 0.5 ? fl.localToWorld(new T.Vector3(r + 1, 0, -6 - 2 * C.v / 0.012 / 300)) : null; }, { dx: -50, dy: 45, couleur: M3D.COUL.rouge, taille: 18, ind: "t" });
  e0.set(0.4); u = 0.4;
  maj();
})();
