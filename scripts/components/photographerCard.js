// Création des profils de photographe
export function createPhotographerCard(photographer) {
    console.log(photographer)
    const { name, portrait, city, country, tagline, price } = photographer;
    const picture = `assets/photographers/${portrait}`;
    const article = document.createElement('article');
    const img = document.createElement('img');
    img.setAttribute("src", picture);

    const content = document.createElement('div');
    content.classList = "photographer_content";

    const photographerName = document.createElement('h2');
    photographerName.classList = "photographer_name";
    photographerName.textContent = name;
    
    const place = document.createElement('p');
    place.classList = "photographer_place"
    place.textContent = `${city}, ${country}`;

    const tag = document.createElement('p');
    tag.classList = "photographer_tagline";
    tag.textContent = tagline;

    const pricePerDay = document.createElement('p');
    pricePerDay.classList = "photographer_price";
    pricePerDay.textContent = `${price}€/jour`; 

    article.appendChild(img);
    content.appendChild(photographerName);
    content.appendChild(place);
    content.appendChild(tag);
    content.appendChild(pricePerDay);
    article.appendChild(content);
    return article;
}
