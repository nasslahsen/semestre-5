(function () {
  "use strict";
  if (!window.M3D) return;
  var T = M3D.T;

  /* ---------- Les familles de roulements en 3D, avec les charges que chacune accepte ---------- */
  var V = M3D.figure("fig-familles-3d", {
    titre: "Huit familles de roulements en 3D",
    essai: "<strong>Essaie</strong> : choisis une famille, tourne-la au doigt. " +
      "<strong>Observe</strong> : la flèche verticale est la charge radiale, la flèche le long de l'arbre la charge axiale ; pas de flèche, pas de charge acceptée.",
    vue: { distance: 300, az: 0.75, el: 0.38 }
  });
  if (!V) return;
  // r, a : charge radiale et axiale acceptées (0 : aucune, 1 : faible ou moyenne, 2 : importante) ; a2 : axiale dans les deux sens
  var F = [
    { t: "billes", nom: "Billes, contact radial", r: 2, a: 1, a2: true, txt: "radiales et axiales relativement importantes ; bonne coaxialité ; déversement 2' à 10' ; très employé." },
    { t: "oblique", nom: "Billes, contact oblique", r: 1, a: 2, a2: false, txt: "axiales élevées dans un seul sens, ou combinées ; grandes fréquences ; déversement ≈ 0 ; en général non démontables." },
    { t: "deux-rangees", nom: "Deux rangées, contact oblique", r: 2, a: 1, a2: true, txt: "radiales assez importantes, axiales alternées ; fréquences plus faibles qu'à une rangée ; déversement ≈ 0." },
    { t: "rotule", nom: "Deux rangées, à rotule", r: 1, a: 1, a2: true, txt: "radiales moyennes, axiales faibles ; grandes fréquences ; pour un alignement précis difficile ; déversement 1,5° à 3°." },
    { t: "rouleaux", nom: "Rouleaux cylindriques", r: 2, a: 0, txt: "radiales élevées, aucune axiale ; grandes fréquences ; déversement 2' ; bague séparable." },
    { t: "coniques", nom: "Rouleaux coniques", r: 2, a: 2, a2: false, txt: "radiales et axiales relativement importantes ; pas pour les grandes fréquences ; montés par paire en opposition ; cuvette séparable." },
    { t: "aiguilles", nom: "Aiguilles", r: 2, a: 0, txt: "radiales importantes sous encombrement réduit, aucune axiale ; très bonne coaxialité ; résistent aux chocs." },
    { t: "butee", nom: "Butée à billes", r: 0, a: 2, a2: false, txt: "axiales seulement (simple effet : un sens) ; vitesses moins élevées que les radiaux ; bagues séparables." }
  ];
  var grp = new T.Group(); V.ajouter(grp, true);
  var coupe = Math.PI / 2, k = 0, rb = null, tourne = 0;
  function construire() {
    while (grp.children.length) grp.remove(grp.children[0]);
    V.pieces = [];
    var f = F[k], aig = f.t === "aiguilles";
    rb = M3D.roulement({ type: f.t, d: 40, D: aig ? 62 : 90, B: aig ? 30 : f.t === "butee" ? 22 : 24, coupe: coupe });
    rb.rotation.z = f.t === "butee" ? Math.PI / 2 : Math.PI / 2;
    M3D.contours(rb);
    grp.add(rb);
    V.piece(rb, { nom: f.nom, role: f.txt });
    // arbre en transparence
    var ar = M3D.cylindre(19.6, 150, "acierFonce", { opacite: 0.25 }); ar.rotation.z = Math.PI / 2; grp.add(ar);
    // charges
    var R0 = 47;
    if (f.r) grp.add(M3D.fleche([0, R0 + 20 + f.r * 26, 0], [0, R0 + 4, 0], "rouge", { r: 2.6 }));
    if (f.a) {
      var L = 20 + f.a * 22;
      grp.add(M3D.fleche([-80 - L, 0, 0], [-78, 0, 0], "bleu", { r: 2.6 }));
      if (f.a2) grp.add(M3D.fleche([80 + L, 0, 0], [78, 0, 0], "bleu", { r: 2.6 }));
    }
    V.info("<strong>" + f.nom + "</strong> : " + f.txt);
    tourner();
  }
  function tourner() {
    if (!rb) return;
    rb.parts.bagueInt.rotation.y = tourne;
    rb.parts.billes.rotation.y = tourne * 0.4;
    if (rb.parts.cage) rb.parts.cage.rotation.y = tourne * 0.4;
  }
  M3D.choix(V, ["Billes", "Oblique", "2 rangées", "Rotule", "Rouleaux", "Coniques", "Aiguilles", "Butée"], function (i) { k = i; construire(); });
  var bc = RM.bascule(V.f.reglages, "Vue en coupe", true, function () { coupe = bc.checked ? Math.PI / 2 : 0; construire(); });
  V.etiquette("radiale", function () { return F[k].r ? new T.Vector3(0, 47 + 20 + F[k].r * 26, 0) : null; }, { dx: 0, dy: -24, couleur: M3D.COUL.rouge, taille: 17 });
  V.etiquette("axiale", function () { return F[k].a ? new T.Vector3(-80 - 20 - F[k].a * 22, 0, 0) : null; }, { dx: 0, dy: -26, couleur: M3D.COUL.bleu, taille: 17 });
  V.surToucher(function (p, obj) {
    if (!p) return;
    V.allumer(obj);
    var t0 = tourne;
    V.animer(1600, function (u) { tourne = t0 + Math.PI * 3 * (u - u * u / 2); tourner(); }, function () { V.eteindre(); });
  });
})();
