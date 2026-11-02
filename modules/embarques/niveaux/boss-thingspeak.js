/* Défi JSON et ThingSpeak : l'oxymètre connecté, de la mesure au channel et retour. */
NIVEAU({
  id: "boss-thingspeak",
  init: function (fig) {
    var g = E.s("g", null, fig.svg), C = EMB.C, n = { L: ["Oxymètre au doigt : HR = 72, SpO2 = 97", "Channel « Oxymetre », ID 1234567", "field1 : HR    field2 : SPO2"] };
    n.dessin = function () {
      EMB.vider(g);
      EMB.lignesCode(g, n.L, { x: 10, y: 300 - n.L.length * 33, l: 660, pas: 66, taille: n.taille || 21, marques: n.marques });
    };
    n.dessin();
    return n;
  },
  etapes: [
    { nom: "Le message JSON", jouer: function (j, n) {
      j.titre("Pour un tableau de bord Node-RED, l'ESP32 publie la mesure en JSON. Construis le message.");
      var z = j.zone("", '<div style="display:flex;gap:6px;align-items:center;font:600 19px JetBrains Mono,monospace;flex-wrap:wrap">{<span class="trou" data-attendu="h"></span>: 72<span class="trou" data-attendu="v"></span> "SpO2": <span class="trou" data-attendu="n"></span>}</div>');
      j.jetons({
        trous: [].slice.call(z.querySelectorAll(".trou")),
        jetons: [{ id: "n", html: "97" }, { id: "x", html: "HR" }, { id: "v", html: "," }, { id: "h", html: "\"HR\"" }, { id: "s", html: ";" }, { id: "q", html: "\"97\"" }],
        aide: "Un nom est toujours entre guillemets doubles ; les paires sont séparées par une virgule ; pour pouvoir calculer, la valeur reste un nombre.",
        ok: function () {
          n.L = ['{"HR": 72, "SpO2": 97}']; n.taille = 24; n.dessin();
          j.bravo("{\"HR\": 72, \"SpO2\": 97}");
          j.expliquer("<p>Les deux valeurs sont des Number : Node-RED pourra les tracer sans conversion.</p>");
          j.suite();
        }
      });
    } },
    { nom: "Vers ThingSpeak", jouer: function (j, n) {
      n.L = ["Oxymètre au doigt : HR = 72, SpO2 = 97", "Channel « Oxymetre », ID 1234567", "field1 : HR    field2 : SPO2"]; n.taille = 20; n.dessin();
      j.titre("Le même ESP32 envoie aussi la mesure à ThingSpeak en MQTT, en une seule publication. Quel couple topic, message ?");
      j.choix([
        { html: "<code>channels/1234567/subscribe</code> avec <code>field1=72&amp;field2=97</code>", aide: "subscribe sert à recevoir les entrées, pas à en écrire." },
        { html: "<code>channels/1234567/publish/fields/field1</code> avec <code>72&amp;97</code>", aide: "Ce topic n'écrit qu'un seul champ, et le message n'y contient que sa valeur." },
        { html: "<code>channels/1234567/publish</code> avec <code>field1=72&amp;field2=97</code>", juste: true }
      ], { colonnes: 1, ok: function () {
        j.bravo("Un topic publish, des paires field=valeur.");
        j.expliquer("<p>Pour tous les champs d'un coup : <code>channels/&lt;ID&gt;/publish</code> et <code>field1=…&amp;field2=…</code>.</p>");
        j.suite();
      } });
    } },
    { nom: "Le rythme", jouer: function (j, n) {
      j.titre("Dans le programme MQTT du cours, updateInterval = 15 (secondes). Combien de publications en une heure ?");
      j.nombre({ avant: "\\text{publications} =", cases: [{ attendu: 240, tol: 0 }], ligne: true,
        aide: function () { return "Une heure fait 3600 s ; divise par l'intervalle."; },
        ok: function () {
          j.bravo("240 entrées par heure.");
          j.expliquer("<p>\\(3600 / 15 = 240\\). Le test du programme : <code>if (abs(long(millis()) - lastPublishMillis) > updateInterval*1000)</code>.</p>");
          j.suite();
        } });
    } },
    { nom: "Relire", jouer: function (j, n) {
      n.L = ['{"channel_id":1234567,', ' "entry_id":42,', ' "field1":"72",', ' "field2":"97", ...}']; n.taille = 22; n.marques = { 3: EMB.C.clair }; n.dessin();
      j.titre("L'afficheur du chevet reçoit cette entrée et la lit avec ArduinoJson (deserializeJson(doc, …)). Quelle ligne récupère la SpO2 ?");
      j.choix([
        { html: "<code>const char* spo2 = doc[\"field2\"];</code>", juste: true },
        { html: "<code>const char* spo2 = doc[\"SpO2\"];</code>", aide: "Le nom de la mesure n'est pas une clé du message : ThingSpeak range les valeurs dans field1, field2…" },
        { html: "<code>const char* spo2 = doc[1];</code>", aide: "L'entrée est un objet, pas un tableau : on lit par le nom de la clé." }
      ], { colonnes: 1, ok: function () {
        j.bravo("doc[\"field2\"], la chaîne \"97\".");
        j.expliquer("<p>Comme dans le JSON parser example du lab : <code>const char* sensor = doc[\"sensor\"];</code>. Ici la valeur est une chaîne, puisque ThingSpeak renvoie les fields entre guillemets.</p>");
        j.suite();
      } });
    } }
  ]
});
