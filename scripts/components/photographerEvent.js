export function addArticleClickEvent(article, id) {
    article.addEventListener('click', () => {
        window.location.href = `../../photographer.html?id=${id}`;
    });
}
