// Component pour créer le portefolio du photographe de la page associée

// Imports
import { makeCarrousel } from "./photographer_carrousel.js";

export function photographerPortefolio(
  media,
  i,
  likePanel,
  carrouselCtn,
  carrousel
) {
  const { title, likes, image, video } = media[i]; // récupération des données qui nous intéresse
  const media_path = `assets/images/${image === undefined ? video : image}`; // création du bon lien, en faisant bien la différence entre image et video
  var like = 0;
  var totLikes = likes;

  // Elements DOM avec les infos d'une photo
  function getPhotographerPortefolioDOM() {
    // Création des éléments
    const article = document.createElement("article");
    const aTab = document.createElement("a");
    const divMedia = document.createElement(
      `${image === undefined ? "video" : "img"}` // On adapte si image ou video
    );
    const ctn = document.createElement("div");
    const likesCtn = document.createElement("div");
    const h3 = document.createElement("h3");
    const span = document.createElement("span");
    const aTabI = document.createElement("a");
    const divI = document.createElement("i");

    // Attribution de données
    divMedia.setAttribute("src", media_path);
    divMedia.setAttribute("alt", title);
    h3.textContent = title;
    divI.classList.add("fa-solid", "fa-heart");
    span.textContent = likes;

    // Mise en place du TAB, pour que ça marche quand on y selectionne avec TAB, puis qu'on appuie sur entrée
    aTab.setAttribute("href", "#  ");
    aTabI.setAttribute("href", "#  ");

    // Attribution des aria-label
    divMedia.setAttribute("aria-label", `Ouvrir ${title} dans le carrousel`);
    h3.setAttribute("aria-label", `Titre photo : ${title}`);
    span.setAttribute("aria-label", `Nombre likes : ${likes}`);
    divI.setAttribute("aria-label", "Ajouter un like");

    // Gestion du bouton like pour faire un +1 ou retirer le +1
    aTabI.addEventListener("click", () => {
      if (span.textContent == likes) {
        like = 1;
      } else {
        like = 0;
      }
      totLikes = likes + like;
      span.textContent = totLikes;

      // Attribution des aria-label
      span.setAttribute("aria-label", `Nombre likes : ${totLikes}`);
      divI.setAttribute(
        "aria-label",
        `${like == 0 ? "Ajouter" : "Retirer"} un like`
      );

      // On met également à jour le panel avec la somme totale de tous les likes
      likePanel.textContent =
        like == 0
          ? Number(likePanel.innerHTML) - 1
          : Number(likePanel.innerHTML) + 1;
    });

    likePanel.setAttribute(
      "aria-label",
      `Nombre likes total : ${likePanel.textContent}`
    );

    // Ouverture Carrousel quand on clique sur une image
    aTab.addEventListener("click", () =>
      makeCarrousel(media, carrouselCtn, carrousel, media_path, title, image, i)
    );

    // Tout est regroupé sous article
    aTab.appendChild(divMedia);
    article.appendChild(aTab);
    likesCtn.appendChild(span);
    aTabI.appendChild(divI);
    likesCtn.appendChild(aTabI);
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
