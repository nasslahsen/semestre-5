/* Figure : un automate de chimie clinique vu de dessus ; un test suit les unités l'une après l'autre. */
(function () {
  "use strict";
  var R = RM, A = LABO, C = A.C;

  var f = R.figure("fig-automates-biochimie", {
    largeur: 960, hauteur: 540, titre: "Un test dans un automate de chimie clinique",
    essai: "<strong>Essaie</strong> : avance pas à pas. <strong>Observe</strong> : chaque geste du dosage manuel est confié à une unité de l'automate."
  });
  var g = A.s("g", null, f.svg);
  var U = {
    ASP: { t: "Échantillons (ASP)", c: [140, 150], r: 100 },
    RCU: { t: "Réactifs (RCU)", c: [140, 410], r: 100 },
    REA: { t: "Réaction, 37 °C", c: [560, 280], r: 150 }
  };
  var E = [
    { k: "ASP", d: "Le carrousel d'échantillons amène le tube à la position d'aspiration." },
    { k: "SPP", d: "La pompe d'échantillonnage aspire un volume précis d'échantillon et le dépose dans une cuve." },
    { k: "RPP", d: "La pompe de réactifs prélève le réactif, conservé au froid dans le carrousel de réactifs." },
    { k: "MIX", d: "L'unité d'agitation homogénéise échantillon et réactifs." },
    { k: "REA", d: "Le carrousel de réaction maintient les cuves à 37 °C pendant la réaction." },
    { k: "PHO", d: "Le photomètre lit l'absorbance, avec des filtres de 340 à 620 nm." },
    { k: "WU", d: "L'unité de lavage nettoie la cuve et vérifie sa propreté optique." }
  ];
  var zone = R.h("div", null, "", f.direct);
  function carrousel(u, on, n, coul) {
    A.s("circle", { cx: u.c[0], cy: u.c[1], r: u.r, fill: on ? C.jeuPale : C.fond, stroke: on ? C.jeu : C.encre, "stroke-width": on ? 4.5 : 3 }, g);
    for (var i = 0; i < n; i++) {
      var t = i * 2 * Math.PI / n, p = [u.c[0] + (u.r - 22) * Math.cos(t), u.c[1] + (u.r - 22) * Math.sin(t)];
      A.s("circle", { cx: p[0], cy: p[1], r: 11, fill: coul, stroke: C.encre, "stroke-width": 2 }, g);
    }
    A.texte(g, u.t, [u.c[0], u.c[1]], { taille: 18, gras: 800, largeur: u.r * 1.4 });
  }
  function poste(x, y, t, on, w) {
    w = w || 110;
    A.boite(g, x - w / 2, y - 32, w, 64, { fond: on ? C.jeu : "#fff", bord: on ? C.jeu : C.encre, ep: 3, rx: 12, titre: t, taille: 20, coul: on ? "#fff" : C.encre });
  }
  function dessiner(k) {
    A.vider(g);
    var cle = k ? E[k - 1].k : null;
    carrousel(U.ASP, cle === "ASP", 10, C.sang);
    carrousel(U.RCU, cle === "RCU" || cle === "RPP", 8, C.froidPale);
    carrousel(U.REA, cle === "REA" || cle === "PHO", 18, "#fff");
    // trajets des pompes
    A.chemin(g, [[240, 150], [330, 150], [430, 210]], { coul: cle === "SPP" ? C.jeu : C.trait, ep: 5 });
    A.chemin(g, [[240, 410], [330, 410], [430, 350]], { coul: cle === "RPP" ? C.jeu : C.trait, ep: 5 });
    poste(330, 110, "SPP", cle === "SPP");
    poste(330, 460, "RPP", cle === "RPP");
    poste(560, 60, "MIX", cle === "MIX");
    poste(820, 160, "Photomètre", cle === "PHO", 150);
    poste(800, 420, "WU", cle === "WU");
    zone.innerHTML = k ? E[k - 1].d : "Avance pour suivre un test, du tube au lavage de la cuve.";
  }
  var e = R.etapes(f.reglages, 7, ["", "ASP", "SPP", "RPP", "MIX", "37 °C", "lecture", "lavage"], dessiner);
  e.aller(0);
})();
