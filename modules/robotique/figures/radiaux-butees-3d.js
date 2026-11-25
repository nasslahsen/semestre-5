(function () {
  "use strict";
  if (!window.M3D) return;
  var T = M3D.T;

  /* ---------- L'angle de contact, sur trois roulements en coupe ---------- */
  var V = M3D.figure("fig-contact-3d", {
    titre: "Ligne de contact et angle α en 3D",
    essai: "<strong>Essaie</strong> : choisis un roulement et tourne-le au doigt. " +
      "<strong>Observe</strong> : la ligne de contact (en couleur) passe par la bille ; son angle α avec le plan radial classe le roulement.",
    vue: { distance: 280, az: 0.28, el: 0.16 }
  });
  if (!V) return;
  var CAS = [
    { t: "billes", nom: "Rigide à billes", al: 0 },
    { t: "oblique", nom: "Contact oblique", al: 35 },
    { t: "butee", nom: "Butée à billes", al: 90 }
  ];
  var grp = new T.Group(); V.ajouter(grp, true);
  var k = 0, ligne = null;
  function construire() {
    while (grp.children.length) grp.remove(grp.children[0]);
    var c = CAS[k];
    var rb = M3D.roulement({ type: c.t, d: 40, D: 90, B: c.t === "butee" ? 22 : 23, coupe: Math.PI, balleEn: Math.PI });
    // coupe tournée vers nous : le plan de coupe est le plan de l'écran, une bille en haut dans ce plan
    rb.rotation.y = -Math.PI / 2;
    var h = new T.Group(); h.rotation.z = Math.PI / 2; h.add(rb);
    M3D.contours(rb);
    grp.add(h);
    var ar = M3D.cylindre(19.6, 150, "acierFonce", { opacite: 0.25 }); ar.rotation.z = Math.PI / 2; grp.add(ar);
    // bille du haut (dans le plan de coupe) : centre au rayon moyen ; ligne de contact inclinée de α sur le plan radial
    var rm = 32.5, a = c.al * Math.PI / 180, L = 34;
    var cx = 0, cy = rm;
    var d = new T.Vector3(-Math.sin(a), Math.cos(a), 0);
    var p0 = new T.Vector3(cx, cy, 0).addScaledVector(d, -L), p1 = new T.Vector3(cx, cy, 0).addScaledVector(d, L);
    ligne = M3D.cylindre(1.3, 2 * L, "acc", { metal: 0, rugo: 0.5 });
    ligne.position.set(cx, cy, 0);
    ligne.quaternion.setFromUnitVectors(new T.Vector3(0, 1, 0), d);
    grp.add(ligne);
    // plan radial (référence) en pointillé : un fin trait gris
    var ref = M3D.cylindre(0.7, 2 * L, "acierFonce", { metal: 0, rugo: 0.6 }); ref.position.set(cx, cy, 0); grp.add(ref);
    var groupe = c.al <= 45 ? "roulement radial" : "butée";
    V.info("<strong>" + c.nom + "</strong> : α ≈ " + c.al + "° " + (c.al <= 45 ? "≤" : ">") + " 45°, donc " + groupe + "." + (k === 1 ? " Angle donné pour l'exemple." : ""));
  }
  M3D.choix(V, CAS.map(function (c) { return c.nom; }), function (i) { k = i; construire(); });
  V.etiquette("α", function () { var a = CAS[k].al * Math.PI / 180; return new T.Vector3(-Math.sin(a / 2) * 22, 32.5 + Math.cos(a / 2) * 22, 0); }, { dx: 26, dy: -26, couleur: M3D.ACC, taille: 22 });
  V.etiquette("axe", new T.Vector3(-74, 0, 0), { dx: 0, dy: 24, couleur: M3D.COUL.encre, taille: 16 });
})();
