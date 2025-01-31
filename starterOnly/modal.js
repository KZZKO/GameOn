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

// Ouverture de la modal
modalBtn.forEach((btn) => btn.addEventListener("click", () => {
  modalbg.style.display = "block";
}));

// Fermeture de la modal
closeModalBtn.addEventListener("click", () => {
  modalbg.style.display = "none";
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
  if (first.value.trim() === "") {
    showError(first, "Veuillez saisir votre prénom", "first-error");
    isValid = false;
  } else if (first.value.trim().length < 2) {
    showError(first, "Votre prénom doit contenir un minimum de 2 caractères", "first-error");
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

// Écouter la soumission du formulaire
form.addEventListener("submit", validate);
