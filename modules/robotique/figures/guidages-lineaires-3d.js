(function () {
  "use strict";
  if (!window.M3D) return;
  var T = M3D.T;

  /* ---------- Douille à billes sur rail rond : les billes recirculent ---------- */
  (function () {
    var V = M3D.figure("fig-douille-3d", {
      titre: "Douille à billes sur rail cylindrique, en 3D",
      essai: "<strong>Essaie</strong> : déplace la douille le long du rail, change de type de douille. " +
        "<strong>Observe</strong> : les billes en couleur, coincées entre le rail et la douille, portent la charge ; elles reviennent par le chemin extérieur sans rien porter.",
      vue: { distance: 230, az: 0.55, el: 0.4 }
    });
    if (!V) return;
    var G = new T.Group(); G.rotation.z = -Math.PI / 2; V.ajouter(G, true);
    var rail = M3D.cylindre(10, 180, "acier", { metal: 0.55, rugo: 0.2, seg: 64 }); M3D.contours(rail); G.add(rail);
    V.piece(rail, { nom: "rail", role: "rond en acier trempé et rectifié" });
    var mob = new T.Group(); G.add(mob);
    var rb = 1.6, e = 2.6, Lc = 34, r0 = 10 + rb + e, type = 0, s = 0;
    var mCh = M3D.mat("acc", { metal: 0.4, rugo: 0.3 }), circuits = [], manchon = null;
    var CAS = [
      { nom: "Douille massive", ouv: 0, role: "jeu fonctionnel d'environ 0,1 mm" },
      { nom: "Douille à bague extérieure fendue", ouv: 0.1, role: "la fente permet de régler le jeu fonctionnel" },
      { nom: "Douille ouverte", ouv: 1.15, role: "le secteur ouvert laisse passer le support du rail : montage sur rail supporté" }
    ];
    function construire() {
      while (mob.children.length) mob.remove(mob.children[0]);
      circuits = []; V.pieces = [V.pieces[0]];
      var c = CAS[type];
      manchon = M3D.revolution([[18, -22], [24, -22], [24, 22], [18, 22]], "alu", { coupe: c.ouv, mat: M3D.mat("alu", { opacite: 0.32 }), seg: 64 });
      manchon.rotation.y = Math.PI - c.ouv / 2;
      mob.add(manchon);
      var joints = [-22, 22].map(function (y) { var j = M3D.revolution([[10.3, y - 1.5], [18, y - 1.5], [18, y + 1.5], [10.3, y + 1.5]], "noir", { coupe: c.ouv }); j.rotation.y = Math.PI - c.ouv / 2; mob.add(j); return j; });
      V.piece(manchon, { nom: c.nom, role: c.role });
      joints.forEach(function (j) { V.piece(j, { nom: "joint racleur", role: "protège les billes de la contamination" }); });
      var nC = 6;
      for (var k = 0; k < nC; k++) {
        var a = (k + 0.5) / nC * Math.PI * 2;
        var rel = ((a - (Math.PI - c.ouv / 2)) % (2 * Math.PI) + 2 * Math.PI) % (2 * Math.PI);
        if (c.ouv > 0.5 && rel < c.ouv + 0.25) continue;   // pas de circuit dans le secteur ouvert
        var cb = M3D.circuitBilles(Lc, e, rb, { matCharge: mCh });
        cb.groupe.rotation.z = Math.PI / 2; cb.groupe.position.z = r0;
        var w = new T.Group(); w.rotation.y = a; w.add(cb.groupe); mob.add(w);
        circuits.push(cb);
      }
      placer();
    }
    function placer() {
      mob.position.y = s;
      circuits.forEach(function (cb) { cb.placer(-s / 2); });
      V.rendre();
    }
    M3D.choix(V, ["Massive", "Fendue", "Ouverte"], function (i) { type = i; V.eteindre(); V.info("<strong>" + CAS[i].nom + "</strong> : " + CAS[i].role + "."); construire(); });
    var P = RM.curseur(V.f.reglages, { nom: "Position", min: -70, max: 70, pas: 1, val: 0, unite: " mm" });
    P.surChange(function () { s = P.v; placer(); });
    V.etiquette("bille porteuse", function () { var c = circuits[0]; if (!c) return null; var b = c.groupe.children.filter(function (x) { return x.material === mCh; })[0]; return b ? b.getWorldPosition(new T.Vector3()) : null; }, { dx: -60, dy: -70, couleur: M3D.ACC, taille: 17 });
  })();

  /* ---------- Rail simple ou rail supporté : la flexion sur une grande portée ---------- */
  (function () {
    var V = M3D.figure("fig-rail-3d", {
      titre: "Rail cylindrique simple ou rail supporté",
      essai: "<strong>Essaie</strong> : charge la douille au milieu, puis passe au rail supporté. " +
        "<strong>Observe</strong> : tenu seulement à ses bouts, le rail long fléchit sous la charge ; fixé sur son profilé en aluminium, il reste droit. Flèche exagérée, allure seulement.",
      vue: { distance: 500, az: 0.42, el: 0.3 }
    });
    if (!V) return;
    var G = new T.Group(); V.ajouter(G, true);
    var Lr = 400, R = 8, mode = 0, F = 0.5;
    var supports = [], profil = null, rail = null, bloc = null, fl = new T.Group(); G.add(fl);
    [-1, 1].forEach(function (s) { var b = M3D.boite(26, 46, 34, "acierFonce"); b.position.set(s * (Lr / 2 + 8), -12, 0); M3D.contours(b); G.add(b); supports.push(b); });
    profil = M3D.prisme([[-7, 0], [7, 0], [5, -22], [15, -24], [15, -30], [-15, -30], [-15, -24], [-5, -22]], Lr, "alu", { metal: 0.3 });
    profil.rotation.y = Math.PI / 2; profil.position.y = -R + 1; M3D.contours(profil); G.add(profil);
    V.piece(profil, { nom: "profilé en aluminium", role: "porte le rail sur toute sa longueur : pas de flexion" });
    bloc = M3D.boite(44, 26, 34, "acc", { metal: 0.25 }); M3D.contours(bloc); G.add(bloc);
    V.piece(bloc, { nom: "palier à douille", role: "la charge passe par la douille dans le rail" });
    function maj() {
      if (rail) G.remove(rail);
      var flex = mode === 0 ? F * 38 : 0, pts = [];
      for (var k = 0; k <= 40; k++) { var x = -Lr / 2 + Lr * k / 40, u = (x + Lr / 2) / Lr; pts.push(new T.Vector3(x, -flex * Math.sin(Math.PI * u), 0)); }
      rail = new T.Mesh(new T.TubeGeometry(new T.CatmullRomCurve3(pts), 80, R, 32, false), M3D.mat("acier", { metal: 0.55, rugo: 0.2 }));
      G.add(rail);
      V.pieces = V.pieces.filter(function (p) { return p.geometry === undefined || p.geometry.type !== "TubeGeometry"; });
      V.piece(rail, { nom: mode === 0 ? "rail cylindrique simple" : "rail supporté", role: mode === 0 ? "barre ronde, pleine ou creuse, de 5 à 80 mm de diamètre" : "barre ronde fixée sur un profilé en aluminium" });
      profil.visible = mode === 1;
      supports.forEach(function (s) { s.visible = mode === 0; });
      bloc.position.set(0, 13 + R - 4 - flex, 0);
      while (fl.children.length) fl.remove(fl.children[0]);
      if (F > 0) fl.add(M3D.fleche([0, 60 + F * 60 - flex, 0], [0, 27 - flex, 0], "rouge", { r: 3 }));
      V.info(mode === 0 ? "<strong>Rail simple</strong> tenu à ses deux bouts : sur une grande portée, il fléchit sous la charge." : "<strong>Rail supporté</strong> : fixé tout au long de sa longueur, il ne fléchit pas.");
      V.rendre();
    }
    M3D.choix(V, ["Rail simple", "Rail supporté"], function (i) { mode = i; maj(); });
    var c = RM.curseur(V.f.reglages, { nom: "Charge", min: 0, max: 1, pas: 0.01, val: 0.5, dec: 0 });
    c.input.parentNode.querySelector("output").style.display = "none";
    c.surChange(function () { F = c.v; maj(); });
  })();
})();
