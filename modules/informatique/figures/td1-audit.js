/* Figure : les six étapes du mode dégradé (24 h sans SIH), révélées une à une, avec le responsable de chaque décision. */
(function () {
  "use strict";
  var R = RM, A = SIS;
  var f = R.figure("fig-td1-audit", {
    largeur: 960, hauteur: 540, titre: "24 h sans SIH : le mode dégradé",
    essai: "<strong>Essaie</strong> : avance étape par étape. <strong>Observe</strong> : chaque contrôle que le système faisait seul est remplacé par un contrôle humain, et chaque décision a un responsable."
  });
  var W = 270, H = 160;
  var noeuds = [
    { x: 30, y: 50, w: W, h: H, t: "Déclenchement", sous: "pharmacienne et DSI, ensemble" },
    { x: 345, y: 50, w: W, h: H, t: "Priorisation", sous: "oncologue" },
    { x: 660, y: 50, w: W, h: H, t: "Prescription et identité", sous: "oncologue, pharmacienne" },
    { x: 660, y: 320, w: W, h: H, t: "Préparation et étiquetage", sous: "pharmacie" },
    { x: 345, y: 320, w: W, h: H, t: "Administration", sous: "contrôle à deux" },
    { x: 30, y: 320, w: W, h: H, t: "Retour à la normale", sous: "pharmacie, puis déclaration" }
  ];
  // Réponses du modèle de l'enseignant (fiche de synthèse remplie)
  var textes = [
    "Décision conjointe de la pharmacienne et de la DSI, annonce immédiate aux services.",
    "Les patients dont le traitement ne peut être différé passent en premier. Les autres sont reportés sur décision de l'oncologue.",
    "Prescriptions papier pré-numérotées, signées par l'oncologue et validées par la pharmacienne. Identité vérifiée sur le bracelet.",
    "Double contrôle manuel indépendant, étiquettes de secours pré-imprimées, contrôle à deux.",
    "Contrôle à deux de l'identité, de la poche et de la programmation de la pompe.",
    "Ressaisie et rapprochement des données, vérification par la pharmacie, déclaration de l'événement. Responsables du mode dégradé : la pharmacienne cheffe et le cadre de santé du centre."
  ];
  A.etapesFig(f, noeuds, textes, { taille: 21, depart: "Le SIH vient de tomber. Avance étape par étape.", noms: ["Déclencher", "Prioriser", "Prescrire", "Préparer", "Administrer", "Revenir"] });
})();
