/* Niveau : ThingSpeak, channels, écriture et lecture (labs ThingSpeak du cours). */
NIVEAU({
  id: "thingspeak",
  init: function (fig) {
    var g = E.s("g", null, fig.svg), C = EMB.C, n = { champ: null, valeurs: [] };
    n.dessin = function () {
      EMB.vider(g);
      EMB.texte(g, "Channel, 8 fields", [340, 40], { taille: 21 });
      for (var k = 1; k <= 8; k++) {
        var x = 20 + ((k - 1) % 4) * 162, y = 80 + Math.floor((k - 1) / 4) * 90;
        EMB.bloc(g, x, y, 150, 70, "field" + k, { taille: 19, mono: true, actif: n.champ === k });
      }
      n.valeurs.forEach(function (v, i) {
        var x = 60 + i * 50, h = v * 1.8;
        EMB.el("rect", { x: x, y: 520 - h, width: 34, height: h, rx: 4, fill: C.acc }, g);
      });
      if (n.valeurs.length) EMB.texte(g, "field1 : val1 à chaque écriture", [340, 560], { taille: 17, coul: C.doux });
    };
    n.dessin();
    return n;
  },
  etapes: [
    { nom: "L'URL d'écriture", jouer: function (j, n) {
      n.champ = 2; n.dessin();
      j.titre("Depuis le navigateur, écris 37.5 dans le field2 du channel. Complète l'URL.");
      var z = j.zone("", '<div style="display:flex;gap:4px;align-items:center;font:600 17px JetBrains Mono,monospace;flex-wrap:wrap">api.thingspeak.com/<span class="trou" data-attendu="u"></span>?api_key=<span class="trou" data-attendu="w"></span>&amp;<span class="trou" data-attendu="f"></span>=37.5</div>');
      j.jetons({
        trous: [].slice.call(z.querySelectorAll(".trou")),
        jetons: [{ id: "r", html: "Read API Key" }, { id: "f", html: "field2" }, { id: "u", html: "update" }, { id: "w", html: "Write API Key" }],
        aide: "On écrit : c'est la clé d'écriture. L'adresse d'écriture est /update, et le nom du champ précède la valeur.",
        ok: function () {
          j.bravo("GET .../update?api_key=Write API Key&field2=37.5");
          j.expliquer("<p>Une écriture ThingSpeak est une simple requête HTTP GET. La Write API Key sert à écrire, la Read API Key à lire un channel privé.</p>");
          j.suite();
        }
      });
    } },
    { nom: "Le code 200", jouer: function (j, n) {
      n.champ = null; n.dessin();
      j.titre("Sur l'ESP32, x = writeFields(…) renvoie 200. Que signifie ce 200 ?");
      j.choix([
        { html: "200 valeurs ont été écrites", aide: "Le programme n'écrit que deux fields. 200 est un code de réponse HTTP." },
        { html: "L'écriture a réussi : « Channel update successful. »", juste: true },
        { html: "Le channel a 200 entrées", aide: "Le nombre d'entrées n'est pas renvoyé par writeFields. Regarde le test if (x == 200) du cours." }
      ], { colonnes: 1, ok: function () {
        j.bravo("200 : réussi. Sinon, le programme affiche le code d'erreur.");
        j.expliquer("<p>Le programme du cours : <code>if (x == 200) Serial.println(\"Channel update successful.\"); else Serial.println(\"Problem updating channel. HTTP error code \" + String(x));</code>. En lecture, <code>getLastReadStatus()</code> renvoie aussi 200 si tout va bien.</p>");
        j.suite();
      } });
    } },
    { nom: "Prédire val1", jouer: function (j, n) {
      n.valeurs = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 0]; n.dessin();
      j.fig.astuce("Les 11 premières écritures de val1.");
      j.titre("Dans le lab, val1 augmente de 10 à chaque écriture et repasse à 0 dès qu'il dépasse 100 (if (val1 > 100) val1 = 0). Quelle valeur à la 12e écriture ?");
      j.nombre({ avant: "\\text{val1} =", cases: [{ attendu: 10, tol: 0 }], ligne: true,
        aide: function () { return "À la 11e écriture, val1 serait passé à 110, donc il est remis à 0. Ajoute 10."; },
        ok: function () {
          n.valeurs.push(10); n.dessin();
          j.bravo("10 : la dent de scie recommence.");
          j.expliquer("<p>Sur ThingSpeak, Field 1 Chart trace cette dent de scie : 10, 20, …, 100, 0, 10…</p>");
          j.suite();
        } });
    } },
    { nom: "Réagir", jouer: function (j, n) {
      n.valeurs = []; n.dessin();
      j.titre("Une analyse MATLAB doit calculer l'état dès qu'une nouvelle mesure EPF arrive dans le channel. Quelle Test Frequency choisir dans React ?");
      j.choix([
        { html: "On Data Insertion", juste: true },
        { html: "Every 10 minutes", aide: "Le test ne serait fait qu'une fois toutes les 10 minutes, à l'heure pile : la mesure attendrait." },
        { html: "Every 60 minutes", aide: "Une fois par heure : bien trop tard pour réagir à chaque mesure." }
      ], { colonnes: 1, ok: function () {
        j.bravo("À chaque insertion de donnée.");
        j.expliquer("<p>React teste une condition (String, Status, Numeric, Geo Location, No Data Check) et lance une action (MATLAB Analysis, ThingHTTP, ThingTweet). On Data Insertion teste à chaque nouvelle donnée.</p>");
        j.suite();
      } });
    } }
  ]
});
