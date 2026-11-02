/* Niveau : les quatre modèles de communication (Partie 1, diapositives 24 à 27). */
NIVEAU({
  id: "modeles",
  init: function (fig) {
    var g = E.s("g", null, fig.svg), C = EMB.C, n = { vue: "ps", recoit: {} };
    n.dessin = function () {
      EMB.vider(g);
      if (n.vue === "ps") {
        EMB.pubsub(g, { x: 10, y: 80, l: 660, h: 440, taille: 18, lp: 0.3, ls: 0.34, nomBroker: "?",
          pub: [{ id: "m", nom: "Moniteur\nSpO2" }],
          sub: [{ id: "i", nom: "Infirmière" }, { id: "d", nom: "Médecin" }, { id: "r", nom: "Dossier" }], recoit: n.recoit, publie: n.publie });
        EMB.texte(g, "chambre12/spo2", [340, 50], { taille: 20, mono: true, coul: C.acc });
      } else {
        [0, 1].forEach(function (i) { EMB.bloc(g, 20, 150 + i * 170, 160, 90, "Capteur " + (i + 1), { taille: 19 }); EMB.fleche(g, [185, 195 + i * 170], [250, 290], { ep: 4, coul: C.acc }); });
        for (var k = 0; k < 5; k++) EMB.el("rect", { x: 260 + k * 34, y: 260, width: 30, height: 60, rx: 5, fill: k < n.file ? C.clair : "#fff", stroke: C.encre, "stroke-width": 2.5 }, g);
        EMB.texte(g, "file", [345, 350], { taille: 20 });
        EMB.bloc(g, 500, 240, 160, 100, "Serveur\nd'analyse", { taille: 19 }); EMB.fleche(g, [435, 290], [495, 290], { ep: 4, coul: C.ok });
      }
    };
    n.dessin();
    return n;
  },
  etapes: [
    { nom: "Le modèle", jouer: function (j, n) {
      j.titre("Le moniteur publie la SpO2 sur un topic ; l'infirmière, le médecin et le dossier la reçoivent tous, sans que le moniteur les connaisse. Quel modèle ?");
      j.choix([
        { html: "Publish-Subscribe", juste: true },
        { html: "Request-Response", aide: "En request-response, chacun devrait venir demander la valeur au moniteur. Ici, le moniteur envoie à un intermédiaire qui distribue." },
        { html: "Exclusive Pair", aide: "Une paire exclusive relie un client et un serveur. Ici, trois destinataires reçoivent le même message." }
      ], { colonnes: 1, ok: function () {
        n.recoit = { i: true, d: true, r: true }; n.publie = "m"; n.dessin();
        j.bravo("Publish-Subscribe, avec un broker au milieu.");
        j.expliquer("<p>Le publisher envoie sur un topic géré par le <b>broker</b>, sans connaître les consumers ; le broker transmet la donnée à tous les abonnés du topic.</p>");
        j.suite();
      } });
    } },
    { nom: "Associer", jouer: function (j, n) {
      j.titre("Associe chaque description à son modèle.");
      var z = j.zone("", '<div style="display:grid;grid-template-columns:1fr auto;gap:10px 14px;align-items:center;font-size:17px">' +
        '<span>le serveur décide, va chercher les données, prépare la réponse</span><span class="trou" data-attendu="r"></span>' +
        '<span>les producteurs déposent, les consommateurs viennent tirer</span><span class="trou" data-attendu="p"></span>' +
        '<span>connexion persistante, full duplex, fermée par le client</span><span class="trou" data-attendu="e"></span></div>');
      j.jetons({
        trous: [].slice.call(z.querySelectorAll(".trou")),
        jetons: [{ id: "e", html: "Exclusive Pair" }, { id: "r", html: "Request-Response" }, { id: "p", html: "Push-Pull" }],
        aide: "Une réponse suppose une requête ; une file se remplit (push) et se vide (pull) ; une connexion qui reste ouverte forme une paire.",
        ok: function () {
          j.bravo("Trois modèles reconnus.");
          j.expliquer("<p>Avec Publish-Subscribe, ce sont les quatre modèles du cours.</p>");
          j.suite();
        }
      });
    } },
    { nom: "Pourquoi une file ?", jouer: function (j, n) {
      n.vue = "pp"; n.file = 4; n.dessin();
      j.fig.astuce("Push-Pull : la file entre les deux.");
      j.titre("Deux capteurs envoient des mesures plus vite que le serveur ne les traite. Pourquoi la file du modèle Push-Pull aide-t-elle ?");
      j.choix([
        { html: "Elle accélère le serveur", aide: "La file ne fait rien calculer au serveur. Regarde ce qu'elle garde en attendant." },
        { html: "Elle sert de tampon quand les rythmes de production et de consommation diffèrent", juste: true },
        { html: "Elle permet aux capteurs de connaître le serveur", aide: "Au contraire : les producteurs n'ont pas besoin de connaître les consommateurs." }
      ], { colonnes: 1, ok: function () {
        j.bravo("La file absorbe l'écart de rythme.");
        j.expliquer("<p>Les files découplent producteurs et consommateurs, et servent de tampon quand le rythme auquel les producteurs poussent diffère de celui auquel les consommateurs tirent.</p>");
        j.suite();
      } });
    } },
    { nom: "Qui ferme ?", jouer: function (j, n) {
      j.titre("Dans le modèle Exclusive Pair, une fois la connexion établie, jusqu'à quand reste-t-elle ouverte ?");
      j.choix([
        { html: "Jusqu'à ce que le client demande sa fermeture", juste: true },
        { html: "Jusqu'à la réponse du serveur", aide: "Ça, c'est le rythme d'une requête-réponse. Ici, la connexion est persistante." },
        { html: "Jusqu'à ce que le broker la coupe", aide: "Il n'y a pas de broker dans une paire exclusive : seulement un client et un serveur." }
      ], { colonnes: 1, ok: function () {
        j.bravo("Le client décide de fermer.");
        j.expliquer("<p>Exclusive Pair : bidirectionnel, full duplex, connexion persistante entre client et serveur ; chacun peut envoyer des messages à l'autre tant qu'elle est ouverte. Les WebSockets suivent ce modèle.</p>");
        j.suite();
      } });
    } }
  ]
});
