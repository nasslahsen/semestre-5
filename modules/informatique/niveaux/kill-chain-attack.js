/* Niveau : la kill chain en sept phases et MITRE ATT&CK (séance 2, diapositives 2 et 3). */
NIVEAU(SIS.rejouable({
  id: "kill-chain-attack",
  init: function (fig) { return { g: SIS.s("g", null, fig.svg) }; },
  etapes: [
    { nom: "Les sept phases", jouer: function (j, n) {
      j.titre("Remets les sept phases de la kill chain dans l'ordre : touche-les de la première à la dernière.");
      var T = ["Installation", "Reconnaissance", "Objectifs", "Livraison", "Armement", "C2 (pilotage)", "Exploitation"];
      SIS.ordonner(j, n.g, T, [1, 4, 3, 6, 0, 5, 2], {
        aide: function (i, att, k) { return ["Tout commence par la collecte d'informations.", "Avant d'envoyer, il faut préparer l'outil.", "L'outil préparé doit arriver jusqu'à la cible.", "Une fois livré, il faut exploiter une faille.", "Entré, l'attaquant pose une porte dérobée.", "La machine prise doit rester pilotable à distance.", "Le but final : voler ou chiffrer."][k]; },
        bravo: "Reconnaissance → armement → livraison → exploitation → installation → C2 → objectifs." });
    } },
    { nom: "Quelle phase ?", jouer: function (j, n) {
      j.titre("Relie chaque action de l'attaquant à sa phase.");
      SIS.associer(j, n.g, ["Il lit les profils des employés sur les réseaux sociaux", "Il envoie un courriel piégé à la comptabilité", "Sa machine prise reçoit des ordres à distance", "Il chiffre les serveurs et affiche la rançon"],
        ["C2 (pilotage)", "Objectifs", "Reconnaissance", "Livraison"], [2, 3, 0, 1], {
        aide: function (i) { return ["Il collecte des informations.", "Il fait parvenir l'outil à la cible.", "Une liaison distante avec la machine.", "Le dommage final."][i]; },
        bravo: "Collecter, livrer, piloter, frapper." });
    } },
    { nom: "Tactique et technique", jouer: function (j, n) {
      SIS.scene(n.g, { icones: ["document", "pirate"], titre: "MITRE ATT&CK", sous: "colonnes et cases de la matrice" });
      j.titre("Dans MITRE ATT&CK, « accès initial » est une colonne et « courriel d'hameçonnage avec pièce jointe » une case de cette colonne. Que sont-ils ?");
      j.choix([
        { html: "Deux phases successives de la kill chain", aide: "ATT&CK n'est pas une chaîne : regarde le rôle des colonnes et des cases." },
        { html: "La colonne est une tactique (le but), la case une technique (le moyen précis)", juste: true },
        { html: "La colonne est une technique, la case une tactique", aide: "Le moyen précis, c'est la technique ; il est rangé sous le but qu'il sert." }
      ], { colonnes: 1, ok: function () { j.bravo("Tactique = ce qu'il cherche à obtenir ; technique = comment il s'y prend."); j.expliquer("ATT&CK répertorie les techniques <b>réellement observées</b> chez des attaquants, rangées sous leur tactique."); j.suite(); } });
    } },
    { nom: "L'ordre", jouer: function (j, n) {
      SIS.scene(n.g, { icones: ["pirate", "reseau"], titre: "Retour à la reconnaissance", sous: "après une exploitation réussie" });
      j.titre("Après avoir exploité une faille, l'attaquant refait une reconnaissance du réseau interne. Quel modèle décrit le mieux ce retour en arrière ?");
      j.choix([
        { html: "La kill chain, qui impose l'ordre des phases", aide: "Justement : la kill chain suppose qu'on avance dans l'ordre." },
        { html: "Aucun des deux", aide: "L'un des deux accepte explicitement les retours et les sauts." },
        { html: "MITRE ATT&CK, qui n'impose pas d'ordre strict", juste: true }
      ], { colonnes: 1, ok: function () { j.bravo("ATT&CK : retours et sauts d'étapes possibles."); j.suite(); } });
    } }
  ]
}));
