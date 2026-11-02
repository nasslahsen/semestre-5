/* Révision JSON et ThingSpeak : lire une entrée, écrire, publier, dans des situations nouvelles. */
NIVEAU({
  id: "revision-thingspeak",
  init: function (fig) {
    var g = E.s("g", null, fig.svg), C = EMB.C, n = { sel: null };
    n.L = ["{", '  "channel_id": 2285477,', '  "created_at": "2023-09-28T14:46:02Z",', '  "entry_id": 16,', '  "field1": "60",', '  "field2": "60",', '  "status": "MQTTPUBLISH"', "}"];
    n.dessin = function () {
      EMB.vider(g);
      EMB.texte(g, "Message reçu sur channels/2285477/subscribe", [340, 40], { taille: 18, coul: C.doux });
      var m = {}; if (n.sel !== null) m[n.sel] = C.clair;
      EMB.lignesCode(g, n.L, { x: 10, y: 80, l: 660, pas: 52, taille: 19, marques: m });
    };
    n.dessin();
    return n;
  },
  etapes: [
    { nom: "Lire l'entrée", jouer: function (j, n) {
      j.titre("Quel numéro porte cette entrée du channel ?");
      j.nombre({ avant: "\\text{entry\\_id} =", cases: [{ attendu: 16, tol: 0 }], ligne: true,
        aide: function () { return "Cherche la clé entry_id."; },
        ok: function () {
          n.sel = 3; n.dessin();
          j.bravo("Entrée 16.");
          j.expliquer("<p>ThingSpeak renvoie toute l'entrée : l'ID du channel, la date, le numéro de l'entrée, les fields et le statut.</p>");
          j.suite();
        } });
    } },
    { nom: "Le type", jouer: function (j, n) {
      n.sel = 4; n.dessin();
      j.titre("Dans ce message, de quel type JSON est la valeur de field1 ?");
      j.choix([
        { html: "Number", aide: "Regarde les guillemets autour de 60." },
        { html: "String", juste: true },
        { html: "Boolean", aide: "Un booléen vaut true ou false." }
      ], { colonnes: 3, ok: function () {
        j.bravo("\"60\" entre guillemets : une chaîne.");
        j.expliquer("<p>ThingSpeak renvoie les fields en chaînes. Pour calculer avec, il faut les convertir en nombre (en JavaScript, <code>Number(...)</code>, comme dans le dashboard du lab Node-RED).</p>");
        j.suite();
      } });
    } },
    { nom: "Écrire autrement", jouer: function (j, n) {
      n.sel = null; n.dessin();
      j.titre("Associe chaque façon d'écrire 60 dans field1 au protocole qu'elle utilise.");
      var z = j.zone("", '<div style="display:grid;grid-template-columns:1fr auto;gap:10px 14px;align-items:center;font-size:16px">' +
        '<span><code>GET .../update?api_key=…&amp;field1=60</code></span><span class="trou" data-attendu="h"></span>' +
        '<span>publier <code>field1=60</code> sur <code>channels/2285477/publish</code></span><span class="trou" data-attendu="m"></span></div>');
      j.jetons({
        trous: [].slice.call(z.querySelectorAll(".trou")),
        jetons: [{ id: "m", html: "MQTT" }, { id: "w", html: "WebSocket" }, { id: "h", html: "HTTP" }],
        aide: "Une URL avec une méthode GET, c'est du web classique. Un topic et un broker, c'est l'autre protocole des labs.",
        ok: function () {
          j.bravo("HTTP avec une API Key, MQTT avec un device.");
          j.expliquer("<p>En HTTP, la Write API Key est dans l'URL ; en MQTT, l'accès passe par les identifiants du device.</p>");
          j.suite();
        }
      });
    } },
    { nom: "Deux channels", jouer: function (j, n) {
      j.titre("Dans l'exemple React du cours, l'analyse MATLAB lit EPF = 90 dans counterAcquisition. Quel état écrit-elle dans counterState ? (EPF < 80 : 0 ; sinon EPF < 100 : 1 ; sinon 2)");
      j.nombre({ avant: "\\text{state} =", cases: [{ attendu: 1, tol: 0 }], ligne: true,
        aide: function () { return "90 est-il inférieur à 80 ? Puis à 100 ?"; },
        ok: function () {
          j.bravo("État 1, le voyant vert des résultats du cours.");
          j.expliquer("<p>Les trois écritures de test du cours, field5 = 70, 90 et 110, donnent les états 0, 1 et 2.</p>");
          j.suite();
        } });
    } }
  ]
});
