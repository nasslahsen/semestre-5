/* Projet pacemaker, questions 17 à 22 : intervalle d'échappement, inhibition, timerWrite, contrôle des commandes, millis(). */
NIVEAU({
  id: "pacemaker-algorithme",
  init: function (fig) {
    var g = E.s("g", null, fig.svg), n = { act: {} };
    var B = [
      { id: "init", x: 20, y: 30, w: 640, h: 70, t: "Initialisation : broches, timers, watchdog", taille: 17 },
      { id: "ech", x: 20, y: 140, w: 640, h: 70, t: "Échantillon prêt ? lire l'ADC", taille: 17 },
      { id: "det", x: 20, y: 250, w: 640, h: 70, t: "Battement détecté ? compte remis à 0", taille: 17 },
      { id: "fin", x: 20, y: 360, w: 640, h: 70, t: "Intervalle écoulé ? stimuler", taille: 17 },
      { id: "tour", x: 20, y: 470, w: 640, h: 70, t: "LED, commandes série, watchdog", taille: 17 }
    ];
    var L = [["init", "ech"], ["ech", "det"], ["det", "fin"], ["fin", "tour"]];
    n.dessin = function () { EMB.scene(g, B, L, n.act); };
    n.dessin();
    return n;
  },
  etapes: [
    { nom: "Intervalle", jouer: function (j, n) {
      n.act = { fin: true }; n.dessin();
      j.titre("Question 20 : fréquence cible 40 bpm. Combien de temps sans battement avant une stimulation ?");
      j.nombre({ avant: "T_{ech} =", apres: "\\text{ms}", cases: [{ attendu: 1500, tol: 0 }], ligne: true,
        aide: function () { return "Tech = 60 000 / f, en ms."; },
        ok: function () {
          j.bravo("60 000 / 40 = 1 500 ms.");
          j.suite();
        } });
    } },
    { nom: "Battement à temps", jouer: function (j, n) {
      n.act = { det: true }; n.dessin();
      j.titre("Cible 60 bpm (1 000 ms). Un battement propre arrive 600 ms après le précédent. Que fait l'algorithme ?");
      j.choix([
        { html: "Il stimule 400 ms plus tard, à la fin de l'intervalle", aide: "Le battement est arrivé avant la fin : la stimulation prévue n'a plus lieu d'être." },
        { html: "Il ne stimule pas, et l'intervalle de 1 000 ms repart de ce battement", juste: true },
        { html: "Il stimule tout de suite", aide: "Le cœur vient de battre seul : stimuler maintenant tomberait pendant sa période réfractaire, ou sur l'onde T." }
      ], { colonnes: 1, ok: function () {
        j.bravo("Stimulation inhibée, compte remis à zéro.");
        j.suite();
      } });
    } },
    { nom: "timerWrite", jouer: function (j, n) {
      j.titre("Dans le programme, que fait <code>timerWrite(timerStim, 0)</code> quand un battement est détecté ?");
      j.choix([
        { html: "Il arrête le timer pour de bon", aide: "Le timer continue de compter : il repart simplement de 0." },
        { html: "Il remet le compteur à 0 : l'alarme est repoussée d'un intervalle entier", juste: true },
        { html: "Il déclenche une stimulation immédiate", aide: "C'est l'alarme du timer qui déclenche la stimulation, pas sa remise à zéro." }
      ], { colonnes: 1, ok: function () {
        j.bravo("C'est l'équivalent matériel de dernierEvt = millis().");
        j.suite();
      } });
    } },
    { nom: "F700", jouer: function (j, n) {
      n.act = { tour: true }; n.dessin();
      j.titre("Question 21 : la commande série <code>F700</code> arrive (faute de frappe pour F70). Que doit faire la maquette ?");
      j.choix([
        { html: "Stimuler à 700 bpm, c'est la commande reçue", aide: "Une fréquence de 700 bpm serait dangereuse : toute commande doit être vérifiée." },
        { html: "Prendre 180 bpm, le maximum", aide: "Mieux, mais elle appliquerait quand même un réglage que personne n'a demandé." },
        { html: "La refuser et garder l'ancienne fréquence", juste: true }
      ], { colonnes: 1, ok: function () {
        j.bravo("Hors de la plage 30 à 180 bpm : refusée, message d'erreur.");
        j.suite();
      } });
    } },
    { nom: "millis()", jouer: function (j, n) {
      j.titre("Question 18 : après 49,7 jours, <code>millis()</code> repasse par 0. Que devient <code>millis() - dernierEvt</code> (tout en unsigned long) ?");
      j.choix([
        { html: "Il reste juste : la soustraction non signée donne le bon écart", juste: true },
        { html: "Il devient négatif et bloque la stimulation", aide: "Un unsigned long n'est jamais négatif : la soustraction « fait le tour » et retombe sur le bon écart." },
        { html: "Il faut redémarrer la puce tous les 49 jours", aide: "Pas besoin : c'est justement l'intérêt d'écrire le test avec une soustraction." }
      ], { colonnes: 1, ok: function () {
        j.bravo("Toujours comparer des écarts (millis() − début), jamais des instants.");
        j.suite();
      } });
    } }
  ]
});
