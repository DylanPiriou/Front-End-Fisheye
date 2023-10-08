import { createGallery } from "../components/photographerGallery.js"
import { handleLikesContainer } from "../components/photographerLikes.js";

// Executer la fonction après le chargement du DOM
document.addEventListener("DOMContentLoaded", () => {
    getPhotographersData();
})

async function getPhotographersData() {
    try {
        const response = await fetch("../../data/photographers.json");

        if (!response.ok) {
            throw new Error(`Erreur de chargement du JSON : ${response.statusText}`);
        }

        const data = await response.json();
        const { photographers, media } = data;
        const urlParams = new URLSearchParams(window.location.search);
        const urlID = urlParams.get('id');
        const photographerData = photographers.filter(x => x.id == urlID);
        console.log(photographerData)

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
            console.log(filteredMedia)
            const photographerLikesNumber = filteredMedia
                .map(item => item.likes)
                .reduce((acc, curr) => acc + curr, 0);

            createGallery(photographerId, filteredMedia);
            handleLikesContainer(photographerLikesNumber, photographerPrice)
        }
    }
    catch (error) {
        console.error(`Une erreur s'est produite : ${error}`);
    }
}
