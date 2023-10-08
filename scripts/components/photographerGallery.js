export function createGallery(id, filteredMedia) {
    const grid = document.querySelector(".gallery_grid");

    // Parcourir chaque élément filtré
    filteredMedia.forEach(item => {
        
        // Créer les nouveaux éléments du DOM
        const imgWrapper = document.createElement("div");
        imgWrapper.className = "gallery_img_wrapper";
        const imgContent = document.createElement("div");
        imgContent.className = "gallery_img_content";
        const imgTitle = document.createElement("h3");
        imgTitle.className = "gallery_img_title"
        const likesWrapper = document.createElement("span");
        likesWrapper.className = "gallery_img_likes_wrapper";
        const likesNumber = document.createElement("p");
        const likesLogo = document.createElement("img");
        likesLogo.src = "../../assets/icons/heart-red.svg";

        // Créer une balise <img> pour chaque élément image
        if (item.image) {
            const img = document.createElement("img");
            img.src = `./assets/gallery/${id}/${item.image}`;
            img.alt = item.title;
            img.setAttribute('aria-label', `voir l'image '${item.title}'`)
            imgWrapper.appendChild(img);
            imgTitle.textContent = item.title;
            likesNumber.textContent = item.likes;
            likesWrapper.appendChild(likesNumber);
            likesWrapper.appendChild(likesLogo);
            imgContent.appendChild(imgTitle);
            imgContent.appendChild(likesWrapper);
            imgWrapper.appendChild(imgContent);
            grid.appendChild(imgWrapper)

            imgWrapper.addEventListener('click', () => {
                const imgModalContainer = document.querySelector(".img_modal_container");
                const imgModal = document.querySelector(".img_modal");
                const img = document.createElement("img");
                img.src = `./assets/gallery/${id}/${item.image}`;
                imgModal.appendChild(img);
                const title = document.querySelector(".img_modal h3");
                title.textContent = item.title;
                imgModal.appendChild(title);
                imgModalContainer.style.display = "flex";
            });
        }

        // Créer une balise <video> pour chaque élément vidéo
        if (item.video) {
            const video = document.createElement("video");
            video.src = `./assets/gallery/${id}/${item.video}`;
            video.setAttribute('aria-label', `voir la vidéo '${item.title}'`)
            video.autoplay = true;
            imgWrapper.appendChild(video);
            imgTitle.textContent = item.title;
            likesNumber.textContent = item.likes;
            likesWrapper.appendChild(likesNumber);
            likesWrapper.appendChild(likesLogo);
            imgContent.appendChild(imgTitle);
            imgContent.appendChild(likesWrapper);
            imgWrapper.appendChild(imgContent);
            grid.appendChild(imgWrapper)

            imgWrapper.addEventListener('click', () => {
                const imgModalContainer = document.querySelector(".img_modal_container");
                const imgModal = document.querySelector(".img_modal");
                const video = document.createElement("video");
                video.src = `./assets/gallery/${id}/${item.video}`;
                video.controls = true;
                imgModal.appendChild(video);
                const title = document.querySelector(".img_modal h3");
                title.textContent = item.title;
                imgModal.appendChild(title);
                imgModalContainer.style.display = "flex";
            });
        }
    });
}