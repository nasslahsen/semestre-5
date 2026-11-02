/* Niveau : MQTT, topics, jokers, QoS, interrupteur (Partie 1, diapositives 31 à 34). */
NIVEAU({
  id: "mqtt",
  init: function (fig) {
    var g = E.s("g", null, fig.svg), C = EMB.C, n = { topic: "home/groundfloor/kitchen/temperature", montrer: false };
    n.S = [{ id: "a", nom: "Écran A", filtre: "home/groundfloor/+/temperature" }, { id: "b", nom: "Écran B", filtre: "home/groundfloor/#" },
      { id: "c", nom: "Écran C", filtre: "home/+/temperature" }, { id: "d", nom: "Écran D", filtre: "home/#" }];
    n.dessin = function () {
      EMB.vider(g);
      var recoit = {};
      if (n.montrer) n.S.forEach(function (s) { if (EMB.correspond(s.filtre, n.topic)) recoit[s.id] = true; });
      EMB.pubsub(g, { x: 6, y: 90, l: 668, h: 480, taille: 18, lp: 0.2, ls: 0.48, pub: [{ id: "p", nom: "Capteur" }], sub: n.S, recoit: recoit, publie: "p" });
      EMB.texte(g, n.topic, [340, 46], { taille: 19, mono: true, coul: C.acc });
    };
    n.dessin();
    return n;
  },
  etapes: [
    { nom: "Combien reçoivent ?", jouer: function (j, n) {
      j.fig.astuce("Le topic publié est en haut ; le filtre de chaque écran sous son nom.");
      j.titre("Le capteur publie sur le topic écrit en haut de la figure. Combien d'écrans reçoivent le message ?");
      j.nombre({ avant: "\\text{écrans} =", cases: [{ attendu: 3, tol: 0 }], ligne: true,
        aide: function () { return "Compare niveau par niveau. + remplace exactement un niveau ; # remplace tous les niveaux qui suivent. Le filtre de C n'a que 3 niveaux."; },
        ok: function () {
          n.montrer = true; n.dessin();
          j.bravo("A, B et D. Pas C.");
          j.expliquer("<p><code>home/+/temperature</code> a 3 niveaux, le topic en a 4 : <code>+</code> ne remplace qu'un niveau. <code>home/groundfloor/#</code> et <code>home/#</code> prennent tout ce qui suit.</p>");
          j.suite();
        } });
    } },
    { nom: "Écrire le filtre", jouer: function (j, n) {
      n.montrer = false; n.dessin();
      j.titre("Construis le filtre qui reçoit l'humidité de toutes les pièces du premier étage (firstfloor), et rien d'autre.");
      var z = j.zone("", '<div style="display:flex;gap:6px;align-items:center;font:600 20px JetBrains Mono,monospace;flex-wrap:wrap">home/<span class="trou" data-attendu="f"></span>/<span class="trou" data-attendu="p"></span>/<span class="trou" data-attendu="h"></span></div>');
      j.jetons({
        trous: [].slice.call(z.querySelectorAll(".trou")),
        jetons: [{ id: "p", html: "+" }, { id: "h", html: "humidity" }, { id: "d", html: "#" }, { id: "f", html: "firstfloor" }],
        aide: "La pièce change : c'est le niveau à remplacer par un joker d'un seul niveau. # irait jusqu'au bout et prendrait aussi les températures.",
        ok: function () {
          n.topic = "home/firstfloor/bedroom/humidity"; n.dessin();
          j.bravo("home/firstfloor/+/humidity");
          j.expliquer("<p>Les topics fonctionnent comme des chemins de fichiers. <code>+</code> : un seul niveau (ici la pièce). <code>#</code> : plusieurs niveaux, toujours en dernier.</p>");
          j.suite();
        }
      });
    } },
    { nom: "La bonne QoS", jouer: function (j, n) {
      j.titre("Une pompe à perfusion reçoit l'ordre « arrêt » par MQTT. L'ordre ne doit jamais se perdre, et ne doit pas non plus arriver en double. Quelle QoS ?");
      j.choix([
        { html: "QoS 1, at least once", aide: "QoS 1 garantit l'arrivée, mais le message peut arriver plusieurs fois." },
        { html: "QoS 2, exactly once", juste: true },
        { html: "QoS 0, at most once", aide: "QoS 0 n'attend aucune confirmation : le message peut se perdre." }
      ], { colonnes: 1, ok: function () {
        j.bravo("Exactement une fois : QoS 2.");
        j.expliquer("<p>QoS 2 est le mode le plus fiable mais le plus gourmand en bande passante : un échange en quatre étapes contrôle les doublons. QoS 0 est le plus rapide, sans confirmation.</p>");
        j.suite();
      } });
    } },
    { nom: "L'interrupteur MQTT", jouer: function (j, n) {
      j.titre("Le téléphone exécute client.publish('lightSwitch/1', 'toggle'). Pour que l'interrupteur bascule, que faut-il ?");
      j.choix([
        { html: "Que le téléphone connaisse l'adresse IP de l'interrupteur", aide: "En publish-subscribe, le publisher ne connaît pas les abonnés : il ne parle qu'au broker." },
        { html: "Que l'interrupteur redemande l'état toutes les secondes", aide: "Ça, c'était la solution HTTP. Avec MQTT, le broker pousse le message aux abonnés." },
        { html: "Que l'interrupteur soit abonné à lightSwitch/1 auprès du broker", juste: true }
      ], { colonnes: 1, ok: function () {
        j.bravo("Abonné au topic, il reçoit « toggle » tout de suite.");
        j.expliquer("<p>Le broker est le point central : il distribue chaque message à tous les clients abonnés au topic. MQTT, léger, a été conçu pour les appareils limités en bande passante et en énergie.</p>");
        j.suite();
      } });
    } }
  ]
});
