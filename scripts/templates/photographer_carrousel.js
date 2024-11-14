import { MediaFactory } from "../Factories/media_factory.js";

// Création de la partie Carrousel
export function makeCarrousel(
  media,
  carrouselCtn,
  carrousel,
  media_path,
  title,
  image,
  i
) {
  // Affichage du Carrousel
  carrouselCtn.style.display = "flex";

  // On efface tout ce qu'il y a à l'intérieur pou repartir de 0
  carrousel.innerHTML = "";

  // Création des différents éléments
  const mediaCarrousel = document.createElement(
    `${image === undefined ? "video" : "img"}` // On adapte si image ou video
  );
  const left = document.createElement("i");
  const mediaCtn = document.createElement("div");
  const right = document.createElement("i");
  const mediaDiv = document.createElement("div");
  const imgTitle = document.createElement("h3");

  // Attribution des bons classes et id
  left.className = "fa-sharp fa-solid fa-chevron-left";
  right.className = "fa-sharp fa-solid fa-chevron-right";
  mediaCtn.id = "media_ctn";
  mediaDiv.id = "media";

  // Remplissage des éléments
  if (image == undefined) {
    const source = document.createElement("source");
    mediaCarrousel.setAttribute("controls", "controls");
    source.setAttribute("src", media_path);
    mediaCarrousel.appendChild(source);
    mediaCarrousel.id = "video_play";
  } else {
    mediaCarrousel.setAttribute("src", media_path);
  }

  mediaCarrousel.setAttribute("alt", title);

  imgTitle.textContent = title;

  // Mise en relation des différents éléments
  carrousel.appendChild(left);
  mediaDiv.appendChild(mediaCarrousel);
  mediaCtn.appendChild(mediaDiv);
  mediaCtn.appendChild(imgTitle);
  carrousel.appendChild(mediaCtn);
  carrousel.appendChild(right);

  // Attribution des Aria-label
  left.setAttribute("aria-label", "Parcourir vers la gauche");
  right.setAttribute("aria-label", "Parcourir vers la droite");
  mediaDiv.setAttribute("aria-label", title);
  imgTitle.setAttribute("aria-label", `Titre image : ${title}`);

  // Events avec les touches du clavier
  document.onkeydown = checkKey;
  function checkKey(e) {
    if (carrouselCtn.style.display == "flex") {
      if (e.key == "ArrowLeft") {
        changeCarrousel(-1, mediaDiv); // va vers la gauche si on presse la flèche de gauche
      } else if (e.key == "ArrowRight") {
        changeCarrousel(1, mediaDiv); // va vers la droite si on presse la flèche de gauche
      } else if (e.key == "Escape") {
        carrouselCtn.style.display = "none"; // ferme le carrousel si on presse Echap
      } else if (e.key == " ") {
        if (media[i].image == undefined) {
          const myVideo = document.getElementById("video_play");

          // Lit ou met pause la vidéo quand on presse Espace
          if (myVideo.paused) {
            myVideo.play();
          } else {
            myVideo.pause();
          }
        }
      } else {
        console.log(e.key);
      }
    }
  }
  left.addEventListener("click", () => {
    changeCarrousel(-1, mediaDiv, imgTitle);
  });
  right.addEventListener("click", () => {
    changeCarrousel(1, mediaDiv, imgTitle);
  });

  // Change élément du Carrousel, selon la direction dir, -1 ou 1
  function changeCarrousel(dir) {
    if (i + dir >= 0 && i + dir < media.length) {
      i = i + dir;
      // Màj de l'image ou de la vidéo
      mediaDiv.innerHTML = "";
      const mediaConstructCarrousel = new MediaFactory(media[i]);
      const mediaCarrousel = document.createElement(
        mediaConstructCarrousel._html
      );

      if (mediaConstructCarrousel._html == "video") {
        const source = document.createElement("source");
        mediaCarrousel.setAttribute("controls", "controls");
        source.setAttribute("src", `assets/images/${media[i].video}`);
        mediaCarrousel.appendChild(source);
        mediaCarrousel.id = "video_play";
      } else {
        mediaCarrousel.setAttribute("src", `assets/images/${media[i].image}`);
      }
      mediaCarrousel.setAttribute("alt", media[i].title);

      mediaDiv.appendChild(mediaCarrousel);

      // Màj du titre associé
      imgTitle.innerHTML = media[i].title;

      // Màj des Aria-label
      mediaDiv.setAttribute("aria-label", media[i].title);
      imgTitle.setAttribute("aria-label", `Titre image : ${media[i].title}`);
    }
  }
}
