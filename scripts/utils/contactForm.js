// Variables menu contact
const contact = document.getElementById("contact_modal_ctn");
const contactForm = document.getElementById("contact_form");
const thanksMessage = document.getElementById("thanks_message");
const first = document.getElementById("first");
const last = document.getElementById("last");
const email = document.getElementById("email");
const message = document.getElementById("message");
const formData = document.querySelectorAll(".formData");
const croix = document.getElementById("croix");
const fermer = document.getElementById("thanks_close");
const btnModal = document.getElementById("btn_modal");

function displayModal() {
  contact.style.display = "block";
}

btnModal.addEventListener("click", () => displayModal());

function closeModal() {
  contact.style.display = "none";
  cleanForm(); // décision de tout nettoyer à chaque qu'on ferme le formulaire
  // On réaffiche les bons éléments
  contactForm.style.display = "flex";
  thanksMessage.style.display = "none";
}

croix.addEventListener("click", () => closeModal());
fermer.addEventListener("click", () => closeModal());

contact.addEventListener("submit", (e) => {
  e.preventDefault();

  if (verifName(first) && verifName(last) && verifMail() && verifMessage()) {
    // Message à afficher dans la console
    const display = `Prénom : ${first.value}\n\nNom : ${last.value}\n\nEmail : ${email.value}\n\nMessage : ${message.value}`;
    validMessage();
    console.log(display);
  }

  // Affichage message validation
});

// Vérification que le Nom et Prénom soient présenté et ont bien plus de 2 caractères
function verifName(name) {
  if (name.value.trim() == "") {
    name.parentNode.setAttribute("data-error-visible", "true");
    name.parentNode.setAttribute("data-error-1-visible", "false");
    return false;
  } else if (name.value.trim().length < 2) {
    name.parentNode.setAttribute("data-error-1-visible", "true");
    name.parentNode.setAttribute("data-error-visible", "false");
    return false;
  } else {
    name.parentNode.setAttribute("data-error-visible", "false");
    name.parentNode.setAttribute("data-error-1-visible", "false");
    return true;
  }
}

// Vérification de si l'adresse mail est correctement renseignée
function verifMail() {
  const verif = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Vérifie que le format de l'adresse mail est ***@***.***
  if (verif.test(String(email.value.trim()).toLowerCase())) {
    email.parentNode.setAttribute("data-error-visible", "false");
    return true;
  } else {
    email.parentNode.setAttribute("data-error-visible", "true");
    return false;
  }
}

// Vérification qu'un message d'au moins 10 caractères ait été rentré
function verifMessage() {
  if (message.value.trim().length < 10) {
    message.parentNode.setAttribute("data-error-visible", "true");
    return false;
  } else {
    message.parentNode.setAttribute("data-error-visible", "false");
    return true;
  }
}

// Nettoyage formulaire
function cleanForm() {
  // Texte rentré par l'utilisateur
  first.value = "";
  last.value = "";
  email.value = "";
  message.value = "";

  // Message d'erreur
  formData.forEach((elt) => elt.setAttribute("data-error-visible", "false"));
}

// Affichage message validation
function validMessage() {
  contactForm.style.display = "none";
  thanksMessage.style.display = "flex";
}
