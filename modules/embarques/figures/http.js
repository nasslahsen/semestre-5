(function () {
  "use strict";
  var R = RM, C = EMB.C;
  /* ---------- Une requête HTTP : méthode, URL, réponse ---------- */
  (function () {
    var f = R.figure("fig-http", {
      largeur: 960, hauteur: 420, titre: "Méthodes HTTP",
      essai: "<strong>Essaie</strong> : choisis une méthode. <strong>Observe</strong> : la requête part toujours du client ; seul le verbe change ce que le serveur fait de la ressource."
    });
    var g = EMB.el("g", null, f.svg), choix = "GET", b = R.boutons(f.reglages), btns = {};
    var M = {
      GET: ["GET /patients/12/tension", "200 OK : 128/82 mmHg", "demander une ressource"],
      POST: ["POST /patients/12/tension  {131/85}", "201 Created", "soumettre une ressource"],
      PUT: ["PUT /patients/12/tension/7  {130/84}", "200 OK : remplacée", "remplacer une ressource"],
      DELETE: ["DELETE /patients/12/tension/7", "200 OK : supprimée", "supprimer une ressource"],
      HEAD: ["HEAD /patients/12/tension", "200 OK (en-têtes seuls)", "comme GET, sans le contenu"]
    };
    Object.keys(M).forEach(function (k) { btns[k] = R.bouton(b, k, function () { choix = k; dessiner(); }); });
    var zone = R.h("p", null, "", f.direct);
    function dessiner() {
      EMB.vider(g);
      Object.keys(btns).forEach(function (k) { btns[k].classList.toggle("actif", k === choix); });
      EMB.bloc(g, 30, 130, 190, 160, "Client\n(appli, ESP32)", { taille: 21 });
      EMB.bloc(g, 740, 130, 190, 160, "Serveur", { taille: 23 });
      EMB.fleche(g, [225, 175], [735, 175], { coul: C.acc, ep: 5 });
      EMB.fleche(g, [735, 250], [225, 250], { coul: C.ok, ep: 5 });
      EMB.texte(g, M[choix][0], [480, 140], { taille: 20, mono: true, coul: C.acc });
      EMB.texte(g, M[choix][1], [480, 290], { taille: 20, mono: true, coul: C.ok });
      EMB.texte(g, "Exemple ajouté : une API de suivi de la tension", [480, 380], { taille: 17, coul: C.doux });
      zone.textContent = choix + " : " + M[choix][2] + ".";
    }
    dessiner();
  })();
  /* ---------- Le modèle OSI (diapositive 23) ---------- */
  (function () {
    var f = R.figure("fig-osi", {
      largeur: 960, hauteur: 500, titre: "Modèle OSI",
      essai: "<strong>Essaie</strong> : touche une couche. <strong>Observe</strong> : chaque couche a son unité de données ; HTTP et MQTT vivent tout en haut, dans la couche Application."
    });
    var g = EMB.el("g", null, f.svg), choix = 0;
    var L = [["Application", "Network Process to Application", "Data"], ["Presentation", "Data Representation and Encryption", "Data"], ["Session", "Interhost Communication", "Data"],
      ["Transport", "End-to-End Connections and Reliability", "Segments"], ["Network", "Path Determination and IP (Logical Addressing)", "Packets"],
      ["Data Link", "MAC and LLC (Physical addressing)", "Frames"], ["Physical", "Media, Signal, and Binary Transmission", "Bits"]];
    var zone = R.h("p", null, "", f.direct), zones = {};
    function dessiner() {
      EMB.vider(g);
      L.forEach(function (c, i) {
        var y = 20 + i * 66, on = i === choix;
        EMB.bloc(g, 220, y, 170, 56, c[2], { taille: 20, actif: on });
        EMB.bloc(g, 410, y, 520, 56, c[0], { taille: 21, actif: on, dy: -9 });
        EMB.texte(g, c[1], [670, y + 40], { taille: 16, coul: C.doux, halo: false });
        zones[i] = [220, y, 710, 56];
      });
      EMB.texte(g, "Host\nlayers", [110, 130], { taille: 20, coul: C.acc }); EMB.texte(g, "Media\nlayers", [110, 370], { taille: 20, coul: C.doux });
      EMB.el("line", { x1: 180, y1: 20, x2: 180, y2: 274, stroke: C.acc, "stroke-width": 4 }, g); EMB.el("line", { x1: 180, y1: 284, x2: 180, y2: 476, stroke: C.doux, "stroke-width": 4 }, g);
      zone.textContent = "Couche " + (7 - choix) + " : " + L[choix][0] + ", unité de données : " + L[choix][2] + "." + (choix === 0 ? " HTTP et MQTT sont ici." : "");
    }
    EMB.toucher(f.svg, function () { return zones; }, function (k) { choix = +k; dessiner(); });
    dessiner();
  })();
})();
