import { createGallery } from "../components/photographerGallery.js";
import { getPhotographerData } from "../components/photographerService.js";

// Executer la fonction après le chargement du DOM
document.addEventListener("DOMContentLoaded", async () => {
  const data = await getPhotographerData();

  if (data) {
    // Récupération de l'id dans l'URL + filter
    const { photographers, media } = data;
    const urlParams = new URLSearchParams(window.location.search);
    const urlID = urlParams.get('id');
    const photographerData = photographers.filter(x => x.id == urlID);

    // Hydratation des champs dans photographer-data
    const title = document.querySelector(".photographer_data h1");
    title.textContent = photographerData[0].name;
    const location = document.querySelector(".photographer_data span");
    location.textContent = photographerData[0].city + ", " + photographerData[0].country;
    const tagline = document.querySelector(".photographer_data p");
    tagline.textContent = photographerData[0].tagline;
    const img = document.querySelector(".photographer_header img");
    img.src = `./assets/photographers/${photographerData[0].portrait}`;
    img.alt = photographerData[0].name;

    // Gestion de la modale de contact
    const contactModalTitle = document.querySelector(".contact_modal_title");
    contactModalTitle.innerHTML = `Contactez-moi<br>${photographerData[0].name}`;
    const form = document.getElementById("modal_form");
      form.addEventListener("submit", (e) => {
        e.preventDefault();
        const firstName = document.getElementById("prenom").value;
        const lastName = document.getElementById("nom").value;
        const email = document.getElementById("email").value;
        const message = document.getElementById("message").value;
        console.log("---- Formulaire envoyé avec succès ----")
        console.log(`Prénom : ${firstName}`);
        console.log(`Nom : ${lastName}`);
        console.log(`Email : ${email}`);
        console.log(`Message : ${message}`);
      })

    // Gallerie
    if (photographerData) {
      const photographerId = photographerData[0].id;
      const photographerPrice = photographerData[0].price;
      const filteredMedia = media.filter(item => item.photographerId === photographerId);
      const photographerTotalLikes = filteredMedia.reduce((total, media) => total + media.likes, 0);
      createGallery(photographerId, filteredMedia, photographerTotalLikes, photographerPrice);
    }
  }
});
