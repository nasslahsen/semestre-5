(function () {
  "use strict";
  var R = RM, C = EMB.C;
  /* ---------- HTTP qui redemande ou WebSocket ouverte ---------- */
  (function () {
    var f = R.figure("fig-websocket", {
      largeur: 960, hauteur: 440, titre: "HTTP ou WebSocket",
      essai: "<strong>Essaie</strong> : passe de HTTP à WebSocket. <strong>Observe</strong> : en HTTP, le client redemande sans cesse ; avec une WebSocket, une seule connexion, et le serveur pousse l'alarme dès qu'elle arrive."
    });
    var g = EMB.el("g", null, f.svg), mode = "http", b = R.boutons(f.reglages), btns = {};
    btns.http = R.bouton(b, "HTTP", function () { mode = "http"; dessiner(); });
    btns.ws = R.bouton(b, "WebSocket", function () { mode = "ws"; dessiner(); });
    var zone = R.h("p", null, "", f.direct);
    function dessiner() {
      EMB.vider(g);
      Object.keys(btns).forEach(function (k) { btns[k].classList.toggle("actif", k === mode); });
      EMB.bloc(g, 20, 70, 150, 70, "Navigateur", { taille: 19 }); EMB.bloc(g, 20, 300, 150, 70, "Serveur", { taille: 19 });
      EMB.fleche(g, [190, 220], [940, 220], { ep: 2.5, coul: C.gris }); EMB.texte(g, "temps", [900, 248], { taille: 16, coul: C.doux });
      var alarme = 720;
      EMB.el("polygon", { points: [[alarme, 384], [alarme - 12, 410], [alarme + 12, 410]].join(" "), fill: C.ko }, g);
      EMB.texte(g, "alarme", [alarme, 428], { taille: 17, coul: C.ko });
      if (mode === "http") {
        for (var k = 0; k < 9; k++) {
          var x = 220 + k * 85;
          EMB.fleche(g, [x, 145], [x + 20, 295], { coul: C.acc, ep: 2.5 });
          EMB.fleche(g, [x + 32, 295], [x + 52, 145], { coul: k === 6 ? C.ko : C.gris, ep: k === 6 ? 4 : 2.5 });
        }
        zone.textContent = "HTTP : 9 requêtes « du nouveau ? », 8 réponses « rien ». L'alarme n'est vue qu'à la requête suivante.";
      } else {
        EMB.fleche(g, [220, 145], [240, 295], { coul: C.acc, ep: 3 }); EMB.texte(g, "upgrade", [290, 180], { taille: 17, coul: C.acc });
        EMB.el("rect", { x: 250, y: 200, width: 680, height: 40, rx: 12, fill: C.clair, stroke: C.acc, "stroke-width": 3 }, g);
        EMB.texte(g, "une seule connexion TCP, ouverte", [540, 220], { taille: 18, coul: C.acc, halo: false });
        EMB.fleche(g, [alarme, 300], [alarme, 145], { coul: C.ko, ep: 5 });
        zone.textContent = "WebSocket : une connexion, puis le serveur pousse l'alarme tout de suite. Bidirectionnel, full duplex.";
      }
    }
    dessiner();
  })();
})();
