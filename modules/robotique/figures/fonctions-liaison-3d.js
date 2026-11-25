(function () {
  "use strict";
  if (!window.M3D) return;
  var T = M3D.T;

  /* ---------- Les trois liaisons complètes du cours, en 3D et en éclaté ---------- */
  var V = M3D.figure("fig-exemples-3d", {
    titre: "Trois liaisons arbre-moyeu du cours, en 3D",
    essai: "<strong>Essaie</strong> : choisis un exemple, écarte les pièces avec « Éclaté », touche chaque pièce. " +
      "<strong>Observe</strong> : chaque pièce a sa fonction (serrer, positionner, transmettre, maintenir axialement, prévenir le desserrage).",
    vue: { distance: 330, az: 0.6, el: 0.38 },
    info: "Touche une pièce : son nom et sa fonction s'affichent ici."
  });
  if (!V) return;
  var G = new T.Group(); G.rotation.z = -Math.PI / 2; V.ajouter(G, true);
  var pieces = [], k = 0, u = 0;
  function ajoute(obj, info, dep) { M3D.contours(obj); G.add(obj); V.piece(obj, info); obj.userData.p0 = obj.position.clone(); obj.userData.dep = new T.Vector3().fromArray(dep || [0, 0, 0]); pieces.push(obj); return obj; }
  // écrou à encoches : couronne à quatre encoches
  function ecrouEncoches(ri, re, h) {
    var pts = [], n = 4, w = 0.2;
    for (var j = 0; j < n; j++) {
      var a0 = j * Math.PI / 2;
      for (var s = 0; s <= 10; s++) { var a = a0 + w + (Math.PI / 2 - 2 * w) * s / 10; pts.push([re * Math.cos(a), re * Math.sin(a)]); }
      pts.push([(re - 4) * Math.cos(a0 + Math.PI / 2 - w), (re - 4) * Math.sin(a0 + Math.PI / 2 - w)]);
      pts.push([(re - 4) * Math.cos(a0 + Math.PI / 2 + w), (re - 4) * Math.sin(a0 + Math.PI / 2 + w)]);
    }
    var m = M3D.prisme(pts, h, "acierFonce", { trous: [M3D.cercle(ri, 40, 0, 0, -1)], metal: 0.45, rugo: 0.3 });
    m.rotation.x = Math.PI / 2;
    var g = new T.Group(); g.add(m); return g;
  }
  function construire() {
    pieces.forEach(function (p) { G.remove(p); });
    pieces = []; V.pieces = [];
    if (k === 0) {
      // arbre épaulé, roulement, rondelle frein, écrou à encoches sur la partie filetée
      ajoute(M3D.arbre([[-90, -20, 23], [-20, -1, 17.5]]), { nom: "arbre", role: "son épaulement arrête le roulement d'un côté ; la tête filetée reçoit l'écrou" });
      var fil = M3D.filet(17.5, 1.5, -1, 30); ajoute(fil, { nom: "partie filetée de l'arbre", role: "une rainure y est usinée pour la languette intérieure de la rondelle frein" });
      var r = M3D.roulement({ type: "billes", d: 35, D: 72, B: 17 }); r.position.y = -11.5;
      ajoute(r, { nom: "roulement", role: "l'organe à fixer sur l'arbre" }, [0, 26, 0]);
      var rf = new T.Group();
      rf.add(M3D.revolution([[17.6, -1], [30, -1], [30, 1], [17.6, 1]], "laiton", { metal: 0.35 }));
      var lgi = M3D.boite(5, 2, 4, "laiton"); lgi.position.set(16, 0, 0); rf.add(lgi);
      for (var j = 0; j < 8; j++) { var a = j * Math.PI / 4 + 0.2, t = M3D.boite(5, 2, 6, "laiton"); t.position.set(32 * Math.cos(a), 0, 32 * Math.sin(a)); t.rotation.y = -a; rf.add(t); }
      var rab = M3D.boite(5, 9, 6, "laiton"); rab.position.set(32 * Math.cos(Math.PI / 4 + 0.2) - 1, 4.5, 32 * Math.sin(Math.PI / 4 + 0.2)); rab.rotation.y = -(Math.PI / 4 + 0.2); rf.add(rab);
      rf.position.y = 1;
      ajoute(rf, { nom: "rondelle frein à languette", role: "prévenir le desserrage : languette intérieure dans la rainure de l'arbre, languette extérieure rabattue dans une encoche de l'écrou" }, [0, 50, 0]);
      var ec = ecrouEncoches(17.5, 30, 10); ec.position.y = 7; ec.rotation.y = 0.2 + Math.PI / 4 - Math.PI / 4;
      ajoute(ec, { nom: "écrou à encoches", role: "serrer : plaque le roulement contre l'épaulement (maintien axial) ; serré avec une clé à ergots" }, [0, 78, 0]);
    } else if (k === 1) {
      // arbre avec méplat, roue dentée, vis qui appuie sur le méplat
      var mp = []; var R = 12, xf = 9.5, a0 = Math.acos(xf / R);
      for (var s = 0; s <= 48; s++) { var b = a0 + (2 * Math.PI - 2 * a0) * s / 48; mp.push([R * Math.cos(b), R * Math.sin(b)]); }
      var arb = new T.Group();
      var c1 = M3D.cylindre(R, 60, "acier", { seg: 64 }); c1.position.y = -45; arb.add(c1);
      var pr = M3D.prisme(mp, 30, "acier", { metal: 0.45, rugo: 0.32 }); pr.rotation.x = -Math.PI / 2; arb.add(pr);
      var c2 = M3D.cylindre(R, 30, "acier", { seg: 64 }); c2.position.y = 30; arb.add(c2);
      ajoute(arb, { nom: "arbre avec méplat", role: "le méplat offre une surface d'appui à la vis et limite le glissement en rotation" });
      var roue = M3D.engrenage({ m: 2, Z: 34, b: 24, alesage: 12.2, c: "rouge" }); roue.position.y = -12;
      ajoute(roue, { nom: "roue dentée (moyeu)", role: "plaquée contre la paroi opposée de l'alésage par la vis" }, [0, 70, 0]);
      var v = M3D.filet(3, 0.8, 0, 26); v.rotation.z = -Math.PI / 2; v.position.set(xf, 0, 0);
      var tete = M3D.cylindre(3, 1, "noir"); tete.rotation.z = Math.PI / 2; tete.position.set(xf + 26, 0, 0);
      var vg = new T.Group(); vg.add(v); vg.add(tete);
      ajoute(vg, { nom: "vis de pression", role: "transmettre un couple par serrage sur le méplat ; maintien axial par frottement seulement, sans positionnement axial précis" }, [40, 0, 0]);
    } else {
      // goupille transversale
      ajoute(M3D.arbre([[-80, 60, 12]]), { nom: "arbre", role: "introduit dans l'alésage du moyeu ; son trou est aligné avec celui du moyeu" });
      var ro = M3D.engrenage({ m: 2, Z: 34, b: 30, alesage: 12.2, c: "jaune" }); ro.position.y = -15;
      ajoute(ro, { nom: "roue dentée (moyeu)", role: "centrée par les surfaces cylindriques de l'arbre et de l'alésage" }, [0, 70, 0]);
      var g = M3D.cylindre(3, 62, "acc", { metal: 0.3 }); g.rotation.x = Math.PI / 2;
      ajoute(g, { nom: "goupille cylindrique", role: "immobilise la roue en rotation et transmet le couple par cisaillement ; contribue au maintien axial" }, [0, 0, 60]);
    }
    placer();
  }
  function placer() {
    pieces.forEach(function (p) { p.position.copy(p.userData.p0).addScaledVector(p.userData.dep, u); });
    V.rendre();
  }
  M3D.choix(V, ["Écrou à encoches", "Vis sur méplat", "Goupille transversale"], function (i) { k = i; V.eteindre(); V.info("Touche une pièce : son nom et sa fonction s'affichent ici."); construire(); });
  M3D.eclate(V, function (x) { u = x; placer(); });
})();
