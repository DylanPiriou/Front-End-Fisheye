import { MediaFactory } from "./MediaFactory.js";

// Gestion de la gallerie d'images
export function createGallery(id, filteredMedia, totalLikes, price) {

    const grid = document.querySelector(".gallery_grid");
    const imgModalContainer = document.querySelector(".img_modal_container");
    const imgModal = document.querySelector(".img_modal");
    const closeModal = document.querySelector(".img_modal_close");
    const prevButton = document.querySelector(".img_modal_prev");
    const nextButton = document.querySelector(".img_modal_next");
    const likesContainer = document.querySelector(".likes_container");
    const likesNumber = document.querySelector(".likes_number");
    const likesAmount = document.querySelector(".likes");
    const priceNumber = document.querySelector(".price");
    let currentIndex;
    let updatedTotalLikes = totalLikes;

    // Gérer le clic sur l'élément ".img_modal_close"
    closeModal.addEventListener('click', () => {
        imgModalContainer.style.display = "none"; // Fermer la modal
        clearModalContent(); // Effacer le contenu multimédia
    });
    // Gérer le clic sur le bouton "Suivant"
    nextButton.addEventListener('click', () => {
        if (currentIndex < filteredMedia.length - 1) {
            currentIndex++;
            handleMediaClick(filteredMedia[currentIndex]);
        }
    });
    // Gérer le clic sur le bouton "Précédent"
    prevButton.addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex--;
            handleMediaClick(filteredMedia[currentIndex]);
        }
    });

    // Reset le contenu précédent
    function clearModalContent() {
        const children = Array.from(imgModal.children);
        children.forEach(child => {
            if (child !== closeModal && child !== prevButton && child !== nextButton) {
                imgModal.removeChild(child);
            }
        });
    }

    const mediaFactory = new MediaFactory();

    // Gérer le clic sur une image ou une vidéo
    function handleMediaClick(item) {
        clearModalContent();
        closeModal.src = "../../assets/icons/close-red.svg";

        // Utiliser la MediaFactory pour créer le média
        const media = mediaFactory.createMedia(item);

        // Créer la DOM Element correspondante
        const mediaElement = media.createDOMElement();

        // Ajouter l'élément à imgModal
        imgModal.appendChild(mediaElement);

        // Créer et ajouter le titre
        const titleElement = media.createTitleElement();
        imgModal.appendChild(titleElement);

        // Afficher la modal
        imgModalContainer.style.display = "flex";
    }

    const dropdown = document.querySelector('.dropdown');
    const arrow = document.querySelector('.arrow-top')
    const buttons = document.querySelectorAll('.dropdown-content button');
    const filterBtn = document.querySelectorAll(".filterBtn")

    dropdown.addEventListener('click', () => {
        dropdown.classList.toggle('active');
        arrow.classList.toggle("open");
    });

    filteredMedia.sort((a, b) => b.likes - a.likes);
    updateGallery();

    filterBtn.forEach(btn => {
        btn.addEventListener("click", () => {
            const dataValue = btn.getAttribute("data-value");
            const currentBtn = document.querySelector('.dropbtn');
            const currentDataValue = currentBtn.getAttribute('data-value');

            // Échange des textes entre les boutons
            const currentText = currentBtn.textContent.trim();
            currentBtn.textContent = btn.textContent.trim();
            btn.textContent = currentText;

            // Mise à jour de l'attribut data-value
            currentBtn.setAttribute('data-value', dataValue);
            btn.setAttribute('data-value', currentDataValue);

            if (dataValue === "date") {
                filteredMedia.sort((a, b) => new Date(b.date) - new Date(a.date));
                updateGallery();
            }
            else if (dataValue === "title") {
                filteredMedia.sort((a, b) => a.title.localeCompare(b.title));
                updateGallery();
            }
            else {
                filteredMedia.sort((a, b) => b.likes - a.likes);
                updateGallery();
            }
        });
    });

    function updateGallery() {

        // Efface la galerie actuelle
        while (grid.firstChild) {
            grid.removeChild(grid.firstChild);
        }

        // Parcourir chaque élément filtré
        filteredMedia.forEach((item, index) => {
            const imgWrapper = document.createElement("div");
            imgWrapper.className = "gallery_img_wrapper";
            imgWrapper.setAttribute("aria-label", `Voir '${item.title}'`)
            const imgContent = document.createElement("div");
            imgContent.className = "gallery_img_content";
            const imgTitle = document.createElement("h3");
            imgTitle.className = "gallery_img_title";
            const likesWrapper = document.createElement("span");
            likesWrapper.className = "gallery_img_likes_wrapper";
            const likesNumber = document.createElement("p");
            const likesLogo = document.createElement("img");
            likesLogo.src = "../../assets/icons/heart-red.svg";
            let liked = false;

            if (item.image) {
                const img = document.createElement("img");
                img.src = `./assets/gallery/${id}/${item.image}`;
                img.className = "illustration";
                img.alt = item.title;
                imgWrapper.appendChild(img);
                imgTitle.textContent = item.title;
                likesNumber.textContent = item.likes;
                likesWrapper.appendChild(likesNumber);
                likesWrapper.appendChild(likesLogo);
                imgContent.appendChild(imgTitle);
                imgContent.appendChild(likesWrapper);
                imgWrapper.appendChild(imgContent);
                grid.appendChild(imgWrapper);
            }

            if (item.video) {
                const video = document.createElement("video");
                video.src = `./assets/gallery/${id}/${item.video}`;
                video.className = "illustration";
                video.autoplay = true;
                imgWrapper.appendChild(video);
                imgTitle.textContent = item.title;
                likesNumber.textContent = item.likes;
                likesWrapper.appendChild(likesNumber);
                likesWrapper.appendChild(likesLogo);
                imgContent.appendChild(imgTitle);
                imgContent.appendChild(likesWrapper);
                imgWrapper.appendChild(imgContent);
                grid.appendChild(imgWrapper);
            }

            // Event pour ouvrir la lightbox
            imgWrapper.addEventListener('click', () => {
                currentIndex = index;
                handleMediaClick(item, currentIndex);
            });

            // Event pour ajouter/supprimer un j'aime
            likesLogo.addEventListener("click", (e) => {
                e.stopPropagation();
                if (liked) {
                    liked = false;
                    likesLogo.src = "../../assets/icons/heart-red.svg";
                    item.likes--;
                    updatedTotalLikes--;
                } else {
                    liked = true;
                    likesLogo.src = "../../assets/icons/heart-red-full.svg";
                    item.likes++;
                    updatedTotalLikes++;
                }
                likesNumber.textContent = item.likes;
                likesAmount.textContent = updatedTotalLikes;
            });
        });
    }

    likesAmount.textContent = updatedTotalLikes;
    priceNumber.textContent = `${price}€/jour`;
    likesNumber.appendChild(likesAmount);
    likesContainer.appendChild(priceNumber);
}