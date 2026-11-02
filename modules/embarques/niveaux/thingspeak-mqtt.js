/* Niveau : ThingSpeak en MQTT (labs MQTTX et ESP32 du cours). */
NIVEAU({
  id: "thingspeak-mqtt",
  init: function (fig) {
    var g = E.s("g", null, fig.svg), C = EMB.C, n = { topic: "channels/2285477/...", msg: "", sens: 1 };
    n.dessin = function () {
      EMB.vider(g);
      EMB.bloc(g, 20, 220, 180, 130, "ESP32", { taille: 23 });
      EMB.bloc(g, 450, 200, 210, 170, "ThingSpeak\nmqtt3.thingspeak.com", { taille: 17, rx: 40 });
      if (n.sens > 0) EMB.fleche(g, [205, 285], [445, 285], { coul: C.acc, ep: 5 }); else EMB.fleche(g, [445, 285], [205, 285], { coul: C.ok, ep: 5 });
      EMB.texte(g, n.topic, [340, 120], { taille: 18, mono: true, coul: n.sens > 0 ? C.acc : C.ok });
      EMB.texte(g, n.msg, [340, 450], { taille: n.msg.length > 34 ? 15 : 19, mono: true });
    };
    n.dessin();
    return n;
  },
  etapes: [
    { nom: "Un seul champ", jouer: function (j, n) {
      j.titre("Le channel 2285477 : publie seulement la SpO2, rangée dans field2. Construis le topic.");
      var z = j.zone("", '<div style="display:flex;gap:4px;align-items:center;font:600 18px JetBrains Mono,monospace;flex-wrap:wrap">channels/2285477/<span class="trou" data-attendu="p"></span>/<span class="trou" data-attendu="f"></span>/<span class="trou" data-attendu="d"></span></div>');
      j.jetons({
        trous: [].slice.call(z.querySelectorAll(".trou")),
        jetons: [{ id: "d", html: "field2" }, { id: "s", html: "subscribe" }, { id: "f", html: "fields" }, { id: "p", html: "publish" }],
        aide: "On publie. Pour un seul champ, le cours ajoute fields, puis le nom du champ.",
        ok: function () {
          n.topic = "channels/2285477/publish/fields/field2"; n.msg = "97"; n.dessin();
          j.bravo("channels/2285477/publish/fields/field2, message 97.");
          j.expliquer("<p>Pour un seul champ, le field est dans le topic et le message ne contient que la valeur.</p>");
          j.suite();
        }
      });
    } },
    { nom: "Tous les champs", jouer: function (j, n) {
      n.topic = "channels/2285477/publish"; n.msg = "?"; n.dessin();
      j.titre("Sur channels/2285477/publish, quel message écrit HR = 72 dans field1 et SpO2 = 97 dans field2 ?");
      j.choix([
        { html: "<code>{\"field1\":72,\"field2\":97}</code>", aide: "Le JSON, c'est ce que ThingSpeak renvoie aux abonnés. Pour publier, le cours utilise des paires nom=valeur." },
        { html: "<code>field1=72;field2=97</code>", aide: "Regarde le séparateur du cours : field1=45&field2=60&status=MQTTPUBLISH." },
        { html: "<code>field1=72&amp;field2=97</code>", juste: true }
      ], { colonnes: 1, ok: function () {
        n.msg = "field1=72&field2=97"; n.dessin();
        j.bravo("Des paires nom=valeur séparées par &.");
        j.expliquer("<p>Dans le programme du lab : <code>mqttPublish(channelID, String(\"field1=\") + String(HR) + String(\"&field2=\") + String(SPO2))</code>.</p>");
        j.suite();
      } });
    } },
    { nom: "Les identifiants", jouer: function (j, n) {
      j.titre("L'ESP32 affiche « MQTT connection failed, rc = 4 » : identifiants refusés. Que faut-il passer à mqttClient.connect(...) ?");
      j.choix([
        { html: "La Write API Key du channel", aide: "Les API Keys servent en HTTP. En MQTT, l'accès passe par un device MQTT." },
        { html: "Le nom et le mot de passe du Wi-Fi", aide: "Ils servent à WiFi.begin, pour rejoindre le réseau. connect() parle au broker." },
        { html: "Le Client ID, le Username et le Password du device MQTT", juste: true }
      ], { colonnes: 1, ok: function () {
        j.bravo("connect(clientID, mqttUserName, mqttPass).");
        j.expliquer("<p>Le device MQTT (Devices, MQTT, Add a new device) porte les identifiants et la liste des channels autorisés, avec publish et subscribe. Jusqu'à 100 devices par utilisateur, 10 channels par device.</p>");
        j.suite();
      } });
    } },
    { nom: "Ce qui revient", jouer: function (j, n) {
      n.sens = -1; n.topic = "channels/2285477/subscribe"; n.msg = '{"channel_id":2285477,"entry_id":16,"field1":"60",...}'; n.dessin();
      j.fig.astuce("L'abonnement renvoie l'entrée.");
      j.titre("Abonné à channels/2285477/subscribe, l'ESP32 reçoit l'entrée en JSON. Pourquoi le programme fait-il mqttClient.setBufferSize(2048) ?");
      j.choix([
        { html: "Pour pouvoir publier 2048 valeurs", aide: "La taille du tampon concerne les messages qui transitent, pas un nombre de valeurs." },
        { html: "Le JSON reçu est long : avec le tampon par défaut, il déborde et le callback n'est jamais appelé", juste: true },
        { html: "Pour accélérer la connexion Wi-Fi", aide: "Le tampon appartient au client MQTT, pas au Wi-Fi." }
      ], { colonnes: 1, ok: function () {
        j.bravo("Un tampon assez grand pour toute l'entrée.");
        j.expliquer("<p>Le commentaire du cours : <i>a buffer overflow of the message buffer will result in your callback not being invoked</i>.</p>");
        j.suite();
      } });
    } }
  ]
});
