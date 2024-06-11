import { getPhotographerData } from '../components/photographerService.js';
import { createPhotographerCard } from '../components/photographerCard.js';
import { addArticleClickEvent } from '../components/photographerEvent.js';

// Executer la fonction après le chargement du DOM
document.addEventListener("DOMContentLoaded", async () => {
    const { photographers } = await getPhotographerData();
    const photographersSection = document.querySelector('.photographer_section');

    // Créations des cartes photographes
    photographers.forEach((photographer) => {
        const photographerArticle = createPhotographerCard(photographer);
        photographerArticle.id = photographer.id;
        photographerArticle.setAttribute("aria-label", `Profil de ${photographer.name}`);
        photographersSection.appendChild(photographerArticle);
        addArticleClickEvent(photographerArticle, photographer.id);
    });
});