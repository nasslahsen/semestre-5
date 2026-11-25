/* Projet pacemaker, questions 32 à 38 : cadence d'échantillonnage, traces série, ECG de test, stimulations sans cœur, watchdog. */
NIVEAU({
  id: "pacemaker-programme",
  init: function (fig) {
    var g = E.s("g", null, fig.svg), n = { sel: null };
    var L = ["PRET,mode VVI", "R,1302,0,0.0", "R,2160,858,69.9", "ETAT,60,69.9,0,3.92", "PARAM,F=60,S=2500,R=250,T=0", "S,4018", "S,5018", "ALERTE,signal plat"];
    n.dessin = function () { EMB.vider(g); EMB.lignesCode(g, L, { x: 30, y: 60, l: 620, pas: 52, taille: 20, sel: n.sel }); EMB.texte(g, "Moniteur série, 115 200 bauds", [340, 30], { taille: 18 }); };
    n.dessin();
    return n;
  },
  etapes: [
    { nom: "Cadence", jouer: function (j, n) {
      j.titre("Question 35 : <code>timerEch</code> compte à 1 MHz. Quelle alarme pour 250 échantillons par seconde ?");
      j.nombre({ avant: "\\text{alarme} =", apres: "\\mu\\text{s}", cases: [{ attendu: 4000, tol: 0 }], ligne: true,
        aide: function () { return "Période = 1 / 250 s, en microsecondes."; },
        ok: function () {
          j.bravo("1 000 000 / 250 = 4 000 µs, soit 4 ms.");
          j.suite();
        } });
    } },
    { nom: "Lire une trace", jouer: function (j, n) {
      n.sel = 5; n.dessin();
      j.titre("Question 37 : que signale la ligne <code>S,4018</code> ?");
      j.choix([
        { html: "Une onde R détectée à 4 018 ms", aide: "Les ondes R détectées commencent par R, avec RR et la fréquence." },
        { html: "Une stimulation à t = 4 018 ms", juste: true },
        { html: "Un seuil réglé à 4 018", aide: "Les réglages s'affichent sur une ligne PARAM." }
      ], { colonnes: 1, ok: function () {
        j.bravo("S : stimulation, et l'instant en millisecondes.");
        j.expliquer("<p>Après T0, plus d'onde R : la première stimulation part 1 000 ms après le dernier battement (3 018 ms), soit à 4 018 ms.</p>");
        j.suite();
      } });
    } },
    { nom: "ECG de test", jouer: function (j, n) {
      n.sel = null; n.dessin();
      j.titre("Avec la commande <code>T50</code>, quelle est la période de l'ECG de test (<code>60000 / frequenceTest</code>) ?");
      j.nombre({ avant: "\\text{période} =", apres: "\\text{ms}", cases: [{ attendu: 1200, tol: 0 }], ligne: true,
        aide: function () { return "60 000 / 50."; },
        ok: function () {
          j.bravo("1 200 ms : 50 battements par minute.");
          j.suite();
        } });
    } },
    { nom: "Cœur arrêté", jouer: function (j, n) {
      n.sel = 6; n.dessin();
      j.titre("<code>T0</code> (cœur arrêté) et fréquence cible 60 bpm. Combien de stimulations en 10 s, une fois le régime établi ?");
      j.nombre({ avant: "\\text{stimulations} =", cases: [{ attendu: 10, tol: 0 }], ligne: true,
        aide: function () { return "Sans battement propre, une stimulation à chaque intervalle de 1 000 ms."; },
        ok: function () {
          j.bravo("Une par seconde : 10 en 10 s.");
          j.suite();
        } });
    } },
    { nom: "Watchdog", jouer: function (j, n) {
      n.sel = null; n.dessin();
      j.titre("Question 38 : dans le programme, <code>esp_task_wdt_reset()</code> est appelé juste après le traitement d'un échantillon. Pourquoi là ?");
      j.choix([
        { html: "Si le timer d'échantillonnage ou la boucle s'arrête, le chien n'est plus nourri et redémarre la puce", juste: true },
        { html: "Pour que le watchdog compte les échantillons", aide: "Le watchdog ne compte rien : il attend une remise à zéro avant son délai." },
        { html: "Parce que le watchdog ne marche que dans les interruptions", aide: "On le nourrit dans la boucle, jamais dans une interruption." }
      ], { colonnes: 1, ok: function () {
        j.bravo("Nourri seulement si le travail avance vraiment.");
        j.suite();
      } });
    } }
  ]
});
