/* Défi des protocoles : la chambre connectée d'un service hospitalier. */
NIVEAU({
  id: "boss-protocoles",
  init: function (fig) {
    var g = E.s("g", null, fig.svg), C = EMB.C, n = { topic: "hopital/etage2/chambre12/appel", montrer: false };
    n.S = [{ id: "i", nom: "Infirmière étage 2", filtre: "hopital/etage2/+/appel" }, { id: "c", nom: "Dossier ch. 12", filtre: "hopital/etage2/chambre12/#" },
      { id: "t", nom: "Toutes les temp.", filtre: "hopital/+/+/temperature" }];
    n.dessin = function () {
      EMB.vider(g);
      var recoit = {};
      if (n.montrer) n.S.forEach(function (s) { if (EMB.correspond(s.filtre, n.topic)) recoit[s.id] = true; });
      EMB.pubsub(g, { x: 6, y: 100, l: 668, h: 440, taille: 17, lp: 0.2, ls: 0.48, pub: [{ id: "p", nom: "Chambre 12" }], sub: n.S, recoit: recoit, publie: "p" });
      EMB.texte(g, n.topic, [340, 50], { taille: 19, mono: true, coul: C.acc });
    };
    n.dessin();
    return n;
  },
  etapes: [
    { nom: "Le bouton d'appel", jouer: function (j, n) {
      j.titre("Le patient de la chambre 12 appuie sur le bouton d'appel (topic écrit en haut). Combien d'abonnés reçoivent le message ?");
      j.nombre({ avant: "\\text{abonnés} =", cases: [{ attendu: 2, tol: 0 }], ligne: true,
        aide: function () { return "Compare chaque filtre niveau par niveau ; le dernier niveau du topic est appel."; },
        ok: function () {
          n.montrer = true; n.dessin();
          j.bravo("L'infirmière de l'étage et le dossier de la chambre.");
          j.expliquer("<p>Le filtre des températures finit par temperature : le dernier niveau ne correspond pas.</p>");
          j.suite();
        } });
    } },
    { nom: "Le filtre du cadre", jouer: function (j, n) {
      j.titre("Le cadre de santé veut tous les appels de toutes les chambres de tous les étages, et rien d'autre. Construis son filtre.");
      var z = j.zone("", '<div style="display:flex;gap:6px;align-items:center;font:600 20px JetBrains Mono,monospace;flex-wrap:wrap">hopital/<span class="trou" data-attendu="p"></span>/<span class="trou" data-attendu="p"></span>/<span class="trou" data-attendu="a"></span></div>');
      j.jetons({
        trous: [].slice.call(z.querySelectorAll(".trou")),
        jetons: [{ id: "d", html: "#" }, { id: "a", html: "appel" }, { id: "p", html: "+" }, { id: "p", html: "+" }],
        aide: "L'étage et la chambre changent : un joker d'un niveau pour chacun. # ne peut être qu'en dernier, et prendrait tout.",
        ok: function () {
          j.bravo("hopital/+/+/appel");
          j.expliquer("<p>Deux <code>+</code> pour les deux niveaux qui varient, et le dernier niveau fixé à appel.</p>");
          j.suite();
        }
      });
    } },
    { nom: "Garanties", jouer: function (j, n) {
      j.titre("Choisis la QoS de chaque message.");
      var z = j.zone("", '<div style="display:grid;grid-template-columns:1fr auto;gap:10px 14px;align-items:center;font-size:17px">' +
        '<span>appel du patient : ne doit jamais se perdre (un doublon fait juste sonner deux fois)</span><span class="trou" data-attendu="1"></span>' +
        '<span>ordre « arrêt » à la pompe : ni perdu, ni en double</span><span class="trou" data-attendu="2"></span>' +
        '<span>température de la chambre chaque minute</span><span class="trou" data-attendu="0"></span></div>');
      j.jetons({
        trous: [].slice.call(z.querySelectorAll(".trou")),
        jetons: [{ id: "2", html: "QoS 2" }, { id: "0", html: "QoS 0" }, { id: "1", html: "QoS 1" }],
        aide: "QoS 0 : au plus une fois. QoS 1 : au moins une fois (doublons possibles). QoS 2 : exactement une fois, le plus coûteux.",
        ok: function () {
          j.bravo("Chaque message a la garantie qu'il lui faut, sans gaspiller.");
          j.expliquer("<p>On prend la QoS la plus basse qui suffit : la fiabilité coûte de la bande passante.</p>");
          j.suite();
        }
      });
    } },
    { nom: "Le tableau de bord", jouer: function (j, n) {
      j.titre("Le poste de soins affiche les appels dans un navigateur. Une collègue propose : « Le serveur fera un HTTP POST vers le navigateur à chaque appel. » Qu'est-ce qui cloche ?");
      j.choix([
        { html: "Rien, c'est la bonne méthode", aide: "Qui envoie la requête en HTTP ? Regarde le sens de la flèche." },
        { html: "En HTTP, le navigateur est le client : le serveur ne peut pas lui envoyer de requête. Il faut une WebSocket.", juste: true },
        { html: "Il faudrait un GET au lieu d'un POST", aide: "Changer de verbe ne change pas le sens : c'est toujours le client qui demande." }
      ], { colonnes: 1, ok: function () {
        j.bravo("Le serveur pousse par une WebSocket.");
        j.expliquer("<p>WebSocket : bidirectionnelle, full duplex, une seule connexion TCP ouverte après l'upgrade HTTP. Le serveur envoie l'appel dès qu'il arrive.</p>");
        j.suite();
      } });
    } }
  ]
});
