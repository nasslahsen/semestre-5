/* Révision des protocoles : modèles, HTTP, MQTT, WebSockets, mélangés dans des situations nouvelles. */
NIVEAU({
  id: "revision-protocoles",
  init: function (fig) {
    var g = E.s("g", null, fig.svg), C = EMB.C, n = { topic: "clinique/bloc2/salle3/spo2", montrer: false };
    n.S = [{ id: "a", nom: "Anesthésiste", filtre: "clinique/bloc2/salle3/#" }, { id: "b", nom: "Surveillance", filtre: "clinique/+/+/spo2" },
      { id: "c", nom: "Pharmacie", filtre: "clinique/pharmacie/#" }];
    n.dessin = function () {
      EMB.vider(g);
      var recoit = {};
      if (n.montrer) n.S.forEach(function (s) { if (EMB.correspond(s.filtre, n.topic)) recoit[s.id] = true; });
      EMB.pubsub(g, { x: 6, y: 100, l: 668, h: 440, taille: 18, lp: 0.2, ls: 0.46, pub: [{ id: "p", nom: "Oxymètre" }], sub: n.S, recoit: recoit, publie: "p" });
      EMB.texte(g, n.topic, [340, 50], { taille: 19, mono: true, coul: C.acc });
    };
    n.dessin();
    return n;
  },
  etapes: [
    { nom: "Qui reçoit ?", jouer: function (j, n) {
      j.titre("L'oxymètre de la salle 3 publie sur clinique/bloc2/salle3/spo2. Qui reçoit le message ?");
      j.choix([
        { html: "Anesthésiste et Surveillance", juste: true },
        { html: "Les trois", aide: "Le filtre de la pharmacie commence par clinique/pharmacie : le deuxième niveau ne correspond pas." },
        { html: "Anesthésiste seulement", aide: "Regarde le filtre de Surveillance : deux + remplacent bloc2 et salle3, puis spo2 correspond." }
      ], { colonnes: 1, ok: function () {
        n.montrer = true; n.dessin();
        j.bravo("Deux abonnés sur trois.");
        j.expliquer("<p><code>#</code> prend tous les niveaux qui suivent ; chaque <code>+</code> remplace exactement un niveau.</p>");
        j.suite();
      } });
    } },
    { nom: "Quel modèle ?", jouer: function (j, n) {
      j.titre("Associe chaque situation à son modèle.");
      var z = j.zone("", '<div style="display:grid;grid-template-columns:1fr auto;gap:10px 14px;align-items:center;font-size:17px">' +
        '<span>le navigateur charge la fiche d\'un patient</span><span class="trou" data-attendu="r"></span>' +
        '<span>les mesures s\'accumulent la nuit, le serveur les traite le matin</span><span class="trou" data-attendu="p"></span>' +
        '<span>un oxymètre envoie à tous les écrans abonnés</span><span class="trou" data-attendu="s"></span></div>');
      j.jetons({
        trous: [].slice.call(z.querySelectorAll(".trou")),
        jetons: [{ id: "s", html: "Publish-Subscribe" }, { id: "p", html: "Push-Pull" }, { id: "r", html: "Request-Response" }],
        aide: "Une demande suivie d'une réponse ; une file qui se remplit puis se vide ; un intermédiaire qui distribue aux abonnés.",
        ok: function () {
          j.bravo("Request-Response, Push-Pull, Publish-Subscribe.");
          j.expliquer("<p>La file du Push-Pull sert de tampon quand on produit plus vite qu'on ne consomme.</p>");
          j.suite();
        }
      });
    } },
    { nom: "Le verbe", jouer: function (j, n) {
      j.titre("Une mesure de SpO2 enregistrée est fausse ; l'appli envoie la valeur corrigée pour remplacer l'ancienne. Quelle méthode HTTP ?");
      j.choix([
        { html: "POST", aide: "POST soumet une nouvelle ressource : on en aurait deux. Le cours décrit une méthode « comme POST, mais qui remplace »." },
        { html: "GET", aide: "GET lit une ressource sans la changer." },
        { html: "PUT", juste: true }
      ], { colonnes: 3, ok: function () {
        j.bravo("PUT remplace la ressource.");
        j.expliquer("<p>PATCH, lui, appliquerait seulement des modifications à la ressource.</p>");
        j.suite();
      } });
    } },
    { nom: "QoS", jouer: function (j, n) {
      j.titre("Un thermomètre publie la température de la salle toutes les secondes. En perdre une de temps en temps ne gêne personne. Quelle QoS économise le plus le réseau ?");
      j.choix([
        { html: "QoS 1", aide: "QoS 1 ajoute une confirmation pour chaque message : plus de trafic, pour une garantie inutile ici." },
        { html: "QoS 2", aide: "QoS 2 fait quatre échanges par message : le plus coûteux." },
        { html: "QoS 0", juste: true }
      ], { colonnes: 3, ok: function () {
        j.bravo("QoS 0 : le plus rapide, sans confirmation.");
        j.expliquer("<p>Une nouvelle valeur arrive chaque seconde : en perdre une n'a pas d'importance.</p>");
        j.suite();
      } });
    } }
  ]
});
