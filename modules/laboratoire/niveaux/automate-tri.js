/* Niveau : l'automate de tri (7.3) : orienter un tube, composants, Gel-Check, caillot, avantages. */
NIVEAU(LABO.rejouable({
  id: "automate-tri",
  init: function (fig) {
    var A = LABO, C = A.C, g = A.s("g", null, fig.svg);
    var n = { g: g, libre: true, faux: {}, pl: { P: function (v) { return v; } } };
    var T = [null, "direct", "centri"], ST = { direct: { t: "directement à l'analyse", f: C.okPale, b: C.ok }, centri: { t: "d'abord centrifugé", f: C.accPale, b: C.acc } };
    n.ITEMS = [["EDTA pour une NFS", "direct"], ["Tube sec pour une glycémie", "centri"], ["Citrate pour un TP", "centri"], ["EDTA pour une formule leucocytaire", "direct"]]
      .map(function (x) { return { t: x[0], z: x[1], choix: null }; });
    n.classer = function () {
      A.vider(g);
      n.ITEMS.forEach(function (it, i) {
        var x = 30 + (i % 2) * 320, y = 60 + Math.floor(i / 2) * 250, st = it.choix ? ST[it.choix] : null;
        A.boite(g, x, y, 300, 200, { fond: st ? st.f : "#fff", bord: n.faux[i] ? C.ko : st ? st.b : C.trait, ep: n.faux[i] ? 4 : 2.5, rx: 14, titre: it.t, sous: st ? st.t : "à classer", taille: 21, coulSous: st ? st.b : C.gris });
        A.cible(g, x, y, 300, 200, function () { if (!n.libre) return; it.choix = T[(T.indexOf(it.choix) + 1) % T.length]; delete n.faux[i]; n.classer(); });
      });
    };
    return n;
  },
  etapes: [
    { nom: "Centrifuger ou pas ?", jouer: function (j, n) {
      n.classer();
      j.titre("Le trieur sépare les tubes qui doivent être centrifugés des autres. Classe-les.");
      j.consigne("Touche une case pour la classer.");
      var bt = E.h("button", "btn bleu", "Vérifier", j.el); bt.type = "button";
      function gagner() {
        n.libre = false; bt.remove(); n.classer();
        j.bravo("Les EDTA d'hématologie partent directement ; sérum et plasma passent d'abord par la centrifugeuse.");
        j.suite();
      }
      bt.addEventListener("click", function () {
        var faux = 0;
        n.ITEMS.forEach(function (it, i) { if (it.choix !== it.z) { n.faux[i] = true; faux++; } });
        n.classer();
        if (faux) { j.erreur(faux + (faux > 1 ? " cases sont mal classées." : " case est mal classée.") + " L'hématologie compte des cellules dans le sang total : faut-il les séparer ?"); return; }
        gagner();
      });
      j.reponse(function () { n.ITEMS.forEach(function (it) { it.choix = it.z; }); n.faux = {}; gagner(); });
    } },
    { nom: "Le chemin dans le trieur", jouer: function (j, n) {
      var A = LABO, C = A.C;
      j.titre("Remets dans l'ordre les modules qu'un tube traverse.");
      j.consigne("Touche les modules dans l'ordre.");
      var N = ["Robotique : pince et déboucheur", "Vision : code-barres et bouchon", "Sortie : convoyeur vers l'automate", "Chargement en vrac", "Contrôle qualité : niveau et Gel-Check"];
      var t = A.trace({
        g: n.g, coul: C.jeu, taille: 21, fleches: false,
        noeuds: N.map(function (x, i) { return { t: x, x: 90, y: 40 + i * 108, w: 500, h: 84 }; }),
        ordre: [3, 1, 4, 0, 2],
        erreur: function (m) { j.erreur(m); },
        aide: function (i, att, k) { return ["Les tubes entrent d'abord.", "On identifie le tube.", "On vérifie qu'il est analysable.", "On l'ouvre.", "Il part vers sa destination."][k]; },
        fin: function () { j.bravo("Chargement, vision, contrôle, robotique, sortie."); j.suite(); }
      });
      j.reponse(function () { t.resoudre(); });
    } },
    { nom: "Un sérum rouge", jouer: function (j, n) {
      var A = LABO, C = A.C; A.vider(n.g);
      A.tube(n.g, 290, 130, { bouchon: "sec", w: 100, h: 320, couches: [{ h: 0.4, coul: "#8f1d1d" }, { h: 0.06, coul: "#c9ccd3" }, { h: 0.34, coul: "#d9534f" }] });
      A.texte(n.g, "sérum rouge", [340, 500], { taille: 22, gras: 800, coul: C.ko });
      j.titre("Quel module du trieur repère que ce sérum est hémolysé, avant qu'il parte sur l'analyseur ?");
      j.choix([
        { html: "Le Gel-Check, qui regarde le gel et l'indice de sérum", juste: true },
        { html: "Le lecteur de code-barres", aide: "Il identifie le tube, il ne regarde pas le sérum." },
        { html: "Le déboucheur", aide: "Il ouvre le tube, sans le juger." }
      ], { colonnes: 1, ok: function () { j.bravo("Le Gel-Check : gel séparateur et indices d'hémolyse, d'ictère, de lipémie."); j.suite(); } });
    } },
    { nom: "Un caillot dans la pipette", jouer: function (j, n) {
      var A = LABO, C = A.C; A.vider(n.g);
      A.s("rect", { x: 320, y: 40, width: 40, height: 300, rx: 8, fill: "#fff", stroke: C.encre, "stroke-width": 3 }, n.g);
      A.tube(n.g, 280, 280, { bouchon: null, w: 120, h: 240, couches: [{ h: 0.45, coul: "#8f1d1d" }, { h: 0.35, coul: C.plasma }] });
      A.s("circle", { cx: 340, cy: 345, r: 16, fill: "#5a0f0f" }, n.g);
      j.titre("Pendant l'aliquotage, la pipette aspire un petit caillot. Comment l'automate s'en rend-il compte ?");
      j.choix([
        { html: "Un capteur de pression détecte une surpression anormale, stoppe l'aspiration et alerte", juste: true },
        { html: "La caméra 3D voit le caillot à travers le tube", aide: "La caméra regarde le tube et le bouchon ; le cours confie ce rôle à un capteur dans le circuit d'aspiration." },
        { html: "Il ne s'en rend pas compte : c'est l'analyseur qui le verra", aide: "Le cours décrit justement une détection pendant l'aspiration." }
      ], { colonnes: 1, ok: function () { j.bravo("Capteur de pression : arrêt et alerte, pour ne pas boucher les circuits ni fausser le dosage."); j.suite(); } });
    } },
    { nom: "La cadence", jouer: function (j, n) {
      var A = LABO; A.vider(n.g); A.icone(n.g, "robot", [340, 240], 220, A.C.jeu);
      j.titre("D'après le cours, les bras robotisés peuvent dépasser quelle cadence, en tubes par heure ?");
      j.nombre({ avant: "> ", apres: "\\text{tubes/h}", cases: [{ attendu: 1000, tol: 0 }],
        aide: function () { return "Un nombre rond, à quatre chiffres."; },
        ok: function () { j.bravo("Plus de 1 000 tubes par heure."); j.suite(); } });
    } }
  ]
}));
