/* Niveau : objectifs de sécurité dès la conception et définition du cloisonnement (séance 3, diapositives 2 à 5). */
NIVEAU(SIS.rejouable({
  id: "conception-securisee",
  init: function (fig) { return { g: SIS.s("g", null, fig.svg) }; },
  etapes: [
    { nom: "Quatre objectifs", jouer: function (j, n) {
      j.titre("Relie chaque besoin du réseau hospitalier à l'objectif de sécurité qu'il sert.");
      SIS.associer(j, n.g, ["Le PACS doit répondre en pleine nuit", "Seuls les médecins lisent les comptes rendus", "Une posologie ne doit pas changer en route", "Savoir qui a modifié une règle du pare-feu"], ["Intégrité", "Traçabilité", "Disponibilité", "Confidentialité"], [2, 3, 0, 1], {
        aide: function (i) { return ["Le service doit être là.", "Seuls les ayants droit.", "Pas de modification à tort.", "Qui, quoi, quand."][i]; },
        bravo: "Le triangle d'or plus la traçabilité." });
    } },
    { nom: "Quand ?", jouer: function (j, n) {
      SIS.scene(n.g, { icones: ["document", "reseau"], titre: "Le plan du nouveau réseau", sous: "avant l'installation du premier câble" });
      j.titre("Quand le cours dit-il d'inclure les exigences de sécurité dans un réseau ?");
      j.choix([{ html: "Après le premier incident", aide: "C'est la façon la plus chère de faire." }, { html: "Dès la phase de conception du réseau", juste: true }, { html: "Lors de l'audit annuel", aide: "L'audit vérifie ; il ne conçoit pas." }], { ok: function () { j.bravo("La sécurité s'intègre dès la conception."); j.suite(); } });
    } },
    { nom: "Cloisonner", jouer: function (j, n) {
      var A = SIS; A.vider(n.g);
      A.texte(n.g, "Le cloisonnement", [340, 110], { taille: 30, gras: 800 });
      j.titre("Complète la définition du cloisonnement.");
      var z = j.zone("", '<p style="font-size:19px;line-height:2.4">Le cloisonnement sépare le réseau en domaines <span class="trou" data-attendu="p"></span> et logiques, protégés chacun par un <span class="trou" data-attendu="s"></span> bien défini.</p>');
      j.jetons({ trous: [].slice.call(z.querySelectorAll(".trou")), jetons: [{ id: "s", html: "périmètre de sécurité" }, { id: "c", html: "chiffrement" }, { id: "p", html: "physiques" }], aide: "Deux sortes de domaines, et une frontière autour de chacun.", ok: function () { j.bravo("Domaines physiques et logiques, chacun avec son périmètre de sécurité."); j.suite(); } });
    } }
  ]
}));
