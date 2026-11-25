(function () {
  "use strict";
  if (!window.M3D) return;
  var T = M3D.T;

  /* ---------- Un petit angle à l'articulation, un écart au bout du bras ---------- */
  var V = M3D.figure("fig-jeu-3d", {
    titre: "Jeu angulaire et écart en bout de bras, en 3D",
    essai: "<strong>Essaie</strong> : règle la longueur L du bras et le jeu Δθ, tourne la vue. " +
      "<strong>Observe</strong> : le bras en couleur a tourné de Δθ par rapport au bras gris ; au bout, l'écart Δx grandit avec L. Angle dessiné 30 fois plus grand.",
    vue: { distance: 720, az: 0.2, el: 0.9, cible: [210, 0, 0] }
  });
  if (!V) return;
  var G = new T.Group(); V.ajouter(G, true);
  var socle = M3D.cylindre(60, 50, "noir", { metal: 0.3, rugo: 0.5 }); socle.position.y = -45; G.add(socle);
  var art = M3D.cylindre(40, 40, "alu"); G.add(art);
  V.piece(art, { nom: "articulation", role: "son jeu ou sa torsion donne un petit angle Δθ" });
  function bras(c, op) {
    var g = new T.Group();
    var s = M3D.boite(1, 26, 34, c, op ? { opacite: op } : { metal: 0.25 }); s.name = "seg"; g.add(s);
    var o = M3D.cylindre(3, 40, c === "acc" ? "acier" : c, op ? { opacite: op, r2: 0.5 } : { r2: 0.5 }); o.name = "outil"; g.add(o);
    return g;
  }
  var ref = bras("acierFonce", 0.35), reel = bras("acc"); G.add(ref); G.add(reel);
  V.piece(reel, { nom: "bras", role: "le point fonctionnel est au bout, à la distance L de l'axe" });
  var fx = new T.Group(); G.add(fx);
  var L = RM.curseur(V.f.reglages, { nom: "L", min: 0.1, max: 0.6, pas: 0.05, val: 0.4, unite: " m", dec: 2 });
  var dt = RM.curseur(V.f.reglages, { nom: "Δθ", min: 0, max: 1, pas: 0.05, val: 0.2, unite: "°", dec: 2 });
  var out = RM.h("div", null, "", V.f.direct), K = 30;
  function poser(g, l, a) {
    var s = g.getObjectByName("seg"), o = g.getObjectByName("outil");
    s.scale.x = l; s.position.x = l / 2;
    o.position.set(l, -36, 0);
    g.rotation.y = a;
  }
  function maj() {
    var l = L.v * 1000 * 0.75, a = dt.v * Math.PI / 180;
    poser(ref, l, 0); poser(reel, l, a * K);
    while (fx.children.length) fx.remove(fx.children[0]);
    if (a > 0) {
      var arc = new T.Mesh(new T.TorusGeometry(l, 2, 8, 40, a * K), M3D.mat("acc", { metal: 0, rugo: 0.5 }));
      arc.rotation.x = -Math.PI / 2; arc.position.y = -56; fx.add(arc);
    }
    var dx = L.v * a * 1000;
    RM.rendre(out, "\\Delta\\theta = " + RM.fmt(dt.v, 2) + "\\,\\frac{\\pi}{180} = " + RM.fmt(a * 1000, 2) + " \\times 10^{-3}\\ \\text{rad} \\qquad \\Delta x \\simeq " + RM.fmt(L.v, 2) + " \\times " + RM.fmt(a * 1000, 2) + " \\times 10^{-3} = " + RM.fmt(dx, 2) + "\\ \\text{mm}");
    V.rendre();
  }
  L.surChange(maj); dt.surChange(maj);
  V.etiquette("Δx", function () { var l = L.v * 750, a = dt.v * Math.PI / 180 * K / 2; return dt.v > 0 ? new T.Vector3(l * Math.cos(a), -56, -l * Math.sin(a)) : null; }, { dx: 40, dy: -40, couleur: M3D.ACC, taille: 22 });
  V.etiquette("L", function () { return new T.Vector3(L.v * 375, 14, 0); }, { dx: 0, dy: 50, taille: 20 });
  maj();
})();
