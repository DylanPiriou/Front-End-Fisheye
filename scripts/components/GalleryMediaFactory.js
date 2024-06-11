class GalleryItem {
    constructor(item, liked) {
        this.item = item;
        this.id = item.photographerId;
        this.liked = liked;
        this.mediaTitle = this.item.title;
        this.likesValue = document.createElement("p");
        this.likesLogo = document.createElement("img");
        this.likesLogo.src = "./assets/icons/heart-red.svg";
    }

    createDOMElement() {
        const mediaWrapper = document.createElement("div");
        mediaWrapper.className = "gallery_img_wrapper";

        const mediaContent = document.createElement("div");
        mediaContent.className = "gallery_img_content";

        const imgTitle = document.createElement("p");
        imgTitle.className = "gallery_img_title";
        imgTitle.textContent = this.mediaTitle;

        const likesWrapper = document.createElement("span");
        likesWrapper.className = "gallery_img_likes_wrapper";
        likesWrapper.setAttribute("aria-label", "Liker/Disliker")
        likesWrapper.setAttribute("tabindex", 0);

        this.likesLogo.src = "./assets/icons/heart-red.svg";
        this.likesLogo.alt = "bouton j'aime";

        this.likesValue.textContent = this.item.likes;

        // Like au click
        likesWrapper.addEventListener("click", (e) => {
            e.stopPropagation();
            this.toggleLike();
        });

        // Like avec "Entrer"
        likesWrapper.addEventListener("keydown", (e) => {
            if (e.key === "Enter") {
                e.stopPropagation();
                this.toggleLike();
            }
        });

        likesWrapper.appendChild(this.likesValue);
        likesWrapper.appendChild(this.likesLogo);

        mediaContent.appendChild(imgTitle);
        mediaContent.appendChild(likesWrapper);
        mediaWrapper.appendChild(mediaContent);

        return mediaWrapper;
    }

    toggleLike() {
    
        if (this.liked) {
            this.likesLogo.src = "./assets/icons/heart-red.svg";
            this.item.likes--;
            this.likesValue.textContent = this.item.likes;
        } else if (!this.liked) {
            this.likesLogo.src = "./assets/icons/heart-red-full.svg";
            this.item.likes++;
            this.likesValue.textContent = this.item.likes;
        }
    
        this.liked = !this.liked;
    }
    
}

class GalleryImage extends GalleryItem {
    constructor(item, liked) {
        super(item, liked);
    }

    createDOMElement() {
        const imageWrapper = document.createElement("div");
        imageWrapper.className = "gallery_image_wrapper";
        imageWrapper.setAttribute("aria-label", "Afficher l'image");
        imageWrapper.setAttribute("tabindex", 0);
        
        const image = document.createElement("img");
        image.src = `./assets/gallery/${this.id}/${this.item.image}`;
        image.className = "gallery_image";
        image.alt = this.item.title;

        imageWrapper.appendChild(image);
        imageWrapper.appendChild(super.createDOMElement());
        return imageWrapper;
    }

    toggleLike() {
        super.toggleLike();
    }
}


class GalleryVideo extends GalleryItem {
    constructor(item, liked) {
        super(item, liked);
    }

    createDOMElement() {
        const videoWrapper = document.createElement("div");
        videoWrapper.className = "gallery_video_wrapper";
        videoWrapper.setAttribute("aria-label", "Afficher la vidéo");
        videoWrapper.setAttribute("tabindex", 0);

        const video = document.createElement("video");
        video.src = `./assets/gallery/${this.id}/${this.item.video}`;
        video.className = "gallery_video";
        video.autoplay = true;

        videoWrapper.appendChild(video);
        videoWrapper.appendChild(super.createDOMElement());

        return videoWrapper;
    }

    toggleLike() {
        super.toggleLike();
    }
}

export { GalleryItem, GalleryImage, GalleryVideo };