/* Niveau : le distillateur (3.8) : impuretés, chemin de l'eau, critères de l'eau du laboratoire, entretien, stockage. */
NIVEAU(LABO.rejouable({
  id: "distillateur",
  init: function (fig) {
    var A = LABO, C = A.C, g = A.s("g", null, fig.svg);
    var n = { g: g, libre: true, faux: {}, pl: { P: function (v) { return v; } } };
    var T = [null, "mois", "an", "temps"], ST = { mois: { t: "chaque mois", f: C.jeuPale, b: C.jeu }, an: { t: "chaque année", f: C.accPale, b: C.acc }, temps: { t: "de temps à autre", f: C.vPale, b: C.v } };
    n.ITEMS = [["Détartrer le bouilleur", "mois"], ["Aspirer la poussière du condenseur", "an"], ["Décontaminer le récipient de stockage", "temps"], ["Vérifier le tartre sur les résistances", "mois"]]
      .map(function (x) { return { t: x[0], z: x[1], choix: null }; });
    n.classer = function () {
      A.vider(g);
      n.ITEMS.forEach(function (it, i) {
        var x = 30 + (i % 2) * 320, y = 60 + Math.floor(i / 2) * 250, st = it.choix ? ST[it.choix] : null;
        A.boite(g, x, y, 300, 200, { fond: st ? st.f : "#fff", bord: n.faux[i] ? C.ko : st ? st.b : C.trait, ep: n.faux[i] ? 4 : 2.5, rx: 14, titre: it.t, sous: st ? st.t : "à classer", taille: 20, coulSous: st ? st.b : C.gris });
        A.cible(g, x, y, 300, 200, function () { if (!n.libre) return; it.choix = T[(T.indexOf(it.choix) + 1) % T.length]; delete n.faux[i]; n.classer(); });
      });
    };
    return n;
  },
  etapes: [
    { nom: "Le chemin de l'eau", jouer: function (j, n) {
      var A = LABO, C = A.C;
      j.titre("Suis l'eau dans le distillateur, du robinet au récipient.");
      j.consigne("Touche les éléments dans l'ordre.");
      var N = ["Condenseur", "Raccordement au réseau", "Récipient à eau distillée", "Générateur de vapeur"];
      var t = A.trace({
        g: n.g, coul: C.jeu, taille: 22, fleches: false,
        noeuds: N.map(function (x, i) { return { t: x, x: 140, y: 50 + i * 130, w: 400, h: 100 }; }),
        ordre: [1, 3, 0, 2],
        erreur: function (m) { j.erreur(m); },
        aide: function (i, att, k) { return ["L'eau doit d'abord arriver dans l'appareil.", "Elle est chauffée jusqu'à devenir vapeur.", "La vapeur est refroidie.", "Le distillat est recueilli."][k]; },
        fin: function () { j.bravo("Réseau, bouilleur, condenseur, récipient."); j.suite(); }
      });
      j.reponse(function () { t.resoudre(); });
    } },
    { nom: "Les impuretés", jouer: function (j, n) {
      var A = LABO;
      j.titre("Relie chaque famille d'impuretés de l'eau à un exemple du cours.");
      j.consigne("Touche une famille, puis son exemple.");
      var p = A.paires({
        g: n.g, gauche: ["Ions inorganiques", "Gaz dissous", "Particules en suspension", "Matières organiques"],
        droite: ["Sable, argile", "Pesticides, détergents", "Nitrates, sulfates", "O₂, N₂, CO₂"],
        bon: [2, 3, 0, 1], xg: 20, wg: 280, xd: 380, wd: 280, y0: 60, h: 104, pas: 134, taille: 20,
        erreur: function (m) { j.erreur(m); },
        aide: function (i) { return ["Des sels dissous, chargés.", "Ce qui vient de l'air.", "Ce qui se dépose au fond par gravité.", "Ce qui vient du vivant ou de l'industrie, avec du carbone."][i]; },
        fin: function () { j.bravo("Ions, gaz, particules, organiques."); j.suite(); }
      });
      j.reponse(function () { p.resoudre(); });
    } },
    { nom: "Une eau conforme ?", jouer: function (j, n) {
      var A = LABO, C = A.C; A.vider(n.g);
      [["pH", "7,5"], ["résistivité", "4 × 10⁵ Ω·cm"], ["solides totaux", "0,5 ppm"]].forEach(function (r, i) {
        A.boite(n.g, 100, 100 + i * 130, 480, 100, { fond: "#fff", bord: C.encre, ep: 2.5, rx: 14 });
        A.texte(n.g, r[0], [220, 158 + i * 130], { taille: 26, gras: 800 });
        A.texte(n.g, r[1], [450, 158 + i * 130], { taille: 26, gras: 800, coul: C.jeu });
      });
      j.titre("Voici les mesures d'une eau distillée, à 25 °C. Laquelle ne respecte pas les critères du cours ?");
      j.choix([
        { html: "Le pH", juste: true },
        { html: "La résistivité", aide: "Il faut au moins 3 × 10⁵ Ω·cm : 4 × 10⁵, c'est plus." },
        { html: "Les solides totaux", aide: "Au plus 1 ppm : 0,5 ppm convient." }
      ], { colonnes: 3, ok: function () { j.bravo("pH 7,5 : au-dessus de l'intervalle 5,4 à 7,2."); j.suite(); } });
    } },
    { nom: "L'entretien", jouer: function (j, n) {
      n.classer();
      j.titre("Classe chaque opération d'entretien selon sa fréquence.");
      j.consigne("Touche une case pour changer sa fréquence.");
      var bt = E.h("button", "btn bleu", "Vérifier", j.el); bt.type = "button";
      function gagner() {
        n.libre = false; bt.remove(); n.classer();
        j.bravo("Bouilleur chaque mois, condenseur chaque année, récipient de temps à autre.");
        j.expliquer("<p>Toujours éteindre et débrancher l'appareil avant. Après le détartrage, on vidange jusqu'à environ 10 cm au-dessus de la jauge de niveau ou des résistances.</p>");
        j.suite();
      }
      bt.addEventListener("click", function () {
        var faux = 0;
        n.ITEMS.forEach(function (it, i) { if (it.choix !== it.z) { n.faux[i] = true; faux++; } });
        n.classer();
        if (faux) { j.erreur(faux + (faux > 1 ? " cases sont mal classées." : " case est mal classée.") + " Le bouilleur, où se dépose le tartre, est surveillé le plus souvent."); return; }
        gagner();
      });
      j.reponse(function () { n.ITEMS.forEach(function (it) { it.choix = it.z; }); n.faux = {}; gagner(); });
    } },
    { nom: "Où stocker l'eau ?", jouer: function (j, n) {
      var A = LABO; A.vider(n.g); A.icone(n.g, "eau", [340, 260], 220, A.C.froid);
      j.titre("Dans quel récipient le cours demande-t-il de stocker l'eau distillée ?");
      j.choix([
        { html: "Un récipient métallique, pour la solidité", aide: "Un métal relâche des ions dans une eau très pure." },
        { html: "Un récipient spécial en matière plastique", juste: true },
        { html: "Le bouilleur lui-même, sans la chauffer", aide: "Le bouilleur garde justement les impuretés." }
      ], { colonnes: 1, ok: function () { j.bravo("En plastique spécial, pour éviter une contamination par des ions."); j.suite(); } });
    } }
  ]
}));
