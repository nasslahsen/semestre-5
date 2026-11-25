(function () {
  "use strict";
  if (!window.M3D) return;
  var T = M3D.T;

  /* ---------- Roulement rigide à billes en 3D : éclaté, coupe, rotation ---------- */
  var V = M3D.figure("fig-roulement-3d", {
    titre: "Roulement rigide à billes en 3D",
    essai: "<strong>Essaie</strong> : glisse le doigt sur le roulement pour le tourner, écarte les pièces avec « Éclaté », touche une pièce. " +
      "<strong>Observe</strong> : les billes roulent entre deux chemins creusés dans les bagues, et la cage les garde espacées.",
    vue: { distance: 260, az: 0.55, el: 0.42 },
    info: "Touche une pièce pour la nommer."
  });
  if (!V) return;
  var NOMS = ["bague extérieure", "chemin de roulement (bague extérieure)", "bille", "cage", "chemin de roulement (bague intérieure)", "bague intérieure"];
  var ROLES = [
    "montée dans le logement (alésage du bâti)",
    "piste creusée dans la bague extérieure, où roulent les billes",
    "élément roulant : contact elliptique avec les chemins",
    "maintient les billes à distance régulière",
    "piste creusée dans la bague intérieure",
    "montée sur l'arbre, elle tourne avec lui"
  ];
  var coupe = 0, ecart = 0, rot = 0, rb;
  var grp = new T.Group(); grp.rotation.x = Math.PI / 2; V.ajouter(grp, true);
  function construire() {
    while (grp.children.length) grp.remove(grp.children[0]);
    V.pieces = [];
    rb = M3D.roulement({ type: "billes", d: 40, D: 90, B: 23, coupe: coupe });
    var p = rb.parts;
    V.piece(p.bagueExt, { nom: "1 " + NOMS[0], role: ROLES[0] });
    V.piece(p.billes, { nom: "3 " + NOMS[2], role: ROLES[2] });
    V.piece(p.cage, { nom: "4 " + NOMS[3], role: ROLES[3] });
    V.piece(p.bagueInt, { nom: "6 " + NOMS[5], role: ROLES[5] });
    M3D.contours(rb);
    grp.add(rb);
    placer();
  }
  // éclaté le long de l'axe : bague extérieure d'un côté, bague intérieure de l'autre, billes et cage au milieu
  function placer() {
    var p = rb.parts, e = ecart * 46;
    p.bagueExt.position.y = -e; p.bagueInt.position.y = e;
    p.cage.position.y = e * 0.35; p.billes.position.y = -e * 0.15;
    p.bagueInt.rotation.y = rot; p.billes.rotation.y = rot * 0.4; p.cage.rotation.y = rot * 0.4;
    p.elements.forEach(function (b) { b.rotation.y = -rot * 2.2; });
  }
  construire();
  M3D.eclate(V, function (u) { ecart = u; placer(); });
  var b = RM.boutons(V.f.reglages);
  var bc = RM.bascule(V.f.reglages, "Vue en coupe", false, function () { coupe = bc.checked ? Math.PI / 2 : 0; construire(); V.rendre(); });
  RM.bouton(b, "Faire tourner", function () {
    var r0 = rot;
    V.animer(3200, function (u) { rot = r0 + Math.PI * 4 * (u - u * u / 2) * 2; placer(); });
  });
  // numéros du cours, reliés à leur pièce
  function num(k, pt, dx, dy) { V.etiquette(String(k), pt, { dx: dx, dy: dy, taille: 22, couleur: M3D.ACC }); }
  function proche(liste, x, z) {
    var m = null, dm = 1e9;
    liste.forEach(function (e) { var d = Math.hypot(e.position.x - x, e.position.z - z); if (d < dm) { dm = d; m = e; } });
    return m;
  }
  num(1, function () { return rb.parts.bagueExt.localToWorld(new T.Vector3(-45, 0, 0)); }, -60, 0);
  num(2, function () { return rb.parts.bagueExt.localToWorld(new T.Vector3(24.4, 0, -24.4)); }, 60, -55);
  num(3, function () { return proche(rb.parts.elements, -23, 23).getWorldPosition(new T.Vector3()); }, -70, 60);
  num(4, function () { return rb.parts.cage.localToWorld(new T.Vector3(-23, 0, -23)); }, -60, -55);
  num(5, function () { return rb.parts.bagueInt.localToWorld(new T.Vector3(27.5, 0, 0)); }, 110, 0);
  num(6, function () { return rb.parts.bagueInt.localToWorld(new T.Vector3(0, 11.5, 22)); }, 40, 80);
})();
