/* Niveau : HTTP, méthodes, interrupteur RESTful, modèle OSI (Partie 1, diapositives 22 à 30). */
NIVEAU({
  id: "http",
  init: function (fig) {
    var g = E.s("g", null, fig.svg), C = EMB.C, n = { vue: "req", req: "? /patients/12/tension", rep: "" };
    n.dessin = function () {
      EMB.vider(g);
      if (n.vue === "req") {
        EMB.bloc(g, 20, 210, 170, 140, "Appli\nde suivi", { taille: 20 }); EMB.bloc(g, 490, 210, 170, 140, "Serveur", { taille: 21 });
        EMB.fleche(g, [195, 250], [485, 250], { coul: C.acc, ep: 5 }); EMB.fleche(g, [485, 315], [195, 315], { coul: C.ok, ep: 5 });
        EMB.texte(g, n.req, [340, 190], { taille: 19, mono: true, coul: C.acc });
        EMB.texte(g, n.rep, [340, 375], { taille: 19, mono: true, coul: C.ok });
      } else if (n.vue === "switch") {
        EMB.bloc(g, 20, 80, 170, 100, "Téléphone", { taille: 20 }); EMB.bloc(g, 490, 230, 170, 120, "Serveur\napi.example.com", { taille: 18 });
        EMB.bloc(g, 20, 400, 170, 100, "Interrupteur\nWi-Fi", { taille: 19 });
        EMB.fleche(g, [195, 130], [485, 260], { coul: C.acc, ep: 4 }); EMB.texte(g, "/turnoff", [330, 165], { taille: 18, mono: true, coul: C.acc });
        EMB.fleche(g, [195, 440], [485, 320], { coul: C.v, ep: 4 }); EMB.texte(g, "/shoulditurnoff ?", [330, 430], { taille: 18, mono: true, coul: C.v });
      } else {
        var L = ["Application", "Presentation", "Session", "Transport", "Network", "Data Link", "Physical"];
        L.forEach(function (c, i) { EMB.bloc(g, 170, 40 + i * 74, 340, 62, (7 - i) + ". " + c, { taille: 21, actif: n.osi === i }); });
      }
    };
    n.dessin();
    return n;
  },
  etapes: [
    { nom: "Le bon verbe", jouer: function (j, n) {
      j.titre("Choisis la méthode HTTP de chaque requête.");
      var z = j.zone("", '<div style="display:grid;grid-template-columns:1fr auto;gap:10px 14px;align-items:center;font-size:18px">' +
        '<span>lire la dernière tension du patient</span><span class="trou" data-attendu="g"></span>' +
        '<span>envoyer une nouvelle mesure</span><span class="trou" data-attendu="p"></span>' +
        '<span>effacer une mesure prise par erreur</span><span class="trou" data-attendu="d"></span></div>');
      j.jetons({
        trous: [].slice.call(z.querySelectorAll(".trou")),
        jetons: [{ id: "d", html: "DELETE" }, { id: "g", html: "GET" }, { id: "p", html: "POST" }, { id: "t", html: "TRACE" }],
        aide: "GET demande une ressource, POST en soumet une, DELETE en supprime une. TRACE renvoie le message en boucle : il ne sert à rien ici.",
        ok: function () {
          n.req = "GET /patients/12/tension"; n.rep = "200 OK : 128/82"; n.dessin();
          j.bravo("GET, POST, DELETE.");
          j.expliquer("<p>Le cours liste 8 méthodes (ou verbes) : GET, POST, PUT (comme POST mais remplace), DELETE, HEAD (comme GET, en-têtes seuls), OPTIONS, PATCH (modifie), TRACE (loop-back).</p>");
          j.suite();
        }
      });
    } },
    { nom: "Sans le contenu", jouer: function (j, n) {
      j.titre("L'appli veut seulement savoir si la ressource existe et quand elle a changé, sans télécharger son contenu. Quelle méthode ?");
      j.choix([
        { html: "GET", aide: "GET renvoie tout le contenu. Il existe une méthode identique qui ne renvoie que les en-têtes." },
        { html: "OPTIONS", aide: "OPTIONS donne les options de la ressource (ce qu'on a le droit d'en faire), pas ses informations." },
        { html: "HEAD", juste: true }
      ], { colonnes: 3, ok: function () {
        j.bravo("HEAD : comme GET, en-têtes seuls.");
        j.expliquer("<p>Les en-têtes décrivent la réponse (taille, date de modification…) sans le contenu lui-même.</p>");
        j.suite();
      } });
    } },
    { nom: "L'interrupteur qui demande", jouer: function (j, n) {
      n.vue = "switch"; n.dessin();
      j.fig.astuce("L'interrupteur RESTful du cours.");
      j.titre("Dans l'exemple du cours, l'interrupteur Wi-Fi doit interroger le serveur (« should I turn off ? »). Pourquoi le serveur ne lui envoie-t-il pas directement l'ordre ?");
      j.choix([
        { html: "Parce que l'interrupteur n'a pas d'adresse", aide: "Le problème n'est pas l'adresse. Regarde qui parle en premier dans le modèle request-response." },
        { html: "Parce que le Wi-Fi ne porte pas assez loin", aide: "La portée n'y est pour rien : le serveur répond bien à l'interrupteur." },
        { html: "En HTTP, c'est toujours le client qui envoie la requête ; le serveur ne fait que répondre", juste: true }
      ], { colonnes: 1, ok: function () {
        j.bravo("HTTP est unidirectionnel : le client demande.");
        j.expliquer("<p>L'interrupteur doit donc redemander régulièrement. MQTT (abonnement) et les WebSockets (le serveur pousse) évitent ces questions répétées.</p>");
        j.suite();
      } });
    } },
    { nom: "La couche de HTTP", jouer: function (j, n) {
      n.vue = "osi"; n.osi = null; n.dessin();
      j.fig.astuce("Le modèle OSI, 7 couches.");
      j.titre("Dans quelle couche du modèle OSI se trouve HTTP ?");
      j.choix([
        { html: "Transport", aide: "La couche Transport assure les connexions de bout en bout (segments). HTTP est au-dessus, au plus près du programme." },
        { html: "Application", juste: true },
        { html: "Physical", aide: "La couche physique transmet des bits sur le support. HTTP est tout en haut." }
      ], { colonnes: 3, ok: function () {
        n.osi = 0; n.dessin();
        j.bravo("Couche 7, Application.");
        j.expliquer("<p>Le modèle OSI décrit en couches comment l'information va d'un programme sur un ordinateur à un programme sur un autre. Unités : données en haut, segments (Transport), paquets (Network), trames (Data Link), bits (Physical).</p>");
        j.suite();
      } });
    } }
  ]
});
