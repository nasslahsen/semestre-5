(function () {
  "use strict";
  var R = RM, C = EMB.C;
  /* ---------- Quatre modèles de communication (cours, diapositives 24 à 27) ---------- */
  (function () {
    var f = R.figure("fig-modeles", {
      largeur: 960, hauteur: 460, titre: "Modèles de communication",
      essai: "<strong>Essaie</strong> : passe d'un modèle à l'autre. <strong>Observe</strong> : qui parle en premier, qui connaît qui, et ce qui se trouve au milieu (rien, un broker, une file)."
    });
    var g = EMB.el("g", null, f.svg), choix = "rr", b = R.boutons(f.reglages), btns = {};
    var M = [["rr", "Request-Response"], ["ps", "Publish-Subscribe"], ["pp", "Push-Pull"], ["ep", "Exclusive Pair"]];
    var TXT = {
      rr: "Le client envoie une requête ; le serveur décide comment répondre, va chercher les données, prépare la réponse et l'envoie.",
      ps: "Le publisher envoie sur un topic géré par le broker, sans connaître les consumers ; le broker transmet à tous les abonnés du topic.",
      pp: "Les producteurs poussent dans une file ; les consommateurs viennent tirer. La file découple les deux côtés et sert de tampon.",
      ep: "Une connexion persistante, bidirectionnelle et full duplex : ouverte jusqu'à ce que le client la ferme ; chacun peut envoyer à tout moment."
    };
    M.forEach(function (m) { btns[m[0]] = R.bouton(b, m[1], function () { choix = m[0]; dessiner(); }); });
    var zone = R.h("p", null, "", f.direct);
    function dessiner() {
      EMB.vider(g);
      Object.keys(btns).forEach(function (k) { btns[k].classList.toggle("actif", k === choix); });
      if (choix === "rr" || choix === "ep") {
        EMB.bloc(g, 60, 150, 220, 150, "Client", { taille: 26 });
        EMB.bloc(g, 680, 150, 220, 150, "Serveur", { taille: 26 });
        if (choix === "rr") {
          EMB.fleche(g, [290, 195], [670, 195], { coul: C.acc, ep: 5 }); EMB.texte(g, "1. requête", [480, 170], { taille: 21, coul: C.acc });
          EMB.fleche(g, [670, 260], [290, 260], { coul: C.ok, ep: 5 }); EMB.texte(g, "2. réponse", [480, 290], { taille: 21, coul: C.ok });
        } else {
          EMB.el("rect", { x: 280, y: 190, width: 400, height: 70, fill: C.clair, stroke: C.acc, "stroke-width": 3 }, g);
          EMB.fleche(g, [300, 210], [660, 210], { coul: C.acc, ep: 4 }); EMB.fleche(g, [660, 240], [300, 240], { coul: C.ok, ep: 4 });
          EMB.texte(g, "connexion persistante (full duplex)", [480, 300], { taille: 21, coul: C.acc });
          EMB.texte(g, "ouverte jusqu'à ce que le client la ferme", [480, 340], { taille: 18, coul: C.doux });
        }
      } else if (choix === "ps") {
        EMB.pubsub(g, { x: 30, y: 40, l: 900, h: 380, taille: 20, nomBroker: "Broker",
          pub: [{ id: "a", nom: "Publisher 1", topic: "topic A" }, { id: "b", nom: "Publisher 2", topic: "topic B" }],
          sub: [{ id: "x", nom: "Consumer 1", filtre: "topic A" }, { id: "y", nom: "Consumer 2", filtre: "topic A" }, { id: "z", nom: "Consumer 3", filtre: "topic B" }],
          recoit: { x: true, y: true }, publie: "a" });
      } else {
        [0, 1].forEach(function (i) { EMB.bloc(g, 40, 110 + i * 150, 200, 100, "Producteur " + (i + 1), { taille: 20 }); EMB.fleche(g, [245, 160 + i * 150], [340, 230], { ep: 4, coul: C.acc }); });
        for (var k = 0; k < 6; k++) EMB.el("rect", { x: 350 + k * 45, y: 200, width: 40, height: 60, rx: 6, fill: k < 4 ? C.clair : "#fff", stroke: C.encre, "stroke-width": 2.5 }, g);
        EMB.texte(g, "file (queue)", [480, 300], { taille: 21 });
        [0, 1].forEach(function (i) { EMB.bloc(g, 720, 110 + i * 150, 200, 100, "Consommateur " + (i + 1), { taille: 19 }); EMB.fleche(g, [625, 230], [715, 160 + i * 150], { ep: 4, coul: C.ok }); });
        EMB.texte(g, "push", [290, 120], { taille: 20, coul: C.acc }); EMB.texte(g, "pull", [670, 120], { taille: 20, coul: C.ok });
      }
      zone.textContent = TXT[choix];
    }
    dessiner();
  })();
})();
