/* Niveau : IoMT, définition, cloud, fog, edge (Partie 1, diapositives 3 à 6). */
NIVEAU({
  id: "iomt",
  init: function (fig) {
    var g = E.s("g", null, fig.svg), n = { sel: null, coul: null, surTouche: null };
    n.dessin = function () {
      EMB.vider(g);
      n.zones = EMB.couches(g, [70, 60, 540, 470], { sel: n.sel, coul: n.coul, taille: 24 });
      EMB.texte(g, "patch ECG du patient", [340, 572], { taille: 18, coul: EMB.C.doux });
    };
    EMB.toucher(fig.svg, function () { return n.surTouche ? n.zones : {}; }, function (k) { if (n.surTouche) n.surTouche(k); });
    n.dessin();
    return n;
  },
  etapes: [
    { nom: "Où traiter l'alarme ?", jouer: function (j, n) {
      j.fig.astuce("Touche une couche.");
      j.titre("Le rythme du patient s'emballe : l'alarme doit partir en quelques millisecondes. Touche la couche qui doit traiter le signal.");
      var fini = false, AIDE = { cloud: "Le cloud est le plus loin des capteurs : sa réponse est la plus lente. Descends.", fog: "Le fog passe par le réseau local : plus rapide que le cloud, mais il y a plus près du patient.", capteurs: "Les capteurs produisent la donnée, ils ne la traitent pas. Monte d'un cran." };
      n.surTouche = function (k) {
        if (fini) return;
        n.sel = k; n.coul = k === "edge" ? EMB.C.ok : EMB.C.ko; n.dessin();
        if (k !== "edge") { j.erreur(AIDE[k]); return; }
        fini = true; n.surTouche = null;
        j.bravo("L'edge, au plus près du patient.");
        j.expliquer("<p>L'<b>edge computing</b> traite les données en temps réel, sur place (systèmes embarqués, passerelles) : c'est la couche la plus rapide. Le <b>fog</b> travaille au niveau du réseau local, le <b>cloud</b> fait les analyses globales, plus lentes.</p>");
        j.suite();
      };
      j.reponse(function () { if (n.surTouche) n.surTouche("edge"); });
    } },
    { nom: "Chaque couche, son rôle", jouer: function (j, n) {
      n.sel = null; n.dessin();
      j.titre("Range chaque tâche du schéma du cours dans sa couche.");
      var z = j.zone("", '<div style="display:grid;grid-template-columns:1fr auto;gap:10px 14px;align-items:center;font-size:18px">' +
        '<span>big data, entrepôt de données</span><span class="trou" data-attendu="c"></span>' +
        '<span>réseau local, analyse et réduction des données</span><span class="trou" data-attendu="f"></span>' +
        '<span>passerelles, systèmes embarqués, temps réel</span><span class="trou" data-attendu="e"></span></div>');
      j.jetons({
        trous: [].slice.call(z.querySelectorAll(".trou")),
        jetons: [{ id: "e", html: "Edge" }, { id: "c", html: "Cloud" }, { id: "f", html: "Fog" }],
        aide: "Du plus global au plus local : cloud en haut, fog au milieu, edge en bas, près des capteurs.",
        ok: function () {
          j.bravo("Cloud, fog, edge : du global au local.");
          j.expliquer("<p>Plus on monte, plus on s'éloigne des capteurs : les calculs deviennent plus globaux (big data, logique métier) mais la réponse plus lente. Plus on descend, plus on traite vite et sur place.</p>");
          j.suite();
        }
      });
    } },
    { nom: "Deux sigles", jouer: function (j, n) {
      j.titre("Le schéma « General IoT in healthcare » parle de WBAN. Qu'est-ce que c'est ?");
      j.choix([
        { html: "Le système d'information de l'hôpital", aide: "Ça, c'est le HIS (Hospital Information System). Regarde le B et le A : Body Area." },
        { html: "Les réseaux sans fil de capteurs portés sur le corps", juste: true },
        { html: "Un réseau mondial de serveurs cloud", aide: "WBAN commence par Wireless et finit par Body Area Networks : tout près du patient, pas dans le cloud." }
      ], { colonnes: 1, ok: function () {
        j.bravo("WBAN : Wireless Body Area Networks.");
        j.expliquer("<p>Le <b>WBAN</b> relie les capteurs portés par le patient ; le <b>HIS</b> (Hospital Information System) est le système d'information de l'hôpital, où les données finissent par arriver.</p>");
        j.suite();
      } });
    } },
    { nom: "L'intrus", jouer: function (j, n) {
      j.titre("La définition de l'IoMT du cours réunit plusieurs ingrédients. Lequel n'en fait pas partie ?");
      j.choix([
        { html: "des capteurs médicaux", aide: "Ils mesurent les signes vitaux : ils sont dans la définition." },
        { html: "le cloud computing", aide: "Les données sont relayées vers un cadre de cloud computing : il est dans la définition." },
        { html: "l'impression 3D d'implants", juste: true },
        { html: "des technologies de communication", aide: "Elles relaient les données vers le cloud : elles sont dans la définition." }
      ], { colonnes: 2, ok: function () {
        j.bravo("L'impression 3D n'y est pas.");
        j.expliquer("<p>Définition du cours : l'IoMT utilise l'informatique mobile, des capteurs médicaux et le cloud computing pour surveiller en temps réel les signes vitaux, avec des technologies de communication qui relaient les données vers le cloud. Les médecins s'en servent pour surveiller, diagnostiquer et traiter.</p>");
        j.suite();
      } });
    } }
  ]
});
