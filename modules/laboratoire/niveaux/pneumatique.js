/* Niveau : le transport pneumatique (7.3) : cycle d'un envoi, freinage, couleurs des capsules, priorité, maintenance. */
NIVEAU(LABO.rejouable({
  id: "pneumatique",
  init: function (fig) {
    var A = LABO, C = A.C, g = A.s("g", null, fig.svg);
    var n = { g: g, libre: true, faux: {}, pl: { P: function (v) { return v; } } };
    var T = [null, "prev", "corr"], ST = { prev: { t: "préventive", f: C.jeuPale, b: C.jeu }, corr: { t: "corrective", f: C.koPale, b: C.ko } };
    n.ITEMS = [["Extraire une cartouche coincée", "corr"], ["Envois tests entre services", "prev"], ["Purger les condensats", "corr"], ["Remplacer les filtres des turbines", "prev"]]
      .map(function (x) { return { t: x[0], z: x[1], choix: null }; });
    n.classer = function () {
      A.vider(g);
      n.ITEMS.forEach(function (it, i) {
        var x = 30 + (i % 2) * 320, y = 60 + Math.floor(i / 2) * 250, st = it.choix ? ST[it.choix] : null;
        A.boite(g, x, y, 300, 200, { fond: st ? st.f : "#fff", bord: n.faux[i] ? C.ko : st ? st.b : C.trait, ep: n.faux[i] ? 4 : 2.5, rx: 14, titre: it.t, sous: st ? st.t : "à classer", taille: 21, coulSous: st ? st.b : C.gris });
        A.cible(g, x, y, 300, 200, function () { if (!n.libre) return; it.choix = T[(T.indexOf(it.choix) + 1) % T.length]; delete n.faux[i]; n.classer(); });
      });
    };
    n.CAPS = [["#e5484d", "rouge"], ["#3b5bdb", "bleue"], ["#f2c94c", "jaune"]];
    n.capsules = function (sel, faux) {
      A.vider(g);
      n.CAPS.forEach(function (c, i) {
        var x = 110 + i * 170, on = sel === i, ko = faux === i;
        A.s("rect", { x: x, y: 150, width: 110, height: 260, rx: 40, fill: c[0], stroke: ko ? C.ko : on ? C.ok : C.encre, "stroke-width": on || ko ? 7 : 3 }, g);
        A.texte(g, c[1], [x + 55, 450], { taille: 22, gras: 800 });
        A.cible(g, x - 20, 130, 150, 340, function () { if (n.toucher) n.toucher(i); });
      });
    };
    return n;
  },
  etapes: [
    { nom: "Un envoi complet", jouer: function (j, n) {
      var A = LABO, C = A.C;
      j.titre("Remets dans l'ordre un envoi par le pneumatique.");
      j.consigne("Touche les étapes dans l'ordre.");
      var N = ["La cartouche voyage dans le flux d'air", "Le soignant badge et choisit le laboratoire", "Un capteur détecte l'arrivée et coupe l'air", "L'échantillon est placé dans la cartouche", "Les aiguillages se positionnent, la turbine démarre"];
      var t = A.trace({
        g: n.g, coul: C.jeu, taille: 20, fleches: false,
        noeuds: N.map(function (x, i) { return { t: x, x: 90, y: 40 + i * 108, w: 500, h: 84 }; }),
        ordre: [3, 1, 4, 0, 2],
        erreur: function (m) { j.erreur(m); },
        aide: function (i, att, k) { return ["On commence par charger.", "Il faut une destination.", "Le réseau se prépare.", "Le transit.", "L'arrivée."][k]; },
        fin: function () { j.bravo("Chargement, identification, aiguillages et turbine, transit, réception."); j.suite(); }
      });
      j.reponse(function () { t.resoudre(); });
    } },
    { nom: "Freiner sans casser", jouer: function (j, n) {
      var A = LABO, C = A.C; A.vider(n.g);
      A.s("rect", { x: 300, y: 40, width: 80, height: 420, fill: C.fond, stroke: C.encre, "stroke-width": 3 }, n.g);
      A.s("rect", { x: 312, y: 120, width: 56, height: 90, rx: 18, fill: C.ko, stroke: C.encre, "stroke-width": 3 }, n.g);
      A.s("rect", { x: 290, y: 460, width: 100, height: 14, fill: C.encre }, n.g);
      A.texte(n.g, "vanne d'échappement", [500, 467], { taille: 18, gras: 800 });
      j.titre("Juste avant l'arrivée, la vanne d'échappement sous la station se ferme. Qu'est-ce qui freine alors la cartouche ?");
      j.choix([
        { html: "L'air piégé devant elle, qui se comprime : un coussin d'air", juste: true },
        { html: "Un frein à friction sur les parois du tube", aide: "Le cours décrit un freinage pneumatique, sans contact." },
        { html: "La turbine qui s'inverse à pleine puissance", aide: "Le principal frein est passif : l'air qui ne peut plus s'échapper." }
      ], { colonnes: 1, ok: function () { j.bravo("Effet piston : l'air comprimé freine, puis les amortisseurs finissent le travail."); j.suite(); } });
    } },
    { nom: "La capsule urgente", jouer: function (j, n) {
      n.capsules();
      j.titre("Un prélèvement pour une urgence vitale part au laboratoire. Quelle couleur de capsule choisir ?");
      j.consigne("Touche la capsule.");
      function gagner() { n.toucher = null; n.capsules(0); j.bravo("Rouge : urgences vitales (STAT)."); j.expliquer("<p>Bleu ou vert pour la routine (biochimie, hématologie) ; jaune pour les déchets ou les prélèvements à risque biologique.</p>"); j.suite(); }
      n.toucher = function (i) {
        if (i !== 0) { n.capsules(null, i); j.erreur(i === 1 ? "Le bleu (ou le vert) est pour la routine." : "Le jaune signale un risque biologique."); return; }
        gagner();
      };
      j.reponse(gagner);
    } },
    { nom: "Préventive ou corrective ?", jouer: function (j, n) {
      n.classer();
      j.titre("Classe chaque intervention sur le réseau pneumatique.");
      j.consigne("Touche une case pour la classer.");
      var bt = E.h("button", "btn bleu", "Vérifier", j.el); bt.type = "button";
      function gagner() {
        n.libre = false; bt.remove(); n.classer();
        j.bravo("Préventive : planifiée, souvent annuelle. Corrective : au jour le jour, sur incident.");
        j.suite();
      }
      bt.addEventListener("click", function () {
        var faux = 0;
        n.ITEMS.forEach(function (it, i) { if (it.choix !== it.z) { n.faux[i] = true; faux++; } });
        n.classer();
        if (faux) { j.erreur(faux + (faux > 1 ? " cases sont mal classées." : " case est mal classée.") + " Une intervention prévue d'avance est préventive ; une réponse à un problème est corrective."); return; }
        gagner();
      });
      j.reponse(function () { n.ITEMS.forEach(function (it) { it.choix = it.z; }); n.faux = {}; gagner(); });
    } },
    { nom: "La vitesse", jouer: function (j, n) {
      var A = LABO; A.vider(n.g); A.icone(n.g, "horloge", [340, 240], 200, A.C.jeu);
      j.titre("Autour de quelle vitesse, en mètres par seconde, le cours conseille-t-il de régler le transport ?");
      j.nombre({ avant: "v \\approx", apres: "\\text{m/s}", cases: [{ attendu: 5.5, tol: 0.05 }],
        aide: function () { return "Une vitesse de quelques mètres par seconde, avec des ralentissements à l'approche des stations pour éviter l'hémolyse."; },
        ok: function () { j.bravo("Environ 5,5 m/s, avec un ralentissement à l'arrivée."); j.suite(); } });
    } }
  ]
}));
