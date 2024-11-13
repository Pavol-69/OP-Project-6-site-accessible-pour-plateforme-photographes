// Création de la partie Carrousel
function makeCarrousel(
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
  } else {
    mediaCarrousel.setAttribute("src", media_path);
  }

  imgTitle.textContent = title;

  // Mise en relation des différents éléments
  carrousel.appendChild(left);
  mediaDiv.appendChild(mediaCarrousel);
  mediaCtn.appendChild(mediaDiv);
  mediaCtn.appendChild(imgTitle);
  carrousel.appendChild(mediaCtn);
  carrousel.appendChild(right);

  // Events avec les boutons
  document.onkeydown = checkKey;
  function checkKey(e) {
    if (carrouselCtn.style.display == "flex") {
      if (e.key == "ArrowLeft") {
        changeCarrousel(-1, mediaDiv);
      } else if (e.key == "ArrowRight") {
        changeCarrousel(1, mediaDiv);
      }
    }
  }
  left.addEventListener("click", (e) => {
    changeCarrousel(-1, mediaDiv, imgTitle);
  });
  right.addEventListener("click", (e) => {
    changeCarrousel(1, mediaDiv, imgTitle);
  });

  // Change élément du Carrousel, selon la direction dir, -1 ou 1
  function changeCarrousel(dir) {
    if (i + dir >= 0 && i + dir < media.length) {
      i = i + dir;
      // Màj de l'image ou de la vidéo
      mediaDiv.innerHTML = "";
      const mediaCarrousel = document.createElement(
        `${media[i].image === undefined ? "video" : "img"}` // On adapte si image ou video
      );

      if (media[i].image == undefined) {
        const source = document.createElement("source");
        mediaCarrousel.setAttribute("controls", "controls");
        source.setAttribute("src", `assets/images/${media[i].video}`);
        mediaCarrousel.appendChild(source);
      } else {
        mediaCarrousel.setAttribute("src", `assets/images/${media[i].image}`);
      }
      mediaDiv.appendChild(mediaCarrousel);

      // Màj du titre associé
      imgTitle.innerHTML = media[i].title;
    }
  }
}
