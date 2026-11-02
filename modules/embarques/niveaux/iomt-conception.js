/* Niveau : IoT Design (time-based, event-driven) et technologies de communication (Partie 1, diapositives 19 à 21). */
NIVEAU({
  id: "iomt-conception",
  init: function (fig) {
    var g = E.s("g", null, fig.svg), C = EMB.C, n = { mode: null, evts: [2.5, 6.2], vue: "temps", sel: null };
    function x(t) { return 60 + t * 56; }
    n.dessin = function () {
      EMB.vider(g);
      if (n.vue === "temps") {
        EMB.fleche(g, [40, 360], [650, 360], { ep: 3 });
        EMB.texte(g, "temps", [620, 390], { taille: 18, coul: C.doux });
        n.evts.forEach(function (t) { EMB.el("polygon", { points: [[x(t), 372], [x(t) - 13, 402], [x(t) + 13, 402]].join(" "), fill: C.ko }, g); });
        EMB.texte(g, "chutes détectées", [340, 440], { taille: 18, coul: C.ko });
        var env = n.mode === "temps" ? [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10] : n.mode === "evt" ? n.evts : [];
        env.forEach(function (t) { EMB.el("line", { x1: x(t), y1: 356, x2: x(t), y2: 180, stroke: C.acc, "stroke-width": 5 }, g); EMB.el("circle", { cx: x(t), cy: 172, r: 11, fill: C.acc }, g); });
        EMB.texte(g, n.mode ? "envois du capteur" : "quand le capteur doit-il émettre ?", [340, 110], { taille: 21, coul: C.acc });
      } else {
        var T = [["RFID", 60, 470, 130, 50], ["BLE", 160, 300, 150, 60], ["Wi-Fi", 200, 120, 120, 60], ["LoRa, Sigfox", 440, 430, 200, 70], ["Cellulaire", 470, 110, 150, 110]];
        EMB.fleche(g, [30, 560], [670, 560], { ep: 3 }); EMB.fleche(g, [40, 570], [40, 40], { ep: 3 });
        EMB.texte(g, "portée", [620, 585], { taille: 17, coul: C.doux }); EMB.texte(g, "débit", [84, 40], { taille: 17, coul: C.doux });
        T.forEach(function (t) { EMB.bloc(g, t[1], t[2], t[3], t[4], t[0], { taille: 19, actif: n.sel === t[0], stroke: n.sel === t[0] ? n.coul : null }); });
      }
    };
    n.dessin();
    return n;
  },
  etapes: [
    { nom: "Prédire", jouer: function (j, n) {
      j.titre("Un bracelet anti-chute pour une personne âgée. Il doit tenir des mois sur sa pile. Quelle architecture de gestion choisir ?");
      j.choix([
        { html: "Time-based : il émet toutes les secondes", aide: "Émettre en continu vide la pile, alors qu'une chute est rare. Regarde ce qui déclenche l'envoi." },
        { html: "Event-driven : il émet quand il détecte une chute", juste: true }
      ], { colonnes: 1, ok: function () {
        n.mode = "evt"; n.dessin();
        j.bravo("Il n'émet que lors d'une chute.");
        var b = E.h("button", "btn clair", "Comparer avec time-based", j.el); b.type = "button";
        b.addEventListener("click", function () { n.mode = n.mode === "evt" ? "temps" : "evt"; b.textContent = n.mode === "evt" ? "Comparer avec time-based" : "Revoir event-driven"; n.dessin(); });
        j.expliquer("<p><b>Event-driven</b> : les capteurs transmettent quand une activité est détectée, comme une alarme qui se déclenche à l'ouverture d'une porte. <b>Time-based</b> : ils transmettent en continu, à un intervalle fixé. Pour deux chutes, le bracelet event-driven émet 2 fois au lieu de 11.</p>");
        j.suite();
      } });
    } },
    { nom: "Compter les envois", jouer: function (j, n) {
      n.mode = "temps"; n.dessin();
      j.fig.astuce("Time-based : un envoi par pas de temps.");
      j.titre("Un tensiomètre time-based envoie une mesure toutes les 15 minutes. Combien d'envois en une journée de 24 h ?");
      j.nombre({ avant: "\\text{envois} =", cases: [{ attendu: 96, tol: 0 }], ligne: true,
        aide: function () { return "Une heure contient 4 quarts d'heure ; combien d'heures dans une journée ?"; },
        ok: function () {
          j.bravo("96 envois par jour, qu'il y ait du nouveau ou non.");
          j.expliquer("<p>Exemple ajouté : \\(24 \\times 60 / 15 = 96\\). En time-based, le nombre d'envois ne dépend que de l'intervalle ; en event-driven, il dépend du nombre d'événements.</p>");
          j.suite();
        } });
    } },
    { nom: "Choisir la radio", jouer: function (j, n) {
      n.vue = "tech"; n.sel = null; n.dessin();
      j.fig.astuce("Débit en fonction de la portée (graphique du cours).");
      j.titre("Un capteur porté envoie sa mesure au smartphone dans la poche du patient, à moins d'un mètre, en consommant le moins possible. Quelle technologie ?");
      j.choix([
        { html: "Cellulaire (4G)", aide: "Le cellulaire porte à des kilomètres, avec beaucoup de débit : trop cher et trop gourmand pour un mètre." },
        { html: "LoRa", aide: "LoRa porte jusqu'à 10 km. Ici le téléphone est dans la poche : il faut une radio courte et sobre." },
        { html: "BLE", juste: true }
      ], { colonnes: 1, ok: function () {
        n.sel = "BLE"; n.coul = EMB.C.ok; n.dessin();
        j.bravo("Le BLE : courte portée, faible consommation.");
        j.expliquer("<p>Le tableau d'usages du cours coche le BLE pour les <i>wearables</i> et la santé connectée. Plus une radio porte loin et plus elle a de débit, plus elle consomme et coûte : on prend la plus modeste qui suffit.</p>");
        j.suite();
      } });
    } },
    { nom: "Loin et lent", jouer: function (j, n) {
      j.titre("Un pilulier dans un village isolé envoie une seule information par jour : « pris » ou « oublié ». Le relais le plus proche est à 8 km. Que choisir ?");
      j.choix([
        { html: "Wi-Fi", aide: "Le Wi-Fi porte à quelques dizaines de mètres : le relais est à 8 km." },
        { html: "Bluetooth", aide: "Le Bluetooth porte à une dizaine de mètres. Regarde à droite du graphique, vers 10 km." },
        { html: "LPWAN sans licence (LoRa, Sigfox)", juste: true }
      ], { colonnes: 1, ok: function () {
        n.sel = "LoRa, Sigfox"; n.coul = EMB.C.ok; n.dessin();
        j.bravo("Portée de plusieurs km, débit minuscule : LPWAN.");
        j.expliquer("<p>Exemple ajouté. Les LPWAN (Low Power Wide Area Network) portent loin en consommant peu, au prix d'un débit très faible (quelques kbps) : parfait pour un message par jour.</p>");
        j.suite();
      } });
    } }
  ]
});
