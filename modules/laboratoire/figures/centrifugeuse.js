/* Figure : les quatre types de rotors, vus en coupe, et où se dépose le culot. */
(function () {
  "use strict";
  var R = RM, A = LABO, C = A.C;

  var f = R.figure("fig-centrifugeuse", {
    largeur: 960, hauteur: 540, titre: "Types de rotors : position des tubes pendant la rotation",
    essai: "<strong>Essaie</strong> : choisis un rotor, puis lance la rotation. <strong>Observe</strong> : la force pousse toujours vers l'extérieur ; selon l'inclinaison du tube, le culot se forme au fond ou sur la paroi."
  });
  var g = A.s("g", null, f.svg), type = "fixe", tourne = false;
  var T = {
    fixe: { t: "Angle fixe", a: function () { return cu.v; }, d: "Tubes tenus à un angle fixe, 20 à 45° : usage courant, trajet raccourci, sédimentation plus rapide." },
    oscillant: { t: "Godets oscillants", a: function () { return tourne ? 90 : 0; }, d: "Au repos, les godets pendent ; en rotation, ils basculent à l'horizontale : résolution maximale des zones." },
    vertical: { t: "Tubes verticaux", a: function () { return 0; }, d: "Tubes parallèles à l'axe : les bandes se forment parallèlement à l'axe du tube ; temps de centrifugation court." },
    quasi: { t: "Quasi verticaux", a: function () { return 8; }, d: "Faible inclinaison : pour les gradients de densité quand certains éléments ne participent pas au gradient." }
  };
  var b = R.boutons(f.reglages), bts = {};
  Object.keys(T).forEach(function (k) { bts[k] = R.bouton(b, T[k].t, function () { type = k; dessiner(); }); });
  var b2 = R.boutons(f.reglages);
  var bt = R.bouton(b2, "Lancer la rotation", function () { tourne = !tourne; bt.textContent = tourne ? "Arrêter" : "Lancer la rotation"; dessiner(); });
  var cu = R.curseur(f.reglages, { nom: "Angle", min: 20, max: 45, pas: 1, val: 30, unite: "°", dec: 0 });
  cu.surChange(function () { dessiner(); });
  var zone = R.h("div", null, "", f.direct);
  // un tube en coupe : base au point p, incliné de a degrés par rapport à l'axe (la tête vers l'axe)
  function tubeCoupe(p, cote, a, culotParoi) {
    var rad = a * Math.PI / 180, L = 230, w = 62;
    var u = [cote * Math.sin(rad), -Math.cos(rad)];       // du fond vers le bouchon
    var nrm = [-u[1], u[0]];
    var fond = p, haut = [p[0] + u[0] * L, p[1] + u[1] * L];
    var pts = [[fond[0] + nrm[0] * w / 2, fond[1] + nrm[1] * w / 2], [haut[0] + nrm[0] * w / 2, haut[1] + nrm[1] * w / 2], [haut[0] - nrm[0] * w / 2, haut[1] - nrm[1] * w / 2], [fond[0] - nrm[0] * w / 2, fond[1] - nrm[1] * w / 2]];
    A.s("polygon", { points: pts.map(function (q) { return q.join(","); }).join(" "), fill: "#fff", stroke: C.encre, "stroke-width": 3 }, g);
    if (tourne) {
      // culot : au fond, ou le long de la paroi extérieure si le tube est vertical
      if (culotParoi) {
        var e = cote > 0 ? -1 : 1, x = fond[0] + e * (w / 2 - 6);
        A.s("rect", { x: Math.min(x, x - e * 12), y: haut[1] + 10, width: 12, height: L - 20, fill: C.sang }, g);
      } else A.s("circle", { cx: fond[0] - u[0] * 0 + u[0] * 14, cy: fond[1] + u[1] * 14, r: 20, fill: C.sang }, g);
    }
  }
  function dessiner() {
    A.vider(g);
    Object.keys(bts).forEach(function (k) { bts[k].classList.toggle("actif", k === type); });
    cu.input.disabled = type !== "fixe";
    var a = T[type].a();
    // axe et corps du rotor
    A.s("line", { x1: 480, y1: 40, x2: 480, y2: 470, stroke: C.gris, "stroke-width": 4, "stroke-dasharray": "12 8" }, g);
    A.texte(g, "axe de rotation", [480, 26], { taille: 18, coul: C.doux, gras: 600 });
    A.s("rect", { x: 430, y: 300, width: 100, height: 60, rx: 10, fill: C.fond, stroke: C.encre, "stroke-width": 3 }, g);
    var vert = type === "vertical" || type === "quasi";
    var base = type === "oscillant" ? (tourne ? [[190, 280], [770, 280]] : [[330, 450], [630, 450]]) : vert ? [[330, 450], [630, 450]] : [[250, 440], [710, 440]];
    tubeCoupe(base[0], 1, a, vert);
    tubeCoupe(base[1], -1, a, vert);
    if (tourne) {
      A.fleche(g, [240, 150], [120, 150], { coul: C.jeu, ep: 5 }); A.fleche(g, [720, 150], [840, 150], { coul: C.jeu, ep: 5 });
      A.texte(g, "force centrifuge", [180, 120], { taille: 18, coul: C.jeu, gras: 700 }); A.texte(g, "force centrifuge", [780, 120], { taille: 18, coul: C.jeu, gras: 700 });
    }
    A.texte(g, T[type].t + (type === "fixe" ? " : " + cu.v + "°" : ""), [480, 510], { taille: 24, gras: 800 });
    zone.innerHTML = "<strong>" + T[type].t + "</strong> : " + T[type].d;
  }
  dessiner();
})();
