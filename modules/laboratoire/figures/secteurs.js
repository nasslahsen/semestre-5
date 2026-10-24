/* Figure : plan simplifié d'un laboratoire, ses secteurs et le trajet d'un échantillon. */
(function () {
  "use strict";
  var R = RM, A = LABO, C = A.C;

  var f = R.figure("fig-secteurs", {
    largeur: 960, hauteur: 540, titre: "Plan simplifié d'un laboratoire et trajet d'un échantillon",
    essai: "<strong>Essaie</strong> : touche un secteur, puis « Suivre un tube ». <strong>Observe</strong> : le tube traverse les secteurs dans un ordre fixe ; le reste est placé autour, sans couper ce trajet."
  });
  var g = A.s("g", null, f.svg), gt = A.s("g", null, f.svg), sel = null, anim = null;
  var S = [
    { id: "rec", t: "Unité de réception", x: 20, y: 150, w: 220, h: 170, flux: true, txt: "Guichet équipé : station pneumatique pour les échantillons internes, guichet pour les échantillons externes." },
    { id: "pre", t: "Aire pré-analytique", x: 260, y: 150, w: 260, h: 170, flux: true, txt: "Prélèvement, tri, distribution, préparation (centrifugation, aliquotage) et conservation ; de là, les spécimens partent vers les aires d'analyse." },
    { id: "ana", t: "Aire analytique", x: 540, y: 150, w: 400, h: 170, flux: true, txt: "Toutes les spécialités : biochimie, hématologie, microbiologie, pathologie, génétique, diagnostic moléculaire." },
    { id: "loc", t: "Locaux spécialisés", x: 20, y: 350, w: 220, h: 170, txt: "Salle d'autopsie, morgue, aire de prélèvement." },
    { id: "ran", t: "Rangements et dépôts", x: 260, y: 350, w: 260, h: 170, txt: "Près des postes pour réduire les déplacements ; attention au bruit, à la chaleur, à l'humidité et aux congélateurs à azote." },
    { id: "adm", t: "Aires clinico-administratives", x: 540, y: 350, w: 190, h: 170, txt: "En retrait : on y va sans traverser les laboratoires." },
    { id: "per", t: "Soutien au personnel", x: 750, y: 350, w: 190, h: 170, txt: "Salle de repos, vestiaires, toilettes, espaces pour les EPI propres et souillés." }
  ];
  var b = R.boutons(f.reglages);
  R.bouton(b, "Suivre un tube", function () { lancer(); });
  var zone = R.h("div", null, "", f.direct);

  function dessiner(u) {
    A.vider(g);
    A.texte(g, "Entrée des échantillons", [130, 40], { taille: 18, coul: C.doux, gras: 600 });
    A.fleche(g, [130, 62], [130, 140], { coul: C.gris, ep: 4 });
    A.chemin(g, [[240, 120], [700, 120]], { coul: C.trait, ep: 8 });
    A.texte(g, "flux de l'échantillon", [470, 100], { taille: 17, coul: C.doux, gras: 500 });
    S.forEach(function (s) {
      var on = sel === s.id;
      A.boite(g, s.x, s.y, s.w, s.h, { fond: on ? C.jeuPale : s.flux ? "#fff" : C.fond, bord: on ? C.jeu : s.flux ? C.encre : C.trait, ep: on ? 4 : 2.5, rx: 14, titre: s.t, taille: 19 });
      A.cible(g, s.x, s.y, s.w, s.h, function () { sel = s.id; dessiner(); zone.innerHTML = "<strong>" + s.t + "</strong> : " + s.txt; });
    });
  }
  // tube animé le long des trois secteurs du flux (animation bornée, jamais en boucle)
  function lancer() {
    if (anim) anim.arreter();
    var pts = [[130, 250], [390, 250], [740, 250]];
    anim = A.animer(3600, function (u) {
      A.vider(gt);
      var k = Math.min(1.999, u * 2), i = Math.floor(k), t = k - i, p = [pts[i][0] + (pts[i + 1][0] - pts[i][0]) * t, pts[i][1]];
      sel = ["rec", "pre", "ana"][u < 0.33 ? 0 : u < 0.8 ? 1 : 2];
      dessiner();
      A.tube(gt, p[0] - 13, p[1] - 10, { bouchon: "sec", w: 26, h: 80, couches: [{ h: 0.7, coul: C.sang }] });
    }, function () {
      zone.innerHTML = "Réception, aire pré-analytique, aire analytique : toujours dans cet ordre.";
    });
  }
  dessiner();
  zone.innerHTML = "Touche un secteur pour voir son rôle.";
})();
