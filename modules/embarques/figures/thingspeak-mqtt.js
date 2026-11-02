(function () {
  "use strict";
  var R = RM, C = EMB.C;
  /* ---------- Les topics d'un channel ThingSpeak (Device Model du cours) ---------- */
  (function () {
    var f = R.figure("fig-ts-mqtt", {
      largeur: 960, hauteur: 460, titre: "Topics MQTT de ThingSpeak",
      essai: "<strong>Essaie</strong> : publie tous les champs, un seul champ, puis abonne-toi. <strong>Observe</strong> : le topic dit au broker quoi faire ; l'abonné reçoit toute l'entrée en JSON."
    });
    var g = EMB.el("g", null, f.svg), choix = "tous", b = R.boutons(f.reglages), btns = {};
    var M = {
      tous: ["channels/2285477/publish", "field1=45&field2=60&status=MQTTPUBLISH", 1, "Publier tous les champs d'un coup : field1, field2 et le statut, séparés par &."],
      un: ["channels/2285477/publish/fields/field1", "89", 1, "Publier un seul champ : le field est dans le topic, le message ne contient que la valeur."],
      sub: ["channels/2285477/subscribe", "{\"channel_id\":2285477,\"entry_id\":16,\"field1\":\"60\",...}", -1, "S'abonner : à chaque nouvelle entrée, le broker envoie toute l'entrée en JSON."]
    };
    [["tous", "publish"], ["un", "un field"], ["sub", "subscribe"]].forEach(function (c) { btns[c[0]] = R.bouton(b, c[1], function () { choix = c[0]; dessiner(); }); });
    var zone = R.h("p", null, "", f.direct);
    function dessiner() {
      EMB.vider(g);
      Object.keys(btns).forEach(function (k) { btns[k].classList.toggle("actif", k === choix); });
      var m = M[choix];
      EMB.bloc(g, 30, 160, 200, 150, "ESP32\n(client MQTT)", { taille: 21 });
      EMB.bloc(g, 690, 140, 240, 190, "ThingSpeak\nmqtt3.thingspeak.com\n:1883", { taille: 19, rx: 40 });
      if (m[2] > 0) EMB.fleche(g, [240, 235], [680, 235], { coul: C.acc, ep: 5 }); else EMB.fleche(g, [680, 235], [240, 235], { coul: C.ok, ep: 5 });
      EMB.texte(g, m[0], [460, 200], { taille: 19, mono: true, coul: m[2] > 0 ? C.acc : C.ok });
      EMB.texte(g, m[1], [480, 400], { taille: m[1].length > 40 ? 16 : 20, mono: true });
      EMB.texte(g, "message", [480, 365], { taille: 16, coul: C.doux });
      EMB.texte(g, "Channel ID du cours : 2285477", [480, 40], { taille: 18, coul: C.doux });
      zone.textContent = m[3];
    }
    dessiner();
  })();
})();
