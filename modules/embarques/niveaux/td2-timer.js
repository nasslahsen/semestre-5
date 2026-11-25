/* TD 2, question 4 : pré-diviseur, valeur d'alarme, interruption courte, volatile, l'erreur de l'annexe. */
NIVEAU({
  id: "td2-timer",
  init: function (fig) {
    var g = E.s("g", null, fig.svg), n = { act: {} };
    var B = [
      { id: "apb", x: 20, y: 40, w: 200, h: 80, t: "APB_CLK\n80 MHz" },
      { id: "pre", x: 240, y: 40, w: 200, h: 80, t: "Pré-diviseur" },
      { id: "cpt", x: 460, y: 40, w: 200, h: 80, t: "Compteur\n64 bits" },
      { id: "al", x: 460, y: 240, w: 200, h: 80, t: "Alarme" },
      { id: "isr", x: 240, y: 240, w: 200, h: 80, t: "onTimer()", mono: true },
      { id: "lp", x: 20, y: 240, w: 200, h: 80, t: "loop()", mono: true },
      { id: "mes", x: 20, y: 440, w: 640, h: 80, t: "acquisition(2, 0, N) : les 8 capteurs", taille: 17 }
    ];
    var L = [["apb", "pre"], ["pre", "cpt"], ["cpt", "al"], ["al", "isr"], ["isr", "lp"], ["lp", "mes"]];
    n.dessin = function () { EMB.scene(g, B, L, n.act); };
    n.dessin();
    return n;
  },
  etapes: [
    { nom: "Pré-diviseur", jouer: function (j, n) {
      n.act = { apb: true, pre: true }; n.dessin();
      j.titre("<code>timerBegin(500000)</code> : le compteur avance à 500 kHz. Quel pré-diviseur la bibliothèque applique-t-elle à l'horloge de 80 MHz ?");
      j.nombre({ avant: "\\text{pré-diviseur} =", cases: [{ attendu: 160, tol: 0 }], ligne: true,
        aide: function () { return "Pré-diviseur = fréquence de l'horloge / fréquence du compteur."; },
        ok: function () {
          j.bravo("80 MHz / 0,5 MHz = 160.");
          j.suite();
        } });
    } },
    { nom: "Alarme", jouer: function (j, n) {
      n.act = { cpt: true, al: true }; n.dessin();
      j.titre("<code>timerBegin(1000000)</code> : un pas par microseconde. Pour suivre la marche, on veut une mesure toutes les 25 ms (question 13 du TD 1). Quelle valeur d'alarme ?");
      j.nombre({ avant: "\\text{alarme} =", cases: [{ attendu: 25000, tol: 0 }], ligne: true,
        aide: function () { return "Alarme = période / durée d'un pas. 25 ms = 25 000 µs."; },
        ok: function () {
          j.bravo("25 000 pas de 1 µs = 25 ms.");
          j.expliquer("<p>\\[\\text{alarme} = \\frac{T}{T_{tic}}\\]</p>");
          j.suite();
        } });
    } },
    { nom: "Dans onTimer()", jouer: function (j, n) {
      n.act = { isr: true }; n.dessin();
      j.titre("Que doit contenir <code>onTimer()</code> ?");
      j.choix([
        { html: "<code>tick = true;</code> et rien d'autre", juste: true },
        { html: "<code>acquisition(2, 0, 10);</code>", aide: "L'acquisition attend 2 ms par capteur et fait 80 conversions : bien trop long pour une interruption." },
        { html: "<code>Serial.print(mesures[0]);</code>", aide: "L'envoi série est lent et ne se fait pas dans une interruption." }
      ], { colonnes: 1, ok: function () {
        n.act = { isr: true, lp: true, mes: true }; n.dessin();
        j.bravo("L'interruption lève un drapeau ; la boucle mesure.");
        j.suite();
      } });
    } },
    { nom: "volatile", jouer: function (j, n) {
      j.titre("Pourquoi déclarer <code>volatile bool tick</code> ?");
      j.choix([
        { html: "Pour que la variable garde sa valeur à la coupure", aide: "Une variable en RAM se perd à la coupure, volatile ou pas." },
        { html: "Pour que le compilateur la relise à chaque fois : l'interruption peut la changer à tout moment", juste: true },
        { html: "Pour qu'elle prenne moins de place", aide: "volatile ne change pas la taille de la variable." }
      ], { colonnes: 1, ok: function () {
        j.bravo("Sans volatile, loop() pourrait garder une vieille copie de tick et ne jamais voir le changement.");
        j.suite();
      } });
    } },
    { nom: "L'annexe", jouer: function (j, n) {
      j.titre("L'annexe écrit <code>timerAttachInterrupt(timer, &amp;onTimer);</code> mais définit <code>void IRAM_ATTR onTimer0()</code>. Que se passe-t-il ?");
      j.choix([
        { html: "Le programme ne compile pas : onTimer n'existe pas", juste: true },
        { html: "Le timer appelle onTimer0 quand même", aide: "Le compilateur cherche une fonction qui porte exactement le nom écrit." },
        { html: "L'interruption arrive deux fois plus souvent", aide: "Le nom de la fonction ne change pas la période." }
      ], { colonnes: 1, ok: function () {
        j.bravo("Les deux noms doivent être identiques.");
        j.expliquer("<p>Il manque aussi la déclaration <code>volatile bool tick = false;</code>.</p>");
        j.suite();
      } });
    } }
  ]
});
