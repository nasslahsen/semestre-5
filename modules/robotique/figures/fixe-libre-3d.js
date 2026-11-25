(function () {
  "use strict";
  if (!window.M3D) return;
  var T = M3D.T;

  /* ---------- Montage fixe-libre en 3D : l'arbre chauffe et s'allonge ---------- */
  var V = M3D.figure("fig-fixe-libre-3d", {
    titre: "Montage fixe-libre en 3D, arbre tournant",
    essai: "<strong>Essaie</strong> : fais chauffer l'arbre, puis coche « Deux paliers fixes » et recommence. " +
      "<strong>Observe</strong> : en fixe-libre, la bague extérieure du palier libre coulisse et l'arbre s'allonge sans forcer ; avec deux paliers fixes, l'arbre pousse sur ses roulements. Allongement très exagéré.",
    vue: { distance: 480, az: 0.35, el: 0.3 }
  });
  if (!V) return;
  var G = new T.Group(); G.rotation.z = -Math.PI / 2; V.ajouter(G, true);
  var cut = Math.PI, g0 = 7; // jeu dessiné à droite de la bague extérieure libre (≈ 0,1 sur le plan du cours)
  // logement coupé : alésages des deux roulements, épaulement à gauche du palier fixe, jeu à droite du palier libre
  var log = M3D.revolution([[38, -112], [72, -112], [72, 112], [38, 112], [38, 71.5 + g0], [45, 71.5 + g0], [45, -71.5], [38, -71.5]], "alu", { coupe: cut });
  log.rotation.y = -Math.PI / 2; M3D.contours(log); G.add(log);
  V.piece(log, { nom: "logement", role: "coupé en deux pour voir le montage" });
  var mob = new T.Group(); G.add(mob);
  var ar = M3D.arbre([[-150, -71.5, 24], [-71.5, 71.5, 20], [71.5, 150, 24]]); M3D.contours(ar); G.add(ar);
  V.piece(ar, { nom: "arbre tournant", role: "il chauffe et s'allonge" });
  function rlt(y) { var r = M3D.roulement({ type: "billes", d: 40, D: 90, B: 23, coupe: cut }); r.position.y = y; r.rotation.y = -Math.PI / 2; M3D.contours(r); return r; }
  var fixe = rlt(-60), libre = rlt(60);
  G.add(fixe); mob.add(libre);
  V.piece(fixe, { nom: "palier fixe", role: "ses deux bagues sont arrêtées dans l'axe : il positionne l'arbre" });
  V.piece(libre, { nom: "palier libre", role: "bague intérieure tenue sur l'arbre, bague extérieure coulissante : il accompagne la dilatation" });
  // arrêts : anneaux élastiques sur l'arbre (à droite du fixe, à gauche du libre), anneau d'alésage à droite du fixe
  function anneau(r1, r2, y, parent) {
    var c = M3D.revolution([[r1, y - 1], [r2, y - 1], [r2, y + 1], [r1, y + 1]], "noir", { coupe: cut });
    c.rotation.y = -Math.PI / 2; M3D.contours(c); parent.add(c);
    V.piece(c, { nom: "anneau élastique", role: "arrête une bague dans l'axe" });
    return c;
  }
  anneau(20, 24.5, -47.5, G); anneau(20, 24.5, 47.5, mob); anneau(40.5, 47, -47.5, G);
  var cale = M3D.revolution([[38.5, 71.5], [45, 71.5], [45, 71.5 + g0], [38.5, 71.5 + g0]], "rouge", { coupe: cut });
  cale.rotation.y = -Math.PI / 2; cale.visible = false; G.add(cale);
  var fl = new T.Group(); G.add(fl);
  var dT = RM.curseur(V.f.reglages, { nom: "Chauffe", min: 0, max: 1, pas: 0.01, val: 0, dec: 0 });
  dT.input.parentNode.querySelector("output").style.display = "none";
  var deux = RM.bascule(V.f.reglages, "Deux paliers fixes", false, maj);
  function maj() {
    var u = dT.v, e = u * g0, bloque = deux.checked;
    cale.visible = bloque;
    // fixe-libre : tout ce qui est à droite du palier fixe avance de e ; deux fixes : rien n'avance, l'arbre force
    var a = bloque ? 0 : e;
    // l'arbre s'allonge à partir du palier fixe (y = −60) : ce qui est à droite avance
    var sc = 1 + a / 120;
    ar.scale.set(1, sc, 1); ar.position.y = 60 * (sc - 1);
    mob.position.y = a;
    while (fl.children.length) fl.remove(fl.children[0]);
    if (bloque && u > 0.05) {
      var L = 20 + 50 * u;
      fl.add(M3D.fleche([0, -60 - 14, 50], [0, -60 - 14 - L, 50], "rouge", { r: 2.2 }));
      fl.add(M3D.fleche([0, 60 + 14, 50], [0, 60 + 14 + L, 50], "rouge", { r: 2.2 }));
    }
    var mat = bloque && u > 0.05 ? M3D.mat("rouge", { metal: 0.2 }) : null;
    [fixe, libre].forEach(function (r) { r.traverse(function (m) { if (m.isMesh && m.geometry.type === "LatheGeometry") { m.userData.m0 = m.userData.m0 || m.material; m.material = mat || m.userData.m0; } }); });
    V.info(bloque ? (u > 0.05 ? "<strong>Sur-contraint</strong> : l'arbre ne peut pas s'allonger, il pousse sur les deux roulements." : "Deux paliers fixes : la cale rouge bloque la bague extérieure de droite.")
      : (u > 0.05 ? "<strong>Fixe-libre</strong> : la bague extérieure du palier libre coulisse dans son alésage, le jeu se referme sans effort." : "Fixe-libre : à droite, la bague extérieure du palier libre peut coulisser (jeu ≈ 0,1)."));
    V.rendre();
  }
  dT.surChange(maj);
  V.etiquette("fixe", function () { return fixe.getWorldPosition(new T.Vector3()).add(new T.Vector3(0, 74, 0)); }, { dx: -20, dy: -46, taille: 18 });
  V.etiquette("libre", function () { return libre.getWorldPosition(new T.Vector3()).add(new T.Vector3(0, 74, 0)); }, { dx: 20, dy: -46, taille: 18 });
  maj();
})();
