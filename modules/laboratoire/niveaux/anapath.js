/* Niveau : ce qu'étudie l'anapath, ses missions, biopsie ou pièce opératoire, fixation, délais (chapitre 6). */

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
  id: "anapath",
  init: function (fig) {
    var A = LABO, g = A.s("g", null, fig.svg);
    return { g: g, pl: { P: function (v) { return v; } } };
  },
  etapes: [
    { nom: "Une question pour l'anapath", jouer: function (j, n) {
      var A = LABO; A.vider(n.g); A.icone(n.g, "microscope", [340, 280], 230, A.C.jeu);
      j.titre("Laquelle de ces questions est une question pour le laboratoire d'anatomopathologie ?");
      j.choix([
        { html: "Quel est le taux de glucose du patient ?", aide: "Une substance mesurée dans le sang : c'est la biologie clinique." },
        { html: "Ce nodule est-il bénin ou malin ?", juste: true },
        { html: "Combien de globules rouges par litre ?", aide: "Un comptage dans le sang : c'est l'hématologie." }
      ], { colonnes: 1, ok: function () {
        j.bravo("L'anapath regarde les tissus et les cellules eux-mêmes pour un diagnostic de certitude.");
        j.expliquer("<p>La biologie clinique mesure des <b>substances</b> ; l'anatomopathologie étudie la <b>morphologie</b> des tissus (histologie) et des cellules (cytologie).</p>");
        j.suite();
      } });
    } },
    { nom: "Les quatre missions", jouer: function (j, n) {
      var A = LABO; A.vider(n.g);
      j.titre("Relie chaque demande à la mission de l'anapath qui y répond.");
      j.consigne("Touche une demande à gauche, puis sa mission à droite.");
      var p = A.paires({
        g: n.g, gauche: ["Un frottis à examiner", "Une pièce incluse en paraffine et colorée", "Le statut HER2 pour un traitement ciblé", "Cancer, inflammation ou infection ?"],
        droite: ["Diagnostic", "Analyses avancées", "Cytologie", "Histopathologie"],
        bon: [2, 3, 1, 0], xg: 20, wg: 330, xd: 400, wd: 260, y0: 70, h: 104, pas: 130, taille: 17,
        erreur: function (m) { j.erreur(m); },
        aide: function (i) { return ["Des cellules isolées : quelle mission étudie les cellules ?", "Des tissus fixés, inclus, colorés : c'est l'étude des tissus.", "Un marqueur qui guide un traitement : immunohistochimie, biologie moléculaire.", "Identifier la nature d'une lésion : c'est la première mission."][i]; },
        fin: function () { j.bravo("Diagnostic, cytologie, histopathologie, analyses avancées."); j.suite(); }
      });
      j.reponse(function () { p.resoudre(); });
    } },
    { nom: "Biopsie ou pièce opératoire", jouer: function (j, n) {
      var C = LABO.C;
      classer2(j, n, {
        titre: "Chaque phrase décrit une biopsie ou une pièce opératoire. Classe-les.",
        consigne: "Touche une case : biopsie, puis pièce opératoire.",
        cles: ["b", "p"], st: { b: { t: "biopsie", f: C.froidPale, b: C.froid }, p: { t: "pièce opératoire", f: C.vPale, b: C.v } },
        items: [["Fragment prélevé à l'aiguille", "b"], ["Organe entier retiré au bloc", "p"], ["Confirmer un diagnostic", "b"], ["Vérifier que les bords sont sains", "p"], ["Résultat vers 4 jours", "b"], ["Résultat en 8 jours ou plus", "p"]],
        aide: "Petit prélèvement ciblé pour le diagnostic, ou toute la lésion avec une marge de tissu sain ?",
        bravo: "La biopsie confirme un diagnostic ; la pièce opératoire donne le stade et l'état des marges."
      });
    } },
    { nom: "Combien de temps dans le formol", jouer: function (j, n) {
      var A = LABO, C = A.C; A.vider(n.g);
      A.s("rect", { x: 240, y: 150, width: 200, height: 260, rx: 24, fill: C.froidPale, stroke: C.encre, "stroke-width": 5 }, n.g);
      A.s("rect", { x: 260, y: 110, width: 160, height: 46, rx: 10, fill: C.jeu, stroke: C.encre, "stroke-width": 4 }, n.g);
      A.s("ellipse", { cx: 340, cy: 330, rx: 34, ry: 18, fill: "#e8a0a0", stroke: C.encre, "stroke-width": 3 }, n.g);
      A.texte(n.g, "biopsie", [340, 450], { taille: 22, gras: 800 });
      j.titre("Une biopsie vient d'être plongée dans le formol. Combien d'heures de fixation au minimum ?");
      j.nombre({ avant: "t_{\\min} =", apres: "\\text{h}", cases: [{ attendu: 6, tol: 0 }],
        aide: function () { return "Moins d'une demi-journée pour un petit fragment ; la pièce opératoire, elle, demande au moins une journée."; },
        ok: function () { j.bravo("6 heures au minimum pour une biopsie ; 24 heures ou plus pour une pièce opératoire."); j.suite(); } });
    } },
    { nom: "Pourquoi plus long", jouer: function (j, n) {
      var A = LABO; A.vider(n.g); A.icone(n.g, "horloge", [340, 280], 220, A.C.jeu);
      j.titre("Pourquoi le résultat d'une pièce opératoire arrive-t-il plus tard que celui d'une biopsie ?");
      j.choix([
        { html: "Parce qu'elle est plus grande et que ses examens sont plus complexes", juste: true },
        { html: "Parce qu'elle n'est pas fixée au formol", aide: "Elle est fixée aussi, et même plus longtemps." },
        { html: "Parce qu'elle part dans un autre laboratoire", aide: "Le cours donne une raison liée à la pièce elle-même." }
      ], { colonnes: 1, ok: function () { j.bravo("Taille et complexité : souvent 8 jours ou plus, contre autour de 4 jours pour une biopsie."); j.suite(); } });
    } }
  ]
}));
