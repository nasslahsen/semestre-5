(function () {
  "use strict";
  if (!window.M3D) return;
  var T = M3D.T;

  /* ---------- Moteur, réducteur et bras en 3D : la vitesse s'échange contre du couple ---------- */
  var V = M3D.figure("fig-reducteur-3d", {
    titre: "Moteur, réducteur et épaule en 3D",
    essai: "<strong>Essaie</strong> : règle n et i, puis « Lancer 2 s » (mouvement ralenti 25 fois). " +
      "<strong>Observe</strong> : le repère du moteur tourne vite, le bras lentement ; le couple de sortie est environ η i fois celui du moteur.",
    vue: { distance: 620, az: 0.55, el: 0.3, cible: [-10, 60, 0] }
  });
  if (!V) return;
  var Ce = 0.32, eta = 0.8; // exemple de la page
  var G = new T.Group(); G.rotation.z = -Math.PI / 2; V.ajouter(G, true);
  var mot = new T.Group(); mot.position.y = -120; G.add(mot);
  mot.add(M3D.cylindre(32, 90, "noir", { metal: 0.3, rugo: 0.5 }));
  var fl = M3D.boite(72, 8, 72, "noir"); fl.position.y = 49; mot.add(fl);
  V.piece(mot, { nom: "moteur", role: "tourne vite avec un petit couple" });
  var arbre = new T.Group(); arbre.position.y = -60; G.add(arbre);
  arbre.add(M3D.cylindre(6, 34, "acier"));
  var rep = M3D.boite(4, 30, 26, "acc"); rep.position.set(0, -2, 13); arbre.add(rep);
  var red = M3D.revolution([[0, -26], [46, -26], [52, -16], [52, 16], [46, 26], [0, 26]], "alu", {});
  red.position.y = 0; G.add(red);
  V.piece(red, { nom: "réducteur", role: "rapport i = ωe / ωs, rendement η : il échange de la vitesse contre du couple" });
  var sortie = new T.Group(); sortie.position.y = 40; G.add(sortie);
  sortie.add(M3D.cylindre(24, 28, "acc", { metal: 0.25 }));
  var seg = M3D.boite(30, 20, 130, "acc", { metal: 0.25 }); seg.position.z = 70; sortie.add(seg);
  var masse = M3D.boite(44, 44, 44, "acierFonce"); masse.position.z = 140; sortie.add(masse);
  V.piece(sortie, { nom: "bras (sortie)", role: "tourne i fois moins vite, avec environ η i fois plus de couple" });
  M3D.contours(G);
  var n = RM.curseur(V.f.reglages, { nom: "n", min: 500, max: 3000, pas: 100, val: 3000, unite: " tr/min" });
  var i = RM.curseur(V.f.reglages, { nom: "i", min: 5, max: 100, pas: 5, val: 50 });
  var b = RM.boutons(V.f.reglages), thm = 0;
  RM.bouton(b, "Lancer 2 s", function () {
    var t0 = thm, tours = n.v / 60 * 2 / 25;
    V.animer(2000, function (u) { thm = t0 + 2 * Math.PI * tours * u; placer(); });
  });
  var out = RM.h("div", null, "", V.f.direct);
  function placer() { arbre.rotation.y = thm; sortie.rotation.y = -1.25 + thm / i.v; V.rendre(); }
  function maj() {
    var we = 2 * Math.PI * n.v / 60, ws = we / i.v, Cs = eta * i.v * Ce;
    RM.rendre(out, "\\omega_e = " + RM.fmt(we, 1) + "\\ \\text{rad/s} \\quad \\omega_s = " + RM.fmt(ws, 2) + "\\ \\text{rad/s} \\quad C_s \\simeq 0{,}8 \\times " + i.v + " \\times 0{,}32 = " + RM.fmt(Cs, 1) + "\\ \\text{N}\\cdot\\text{m}");
    placer();
  }
  n.surChange(maj); i.surChange(maj);
  V.etiquette("moteur", function () { return mot.localToWorld(new T.Vector3(0, 0, 0)); }, { dx: -20, dy: -90, taille: 17 });
  V.etiquette("réducteur", function () { return red.localToWorld(new T.Vector3(0, 0, 0)); }, { dx: 10, dy: 100, taille: 17 });
  V.etiquette("bras", function () { return masse.getWorldPosition(new T.Vector3()); }, { dx: 50, dy: -50, taille: 17 });
  maj();
})();
