function photographerTemplate(data) {
  const { name, portrait, city, country, tagline, price, id } = data;

  const picture = `assets/photographers/${portrait}`;

  function getUserCardDOM() {
    const a = document.createElement("a"); // pour créer le lien vers la page du photographe
    a.href = `http://127.0.0.1:3000/photographer.html?id=${id}`; // on passe l'id du protographe via l'url
    const article = document.createElement("article");
    const img = document.createElement("img");
    img.setAttribute("src", picture);
    const div = document.createElement("div"); // pour recouper l'image
    const h2 = document.createElement("h2");
    h2.textContent = name;
    const h3 = document.createElement("h3");
    h3.textContent = `${city}, ${country}`;
    const h4 = document.createElement("h4");
    h4.textContent = tagline;
    const h5 = document.createElement("h5");
    h5.textContent = `${price}€/jour`;
    div.appendChild(img);
    article.appendChild(div);
    article.appendChild(h2);
    article.appendChild(h3);
    article.appendChild(h4);
    article.appendChild(h5);
    a.appendChild(article);
    return a;
  }
  return { name, picture, getUserCardDOM };
}
