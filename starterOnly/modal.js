function editNav() {
  var x = document.getElementById("myTopnav");
  x.classList.toggle("responsive");
}

// DOM Elements
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const closeModalBtn = document.querySelector(".close");
const form = document.querySelector("form");
const first = document.getElementById("first");
const last = document.getElementById('last');
const email = document.getElementById("email");
const quantity = document.getElementById("quantity");
const checkbox1 = document.getElementById('checkbox1');
const formDataCheckbox = document.getElementById('formDataCheckbox');

// Ouverture de la modal
modalBtn.forEach((btn) => btn.addEventListener("click", () => {
  modalbg.style.display = "block";
}));

// Fermeture de la modal
closeModalBtn.addEventListener("click", () => {
  modalbg.style.display = "none";
});

// Fermeture de la modal si on clique en dehors
modalbg.addEventListener("click", (event) => {
  if (event.target === modalbg) {
    modalbg.style.display = "none";
  }
});

// Fonction pour montrer les messages d'erreurs
function showError(input, message, className) {
  // Supprimer les anciennes erreurs du même champ
  const previousError = input.parentElement.querySelector(`.${className}`);
  if (previousError) previousError.remove();

  // Créer et afficher le message d'erreur
  let span = document.createElement("span");
  span.textContent = message;
  span.className = `error ${className}`;
  input.after(span);
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

  // Vérification du prénom
  clearError(first, "first-error");
  clearError(last, "last-error");
  clearError(email, "email-error");
  clearError(quantity, "quantity-error");

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

  // Vérification du nombre de tournois
  if (quantity.value.trim() === "" || isNaN(quantity.value) || quantity.value < 0 || quantity.value > 99) {
    showError(quantity, "Veuillez entrer un nombre valide entre 0 et 99", "quantity-error");
    isValid = false;
  }

  if (!checkbox1.checked) {
    showError(formDataCheckbox, "Veuillez accepter les conditions d'utilisations", "checkbox-label-1-error");
    isValid = false;
  }

  // Si tout est valide, on peut envoyer le formulaire
  if (isValid) {
    console.log("Formulaire envoyé !");
    form.submit();
  }
}

// Supprimer les erreurs lorsqu'on modifie un champ
first.addEventListener("input", () => clearError(first, "first-error"));
last.addEventListener("input", () => clearError(last, "last-error"));
email.addEventListener("input", () => clearError(email, "email-error"));
quantity.addEventListener("input", () => clearError(quantity, "quantity-error"));

// Écouter la soumission du formulaire
form.addEventListener("submit", validate);