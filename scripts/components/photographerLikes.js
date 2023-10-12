// Modale avec le nombre de likes et le tarif journalier
export function handleLikesContainer(likes, price) {
    const likesContainer = document.querySelector(".likes_container");
    const likesNumber = document.querySelector(".likes_number");
    const likesAmount = document.querySelector(".likes");
    const priceNumber = document.querySelector(".price");
    likesAmount.textContent = likes;
    priceNumber.textContent = `${price}€/jour`;
    likesNumber.appendChild(likesAmount);
    likesContainer.appendChild(priceNumber);
}