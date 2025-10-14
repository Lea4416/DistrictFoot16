// --- Liste des commissions ---
let commissions = [
  "Commission des compétitions seniors",
  "Commission des compétitions jeunes",
  "Commission du développement du football féminin",
  "Commission diversification des pratiques",
  "Commission Technique - Formation - Labellisation",
];

// --- Tableaux pour stocker les nombres ---
let nbAnimateurs = [];
let nbMembres = [];

// --- Étape 1 : Lecture des nombres et création des champs de saisie ---
function genererChamps() {
  // On vide les tableaux à chaque appel
  nbAnimateurs = [];
  nbMembres = [];

  // On récupère les valeurs
  nbAnimateurs.push(
    Number(document.getElementById("nb_animateur_competitions_seniors").value)
  );
  nbAnimateurs.push(
    Number(document.getElementById("nb_animateur_competitions_jeunes").value)
  );
  nbAnimateurs.push(
    Number(document.getElementById("nb_animateur_football_feminin").value)
  );
  nbAnimateurs.push(
    Number(
      document.getElementById("nb_animateur_diversification_feminin").value
    )
  );
  nbAnimateurs.push(
    Number(document.getElementById("nb_animateur_tech_forma_label").value)
  );

  nbMembres.push(
    Number(document.getElementById("nb_membres_competitions_seniors").value)
  );
  nbMembres.push(
    Number(document.getElementById("nb_membres_competitions_jeunes").value)
  );
  nbMembres.push(
    Number(document.getElementById("nb_membres_football_feminin").value)
  );
  nbMembres.push(
    Number(document.getElementById("nb_membres_diversification_feminin").value)
  );
  nbMembres.push(
    Number(document.getElementById("nb_membres_tech_forma_label").value)
  );

  // Sauvegarde dans le stockage
  sessionStorage.setItem("nbAnimateurs", JSON.stringify(nbAnimateurs));
  sessionStorage.setItem("nbMembres", JSON.stringify(nbMembres));

  // --- Génération des champs de texte ---
  let container = document.getElementById("information");
  container.innerHTML = ""; // On vide avant de recréer

  for (let i = 0; i < commissions.length; i++) {
    let bloc = document.createElement("div");
    bloc.classList.add("commission-bloc");

    // Création des champs pour animateurs
    let champsAnimateurs = "";
    for (let a = 0; a < nbAnimateurs[i]; a++) {
      champsAnimateurs += `<input type="text" id="animateur_${i}_${a}" placeholder="Nom de l’animateur ${
        a + 1
      }"><br>`;
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
      <label><strong>Animateurs (${nbAnimateurs[i]}) :</strong></label><br>
      ${champsAnimateurs || "<em>Aucun animateur</em><br>"}
      <label><strong>Membres (${nbMembres[i]}) :</strong></label><br>
      ${champsMembres || "<em>Aucun membre</em>"}
      <hr>
    `;

    container.appendChild(bloc);
  }

  // Bouton pour enregistrer les noms
  let bouton = document.createElement("button");
  bouton.textContent = "Enregistrer les noms";
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
  container.innerHTML = "";
  container.innerHTML = "<h2>Résultats enregistrés :</h2>";

  for (let i = 0; i < commissions.length; i++) {
    let bloc = document.createElement("div");
    bloc.classList.add("commission-resultat");

    let p = `
  <div class="container">
    <h4>${commissions[i]} :</h4>
    ${
      animateurs[i].length > 0
        ? animateurs[i].map((nom) => `<h5>Animateur : ${nom}</h5>`).join("<br>")
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

    pc = `<div class="container">
      <h4>${commissions[i]} :</h4>
       ${
      animateurs[i].length > 0
        ? animateurs[i].map((nom) => `<h5>Animateur : ${nom}</h5>`).join("<br>")
        : "<h5>Animateur : —</h5>"
    }
      <h5>Membres :</h5>
            <ul>
         ${
      membres[i].length > 0
         ? membres[i].map((nom) => `<li>⚽${nom}</li><br>`).join("") // chaque nom devient <li>Nom</li>
         : "<li>—</li>" // si aucun membre, on affiche —
   }
   </ul>
    </div>`;

    bloc.innerHTML = p

    document.getElementById("code").innerHTML += `<pre><code>${pc.replace(/</g, "&lt;").replace(/>/g, "&gt;")}`

    container.appendChild(bloc);
  }
}
