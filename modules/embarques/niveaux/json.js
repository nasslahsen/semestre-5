/* Niveau : le format JSON (document JSON Format, et lab ArduinoJson). */
NIVEAU({
  id: "json",
  init: function (fig) {
    var g = E.s("g", null, fig.svg), C = EMB.C, n = { sel: null, titre: "" };
    n.L = ["{", '  "sensor": "gps",', '  "time": 1351824120,', '  "data": [', "    48.756080,", "    2.302038", "  ]", "}"];
    n.dessin = function () {
      EMB.vider(g);
      if (n.titre) EMB.texte(g, n.titre, [340, 40], { taille: 20, coul: C.doux });
      var m = {}; if (n.sel !== null) m[n.sel] = n.coul || C.clair;
      EMB.lignesCode(g, n.L, { x: 30, y: 80, l: 620, pas: Math.min(52, 440 / n.L.length), taille: n.taille || 24, marques: m });
    };
    n.dessin();
    return n;
  },
  etapes: [
    { nom: "Lire la latitude", jouer: function (j, n) {
      j.titre("Ce document vient du GPS. Quelle expression ArduinoJson lit la latitude, 48.756080 ?");
      j.choix([
        { html: "<code>doc[\"data\"][1]</code>", aide: "Les positions d'un tableau commencent à 0 : [1] est la deuxième valeur." },
        { html: "<code>doc[\"data\"][0]</code>", juste: true },
        { html: "<code>doc[\"latitude\"]</code>", aide: "Il n'y a pas de clé latitude dans le document : la valeur est rangée dans le tableau data." }
      ], { colonnes: 1, ok: function () {
        n.sel = 4; n.coul = EMB.C.clair; n.dessin();
        j.bravo("data, puis la position 0.");
        j.expliquer("<p>On atteint une valeur d'objet par son nom (<code>doc[\"time\"]</code>) et une valeur de tableau par sa position, à partir de 0. C'est le JSON parser example du lab.</p>");
        j.suite();
      } });
    } },
    { nom: "Le JSON valide", jouer: function (j, n) {
      n.sel = null; n.titre = "Trois messages du power meter"; n.L = ['A  {"V": 220, "I": 20}', "B  {V: 220, I: 20}", 'C  {"V": 220; "I": 20}']; n.taille = 23; n.dessin();
      j.titre("Un seul de ces trois messages est du JSON valide. Lequel ?");
      j.choix([
        { html: "B", aide: "En JSON, les noms sont des chaînes : entre guillemets doubles." },
        { html: "C", aide: "Regarde ce qui sépare les deux paires : en JSON, c'est une virgule." },
        { html: "A", juste: true }
      ], { colonnes: 3, ok: function () {
        n.sel = 0; n.coul = "#d9f2e6"; n.dessin();
        j.bravo("Noms entre guillemets, paires séparées par des virgules.");
        j.expliquer("<p>Les accolades contiennent les objets ; chaque nom est suivi de <code>:</code> et les paires sont séparées par des virgules. Les chaînes sont entre guillemets doubles.</p>");
        j.suite();
      } });
    } },
    { nom: "Construire", jouer: function (j, n) {
      n.titre = ""; n.sel = null; n.L = ['Sensor = ? "id": "01",', '  "values" ? 20, 21, 22.5 ?', "}"]; n.dessin();
      j.titre("Complète le message du cours : un capteur d'id 01 et ses trois valeurs.");
      var z = j.zone("", '<div style="display:flex;gap:6px;align-items:center;font:600 19px JetBrains Mono,monospace;flex-wrap:wrap"><span class="trou" data-attendu="a"></span>"id": "01", "values"<span class="trou" data-attendu="d"></span> <span class="trou" data-attendu="c"></span>20, 21, 22.5<span class="trou" data-attendu="f"></span>}</div>');
      j.jetons({
        trous: [].slice.call(z.querySelectorAll(".trou")),
        jetons: [{ id: "c", html: "[" }, { id: "d", html: ":" }, { id: "f", html: "]" }, { id: "a", html: "{" }, { id: "p", html: "(" }],
        aide: "Un objet s'ouvre par une accolade ; un nom est suivi de deux-points ; une liste de valeurs va entre crochets.",
        ok: function () {
          n.L = ['{"id": "01",', ' "values": [20, 21, 22.5]}']; n.dessin();
          j.bravo("{\"id\": \"01\", \"values\": [20, 21, 22.5]}");
          j.expliquer("<p>Deux structures : la collection de paires nom/valeur (l'objet, entre accolades) et la liste ordonnée de valeurs (le tableau, entre crochets).</p>");
          j.suite();
        }
      });
    } },
    { nom: "Le type", jouer: function (j, n) {
      n.L = ['{"type":"Temperature",', ' "Value":35,', ' "position":"Zone1"}']; n.titre = "const obj = JSON.parse(txt);"; n.taille = 24; n.dessin();
      j.titre("Après JSON.parse, de quel type est obj.Value ?");
      j.choix([
        { html: "Number", juste: true },
        { html: "String", aide: "Une chaîne serait entre guillemets doubles. Regarde 35." },
        { html: "Array", aide: "Un tableau serait entre crochets." }
      ], { colonnes: 3, ok: function () {
        n.sel = 1; n.coul = EMB.C.clair; n.dessin();
        j.bravo("35, sans guillemets : un Number.");
        j.expliquer("<p>Types JSON : Number (flottant double précision), String (entre guillemets doubles), Boolean, Array, Object, null. La page de l'exemple du cours affiche <code>obj.type + \", \" + obj.position</code>, soit Temperature, Zone1.</p>");
        j.suite();
      } });
    } }
  ]
});
