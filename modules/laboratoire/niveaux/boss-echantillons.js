/* Défi du chapitre 2 : un échantillon de bout en bout, sans aide avant le premier essai. */
NIVEAU(LABO.rejouable({
  id: "boss-echantillons",
  init: function (fig) {
    var A = LABO, g = A.s("g", null, fig.svg);
    return { g: g, pl: { P: function (v) { return v; } } };
  },
  etapes: [
    { nom: "La vitesse minimale", jouer: function (j, n) {
      var A = LABO; A.vider(n.g); A.icone(n.g, "centrifugeuse", [340, 260], 220, A.C.jeu);
      j.titre("Rotor de 15 cm. Quelle vitesse minimale, en tours par minute, pour atteindre 2 000 × g ?");
      j.nombre({ avant: "N \\approx", apres: "\\text{tr/min}", cases: [{ attendu: 3453.4, tol: 8 }],
        aide: function () { return "Isole N dans RCF = 1,118 × 10⁻⁵ × r × N² : N = racine de RCF / (1,118 × 10⁻⁵ × r)."; },
        ok: function () { j.bravo("Environ 3 453 tr/min."); j.expliquer("<p>\\(N = \\sqrt{\\dfrac{2\\,000}{1{,}118 \\times 10^{-5} \\times 15}} \\approx 3\\,453\\) tr/min.</p>"); j.suite(); } });
    } },
    { nom: "Quatre incidents", jouer: function (j, n) {
      var A = LABO;
      j.titre("Relie chaque incident à son origine.");
      j.consigne("Touche un incident, puis son origine.");
      var p = A.paires({
        g: n.g, gauche: ["Plasma encore trouble de cellules", "Garrot posé deux minutes", "Bilirubine laissée au soleil", "Paillasse qui vibre près de l'automate"],
        droite: ["Environnement", "Transport et conservation", "Centrifugation et préparation", "Prélèvement"],
        bon: [2, 3, 1, 0], xg: 20, wg: 300, xd: 380, wd: 280, y0: 60, h: 104, pas: 134, taille: 18,
        erreur: function (m) { j.erreur(m); },
        aide: function (i) { return ["Des cellules dans le plasma : la séparation est incomplète.", "Une stase veineuse se crée au moment de la ponction.", "L'exposition à la lumière pendant l'attente du tube.", "Les conditions du local, pas le tube lui-même."][i]; },
        fin: function () { j.bravo("Préparation, prélèvement, conservation, environnement."); j.suite(); }
      });
      j.reponse(function () { p.resoudre(); });
    } },
    { nom: "Trouve l'erreur", jouer: function (j, n) {
      var A = LABO; A.vider(n.g); A.icone(n.g, "document", [340, 260], 200, A.C.jeu);
      j.titre("Un stagiaire décrit sa préparation d'un sérum. Une phrase est fausse : laquelle ?");
      j.choix([
        { html: "« J'ai étiqueté le tube au lit du patient. »", aide: "C'est exactement ce que demande l'identification." },
        { html: "« J'ai centrifugé le tube sec dès la fin du prélèvement. »", juste: true },
        { html: "« J'ai équilibré le rotor avec un tube de même masse en face. »", aide: "L'équilibrage est une règle de sécurité de la centrifugeuse." },
        { html: "« J'ai réparti le sérum en aliquotes avant de le congeler. »", aide: "C'est ce qui évite les cycles de congélation et décongélation." }
      ], { colonnes: 1, ok: function () { j.bravo("Pour un sérum, attendre la coagulation complète (30 à 60 minutes)."); j.suite(); } });
    } },
    { nom: "Le minuteur hors tolérance ?", jouer: function (j, n) {
      var A = LABO; A.vider(n.g); A.icone(n.g, "horloge", [340, 260], 200, A.C.jeu);
      j.titre("On programme 15 minutes ; le chronomètre mesure 13 min 21 s. Quel est l'écart, en pourcentage du temps programmé (négatif s'il est plus court) ?");
      j.nombre({ avant: "\\text{écart} =", apres: "\\%", cases: [{ attendu: -11, tol: 0.05 }],
        aide: function () { return "900 s programmées, 801 s mesurées. Écart = (mesuré − programmé) / programmé × 100."; },
        ok: function () { j.bravo("−11 % : hors de la tolérance de ± 10 %, le minuteur est à faire corriger."); j.suite(); } });
    } }
  ]
}));
