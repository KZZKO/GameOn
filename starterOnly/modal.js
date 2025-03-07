function editNav() {
  var x = document.querySelector(".main-navbar-mobile");
  var y = document.querySelector('.hide-main-navbar-mobile');
  if (y) {
    x.className = "main-navbar-mobile show-main-navbar-mobile"
  } else {
    x.className = "main-navbar-mobile hide-main-navbar-mobile"
  }
}

// DOM Elements
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const closeModalBtn = document.querySelector(".close");
const form = document.querySelector("form");
const first = document.getElementById("first");
const last = document.getElementById("last");
const email = document.getElementById("email");
const birthdate = document.getElementById("birthdate");
const quantity = document.getElementById("quantity");
const checkbox1 = document.getElementById("checkbox1");
const formDataCheckbox = document.getElementById("formDataCheckbox");
const cityRadios = document.querySelectorAll("input[name='location']");
const success = document.querySelector(".success");
const closeSuccessBtn = document.querySelector(".success button");

// Ouverture de la modal
modalBtn.forEach((btn) =>
  btn.addEventListener("click", () => {
    modalbg.style.display = "block";
    form.style.display = "block";
  })
);

// Fermeture de la modal
closeModalBtn.addEventListener("click", () => {
  modalbg.style.display = "none";
  success.style.display = "none";
});

// Fermeture de la modal si on clique en dehors
modalbg.addEventListener("click", (event) => {
  if (event.target === modalbg) {
    modalbg.style.display = "none";
    success.style.display = "none";
  }
});

// Fermeture de la  deuxième modal
closeSuccessBtn.addEventListener("click", () => {
  modalbg.style.display = "none";
  success.style.display = "none";
});

// Fonction pour montrer les messages d'erreurs
function showError(input, message, className) {
  const previousError = input.parentElement.querySelector(`.${className}`);
  if (previousError) previousError.remove();

  let span = document.createElement("span");
  span.textContent = message;
  span.className = `error ${className}`;
  input.parentElement.appendChild(span);
}

// Fonction pour retirer les messages d'erreurs
function clearError(input, className) {
  const error = input.parentElement.querySelector(`.${className}`);
  if (error) error.remove();
}

// Fonction de validation
function validate(e) {
  e.preventDefault();

  let isValid = true;

  // Nettoyage des erreurs
  clearError(first, "first-error");
  clearError(last, "last-error");
  clearError(email, "email-error");
  clearError(birthdate, "birthdate-error");
  clearError(quantity, "quantity-error");
  clearError(cityRadios[0], "city-error");
  clearError(formDataCheckbox, "checkbox-label-1-error");

  if (first.value.trim() === "") {
    showError(first, "Veuillez saisir votre prénom", "first-error");
    isValid = false;
  } else if (first.value.trim().length < 2) {
    showError(first, "Votre prénom doit contenir un minimum de 2 caractères", "first-error");
    isValid = false;
  }

  if (last.value.trim() === "") {
    showError(last, "Veuillez saisir votre nom", "last-error");
    isValid = false;
  } else if (last.value.trim().length < 2) {
    showError(last, "Votre nom doit contenir un minimum de 2 caractères", "last-error");
    isValid = false;
  }

  // Vérification de l'email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email.value.trim())) {
    showError(email, "Veuillez entrer une adresse e-mail valide", "email-error");
    isValid = false;
  }

  // Vérification de la date de naissance
  if (birthdate.value.trim() === "") {
    showError(birthdate, "Vous devez entrer votre date de naissance.", "birthdate-error");
    isValid = false;
  }

  // Vérification du nombre de tournois
  if (quantity.value.trim() === "" || isNaN(quantity.value) || quantity.value < 0 || quantity.value > 99) {
    showError(quantity, "Veuillez entrer un nombre valide entre 0 et 99", "quantity-error");
    isValid = false;
  }

  // Vérification de la sélection d'une ville
  const citySelected = Array.from(cityRadios).some((radio) => radio.checked);
  if (!citySelected) {
    showError(cityRadios[0], "Vous devez choisir une option.", "city-error");
    isValid = false;
  }

  // Vérification de la checkbox
  if (!checkbox1.checked) {
    showError(formDataCheckbox, "Veuillez accepter les conditions d'utilisation", "checkbox-label-1-error");
    isValid = false;
  }

  // Si tout est valide, on peut envoyer le formulaire
  if (isValid) {
    console.log("Formulaire envoyé !");
    form.style.display = "none";
    success.style.display = "flex";
    form.reset();
  }
}

// Suppression des erreurs en tapant
first.addEventListener("input", () => clearError(first, "first-error"));
last.addEventListener("input", () => clearError(last, "last-error"));
email.addEventListener("input", () => clearError(email, "email-error"));
birthdate.addEventListener("input", () => clearError(birthdate, "birthdate-error"));
quantity.addEventListener("input", () => clearError(quantity, "quantity-error"));
checkbox1.addEventListener("change", () => clearError(formDataCheckbox, "checkbox-label-1-error"));

// Suppression de l’erreur lorsqu’une ville est sélectionnée
cityRadios.forEach((radio) => radio.addEventListener("change", () => clearError(cityRadios[0], "city-error")));

// Écouter la soumission du formulaire
form.addEventListener("submit", validate);