import { createGallery } from "../components/photographerGallery.js";
import { getPhotographerData } from "../components/photographerService.js";

// Executer la fonction après le chargement du DOM
document.addEventListener("DOMContentLoaded", async () => {
  const data = await getPhotographerData();

  if (data) {
    const { photographers, media } = data;
    const urlParams = new URLSearchParams(window.location.search);
    const urlID = urlParams.get('id');
    const photographerData = photographers.filter(x => x.id == urlID);

    const title = document.querySelector(".photograph-data h2");
    title.textContent = photographerData[0].name;
    const location = document.querySelector(".photograph-data span");
    location.textContent = photographerData[0].city + ", " + photographerData[0].country;
    const tagline = document.querySelector(".photograph-data p");
    tagline.textContent = photographerData[0].tagline;
    const img = document.querySelector(".photograph-header img");
    img.src = `./assets/photographers/${photographerData[0].portrait}`;
    img.alt = photographerData[0].name;

    if (photographerData) {
      const photographerId = photographerData[0].id;
      const photographerPrice = photographerData[0].price;
      const filteredMedia = media.filter(item => item.photographerId === photographerId);
      const photographerTotalLikes = filteredMedia.reduce((total, media) => total + media.likes, 0);
      createGallery(photographerId, filteredMedia, photographerTotalLikes, photographerPrice);
    }
  }
});
