/* Révision du chapitre IoMT : couches, composants, architecture de gestion, technologies, dans des situations nouvelles. */
NIVEAU({
  id: "revision-iomt",
  init: function (fig) {
    var g = E.s("g", null, fig.svg), C = EMB.C, n = { sel: null, liens: [] };
    var B = [["patch", "Patch ECG", 30, 250], ["tel", "Smartphone", 200, 250], ["fog", "Serveur\ndu service", 370, 250], ["cloud", "Cloud", 540, 250]];
    n.dessin = function () {
      EMB.vider(g);
      EMB.texte(g, "Un patient suivi à domicile", [340, 120], { taille: 22 });
      B.forEach(function (b, i) {
        EMB.bloc(g, b[2], b[3], 120, 100, b[1], { taille: 18, actif: n.sel === b[0], rx: b[0] === "cloud" ? 40 : 12 });
        if (i < 3) EMB.fleche(g, [b[2] + 122, b[3] + 50], [b[2] + 168, b[3] + 50], { ep: 3.5, coul: n.liens[i] ? C.acc : C.encre });
        if (n.liens[i]) EMB.texte(g, n.liens[i], [b[2] + 145, b[3] + 130], { taille: 17, coul: C.acc });
      });
    };
    n.dessin();
    return n;
  },
  etapes: [
    { nom: "Remettre en ordre", jouer: function (j, n) {
      j.titre("Range les couches dans l'ordre du chemin de la donnée, du patient vers l'analyse globale.");
      var z = j.zone("", '<div style="display:flex;gap:10px;align-items:center;font-size:18px;flex-wrap:wrap">capteurs → <span class="trou" data-attendu="e"></span> → <span class="trou" data-attendu="f"></span> → <span class="trou" data-attendu="c"></span></div>');
      j.jetons({
        trous: [].slice.call(z.querySelectorAll(".trou")),
        jetons: [{ id: "c", html: "cloud" }, { id: "e", html: "edge" }, { id: "f", html: "fog" }],
        aide: "La couche la plus rapide est la plus proche des capteurs ; la plus globale est la plus loin.",
        ok: function () {
          j.bravo("Capteurs, edge, fog, cloud.");
          j.expliquer("<p>Ici, le smartphone qui sert de passerelle est à l'edge, le serveur du service au fog, et le cloud garde l'historique et fait les analyses globales.</p>");
          j.suite();
        }
      });
    } },
    { nom: "Le composant", jouer: function (j, n) {
      n.liens = ["Bluetooth", "4G", ""]; n.dessin();
      j.fig.astuce("Bluetooth, puis 4G.");
      j.titre("Le Bluetooth entre le patch et le smartphone, puis la 4G jusqu'au serveur : à quel composant de l'architecture IoMT appartiennent-ils ?");
      j.choix([
        { html: "Devices and sensors", aide: "Les dispositifs collectent la mesure. Ici, il s'agit de la faire voyager." },
        { html: "Connectivity", juste: true },
        { html: "Data management", aide: "La gestion des données range et analyse, une fois la donnée arrivée." }
      ], { colonnes: 1, ok: function () {
        j.bravo("Connectivity : Wi-Fi, Bluetooth, cellulaire.");
        j.expliquer("<p>La connectivité transfère les données collectées, en sécurité, vers leur système de gestion.</p>");
        j.suite();
      } });
    } },
    { nom: "Quand envoyer ?", jouer: function (j, n) {
      j.titre("Le cardiologue veut voir l'ECG en continu, sans trou, pendant toute la nuit. Le patch doit être :");
      j.choix([
        { html: "event-driven : il transmet seulement en cas d'arythmie", aide: "Le médecin veut tout le tracé, pas seulement les alarmes : la transmission ne doit pas dépendre d'un événement." },
        { html: "time-based : il transmet à intervalle fixe, sans arrêt", juste: true }
      ], { colonnes: 1, ok: function () {
        j.bravo("Un flux continu : time-based.");
        j.expliquer("<p>Les deux architectures se combinent souvent : un flux time-based pour le tracé, et une alarme event-driven quand le rythme s'emballe.</p>");
        j.suite();
      } });
    } },
    { nom: "Compter", jouer: function (j, n) {
      j.titre("Un oxymètre time-based envoie une mesure toutes les 10 minutes. Combien d'envois pendant une nuit de 8 h ?");
      j.nombre({ avant: "\\text{envois} =", cases: [{ attendu: 48, tol: 0 }], ligne: true,
        aide: function () { return "Combien de fois 10 minutes dans une heure, puis dans 8 heures ?"; },
        ok: function () {
          j.bravo("48 envois.");
          j.expliquer("<p>\\(8 \\times 60 / 10 = 48\\). En event-driven, le nombre d'envois serait celui des événements détectés.</p>");
          j.suite();
        } });
    } }
  ]
});
