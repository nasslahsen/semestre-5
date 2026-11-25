/* Figure : paquet original, IPsec ESP en mode transport et en mode tunnel (schéma du cours). */
(function () {
  "use strict";
  var R = RM, A = SIS, C = A.C;
  var f = R.figure("fig-ipsec", {
    largeur: 960, hauteur: 400, titre: "Modes VPN IPsec (ESP)",
    essai: "<strong>Essaie</strong> : choisis un mode. <strong>Observe</strong> : la partie chiffrée (rouge) et la partie authentifiée (jaune) ; en mode tunnel, même l'en-tête IP original est caché."
  });
  var g = A.s("g", null, f.svg), mode = 0;
  var B = { ipo: ["En-tête IP", "original"], d: ["Données", ""], eh: ["En-tête", "ESP"], eq: ["En-queue", "ESP"], au: ["Auth.", "ESP"], ipn: ["En-tête IP", "ESP (nouveau)"] };
  var M = [
    { nom: "Paquet original", seq: ["ipo", "d"], chif: null, auth: null, t: "Le paquet de départ : en-tête IP original et données, en clair." },
    { nom: "Mode transport", seq: ["ipo", "eh", "d", "eq", "au"], chif: [2, 3], auth: [1, 3], t: "<strong>Transport</strong> : l'en-tête IP original reste devant et lisible ; données et en-queue ESP sont chiffrées ; l'authentification couvre de l'en-tête ESP à l'en-queue." },
    { nom: "Mode tunnel", seq: ["ipn", "eh", "ipo", "d", "eq", "au"], chif: [2, 4], auth: [1, 4], t: "<strong>Tunnel</strong> : un nouvel en-tête IP est ajouté ; tout le paquet original (en-tête IP compris) est chiffré. Les adresses réelles sont cachées." }
  ];
  function dessiner() {
    A.vider(g);
    var m = M[mode], w = 140, x0 = 480 - m.seq.length * w / 2;
    if (m.chif) { var a = x0 + m.chif[0] * w, b = x0 + (m.chif[1] + 1) * w; A.s("rect", { x: a, y: 90, width: b - a, height: 34, rx: 8, fill: C.koPale, stroke: C.ko, "stroke-width": 2.5 }, g); A.texte(g, "trafic chiffré", [(a + b) / 2, 107], { taille: 16, gras: 700, coul: C.ko, halo: false }); }
    if (m.auth) { var c = x0 + m.auth[0] * w, d = x0 + (m.auth[1] + 1) * w; A.s("rect", { x: c, y: 266, width: d - c, height: 34, rx: 8, fill: "#fff4d6", stroke: "#b8860b", "stroke-width": 2.5 }, g); A.texte(g, "trafic authentifié", [(c + d) / 2, 283], { taille: 16, gras: 700, coul: "#7a5a00", halo: false }); }
    m.seq.forEach(function (k, i) {
      var fonce = k === "ipo" || k === "d";
      A.boite(g, x0 + i * w + 4, 140, w - 8, 110, { titre: B[k][0], sous: B[k][1] || null, fond: fonce ? C.acc : C.accPale, bord: C.acc, coul: fonce ? "#fff" : C.encre, coulSous: fonce ? "#fff" : C.doux, taille: 18, rx: 6 });
    });
    A.texte(g, m.nom, [480, 40], { taille: 24, gras: 800 });
    f.direct.innerHTML = m.t;
  }
  var bt = R.boutons(f.reglages);
  M.forEach(function (m, i) { R.bouton(bt, m.nom, function () { mode = i; dessiner(); }); });
  dessiner();
})();
