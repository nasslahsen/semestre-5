/* Niveau : l'automate d'étiquetage (7.2) : étapes, impression thermique directe ou transfert, maintenance, avantages. */
NIVEAU(LABO.rejouable({
  id: "etiqueteuse",
  init: function (fig) {
    var A = LABO, C = A.C, g = A.s("g", null, fig.svg);
    var n = { g: g, libre: true, faux: {}, pl: { P: function (v) { return v; } } };
    var T = [null, "jour", "semaine", "mois"], ST = { jour: { t: "chaque jour", f: C.jeuPale, b: C.jeu }, semaine: { t: "chaque semaine", f: C.accPale, b: C.acc }, mois: { t: "mois à trimestre", f: C.vPale, b: C.v } };
    n.ITEMS = [["Nettoyer la tête d'impression", "jour"], ["Nettoyer les capteurs", "semaine"], ["Lubrifier axes et engrenages", "mois"], ["Calibrer les capteurs", "mois"], ["Désinfecter les surfaces", "jour"], ["Vérifier la tension de la bande", "semaine"]]
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
    { nom: "Les étapes", jouer: function (j, n) {
      var A = LABO, C = A.C;
      j.titre("Remets dans l'ordre le travail de l'automate d'étiquetage.");
      j.consigne("Touche les étapes dans l'ordre.");
      var N = ["Collage par roulement", "Sélection du bon tube", "Réception de l'ordre du LIS", "Éjection et traçabilité", "Détection de la position du tube", "Impression thermique"];
      var t = A.trace({
        g: n.g, coul: C.jeu, taille: 21, fleches: false,
        noeuds: N.map(function (x, i) { return { t: x, x: 140, y: 30 + i * 92, w: 400, h: 74 }; }),
        ordre: [2, 1, 4, 5, 0, 3],
        erreur: function (m) { j.erreur(m); },
        aide: function (i, att, k) { return ["Tout part de la prescription.", "Il faut le bon type de tube.", "Le tube arrive dans une position quelconque.", "On imprime l'étiquette.", "On la pose en faisant tourner le tube.", "Le tube sort, son statut est enregistré."][k]; },
        fin: function () { j.bravo("Ordre, tube, position, impression, collage, éjection."); j.suite(); }
      });
      j.reponse(function () { t.resoudre(); });
    } },
    { nom: "Après le congélateur", jouer: function (j, n) {
      var A = LABO, C = A.C; A.vider(n.g); A.icone(n.g, "flocon", [200, 260], 160, C.froid); A.icone(n.g, "codebarre", [480, 260], 160, C.encre);
      j.titre("Les aliquotes iront à −80 °C, seront centrifugées et essuyées à l'alcool. Quelle impression pour leurs étiquettes ?");
      j.choix([
        { html: "Thermique directe, sans ruban", aide: "Le papier thermosensible s'altère à la chaleur, à la lumière, aux frottements." },
        { html: "Transfert thermique avec ruban en résine", juste: true }
      ], { colonnes: 2, ok: function () { j.bravo("Transfert thermique sur résine : résiste au froid, aux solvants et au sang."); j.suite(); } });
    } },
    { nom: "Le calendrier", jouer: function (j, n) {
      n.classer();
      j.titre("Classe chaque opération de maintenance selon sa fréquence.");
      j.consigne("Touche une case pour changer sa fréquence.");
      var bt = E.h("button", "btn bleu", "Vérifier", j.el); bt.type = "button";
      function gagner() {
        n.libre = false; bt.remove(); n.classer();
        j.bravo("Tête et surfaces chaque jour, capteurs et bande chaque semaine, lubrification et calibration chaque mois ou trimestre.");
        j.suite();
      }
      bt.addEventListener("click", function () {
        var faux = 0;
        n.ITEMS.forEach(function (it, i) { if (it.choix !== it.z) { n.faux[i] = true; faux++; } });
        n.classer();
        if (faux) { j.erreur(faux + (faux > 1 ? " cases sont mal classées." : " case est mal classée.") + " Ce qui se salit en travaillant est quotidien ; ce qui se règle est le plus espacé."); return; }
        gagner();
      });
      j.reponse(function () { n.ITEMS.forEach(function (it) { it.choix = it.z; }); n.faux = {}; gagner(); });
    } },
    { nom: "Ce qu'il ne faut pas lubrifier", jouer: function (j, n) {
      var A = LABO; A.vider(n.g); A.icone(n.g, "cle", [340, 260], 200, A.C.jeu);
      j.titre("Lors de la lubrification, que ne faut-il jamais lubrifier ?");
      j.choix([
        { html: "Les axes mécaniques", aide: "Ce sont eux qu'on lubrifie, si le fabricant le recommande." },
        { html: "La tête d'impression et les rouleaux en caoutchouc", juste: true },
        { html: "Les engrenages", aide: "Eux aussi se lubrifient, avec un lubrifiant sec ou une huile fine." }
      ], { colonnes: 1, ok: function () { j.bravo("Jamais la tête d'impression ni les rouleaux en caoutchouc."); j.suite(); } });
    } },
    { nom: "Le papier thermique", jouer: function (j, n) {
      var A = LABO, C = A.C; A.vider(n.g);
      A.s("rect", { x: 120, y: 220, width: 440, height: 120, rx: 10, fill: "#fff", stroke: C.encre, "stroke-width": 3 }, n.g);
      A.s("rect", { x: 260, y: 160, width: 160, height: 60, rx: 8, fill: C.chaudPale, stroke: C.chaud, "stroke-width": 3 }, n.g);
      A.texte(n.g, "tête chauffante", [340, 140], { taille: 20, gras: 800, coul: C.chaud });
      j.titre("Sur un papier thermique, qu'est-ce qui fait apparaître le noir quand la tête chauffe ?");
      j.choix([
        { html: "La cire fond, l'acide donne un proton au colorant leucobase, qui devient coloré", juste: true },
        { html: "Le papier brûle légèrement", aide: "Le cours décrit une réaction chimique, pas une combustion." },
        { html: "Une encre est déposée par un ruban", aide: "Ça, c'est le transfert thermique." }
      ], { colonnes: 1, ok: function () { j.bravo("Sensibilisateur fondu, développeur acide, colorant leucobase."); j.suite(); } });
    } }
  ]
}));
