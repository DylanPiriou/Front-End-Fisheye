// AJOUTER DES COMMENTAIRES
// AJOUTER LES ARIA LABEL SUR TOUS LES ELEMENTS AVEC LESQUELS ON INTERAGIT
// POUVOIR NAVIGUER AVEC TAB

// async function getPhotographers() {
//     try {
//         const response = await fetch("../../data/photographers.json");
//         if (!response.ok) {
//             throw new Error(`Erreur de chargement du JSON : ${response.statusText}`);
//         }
//         const data = await response.json();
//         const { photographers } = data;

//         const photographersSection = document.querySelector(
//             ".photographer_section"
//         );

//         photographers.forEach((photographer) => {
//             // Création de l'élément article qui contient les infos
//             const photographerArticle = document.createElement("article");
//             photographerArticle.id = photographer.id;
//             photographerArticle.setAttribute("aria-label", `Profil de ${photographer.name}`)

//             // Création des différents éléments qui composent l'article
//             const photographerImg = document.createElement("img");
//             photographerImg.src = `./assets/photographers/${photographer.portrait}`;
//             photographerImg.alt = photographer.name;

//             const photographerName = document.createElement("h2");
//             photographerName.textContent = photographer.name;

//             const photographerCity = document.createElement("span");
//             photographerCity.textContent = photographer.city + ", " + photographer.country;

//             const photographerTagline = document.createElement("p");
//             photographerTagline.textContent = photographer.tagline;

//             const photographerPrice = document.createElement("small");
//             photographerPrice.textContent = photographer.price + "€/jour"

//             // Ajout au contenu de l'article
//             photographerArticle.appendChild(photographerImg);
//             photographerArticle.appendChild(photographerName);
//             photographerArticle.appendChild(photographerCity);
//             photographerArticle.appendChild(photographerTagline);
//             photographerArticle.appendChild(photographerPrice);

//             // Ajout de l'article au conteneur global
//             photographersSection.appendChild(photographerArticle);
//         });
//         addArticleEvent();
//     } catch (error) {
//         console.error(`Une erreur s'est produite : ${error}`);
//     }
// }
// getPhotographers();


// function addArticleEvent() {
//     const articles = document.querySelectorAll('article');
//     console.log(articles)
//     articles.forEach(article => {
//         console.log(article)
//         article.addEventListener('click', () => {
//             const id = article.id;
//             window.location.href = `../../photographer.html?id=${id}`;
//         })
//     })
// }

// main.js

import { fetchPhotographers } from '../components/photographerService.js';
import { createPhotographerCard } from '../components/photographerCard.js';
import { addArticleClickEvent } from '../components/photographerEvent.js';

async function renderPhotographers() {
    const photographers = await fetchPhotographers();
    const photographersSection = document.querySelector('.photographer_section');

    photographers.forEach((photographer) => {
        const photographerArticle = createPhotographerCard(photographer);
        photographerArticle.id = photographer.id;
        photographerArticle.setAttribute("aria-label", `Profil de ${photographer.name}`);
        photographersSection.appendChild(photographerArticle);
        addArticleClickEvent(photographerArticle, photographer.id);
    });
}

renderPhotographers();
