(function () {
  "use strict";
  if (!window.M3D) return;
  var T = M3D.T;

  /* ---------- Ressort de compression ou de traction en 3D : F = kx ---------- */
  var V = M3D.figure("fig-ressort-3d", {
    titre: "Ressort de compression ou de traction en 3D",
    essai: "<strong>Essaie</strong> : choisis le type de ressort, puis augmente l'effort F. " +
      "<strong>Observe</strong> : avec k = 1 N/mm, chaque newton raccourcit (ou allonge) le ressort d'un millimètre : x = F / k.",
    vue: { distance: 330, az: 0.5, el: 0.25, cible: [0, 55, 0] }
  });
  if (!V) return;
  var k = 1, L0 = 100, G = new T.Group(); V.ajouter(G, true);
  var type = 0, res = null;
  var socle = M3D.cylindre(30, 6, "acierFonce"); socle.position.y = -3; G.add(socle);
  var plateau = M3D.cylindre(30, 6, "alu"); G.add(plateau);
  var crochet = M3D.cylindre(3, 30, "acierFonce"); G.add(crochet);
  M3D.contours(socle); M3D.contours(plateau);
  var fl = new T.Group(); G.add(fl);
  var F = RM.curseur(V.f.reglages, { nom: "F", min: 0, max: 40, pas: 1, val: 12, unite: " N" });
  var out = RM.h("div", null, "", V.f.direct);
  function maj() {
    var x = F.v / k, L = type === 0 ? L0 - x : 70 + x;
    if (res) G.remove(res);
    res = type === 0 ? M3D.ressort({ Dm: 36, dfil: 3.2, n: 7, L: L }) : M3D.ressort({ Dm: 26, dfil: 2.4, n: 14, L: L - 30, crochets: true });
    if (type === 1) res.position.y = 15;
    G.add(res);
    V.pieces = []; V.piece(res, { nom: type === 0 ? "ressort de compression" : "ressort de traction", role: "il emmagasine de l'énergie et restitue un effort en reprenant sa forme" });
    plateau.visible = type === 0; crochet.visible = type === 1;
    plateau.position.y = L + 3; crochet.position.y = L + 15 + 15;
    socle.position.y = type === 0 ? -3 : -3;
    while (fl.children.length) fl.remove(fl.children[0]);
    if (F.v > 0) {
      var lf = 10 + F.v * 1.2;
      if (type === 0) fl.add(M3D.fleche([0, L + 8 + lf, 0], [0, L + 7, 0], "rouge", { r: 1.6 }));
      else fl.add(M3D.fleche([0, L + 46, 0], [0, L + 46 + lf, 0], "rouge", { r: 1.6 }));
    }
    RM.rendre(out, "x = \\frac{F}{k} = \\frac{" + F.v + "}{1} = " + x + "\\ \\text{mm} \\qquad L = " + (type === 0 ? "100 - " + x : "70 + " + x) + " = " + L + "\\ \\text{mm}");
    V.rendre();
  }
  M3D.choix(V, ["Compression", "Traction"], function (i) { type = i; maj(); });
  F.surChange(maj);
  V.etiquette("F", function () { return F.v > 0 ? new T.Vector3(0, type === 0 ? L0 - F.v + 18 + F.v * 1.2 : 70 + F.v + 50 + F.v * 1.2, 0) : null; }, { dx: 24, dy: 0, couleur: M3D.COUL.rouge, taille: 20 });
})();
