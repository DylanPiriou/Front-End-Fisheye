// Création des profils de photographe
export function createPhotographerCard(photographer) {
    const { name, portrait } = photographer;
    const picture = `assets/photographers/${portrait}`;
    const article = document.createElement('article');
    const img = document.createElement('img');
    img.setAttribute("src", picture);
    const h2 = document.createElement('h2');
    h2.textContent = name;
    article.appendChild(img);
    article.appendChild(h2);
    return article;
}
