// Event au click sur les profils pour aller vers la single
export function addArticleClickEvent(article, id) {
    article.addEventListener('click', () => {
        window.location.href = `./photographer.html?id=${id}`;
    });
}
