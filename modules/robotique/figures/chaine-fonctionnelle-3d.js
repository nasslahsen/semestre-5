(function () {
  "use strict";
  if (!window.M3D) return;
  var T = M3D.T;

  /* ---------- Un axe robotique en 3D : moteur, réduction, transmission, guidage, bras ---------- */
  var V = M3D.figure("fig-axe-3d", {
    titre: "Un axe robotique en 3D, du moteur au bras",
    essai: "<strong>Essaie</strong> : touche un maillon (ou son bouton), écarte-les avec « Éclaté », puis « Faire tourner ». " +
      "<strong>Observe</strong> : le moteur fait plusieurs tours pendant que le bras n'en fait qu'une fraction ; chaque maillon est un endroit où le jeu et la souplesse peuvent entrer.",
    vue: { distance: 520, az: 0.42, el: 0.3, cible: [-20, 60, 0] },
    info: "Touche un maillon pour le nommer."
  });
  if (!V) return;
  var MAILLONS = [
    { nom: "Moteur", role: "l'actionneur : il crée le mouvement (vitesse et couple disponibles)" },
    { nom: "Réduction", role: "adapte vitesse et couple : moins vite, plus de couple (ici un train épicycloïdal, coupé)" },
    { nom: "Transmission", role: "amène le mouvement jusqu'à l'organe (arbre et accouplement) : rigidité, jeu" },
    { nom: "Guidage", role: "deux roulements : autorisent la rotation, bloquent le reste (jeu, frottement, alignement)" },
    { nom: "Bras / effecteur", role: "la structure porte la charge et l'outil : déformations, rigidité" }
  ];
  var ROUGE = M3D.mat("noir", { metal: 0.3, rugo: 0.5 });
  var G = new T.Group(); G.rotation.z = -Math.PI / 2; V.ajouter(G, true); // axe des pièces : y local = x écran
  var blocs = [], X0 = [-155, -88, -35, 30, 95];
  function bloc(k) { var b = new T.Group(); b.position.y = X0[k]; G.add(b); blocs.push(b); V.piece(b, MAILLONS[k]); return b; }
  // 1. moteur : carcasse, flasque, ailettes
  var bm = bloc(0);
  var carc = M3D.cylindre(30, 70, null, { mat: ROUGE }); bm.add(carc);
  var fl = M3D.boite(70, 8, 70, "noir"); fl.position.y = 38; bm.add(fl);
  for (var a = 0; a < 8; a++) { var ai = M3D.boite(4, 60, 10, "noir"); ai.position.set(31 * Math.cos(a * Math.PI / 4), -4, 31 * Math.sin(a * Math.PI / 4)); ai.rotation.y = -a * Math.PI / 4; bm.add(ai); }
  var am = M3D.cylindre(5, 30, "acier"); am.position.y = 50; bm.add(am);
  // 2. réduction : couronne fixe, planétaires, solaire (train épicycloïdal), boîtier coupé
  var br = bloc(1);
  var boit = M3D.revolution([[36, -18], [44, -18], [44, 18], [36, 18]], "alu", { coupe: Math.PI });
  boit.rotation.y = -Math.PI / 2; br.add(boit);
  var cour = M3D.couronne({ m: 2, Z: 30, b: 14, ext: 36, c: "acierFonce" }); cour.position.y = -7; br.add(cour);
  var sol = M3D.engrenage({ m: 2, Z: 12, b: 14, alesage: 3, c: "laiton" }); sol.position.y = -7; br.add(sol);
  var plan = [], porte = new T.Group(); br.add(porte);
  for (var p = 0; p < 3; p++) {
    var pl = M3D.engrenage({ m: 2, Z: 9, b: 12, alesage: 2.5, c: "bronze" }); var ap = p * 2 * Math.PI / 3;
    pl.position.set(21 * Math.cos(ap), -6, 21 * Math.sin(ap)); porte.add(pl); plan.push(pl);
  }
  var disq = M3D.cylindre(28, 4, "acierFonce"); disq.position.y = 9; porte.add(disq);
  // 3. transmission : arbre et accouplement
  var bt = bloc(2);
  var tr = M3D.cylindre(8, 70, "acier"); bt.add(tr);
  var acc = M3D.cylindre(15, 22, "acc", { metal: 0.3 }); acc.position.y = -18; bt.add(acc);
  // 4. guidage : palier coupé, deux roulements
  var bg = bloc(3);
  var pal = M3D.revolution([[25, -32], [40, -32], [40, 32], [25, 32], [25, 20], [21, 20], [21, -20], [25, -20]], "alu", { coupe: Math.PI });
  pal.rotation.y = -Math.PI / 2; bg.add(pal);
  [-20, 20].forEach(function (y) { var r = M3D.roulement({ type: "billes", d: 16, D: 42, B: 11, coupe: Math.PI }); r.rotation.y = -Math.PI / 2; r.position.y = y * 0.62; bg.add(r); });
  var ag = M3D.cylindre(8, 76, "acier"); bg.add(ag);
  // 5. bras et effecteur : moyeu, segment, outil (une aiguille)
  var bb = bloc(4);
  var bras = new T.Group(); bb.add(bras);
  var moy = M3D.cylindre(24, 30, "acc", { metal: 0.25 }); bras.add(moy);
  var seg = M3D.boite(34, 22, 120, "acc", { metal: 0.25 }); seg.position.z = 65; bras.add(seg);
  var bout = M3D.cylindre(17, 30, "acc", { metal: 0.25 }); bout.position.z = 125; bras.add(bout);
  var outil = M3D.cylindre(5, 50, "acier"); outil.rotation.x = Math.PI / 2; outil.position.set(0, 0, 160); bras.add(outil);
  var pointe = M3D.cylindre(0.4, 26, "acier", { r2: 5 }); pointe.rotation.x = Math.PI / 2; pointe.position.set(0, 0, 198); bras.add(pointe);
  M3D.contours(G);
  bras.rotation.y = -1.2;

  var ecart = 0, th = 0;
  function placer() {
    blocs.forEach(function (b, k) { b.position.y = X0[k] + (k - 2) * ecart * 42; });
    am.rotation.y = th; acc.rotation.y = th / 3.5; tr.rotation.y = th / 3.5; ag.rotation.y = th / 3.5;
    sol.rotation.y = th;
    porte.rotation.y = th / 3.5;          // sortie du train : rapport 1 + 30/12 = 3,5
    plan.forEach(function (pl) { pl.rotation.y = -th * 1.3; });
    bras.rotation.y = -1.2 + th / 3.5;
  }
  M3D.eclate(V, function (u) { ecart = u; placer(); });
  var ch = M3D.choix(V, MAILLONS.map(function (m) { return m.nom; }), function (k) {
    V.allumer(blocs[k]);
    V.info("<strong>" + MAILLONS[k].nom + "</strong> : " + MAILLONS[k].role);
  }, null);
  var b = RM.boutons(V.f.reglages);
  RM.bouton(b, "Faire tourner", function () {
    var t0 = th;
    V.animer(4200, function (u) { th = t0 + Math.PI * 2 * 4 * (u - u * u / 2) * 2 / 2; placer(); });
  });
  V.surToucher(function (pc, obj) {
    if (!pc) { V.eteindre(); return; }
    var k = blocs.indexOf(obj);
    if (k >= 0) ch.choisir(k);
  });
  V.etiquette("moteur", function () { return blocs[0].localToWorld(new T.Vector3(0, 0, 0)); }, { dx: -20, dy: -110, taille: 17 });
  V.etiquette("réduction", function () { return blocs[1].localToWorld(new T.Vector3(0, 0, 0)); }, { dx: -30, dy: 110, taille: 17 });
  V.etiquette("transmission", function () { return blocs[2].localToWorld(new T.Vector3(0, 0, 0)); }, { dx: 0, dy: -110, taille: 17 });
  V.etiquette("guidage", function () { return blocs[3].localToWorld(new T.Vector3(0, 0, 0)); }, { dx: 30, dy: 110, taille: 17 });
  V.etiquette("bras / effecteur", function () { return bras.localToWorld(new T.Vector3(0, 12, 80)); }, { dx: 60, dy: -60, taille: 17 });
  placer();
})();
