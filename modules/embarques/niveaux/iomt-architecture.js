/* Niveau : architecture d'un système IoMT (Partie 1, diapositives 7 à 18). Trois composants, sécurité, interopérabilité, catégories. */
NIVEAU({
  id: "iomt-architecture",
  init: function (fig) {
    var g = E.s("g", null, fig.svg), C = EMB.C, n = { sel: null, coul: null, surTouche: null, secu: false };
    var B = { devices: [20, 220, 190, 150, "Capteur\nde glucose"], connect: [245, 255, 190, 80, "Wi-Fi, BLE,\nNFC"], data: [470, 220, 190, 150, "Cloud"] };
    n.dessin = function () {
      EMB.vider(g);
      EMB.texte(g, "Suivi du glucose d'un patient diabétique", [340, 70], { taille: 21 });
      if (n.secu) EMB.el("rect", { x: 8, y: 160, width: 664, height: 270, rx: 24, fill: "none", stroke: C.acc, "stroke-width": 5, "stroke-dasharray": "14 10" }, g);
      Object.keys(B).forEach(function (k) {
        var b = B[k], on = n.sel === k;
        EMB.bloc(g, b[0], b[1], b[2], b[3], b[4], { taille: 20, actif: on, stroke: on ? n.coul : null, rx: k === "data" ? 50 : 12 });
      });
      EMB.fleche(g, [212, 295], [243, 295], { ep: 4 }); EMB.fleche(g, [437, 295], [468, 295], { ep: 4 });
      EMB.texte(g, "médecin et patient consultent", [480, 400], { taille: 17, coul: C.doux });
    };
    n.zones = function () { var z = {}; Object.keys(B).forEach(function (k) { z[k] = B[k].slice(0, 4); }); return z; };
    EMB.toucher(fig.svg, function () { return n.surTouche ? n.zones() : {}; }, function (k) { if (n.surTouche) n.surTouche(k); });
    n.dessin();
    return n;
  },
  etapes: [
    { nom: "Qui stocke et analyse ?", jouer: function (j, n) {
      j.fig.astuce("Touche un composant.");
      j.titre("Les mesures doivent être rangées, puis analysées par des algorithmes. Touche le composant « data management ».");
      var fini = false, AIDE = { devices: "Le capteur collecte la donnée ; il ne la stocke pas pour des mois.", connect: "La connectivité transporte la donnée, elle ne la range pas." };
      n.surTouche = function (k) {
        if (fini) return;
        n.sel = k; n.coul = k === "data" ? EMB.C.ok : EMB.C.ko; n.dessin();
        if (k !== "data") { j.erreur(AIDE[k]); return; }
        fini = true; n.surTouche = null;
        j.bravo("Le cloud : data management.");
        j.expliquer("<p>Trois composants : <b>devices and sensors</b> (collecter), <b>connectivity</b> (transporter), <b>data management</b> (stocker, traiter, analyser dans le cloud, avec des plateformes d'analyse et de l'apprentissage automatique).</p>");
        j.suite();
      };
      j.reponse(function () { if (n.surTouche) n.surTouche("data"); });
    } },
    { nom: "Le bon composant", jouer: function (j, n) {
      n.sel = null; n.dessin();
      j.titre("Range chaque élément dans son composant.");
      var z = j.zone("", '<div style="display:grid;grid-template-columns:1fr auto;gap:10px 14px;align-items:center;font-size:18px">' +
        '<span>montre qui suit la prise des médicaments</span><span class="trou" data-attendu="d"></span>' +
        '<span>réseau cellulaire</span><span class="trou" data-attendu="c"></span>' +
        '<span>base de données et apprentissage automatique</span><span class="trou" data-attendu="m"></span></div>');
      j.jetons({
        trous: [].slice.call(z.querySelectorAll(".trou")),
        jetons: [{ id: "c", html: "Connectivity" }, { id: "m", html: "Data management" }, { id: "d", html: "Devices" }],
        aide: "Qui collecte ? Qui transporte ? Qui range et analyse ?",
        ok: function () {
          j.bravo("Collecter, transporter, analyser.");
          j.expliquer("<p>Le cours cite pour les dispositifs les traqueurs portés, le suivi à distance et le diagnostic ; pour la connectivité, Wi-Fi, Bluetooth, réseaux cellulaires ; pour la gestion des données, serveurs, bases de données et algorithmes d'analyse.</p>");
          j.suite();
        }
      });
    } },
    { nom: "Pourquoi chiffrer ?", jouer: function (j, n) {
      n.secu = true; n.dessin();
      j.fig.astuce("La sécurité entoure tout le chemin.");
      j.titre("Pourquoi l'architecture IoMT impose-t-elle chiffrement, authentification et contrôle d'accès ?");
      j.choix([
        { html: "Pour protéger des données de santé sensibles contre les accès non autorisés", juste: true },
        { html: "Pour que les données arrivent plus vite", aide: "Chiffrer ajoute du travail : ce n'est pas pour la vitesse. Pense à la nature des données." },
        { html: "Pour que des appareils de marques différentes se comprennent", aide: "Ça, c'est l'interopérabilité (standards d'échange communs). La sécurité protège autre chose." }
      ], { colonnes: 1, ok: function () {
        j.bravo("Les données du patient sont protégées.");
        j.expliquer("<p>Sécurité et confidentialité : chiffrement, authentification et contrôle d'accès protègent les informations du patient ; les réglementations encadrent leur partage. À ne pas confondre avec l'<b>interopérabilité</b> : des protocoles et standards communs pour que systèmes et dispositifs différents échangent leurs données.</p>");
        j.suite();
      } });
    } },
    { nom: "Une catégorie", jouer: function (j, n) {
      n.secu = false; n.dessin();
      j.titre("Le cours range les dispositifs IoMT en sept catégories. Une gélule qui mesure ce qui se passe dans le tube digestif, c'est :");
      j.choix([
        { html: "un fitness wearable", aide: "Un wearable se porte sur soi (montre, bracelet). Celle-ci s'avale." },
        { html: "un smart pill", juste: true },
        { html: "un point of care kiosk", aide: "Une borne de soins est une machine fixe. Celle-ci voyage dans le corps." }
      ], { colonnes: 1, ok: function () {
        j.bravo("Smart pill.");
        j.expliquer("<p>Les sept catégories du cours : fitness wearables, clinical grade wearables, remote patient monitoring devices, smart pills, point of care devices and kiosks, clinical monitors, hospital devices.</p>");
        j.suite();
      } });
    } }
  ]
});
