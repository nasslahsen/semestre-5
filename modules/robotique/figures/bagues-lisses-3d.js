(function () {
  "use strict";
  if (!window.M3D) return;
  var T = M3D.T;

  /* ---------- Trois bagues lisses autolubrifiantes en 3D ---------- */
  var V = M3D.figure("fig-bagues-3d", {
    titre: "Trois bagues autolubrifiantes, en coupe",
    essai: "<strong>Essaie</strong> : choisis une bague, fais glisser l'axe, tourne la vue. " +
      "<strong>Observe</strong> : dans la coupe, d'où vient le lubrifiant : une couche de PTFE, des pastilles de graphite, ou les pores du bronze.",
    vue: { distance: 200, az: 0.6, el: 0.42 }
  });
  if (!V) return;
  var G = new T.Group(); G.rotation.z = -Math.PI / 2; V.ajouter(G, true);
  var axe = M3D.cylindre(10, 150, "acier", { metal: 0.55, rugo: 0.18, seg: 64 }); M3D.contours(axe); G.add(axe);
  V.piece(axe, { nom: "axe", role: "il glisse dans la bague sans contact métal contre métal" });
  var bg = new T.Group(); G.add(bg);
  // texture poreuse pour le bronze fritté
  function poreux() {
    var cv = document.createElement("canvas"); cv.width = cv.height = 128;
    var x = cv.getContext("2d"); x.fillStyle = "#c08a4a"; x.fillRect(0, 0, 128, 128);
    for (var k = 0; k < 900; k++) { x.fillStyle = Math.random() < 0.5 ? "rgba(70,40,15,0.55)" : "rgba(240,200,140,0.5)"; x.beginPath(); x.arc(Math.random() * 128, Math.random() * 128, 0.6 + Math.random() * 1.4, 0, 7); x.fill(); }
    var t = new T.CanvasTexture(cv); t.wrapS = t.wrapT = T.RepeatWrapping; t.repeat.set(4, 2);
    return new T.MeshStandardMaterial({ map: t, metalness: 0.3, roughness: 0.7, side: T.DoubleSide });
  }
  var mPoreux = poreux();
  var CAS = [
    { nom: "Bague à revêtement polymère (PTFE, Téflon)", role: "une fine couche de plastique antifriction recouvre l'intérieur d'une armature métallique ; au rodage, un peu de PTFE passe sur l'axe" },
    { nom: "Bague à inserts solides", role: "pastilles de graphite incrustées dans la paroi en bronze ; l'axe étale le graphite sur la zone de contact" },
    { nom: "Bague en bronze fritté", role: "métal à micro-pores imprégné d'huile ; avec la chaleur et le mouvement, l'huile remonte à la surface" }
  ];
  var k = 0;
  function construire() {
    while (bg.children.length) bg.remove(bg.children[0]);
    V.pieces = [V.pieces[0]];
    var cut = Math.PI / 2, g = new T.Group();
    if (k === 0) {
      var arm = M3D.revolution([[12, -20], [15, -20], [15, 20], [12, 20]], "polymere", { coupe: cut });
      var ptfe = M3D.revolution([[10.15, -20], [12, -20], [12, 20], [10.15, 20]], "#6b5a46", { coupe: cut, metal: 0, rugo: 0.8 });
      [-12, -4, 4, 12].forEach(function (y) { var gr = M3D.revolution([[14.9, y - 1], [15.3, y - 1], [15.3, y + 1], [14.9, y + 1]], "polymere", { coupe: cut }); g.add(gr); });
      g.add(arm); g.add(ptfe);
      V.piece(ptfe, { nom: "couche de PTFE", role: "plastique antifriction : surface de glissement très lisse" });
      V.piece(arm, { nom: "armature métallique", role: "tient la couche de PTFE" });
    } else if (k === 1) {
      var br = M3D.revolution([[10.15, -20], [15, -20], [15, 20], [10.15, 20]], "bronze", { coupe: cut, metal: 0.45, rugo: 0.35 });
      g.add(br);
      V.piece(br, { nom: "paroi en bronze", role: "elle porte les pastilles de lubrifiant solide" });
      var mG = M3D.mat("#2b2b2e", { metal: 0, rugo: 0.9 }), past = new T.Group();
      for (var r = 0; r < 4; r++) for (var j = 0; j < 9; j++) {
        var a = (j + (r % 2) * 0.5) / 9 * Math.PI * 2;
        if (a > 0.05 && a < cut - 0.05) continue;
        var p = M3D.cylindre(2.2, 5.2, null, { mat: mG, seg: 16 });
        p.rotation.x = Math.PI / 2; var w = new T.Group(); w.rotation.y = a; p.position.set(0, -15 + r * 10, 12.6); w.add(p); past.add(w);
      }
      g.add(past);
      V.piece(past, { nom: "pastilles de graphite", role: "lubrifiant solide incrusté dans le bronze" });
    } else {
      var fr = M3D.revolution([[10.15, -20], [15, -20], [15, 20], [10.15, 20]], null, { coupe: cut, mat: mPoreux });
      g.add(fr);
      V.piece(fr, { nom: "bronze fritté poreux", role: "micro-pores imprégnés d'huile, comme une éponge" });
    }
    g.rotation.y = -Math.PI / 2;   // coupe tournée vers nous
    M3D.contours(g);
    bg.add(g);
    V.info("<strong>" + CAS[k].nom + "</strong> : " + CAS[k].role + ".");
    V.rendre();
  }
  M3D.choix(V, ["Polymère", "Inserts", "Bronze fritté"], function (i) { k = i; V.eteindre(); construire(); });
  var P = RM.curseur(V.f.reglages, { nom: "Axe", min: -30, max: 30, pas: 1, val: 0, unite: " mm" });
  P.surChange(function () { axe.position.y = P.v; V.rendre(); });
})();
