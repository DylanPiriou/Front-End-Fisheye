import { GalleryImage, GalleryVideo } from './GalleryMediaFactory.js';
import { ModalMediaFactory } from "./ModalMediaFactory.js";
import { filterEvent } from "./filterEvent.js";

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
    // Gérer l'appui sur la touche "Enter" pour fermer la modal
    closeModal.addEventListener('keydown', (event) => {
        if (event.key === "Enter") {
            imgModalContainer.style.display = "none"; // Fermer la modal
            clearModalContent(); // Effacer le contenu multimédia
        }
    });

    // Gérer le clic sur le bouton "Suivant"
    nextButton.addEventListener('click', () => {
        if (currentIndex < filteredMedia.length - 1) {
            currentIndex++;
            handleMediaClick(filteredMedia[currentIndex]);
        }
    });
    // Gérer l'appui sur la touche "Enter" pour passer à l'élément suivant
    nextButton.addEventListener('keydown', (event) => {
        if (event.key === "Enter") {
            if (currentIndex < filteredMedia.length - 1) {
                currentIndex++;
                handleMediaClick(filteredMedia[currentIndex]);
            }
        }
    });
    
    // Gérer le clic sur le bouton "Précédent"
    prevButton.addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex--;
            handleMediaClick(filteredMedia[currentIndex]);
        }
    });
    // Gérer l'appui sur la touche "Enter" pour passer à l'élément précédent
    prevButton.addEventListener('keydown', (event) => {
        if (event.key === "Enter") {
            if (currentIndex > 0) {
                currentIndex--;
                handleMediaClick(filteredMedia[currentIndex]);
            }
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

    const modalMediaFactory = new ModalMediaFactory();

    // Gérer le clic sur une image ou une vidéo
    function handleMediaClick(item) {
        clearModalContent();
        closeModal.src = "./assets/icons/close-red.svg";

        // Utiliser la MediaFactory pour créer le média
        const media = modalMediaFactory.createMedia(item);

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
    const filterBtn = document.querySelectorAll(".filterBtn")

    dropdown.addEventListener('click', () => {
        dropdown.classList.toggle('active');
        arrow.classList.toggle("open");
    });
    dropdown.addEventListener('keydown', (event) => {
        if (event.key === "Enter") {
            dropdown.classList.toggle('active');
            arrow.classList.toggle("open");
        }
    });

    filteredMedia.sort((a, b) => b.likes - a.likes);
    updateGallery();

    filterBtn.forEach(btn => {
        filterEvent(btn, updateGallery, filteredMedia)
    });

    function updateGallery() {

        // Efface la galerie actuelle
        while (grid.firstChild) {
            grid.removeChild(grid.firstChild);
        }

        // Parcourir chaque élément filtré
        filteredMedia.forEach((item, index) => {
            let liked = false;
            let galleryItem;

            // Créez un élément de galerie en fonction du type de média (image ou vidéo)
            if (item.image) {
                galleryItem = new GalleryImage(item, liked);
            } else if (item.video) {
                galleryItem = new GalleryVideo(item, liked);
            } else {
                throw new Error('Type de média non pris en charge');
            }

            // Créez l'élément DOM correspondant
            const galleryItemElement = galleryItem.createDOMElement();
            console.log(galleryItem)

            // Ajoutez l'élément à la grille (grid)
            grid.appendChild(galleryItemElement);

            galleryItemElement.children[1].children[0].children[1].addEventListener("click", () => {
                updateLikes(galleryItem.liked);
            })
            galleryItemElement.children[1].children[0].children[1].addEventListener("keydown", (event) => {
                if (event.key === "Enter") {
                updateLikes(galleryItem.liked);
                }
            })

            galleryItemElement.addEventListener('click', () => {
                currentIndex = index;
                handleMediaClick(item, currentIndex);
            });
            galleryItemElement.addEventListener('keydown', (event) => {
                if (event.key === "Enter") {
                    currentIndex = index;
                    handleMediaClick(item, currentIndex);
                }
            });
        });

    }

    // Définissez la fonction pour mettre à jour les likes
    function updateLikes(liked) {
        if (liked) {
            updatedTotalLikes = updatedTotalLikes + 1;
        } else {
            updatedTotalLikes = updatedTotalLikes - 1;
        }
        likesAmount.textContent = updatedTotalLikes; // Mettez à jour l'affichage des likes
    }
    
    likesAmount.textContent = updatedTotalLikes;
    priceNumber.textContent = `${price}€/jour`;
    likesNumber.appendChild(likesAmount);
    likesContainer.appendChild(priceNumber);

}