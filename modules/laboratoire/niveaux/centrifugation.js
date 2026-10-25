/* Niveau : centrifugation (2.5) : force centrifuge relative, réglage de la vitesse, sérum, PBMC, équilibrage. */
NIVEAU(LABO.rejouable({
  id: "centrifugation",
  init: function (fig) {
    var A = LABO, C = A.C, g = A.s("g", null, fig.svg);
    var n = { g: g, libre: true, pl: { P: function (v) { return v; } } };
    // rotor vu de dessus : 8 positions
    n.POS = function (k) { var t = -Math.PI / 2 + k * Math.PI / 4; return [340 + 200 * Math.cos(t), 300 + 200 * Math.sin(t)]; };
    n.rotor = function (pleins, faux, ajout) {
      A.vider(g);
      A.s("circle", { cx: 340, cy: 300, r: 250, fill: C.fond, stroke: C.encre, "stroke-width": 4 }, g);
      A.s("circle", { cx: 340, cy: 300, r: 22, fill: C.encre }, g);
      for (var k = 0; k < 8; k++) {
        var p = n.POS(k), plein = pleins.indexOf(k) >= 0 || ajout === k;
        A.s("circle", { cx: p[0], cy: p[1], r: 38, fill: plein ? (ajout === k ? C.jeu : C.sang) : "#fff", stroke: faux === k ? C.ko : C.encre, "stroke-width": faux === k ? 5 : 3 }, g);
        A.cible(g, p[0] - 44, p[1] - 44, 88, 88, (function (k) { return function () { if (n.toucher) n.toucher(k); }; })(k));
      }
    };
    n.jauge = function (r, N) {
      A.vider(g);
      var rcf = A.calc.rcf(r, N), x0 = 60, x1 = 620, y = 260, v = function (x) { return x0 + Math.min(1, x / 4000) * (x1 - x0); };
      A.icone(g, "centrifugeuse", [340, 120], 130, C.jeu);
      A.texte(g, "rotor de " + r + " cm", [340, 210], { taille: 20, gras: 700, coul: C.doux });
      A.s("rect", { x: x0, y: y, width: x1 - x0, height: 40, rx: 10, fill: "#fff", stroke: C.trait, "stroke-width": 2 }, g);
      A.s("rect", { x: v(2000), y: y, width: v(2500) - v(2000), height: 40, fill: C.okPale, stroke: C.ok, "stroke-width": 2.5 }, g);
      A.s("rect", { x: x0, y: y + 10, width: Math.max(0, v(rcf) - x0), height: 20, rx: 10, fill: C.jeu }, g);
      [0, 1000, 2000, 3000, 4000].forEach(function (q) { A.texte(g, String(q), [v(q), y + 68], { taille: 17, coul: C.doux, gras: 500 }); });
      A.texte(g, Math.round(rcf) + " × g", [340, 440], { taille: 44, gras: 800, coul: rcf >= 2000 && rcf <= 2500 ? C.ok : C.encre });
      return rcf;
    };
    return n;
  },
  etapes: [
    { nom: "Calculer la force", jouer: function (j, n) {
      n.jauge(12, 3500);
      j.titre("Rotor de 12 cm, 3 500 tours par minute. Quelle force centrifuge relative ?");
      j.nombre({ avant: "\\text{RCF} \\approx", apres: "\\times g", cases: [{ attendu: 1643.4, tol: 3 }],
        aide: function () { return "RCF = 1,118 × 10⁻⁵ × r × N², avec r en centimètres. N'oublie pas d'élever la vitesse au carré."; },
        ok: function () {
          j.bravo("Environ 1 643 × g.");
          j.expliquer("<p>\\(\\text{RCF} = 1{,}118 \\times 10^{-5} \\times 12 \\times 3\\,500^2 \\approx 1\\,643 \\times g\\). C'est moins que les 2 000 à 2 500 × g conseillés pour séparer un sérum : il faudrait tourner plus vite, ou un rotor plus grand.</p>");
          j.suite();
        } });
    } },
    { nom: "Régler la vitesse", jouer: function (j, n) {
      var A = LABO, r = 16;
      n.jauge(r, 1500);
      j.titre("Sur un rotor de 16 cm, règle la vitesse pour séparer un sérum : entre 2 000 et 2 500 × g.");
      var cu = j.curseur({ nom: "Vitesse", min: 1000, max: 6000, pas: 50, val: 1500, unite: " tr/min", change: function (v) { if (n.libre) n.jauge(r, v); } });
      var bt = E.h("button", "btn bleu", "Lancer", j.el); bt.type = "button";
      function gagner() {
        n.libre = false; bt.remove(); cu.input.disabled = true;
        j.bravo("Dans la bande : " + Math.round(A.calc.rcf(r, cu.v)) + " × g.");
        j.expliquer("<p>Sang total : 2 000 à 2 500 × g pendant 10 à 15 minutes, à température ambiante. Ici, il faut environ 3 350 à 3 740 tr/min. La force croît comme le carré de la vitesse : doubler N multiplie la force par quatre.</p>");
        j.suite();
      }
      bt.addEventListener("click", function () {
        var rcf = A.calc.rcf(r, cu.v);
        if (rcf < 2000) { j.erreur("Trop peu : " + Math.round(rcf) + " × g. Monte la vitesse."); return; }
        if (rcf > 2500) { j.erreur("Trop fort : " + Math.round(rcf) + " × g. Les vitesses excessives favorisent l'hémolyse."); return; }
        gagner();
      });
      j.reponse(function () { cu.regler(3550); n.jauge(r, 3550); gagner(); });
    } },
    { nom: "Le sérum attend", jouer: function (j, n) {
      var A = LABO, C = A.C; A.vider(n.g);
      A.tube(n.g, 290, 130, { bouchon: "sec", w: 100, h: 320, couches: [{ h: 0.8, coul: C.sang }] });
      A.icone(n.g, "horloge", [520, 280], 110, C.jeu);
      j.titre("On veut du sérum : le tube sec vient d'être prélevé. Quand le centrifuger ?");
      j.choix([
        { html: "Tout de suite, comme pour un plasma", aide: "Le sérum est le liquide qui reste après coagulation. La coagulation a-t-elle eu lieu ?" },
        { html: "Après la coagulation complète, 30 à 60 minutes", juste: true },
        { html: "Le lendemain, après une nuit au réfrigérateur", aide: "Le cours donne un délai bien plus court." }
      ], { colonnes: 1, ok: function () { j.bravo("Attendre la coagulation complète (30 à 60 minutes), puis centrifuger."); j.suite(); } });
    } },
    { nom: "Le frein", jouer: function (j, n) {
      var A = LABO, C = A.C; A.vider(n.g);
      A.tube(n.g, 290, 110, { bouchon: C.gris, w: 100, h: 360, couches: [{ h: 0.18, coul: "#8f1d1d" }, { h: 0.3, coul: "#e7e1d3" }, { h: 0.04, coul: "#ffffff" }, { h: 0.3, coul: C.plasma }] });
      A.fleche(n.g, [480, 260], [400, 260], { coul: C.jeu, ep: 4 });
      A.texte(n.g, "anneau de PBMC", [560, 260], { taille: 20, gras: 700 });
      j.titre("Pour séparer les PBMC sur Ficoll, le cours demande de désactiver le frein de la centrifugeuse. Pourquoi ?");
      j.choix([
        { html: "Pour ne pas perturber le gradient", juste: true },
        { html: "Pour gagner du temps", aide: "Sans frein, l'arrêt est au contraire plus long." },
        { html: "Pour protéger le moteur", aide: "Le cours donne une raison liée à l'échantillon, pas à la machine." }
      ], { colonnes: 1, ok: function () {
        j.bravo("Un arrêt brutal mélangerait les couches du gradient.");
        j.expliquer("<p>PBMC : sang dilué au PBS, déposé délicatement sur Ficoll-Paque (densité 1,077 g/mL), 400 à 450 × g pendant 30 minutes, frein désactivé ; on récupère l'anneau à l'interface, puis on lave.</p>");
        j.suite();
      } });
    } },
    { nom: "Équilibrer", jouer: function (j, n) {
      var pleins = [0, 4, 3];
      n.rotor(pleins);
      j.titre("Trois tubes de même masse sont dans le rotor. Où poser un tube d'équilibrage ?");
      j.consigne("Touche la position du tube d'équilibrage.");
      function gagner() {
        n.toucher = null; n.rotor(pleins, null, 7);
        j.bravo("En face du tube resté seul.");
        j.expliquer("<p>Toujours équilibrer la centrifugeuse : des masses égales face à face. Les tubes du haut et du bas s'équilibrent déjà ; celui de droite a besoin d'un partenaire en face.</p>");
        j.suite();
      }
      n.toucher = function (k) {
        if (pleins.indexOf(k) >= 0) return;
        if (k !== 7) { n.rotor(pleins, k); j.erreur("Cherche le tube qui n'a personne en face de lui, de l'autre côté de l'axe."); return; }
        gagner();
      };
      j.reponse(gagner);
    } }
  ]
}));
