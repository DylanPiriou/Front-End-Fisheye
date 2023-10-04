async function getPhotographers() {
    try {
        const response = await fetch("../../data/photographers.json");
        if (!response.ok) {
            throw new Error(`Erreur de chargement du JSON : ${response.statusText}`);
        }
        const data = await response.json();
        const { photographers } = data;

        const photographersSection = document.querySelector(
            ".photographer_section"
        );

        photographers.forEach((photographer) => {
            // Création de l'élément article qui contient les infos
            const photographerArticle = document.createElement("article");

            // Création des différents éléments qui composent l'article
            const photographerImg = document.createElement("img");
            photographerImg.src = `./assets/photographers/${photographer.portrait}`;
            const photographerName = document.createElement("h2");
            photographerName.textContent = photographer.name;
            const photographerCity = document.createElement("span");
            photographerCity.textContent = photographer.city + ", " + photographer.country;
            const photographerTagline = document.createElement("p");
            photographerTagline.textContent = photographer.tagline;
            const photographerPrice = document.createElement("small");
            photographerPrice.textContent = photographer.price + "€/jour"

            // Ajout au contenu de l'article
            photographerArticle.appendChild(photographerImg);
            photographerArticle.appendChild(photographerName);
            photographerArticle.appendChild(photographerCity);
            photographerArticle.appendChild(photographerTagline);
            photographerArticle.appendChild(photographerPrice);

            // Ajout de l'article au conteneur global
            photographersSection.appendChild(photographerArticle);
        });

    } catch (error) {
        console.error(`Une erreur s'est produite : ${error}`);
    }
}

getPhotographers();



// async function displayData(photographers) {
//     const photographersSection = document.querySelector(".photographer_section");

//     photographers.forEach((photographer) => {
//         const photographerModel = photographerTemplate(photographer);
//         const userCardDOM = photographerModel.getUserCardDOM();
//         photographersSection.appendChild(userCardDOM);
//     });
// }

// async function init() {
//     // Récupère les datas des photographes
//     const { photographers } = await getPhotographers();
//     displayData(photographers);
// }

// init();
