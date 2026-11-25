(function () {
  "use strict";
  if (!window.M3D) return;
  var T = M3D.T;

  /* ---------- Anneaux élastiques et goupilles de positionnement en 3D ---------- */
  var V = M3D.figure("fig-anneaux-3d", {
    titre: "Anneaux élastiques et goupilles, montés en 3D",
    essai: "<strong>Essaie</strong> : choisis un montage, puis glisse « Éclaté » de droite à gauche pour le monter. " +
      "<strong>Observe</strong> : l'anneau s'ouvre pour passer, puis se loge dans sa gorge ; les goupilles fixent la position d'une pièce sur l'autre, la vis la serre.",
    vue: { distance: 300, az: 0.75, el: 0.35, cible: [10, 0, 0] },
    info: "Touche une pièce pour la nommer."
  });
  if (!V) return;
  var G = new T.Group(); V.ajouter(G, true);
  var mode = 0, u = 0, mob = [];
  function ajoute(o, info, dep, ouvre) { M3D.contours(o); G.add(o); if (info) V.piece(o, info); o.userData.p0 = o.position.clone(); o.userData.dep = new T.Vector3().fromArray(dep || [0, 0, 0]); o.userData.ouvre = ouvre; mob.push(o); return o; }
  function construire() {
    mob.forEach(function (o) { G.remove(o); }); mob = []; V.pieces = [];
    G.rotation.set(0, 0, mode === 2 ? 0 : -Math.PI / 2);
    if (mode === 0) {
      // anneau extérieur : arbre avec gorge, roulement retenu contre l'épaulement
      ajoute(M3D.revolution([[0, -70], [16, -70], [16, -14], [12, -14], [12, 16], [10.8, 16], [10.8, 18], [12, 18], [12, 50], [0, 50]], "acier", { coupe: Math.PI / 2, metal: 0.45 }), { nom: "arbre", role: "une gorge est usinée pour loger l'anneau" });
      var r = M3D.roulement({ type: "billes", d: 24, D: 52, B: 15 }); r.position.y = -6.5;
      ajoute(r, { nom: "roulement", role: "la pièce à retenir axialement" }, [0, 40, 0]);
      var c = M3D.circlip(10.8, 14.5, 1.6); c.position.y = 17;
      ajoute(c, { nom: "anneau élastique extérieur (pour arbre)", role: "empêche le déplacement axial ; facilement démontable" }, [0, 48, 0], true);
    } else if (mode === 1) {
      // anneau intérieur : logement avec gorge dans l'alésage
      var lg = M3D.revolution([[21, -40], [26, -40], [26, -9], [40, -9], [40, 12], [41.4, 12], [41.4, 14], [40, 14], [40, 30], [48, 30], [48, -40]].reverse(), "alu", { coupe: Math.PI });
      lg.rotation.y = -Math.PI / 2;
      ajoute(lg, { nom: "logement", role: "la gorge est dans l'alésage" });
      var r2 = M3D.roulement({ type: "billes", d: 35, D: 80, B: 21 }); r2.position.y = 1.5;
      ajoute(r2, { nom: "roulement", role: "la pièce à retenir dans l'alésage" }, [0, 45, 0]);
      var c2 = M3D.circlip(37, 41.4, 1.8, { interieur: true }); c2.position.y = 13;
      ajoute(c2, { nom: "anneau élastique intérieur (pour alésage)", role: "se loge dans la gorge de l'alésage, oreilles vers l'intérieur" }, [0, 30, 0], true);
    } else {
      // deux pièces : goupilles de positionnement et vis de fixation
      var base = M3D.prisme([[-60, -30], [60, -30], [60, 30], [-60, 30]], 20, "bleu", { trous: [M3D.cercle(4, 24, -40, 0, -1), M3D.cercle(4, 24, 40, 0, -1), M3D.cercle(4, 24, 0, 0, -1)], metal: 0.2 });
      base.rotation.x = Math.PI / 2; base.position.y = -10;
      ajoute(base, { nom: "pièce fixe", role: "reçoit les goupilles (ajustement H7/m6)" });
      var haut = M3D.prisme([[-50, -25], [50, -25], [50, 25], [-50, 25]], 16, "rouge", { trous: [M3D.cercle(4, 24, -40, 0, -1), M3D.cercle(4, 24, 40, 0, -1), M3D.cercle(4, 24, 0, 0, -1)], metal: 0.2 });
      haut.rotation.x = Math.PI / 2; haut.position.y = 8;
      ajoute(haut, { nom: "pièce immobilisée", role: "sa position est donnée par les deux goupilles" }, [0, 55, 0]);
      [-40, 40].forEach(function (x) { var g = M3D.cylindre(4, 30, "jaune", { metal: 0.35 }); g.position.set(x, 1, 0); ajoute(g, { nom: "goupille de positionnement", role: "positionnement relatif précis et répétable" }, [0, 28, 0]); });
      var v = M3D.vis(8, 26, {}); v.position.y = 16; ajoute(v, { nom: "vis de fixation", role: "serre les deux pièces ; ce n'est pas elle qui positionne" }, [0, 85, 0]);
    }
    placer();
  }
  function placer() {
    mob.forEach(function (o) {
      o.position.copy(o.userData.p0).addScaledVector(o.userData.dep, u);
      if (o.userData.ouvre) { var s = 1 + 0.12 * Math.min(1, u * 4) * (mode === 1 ? -1 : 1); o.scale.set(s, 1, s); }
    });
    V.rendre();
  }
  M3D.choix(V, ["Anneau d'arbre", "Anneau d'alésage", "Goupilles"], function (i) { mode = i; V.eteindre(); construire(); });
  var e = M3D.eclate(V, function (x) { u = x; placer(); });
  e.set(1); u = 1; placer();
})();
