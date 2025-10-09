function traitement() {
  const lien = document.getElementById("lien-wordpress").value;
  const nom = document.getElementById("nom").value;
  const mission = document.getElementById("mission").value;
  const divcode = document.getElementById("code");
  const code = ` <img src="${lien}"> <p><strong>${nom} :</strong> ${mission}.</p>`;
  document.getElementById(
    "resultat"
  ).innerHTML = `<pre><code>${code}</code></pre>`;

  document.getElementById("exemple").style.display = "none";

  const resultat = document.getElementById("resultat");
  resultat.classList.add("flex_center");

  resultat.innerHTML = `
        <img src="${lien}">
        <p>
            <strong>${nom} :</strong> ${mission}.
        </p>
        <br>

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



function traitement_sans_carte_de_visite() {
  const lien = document.getElementById("lien-photo").value;
  const nom = document.getElementById("nom").value;
  const mission = document.getElementById("mission").value;
  const divcode = document.getElementById("code");
  const code = `<p><strong>${nom}</strong></p>
        <img class="photo" src="${lien}">
        <p>${mission}</p>`;

  document.getElementById("exemple").style.display = "none";

  const resultat = document.getElementById("resultat");

  resultat.innerHTML = `
        <p><strong>${nom}</strong></p>
        <img class="photo" src="${lien}">
        <p>${mission}</p>

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
