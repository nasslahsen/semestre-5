/* Niveau : boss du chapitre 6 : tout le flux, le captage, les limites, la pièce opératoire, automate ou station. */

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
  id: "boss-anapath",
  init: function (fig) {
    var A = LABO, g = A.s("g", null, fig.svg);
    return { g: g, pl: { P: function (v) { return v; } } };
  },
  etapes: [
    { nom: "Tout le flux", jouer: function (j, n) {
      var A = LABO, C = A.C;
      j.titre("Remets les huit postes dans l'ordre, de l'arrivée du flacon à l'archivage.");
      j.consigne("Touche les huit postes dans l'ordre.");
      var N = ["Coupe", "Réception", "Compte rendu", "Macroscopie", "Coloration", "Fixation", "Archivage", "Déshydratation, inclusion"];
      var t = A.trace({
        g: n.g, coul: C.jeu, taille: 18, fleches: false,
        noeuds: N.map(function (x, i) { return { t: x, x: 30 + (i % 2) * 320, y: 24 + Math.floor(i / 2) * 140, w: 300, h: 112 }; }),
        ordre: [1, 5, 3, 7, 0, 4, 2, 6],
        erreur: function (m) { j.erreur(m); },
        aide: function (i, att, k) { return ["Tout commence à l'accueil.", "Le tissu doit être fixé tout de suite.", "On décrit et on découpe la pièce.", "Le tissu reçoit la paraffine et devient un bloc.", "Le bloc est tranché.", "La coupe est colorée.", "Le pathologiste rédige.", "On conserve lames et blocs."][k]; },
        fin: function () { j.bravo("Réception, fixation, macroscopie, déshydratation et inclusion, coupe, coloration, compte rendu, archivage."); j.suite(); }
      });
      j.reponse(function () { t.resoudre(); });
    } },
    { nom: "Une hotte au plafond", jouer: function (j, n) {
      var A = LABO; A.vider(n.g); A.icone(n.g, "danger", [340, 280], 200, A.C.ko);
      j.titre("Pour économiser, on propose une hotte au plafond au-dessus de la table de macroscopie. Ton avis ?");
      j.choix([
        { html: "Refusé : aspirées vers le haut, les vapeurs passent devant le visage", juste: true },
        { html: "Accepté, si le débit est fort", aide: "Le sens du captage compte autant que le débit." },
        { html: "Accepté, si le technicien porte des gants", aide: "La protection collective passe avant, et les gants ne protègent pas les voies respiratoires." }
      ], { colonnes: 1, ok: function () { j.bravo("Captage par le bas ou par un dosseret aspirant."); j.suite(); } });
    } },
    { nom: "Un pic de formol", jouer: function (j, n) {
      var A = LABO, C = A.C; A.vider(n.g); A.icone(n.g, "horloge", [340, 250], 200, C.ko);
      A.texte(n.g, "15 minutes", [340, 450], { taille: 24, gras: 800 });
      j.titre("Quelle est la valeur limite d'exposition au formol pour un pic de 15 minutes ?");
      j.nombre({ avant: "\\text{VLEP}_{15\\,min} =", apres: "\\text{ppm}", cases: [{ attendu: 0.6, tol: 0.001 }],
        aide: function () { return "Le double de la limite sur 8 heures."; },
        ok: function () { j.bravo("0,6 ppm sur 15 min, 0,3 ppm sur 8 h."); j.suite(); } });
    } },
    { nom: "Une pièce de côlon", jouer: function (j, n) {
      var A = LABO; A.vider(n.g); A.icone(n.g, "medecin", [340, 280], 200, A.C.jeu);
      j.titre("Le chirurgien envoie un segment de côlon entier avec sa tumeur. Que prévoir ?");
      j.choix([
        { html: "Au moins 6 heures de formol, résultat vers 4 jours", aide: "Ce sont les valeurs d'une biopsie." },
        { html: "24 heures de formol ou plus, résultat souvent en 8 jours ou plus", juste: true },
        { html: "Pas de fixation : examen extemporané", aide: "L'extemporané se fait pendant l'opération, sur tissu congelé ; ici la pièce arrive au laboratoire." }
      ], { colonnes: 1, ok: function () { j.bravo("Une pièce opératoire : fixation plus longue, examens plus nombreux."); j.suite(); } });
    } },
    { nom: "Automate ou station", jouer: function (j, n) {
      var C = LABO.C;
      classer2(j, n, {
        titre: "Chaque élément appartient à l'automate de déshydratation ou à la station d'enrobage. Classe-les.",
        consigne: "Touche une case : automate, puis station d'enrobage.",
        cles: ["a", "s"], st: { a: { t: "automate", f: C.jeuPale, b: C.jeu }, s: { t: "station d'enrobage", f: C.froidPale, b: C.froid } },
        items: [["Bains d'alcools croissants", "a"], ["Moule et paraffine coulée", "s"], ["Plaque froide à −20 °C", "s"], ["Clarification au xylène", "a"], ["Panier qui va de station en station", "a"], ["Dispensation par pédale ou capteur", "s"]],
        aide: "L'automate prépare l'intérieur du tissu ; la station forme le bloc autour.",
        bravo: "Automate : alcools, xylène, paraffine dans le tissu. Station : moule, coulée, refroidissement."
      });
    } }
  ]
}));
