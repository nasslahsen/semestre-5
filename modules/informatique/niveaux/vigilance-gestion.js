/* Niveau : points de vigilance de la gestion centralisée (séance 3, diapositive 25). */
NIVEAU(SIS.rejouable({
  id: "vigilance-gestion",
  init: function (fig) { return { g: SIS.s("g", null, fig.svg) }; },
  etapes: [
    { nom: "Quel piège ?", jouer: function (j, n) {
      j.titre("Relie chaque situation au point de vigilance du cours.");
      SIS.associer(j, n.g, ["Le fabricant de l'IRM a un VPN permanent rien qu'à lui", "Les configurations ne ressemblent plus aux règles écrites", "Une mise à jour du cœur de réseau prévue en pleine journée", "Le serveur de gestion n'est pas redondé"], ["Point unique de défaillance et de compromission", "Fenêtres négociées avec les soins", "Même bastion, accès limité dans le temps", "Détection de dérive et audit"], [2, 3, 1, 0], {
        aide: function (i) { return ["Les DM passent par le même bastion que le reste.", "Une politique non vérifiée n'existe pas.", "Un hôpital fonctionne 24 h/24.", "La plateforme doit être la mieux protégée."][i]; },
        bravo: "Bastion, dérive, fenêtres, plateforme protégée." });
    } },
    { nom: "Le rôle du biomédical", jouer: function (j, n) {
      SIS.scene(n.g, { icones: ["personne", "moniteur"], titre: "Télémaintenance du scanner", sous: "demandée par le fabricant" });
      j.titre("Le fabricant demande à se connecter au scanner pour une intervention. Que met en place l'ingénieur biomédical ?");
      j.choix([{ html: "Un accès direct permanent, pour gagner du temps", aide: "Un identifiant volé chez le fabricant suffirait alors à entrer." }, { html: "Un accès par le bastion, limité dans le temps de l'intervention", juste: true }, { html: "Le mot de passe administrateur du réseau", aide: "Comptes nominatifs, moindre privilège : jamais de mot de passe partagé." }], { colonnes: 1, ok: function () { j.bravo("Même bastion que les administrateurs, et un accès limité dans le temps."); j.suite(); } });
    } },
    { nom: "Une politique non vérifiée", jouer: function (j, n) {
      SIS.scene(n.g, { icones: ["document", "engrenage"], titre: "La politique écrite en 2023", sous: "jamais auditée depuis" });
      j.titre("Que dit le cours d'une politique d'administration qu'on ne vérifie jamais ?");
      j.choix([{ html: "Elle reste valable tant qu'elle est écrite", aide: "Les configurations dérivent peu à peu." }, { html: "Elle n'existe pas : sans détection de dérive ni audit, les configurations s'en écartent", juste: true }, { html: "Elle doit être réécrite chaque mois", aide: "Il faut la vérifier, pas la réécrire." }], { colonnes: 1, ok: function () { j.bravo("Une politique non vérifiée n'existe pas."); j.suite(); } });
    } }
  ]
}));
