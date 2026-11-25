(function () {
  "use strict";
  if (!window.M3D) return;
  var T = M3D.T;

  /* ---------- Patin à recirculation sur rail, puis table sur deux rails ---------- */
  (function () {
    var V = M3D.figure("fig-patin-3d", {
      titre: "Patin à recirculation de billes sur son rail",
      essai: "<strong>Essaie</strong> : fais avancer le patin, rends-le transparent, puis passe à « Table sur deux rails ». " +
        "<strong>Observe</strong> : les billes chargées roulent dans les gorges du rail et reviennent par les pièces de tête : la course est illimitée. Sur la table, seul le rail de droite a des butées latérales.",
      vue: { distance: 330, az: 0.6, el: 0.42 }
    });
    if (!V) return;
    var G = new T.Group(); V.ajouter(G, true);
    var mode = 0, s = 0, trans = true, circuits = [], patins = [];
    var mTrans = M3D.mat("acierFonce", { opacite: 0.3 }), mPlein = M3D.mat("acierFonce", { metal: 0.4 });
    var mCh = M3D.mat("acc", { metal: 0.4, rugo: 0.3 });
    function railProfil(L) {
      var r = M3D.prisme([[-10, 0], [10, 0], [10, 10], [8.5, 11], [8.5, 13], [10, 14], [10, 18], [-10, 18], [-10, 14], [-8.5, 13], [-8.5, 11], [-10, 10]], L, "acier", { metal: 0.5, rugo: 0.25 });
      r.rotation.y = Math.PI / 2; return r;
    }
    function patin(x0, z0) {
      var g = new T.Group(); g.position.set(x0, 0, z0);
      var corps = M3D.prisme([[-22, 4], [-11, 4], [-11, 22], [11, 22], [11, 4], [22, 4], [22, 30], [-22, 30]], 50, null, { mat: trans ? mTrans : mPlein });
      corps.rotation.y = Math.PI / 2; g.add(corps); corps.userData.corps = true;
      [-1, 1].forEach(function (sx) {
        var tete = M3D.prisme([[-22, 4], [-11, 4], [-11, 22], [11, 22], [11, 4], [22, 4], [22, 30], [-22, 30]], 7, "rouge", { metal: 0.1, rugo: 0.6 });
        tete.rotation.y = Math.PI / 2; tete.position.x = sx * 28.5; g.add(tete);
        var joint = M3D.prisme([[-22, 4], [-11, 4], [-11, 22], [11, 22], [11, 4], [22, 4], [22, 30], [-22, 30]], 2, "vert", { metal: 0, rugo: 0.7 });
        joint.rotation.y = Math.PI / 2; joint.position.x = sx * 33; g.add(joint);
        V.piece(tete, { nom: "pièce de tête", role: "canalise le retour des billes" });
        V.piece(joint, { nom: "joint racleur", role: "assure l'étanchéité et retient le lubrifiant" });
      });
      V.piece(corps, { nom: "chariot (patin)", role: "corps en acier trempé et rectifié, HRC 60" });
      // deux circuits de billes, un de chaque côté du rail
      [-1, 1].forEach(function (sz) {
        var cb = M3D.circuitBilles(56, 3.2, 1.8, { matCharge: mCh });
        cb.groupe.position.set(0, 12, sz * (8.5 + 1.8 + 3.2));
        if (sz < 0) cb.groupe.rotation.y = Math.PI;
        g.add(cb.groupe); circuits.push(cb);
      });
      patins.push(g);
      return g;
    }
    function construire() {
      while (G.children.length) G.remove(G.children[0]);
      V.pieces = []; circuits = []; patins = [];
      if (mode === 0) {
        var r = railProfil(260); M3D.contours(r); G.add(r);
        V.piece(r, { nom: "rail de guidage", role: "acier trempé et rectifié ; les gorges reçoivent les billes" });
        G.add(patin(0, 0));
        V.vue(0.6, 0.42, 330); V.cible.set(0, 10, 0);
      } else {
        var bati = M3D.boite(300, 20, 200, "bleu", { metal: 0.15 }); bati.position.y = -10; M3D.contours(bati); G.add(bati);
        V.piece(bati, { nom: "bâti", role: "porte les deux rails" });
        [-70, 70].forEach(function (z) {
          var r2 = railProfil(280); r2.position.z = z; M3D.contours(r2); G.add(r2);
          V.piece(r2, { nom: z > 0 ? "rail du palier fixe" : "rail du palier libre", role: z > 0 ? "bridé latéralement par des butées" : "aucune butée latérale : il absorbe les défauts de parallélisme et les dilatations" });
          [-60, 60].forEach(function (x) { G.add(patin(x, z)); });
        });
        [-1, 1].forEach(function (sx) { [0, 1].forEach(function (k) { var b = M3D.boite(100, 12, 6, "violet"); b.position.set(sx * 70, 6, 70 + 13 + k * 0); if (k) return; M3D.contours(b); G.add(b); V.piece(b, { nom: "butée latérale", role: "bride le rail du palier fixe" }); }); });
        var table = M3D.boite(240, 14, 200, "jaune", { metal: 0.15, opacite: trans ? 0.45 : undefined }); table.position.y = 37; G.add(table);
        V.piece(table, { nom: "table", role: "déplacée par les quatre patins" });
        patins.table = table;
        V.vue(0.75, 0.6, 620); V.cible.set(0, 10, 0);
      }
      placer();
    }
    function placer() {
      patins.forEach(function (p) { p.userData.x0 = p.userData.x0 === undefined ? p.position.x : p.userData.x0; p.position.x = p.userData.x0 + s; });
      if (patins.table) patins.table.position.x = s;
      circuits.forEach(function (c, i) { c.placer((i % 2 ? 1 : -1) * s / 2); });
      V.rendre();
    }
    M3D.choix(V, ["Patin et rail", "Table sur deux rails"], function (i) {
      mode = i; V.eteindre();
      V.info(i === 0 ? "Patin à recirculation : sans jeu, sans rotation autour du rail, rectitude 3 à 20 µm par mètre." : "Palier fixe à droite (butées violettes), palier libre à gauche ; surfaces d'appui à 0,01 mm près.");
      construire();
    });
    var P = RM.curseur(V.f.reglages, { nom: "Position", min: -60, max: 60, pas: 1, val: 0, unite: " mm" });
    P.surChange(function () { s = P.v; placer(); });
    var bt = RM.bascule(V.f.reglages, "Patin transparent", true, function () { trans = bt.checked; construire(); });
  })();

  /* ---------- Chariot à quatre galets sur rail à deux arbres ---------- */
  (function () {
    var V = M3D.figure("fig-galets-3d", {
      titre: "Chariot à quatre galets sur rail à deux arbres",
      essai: "<strong>Essaie</strong> : fais rouler le chariot, rends le plateau transparent, touche les pièces. " +
        "<strong>Observe</strong> : la gorge de chaque galet épouse l'arbre rond ; le contact reste ouvert, la poussière est chassée au lieu de s'accumuler.",
      vue: { distance: 300, az: 0.6, el: 0.35 },
      info: "Touche une pièce pour la nommer."
    });
    if (!V) return;
    var G = new T.Group(); V.ajouter(G, true);
    var rail = M3D.prisme([[-20, 0], [20, 0], [20, 6], [14, 8], [14, 12], [8, 14], [-8, 14], [-14, 12], [-14, 8], [-20, 6]], 300, "vert", { metal: 0.2, rugo: 0.5 });
    rail.rotation.y = Math.PI / 2; M3D.contours(rail); G.add(rail);
    V.piece(rail, { nom: "rail en alliage léger", role: "profilé d'aluminium extrudé (EN AW 2017), support rigide des deux arbres" });
    var zA = 15, yA = 12, rA = 4.5;
    [-1, 1].forEach(function (s) {
      var a = M3D.cylindre(rA, 300, "acier", { metal: 0.55, rugo: 0.2 }); a.rotation.z = Math.PI / 2; a.position.set(0, yA, s * zA); M3D.contours(a); G.add(a);
      V.piece(a, { nom: "arbre de guidage", role: "acier trempé et rectifié, clipsé dans le rail" });
    });
    var mob = new T.Group(); G.add(mob);
    var plat = M3D.boite(90, 8, 70, "alu", { metal: 0.3 }); plat.position.y = 32; mob.add(plat);
    V.piece(plat, { nom: "plateau (table mobile)", role: "alliage léger ; les galets sont fixés dessous" });
    var mTr = M3D.mat("alu", { opacite: 0.3 }), mPl = plat.material;
    var galets = [], rG = 9;
    [-30, 30].forEach(function (x) {
      [-1, 1].forEach(function (s) {
        var prof = [[2, -5], [rG, -5]].concat(M3D.arc([rG + rA * 0.55, 0], rA * 1.05, Math.PI + 1.0, Math.PI - 1.0, 10)).concat([[rG, 5], [2, 5]]);
        var g = M3D.revolution(prof, "bleu", { metal: 0.35 });
        var w = new T.Group(); w.add(g); w.position.set(x, yA, s * (zA + rA * 0.55 + rG)); mob.add(w);
        var ax = M3D.cylindre(2.5, 18, "jaune"); ax.position.set(x, yA + 10, w.position.z); mob.add(ax);
        M3D.contours(g);
        V.piece(g, { nom: "galet de roulement", role: "profil extérieur concave (gorge) qui épouse l'arbre" });
        galets.push({ g: g, s: s });
      });
    });
    M3D.contours(plat);
    var P = RM.curseur(V.f.reglages, { nom: "Position", min: -90, max: 90, pas: 1, val: 0, unite: " mm" });
    var bt = RM.bascule(V.f.reglages, "Plateau transparent", false, function () { plat.material = bt.checked ? mTr : mPl; V.rendre(); });
    P.surChange(function () {
      mob.position.x = P.v;
      galets.forEach(function (o) { o.g.rotation.y = o.s * P.v / rG; });
      V.rendre();
    });
  })();
})();
