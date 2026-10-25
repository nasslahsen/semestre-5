/* Niveau : l'agitateur chauffant (chapitre 5) : plages, panne de chauffe, ce qu'on ne pose pas, chaleur résiduelle, espace libre. */
NIVEAU(LABO.rejouable({
  id: "agitateur",
  init: function (fig) {
    var A = LABO, C = A.C, g = A.s("g", null, fig.svg);
    var n = { g: g, libre: true, faux: {}, pl: { P: function (v) { return v; } } };
    var T = [null, "oui", "non"], ST = { oui: { t: "on peut le poser", f: C.okPale, b: C.ok }, non: { t: "à éviter", f: C.koPale, b: C.ko } };
    n.ITEMS = [["Bécher en verre", "oui"], ["Laminé métallique", "non"], ["Fiole Erlenmeyer", "oui"], ["Verrerie à bas point de fusion", "non"], ["Matériau isolant", "non"], ["Tube à essais dans son support", "oui"]]
      .map(function (x) { return { t: x[0], z: x[1], choix: null }; });
    n.classer = function () {
      A.vider(g);
      n.ITEMS.forEach(function (it, i) {
        var x = 30 + (i % 2) * 320, y = 40 + Math.floor(i / 2) * 180, st = it.choix ? ST[it.choix] : null;
        A.boite(g, x, y, 300, 150, { fond: st ? st.f : "#fff", bord: n.faux[i] ? C.ko : st ? st.b : C.trait, ep: n.faux[i] ? 4 : 2.5, rx: 14, titre: it.t, sous: st ? st.t : "à classer", taille: 20, coulSous: st ? st.b : C.gris });
        A.cible(g, x, y, 300, 150, function () { if (!n.libre) return; it.choix = T[(T.indexOf(it.choix) + 1) % T.length]; delete n.faux[i]; n.classer(); });
      });
    };
    return n;
  },
  etapes: [
    { nom: "Jusqu'où chauffer ?", jouer: function (j, n) {
      var A = LABO, C = A.C; A.vider(n.g); A.icone(n.g, "feu", [340, 260], 220, C.chaud);
      j.titre("Jusqu'à quelle température, environ, un agitateur chauffant peut-il chauffer d'après le cours ?");
      j.nombre({ avant: "T_{\\max} \\approx", apres: "^\\circ\\text{C}", cases: [{ attendu: 500, tol: 0 }],
        aide: function () { return "Bien au-delà de l'ébullition de l'eau : quelques centaines de degrés."; },
        ok: function () { j.bravo("Environ 500 °C ; et de 60 à environ 1 200 tr/min pour l'agitation."); j.suite(); } });
    } },
    { nom: "La plaque ne chauffe pas", jouer: function (j, n) {
      var A = LABO, C = A.C; A.vider(n.g);
      A.s("rect", { x: 140, y: 300, width: 400, height: 30, rx: 8, fill: "#e6e8ee", stroke: C.encre, "stroke-width": 4 }, n.g);
      A.s("rect", { x: 160, y: 330, width: 360, height: 90, rx: 14, fill: C.fond, stroke: C.encre, "stroke-width": 4 }, n.g);
      A.texte(n.g, "ON · 200 °C demandés · plaque froide", [340, 470], { taille: 22, gras: 800 });
      j.titre("L'agitateur est branché, l'interrupteur est sur ON, mais la plaque ne chauffe pas. Que suggère le cours ?");
      j.choix([
        { html: "Remplacer la surface en céramique", aide: "La céramique se remplace quand elle est cassée." },
        { html: "Vérifier et remplacer le fusible, appareil éteint et débranché", juste: true },
        { html: "Monter la vitesse d'agitation", aide: "La vitesse ne commande pas le chauffage." }
      ], { colonnes: 1, ok: function () { j.bravo("Un fusible, de mêmes caractéristiques, après avoir mis sur OFF et débranché."); j.suite(); } });
    } },
    { nom: "Ce qu'on pose", jouer: function (j, n) {
      n.classer();
      j.titre("Qu'est-ce qu'on peut poser sur la plaque, et qu'est-ce qu'il faut éviter ?");
      j.consigne("Touche une case pour la classer.");
      var bt = E.h("button", "btn bleu", "Vérifier", j.el); bt.type = "button";
      function gagner() {
        n.libre = false; bt.remove(); n.classer();
        j.bravo("La verrerie de laboratoire, oui ; laminés métalliques, isolants et verrerie à bas point de fusion, non.");
        j.suite();
      }
      bt.addEventListener("click", function () {
        var faux = 0;
        n.ITEMS.forEach(function (it, i) { if (it.choix !== it.z) { n.faux[i] = true; faux++; } });
        n.classer();
        if (faux) { j.erreur(faux + (faux > 1 ? " cases sont mal classées." : " case est mal classée.") + " Le cours cite trois choses à éviter."); return; }
        gagner();
      });
      j.reponse(function () { n.ITEMS.forEach(function (it) { it.choix = it.z; }); n.faux = {}; gagner(); });
    } },
    { nom: "Juste après l'arrêt", jouer: function (j, n) {
      var A = LABO, C = A.C; A.vider(n.g);
      A.s("rect", { x: 140, y: 300, width: 400, height: 30, rx: 8, fill: "#f6b38a", stroke: C.encre, "stroke-width": 4 }, n.g);
      A.s("rect", { x: 160, y: 330, width: 360, height: 90, rx: 14, fill: C.fond, stroke: C.encre, "stroke-width": 4 }, n.g);
      A.texte(n.g, "OFF, débranché", [340, 470], { taille: 24, gras: 800 });
      j.titre("On vient d'éteindre et de débrancher l'agitateur. Peut-on poser la main sur la plaque ?");
      j.choix([
        { html: "Oui : débranché, il ne chauffe plus", aide: "Il ne chauffe plus, mais la chaleur accumulée reste." },
        { html: "Non : la surface peut rester chaude longtemps", juste: true }
      ], { colonnes: 2, ok: function () { j.bravo("La surface reste chaude longtemps après l'arrêt."); j.suite(); } });
    } },
    { nom: "La place autour", jouer: function (j, n) {
      var A = LABO, C = A.C; A.vider(n.g);
      A.boite(n.g, 220, 200, 240, 160, { fond: "#fff", bord: C.encre, ep: 3, rx: 16, titre: "agitateur", taille: 24 });
      A.s("rect", { x: 160, y: 140, width: 360, height: 280, rx: 24, fill: "none", stroke: C.jeu, "stroke-width": 3, "stroke-dasharray": "10 8" }, n.g);
      A.texte(n.g, "? cm", [190, 120], { taille: 24, gras: 800, coul: C.jeu });
      j.titre("Quel espace libre autour de l'appareil certains fabricants recommandent-ils ?");
      j.nombre({ avant: "\\approx", apres: "\\text{cm}", cases: [{ attendu: 15, tol: 0 }],
        aide: function () { return "Assez pour le raccordement électrique et pour poser le matériel ; le cours donne une valeur entre 10 et 20 cm."; },
        ok: function () { j.bravo("Environ 15 cm."); j.suite(); } });
    } }
  ]
}));
