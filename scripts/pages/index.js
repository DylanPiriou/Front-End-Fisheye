import { getPhotographerData } from '../components/photographerService.js';
import { createPhotographerCard } from '../components/photographerCard.js';
import { addArticleClickEvent } from '../components/photographerEvent.js';

async function renderPhotographers() {
    const { photographers } = await getPhotographerData();
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

// ------------- TODO ------------- //
// Navigation dans la modale
// Système de tri
// Système de likes (incrémentation au click)
// Pouvoir naviguer avec tab