/* Niveau : l'automate d'hématologie (4.4, 4.7, 4.10) : modules, types, maintenance, bonnes pratiques. */
NIVEAU(LABO.rejouable({
  id: "automate-hemato",
  init: function (fig) {
    var A = LABO, C = A.C, g = A.s("g", null, fig.svg);
    var n = { g: g, libre: true, faux: {}, pl: { P: function (v) { return v; } } };
    var T = [null, "jour", "semaine", "mois", "an"], ST = { jour: { t: "quotidienne", f: C.jeuPale, b: C.jeu }, semaine: { t: "hebdomadaire", f: C.accPale, b: C.acc }, mois: { t: "mensuelle", f: C.vPale, b: C.v }, an: { t: "annuelle", f: C.okPale, b: C.ok } };
    n.ITEMS = [["Nettoyer les sondes", "semaine"], ["Vérification métrologique", "an"], ["Contrôle de qualité", "jour"], ["Remplacer les filtres", "mois"]]
      .map(function (x) { return { t: x[0], z: x[1], choix: null }; });
    n.classer = function () {
      A.vider(g);
      n.ITEMS.forEach(function (it, i) {
        var x = 30 + (i % 2) * 320, y = 60 + Math.floor(i / 2) * 250, st = it.choix ? ST[it.choix] : null;
        A.boite(g, x, y, 300, 200, { fond: st ? st.f : "#fff", bord: n.faux[i] ? C.ko : st ? st.b : C.trait, ep: n.faux[i] ? 4 : 2.5, rx: 14, titre: it.t, sous: st ? st.t : "à classer", taille: 22, coulSous: st ? st.b : C.gris });
        A.cible(g, x, y, 300, 200, function () { if (!n.libre) return; it.choix = T[(T.indexOf(it.choix) + 1) % T.length]; delete n.faux[i]; n.classer(); });
      });
    };
    return n;
  },
  etapes: [
    { nom: "Le trajet dans l'automate", jouer: function (j, n) {
      var A = LABO, C = A.C;
      j.titre("Remets les modules de l'automate dans l'ordre, du tube au système informatique.");
      j.consigne("Touche les modules dans l'ordre.");
      var N = ["Mesure", "Interface LIS", "Aspiration", "Gestion des données", "Dilution", "Acquisition"];
      var t = A.trace({
        g: n.g, coul: C.jeu, taille: 22, fleches: false,
        noeuds: N.map(function (x, i) { return { t: x, x: 140, y: 30 + i * 92, w: 400, h: 74 }; }),
        ordre: [2, 4, 0, 5, 3, 1],
        erreur: function (m) { j.erreur(m); },
        aide: function (i, att, k) { return ["On commence par prendre le sang.", "On le prépare pour la mesure.", "On analyse les cellules.", "On traite le signal.", "On calcule et on stocke.", "On transmet."][k]; },
        fin: function () { j.bravo("Aspiration, dilution, mesure, acquisition, données, LIS."); j.suite(); }
      });
      j.reponse(function () { t.resoudre(); });
    } },
    { nom: "Les familles d'automates", jouer: function (j, n) {
      var A = LABO;
      j.titre("Relie chaque famille d'automates à ce que le cours en dit.");
      j.consigne("Touche une famille, puis sa description.");
      var p = A.paires({
        g: n.g, gauche: ["À impédance", "Optique", "Mixte", "Grande série"],
        droite: ["Sysmex XN, Beckman DxH", "Plus de 100 tests par heure", "Sysmex KX-21, ABX Micros 60", "Abbott CELL-DYN, Siemens ADVIA"],
        bon: [2, 3, 0, 1], xg: 20, wg: 240, xd: 320, wd: 340, y0: 60, h: 104, pas: 134, taille: 19,
        erreur: function (m) { j.erreur(m); },
        aide: function (i) { return ["Le principe de Coulter seul.", "La cytométrie en flux.", "Impédance et optique réunies : la majorité des automates modernes.", "Un débit, pas un principe de mesure."][i]; },
        fin: function () { j.bravo("Impédance, optique, mixte, grande série."); j.suite(); }
      });
      j.reponse(function () { p.resoudre(); });
    } },
    { nom: "Le calendrier d'entretien", jouer: function (j, n) {
      n.classer();
      j.titre("Classe chaque opération de maintenance préventive selon sa fréquence.");
      j.consigne("Touche une case pour changer sa fréquence.");
      var bt = E.h("button", "btn bleu", "Vérifier", j.el); bt.type = "button";
      function gagner() {
        n.libre = false; bt.remove(); n.classer();
        j.bravo("Contrôle chaque jour, sondes chaque semaine, filtres chaque mois, métrologie chaque année.");
        j.suite();
      }
      bt.addEventListener("click", function () {
        var faux = 0;
        n.ITEMS.forEach(function (it, i) { if (it.choix !== it.z) { n.faux[i] = true; faux++; } });
        n.classer();
        if (faux) { j.erreur(faux + (faux > 1 ? " cases sont mal classées." : " case est mal classée.") + " Le contrôle de qualité ne peut pas attendre ; la vérification métrologique se fait avec le constructeur."); return; }
        gagner();
      });
      j.reponse(function () { n.ITEMS.forEach(function (it) { it.choix = it.z; }); n.faux = {}; gagner(); });
    } },
    { nom: "Le délai d'analyse", jouer: function (j, n) {
      var A = LABO, C = A.C; A.vider(n.g);
      A.tube(n.g, 200, 140, { bouchon: "edta", w: 100, h: 320, couches: [{ h: 0.75, coul: C.sang }], etiquette: "EDTA" });
      A.icone(n.g, "horloge", [480, 280], 160, C.jeu);
      j.titre("D'après les bonnes pratiques du cours, dans combien d'heures au plus faut-il analyser un tube EDTA pour un hémogramme ?");
      j.nombre({ avant: "\\text{délai} \\le", apres: "\\text{h}", cases: [{ attendu: 4, tol: 0 }],
        aide: function () { return "Un délai court, de quelques heures, à température ambiante."; },
        ok: function () { j.bravo("4 heures, à température ambiante (20 à 25 °C)."); j.suite(); } });
    } },
    { nom: "L'installation", jouer: function (j, n) {
      var A = LABO, C = A.C; A.vider(n.g);
      A.s("rect", { x: 40, y: 60, width: 30, height: 460, fill: C.gris }, n.g);
      A.boite(n.g, 260, 220, 300, 200, { fond: "#fff", bord: C.encre, ep: 3, rx: 16, titre: "compteur", taille: 24 });
      A.fleche(n.g, [75, 320], [250, 320], { coul: C.jeu, ep: 4 }); A.fleche(n.g, [250, 320], [75, 320], { coul: C.jeu, ep: 4 });
      A.texte(n.g, "? cm", [160, 290], { taille: 26, gras: 800, coul: C.jeu });
      j.titre("Quelle distance le cours demande-t-il de laisser entre le compteur et le mur ?");
      j.nombre({ avant: "d =", apres: "\\text{cm}", cases: [{ attendu: 50, tol: 0 }],
        aide: function () { return "C'est pour que l'air circule autour de l'appareil ; un demi-mètre."; },
        ok: function () { j.bravo("50 cm, pour la circulation de l'air."); j.expliquer("<p>Aussi : un onduleur avec prise de terre, et 10 minutes de chauffe avant l'emploi.</p>"); j.suite(); } });
    } }
  ]
}));
