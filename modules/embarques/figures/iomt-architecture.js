(function () {
  "use strict";
  var R = RM, C = EMB.C;
  /* ---------- Système de surveillance ECG : capteurs, cloud, interface ; les trois composants ---------- */
  (function () {
    var f = R.figure("fig-architecture", {
      largeur: 960, hauteur: 380, titre: "Architecture d'un système IoMT",
      essai: "<strong>Essaie</strong> : touche chaque composant. <strong>Observe</strong> : la donnée part du capteur, voyage par la connectivité, puis est rangée et analysée dans le cloud avant d'arriver au médecin ; la sécurité entoure tout le chemin."
    });
    var g = EMB.el("g", null, f.svg), choix = "devices", b = R.boutons(f.reglages), btns = {};
    var COMP = [["devices", "Devices"], ["connect", "Connectivity"], ["data", "Data"], ["secu", "Sécurité"]];
    var TXT = {
      devices: "Devices and sensors : traqueurs portés, suivi à distance, diagnostic. Ici, le réseau de capteurs ECG (ECG sensing network).",
      connect: "Connectivity : Wi-Fi, Bluetooth, réseaux cellulaires, protocoles médicaux. Elle transporte les mesures en sécurité jusqu'au cloud.",
      data: "Data management : le cloud de l'IoT stocke, traite et analyse (bases de données, apprentissage automatique) ; l'interface graphique montre le résultat au médecin.",
      secu: "Sécurité et confidentialité : chiffrement, authentification, contrôle d'accès, sur tout le chemin de la donnée."
    };
    COMP.forEach(function (c) { btns[c[0]] = R.bouton(b, c[1], function () { choix = c[0]; dessiner(); }); });
    var zone = R.h("p", null, "", f.direct);
    function dessiner() {
      EMB.vider(g);
      Object.keys(btns).forEach(function (k) { btns[k].classList.toggle("actif", k === choix); });
      if (choix === "secu") EMB.el("rect", { x: 14, y: 70, width: 932, height: 290, rx: 26, fill: "none", stroke: C.acc, "stroke-width": 5, "stroke-dasharray": "14 10" }, g);
      EMB.bloc(g, 40, 120, 230, 170, "ECG sensing\nnetwork\n(capteurs)", { taille: 22, actif: choix === "devices" });
      EMB.bloc(g, 365, 120, 230, 170, "Internet-of-Things\nCloud", { taille: 22, actif: choix === "data", rx: 60 });
      EMB.bloc(g, 690, 120, 230, 170, "Graphical\nUser Interface\n(médecin)", { taille: 22, actif: choix === "data" });
      var cc = choix === "connect" ? C.acc : C.encre;
      EMB.fleche(g, [275, 205], [360, 205], { coul: cc, ep: choix === "connect" ? 7 : 4 });
      EMB.fleche(g, [600, 205], [685, 205], { coul: C.encre, ep: 4 });
      if (choix === "connect") EMB.texte(g, "Wi-Fi, Bluetooth,\ncellulaire", [318, 335], { taille: 19, coul: C.acc });
      EMB.texte(g, "Système de surveillance ECG basé sur l'IoT", [480, 40], { taille: 22 });
      zone.textContent = TXT[choix];
    }
    dessiner();
  })();
})();
