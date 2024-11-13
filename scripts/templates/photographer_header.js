// Component pour créer le header photographer de la page associée

function photographerHeaderTemplate(data) {
  const { name, portrait, city, country, tagline } = data[0]; // récupération des données qui nous intéresse
  const picture = `assets/photographers/${portrait}`; // création du bon lien

  // On sépare les éléments DOM en 2, un pour les données, l'autre pour la photo
  // afin de les répartir plus facilement dans le DOM

  // Elements DOM avec les infos
  function getPhotographerHeaderInfoDOM() {
    // Création des éléments
    const article = document.createElement("article");
    const h2 = document.createElement("h2");
    const h3 = document.createElement("h3");
    const h4 = document.createElement("h4");

    // Attribution de données
    h2.textContent = name;
    h3.textContent = `${city}, ${country}`;
    h4.textContent = tagline;

    // Tout est regroupé sous article
    article.appendChild(h2);
    article.appendChild(h3);
    article.appendChild(h4);

    return article;
  }

  // Elements DOM avec les infos
  function getPhotographerHeaderPhotoDOM() {
    // Création des éléments
    const div = document.createElement("div");
    const img = document.createElement("img");

    // Attribution de données
    img.setAttribute("src", picture);

    // Tout est regroupé sous div
    div.appendChild(img);

    return div;
  }

  return {
    name,
    picture,
    getPhotographerHeaderInfoDOM,
    getPhotographerHeaderPhotoDOM,
  };
}
