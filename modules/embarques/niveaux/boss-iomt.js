/* Défi du chapitre IoMT : le patch ECG connecté, de bout en bout. */
NIVEAU({
  id: "boss-iomt",
  init: function (fig) {
    var g = E.s("g", null, fig.svg), C = EMB.C, n = { sel: null, coul: null, surTouche: null };
    n.dessin = function () {
      EMB.vider(g);
      n.zones = EMB.couches(g, [70, 50, 540, 460], { sel: n.sel, coul: n.coul, taille: 22, noms: ["Cloud", "Fog : serveur de cardiologie", "Edge : smartphone passerelle", "Patchs ECG de 10 000 patients"] });
    };
    EMB.toucher(fig.svg, function () { return n.surTouche ? n.zones : {}; }, function (k) { if (n.surTouche) n.surTouche(k); });
    n.dessin();
    return n;
  },
  etapes: [
    { nom: "Tendances", jouer: function (j, n) {
      j.fig.astuce("Touche une couche.");
      j.titre("Les chercheurs veulent comparer les ECG de 10 000 patients sur cinq ans pour trouver des tendances. Touche la couche qui fait ce travail.");
      var fini = false, AIDE = { edge: "Le smartphone traite vite un seul patient : il n'a ni les données des autres, ni cinq ans d'historique.", fog: "Le serveur du service voit ses propres patients, au niveau local. Il faut plus global.", capteurs: "Les patchs produisent les données ; l'analyse se fait plus haut." };
      n.surTouche = function (k) {
        if (fini) return;
        n.sel = k; n.coul = k === "cloud" ? EMB.C.ok : EMB.C.ko; n.dessin();
        if (k !== "cloud") { j.erreur(AIDE[k]); return; }
        fini = true; n.surTouche = null;
        j.bravo("Le cloud : big data et data warehousing.");
        j.expliquer("<p>Les analyses globales, sur des volumes énormes et sur la durée, sont le travail du cloud. Elles n'ont pas besoin d'une réponse en millisecondes.</p>");
        j.suite();
      };
      j.reponse(function () { if (n.surTouche) n.surTouche("cloud"); });
    } },
    { nom: "Deux liaisons", jouer: function (j, n) {
      n.sel = null; n.dessin();
      j.titre("Choisis la technologie de chaque liaison.");
      var z = j.zone("", '<div style="display:grid;grid-template-columns:1fr auto;gap:10px 14px;align-items:center;font-size:18px">' +
        '<span>patch → smartphone dans la poche (sobriété avant tout)</span><span class="trou" data-attendu="b"></span>' +
        '<span>smartphone → serveur de l\'hôpital, à 20 km</span><span class="trou" data-attendu="c"></span></div>');
      j.jetons({
        trous: [].slice.call(z.querySelectorAll(".trou")),
        jetons: [{ id: "r", html: "RFID" }, { id: "c", html: "Cellulaire" }, { id: "b", html: "BLE" }],
        aide: "Courte portée et faible consommation d'un côté ; des kilomètres avec un bon débit de l'autre. La RFID ne porte qu'à quelques mètres et ne transmet presque rien.",
        ok: function () {
          j.bravo("BLE près du corps, cellulaire pour la distance.");
          j.expliquer("<p>Le tableau du cours coche justement le cellulaire et le BLE pour la santé connectée.</p>");
          j.suite();
        }
      });
    } },
    { nom: "Le faux", jouer: function (j, n) {
      j.titre("Une étudiante résume l'architecture du patch. Une seule phrase est fausse : laquelle ?");
      j.choix([
        { html: "« Le serveur de cardiologie réduit les données avant de les envoyer au cloud. »", aide: "Analyse et réduction des données au niveau du réseau local : c'est bien le rôle du fog." },
        { html: "« Le smartphone détecte l'arythmie sur place pour gagner du temps. »", aide: "Traitement en temps réel près de la source : c'est l'edge, c'est juste." },
        { html: "« Le chiffrement sert à ce que des systèmes de marques différentes se comprennent. »", juste: true }
      ], { colonnes: 1, ok: function () {
        j.bravo("Faire se comprendre des systèmes différents, c'est l'interopérabilité.");
        j.expliquer("<p>Le chiffrement protège la confidentialité des données. L'interopérabilité repose sur des protocoles de communication et des standards d'échange de données de santé communs.</p>");
        j.suite();
      } });
    } },
    { nom: "Le volume", jouer: function (j, n) {
      j.titre("Le patch échantillonne l'ECG à 250 échantillons par seconde, 2 octets par échantillon. Combien d'octets envoie-t-il par minute ?");
      j.nombre({ avant: "\\text{octets par minute} =", cases: [{ attendu: 30000, tol: 0 }], ligne: true,
        aide: function () { return "Octets par seconde : \\(250 \\times 2\\). Puis multiplie par le nombre de secondes dans une minute."; },
        ok: function () {
          j.bravo("30 000 octets par minute, soit 500 octets par seconde.");
          j.expliquer("<p>Exemple ajouté : \\(250 \\times 2 \\times 60 = 30\\,000\\) octets. C'est peu pour le BLE (vers 100 kbps, soit environ 12 500 octets par seconde) : la liaison suffit.</p>");
          j.suite();
        } });
    } }
  ]
});
