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
// Création gallerie (done)
// Création modale (done)
// Navigation dans la modale (done)
// Système de likes (++/-- au click) (done)
// Système de tri
// Pouvoir naviguer avec tab