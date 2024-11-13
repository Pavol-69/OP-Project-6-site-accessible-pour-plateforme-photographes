// Component pour créer le portefolio du photographe de la page associée

function photographerPortefolio(media, i, likePanel, carrouselCtn, carrousel) {
  const { title, likes, image, video, id } = media[i]; // récupération des données qui nous intéresse
  const media_path = `assets/images/${image === undefined ? video : image}`; // création du bon lien, en faisant bien la différence entre image et video
  var like = 0;
  var totLikes = likes;

  // Elements DOM avec les infos d'une photo
  function getPhotographerPortefolioDOM() {
    // Création des éléments
    const article = document.createElement("article");
    const divMedia = document.createElement(
      `${image === undefined ? "video" : "img"}` // On adapte si image ou video
    );
    const ctn = document.createElement("div");
    const likesCtn = document.createElement("div");
    const h3 = document.createElement("h3");
    const span = document.createElement("span");
    const divI = document.createElement("i");

    // Attribution de données
    divMedia.setAttribute("src", media_path);
    h3.textContent = title;
    divI.classList.add("fa-solid", "fa-heart");
    span.textContent = likes;

    // Gestion du bouton like pour faire un +1 ou retirer le +1
    divI.addEventListener("click", (e) => {
      if (span.textContent == likes) {
        like = 1;
      } else {
        like = 0;
      }
      totLikes = likes + like;
      span.textContent = totLikes;

      // On met également à jour le panel avec la somme totale de tous les likes
      likePanel.textContent =
        like == 0
          ? Number(likePanel.innerHTML) - 1
          : Number(likePanel.innerHTML) + 1;
    });

    // Ouverture Carrousel quand on clique sur une image
    divMedia.addEventListener("click", (e) =>
      makeCarrousel(media, carrouselCtn, carrousel, media_path, title, image, i)
    );

    // Tout est regroupé sous article
    article.appendChild(divMedia);
    likesCtn.appendChild(span);
    likesCtn.appendChild(divI);
    ctn.appendChild(h3);
    ctn.appendChild(likesCtn);
    article.appendChild(ctn);

    return article;
  }

  return {
    totLikes,
    getPhotographerPortefolioDOM,
  };
}
