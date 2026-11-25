/* Niveau : douilles à billes et rails. Rotation interdite, jeu des trois douilles, rail supporté, vitesse. */
NIVEAU({
  id: "guidages-lineaires",
  init: function (fig) {
    var C = D.C, g = E.s("g", null, fig.svg);
    var n = { type: "massive", rail: "simple", libre: true };
    // coupe d'une douille sur son rail (à gauche) et vue de côté du rail (à droite)
    n.dessin = function () {
      E.vider(g);
      var c = [190, 250], H = MECA.hachures(g, "#5b6172", { fond: "#fff" });
      var ouv = n.type === "ouverte" ? 0.55 : n.type === "fendue" ? 0.06 : 0;
      function anneau(r1, r2, a0, a1, fill) {
        var p = function (r, a) { return [c[0] + r * Math.cos(a), c[1] - r * Math.sin(a)]; };
        var gr = a1 - a0 > Math.PI ? 1 : 0, A = p(r2, a0), B = p(r2, a1), Cc = p(r1, a1), Dd = p(r1, a0);
        E.s("path", { d: "M" + A + " A" + r2 + " " + r2 + " 0 " + gr + " 0 " + B + " L" + Cc + " A" + r1 + " " + r1 + " 0 " + gr + " 1 " + Dd + " Z", fill: fill, stroke: C.encre, "stroke-width": 2.5 }, g);
      }
      var a0 = -Math.PI / 2 + ouv, a1 = 3 * Math.PI / 2 - ouv;
      if (ouv) anneau(118, 160, a0, a1, H); else E.s("circle", { cx: c[0], cy: c[1], r: 139, fill: "none", stroke: "#5b6172", "stroke-width": 42, opacity: 0.35 }, g);
      if (!ouv) { E.s("circle", { cx: c[0], cy: c[1], r: 160, fill: "none", stroke: C.encre, "stroke-width": 2.5 }, g); E.s("circle", { cx: c[0], cy: c[1], r: 118, fill: "none", stroke: C.encre, "stroke-width": 2.5 }, g); }
      E.s("circle", { cx: c[0], cy: c[1], r: 92, fill: "#dfe3ea", stroke: C.encre, "stroke-width": 2.5 }, g);
      for (var k = 0; k < 8; k++) {
        var a = Math.PI / 2 + k * Math.PI / 4;
        if (ouv > 0.3 && Math.abs(Math.sin(a) + 1) < 0.4) continue;
        E.s("circle", { cx: c[0] + 105 * Math.cos(a), cy: c[1] - 105 * Math.sin(a), r: 12, fill: C.jeu, stroke: C.encre, "stroke-width": 1.5 }, g);
      }
      if (n.type === "ouverte") E.s("path", { d: "M" + (c[0] - 40) + " " + (c[1] + 240) + " L" + (c[0] - 20) + " " + (c[1] + 80) + " L" + (c[0] + 20) + " " + (c[1] + 80) + " L" + (c[0] + 40) + " " + (c[1] + 240) + " Z", fill: "#c6cbd8", stroke: C.encre, "stroke-width": 2 }, g);
      D.texte(g, "douille " + n.type, [c[0], 50], { taille: 20, gras: true });
      // vue de côté du rail
      var x0 = 400, x1 = 650, y = 250, f = n.rail === "simple" ? 34 : 0;
      E.s("path", { d: "M" + x0 + " " + y + " Q" + (x0 + x1) / 2 + " " + (y + 2 * f) + " " + x1 + " " + y, fill: "none", stroke: "#8a93a3", "stroke-width": 18, "stroke-linecap": "round" }, g);
      if (n.rail === "simple") [x0, x1].forEach(function (x) { E.s("rect", { x: x - 14, y: y + 10, width: 28, height: 50, fill: C.encre }, g); });
      else E.s("rect", { x: x0, y: y + 10, width: x1 - x0, height: 26, fill: "#c6cbd8", stroke: C.encre, "stroke-width": 2 }, g);
      E.s("rect", { x: (x0 + x1) / 2 - 30, y: y + f - 40, width: 60, height: 30, rx: 6, fill: C.jeu, stroke: C.encre, "stroke-width": 2 }, g);
      D.fleche(g, [(x0 + x1) / 2, y + f - 110], [(x0 + x1) / 2, y + f - 46], C.ko, 4);
      D.texte(g, n.rail === "simple" ? "rail simple" : "rail supporté", [(x0 + x1) / 2, y + 120], { taille: 18 });
    };
    n.dessin();
    return n;
  },
  etapes: [
    { nom: "Translation seulement", jouer: function (j, n) {
      n.type = "massive"; n.rail = "supporte"; n.dessin();
      j.fig.astuce("Douille à billes sur rail rond, en coupe.");
      j.titre("Peut-on monter une douille à billes pour guider un arbre qui tourne sur lui-même ?");
      j.choix([
        { html: "Non : la douille n'admet pas les mouvements de rotation", juste: true },
        { html: "Oui, les billes roulent dans tous les sens", aide: "Le cours est clair sur ce point : relis ce que la douille n'admet pas." },
        { html: "Oui, si la course est courte", aide: "La longueur de course n'est jamais la limite d'une douille : elle convient à toutes les courses." }
      ], { colonnes: 1, ok: function () {
        j.bravo("Une douille guide une translation, pas une rotation.");
        j.expliquer("<p>Les douilles à billes sont <b>simples et économiques</b>, conviennent pour n'importe quelle longueur de course, mais n'admettent pas les mouvements de rotation. La douille fait recirculer les billes en se translatant.</p>");
        j.suite();
      } });
    } },
    { nom: "Le jeu de la douille massive", jouer: function (j, n) {
      n.type = "massive"; n.dessin();
      j.fig.astuce("Douille massive : la bague est d'une seule pièce.");
      j.titre("Une douille massive ne se règle pas. Quel jeu fonctionnel environ le cours lui donne-t-il ?");
      j.nombre({ avant: "\\text{jeu} \\approx", apres: "\\text{mm}", cases: [{ attendu: 0.1, tol: 0.001 }], ligne: true,
        aide: function () { return "C'est un dixième de millimètre."; },
        ok: function () {
          j.bravo("Environ 0,1 mm.");
          j.expliquer("<p>Douille <b>massive</b> : jeu fonctionnel d'environ 0,1 mm, fixé par la fabrication.</p>");
          j.suite();
        } });
    } },
    { nom: "Régler le jeu", jouer: function (j, n) {
      n.type = "fendue"; n.dessin();
      j.fig.astuce("Regarde la bague extérieure.");
      j.titre("Sur une table de radiologie, il faut pouvoir régler le jeu radial autour du rail. Quelle douille choisir ?");
      j.choix([
        { html: "Douille massive", aide: "Son jeu d'environ 0,1 mm est fixe : rien ne permet de le régler." },
        { html: "Douille à bague extérieure fendue", juste: true },
        { html: "Douille ouverte", aide: "Son ouverture sert à autre chose : passer le support du rail." }
      ], { colonnes: 1, ok: function () {
        j.bravo("La fente permet de pincer ou d'écarter la bague.");
        j.expliquer("<p>Dans le montage du cours (douille fendue sur rail supporté), une vis de réglage pince ou écarte légèrement le palier grâce à la fente : on ajuste le jeu radial autour du rail.</p>");
        j.suite();
      } });
    } },
    { nom: "Un rail très long", jouer: function (j, n) {
      n.type = "ouverte"; n.rail = "simple"; n.dessin();
      j.fig.astuce("À droite : le rail tenu seulement à ses bouts.");
      j.titre("Un rail rond de 1,5 m, tenu à ses deux bouts, fléchit sous la charge. Que propose le cours ?");
      j.choix([
        { html: "Un rail supporté par un profilé en aluminium, avec une douille ouverte", juste: true },
        { html: "Une douille massive, plus rigide", aide: "Ce n'est pas la douille qui fléchit, c'est le rail entre ses appuis." },
        { html: "Un rail plus court", aide: "La course est imposée par l'appareil : il faut empêcher le rail de fléchir sur toute sa longueur." }
      ], { colonnes: 1, ok: function () {
        n.rail = "supporte"; n.dessin();
        j.bravo("Rail supporté et douille ouverte.");
        j.expliquer("<p>Le <b>rail supporté</b> est une barre ronde fixée sur un profilé en aluminium tout au long de sa longueur : plus de flexion sur les grandes portées. La douille <b>ouverte</b> laisse passer ce support.</p>");
        j.suite();
      } });
    } },
    { nom: "Vitesse", jouer: function (j, n) {
      n.type = "massive"; n.rail = "supporte"; n.dessin();
      j.fig.astuce("Douille à billes : simple et économique.");
      j.titre("Quelle vitesse de translation le cours admet-il pour une douille à billes ?");
      j.choix([
        { html: "0,2 à 0,5 m/s", aide: "C'est dix fois trop peu." },
        { html: "2 à 5 m/s", juste: true },
        { html: "environ 10 m/s", aide: "C'est l'ordre de grandeur donné pour les guidages à galets." }
      ], { ok: function () {
        j.bravo("2 à 5 m/s.");
        j.expliquer("<p>Douille à billes : 2 à 5 m/s. Patin à recirculation : 3 à 5 m/s. Chariot à galets : environ 10 m/s.</p>");
        j.suite();
      } });
    } }
  ]
});
