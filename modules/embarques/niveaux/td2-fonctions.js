/* TD 2, question 2 : selectSensor (bits de num), attente avant la lecture, du code à la tension puis à la résistance. */
NIVEAU({
  id: "td2-fonctions",
  init: function (fig) {
    var g = E.s("g", null, fig.svg), n = { act: {} };
    var B = [
      { id: "sel", x: 20, y: 60, w: 300, h: 80, t: "selectSensor(num)", mono: true, taille: 17 },
      { id: "acq", x: 360, y: 60, w: 300, h: 80, t: "sensorAcquisition(num)", mono: true, taille: 17 },
      { id: "va", x: 360, y: 260, w: 300, h: 80, t: "VA = code × 3,3 / 4095", taille: 17 },
      { id: "r", x: 360, y: 450, w: 300, h: 90, t: "rsensor(val)\nRG / (VA / V+ − 1)", taille: 17 },
      { id: "bits", x: 20, y: 260, w: 300, h: 80, t: "S3 S2 S1", mono: true }
    ];
    var L = [["sel", "acq"], ["sel", "bits"], ["acq", "va"], ["va", "r"]];
    n.dessin = function () { EMB.scene(g, B, L, n.act); };
    n.dessin();
    return n;
  },
  etapes: [
    { nom: "Capteur 5", jouer: function (j, n) {
      n.act = { sel: true, bits: true }; n.dessin();
      j.titre("<code>selectSensor(5)</code> : que valent S3 S2 S1 ?");
      j.choix([
        { html: "011", aide: "011 vaut 3. Écris 5 en binaire : 4 + 1." },
        { html: "101", juste: true },
        { html: "110", aide: "110 vaut 6. Écris 5 en binaire : 4 + 1." }
      ], { colonnes: 3, ok: function () {
        j.bravo("5 = 4 + 1 = 101 : S3 = 1, S2 = 0, S1 = 1.");
        j.suite();
      } });
    } },
    { nom: "Le bit de S3", jouer: function (j, n) {
      j.titre("Complète la ligne qui commande S3, le bit de poids fort.");
      var z = j.zone("", '<div style="font-family:JetBrains Mono,monospace;font-size:19px;display:flex;align-items:center;gap:6px;flex-wrap:wrap">digitalWrite(S3, (num &gt;&gt; <span class="trou" data-attendu="t2"></span>) &amp; <span class="trou" data-attendu="t1"></span>);</div>');
      j.jetons({
        trous: [].slice.call(z.querySelectorAll(".trou")),
        jetons: [{ id: "t0", html: "0" }, { id: "t1", html: "1" }, { id: "t2", html: "2" }, { id: "t3", html: "3" }],
        aide: "S1 est le bit 0, S2 le bit 1, S3 le bit 2. Le masque garde un seul bit.",
        ok: function () {
          j.bravo("(num >> 2) & 1 : le bit 2 de num.");
          j.expliquer("<p>Le décalage amène le bit voulu tout à droite, le masque <code>&amp; 1</code> efface les autres : il reste 0 ou 1.</p>");
          j.suite();
        } });
    } },
    { nom: "Attendre", jouer: function (j, n) {
      n.act = { acq: true }; n.dessin();
      j.titre("Pourquoi <code>sensorAcquisition()</code> attend-elle 2 ms entre <code>selectSensor()</code> et <code>analogRead()</code> ?");
      j.choix([
        { html: "VA met un peu de temps à suivre le nouveau capteur (filtre RG CF)", juste: true },
        { html: "L'ADC doit refroidir entre deux mesures", aide: "Un ADC enchaîne des milliers de conversions par seconde sans souci." },
        { html: "Pour ne pas envoyer trop de données", aide: "Pense au condensateur CF en parallèle sur RG : que fait VA juste après le changement de voie ?" }
      ], { colonnes: 1, ok: function () {
        j.bravo("Il faut environ 5 RG CF pour que VA se stabilise.");
        j.suite();
      } });
    } },
    { nom: "Code vers VA", jouer: function (j, n) {
      n.act = { va: true }; n.dessin();
      j.titre("Le capteur Y4 renvoie le code 1365. Que vaut \\(V_A\\) ?");
      j.nombre({ avant: "V_A =", apres: "\\text{V}", cases: [{ attendu: 1.1, tol: 0.005 }], ligne: true,
        aide: function () { return "VA = code × 3,3 / 4095."; },
        ok: function () {
          j.bravo("1365 × 3,3 / 4095 = 1,1 V.");
          j.suite();
        } });
    } },
    { nom: "VA vers R", jouer: function (j, n) {
      n.act = { r: true }; n.dessin();
      j.titre("Avec \\(V_A = 1{,}1\\) V, \\(V^+ = 0{,}275\\) V et \\(R_G = 750\\) kΩ, quelle résistance renvoie <code>rsensor()</code> ?");
      j.nombre({ avant: "R_{FSR} =", apres: "\\text{k}\\Omega", cases: [{ attendu: 250, tol: 1 }], ligne: true,
        aide: function () { return "VA / V+ = 4. Puis RFSR = RG / (VA / V+ − 1)."; },
        ok: function () {
          j.bravo("750 / (4 − 1) = 250 kΩ.");
          j.expliquer("<p>\\[R_{FSR} = \\frac{R_G}{V_A / V^+ - 1}\\]</p><p>Avec le modèle du capteur : \\(F = 629 / (250 - 71) \\approx 3{,}5\\) N.</p>");
          j.suite();
        } });
    } },
    { nom: "Pas d'appui", jouer: function (j, n) {
      j.titre("<code>rsensor()</code> reçoit un code qui donne \\(V_A = 0{,}27\\) V, juste sous \\(V^+\\). Que doit-elle renvoyer ?");
      j.choix([
        { html: "Une résistance infinie (INFINITY) : aucun appui", juste: true },
        { html: "La valeur négative que donne la formule", aide: "Une résistance négative n'a pas de sens : la formule n'est valable que pour VA > V+." },
        { html: "0 Ω", aide: "0 Ω voudrait dire un appui énorme. Sans appui, la résistance du capteur est au contraire très grande." }
      ], { colonnes: 1, ok: function () {
        j.bravo("Sans appui, la résistance est « infinie ».");
        j.expliquer("<p>Le bruit peut faire passer \\(V_A\\) un peu sous 0,275 V : sans ce test, la division donnerait une résistance négative.</p>");
        j.suite();
      } });
    } }
  ]
});
