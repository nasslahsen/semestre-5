/* Révision du chapitre 1 : missions, circuit, phases, secteurs, biosécurité, dans des situations nouvelles. */
NIVEAU(LABO.rejouable({
  id: "revision-laboratoire",
  init: function (fig) {
    var A = LABO, C = A.C, g = A.s("g", null, fig.svg);
    var n = { g: g, pl: { P: function (v) { return v; } } };
    n.scene = function (icones, texte) {
      A.vider(g);
      icones.forEach(function (ic, i) { A.icone(g, ic, [340 + (i - (icones.length - 1) / 2) * 190, 240], 130, i === 0 ? C.jeu : C.doux); });
      if (texte) A.texte(g, texte, [340, 440], { taille: 20, gras: 700, largeur: 600 });
    };
    return n;
  },
  etapes: [
    { nom: "Une étiquette illisible", jouer: function (j, n) {
      n.scene(["tube", "reception"], "tube reçu : étiquette illisible");
      j.titre("Un tube arrive au laboratoire avec une étiquette illisible. À quelle étape du circuit doit-il être arrêté ?");
      j.choix([
        { html: "Réception et tri : on vérifie la conformité avant tout", juste: true },
        { html: "Analyse : l'automate le refusera", aide: "Attendre l'automate, c'est laisser passer un tube non conforme à travers toute la préparation." },
        { html: "Validation : le biologiste corrigera", aide: "On ne valide pas un résultat dont on ne sait pas à qui il appartient." }
      ], { colonnes: 1, ok: function () { j.bravo("La réception vérifie la conformité, enregistre et oriente."); j.suite(); } });
    } },
    { nom: "Un résultat retenu", jouer: function (j, n) {
      n.scene(["valider", "medecin"], "résultat incohérent : pas encore transmis");
      j.titre("Le biologiste retient un résultat incohérent avec celui de la veille avant de le transmettre. Dans quelle phase est-on ?");
      j.choix([
        { html: "Pré-analytique", aide: "Le résultat existe déjà : la mesure est faite." },
        { html: "Analytique", aide: "La mesure est terminée ; on décide maintenant de la suite à donner au chiffre." },
        { html: "Post-analytique", juste: true }
      ], { colonnes: 3, ok: function () { j.bravo("Post-analytique : validation, interprétation, communication."); j.suite(); } });
    } },
    { nom: "Une épidémie", jouer: function (j, n) {
      n.scene(["bouclier", "personne"], "hausse des cas dans la ville");
      j.titre("Le laboratoire signale aux autorités une hausse brutale des intoxications au monoxyde de carbone dans la ville. Quelle mission remplit-il ?");
      j.choix([
        { html: "Diagnostic", aide: "Il ne s'agit pas d'un patient, mais d'une tendance dans une population." },
        { html: "Santé publique", juste: true },
        { html: "Suivi thérapeutique", aide: "Aucun traitement n'est surveillé ici." }
      ], { colonnes: 3, ok: function () { j.bravo("Santé publique : vigilance sanitaire, épidémies, intoxications."); j.suite(); } });
    } },
    { nom: "Le circuit à compléter", jouer: function (j, n) {
      n.scene(["medecin", "tube", "valider"]);
      j.titre("Complète le circuit de l'échantillon.");
      var res = j.zone("", "");
      var L = ["Prescription", null, "Transport", null, "Préparation", null, "Validation et rendu"], att = ["p", "r", "a"], k = 0;
      var z = j.zone("", '<div style="display:flex;flex-direction:column;gap:6px">' + L.map(function (x) { return x ? "<b>" + x + "</b>" : '<span class="trou" data-attendu="' + att[k++] + '"></span>'; }).join("") + "</div>");
      j.jetons({
        reserve: res, trous: [].slice.call(z.querySelectorAll(".trou")),
        jetons: [{ id: "a", html: "Analyse" }, { id: "p", html: "Prélèvement" }, { id: "r", html: "Réception et tri" }],
        aide: "Il faut un échantillon avant de le transporter ; on vérifie avant de préparer ; on mesure avant de valider.",
        ok: function () { j.bravo("Sept étapes, sans en sauter une."); j.suite(); }
      });
    } },
    { nom: "Le niveau d'un laboratoire clinique", jouer: function (j, n) {
      n.scene(["danger", "automate"]);
      j.titre("D'après le cours, à quel niveau de biosécurité travaillent la plupart des laboratoires cliniques ?");
      j.choix([
        { html: "BSL-1", aide: "BSL-1 correspond à l'enseignement de base, avec des micro-organismes non pathogènes." },
        { html: "BSL-2", juste: true },
        { html: "BSL-3", aide: "BSL-3 est réservé aux pathogènes qui causent des maladies graves par inhalation." }
      ], { colonnes: 3, ok: function () { j.bravo("BSL-2 : pathogènes du groupe 2."); j.suite(); } });
    } }
  ]
}));
