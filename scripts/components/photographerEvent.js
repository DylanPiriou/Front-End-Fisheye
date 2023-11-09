// Event au click sur les profils pour aller vers la single
export function addArticleClickEvent(article, id) {
    const goToPhotographer = () => {
        window.location.href = `./photographer.html?id=${id}`;
    };
    article.addEventListener('click', goToPhotographer);
    article.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            goToPhotographer();
        }
    });
}
