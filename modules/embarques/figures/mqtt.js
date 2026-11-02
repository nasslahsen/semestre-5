(function () {
  "use strict";
  var R = RM, C = EMB.C;
  /* ---------- Topics et jokers : qui reçoit le message ? ---------- */
  (function () {
    var f = R.figure("fig-mqtt", {
      largeur: 960, hauteur: 520, titre: "Topics et jokers MQTT",
      essai: "<strong>Essaie</strong> : publie chaque message. <strong>Observe</strong> : le broker compare le topic au filtre de chaque abonné ; + remplace exactement un niveau, # tous les niveaux suivants."
    });
    var g = EMB.el("g", null, f.svg), choix = 0, b = R.boutons(f.reglages), btns = [];
    var T = ["home/groundfloor/kitchen/temperature", "home/groundfloor/living/humidity", "home/firstfloor/bedroom/temperature", "office/conferenceroom/luminance"];
    var S = [{ id: "a", nom: "Écran 1", filtre: "home/groundfloor/+/temperature" }, { id: "b", nom: "Écran 2", filtre: "home/groundfloor/#" },
      { id: "c", nom: "Écran 3", filtre: "home/+/+/temperature" }, { id: "d", nom: "Écran 4", filtre: "office/#" }];
    T.forEach(function (t, i) { btns.push(R.bouton(b, t.split("/").slice(-2).join("/"), function () { choix = i; dessiner(); })); });
    var zone = R.h("p", null, "", f.direct);
    function dessiner() {
      EMB.vider(g);
      btns.forEach(function (x, i) { x.classList.toggle("actif", i === choix); });
      var recoit = {}; S.forEach(function (s) { if (EMB.correspond(s.filtre, T[choix])) recoit[s.id] = true; });
      EMB.pubsub(g, { x: 10, y: 70, l: 940, h: 430, taille: 20, lp: 0.16, ls: 0.4, pub: [{ id: "p", nom: "Capteur", topic: "" }], sub: S, recoit: recoit, publie: "p" });
      EMB.texte(g, T[choix], [480, 34], { taille: 21, mono: true, coul: C.acc });
      var n = Object.keys(recoit).length;
      zone.textContent = "Topic publié : " + T[choix] + ". " + (n ? n + " abonné" + (n > 1 ? "s reçoivent" : " reçoit") + " le message." : "Aucun abonné ne le reçoit.");
    }
    dessiner();
  })();
  /* ---------- QoS 0, 1, 2 : échanges entre émetteur et broker ---------- */
  (function () {
    var f = R.figure("fig-qos", {
      largeur: 960, hauteur: 440, titre: "Qualité de service",
      essai: "<strong>Essaie</strong> : passe de QoS 0 à QoS 2. <strong>Observe</strong> : plus de messages échangés, donc plus de bande passante, pour plus de garantie."
    });
    var g = EMB.el("g", null, f.svg), q = 0, b = R.boutons(f.reglages), btns = [];
    var E2 = [[["PUBLISH", 1]], [["PUBLISH", 1], ["PUBACK", -1]], [["PUBLISH", 1], ["PUBREC", -1], ["PUBREL", 1], ["PUBCOMP", -1]]];
    var TXT = ["QoS 0, at most once : envoyé une fois, sans confirmation. Le plus rapide ; un message peut se perdre.",
      "QoS 1, at least once : confirmation obligatoire ; le message arrive, mais peut arriver en double.",
      "QoS 2, exactly once : échange en quatre étapes, les doublons sont contrôlés. Le plus sûr, le plus coûteux."];
    [0, 1, 2].forEach(function (k) { btns.push(R.bouton(b, "QoS " + k, function () { q = k; dessiner(); })); });
    var zone = R.h("p", null, "", f.direct);
    function dessiner() {
      EMB.vider(g);
      btns.forEach(function (x, i) { x.classList.toggle("actif", i === q); });
      EMB.bloc(g, 60, 20, 200, 60, "Émetteur", { taille: 21 }); EMB.bloc(g, 700, 20, 200, 60, "Broker", { taille: 21 });
      EMB.el("line", { x1: 160, y1: 80, x2: 160, y2: 420, stroke: C.gris, "stroke-width": 3 }, g); EMB.el("line", { x1: 800, y1: 80, x2: 800, y2: 420, stroke: C.gris, "stroke-width": 3 }, g);
      E2[q].forEach(function (e, i) {
        var y = 130 + i * 74, a = e[1] > 0 ? [165, y] : [795, y + 30], z = e[1] > 0 ? [795, y + 30] : [165, y];
        EMB.fleche(g, a, z, { coul: e[1] > 0 ? C.acc : C.ok, ep: 4 });
        EMB.texte(g, e[0], [480, y + 2], { taille: 19, mono: true, coul: e[1] > 0 ? C.acc : C.ok });
      });
      EMB.texte(g, "noms des paquets : norme MQTT (complément)", [480, 420], { taille: 16, coul: C.doux });
      zone.textContent = TXT[q];
    }
    dessiner();
  })();
})();
