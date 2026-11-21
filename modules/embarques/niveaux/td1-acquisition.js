/* TD 1, questions 13 et 14 : cadence d'échantillonnage, chronogramme de S1 à S3, débit binaire, rôle et choix de CF. */
NIVEAU({
  id: "td1-acquisition",
  init: function (fig) {
    var C = EMB.C, g = E.s("g", null, fig.svg);
    var n = { chrono: false, voies: false, filtre: false };
    n.dessin = function () {
      EMB.vider(g);
      // une période d'échantillonnage : 25 ms découpées en 8 voies
      var x0 = 110, W = 520, x = function (t) { return x0 + t / 25 * W; };
      EMB.texte(g, "Te = 25 ms", [x0 + W / 2, 50], { taille: 20 });
      EMB.fleche(g, [x0, 76], [x0 + W, 76], { double: true, ep: 2.5 });
      for (var k = 0; k < 8; k++) {
        EMB.el("rect", { x: x(k * 3.125), y: 96, width: W / 8, height: 44, fill: n.voies ? (k % 2 ? EMB.teinte(0.18) : EMB.teinte(0.35)) : "#fff", stroke: C.pale, "stroke-width": 1.5 }, g);
        if (n.voies) EMB.texte(g, "Y" + k, [x(k * 3.125 + 1.5625), 118], { taille: 16, mono: true, halo: false });
      }
      if (n.chrono) {
        ["S1", "S2", "S3"].forEach(function (s, b) {
          var y0 = 230 + b * 100, pts = [];
          EMB.texte(g, s, [x0 - 40, y0 - 20], { taille: 18, mono: true });
          for (var k = 0; k < 8; k++) {
            var v = (k >> b) & 1, ya = y0 - v * 40;
            pts.push(x(k * 3.125) + "," + ya, x((k + 1) * 3.125) + "," + ya);
          }
          EMB.el("polyline", { points: pts.join(" "), fill: "none", stroke: C.acc, "stroke-width": 4, "stroke-linejoin": "round" }, g);
          EMB.el("line", { x1: x0, y1: y0, x2: x0 + W, y2: y0, stroke: C.pale, "stroke-width": 1.5 }, g);
        });
        EMB.texte(g, "S3 S2 S1 compte de 000 à 111", [x0 + W / 2, 470], { taille: 17, coul: C.doux, gras: false });
      }
      if (n.filtre) {
        EMB.el("path", { d: "M300 520 H340 M410 520 H450 M300 520 V560 H360 M380 560 H450 V520", fill: "none", stroke: C.encre, "stroke-width": 2.5 }, g);
        EMB.el("rect", { x: 340, y: 509, width: 70, height: 22, rx: 4, fill: "#fff", stroke: C.encre, "stroke-width": 2 }, g);
        EMB.el("path", { d: "M360 546 V574 M380 546 V574", stroke: C.acc, "stroke-width": 3 }, g);
        EMB.texte(g, "RG", [375, 496], { taille: 15, gras: false }); EMB.texte(g, "CF", [410, 584], { taille: 15, coul: C.acc, ancre: "start" });
      }
    };
    n.dessin();
    return n;
  },
  etapes: [
    { nom: "fe", jouer: function (j, n) {
      j.titre("Question 13 : 120 pas par minute, 20 points par pas. À quelle fréquence faut-il lire chaque capteur ?");
      j.nombre({ avant: "f_e =", apres: "\\text{Hz}", cases: [{ attendu: 40, tol: 0 }], ligne: true,
        aide: function () { return "120 pas par minute, c'est 2 pas par seconde ; et 20 points pour chacun."; },
        ok: function () {
          j.bravo("2 pas/s × 20 = 40 Hz, soit une mesure toutes les 25 ms.");
          j.suite();
        } });
    } },
    { nom: "Une voie", jouer: function (j, n) {
      j.titre("Les 8 capteurs d'un réseau passent l'un après l'autre dans ces 25 ms. Combien de temps dure chaque voie ?");
      j.nombre({ avant: "t_{voie} =", apres: "\\text{ms}", cases: [{ attendu: 3.125, tol: 0.002 }], ligne: true,
        aide: function () { return "25 ms à partager en 8."; },
        ok: function () {
          n.voies = true; n.dessin();
          j.bravo("25 / 8 = 3,125 ms par voie.");
          j.suite();
        } });
    } },
    { nom: "Chronogramme", jouer: function (j, n) {
      j.titre("S3 S2 S1 compte en binaire, de 000 à 111. Quelle est la période de S3 ?");
      j.choix([
        { html: "3,125 ms", aide: "C'est la durée d'une voie. S3 est le bit de poids fort : il change le moins souvent." },
        { html: "6,25 ms", aide: "C'est la période de S1, le bit de poids faible." },
        { html: "12,5 ms", aide: "S3 reste à 0 pendant 12,5 ms, puis à 1 pendant 12,5 ms." },
        { html: "25 ms", juste: true }
      ], { colonnes: 2, ok: function () {
        n.chrono = true; n.dessin();
        j.bravo("S3 a pour période 25 ms : un tour complet des 8 voies.");
        j.expliquer("<p>S1 change toutes les 3,125 ms (période 6,25 ms), S2 toutes les 6,25 ms (période 12,5 ms), S3 toutes les 12,5 ms (période 25 ms).</p>");
        j.suite();
      } });
    } },
    { nom: "Débit", jouer: function (j, n) {
      j.titre("L'ADC travaille sur 8 bits. Quel débit pour les 16 capteurs de la semelle ?");
      j.nombre({ avant: "D =", apres: "\\text{bit/s}", cases: [{ attendu: 5120, tol: 0 }], ligne: true,
        aide: function () { return "Nombre de capteurs × mesures par seconde × bits par mesure."; },
        ok: function () {
          j.bravo("16 × 40 × 8 = 5 120 bit/s.");
          j.expliquer("<p>\\[D = N \\times f_e \\times n\\]</p><p>Soit 2 560 bit/s pour un réseau de 8 capteurs.</p>");
          j.suite();
        } });
    } },
    { nom: "Rôle de CF", jouer: function (j, n) {
      n.filtre = true; n.dessin();
      j.titre("Question 14 : CF est en parallèle sur RG. À quoi sert-il ?");
      j.choix([
        { html: "Filtre passe-bas : il coupe le bruit, \\(f_c = 1/(2\\pi R_G C_F)\\)", juste: true },
        { html: "Il stocke l'énergie de l'accumulateur", aide: "Il est dans la contre-réaction de l'AOP, pas sur l'alimentation." },
        { html: "Il bloque la composante continue du capteur", aide: "En continu, CF est ouvert : il ne change rien à VA. Il agit aux hautes fréquences." }
      ], { colonnes: 1, ok: function () {
        j.bravo("Aux hautes fréquences, CF court-circuite RG : le gain retombe.");
        j.suite();
      } });
    } },
    { nom: "Choisir CF", jouer: function (j, n) {
      j.titre("La sortie doit se stabiliser en une voie : \\(5 R_G C_F \\le 3{,}125\\) ms. Quelle valeur maximale pour CF ?");
      j.nombre({ avant: "C_F \\le", apres: "\\text{pF}", cases: [{ attendu: 833.3, tol: 2 }], ligne: true,
        aide: function () { return "CF ≤ 3,125 × 10⁻³ / (5 × 750 × 10³), puis passe en picofarads."; },
        ok: function () {
          j.bravo("Environ 833 pF : 470 pF, par exemple, convient (fc ≈ 450 Hz).");
          j.expliquer("<p>Un compromis : assez de filtrage pour couper le bruit, mais un temps de stabilisation plus court que la durée d'une voie.</p>");
          j.suite();
        } });
    } }
  ]
});
