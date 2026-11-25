(function () {
  "use strict";
  if (!window.M3D) return;
  var T = M3D.T;

  /* ---------- Un arbre guidé en rotation : il tourne, il ne part pas en travers ---------- */
  var V = M3D.figure("fig-guidage-3d", {
    titre: "Arbre guidé en rotation par deux roulements",
    essai: "<strong>Essaie</strong> : « Faire tourner », puis augmente l'effort F en travers. " +
      "<strong>Observe</strong> : l'arbre tourne librement, mais sous F il ne s'écarte que de δ = F / k (déplacement dessiné 120 fois plus grand).",
    vue: { distance: 450, az: 0.62, el: 0.3, cible: [40, 0, 0] }
  });
  if (!V) return;
  var k = 4000; // N/mm, raideur de l'exemple de la page
  var grp = new T.Group(); V.ajouter(grp, true);
  // logement coupé en deux pour voir dedans
  var Lg = 170, R1 = 45, R2 = 62;
  var log = M3D.revolution([[R1, -Lg / 2], [R2, -Lg / 2], [R2, Lg / 2], [R1, Lg / 2], [R1, Lg / 2 - 25], [R1 + 0.01, -Lg / 2 + 25]].slice(0, 4), "alu", { coupe: Math.PI });
  log.rotation.set(0, -Math.PI / 2, Math.PI / 2, "ZYX");
  M3D.contours(log); grp.add(log);
  V.piece(log, { nom: "logement (bâti)", role: "coupé en deux pour voir le guidage" });
  var mobile = new T.Group(); grp.add(mobile);
  var ar = M3D.arbre([[-150, 150, 20]]); ar.rotation.z = Math.PI / 2; M3D.contours(ar); mobile.add(ar);
  V.piece(ar, { nom: "arbre", role: "un seul mouvement utile : la rotation autour de son axe" });
  var repere = M3D.boite(6, 41, 6, "acc"); repere.position.set(140, 0, 0); mobile.add(repere);
  var rlts = [];
  [-55, 55].forEach(function (x) {
    var r = M3D.roulement({ type: "billes", d: 40, D: 90, B: 23, coupe: Math.PI });
    r.rotation.set(0, -Math.PI / 2, Math.PI / 2, "ZYX"); r.position.x = x; M3D.contours(r); grp.add(r); rlts.push(r);
    V.piece(r, { nom: "roulement", role: "laisse tourner, bloque les déplacements en travers et le long de l'axe" });
  });
  var rot = M3D.flecheRotation(34, 0, "vert", { ep: 2.2 }); rot.rotation.z = -Math.PI / 2; rot.position.x = 175; grp.add(rot);
  var fl = new T.Group(); grp.add(fl);
  var F = RM.curseur(V.f.reglages, { nom: "F", min: 0, max: 400, pas: 10, val: 200, unite: " N" });
  var b = RM.boutons(V.f.reglages), ang = 0;
  RM.bouton(b, "Faire tourner", function () {
    var a0 = ang;
    V.animer(2600, function (u) { ang = a0 + Math.PI * 4 * (u - u * u / 2); maj(); });
  });
  var out = RM.h("p", { "class": "m3d-info" }, "", V.f.direct);
  function maj() {
    var d = F.v / k;
    mobile.position.y = -d * 120;
    ar.rotation.x = ang; repere.position.set(140, 20 * Math.cos(ang), 20 * Math.sin(ang)); repere.rotation.x = ang;
    rlts.forEach(function (r) {
      // la bague intérieure suit l'arbre : décalage vertical exprimé dans le repère du roulement
      var o0 = r.worldToLocal(new T.Vector3(r.position.x, 0, 0)), o1 = r.worldToLocal(new T.Vector3(r.position.x, -d * 120, 0));
      r.parts.bagueInt.position.copy(o1.sub(o0)); r.parts.billes.position.copy(r.parts.bagueInt.position.clone().multiplyScalar(0.5)); r.parts.cage.position.copy(r.parts.billes.position);
      r.parts.bagueInt.rotation.y = ang; r.parts.billes.rotation.y = ang * 0.4; r.parts.cage.rotation.y = ang * 0.4; });
    while (fl.children.length) fl.remove(fl.children[0]);
    if (F.v > 0) fl.add(M3D.fleche([0, 50 + F.v * 0.18, 0], [0, 21 - d * 120, 0], "rouge", { r: 2.4 }));
    RM.rendre(out, "\\delta = \\dfrac{F}{k} = \\dfrac{" + F.v + "}{4000} = " + RM.fmt(d, 3) + "\\ \\text{mm}");
    V.rendre();
  }
  F.surChange(maj);
  V.etiquette("F", function () { return F.v > 0 ? new T.Vector3(0, 50 + F.v * 0.18, 0) : null; }, { dx: 22, dy: -10, couleur: M3D.COUL.rouge, taille: 20 });
  V.etiquette("rotation libre", function () { return new T.Vector3(175, 34, 0); }, { dx: -20, dy: -60, couleur: M3D.COUL.ok, taille: 17 });
  maj();
})();
