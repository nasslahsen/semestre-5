/* Niveau : biosécurité (1.6) : types de risques, niveaux BSL, risques liés aux équipements, EPI. */
NIVEAU(LABO.rejouable({
  id: "biosecurite",
  init: function (fig) {
    var A = LABO, C = A.C, g = A.s("g", null, fig.svg);
    var n = { g: g, libre: true, faux: {}, pl: { P: function (v) { return v; } } };
    var T = [null, "bio", "chim", "phys"], ST = { bio: { t: "biologique", f: C.okPale, b: C.ok }, chim: { t: "chimique", f: C.vPale, b: C.v }, phys: { t: "physique", f: C.accPale, b: C.acc } };
    n.ITEMS = [["Virus dans un tube de sang", "bio"], ["Acide corrosif", "chim"], ["Bruit d'un compresseur", "phys"], ["Parasites dans des selles", "bio"], ["Solvant inflammable", "chim"], ["Froid d'un congélateur", "phys"]]
      .map(function (x) { return { t: x[0], z: x[1], choix: null }; });
    n.classer = function () {
      A.vider(g);
      n.ITEMS.forEach(function (it, i) {
        var x = 30 + (i % 2) * 320, y = 40 + Math.floor(i / 2) * 180, st = it.choix ? ST[it.choix] : null;
        A.boite(g, x, y, 300, 150, { fond: st ? st.f : "#fff", bord: n.faux[i] ? C.ko : st ? st.b : C.trait, ep: n.faux[i] ? 4 : 2.5, rx: 14, titre: it.t, sous: st ? st.t : "à classer", taille: 19, coulSous: st ? st.b : C.gris });
        A.cible(g, x, y, 300, 150, function () { if (!n.libre) return; it.choix = T[(T.indexOf(it.choix) + 1) % T.length]; delete n.faux[i]; n.classer(); });
      });
    };
    n.niveaux = function (k) {
      A.vider(g);
      // du plus grand cadre (BSL-4) au plus petit (BSL-1), pour que chacun reste visible
      ["BSL-4", "BSL-3", "BSL-2", "BSL-1"].forEach(function (t, k0) {
        var i = 3 - k0, m = (3 - i) * 50;
        A.boite(g, 60 + m, 60 + m * 0.7, 560 - 2 * m, 480 - 2 * m * 0.7, { fond: "#fff", bord: k === i + 1 ? C.jeu : C.trait, ep: k === i + 1 ? 5 : 2.5, rx: 24 });
        A.texte(g, t, [340, 85 + m * 0.7], { taille: 18, gras: 800, coul: k === i + 1 ? C.jeu : C.doux });
      });
      A.icone(g, "danger", [340, 320], 90, C.ko);
    };
    return n;
  },
  etapes: [
    { nom: "Quel niveau ?", jouer: function (j, n) {
      n.niveaux(0);
      j.titre("Un laboratoire manipule Mycobacterium tuberculosis, responsable d'une maladie grave transmise par inhalation. Quel niveau de biosécurité ?");
      j.choix([
        { html: "BSL-1", aide: "BSL-1, c'est pour des micro-organismes non pathogènes." },
        { html: "BSL-2", aide: "BSL-2 couvre les pathogènes du groupe 2. Ici, la transmission par inhalation d'une maladie grave demande plus." },
        { html: "BSL-3", juste: true },
        { html: "BSL-4", aide: "BSL-4 est réservé aux pathogènes hautement dangereux comme Ebola." }
      ], { colonnes: 4, ok: function () {
        n.niveaux(3);
        j.bravo("BSL-3 : maladies graves par inhalation.");
        j.expliquer("<p>BSL-1 : non pathogènes (enseignement). BSL-2 : pathogènes du groupe 2, la plupart des laboratoires cliniques. BSL-3 : maladies graves par inhalation (Mycobacterium tuberculosis). BSL-4 : hautement dangereux (Ebola).</p>");
        j.suite();
      } });
    } },
    { nom: "Les risques des appareils", jouer: function (j, n) {
      var A = LABO;
      j.titre("Chaque équipement a son risque propre. Relie-les.");
      j.consigne("Touche un équipement, puis son risque.");
      var p = A.paires({
        g: n.g, gauche: ["Automate", "Centrifugeuse", "Congélateur à azote", "Hotte ou PSM"],
        droite: ["Aérosols si un tube se brise", "Perte d'efficacité, filtres saturés", "Pièces mobiles, aiguilles", "Explosion, brûlures par le froid"],
        bon: [2, 0, 3, 1], xg: 20, wg: 250, xd: 330, wd: 330, y0: 60, h: 104, pas: 134, taille: 18,
        erreur: function (m) { j.erreur(m); },
        aide: function (i) { return ["Un automate pipette avec des aiguilles et bouge tout seul.", "Elle tourne très vite : que se passe-t-il si un tube casse ?", "L'azote liquide est à très basse température et se vaporise.", "Son efficacité repose sur ses filtres."][i]; },
        fin: function () { j.bravo("Quatre appareils, quatre risques."); j.suite(); }
      });
      j.reponse(function () { p.resoudre(); });
    } },
    { nom: "Biologique, chimique, physique", jouer: function (j, n) {
      n.classer();
      j.titre("Classe chaque danger : biologique, chimique ou physique.");
      j.consigne("Touche une case pour changer son type.");
      var bt = E.h("button", "btn bleu", "Vérifier", j.el); bt.type = "button";
      function gagner() {
        n.libre = false; bt.remove(); n.classer();
        j.bravo("Trois familles de risques.");
        j.expliquer("<p>Biologique : bactéries, virus, parasites (EPI, formation, vaccination). Chimique : produits corrosifs, toxiques, inflammables (signalisation, fiches de sécurité, ventilation, stockage adéquat). Physique : bruit, chaleur, froid, rayonnements (équipements de protection, signalisation).</p>");
        j.suite();
      }
      bt.addEventListener("click", function () {
        var faux = 0;
        n.ITEMS.forEach(function (it, i) { if (it.choix !== it.z) { n.faux[i] = true; faux++; } });
        n.classer();
        if (faux) { j.erreur(faux + (faux > 1 ? " cases sont mal classées." : " case est mal classée.") + " Un être vivant, un produit, ou une forme d'énergie ?"); return; }
        gagner();
      });
      j.reponse(function () { n.ITEMS.forEach(function (it) { it.choix = it.z; }); n.faux = {}; gagner(); });
    } },
    { nom: "Le bon EPI", jouer: function (j, n) {
      var A = LABO; A.vider(n.g);
      [["lunettes", 120], ["gant", 260], ["masque", 400], ["blouse", 540]].forEach(function (x) { A.icone(n.g, x[0], [x[1], 290], 100, A.C.jeu); });
      j.titre("Une technicienne ouvre un tube et craint une projection de liquide au visage. Quelle protection le cours associe-t-il à ce danger ?");
      j.choix([
        { html: "Protection des mains", aide: "Les gants protègent des coupures et des produits sur la peau des mains, pas du visage." },
        { html: "Protection oculaire et faciale", juste: true },
        { html: "Protection auditive", aide: "La protection auditive concerne le bruit excessif." }
      ], { colonnes: 1, ok: function () { j.bravo("Protection oculaire et faciale : projections de poussière, de particules, de fluides."); j.suite(); } });
    } },
    { nom: "Barrière finale", jouer: function (j, n) {
      j.titre("Vu par l'ingénieur biomédical, l'EPI est une « barrière finale ». Qu'est-ce que cela veut dire ?");
      j.choix([
        { html: "Qu'il suffit à lui seul à protéger le technicien", aide: "« Finale » ne veut pas dire « suffisante ». Que doit-il y avoir avant ?" },
        { html: "Que la sécurité doit être conçue dans le système, l'EPI ne venant qu'en dernier", juste: true },
        { html: "Qu'on ne le met qu'à la fin de la journée", aide: "Il s'agit de son rôle dans la protection, pas d'un horaire." }
      ], { colonnes: 1, ok: function () {
        j.bravo("La sécurité se conçoit dans le système ; l'EPI arrête ce qui reste.");
        j.expliquer("<p>L'évaluation des risques doit être <b>systématique et documentée</b>, et la formation continue du personnel est un facteur déterminant de la performance en biosécurité.</p>");
        j.suite();
      } });
    } }
  ]
}));
