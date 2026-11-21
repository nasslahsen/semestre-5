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
    { x: 30, y: 50, w: W, h: H, t: "Déclenchement", sous: "DSI, puis direction générale" },
    { x: 345, y: 50, w: W, h: H, t: "Priorisation", sous: "oncologue, avec le pharmacien" },
    { x: 660, y: 50, w: W, h: H, t: "Prescription et identité", sous: "oncologue, pharmacien" },
    { x: 660, y: 320, w: W, h: H, t: "Préparation et étiquetage", sous: "pharmacie" },
    { x: 345, y: 320, w: W, h: H, t: "Administration", sous: "deux infirmiers" },
    { x: 30, y: 320, w: W, h: H, t: "Retour à la normale", sous: "pharmacien, identitovigilance, qualité" }
  ];
  var textes = [
    "Le DSI confirme la panne et sa durée prévue. La direction générale déclenche le mode dégradé. Les services sont prévenus par téléphone.",
    "L'oncologue revoit les 12 patients : il maintient les cures dont le report compromet le traitement et reporte les autres de 24 à 48 h.",
    "Ordonnances papier préimprimées et signées, doses recalculées par le pharmacien, identité vérifiée sur le bracelet et une pièce d'identité.",
    "Double contrôle humain tracé sur la fiche de fabrication. Étiquettes de secours préimprimées, contresignées par deux personnes.",
    "Deux infirmiers vérifient le patient, la poche et la programmation de la pompe, lue à voix haute. Feuille d'administration papier.",
    "Ressaisie dans le DPI sous 24 h, rapprochement des identités, déclaration de l'événement et retour d'expérience."
  ];
  A.etapesFig(f, noeuds, textes, { taille: 21, depart: "Le SIH vient de tomber. Avance étape par étape.", noms: ["Déclencher", "Prioriser", "Prescrire", "Préparer", "Administrer", "Revenir"] });
})();
