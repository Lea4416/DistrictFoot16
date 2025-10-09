const pole = [
  "Sportif",
  "Administration",
  "Arbitrage",
  "Citoyennete",
  "Juridiction",
];

const select = document.getElementById("choix_pole");

pole.forEach((p) => {
  const option = document.createElement("option");
  option.value = p;
  option.textContent = p;
  select.appendChild(option);
});

let commission = [];
let nb_comissions = 0;
let pole_choisi = "";


function gestion_comission() {
  const select = document.getElementById("choix_pole");
  pole_choisi = select.value;

  switch (pole_choisi) {
    case "Sportif":
      commission = [
        "Commission des compétitions séniors",
        "Commission des compétitions jeunes",
        "Commission du développpement du football",
        "Commission diversification des pratique",
        "Commission Technique - Formation - Labelisation",
      ];
      nb_comissions = commission.length;
      break;
    case "Administration":
      commission = [
        "Commission Logistique - Intendance - Immobilier",
        "Commission Terrain et Strcuture Sportives",
        "Commission Sante - Hygiéne et Prévention",
      ];
      break;
    case "Arbitrage":
      commission = [
        "Commission de l'Arbitrage",
        "Commission Satut de l'arbitrage",
        "Commission de délégués",
      ];
      nb_comissions = commission.length;
      break;
    case "Citoyennete":
      commission = [
        "Commission innovation",
        "Commission valorisation de l'engagement bénévole",
        "Commission valeur, ethique, fair-play et actions citoyennes et solidarites",
      ];
      nb_comissions = commission.length;
      break;
    case "Juridiction":
      commission = [
        "Commission de discipline",
        "Commission d'Appel",
        "Commission Litige et Ceontentieux",
        "Surveillance des opérations électoral",
      ];
      nb_comissions = commission.length;
      break;
  }

  document.getElementById("information").innerHTML = "";

  commission.forEach((c, index) => {
    document.getElementById("information").innerHTML += `

        <br>
        <div>
        <label for="nombre_membre_${index}">Nombre de membres pour "${c}" :</label>
        <input type="number" id="nombre_membre_${index}" min="0">
        </div>
    `;
  });
  document.getElementById(
    "information"
  ).innerHTML += `<button onclick="nomanimateur()">Rentréer les noms et animateur</button>`;
}

function nomanimateur() {
    let membresParCommission = {};

    commission.forEach((c, index) => {
        const input = document.getElementById(`nombre_membre_${index}`);
        if (input) { // vérifie que l'input existe
            const valeur = parseInt(input.value) || 0; // si vide, on met 0
            membresParCommission[c] = valeur;
        } else {
            console.warn(`L'input pour ${c} n'existe pas !`);
        }
    });

    console.log(membresParCommission);

    const conteneur = document.getElementById("information");
    conteneur.innerHTML = "";
    commission.forEach((c, index) => {
        const nbMembres = membresParCommission[c];

        const titre = document.createElement("h4");
        titre.textContent = c;
        conteneur.appendChild(titre);

        for (let i = 1; i <= nbMembres; i++) {
            const label = document.createElement("label");
            label.setAttribute("for", `membre_${index}_${i}`);
            label.textContent = `Membre ${i} :`;
            label.style.display = "block";

            const input = document.createElement("input");
            input.type = "text";
            input.id = `membre_${index}_${i}`;
            input.placeholder = "Nom Prénom";

            conteneur.appendChild(label);
            conteneur.appendChild(input);
        }
      
    });
    document.getElementById("information").innerHTML += `<button onclick="enregistrer_menbres()">Enregistrer les membres</button>`
}

function nomanimateur() {
    let membresParCommission = {};

    // On récupère le nombre de membres pour chaque commission
    commission.forEach((c, index) => {
        const input = document.getElementById(`nombre_membre_${index}`);
        const valeur = input ? parseInt(input.value) || 0 : 0;
        membresParCommission[c] = valeur;
    });

    const conteneur = document.getElementById("information");
    conteneur.innerHTML = "";

    // Génère les inputs pour les noms
    commission.forEach((c, index) => {
        const nbMembres = membresParCommission[c];

        if (nbMembres > 0) {
            const titre = document.createElement("h4");
            titre.textContent = c;
            conteneur.appendChild(titre);

            for (let i = 1; i <= nbMembres; i++) {
                const label = document.createElement("label");
                label.setAttribute("for", `membre_${index}_${i}`);
                label.textContent = `Membre ${i} :`;
                label.style.display = "block";

                const input = document.createElement("input");
                input.type = "text";
                input.id = `membre_${index}_${i}`;
                input.placeholder = "Nom Prénom";

                conteneur.appendChild(label);
                conteneur.appendChild(input);
            }
        }
    });

    conteneur.innerHTML += `<button onclick="enregistrer_menbres()">Enregistrer les membres</button>`;

    // Stocke pour l'accès futur
    window.membresParCommission = membresParCommission;
}

function enregistrer_menbres() {
    let finalObj = {};

    commission.forEach((c, index) => {
        const nbMembres = window.membresParCommission[c] || 0;
        finalObj[c] = [];

        for (let i = 1; i <= nbMembres; i++) {
            const input = document.getElementById(`membre_${index}_${i}`);
            if (input && input.value.trim() !== "") finalObj[c].push(input.value.trim());
        }
    });

    console.log(finalObj);

    alert("Membres enregistrés !");
    const conteneur = document.getElementById("information");
    conteneur.innerHTML = "";

    conteneur.innerHTML += `
  <div>
  <label for="nom_responsable">Nom Prénom Résponsable : </label>
  <input type="text" id="nom_responsable" />
  </div>
  <div>
  <label for="animateur">Animateur : </label>
  <input type="text" id="animateur" />
  </div>
  <div>
  <label for="poste">Poste : </label>
  <input type="text" id="poste" />
  </div>
  <div>
  </div>
  <button onclick="fin()">Création finale</button>
  `

}


function fin() {
    const nom_responsable = document.getElementById("nom_responsable").value || "...";
    const poste = document.getElementById("poste").value || "...";

    // Début du texte
    let p = `<p>Le pôle ${pole_choisi} est sous la responsabilité de ${nom_responsable} (${poste}), et intègre ${nb_comissions} commission${nb_comissions > 1 ? "s" : ""} dont la composition est la suivante :</p>`;

    // Pour chaque commission
    commission.forEach((c, index) => {
        p += `
        <div class="container">
            <h4> ${c} </h4>
            <h5> Animateur : ... </h5>
            <h5>Membres :</h5>
            <ul>
        `;

        const nbMembres = window.membresParCommission ? window.membresParCommission[c] || 0 : 0;

        for (let i = 1; i <= nbMembres; i++) {
            const input = document.getElementById(`membre_${index}_${i}`);
            const nomMembre = input ? input.value.trim() || "..." : "...";
            p += `<li>⚽ ${nomMembre}</li>`;
        }

        p += `
            </ul>
        </div>`;
    });

    // Bouton retour
    p += `<a href="https://foot16.fff.fr/statuts-et-reglements/district/commissions/" style="display: block; margin: 0 auto; padding: 20px; border-radius: 20px; background-color: rgb(0, 0, 255); width: 40%; color: white; border: 1px solid black; text-align: center; text-decoration: none;">Retour à la présentation des comités</a>`;

    // Affichage dans le div "resultat"
    const divResultat = document.getElementById("resultat");
    divResultat.innerHTML = p;

    // On peut vider la partie formulaire si besoin
    document.getElementById("information").innerHTML = "";
    document.getElementById("exemple").innerHTML = "";



//   const titre = document.getElementById("titre").value;
//   const mission = document.getElementById("mission").value;
//   const tel = document.getElementById("tel").value;
//   const mail = document.getElementById("mail").value;
//   const divcode = document.getElementById("code");
//   const code = `<p style="font-size: 1rem; font-weight: bolder; text-align: center;">
//   Le pôle citoyenneté est sous la responsabilité de Isabelle Bonneau (Vice-Présidente), et intègre quatre (4) commissions dont la composition est la suivante :
// </p>

// <div style="display: flex; flex-direction: column; align-items: center; padding: 20px; border: 1px solid black; width: 80%; margin: 0 auto; border-radius: 40px; background-color: rgba(72, 0, 100, 0.25); margin-bottom: 10px;">
//   <h4 style="text-decoration: underline; margin: 5px; font-size: 1.3rem; text-align: center;">Commission Innovation</h4>
//   <h5 style="margin: 5px; font-size: 1.3rem; text-align: center;">Animateur : Georges Bermejo</h5>
//   <h5 style="margin: 5px; font-size: 1.3rem; text-align: center;">Membres :</h5>
//   <ul style="margin-top: 0px; text-align: center; list-style: none; padding: 0; display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 5px;">
//     <li>⚽ Pierre Fouillet</li>
//     <li>⚽ Pierre Desvages</li>
//     <li>⚽ Jean-Jacques Raboisson</li>
//   </ul>
// </div>

// <div style="display: flex; flex-direction: column; align-items: center; padding: 20px; border: 1px solid black; width: 80%; margin: 0 auto; border-radius: 40px; background-color: rgba(72, 0, 100, 0.25); margin-bottom: 10px;">
//   <h4 style="text-decoration: underline; margin: 5px; font-size: 1.3rem; text-align: center;">Commission Valorisation de l'engagement bénévole</h4>
//   <h5 style="margin: 5px; font-size: 1.3rem; text-align: center;">Animatrice : Isabelle Bonneau</h5>
//   <h5 style="margin: 5px; font-size: 1.3rem; text-align: center;">Membres :</h5>
//   <ul style="margin-top: 0px; text-align: center; list-style: none; padding: 0; display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 5px;">
//     <li>⚽ Christelle Ploquin</li>
//     <li>⚽ Olivier Blancheton</li>
//     <li>⚽ Jean-Louis Hauquin</li>
//   </ul>
// </div>

// <div style="display: flex; flex-direction: column; align-items: center; padding: 20px; border: 1px solid black; width: 80%; margin: 0 auto; border-radius: 40px; background-color: rgba(72, 0, 100, 0.25); margin-bottom: 10px;">
//   <h4 style="text-decoration: underline; margin: 5px; font-size: 1.3rem; text-align: center;">Commission Valeurs, Éthique, Fair Play et Actions citoyennes et solidaires</h4>
//   <h5 style="margin: 5px; font-size: 1.3rem; text-align: center;">Animatrice : Isabelle Da Silva Carlos</h5>
//   <h5 style="margin: 5px; font-size: 1.3rem; text-align: center;">Membres :</h5>
//   <ul style="margin-top: 0px; text-align: center; list-style: none; padding: 0; display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 5px;">
//     <li>⚽ Isabelle Bonneau</li>
//     <li>⚽ Isabelle Fontaine</li>
//     <li>⚽ Catherine Portejoie</li>
//     <li>⚽ Karine Vergnaud</li>
//     <li>⚽ Laurent Fouché</li>
//     <li>⚽ Jean-Charles Guiguen</li>
//     <li>⚽ Laurent Lacouture</li>
//     <li>⚽ Jean-Pascal Tixeuil</li>
//     <li>⚽ Yann Terrade</li>
//   </ul>
// </div>

// <a href="https://foot16.fff.fr/statuts-et-reglements/district/commissions/" style="display: block; margin: 0 auto; padding: 20px; border-radius: 20px; background-color: rgb(0, 0, 255); width: 40%; color: white; border: 1px solid black; text-align: center; text-decoration: none;">
//   Retour à la présentation des comités
// </a>`;

//   document.getElementById("exemple").style.display = "none";

//   const resultat = document.getElementById("resultat");

//   resultat.classList.add("flex_center");

//   resultat.innerHTML = `
//         <div class="container">
//             <img src="${photo}" class="portrait" />
//             <div class="container-2">
//                 <p class="strong">${nom}</p>
//                 <p class="strong">${titre}</p>
//                 <p class="strong">${mission}</p>
//                 <div class="container-3">
//                     <img src="https://foot16.fff.fr/wp-content/uploads/sites/27/2025/09/phone.png" class="icon" />
//                     <p>${tel}</p>
//                 </div>
//                 <div class="container-3">
//                     <img src="https://foot16.fff.fr/wp-content/uploads/sites/27/2025/09/mail.png" class="icon" />
//                     <p>${mail}</p>
//                 </div>

//     `;

//   function escapeHTML(str) {
//     return str
//       .replace(/&/g, "&amp;")
//       .replace(/</g, "&lt;")
//       .replace(/>/g, "&gt;");
//   }

//   // Ajoute le code comme texte
//   divcode.innerHTML += `<h3>Merci de copier et coller dans la bonne section ce code : </h3>`;
//   divcode.innerHTML += `<pre><code>${escapeHTML(code)}</code></pre>`;


}
