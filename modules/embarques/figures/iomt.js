(function () {
  "use strict";
  var R = RM, C = EMB.C;
  /* ---------- Les trois couches : cloud, fog, edge (schéma du cours) ---------- */
  (function () {
    var f = R.figure("fig-couches", {
      largeur: 960, hauteur: 520, titre: "Cloud, fog et edge",
      essai: "<strong>Essaie</strong> : touche Edge, Fog puis Cloud. <strong>Observe</strong> : plus on monte, plus on s'éloigne du patient : les calculs deviennent plus globaux, mais la réponse plus lente."
    });
    var g = EMB.el("g", null, f.svg), choix = "edge", b = R.boutons(f.reglages), btns = {};
    var TXT = {
      edge: "Edge computing : traitement en temps réel d'un gros volume de données, sur place (systèmes embarqués, passerelles, PC industriels, petit stockage local). Réponse la plus rapide.",
      fog: "Fog computing : réseau local, analyse et réduction des données, réponse de contrôle, virtualisation et standardisation (fog nodes, serveurs).",
      cloud: "Cloud computing : big data, logique métier, entrepôt de données (business analytics, intelligence). Le plus loin des capteurs, le plus lent."
    };
    [["edge", "Edge"], ["fog", "Fog"], ["cloud", "Cloud"]].forEach(function (c) { btns[c[0]] = R.bouton(b, c[1], function () { choix = c[0]; dessiner(); }); });
    var zone = R.h("p", null, "", f.direct);
    function dessiner() {
      EMB.vider(g);
      Object.keys(btns).forEach(function (k) { btns[k].classList.toggle("actif", k === choix); });
      EMB.couches(g, [120, 40, 620, 430], { sel: choix, vitesse: true, taille: 24,
        noms: ["Cloud : big data, analyses", "Fog : réseau local, réduction", "Edge : temps réel, passerelles", "Capteurs et contrôleurs (origine des données)"] });
      zone.textContent = TXT[choix];
    }
    dessiner();
  })();
})();
