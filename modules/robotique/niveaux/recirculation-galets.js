/* Niveau : guidages à recirculation et à galets. Course illimitée, rectitude, table sur deux rails, choix des galets. */
NIVEAU({
  id: "recirculation-galets",
  init: function (fig) {
    var C = D.C, g = E.s("g", null, fig.svg);
    var n = { vue: "patin" };
    n.dessin = function () {
      E.vider(g);
      if (n.vue === "patin") {
        // vue de côté : rail, patin, circuit de billes oblong
        E.s("rect", { x: 40, y: 340, width: 600, height: 50, fill: "#c6cbd8", stroke: C.encre, "stroke-width": 2.5 }, g);
        E.s("rect", { x: 200, y: 230, width: 280, height: 110, rx: 8, fill: "#9aa0ad", stroke: C.encre, "stroke-width": 2.5, opacity: 0.55 }, g);
        [170, 480].forEach(function (x) { E.s("rect", { x: x, y: 230, width: 30, height: 110, fill: "#c9473f", stroke: C.encre, "stroke-width": 2 }, g); });
        var L = 300, e = 30, cx = 340, cy = 300;
        for (var k = 0; k < 30; k++) {
          var s = k / 30 * (2 * L + 2 * Math.PI * e), p;
          if (s < L) p = [cx - L / 2 + s, cy + e];
          else if (s < L + Math.PI * e) { var a = Math.PI / 2 - (s - L) / e; p = [cx + L / 2 + e * Math.cos(a), cy + e * Math.sin(a)]; }
          else if (s < 2 * L + Math.PI * e) p = [cx + L / 2 - (s - L - Math.PI * e), cy - e];
          else { var b = -Math.PI / 2 - (s - 2 * L - Math.PI * e) / e; p = [cx - L / 2 + e * Math.cos(b), cy + e * Math.sin(b)]; }
          E.s("circle", { cx: p[0], cy: p[1], r: 8, fill: p[1] > cy + e - 1 ? C.jeu : "#dfe3ea", stroke: C.encre, "stroke-width": 1.5 }, g);
        }
        D.texte(g, "pièce de tête", [185, 205], { taille: 17 });
        D.texte(g, "rail", [600, 420], { taille: 17 });
      } else if (n.vue === "table") {
        E.s("rect", { x: 40, y: 430, width: 600, height: 50, fill: "#4a78c2", opacity: 0.6, stroke: C.encre, "stroke-width": 2 }, g);
        E.s("rect", { x: 80, y: 250, width: 520, height: 40, fill: "#e2b93b", stroke: C.encre, "stroke-width": 2 }, g);
        [[170, "palier libre"], [510, "palier fixe"]].forEach(function (q) {
          E.s("rect", { x: q[0] - 40, y: 290, width: 80, height: 60, fill: "#9aa0ad", stroke: C.encre, "stroke-width": 2 }, g);
          E.s("rect", { x: q[0] - 25, y: 350, width: 50, height: 80, fill: "#c6cbd8", stroke: C.encre, "stroke-width": 2 }, g);
          D.texte(g, q[1], [q[0], 520], { taille: 18 });
        });
        if (n.butees) E.s("rect", { x: 535, y: 350, width: 22, height: 80, fill: "#8b3fd9" }, g);
        D.texte(g, "table", [340, 225], { taille: 18 });
        D.texte(g, "bâti", [340, 505], { taille: 18, coul: "#fff" });
      } else {
        // galets : coupe, rail central, deux arbres, galets à gorge
        E.s("path", { d: "M240 420 L440 420 L420 330 L260 330 Z", fill: "#5aa36f", stroke: C.encre, "stroke-width": 2.5 }, g);
        [[255, 320], [425, 320]].forEach(function (p) { E.s("circle", { cx: p[0], cy: p[1], r: 22, fill: "#e2b93b", stroke: C.encre, "stroke-width": 2.5 }, g); });
        [[170, 320], [510, 320]].forEach(function (p) {
          E.s("rect", { x: p[0] - 44, y: p[1] - 40, width: 88, height: 80, rx: 10, fill: "#4a78c2", stroke: C.encre, "stroke-width": 2.5 }, g);
        });
        E.s("rect", { x: 100, y: 200, width: 480, height: 60, fill: "#e8e3c9", stroke: C.encre, "stroke-width": 2.5 }, g);
        D.texte(g, "galet", [170, 395], { taille: 17 }); D.texte(g, "arbre", [340, 290], { taille: 17 });
      }
    };
    n.dessin();
    return n;
  },
  etapes: [
    { nom: "Course illimitée", jouer: function (j, n) {
      n.vue = "patin"; n.dessin();
      j.fig.astuce("Patin sur son rail : billes chargées en couleur.");
      j.titre("Pourquoi la course d'un patin à recirculation n'est-elle pas limitée ?");
      j.choix([
        { html: "Les billes recirculent : les pièces de tête canalisent leur retour", juste: true },
        { html: "Le rail est très long", aide: "Un rail peut s'allonger, mais sans retour, les billes finiraient par sortir du patin." },
        { html: "Les billes glissent au lieu de rouler", aide: "Elles roulent ; c'est leur chemin en boucle qui compte." }
      ], { colonnes: 1, ok: function () {
        j.bravo("La recirculation donne une course illimitée.");
        j.expliquer("<p>Le système associe le <b>chariot</b> (patin) et le <b>rail</b>. Les pièces de tête canalisent le retour des billes ; lubrification et étanchéité passent par des <b>joints racleurs</b>.</p>");
        j.suite();
      } });
    } },
    { nom: "Rectitude", jouer: function (j, n) {
      n.vue = "patin"; n.dessin();
      j.fig.astuce("Écart de rectitude : 3 à 20 µm par mètre.");
      j.titre("Au pire, l'écart de rectitude vaut 20 µm par mètre. Quel écart sur un rail de 2 m ?");
      j.nombre({ avant: "\\text{écart} =", apres: "\\mu\\text{m}", cases: [{ attendu: 40, tol: 0.5 }], ligne: true,
        aide: function () { return "L'écart est donné par mètre : multiplie par la longueur."; },
        ok: function () {
          j.bravo("40 µm, soit 0,04 mm.");
          j.expliquer("\\[ \\text{écart} = 20 \\times 2 = 40\\ \\mu\\text{m} \\]<p>Patin et rails sont en acier trempé et rectifié (HRC 60) : pratiquement sans jeu, sans rotation autour du rail, 3 à 5 m/s, 150 à 250 m/s².</p>");
          j.suite();
        } });
    } },
    { nom: "Table sur deux rails", jouer: function (j, n) {
      n.vue = "table"; n.butees = false; n.dessin();
      j.fig.astuce("Une table, deux rails parallèles, quatre patins.");
      j.titre("Où met-on les butées latérales qui brident le rail ?");
      j.choix([
        { html: "Sur un seul rail (palier fixe) ; l'autre reste libre", juste: true },
        { html: "Sur les deux rails, pour plus de rigidité", aide: "Deux rails bridés ne laissent aucune place aux défauts de parallélisme ni aux dilatations : comme deux paliers fixes." },
        { html: "Sur aucun, les patins suffisent", aide: "Il faut bien une référence qui fixe la position de la table." }
      ], { colonnes: 1, ok: function () {
        n.butees = true; n.dessin();
        j.bravo("Un palier fixe, un palier libre.");
        j.expliquer("<p>Le <b>palier fixe</b> a des butées latérales. Le <b>palier libre</b> n'en a pas : il absorbe les défauts de parallélisme et les dilatations thermiques entre les deux rails, sans gripper les billes. Surfaces d'appui à 0,01 mm près.</p>");
        j.suite();
      } });
    } },
    { nom: "Poussière et vitesse", jouer: function (j, n) {
      n.vue = "galets"; n.dessin();
      j.fig.astuce("Vue en coupe d'un guidage.");
      j.titre("Un convoyeur d'échantillons doit aller à 8 m/s dans un local poussiéreux. Quel guidage du cours ?");
      j.choix([
        { html: "Patin à recirculation", aide: "Il plafonne à 3 à 5 m/s." },
        { html: "Douille à billes", aide: "Elle plafonne à 2 à 5 m/s." },
        { html: "Chariot à galets", juste: true }
      ], { ok: function () {
        j.bravo("Les galets : environ 10 m/s, peu sensibles à la pollution.");
        j.expliquer("<p>Chariot à <b>quatre galets</b> sur un rail en alliage léger muni de deux arbres d'acier trempé et rectifié. Moins sensible aux blocages dus à la pollution externe, vitesse de l'ordre de 10 m/s.</p>");
        j.suite();
      } });
    } },
    { nom: "La gorge du galet", jouer: function (j, n) {
      n.vue = "galets"; n.dessin();
      j.fig.astuce("Galets bleus, arbres jaunes, rail vert.");
      j.titre("Pourquoi le profil extérieur des galets est-il concave ?");
      j.choix([
        { html: "La gorge épouse la forme ronde de l'arbre", juste: true },
        { html: "Pour garder la graisse", aide: "Le contact est ouvert : il ne retient rien, il chasse même la poussière." },
        { html: "Pour alléger le galet", aide: "Regarde contre quoi roule le galet." }
      ], { colonnes: 1, ok: function () {
        j.bravo("La gorge épouse l'arbre.");
        j.expliquer("<p>Le contact linéaire ouvert accumule très peu les impuretés : les galets chassent naturellement la poussière en roulant sur l'arbre.</p>");
        j.suite();
      } });
    } }
  ]
});
