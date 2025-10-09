function traitement() {
  const photo = document.getElementById("photo").value;
  const nom = document.getElementById("nom").value;
  const titre = document.getElementById("titre").value;
  const mission = document.getElementById("mission").value;
  const tel = document.getElementById("tel").value;
  const mail = document.getElementById("mail").value;
  const divcode = document.getElementById("code");
  const code = `<div style="display:flex;flex-direction:column;justify-content:space-between;padding:20px;border-radius:20px;background-color:rgba(30,115,190,0.06);box-shadow:0 2px 5px rgb(0,0,0);">
    <img src="https://foot16.fff.fr/wp-content/uploads/sites/27/2025/10/1759734907210_image4.jpeg" style="width:200px;display:block;margin:0 auto 20px auto;box-shadow:0 2px 5px rgb(0,0,0);background-color:white;" />
    <div style="padding:10px;border-radius:30px;background-color:rgba(0,49,114,0.1);box-shadow:0 2px 5px rgb(0,0,0);">
        <p style="text-align:center; font-weight:bolder;">Martinaud Léa</p>
        <p style="text-align:center; font-weight:bolder;">Membre de la comission</p>
        <p style="text-align:center;">comunication</p>
        <div style="display:flex;flex-direction:row;align-items:center;gap:10px;justify-content:center;">
            <img src="https://foot16.fff.fr/wp-content/uploads/sites/27/2025/09/phone.png" style="width:20px;" />
            <p>0252541</p>
        </div>
        <div style="display:flex;flex-direction:row;align-items:center;gap:10px;justify-content:center;">
            <img src="https://foot16.fff.fr/wp-content/uploads/sites/27/2025/09/mail.png" style="width:20px;" />
            <p>lm@gmail.com</p>
        </div>
    </div>
`;

  document.getElementById("exemple").style.display = "none";

  const resultat = document.getElementById("resultat");
  
  resultat.classList.add("flex_center");

  resultat.innerHTML = `
        <div class="container">
            <img src="${photo}" class="portrait" />
            <div class="container-2">
                <p class="strong">${nom}</p>
                <p class="strong">${titre}</p>
                <p class="strong">${mission}</p>
                <div class="container-3">
                    <img src="https://foot16.fff.fr/wp-content/uploads/sites/27/2025/09/phone.png" class="icon" />
                    <p>${tel}</p>
                </div>
                <div class="container-3">
                    <img src="https://foot16.fff.fr/wp-content/uploads/sites/27/2025/09/mail.png" class="icon" />
                    <p>${mail}</p>
                </div>

    `;

  function escapeHTML(str) {
    return str
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  }

  // Ajoute le code comme texte
  divcode.innerHTML += `<h3>Merci de copier et coller dans la bonne section ce code : </h3>`;
  divcode.innerHTML += `<pre><code>${escapeHTML(code)}</code></pre>`;
}