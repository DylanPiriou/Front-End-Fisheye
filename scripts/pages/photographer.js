// Executer la fonction après le chargement du DOM
document.addEventListener("DOMContentLoaded", () => {
    getPhotographersData();
})

async function getPhotographersData(){
    try{
        const response = await fetch("../../data/photographers.json");

        if(!response.ok){
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
        if(photographerData){
            createGallery(photographerData[0].id, media);
        }
    }
    catch (error) {
        console.error(`Une erreur s'est produite : ${error}`);
    }
}

const grid = document.querySelector(".gallery_grid");

function createGallery(id, media) {
    const filteredMedia = media.filter(item => item.photographerId === id);
    console.log(filteredMedia);

    // Parcourir chaque élément filtré
    filteredMedia.forEach(item => {
        // Créer une balise <img> pour chaque élément image
        if (item.image) {
            const img = document.createElement("img");
            img.src = `./assets/gallery/${id}/${item.image}`;
            img.alt = item.alt;
            grid.appendChild(img);
        }

        // Créer une balise <video> pour chaque élément vidéo
        if (item.video) {
            const video = document.createElement("video");
            video.src = `./assets/gallery/${id}/${item.video}`;
            video.alt = item.alt;
            video.controls = true; // Ajouter des contrôles pour la vidéo
            grid.appendChild(video);
        }
    });
}
