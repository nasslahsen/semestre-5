/* Niveau : purificateurs d'eau (3.8) : type 1, ce qu'élimine chaque technologie, résistivité, EDI, COT. */
NIVEAU(LABO.rejouable({
  id: "purificateurs",
  init: function (fig) {
    var A = LABO, g = A.s("g", null, fig.svg);
    return { g: g, pl: { P: function (v) { return v; } } };
  },
  etapes: [
    { nom: "Atteindre le type 1", jouer: function (j, n) {
      var A = LABO, C = A.C; A.vider(n.g); A.icone(n.g, "goutte", [340, 230], 200, C.froid);
      A.texte(n.g, "eau de qualité réactif (type 1)", [340, 420], { taille: 22, gras: 800 });
      j.titre("D'après le cours, quelle est la seule technologie capable de produire la résistivité exigée pour l'eau de type 1 ?");
      j.choix([
        { html: "L'osmose inverse", aide: "Elle retire 90 à 95 % des ions : il en reste trop." },
        { html: "La déionisation", juste: true },
        { html: "L'adsorption sur charbon actif", aide: "Le charbon retient les organiques et le chlore, pas les ions." }
      ], { colonnes: 1, ok: function () { j.bravo("La déionisation : plus de 18 MΩ·cm."); j.suite(); } });
    } },
    { nom: "Qui élimine quoi ?", jouer: function (j, n) {
      var A = LABO;
      j.titre("Relie chaque technologie à ce qu'elle élimine.");
      j.consigne("Touche une technologie, puis sa cible.");
      var p = A.paires({
        g: n.g, gauche: ["Adsorption", "Ultrafiltration", "Oxydation aux UV", "Osmose inverse"],
        droite: ["Jusqu'à 99 % des contaminants", "Chlore et matières organiques", "Traces organiques, micro-organismes inactivés", "Pyrogènes et nucléases"],
        bon: [1, 3, 2, 0], xg: 20, wg: 240, xd: 320, wd: 340, y0: 60, h: 104, pas: 134, taille: 19,
        erreur: function (m) { j.erreur(m); },
        aide: function (i) { return ["Une grande surface de charbon actif.", "Un filtre très fin, placé en sortie, pour la culture cellulaire.", "Un rayonnement qui oxyde et qui stérilise.", "La méthode la plus économique, à large spectre."][i]; },
        fin: function () { j.bravo("Charbon, ultrafiltre, UV, osmose inverse."); j.suite(); }
      });
      j.reponse(function () { p.resoudre(); });
    } },
    { nom: "Conductivité et résistivité", jouer: function (j, n) {
      var A = LABO, C = A.C; A.vider(n.g); A.icone(n.g, "eau", [340, 230], 200, C.froid);
      A.texte(n.g, "σ = 0,1 µS/cm", [340, 420], { taille: 30, gras: 800, coul: C.froid });
      j.titre("Le conductimètre affiche 0,1 µS/cm. Quelle est la résistivité de cette eau ?");
      j.nombre({ avant: "\\rho =", apres: "\\text{M}\\Omega\\cdot\\text{cm}", cases: [{ attendu: 10, tol: 0.01 }],
        aide: function () { return "Résistivité et conductivité sont inverses : ρ (MΩ·cm) = 1 / σ (µS/cm)."; },
        ok: function () { j.bravo("10 MΩ·cm."); j.expliquer("<p>\\(\\rho = 1 / 0{,}1 = 10\\) MΩ·cm. Moins il y a d'ions, plus la résistivité est grande ; elle plafonne à 18,2 MΩ·cm à 25 °C.</p>"); j.suite(); } });
    } },
    { nom: "Une valeur impossible", jouer: function (j, n) {
      var A = LABO, C = A.C; A.vider(n.g);
      A.boite(n.g, 140, 200, 400, 160, { fond: "#fff", bord: C.encre, ep: 3, rx: 16 });
      A.texte(n.g, "25,0 MΩ·cm", [340, 280], { taille: 44, gras: 800, coul: C.ko });
      A.texte(n.g, "résistivimètre, 25 °C", [340, 400], { taille: 20, gras: 700, coul: C.doux });
      j.titre("Le résistivimètre en ligne affiche 25,0 MΩ·cm à 25 °C. Qu'en penses-tu ?");
      j.choix([
        { html: "Excellente eau, meilleure que l'ultrapure", aide: "Le cours donne un maximum théorique pour la résistivité de l'eau." },
        { html: "Impossible : le maximum théorique est 18,2 MΩ·cm, le capteur est à vérifier", juste: true },
        { html: "Normal pour une eau distillée", aide: "L'eau distillée doit dépasser 3 × 10⁵ Ω·cm, soit 0,3 MΩ·cm ; 25 MΩ·cm n'est atteint par aucune eau." }
      ], { colonnes: 1, ok: function () { j.bravo("Au-delà de 18,2 MΩ·cm, la mesure est fausse."); j.suite(); } });
    } },
    { nom: "Pourquoi l'EDI ?", jouer: function (j, n) {
      var A = LABO, C = A.C; A.vider(n.g); A.icone(n.g, "eclair", [340, 260], 200, C.jeu);
      j.titre("Qu'apporte l'électrodéionisation par rapport à une cartouche de déionisation classique ?");
      j.choix([
        { html: "Elle élimine aussi les bactéries", aide: "Comme la déionisation, elle n'élimine ni bactéries, ni pyrogènes, ni organiques." },
        { html: "Un courant électrique régénère les résines en continu", juste: true },
        { html: "Elle accepte une eau d'alimentation de mauvaise qualité", aide: "C'est l'inverse : elle exige une eau d'alimentation de très bonne qualité." }
      ], { colonnes: 1, ok: function () { j.bravo("Régénération continue et automatique : pas de cartouche épuisée."); j.suite(); } });
    } }
  ]
}));
