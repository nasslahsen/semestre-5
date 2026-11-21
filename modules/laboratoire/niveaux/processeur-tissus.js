/* Niveau : le processeur de tissus : déshydratation, clarification, imprégnation, carrousel ou cuve unique (chapitre 6). */

// Classement en deux catégories (touches successives), grille 2 × 3 : mêmes positions que l'agitateur chauffant.
function classer2(j, n, cfg) {
  var A = LABO, C = A.C, T = [null].concat(cfg.cles), libre = true, faux = {};
  var items = cfg.items.map(function (x) { return { t: x[0], z: x[1], choix: null }; });
  function dessin() {
    A.vider(n.g);
    items.forEach(function (it, i) {
      var x = 30 + (i % 2) * 320, y = 40 + Math.floor(i / 2) * 180, st = it.choix ? cfg.st[it.choix] : null;
      A.boite(n.g, x, y, 300, 150, { fond: st ? st.f : "#fff", bord: faux[i] ? C.ko : st ? st.b : C.trait, ep: faux[i] ? 4 : 2.5, rx: 14, titre: it.t, sous: st ? st.t : "à classer", taille: 19, coulSous: st ? st.b : C.gris });
      A.cible(n.g, x, y, 300, 150, function () { if (!libre) return; it.choix = T[(T.indexOf(it.choix) + 1) % T.length]; delete faux[i]; dessin(); });
    });
  }
  dessin();
  j.titre(cfg.titre);
  j.consigne(cfg.consigne);
  var bt = E.h("button", "btn bleu", "Vérifier", j.el); bt.type = "button";
  function gagner() { libre = false; bt.remove(); dessin(); j.bravo(cfg.bravo); if (cfg.expliquer) j.expliquer(cfg.expliquer); j.suite(); }
  bt.addEventListener("click", function () {
    var k = 0;
    items.forEach(function (it, i) { if (it.choix !== it.z) { faux[i] = true; k++; } });
    dessin();
    if (k) { j.erreur(k + (k > 1 ? " cases sont mal classées" : " case est mal classée") + " (bord rouge). " + cfg.aide); return; }
    gagner();
  });
  j.reponse(function () { items.forEach(function (it) { it.choix = it.z; }); faux = {}; gagner(); });
}
NIVEAU(LABO.rejouable({
  id: "processeur-tissus",
  init: function (fig) {
    var A = LABO, g = A.s("g", null, fig.svg);
    return { g: g, pl: { P: function (v) { return v; } } };
  },
  etapes: [
    { nom: "Les trois étapes", jouer: function (j, n) {
      var A = LABO, C = A.C;
      j.titre("Dans quel ordre le processeur traite-t-il un tissu fixé ?");
      j.consigne("Touche les quatre étapes dans l'ordre.");
      var N = ["Imprégnation", "Tissu fixé au formol", "Clarification", "Déshydratation"];
      var t = A.trace({
        g: n.g, coul: C.jeu, taille: 22, fleches: false,
        noeuds: N.map(function (x, i) { return { t: x, x: 110, y: 50 + i * 130, w: 460, h: 96 }; }),
        ordre: [1, 3, 2, 0],
        erreur: function (m) { j.erreur(m); },
        aide: function (i, att, k) { return ["On part du tissu qui sort du formol.", "Il est plein d'eau : on la retire d'abord.", "L'alcool doit être remplacé par un agent qui se mélange à la paraffine.", "La paraffine entre en dernier."][k]; },
        fin: function () { j.bravo("Déshydratation, clarification, imprégnation."); j.suite(); }
      });
      j.reponse(function () { t.resoudre(); });
    } },
    { nom: "Des alcools croissants", jouer: function (j, n) {
      var A = LABO, C = A.C; A.vider(n.g);
      [0, 1, 2, 3].forEach(function (k) { A.s("rect", { x: 120 + k * 120, y: 200, width: 90, height: 160, rx: 10, fill: C.froid, opacity: 0.2 + 0.2 * k, stroke: C.encre, "stroke-width": 3 }, n.g); });
      A.fleche(n.g, [120, 400], [560, 400], { coul: C.encre, ep: 4 });
      A.texte(n.g, "concentration en alcool", [340, 440], { taille: 20 });
      j.titre("Pourquoi faire passer le tissu dans des alcools de concentrations croissantes ?");
      j.choix([
        { html: "Pour retirer l'eau progressivement", juste: true },
        { html: "Pour colorer les noyaux", aide: "La coloration vient bien plus tard, sur la lame." },
        { html: "Pour faire fondre la paraffine", aide: "La paraffine fond par la chaleur, vers 60 °C." }
      ], { colonnes: 1, ok: function () { j.bravo("La déshydratation : l'eau part peu à peu."); j.suite(); } });
    } },
    { nom: "Le rôle du xylène", jouer: function (j, n) {
      var A = LABO; A.vider(n.g); A.icone(n.g, "goutte", [340, 280], 220, A.C.v);
      j.titre("Pourquoi passe-t-on le tissu dans le xylène (ou un substitut) entre l'alcool et la paraffine ?");
      j.choix([
        { html: "Parce qu'il se mélange à la fois à l'alcool et à la paraffine", juste: true },
        { html: "Parce qu'il fixe le tissu", aide: "La fixation a eu lieu dans le formol, avant." },
        { html: "Parce qu'il durcit le bloc", aide: "C'est la paraffine refroidie qui fait le bloc." }
      ], { colonnes: 1, ok: function () { j.bravo("La clarification : un relais entre l'alcool et la paraffine."); j.suite(); } });
    } },
    { nom: "La paraffine", jouer: function (j, n) {
      var A = LABO, C = A.C; A.vider(n.g); A.icone(n.g, "thermo", [340, 250], 200, C.chaud);
      j.titre("À quelle température environ la paraffine fondue imprègne-t-elle les tissus ?");
      j.nombre({ avant: "T \\approx", apres: "^\\circ\\text{C}", cases: [{ attendu: 60, tol: 0 }],
        aide: function () { return "Assez chaud pour qu'elle soit liquide, bien en dessous de l'ébullition de l'eau."; },
        ok: function () { j.bravo("Vers 60 °C, souvent sous vide pour qu'elle pénètre au cœur des cellules."); j.suite(); } });
    } },
    { nom: "Carrousel ou cuve unique", jouer: function (j, n) {
      var C = LABO.C;
      classer2(j, n, {
        titre: "Chaque phrase décrit un processeur à carrousel ou un processeur sous vide à cuve unique. Classe-les.",
        consigne: "Touche une case : carrousel, puis cuve unique.",
        cles: ["c", "u"], st: { c: { t: "carrousel", f: C.jeuPale, b: C.jeu }, u: { t: "cuve unique", f: C.froidPale, b: C.froid } },
        items: [["Les paniers vont de station en station", "c"], ["Les liquides sont pompés dans la cuve", "u"], ["Jusqu'à 200 cassettes par cycle", "u"], ["Stations disposées en cercle", "c"], ["Le vide accélère la pénétration", "u"], ["Le panier tourne, vibre, centrifuge", "c"]],
        aide: "Dans le carrousel, ce sont les tissus qui bougent ; dans la cuve unique, ce sont les liquides.",
        bravo: "Carrousel : les paniers bougent. Cuve unique : les tissus restent, les réactifs défilent."
      });
    } }
  ]
}));
