/* Niveau : les trois phases du flux de travail en anapath et l'équipement de chaque poste (chapitre 6). */

// Classement en trois catégories (touches successives), grille 3 × 3 : mêmes positions que les phases.
function classer3(j, n, cfg) {
  var A = LABO, C = A.C, T = [null].concat(cfg.cles), libre = true, faux = {};
  var items = cfg.items.map(function (x) { return { t: x[0], z: x[1], choix: null }; });
  function dessin() {
    A.vider(n.g);
    items.forEach(function (it, i) {
      var x = 20 + (i % 3) * 220, y = 40 + Math.floor(i / 3) * 180, st = it.choix ? cfg.st[it.choix] : null;
      A.boite(n.g, x, y, 200, 150, { fond: st ? st.f : "#fff", bord: faux[i] ? C.ko : st ? st.b : C.trait, ep: faux[i] ? 4 : 2.5, rx: 14, titre: it.t, sous: st ? st.t : "à classer", taille: 18, coulSous: st ? st.b : C.gris });
      A.cible(n.g, x, y, 200, 150, function () { if (!libre) return; it.choix = T[(T.indexOf(it.choix) + 1) % T.length]; delete faux[i]; dessin(); });
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
  id: "anapath-flux",
  init: function (fig) {
    var A = LABO, g = A.s("g", null, fig.svg);
    return { g: g, pl: { P: function (v) { return v; } } };
  },
  etapes: [
    { nom: "Trois phases", jouer: function (j, n) {
      var C = LABO.C;
      classer3(j, n, {
        titre: "Classe chaque poste dans sa phase.",
        consigne: "Touche une case : préparation, analytique, puis post-analytique.",
        cles: ["p", "a", "s"], st: { p: { t: "préparation", f: C.froidPale, b: C.froid }, a: { t: "analytique", f: C.jeuPale, b: C.jeu }, s: { t: "post-analytique", f: C.okPale, b: C.ok } },
        items: [["Réception", "p"], ["Coupe", "a"], ["Compte rendu", "s"], ["Fixation", "p"], ["Coloration", "a"], ["Archivage", "s"], ["Macroscopie", "p"], ["Examen au microscope", "a"], ["Déshydratation, inclusion", "p"]],
        aide: "La préparation va jusqu'au bloc de paraffine ; l'analytique va de la coupe à la lecture ; ensuite, le rapport et la conservation.",
        bravo: "Préparation jusqu'au bloc, analytique de la coupe à la lecture, puis compte rendu et archivage."
      });
    } },
    { nom: "Pendant l'opération", jouer: function (j, n) {
      var A = LABO; A.vider(n.g); A.icone(n.g, "flocon", [340, 280], 220, A.C.froid);
      j.titre("Pendant l'intervention, le chirurgien attend un résultat en quelques minutes sur un tissu congelé. Quel appareil coupe ce tissu ?");
      j.choix([
        { html: "Le microtome classique", aide: "Il coupe des blocs de paraffine, après des heures de préparation." },
        { html: "Le cryostat", juste: true },
        { html: "Le processeur de tissus", aide: "Il déshydrate et imprègne : c'est long, et il ne coupe rien." }
      ], { colonnes: 1, ok: function () { j.bravo("Le cryostat, microtome à congélation : l'examen extemporané."); j.suite(); } });
    } },
    { nom: "Le bon appareil", jouer: function (j, n) {
      var A = LABO; A.vider(n.g);
      j.titre("Relie chaque poste à son équipement.");
      j.consigne("Touche un poste à gauche, puis son équipement à droite.");
      var p = A.paires({
        g: n.g, gauche: ["Fixation", "Déshydratation", "Coupe", "Coloration"],
        droite: ["Microtome", "Automate de coloration", "Distributeur de formol", "Automate d'imprégnation"],
        bon: [2, 3, 0, 1], xg: 20, wg: 300, xd: 380, wd: 280, y0: 70, h: 104, pas: 130, taille: 18,
        erreur: function (m) { j.erreur(m); },
        aide: function (i) { return ["La fixation se fait dans le formol.", "Retirer l'eau et la remplacer par la paraffine : un automate s'en charge.", "Des tranches de quelques micromètres.", "Appliquer le H&E sur les lames."][i]; },
        fin: function () { j.bravo("Formol, automate d'imprégnation, microtome, automate de coloration."); j.suite(); }
      });
      j.reponse(function () { p.resoudre(); });
    } },
    { nom: "À l'accueil", jouer: function (j, n) {
      var A = LABO; A.vider(n.g); A.icone(n.g, "codebarre", [340, 280], 230, A.C.jeu);
      j.titre("Deux flacons arrivent en même temps. Qu'est-ce qui évite, dès la réception, de les confondre jusqu'au compte rendu ?");
      j.choix([
        { html: "Un numéro d'identification unique, suivi dans le LIS", juste: true },
        { html: "La couleur du bouchon du flacon", aide: "Elle ne dit pas à quel patient le tissu appartient." },
        { html: "L'heure d'arrivée notée à la main", aide: "Deux flacons peuvent arriver à la même heure." }
      ], { colonnes: 1, ok: function () { j.bravo("Un numéro unique, et la traçabilité informatique."); j.suite(); } });
    } },
    { nom: "Ce qu'on garde", jouer: function (j, n) {
      var A = LABO; A.vider(n.g); A.icone(n.g, "document", [340, 280], 220, A.C.ok);
      j.titre("À la phase post-analytique, qu'est-ce qui est archivé sur le long terme ?");
      j.choix([
        { html: "Les lames et les blocs de paraffine, et les images numériques", juste: true },
        { html: "Seulement le compte rendu", aide: "Le cours parle aussi de ce qui a servi à lire les lames." },
        { html: "La pièce opératoire fraîche", aide: "Elle a été fixée et découpée bien avant." }
      ], { colonnes: 1, ok: function () { j.bravo("Lames, blocs et images, selon la réglementation."); j.suite(); } });
    } }
  ]
}));
