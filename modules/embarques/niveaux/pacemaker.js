/* Projet pacemaker, questions 1 à 8 : code NBG, blocs du schéma fonctionnel, timer, boucle de rétroaction, signaux. */
NIVEAU({
  id: "pacemaker",
  init: function (fig) {
    var g = E.s("g", null, fig.svg), n = { act: {} };
    var B = [
      { id: "coeur", x: 20, y: 250, w: 130, h: 90, t: "Cœur" },
      { id: "amp", x: 190, y: 420, w: 180, h: 80, t: "Sensing\nAmplifier", taille: 17 },
      { id: "ad", x: 410, y: 420, w: 120, h: 80, t: "A/D" },
      { id: "up", x: 410, y: 240, w: 250, h: 110, t: "Microprocessor\nROM RAM Timer", taille: 17 },
      { id: "da", x: 410, y: 70, w: 120, h: 80, t: "D/A" },
      { id: "ig", x: 190, y: 70, w: 180, h: 80, t: "Impulse\nGenerator", taille: 17 }
    ];
    var L = [["coeur", "amp"], ["amp", "ad"], ["ad", "up"], ["up", "da"], ["da", "ig"], ["ig", "coeur"]];
    n.dessin = function () { EMB.scene(g, B, L, n.act); };
    n.dessin();
    return n;
  },
  etapes: [
    { nom: "Code NBG", jouer: function (j, n) {
      j.titre("Le pacemaker stimule le ventricule, détecte le ventricule, et s'inhibe s'il détecte un battement. Quel mode ?");
      j.choix([
        { html: "VVI", juste: true },
        { html: "VOO", aide: "O en 2e lettre : aucune détection. Ici, on détecte le ventricule." },
        { html: "DDD", aide: "D : les deux cavités. Ici, une seule : le ventricule." }
      ], { colonnes: 3, ok: function () {
        j.bravo("V (stimulé), V (détecté), I (inhibé) : VVI.");
        j.suite();
      } });
    } },
    { nom: "3e lettre", jouer: function (j, n) {
      j.titre("Dans DDD, que veut dire la 3e lettre D ?");
      j.choix([
        { html: "Les deux cavités sont stimulées", aide: "C'est la 1re lettre. La 3e dit ce qu'on fait quand on détecte." },
        { html: "Réponse à la détection : les deux, inhibé et déclenché (I + T)", juste: true },
        { html: "Asservissement de fréquence", aide: "L'asservissement est la 4e lettre, R." }
      ], { colonnes: 1, ok: function () {
        j.bravo("3e lettre : I, T, D (I + T) ou O.");
        j.suite();
      } });
    } },
    { nom: "Numériser", jouer: function (j, n) {
      n.act = { coeur: true, amp: true, ad: true }; n.dessin();
      j.titre("Le signal du cœur est amplifié et filtré. Quel bloc le transforme en nombres pour le microprocesseur ?");
      j.choix([
        { html: "D/A Converter", aide: "Le D/A fait l'inverse : il transforme un nombre en tension, côté stimulation." },
        { html: "A/D Converter", juste: true },
        { html: "Impulse Generator", aide: "Il produit l'impulsion de stimulation, il ne mesure rien." }
      ], { colonnes: 1, ok: function () {
        j.bravo("Canal de détection : électrode, Sensing Amplifier, A/D.");
        j.suite();
      } });
    } },
    { nom: "Timer ou delay()", jouer: function (j, n) {
      n.act = { up: true }; n.dessin();
      j.titre("Pourquoi compter l'intervalle avant stimulation avec un timer matériel plutôt qu'avec <code>delay()</code> ?");
      j.choix([
        { html: "<code>delay()</code> est moins précis d'un facteur 1000", aide: "delay() compte bien les millisecondes. Le problème est ce que fait le processeur pendant l'attente." },
        { html: "Pendant un <code>delay()</code>, le processeur ne détecte plus rien, et l'attente ne peut pas être annulée", juste: true },
        { html: "Le timer consomme moins de mémoire flash", aide: "La taille du programme n'est pas la raison : pense à la détection pendant l'attente." }
      ], { colonnes: 1, ok: function () {
        j.bravo("Le timer compte pendant que le programme détecte, et se remet à zéro à chaque battement.");
        j.suite();
      } });
    } },
    { nom: "Rétroaction", jouer: function (j, n) {
      n.act = { coeur: true, amp: true, ad: true, up: true, da: true, ig: true }; n.dessin();
      j.titre("Un battement propre est détecté avant la fin de l'intervalle. Que fait le microprocesseur ?");
      j.choix([
        { html: "Il stimule quand même, pour être sûr", aide: "Stimuler en plus d'un battement propre entre en compétition avec le cœur, et peut tomber sur l'onde T." },
        { html: "Il ne stimule pas et relance son compte", juste: true },
        { html: "Il s'arrête jusqu'au prochain réglage", aide: "Le pacemaker surveille sans cesse : il recommence à attendre." }
      ], { colonnes: 1, ok: function () {
        j.bravo("Boucle fermée : la détection inhibe la stimulation.");
        j.suite();
      } });
    } },
    { nom: "Analogique ?", jouer: function (j, n) {
      n.act = { amp: true, ad: true }; n.dessin();
      j.titre("Le signal entre le Sensing Amplifier et l'A/D est…");
      j.choix([
        { html: "analogique", juste: true },
        { html: "numérique", aide: "Il n'est pas encore converti : c'est justement le rôle du bloc A/D qui suit." }
      ], { colonnes: 2, ok: function () {
        j.bravo("Les convertisseurs A/D et D/A sont les frontières entre analogique et numérique.");
        j.suite();
      } });
    } }
  ]
});
