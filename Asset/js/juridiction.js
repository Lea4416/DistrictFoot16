// --- Liste des commissions ---
let commissions = [
  "Commission de discipline",
  "Commission d'Appel",
  'Commission "Statuts - Règlements"',
  'Commission "Litiges - Contentieux"',
  "Surveillance des opérations électorales",
];

// --- Tableaux pour stocker les nombres ---
let nbAnimateurs = [];
let nbMembres = [];
document.getElementById("code").style.display = "none";

// --- Étape 1 : Lecture des nombres et création des champs de saisie ---
function genererChamps() {
  // On vide les tableaux à chaque appel
  nbAnimateurs = [];
  nbMembres = [];

  // On récupère les valeurs
  nbAnimateurs.push(
    Number(document.getElementById("nb_animateur_appel").value)
  );
  nbAnimateurs.push(
    Number(document.getElementById("nb_animateur_statut_reglement").value)
  );
  nbAnimateurs.push(
    Number(document.getElementById("nb_animateur_litiges_contentieux").value)
  );
  nbAnimateurs.push(
    Number(document.getElementById("nb_animateur_electorales").value)
  );
  nbAnimateurs.push(
    Number(document.getElementById("nb_animateur_litiges_contentieux").value)
  );

  nbMembres.push(
    Number(document.getElementById("nb_membres_appel").value)
  );
  nbMembres.push(
    Number(document.getElementById("nb_membres_statut_reglement").value)
  );
  nbMembres.push(
    Number(document.getElementById("nb_membres_litiges_contentieux").value)
  );
  nbMembres.push(
    Number(document.getElementById("nb_animateur_electorales").value)
  );
  nbMembres.push(
    Number(document.getElementById("nb_membres_electorales").value)
  );

    // Sauvegarde dans le stockage
  sessionStorage.setItem("nbAnimateurs", JSON.stringify(nbAnimateurs));
  sessionStorage.setItem("nbMembres", JSON.stringify(nbMembres))

  // --- Génération des champs de texte ---
  let container = document.getElementById("information");
  container.innerHTML = "";
    document.getElementById("code").style.display = "block";

  for (let i = 0; i < commissions.length; i++) {
    let bloc = document.createElement("div");
    bloc.classList.add("commission-bloc");

    // Création des champs pour animateurs
    let champsAnimateurs = "";
    for (let a = 0; a < nbAnimateurs[i]; a++) {
      champsAnimateurs += `<input type="text" id="animateur_${i}_${a}" placeholder="Nom de l’animateur (role)"><br>`;
    }

    // Création des champs pour membres
    let champsMembres = "";
    for (let m = 0; m < nbMembres[i]; m++) {
      champsMembres += `<input type="text" id="membre_${i}_${m}" placeholder="Nom du membre ${
        m + 1
      }"><br>`;
    }

    bloc.innerHTML = `
      <h3>${commissions[i]}</h3>
      <label><strong>Animateurs :</strong></label><br>
      ${champsAnimateurs || "<em>Aucun animateur</em><br>"}
      <label><strong>Membres :</strong></label><br>
      ${champsMembres || "<em>Aucun membre</em>"}
      <hr>
    `;

    container.appendChild(bloc);
  }

  // Bouton pour enregistrer les noms
  let bouton = document.createElement("button");
  bouton.classList.add("nom");
  bouton.innerHTML = "<span>Enregistrer les noms des membres</span>";
  bouton.onclick = enregistrerNoms;
  container.appendChild(bouton);
}

// --- Étape 2 : Récupération et sauvegarde des noms ---
function enregistrerNoms() {
  let animateurs = [];
  let membres = [];

  for (let i = 0; i < commissions.length; i++) {
    let listeAnimateurs = [];
    for (let a = 0; a < nbAnimateurs[i]; a++) {
      let champ = document.getElementById(`animateur_${i}_${a}`);
      if (champ && champ.value.trim() !== "") {
        listeAnimateurs.push(champ.value.trim());
      }
    }
    animateurs.push(listeAnimateurs);

    let listeMembres = [];
    for (let m = 0; m < nbMembres[i]; m++) {
      let champ = document.getElementById(`membre_${i}_${m}`);
      if (champ && champ.value.trim() !== "") {
        listeMembres.push(champ.value.trim());
      }
    }
    membres.push(listeMembres);
  }

  // Sauvegarde dans le sessionStorage
  sessionStorage.setItem("animateurs", JSON.stringify(animateurs));
  sessionStorage.setItem("membres", JSON.stringify(membres));

  // Affichage
  afficherResultats(animateurs, membres);
}

// --- Étape 3 : Affichage du résultat ---
function afficherResultats(animateurs, membres) {
  let container = document.getElementById("information");
  document.getElementById("exemple").innerHTML = "";
  const codeDiv = document.getElementById("code");

  container.innerHTML = "";
  container.innerHTML = "<h2>Résultats enregistrés :</h2>";
        container.innerHTML += "<a href='../index.html' class='accueil'> Retour a l'accueil</a>";
  container.innerHTML +=
     "<a href='../Commission/sportif.html' class='reset'> Reinitialisation</a>";
  container.innerHTML +=
    '<a class="back" href="../Commission/page1.html"><svg class="svgIcon" viewBox="0 0 384 512"><path   d="M214.6 41.4c-12.5-12.5-32.8-12.5-45.3 0l-160 160c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 141.2V448c0 17.7 14.3 32 32 32s32-14.3 32-32V141.2L329.4 246.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-160-160z"></path></svg></a>';

  for (let i = 0; i < commissions.length; i++) {
    let bloc = document.createElement("div");
    bloc.classList.add("commission-resultat");

    let p = `
  <div class="container_citoyennete">
    <h4>${commissions[i]} :</h4>
    ${
      animateurs[i].length > 0
        ? animateurs[i].map((nom) => `<h5>Animateur : ${nom}</h5>`).join("")
        : "<h5>Animateur : —</h5>"
    }
    <h5>Membres :</h5>
    <ul>
      ${
        membres[i].length > 0
          ? membres[i].map((nom) => `<li>⚽ ${nom}</li>`).join("")
          : "<li>—</li>"
      }
    </ul>
  </div>
`;

    pc = `<div style="
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  border: 1px solid black;
  width: 80%;
  margin: 0 auto 10px auto;
  border-radius: 40px;
  background-color: rgba(72, 0, 100, 0.25);
">
  <h4 style="
    text-decoration: underline;
    margin: 5px;
    font-size: 1.3rem;
    text-align: center;
  ">${commissions[i]} :</h4>

  ${
    animateurs[i].length > 0
      ? animateurs[i].map((nom) => `<h5 style="
          margin: 5px;
          font-size: 1.3rem;
          text-align: center;
        ">Animateur : ${nom}</h5>`).join("")
      : `<h5 style="
          margin: 5px;
          font-size: 1.3rem;
          text-align: center;
        ">Animateur : —</h5>`
  }

  <h5 style="
    margin: 5px;
    font-size: 1.3rem;
    text-align: center;
  ">Membres :</h5>

  <ul style="
    margin-top: 0;
    text-align: center;
    list-style: none;
    padding: 0;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 5px;
  ">
    ${
      membres[i].length > 0
        ? membres[i].map((nom) => `<li style="margin: 5px;">⚽${nom}</li>`).join("")
        : `<li style="margin: 5px;">—</li>`
    }
  </ul>
</div>
`;

    bloc.innerHTML = p


console.log(document.getElementById("code"));


    document.getElementById("code").innerHTML += `<pre><code>${pc.replace(/</g, "&lt;").replace(/>/g, "&gt;")}</code></pre>`

    container.appendChild(bloc);
  }
}
