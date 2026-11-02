/* Niveau : WebSockets et RPC (Partie 1, diapositives 35 à 37). */
NIVEAU({
  id: "websockets-rpc",
  init: function (fig) {
    var g = E.s("g", null, fig.svg), C = EMB.C, n = { mode: "http" };
    n.dessin = function () {
      EMB.vider(g);
      EMB.bloc(g, 20, 90, 170, 80, "Tableau\nde bord", { taille: 19 }); EMB.bloc(g, 20, 400, 170, 80, "Serveur", { taille: 20 });
      EMB.fleche(g, [210, 285], [660, 285], { ep: 2.5, coul: C.gris });
      if (n.mode === "http") {
        for (var k = 0; k < 6; k++) { var x = 230 + k * 72; EMB.fleche(g, [x, 175], [x + 16, 395], { coul: C.acc, ep: 2.5 }); EMB.fleche(g, [x + 28, 395], [x + 44, 175], { coul: C.gris, ep: 2.5 }); }
        EMB.texte(g, "« du nouveau ? »  « rien »", [440, 540], { taille: 19, coul: C.doux });
      } else {
        EMB.el("rect", { x: 220, y: 265, width: 430, height: 40, rx: 12, fill: C.clair, stroke: C.acc, "stroke-width": 3 }, g);
        EMB.texte(g, "une connexion ouverte", [435, 285], { taille: 18, coul: C.acc, halo: false });
        EMB.fleche(g, [560, 400], [560, 175], { coul: C.ko, ep: 5 }); EMB.texte(g, "alarme", [610, 340], { taille: 19, coul: C.ko });
      }
    };
    n.dessin();
    return n;
  },
  etapes: [
    { nom: "Pousser l'alarme", jouer: function (j, n) {
      j.titre("Le serveur doit afficher l'alarme dès qu'elle survient, sans attendre une question du navigateur. Que choisir ?");
      j.choix([
        { html: "Une WebSocket", juste: true },
        { html: "Des requêtes HTTP GET toutes les secondes", aide: "Ça marche, mais c'est le client qui redemande sans cesse : beaucoup de requêtes pour rien, et un retard d'une seconde." },
        { html: "Une requête HTTP POST du serveur vers le navigateur", aide: "En HTTP, la requête vient toujours du client : le serveur ne peut pas en envoyer de lui-même." }
      ], { colonnes: 1, ok: function () {
        n.mode = "ws"; n.dessin();
        j.bravo("Avec une WebSocket, le serveur pousse le message.");
        var b = E.h("button", "btn clair", "Comparer avec HTTP", j.el); b.type = "button";
        b.addEventListener("click", function () { n.mode = n.mode === "ws" ? "http" : "ws"; b.textContent = n.mode === "ws" ? "Comparer avec HTTP" : "Revoir la WebSocket"; n.dessin(); });
        j.expliquer("<p>Les WebSockets permettent au serveur comme au client de pousser un message à tout moment, sans lien avec une requête précédente.</p>");
        j.suite();
      } });
    } },
    { nom: "Trois avantages", jouer: function (j, n) {
      j.titre("Associe chaque problème de HTTP à ce que la WebSocket apporte.");
      var z = j.zone("", '<div style="display:grid;grid-template-columns:1fr auto;gap:10px 14px;align-items:center;font-size:17px">' +
        '<span>chacun peut envoyer un message à l\'autre</span><span class="trou" data-attendu="b"></span>' +
        '<span>les deux parlent indépendamment, en même temps</span><span class="trou" data-attendu="f"></span>' +
        '<span>la même connexion TCP du début à la fin</span><span class="trou" data-attendu="t"></span></div>');
      j.jetons({
        trous: [].slice.call(z.querySelectorAll(".trou")),
        jetons: [{ id: "f", html: "full duplex" }, { id: "t", html: "une connexion TCP" }, { id: "b", html: "bidirectionnel" }],
        aide: "Bi : dans les deux sens. Duplex intégral : en même temps. La connexion TCP est ouverte une seule fois, après l'upgrade HTTP.",
        ok: function () {
          j.bravo("Bidirectionnel, full duplex, une seule connexion TCP.");
          j.expliquer("<p>La WebSocket commence par une connexion HTTP qu'on met à niveau (upgrade), puis garde cette même connexion TCP pendant toute sa vie.</p>");
          j.suite();
        }
      });
    } },
    { nom: "Compter les requêtes", jouer: function (j, n) {
      n.mode = "http"; n.dessin();
      j.fig.astuce("HTTP : le navigateur redemande.");
      j.titre("Pour être prévenu en moins de 3 s, le navigateur redemande en HTTP toutes les 3 s. Combien de requêtes en 5 minutes ?");
      j.nombre({ avant: "\\text{requêtes} =", cases: [{ attendu: 100, tol: 0 }], ligne: true,
        aide: function () { return "5 minutes font combien de secondes ? Divise par l'intervalle."; },
        ok: function () {
          j.bravo("100 requêtes, presque toutes pour rien.");
          j.expliquer("<p>Exemple ajouté : \\(5 \\times 60 / 3 = 100\\). Avec une WebSocket : une connexion, et un message seulement quand il y a du nouveau.</p>");
          j.suite();
        } });
    } },
    { nom: "RPC", jouer: function (j, n) {
      j.titre("L'appli du médecin appelle dernierECG(patient) comme une fonction locale, mais la fonction s'exécute sur le serveur de l'hôpital. C'est :");
      j.choix([
        { html: "une file Push-Pull", aide: "Une file stocke des données entre producteurs et consommateurs. Ici, on appelle une procédure." },
        { html: "un Remote Procedure Call (RPC)", juste: true },
        { html: "un abonnement MQTT", aide: "Un abonnement reçoit des messages publiés. Ici, on appelle une fonction et on attend son résultat." }
      ], { colonnes: 1, ok: function () {
        j.bravo("RPC : la procédure appelée est ailleurs.");
        j.expliquer("<p>Le RPC étend l'appel de procédure local : la procédure appelée n'a pas besoin d'être dans le même espace d'adressage. Les deux processus peuvent être sur le même système ou sur deux systèmes reliés par un réseau.</p>");
        j.suite();
      } });
    } }
  ]
});
