/* Niveau : conservation et transport (2.4) : températures, transports spécifiques, triple emballage, conservation au laboratoire. */
NIVEAU(LABO.rejouable({
  id: "conservation",
  init: function (fig) {
    var A = LABO, C = A.C, g = A.s("g", null, fig.svg);
    var n = { g: g, libre: true, pl: { P: function (v) { return v; } } };
    n.BANDES = [["Ambiante, 15 à 25 °C", "#f59f00"], ["+2 à +8 °C", "#74c0fc"], ["−20 °C", "#339af0"], ["−70 à −80 °C", "#1c7ed6"], ["Azote liquide, −196 °C", "#1864ab"]];
    n.echelle = function (sel, faux) {
      A.vider(g);
      n.BANDES.forEach(function (b, i) {
        var y = 40 + i * 108, on = sel === i, ko = faux === i;
        A.boite(g, 60, y, 560, 88, { fond: on ? C.froidPale : ko ? C.koPale : "#fff", bord: ko ? C.ko : on ? b[1] : C.trait, ep: on || ko ? 4 : 2.5, rx: 14 });
        A.s("rect", { x: 74, y: y + 14, width: 18, height: 60, rx: 6, fill: b[1] }, g);
        A.texte(g, b[0], [340, y + 44], { taille: 24, gras: 800 });
        A.cible(g, 60, y, 560, 88, function () { if (n.toucher) n.toucher(i); });
      });
    };
    n.echelle();
    return n;
  },
  etapes: [
    { nom: "La bonne température", jouer: function (j, n) {
      j.titre("On garde quelques semaines des aliquotes de sérum : conservation de moyenne durée. À quelle température ?");
      j.consigne("Touche la bonne bande.");
      function gagner() {
        n.toucher = null; n.echelle(2);
        j.bravo("−20 °C : moyenne durée, aliquotes de sérum ou de plasma.");
        j.expliquer("<p>Ambiante : transport court (hématologie, cytologie). +2 à +8 °C : courte durée (biochimie, sérologie, ECBU). −20 °C : moyenne durée (aliquotes). −70 à −80 °C : longue durée (biologie moléculaire, virologie). Azote liquide, −196 °C : cellules et tissus (cryopréservation, PMA).</p>");
        j.suite();
      }
      n.toucher = function (i) {
        if (i !== 2) { n.echelle(null, i); j.erreur(i < 2 ? "Trop chaud pour plusieurs semaines : c'est pour un transport court ou une courte durée." : "Ce froid-là sert à la longue durée ou aux cellules et tissus. Pour une durée moyenne, il faut moins froid."); return; }
        gagner();
      };
      j.reponse(gagner);
    } },
    { nom: "Les cas particuliers", jouer: function (j, n) {
      var A = LABO;
      j.titre("Certains échantillons ont leurs propres règles de transport. Relie-les.");
      j.consigne("Touche un échantillon, puis ses conditions.");
      var p = A.paires({
        g: n.g, gauche: ["Gaz du sang", "Hémoculture", "Coagulation", "Ammoniémie"],
        droite: ["Ambiante, analyse en moins de 4 h", "Glace, analyse immédiate", "Glace, analyse en moins de 30 min", "35 à 37 °C, jamais réfrigérer"],
        bon: [2, 3, 0, 1], xg: 20, wg: 240, xd: 320, wd: 340, y0: 60, h: 104, pas: 134, taille: 19,
        erreur: function (m) { j.erreur(m); },
        aide: function (i) { return ["Un gaz du sang change en quelques minutes : glace et délai très court, chiffré.", "On veut garder les bactéries vivantes : chaleur, jamais froid.", "La coagulation se transporte à température ambiante.", "Glace aussi, mais le cours dit « immédiate », sans chiffre."][i]; },
        fin: function () { j.bravo("Chaque échantillon a sa température et son délai."); j.suite(); }
      });
      j.reponse(function () { p.resoudre(); });
    } },
    { nom: "Le triple emballage", jouer: function (j, n) {
      var A = LABO, C = A.C; A.vider(n.g);
      [[60, 60, 560, 480, "#fff"], [150, 140, 380, 320, C.fond], [250, 210, 180, 180, "#fff"]].forEach(function (r) { A.s("rect", { x: r[0], y: r[1], width: r[2], height: r[3], rx: 18, fill: r[4], stroke: C.encre, "stroke-width": 3 }, n.g); });
      A.tube(n.g, 320, 250, { bouchon: "sec", w: 40, h: 110, couches: [{ h: 0.6, coul: C.sang }] });
      j.titre("Complète le triple emballage, du plus proche de l'échantillon au plus extérieur.");
      var res = j.zone("", "");
      var z = j.zone("", '<div style="display:flex;flex-direction:column;gap:6px">1 <span class="trou" data-attendu="p"></span>2 <span class="trou" data-attendu="s"></span>3 <span class="trou" data-attendu="e"></span></div>');
      j.jetons({
        reserve: res, trous: [].slice.call(z.querySelectorAll(".trou")),
        jetons: [{ id: "e", html: "Emballage extérieur rigide" }, { id: "p", html: "Tube primaire" }, { id: "s", html: "Emballage secondaire" }],
        aide: "On part du tube lui-même, puis on l'enveloppe, puis on protège le tout.",
        ok: function () {
          j.bravo("Tube primaire, emballage secondaire, emballage extérieur rigide.");
          j.expliquer("<p>Le triple emballage suit les règles de transport des matières biologiques (ADR, UN 3373). Le bordereau de transport accompagne les échantillons, mais séparé physiquement des tubes.</p>");
          j.suite();
        }
      });
    } },
    { nom: "Les urines au laboratoire", jouer: function (j, n) {
      var A = LABO; A.vider(n.g); A.icone(n.g, "horloge", [340, 280], 220, A.C.jeu);
      j.titre("Au laboratoire, dans quel délai le cours demande-t-il d'analyser des urines, avant de devoir les mettre à +4 °C ?");
      j.nombre({ avant: "\\text{délai} =", apres: "\\text{h}", cases: [{ attendu: 2, tol: 0 }],
        aide: function () { return "C'est un délai court, en heures ; au-delà, on les met à +4 °C pour 24 heures au plus."; },
        ok: function () { j.bravo("2 heures, sinon +4 °C au maximum 24 heures."); j.suite(); } });
    } },
    { nom: "Aliquoter avant de congeler", jouer: function (j, n) {
      var A = LABO, C = A.C; A.vider(n.g);
      [0, 1, 2, 3].forEach(function (i) { A.tube(n.g, 150 + i * 110, 170, { bouchon: C.gris, w: 56, h: 200, couches: [{ h: 0.55, coul: C.plasma }], etiquette: "aliquote " + (i + 1), taille: 16 }); });
      A.icone(n.g, "flocon", [340, 90], 70, C.froid);
      j.titre("Pourquoi répartir un sérum en petites aliquotes avant de le congeler ?");
      j.choix([
        { html: "Pour éviter les cycles de congélation et décongélation, qui dégradent les analytes", juste: true },
        { html: "Parce que le congélateur refuse les gros tubes", aide: "Ce n'est pas une question de place : pense à ce qui se passe quand on décongèle pour une seule analyse." },
        { html: "Pour que le sérum gèle plus lentement", aide: "Le cours recommande au contraire une congélation rapide." }
      ], { colonnes: 1, ok: function () { j.bravo("Chaque cycle de congélation et décongélation dégrade les analytes."); j.suite(); } });
    } }
  ]
}));
