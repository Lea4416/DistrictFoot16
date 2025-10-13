let animateur = [];
let membres = [];

function enregistrement_membres() {
   animateur.push(Number(document.getElementById("nb_animateur_competitions_seniors").value));
   animateur.push(Number(document.getElementById("nb_animateur_competitions_jeunes").value));
   animateur.push(Number(document.getElementById("nb_animateur_football_feminin").value));
   animateur.push(Number(document.getElementById("nb_animateur_diversification_feminin").value));
   animateur.push(Number(document.getElementById("nb_animateur_tech_forma_label").value));
   console.log("Nombre d'animateur :", animateur)
   localStorage.setItem("animateur",JSON.stringify(animateur))

}

