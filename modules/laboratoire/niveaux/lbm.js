/* Niveau : définition et missions du LBM (1.1), types de laboratoires (1.2). */
NIVEAU(LABO.rejouable({
  id: "lbm",
  init: function (fig) {
    var A = LABO, C = A.C, g = A.s("g", null, fig.svg);
    var n = { mode: "missions", pl: { P: function (v) { return v; } } };
    n.MISSIONS = [["Diagnostic", "medecin"], ["Suivi thérapeutique", "horloge"], ["Prévention et dépistage", "personne"], ["Santé publique", "bouclier"]];
    n.dessin = function (on) {
      A.vider(g);
      if (n.mode === "missions") {
        n.MISSIONS.forEach(function (m, i) {
          var x = 30 + (i % 2) * 320, y = 60 + Math.floor(i / 2) * 260, actif = on === i;
          A.boite(g, x, y, 300, 220, { fond: actif ? C.jeuPale : "#fff", bord: actif ? C.jeu : C.trait, ep: actif ? 4 : 2.5, rx: 18 });
          A.icone(g, m[1], [x + 150, y + 80], 64, actif ? C.jeu : C.doux);
          A.texte(g, m[0], [x + 150, y + 168], { taille: 21, gras: 800, largeur: 260 });
        });
      } else if (n.mode === "paires") {
        g.appendChild(n.gp);
      } else {
        // schéma d'un type de laboratoire
        var t = n.mode;
        if (t === "hopital") {
          A.boite(g, 150, 120, 380, 330, { fond: C.fond, bord: C.encre, rx: 10 });
          A.texte(g, "Centre hospitalier universitaire", [340, 90], { taille: 20, gras: 800 });
          [[190, 170], [300, 170], [410, 170], [190, 260], [410, 260]].forEach(function (p) { A.boite(g, p[0], p[1], 80, 60, { fond: "#fff", bord: C.trait, rx: 6 }); });
          A.boite(g, 280, 250, 120, 90, { fond: C.jeuPale, bord: C.jeu, ep: 3.5, rx: 10, titre: "Laboratoire", taille: 17 });
          A.icone(g, "horloge", [340, 400], 54, C.jeu);
          A.texte(g, "24 h sur 24 : urgences vitales, patients hospitalisés", [340, 500], { taille: 18, largeur: 520 });
        } else if (t === "reseau") {
          var c = [340, 300];
          A.boite(g, c[0] - 110, c[1] - 55, 220, 110, { fond: C.jeuPale, bord: C.jeu, ep: 3.5, rx: 14, titre: "Plateforme régionale", taille: 18 });
          for (var k = 0; k < 5; k++) {
            var a = -Math.PI / 2 + k * 2 * Math.PI / 5, p = [c[0] + 230 * Math.cos(a), c[1] + 215 * Math.sin(a)];
            A.fleche(g, [p[0] - 40 * Math.cos(a), p[1] - 40 * Math.sin(a)], [c[0] + 125 * Math.cos(a), c[1] + 70 * Math.sin(a)], { coul: C.gris, ep: 3.5 });
            A.boite(g, p[0] - 60, p[1] - 32, 120, 64, { fond: "#fff", bord: C.encre, rx: 10, titre: "Site " + (k + 1), taille: 16 });
          }
        } else if (t === "corelab") {
          A.boite(g, 60, 130, 560, 300, { fond: C.fond, bord: C.encre, rx: 12 });
          ["Biochimie", "Hématologie", "Microbiologie"].forEach(function (s, i) {
            A.boite(g, 90 + i * 180, 170, 160, 70, { fond: "#fff", bord: C.encre, rx: 10, titre: s, taille: 16 });
            A.icone(g, "automate", [170 + i * 180, 300], 64, C.jeu);
          });
          A.chemin(g, [[90, 380], [590, 380]], { coul: C.jeu, ep: 6 });
          A.texte(g, "des milliers de tubes par jour", [340, 470], { taille: 18, coul: C.doux, gras: 500 });
        }
      }
    };
    n.dessin();
    return n;
  },
  etapes: [
    { nom: "Quelle mission ?", jouer: function (j, n) {
      j.titre("Un patient sous anticoagulant fait une prise de sang chaque mois pour adapter sa dose. Quelle mission du laboratoire ?");
      j.choix([
        { html: "Diagnostic", aide: "La maladie est déjà connue : on ne cherche pas à la confirmer. Que fait-on avec le traitement ?" },
        { html: "Suivi thérapeutique", juste: true },
        { html: "Prévention et dépistage", aide: "Le dépistage cherche une maladie avant les symptômes. Ici, le patient est déjà traité." },
        { html: "Santé publique", aide: "Il s'agit d'un seul patient, pas d'une épidémie." }
      ], { colonnes: 2, ok: function () {
        n.dessin(1);
        j.bravo("Suivi thérapeutique : surveiller l'évolution et l'efficacité du traitement.");
        j.expliquer("<p>Le cours donne quatre missions au LBM : <b>diagnostic</b> (confirmer ou infirmer une pathologie suspectée), <b>suivi thérapeutique</b>, <b>prévention et dépistage</b> (détecter tôt), <b>santé publique</b> (vigilance sanitaire : épidémies, intoxications).</p>");
        j.suite();
      } });
    } },
    { nom: "Chaque situation, sa mission", jouer: function (j, n) {
      var A = LABO;
      n.mode = "paires"; n.gp = A.s("g", null, null); n.dessin();
      j.titre("Relie chaque situation à la mission du laboratoire qu'elle sert.");
      j.consigne("Touche une situation à gauche, puis sa mission à droite.");
      var p = A.paires({
        g: n.gp, gauche: ["Bilan chez un adulte sans aucun symptôme", "Fièvre et toux : on cherche la cause", "Diabétique traité, contrôle tous les trois mois", "Dix intoxications au même produit dans une ville"],
        droite: ["Diagnostic", "Santé publique", "Prévention et dépistage", "Suivi thérapeutique"],
        bon: [2, 0, 3, 1], xg: 20, wg: 330, xd: 400, wd: 260, y0: 70, h: 104, pas: 130, taille: 17,
        erreur: function (m) { j.erreur(m); },
        aide: function (i) { return ["Sans symptôme, on cherche une maladie avant qu'elle ne se voie.", "On soupçonne une maladie : on veut la confirmer ou l'écarter.", "La maladie est connue et traitée : on surveille.", "Plusieurs cas dans une population : c'est la vigilance sanitaire."][i]; },
        fin: function () { j.bravo("Quatre situations, quatre missions."); j.suite(); }
      });
      j.reponse(function () { p.resoudre(); });
    } },
    { nom: "Hospitalier ou privé", jouer: function (j, n) {
      n.mode = "hopital"; n.dessin();
      j.titre("Ce laboratoire est rattaché à un CHU et fonctionne jour et nuit. Comment le cours le classe-t-il selon son statut juridique ?");
      j.choix([
        { html: "Laboratoire privé", aide: "Un laboratoire privé est ouvert au public. Celui-ci dépend d'un établissement de santé." },
        { html: "Laboratoire hospitalier", juste: true },
        { html: "Laboratoire satellite", aide: "« Satellite » décrit l'organisation en réseau, pas le statut juridique." }
      ], { colonnes: 1, ok: function () {
        j.bravo("Hospitalier : rattaché à un établissement de santé.");
        j.expliquer("<p>Selon le statut juridique : <b>privés</b>, ouverts au public, dirigés par des biologistes médicaux ; <b>hospitaliers</b>, rattachés à un établissement de santé et dirigés par des spécialistes en biologie médicale. Les laboratoires hospitaliers fonctionnent souvent 24 h sur 24 pour les urgences vitales et les patients hospitalisés.</p>");
        j.suite();
      } });
    } },
    { nom: "Un ou plusieurs sites", jouer: function (j, n) {
      n.mode = "reseau"; n.dessin();
      j.titre("Une plateforme régionale reçoit les tubes de cinq petits sites. Quelle organisation ?");
      j.choix([
        { html: "Mono-site", aide: "Compte les sites sur le schéma : il y en a plus d'un." },
        { html: "Réseau multisites", juste: true },
        { html: "Core Lab", aide: "Le Core Lab décrit les spécialités regroupées, pas le nombre de sites." }
      ], { colonnes: 1, ok: function () {
        j.bravo("Réseau multisites : une plateforme régionale et des laboratoires satellites.");
        j.suite();
      } });
    } },
    { nom: "Core Lab", jouer: function (j, n) {
      n.mode = "corelab"; n.dessin();
      j.titre("Une structure centrale fait la biochimie, l'hématologie et la microbiologie, en gros volumes, sur des automates. Le cours l'appelle :");
      j.choix([
        { html: "un laboratoire regroupé, ou « Core Lab »", juste: true },
        { html: "un laboratoire spécialisé", aide: "Un laboratoire spécialisé se concentre sur une spécialité (génétique, banque de sang…). Ici, trois disciplines sont regroupées." },
        { html: "une banque de sang", aide: "La banque de sang est une spécialité à part, pas un regroupement de disciplines." }
      ], { colonnes: 1, ok: function () {
        j.bravo("Core Lab, ou laboratoire central.");
        j.expliquer("<p>Selon les spécialités : le <b>laboratoire regroupé (Core Lab)</b>, central, fait biochimie, hématologie et microbiologie en gros volumes, souvent automatisé ; les <b>laboratoires spécialisés</b> couvrent biochimie, hématologie, microbiologie, pathologie, génétique, diagnostic moléculaire, banque de sang, services transfusionnels.</p>");
        j.suite();
      } });
    } }
  ]
}));
