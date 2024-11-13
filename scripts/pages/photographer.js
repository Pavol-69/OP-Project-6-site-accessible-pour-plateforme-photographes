// Code JavaScript lié à la page photographer.html

// Récupération de la valeur de tri choisie + Maj à chaque qu'un autre tri est choisi
const triBtn = document.getElementById("tri_button");

// Récupération des objects du panel recap
const likesPanel = document.getElementById("tot_likes");
const price = document.getElementById("price");

// Variable pour enregistrement des data, pour ne pas fetcher plusieurs fois
var idRec = "";
var dataRec = "";

// Total likes
var totLikes = 0;

//Récupération éléments carrousel
const closeCarrousel = document.getElementById("close_carrousel");
const carrouselCtn = document.getElementById("carrousel_ctn");
const carrousel = document.getElementById("carrousel_content");

// Nom dans formulaire
contactName = document.getElementById("contact_name");

// Fermeture Carrousel quand on clique sur la croix
closeCarrousel.addEventListener("click", (e) => {
  carrouselCtn.style.display = "none";
});

let tri = triBtn.value;
triBtn.addEventListener("change", (e) => {
  tri = triBtn.value;
  const photographerMedia = getPhotographerMedia(
    mediaTri(dataRec.media),
    idRec
  ); // récupère les medias du photographe
  displayPhotographerPortefolio(photographerMedia); // Màj du Portefolio
});

async function getId() {
  // Récupération de l'id du photographe dans l'url
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get("id");
}

async function getAllData() {
  // Récupération de toutes les infos liées à un photographe nommé par son ID
  const reponse = await fetch("./data/photographers.json");
  const data = await reponse.json();
  return data;
}

function getPhotographerInfo(data, id) {
  // Récupère toutes les infos d'un photographe dans data selon id
  const info = data.filter((photographer) => photographer.id == id);
  return info;
}

function getPhotographerMedia(data, id) {
  // Récupère toutes les infos d'un photographe dans data selon id
  const media = data.filter((media) => media.photographerId == id);
  return media;
}

async function displayPhotographerHeader(info) {
  // Création du header
  const photographerHeaderCtn = document.querySelector(".photograph-header"); // Récupération du container
  const photographerHeader = photographerHeaderTemplate(info);
  const photographerHeaderInfoDOM =
    photographerHeader.getPhotographerHeaderInfoDOM();
  const photographerHeaderPhotoDOM =
    photographerHeader.getPhotographerHeaderPhotoDOM();
  photographerHeaderCtn.childNodes[0].before(photographerHeaderInfoDOM);
  photographerHeaderCtn.appendChild(photographerHeaderPhotoDOM);

  // Remplissage du panel recap
  price.textContent = `${info[0].price}€ / jour`;
}

async function displayPhotographerPortefolio(media) {
  // Création du portefolio
  const photographerPortefolioCtn = document.querySelector(".portefolio"); // Récupération du container
  photographerPortefolioCtn.innerHTML = ""; // On vide tout pour les màj, comme ça on part d'un container vide à chaque fois

  for (let i = 0; i < media.length; i++) {
    const portefolioItem = photographerPortefolio(
      media,
      i,
      likesPanel,
      carrouselCtn,
      carrousel
    );
    const portefolioItemDOM = portefolioItem.getPhotographerPortefolioDOM();
    totLikes = totLikes + portefolioItem.totLikes;
    photographerPortefolioCtn.appendChild(portefolioItemDOM);
  }
}

async function init() {
  const id = await getId(); // Récupèration de l'id du photographe dans l'url
  idRec = id;
  const data = await getAllData(); // Récupèration de toutes les datas
  dataRec = data;

  const photographerInfo = getPhotographerInfo(data.photographers, id); // récupère les infos du photographe
  const photographerMedia = getPhotographerMedia(mediaTri(data.media), id); // récupère les medias du photographe
  displayPhotographerHeader(photographerInfo); // Création du Header
  displayPhotographerPortefolio(photographerMedia); // Création du Portefolio

  // Renseigner du nombre total de likes
  likesPanel.textContent = totLikes;

  // Renseignement nom dans formulaire de contact
  contactName.innerHTML = photographerInfo[0].name;
}

// Fonction qui tri selon la sélection faite
function mediaTri(data) {
  const dataTri = data.sort(function (a, b) {
    return tri === "Popularité"
      ? a.likes > b.likes
        ? -1
        : a.likes < b.likes
        ? 1
        : 0
      : tri === "Date"
      ? a.date < b.date
        ? -1
        : a.date > b.date
        ? 1
        : 0
      : a.title < b.title
      ? -1
      : a.title > b.title
      ? 1
      : 0;
  });
  return dataTri;
}

init();
