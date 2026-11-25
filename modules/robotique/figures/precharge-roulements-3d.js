(function () {
  "use strict";
  if (!window.M3D) return;
  var T = M3D.T;

  /* ---------- Précharge de deux roulements à contact oblique en 3D ---------- */
  var V = M3D.figure("fig-precharge-3d", {
    titre: "Deux roulements à contact oblique serrés par un écrou",
    essai: "<strong>Essaie</strong> : serre l'écrou petit à petit. " +
      "<strong>Observe</strong> : d'abord le décalage entre les bagues intérieures se referme (le jeu disparaît), puis les lignes de contact s'allument : les billes sont préchargées. Décalage très exagéré.",
    vue: { distance: 340, az: 0.3, el: 0.25 }
  });
  if (!V) return;
  var G = new T.Group(); G.rotation.z = -Math.PI / 2; V.ajouter(G, true);
  var cut = Math.PI, dec = 8, B = 23;
  var ar = M3D.arbre([[-100, -B - 2, 24], [-B - 2, 110, 20]]); M3D.contours(ar); G.add(ar);
  V.piece(ar, { nom: "arbre", role: "porte les deux bagues intérieures" });
  var log = M3D.revolution([[38, -B - 14], [66, -B - 14], [66, B + 4], [45, B + 4], [45, -B], [38, -B]], "alu", { coupe: cut });
  log.rotation.y = -Math.PI / 2; M3D.contours(log); G.add(log);
  // deux roulements à contact oblique, montés en opposition (les lignes de contact s'écartent)
  function rlt(y, retourne) {
    var r = M3D.roulement({ type: "oblique", d: 40, D: 90, B: B, coupe: cut });
    r.rotation.y = -Math.PI / 2; var h = new T.Group(); h.add(r); h.position.y = y; if (retourne) h.rotation.x = Math.PI;
    M3D.contours(r); h.parts = r.parts; return h;
  }
  var r1 = rlt(-B / 2, false), r2 = rlt(B / 2, true);
  G.add(r1); G.add(r2);
  V.piece(r1, { nom: "roulement à contact oblique", role: "se prête bien aux montages préchargés" });
  V.piece(r2, { nom: "roulement à contact oblique", role: "monté en opposition avec le premier" });
  var ec = M3D.revolution([[20, 0], [30, 0], [30, 9], [20, 9]], "acierFonce", { coupe: cut, seg: 6 });
  ec.rotation.y = -Math.PI / 2; M3D.contours(ec); G.add(ec);
  V.piece(ec, { nom: "écrou", role: "pousse la bague intérieure de droite vers la gauche" });
  var lignes = new T.Group(); G.add(lignes);
  var S = RM.curseur(V.f.reglages, { nom: "Serrage", min: 0, max: 1, pas: 0.01, val: 0, dec: 0 });
  S.input.parentNode.querySelector("output").style.display = "none";
  var jauges = RM.h("div", { "class": "jauges" }, "", V.f.direct);
  function jauge(nom) {
    var l = RM.h("div", { style: "display:grid;grid-template-columns:110px 1fr;align-items:center;gap:10px;margin:4px 0;font-weight:600;font-size:16px" }, "", jauges);
    RM.h("span", null, nom, l);
    var piste = RM.h("div", { style: "height:12px;border-radius:6px;background:#e3e6ee;overflow:hidden" }, "", l);
    return RM.h("div", { style: "height:100%;width:0;border-radius:6px;background:" + M3D.ACC }, "", piste);
  }
  var jJeu = jauge("jeu"), jRig = jauge("rigidité"), jFro = jauge("frottement");
  function maj() {
    var u = S.v, ferme = Math.min(1, u / 0.45), p = Math.max(0, (u - 0.45) / 0.55);
    // bague intérieure de droite, billes et cage : poussées par l'écrou de dec × (1 − fermeture)
    var off = dec * (1 - ferme);
    r2.parts.bagueInt.position.y = -off; r2.parts.billes.position.y = -off / 2; r2.parts.cage.position.y = -off / 2;
    ec.position.y = B + 1 + off;
    while (lignes.children.length) lignes.remove(lignes.children[0]);
    if (p > 0) {
      var al = 0.6, rm = 32.5, L = 22;
      [[-B / 2, 1], [B / 2, -1]].forEach(function (c) {
        for (var k = 0; k < 2; k++) {
          var x = k ? -rm : rm, s = c[1] * (k ? -1 : 1);
          var d = new T.Vector3(Math.cos(al) * (x > 0 ? 1 : -1), s * Math.sin(al) * (x > 0 ? 1 : -1) * -1, 0).normalize();
          var l = M3D.cylindre(0.8 + 1.8 * p, 2 * L, "acc", { metal: 0, rugo: 0.5 });
          l.position.set(x, c[0], 0); l.quaternion.setFromUnitVectors(new T.Vector3(0, 1, 0), d);
          lignes.add(l);
        }
      });
    }
    jJeu.style.width = (100 * (1 - ferme)) + "%";
    jRig.style.width = (25 + 75 * p) + "%";
    jFro.style.width = (15 + 85 * p * p) + "%";
    V.info(p > 0.8 ? "Précharge forte : plus raide, mais frottement et échauffement montent ; trop forte, elle réduit la durée de vie." :
      p > 0 ? "Précharge : le jeu est éliminé, l'axe est plus raide." : ferme > 0.99 ? "Le décalage est rattrapé : plus de jeu, pas encore de précharge." : "Il reste un décalage entre les bagues intérieures : du jeu.");
    V.rendre();
  }
  S.surChange(maj);
  V.etiquette("écrou", function () { return ec.localToWorld(new T.Vector3(0, 4, -30)); }, { dx: 50, dy: 50, taille: 17 });
  maj();
})();
