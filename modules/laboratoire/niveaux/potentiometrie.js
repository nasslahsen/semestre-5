/* Niveau : potentiométrie et électrolytes (3.3, 3.4) : électrodes, pente de Nernst, décade, intervalles de référence, électrode de référence. */
NIVEAU(LABO.rejouable({
  id: "potentiometrie",
  init: function (fig) {
    var A = LABO, C = A.C, g = A.s("g", null, fig.svg);
    var n = { g: g, pl: { P: function (v) { return v; } } };
    n.electrode = function (txt, coul) {
      A.vider(g);
      A.s("rect", { x: 160, y: 300, width: 360, height: 220, rx: 14, fill: C.froidPale, stroke: C.encre, "stroke-width": 3 }, g);
      A.s("rect", { x: 230, y: 80, width: 50, height: 330, rx: 10, fill: "#fff", stroke: C.encre, "stroke-width": 3 }, g);
      A.s("rect", { x: 400, y: 80, width: 50, height: 330, rx: 10, fill: "#fff", stroke: C.encre, "stroke-width": 3 }, g);
      A.s("circle", { cx: 255, cy: 410, r: 26, fill: coul || C.jeu }, g);
      A.texte(g, "ISE", [255, 60], { taille: 20, gras: 800 }); A.texte(g, "référence", [425, 60], { taille: 20, gras: 800 });
      A.s("path", { d: "M255 80 Q340 10 425 80", fill: "none", stroke: C.encre, "stroke-width": 3 }, g);
      if (txt) A.texte(g, txt, [340, 560], { taille: 24, gras: 800, coul: C.jeu });
    };
    return n;
  },
  etapes: [
    { nom: "Une membrane par ion", jouer: function (j, n) {
      var A = LABO;
      j.titre("Chaque électrode a sa membrane. Relie-les.");
      j.consigne("Touche une électrode, puis sa membrane.");
      var p = A.paires({
        g: n.g, gauche: ["Électrode à potassium", "Électrode à chlorure", "Électrode à sodium", "Électrode de référence"],
        droite: ["Verre ou membrane liquide", "Argent / chlorure d'argent, double jonction", "Valinomycine", "Membrane échangeuse d'ions"],
        bon: [2, 3, 0, 1], xg: 20, wg: 280, xd: 360, wd: 300, y0: 60, h: 104, pas: 134, taille: 19,
        erreur: function (m) { j.erreur(m); },
        aide: function (i) { return ["Une molécule hautement sélective pour K⁺.", "Une membrane qui échange des ions.", "Une membrane en verre, ou liquide.", "Elle ne mesure rien : elle fournit une tension stable."][i]; },
        fin: function () { j.bravo("Valinomycine, échangeuse d'ions, verre, Ag/AgCl."); j.suite(); }
      });
      j.reponse(function () { p.resoudre(); });
    } },
    { nom: "La pente à 37 °C", jouer: function (j, n) {
      n.electrode("T = 37 °C, n = 1");
      j.titre("L'automate travaille à 37 °C (310,15 K). Pour un ion de charge 1, de combien de millivolts le potentiel monte-t-il quand la concentration est multipliée par 10 ?");
      j.nombre({ avant: "\\Delta E =", apres: "\\text{mV}", cases: [{ attendu: 61.54, tol: 0.3 }],
        aide: function () { return "Pente = R × T × ln 10 / (n × F), avec R = 8,314, F = 96 485 ; le résultat sort en volts."; },
        ok: function () {
          j.bravo("Environ 61,5 mV par décade.");
          j.expliquer("<p>\\(\\dfrac{8{,}314 \\times 310{,}15 \\times 2{,}303}{96\\,485} \\approx 0{,}0615\\) V. La pente dépend de la température : 59,2 mV à 25 °C, 61,5 mV à 37 °C.</p>");
          j.suite();
        } });
    } },
    { nom: "Un ion de charge 2", jouer: function (j, n) {
      n.electrode("Ca²⁺ : n = 2, 25 °C", "#2f9e44");
      j.titre("Pour le calcium Ca²⁺ à 25 °C, on sait que la pente vaut 59,2 mV par décade pour un ion de charge 1. Que vaut-elle pour Ca²⁺ ?");
      j.nombre({ avant: "\\text{pente} \\approx", apres: "\\text{mV/décade}", cases: [{ attendu: 29.6, tol: 0.1 }],
        aide: function () { return "n est au dénominateur de RT / nF."; },
        ok: function () { j.bravo("29,6 mV : deux fois moins."); j.suite(); } });
    } },
    { nom: "Un ionogramme", jouer: function (j, n) {
      var A = LABO, C = A.C; A.vider(n.g);
      [["Na⁺", "141"], ["K⁺", "6,1"], ["Cl⁻", "102"]].forEach(function (r, i) {
        A.boite(n.g, 120, 100 + i * 130, 440, 100, { fond: "#fff", bord: C.encre, ep: 2.5, rx: 14 });
        A.texte(n.g, r[0], [200, 158 + i * 130], { taille: 30, gras: 800 });
        A.texte(n.g, r[1] + " mmol/L", [420, 158 + i * 130], { taille: 30, gras: 800, coul: C.jeu });
      });
      j.titre("Voici un ionogramme. Quelle valeur sort des intervalles de référence du cours ?");
      j.choix([
        { html: "Na⁺", aide: "Sodium : 135 à 148 mmol/L." },
        { html: "K⁺", juste: true },
        { html: "Cl⁻", aide: "Chlorure : 98 à 107 mmol/L." }
      ], { colonnes: 3, ok: function () { j.bravo("K⁺ à 6,1 : au-dessus de 3,5 à 5,3 mmol/L."); j.expliquer("<p>Un potassium élevé fait aussi penser au pré-analytique : hémolyse, garrot prolongé, délai avant centrifugation.</p>"); j.suite(); } });
    } },
    { nom: "Pourquoi une référence ?", jouer: function (j, n) {
      n.electrode();
      j.titre("Pourquoi l'électrode sélective est-elle toujours associée à une électrode de référence ?");
      j.choix([
        { html: "Pour fournir une tension stable par rapport à laquelle on mesure", juste: true },
        { html: "Pour doser un second ion en même temps", aide: "La référence ne répond à aucun ion de l'échantillon." },
        { html: "Pour chauffer l'échantillon à 37 °C", aide: "Elle n'a pas de rôle thermique." }
      ], { colonnes: 1, ok: function () { j.bravo("On mesure une différence de potentiel : il faut un point fixe."); j.suite(); } });
    } }
  ]
}));
