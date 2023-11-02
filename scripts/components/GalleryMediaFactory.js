class GalleryItem {
    constructor(item, liked) {
        this.item = item;
        this.id = item.photographerId;
        this.liked = liked;
        this.mediaTitle = this.item.title;
        this.likesValue = document.createElement("p");
        this.likesLogo = document.createElement("img");
        this.likesLogo.src = "../../assets/icons/heart-red.svg";
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

        this.likesLogo.src = "../../assets/icons/heart-red.svg";
        this.likesLogo.alt = "bouton j'aime";

        this.likesValue.textContent = this.item.likes;

        likesWrapper.addEventListener("click", (e) => {
            e.stopPropagation();
            this.toggleLike();
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
            this.likesLogo.src = "../../assets/icons/heart-red.svg";
            this.item.likes--;
            this.likesValue.textContent = this.item.likes;
        } else if (!this.liked) {
            this.likesLogo.src = "../../assets/icons/heart-red-full.svg";
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
        imageWrapper.setAttribute("aria-label", "Afficher l'image")
        
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
        videoWrapper.setAttribute("aria-label", "Afficher la vidéo")

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







// class GalleryMediaFactory {
//     createGalleryItem(item, liked, updatedTotalLikes) {
//         if (item.image) {
//             return new GalleryImage(item, liked, updatedTotalLikes);
//         } else if (item.video) {
//             return new GalleryVideo(item, liked, updatedTotalLikes);
//         } else {
//             throw new Error('Type de média non pris en charge');
//         }
//     }
// }

// class GalleryImage {
//     constructor(item, liked, updatedTotalLikes) {
//         this.item = item;
//         this.id = item.photographerId;
//         this.updatedTotalLikes = updatedTotalLikes;
//         this.liked = liked;
//         this.likesValue = document.createElement("p");
//         this.likesLogo = document.createElement("img");
//         this.likesLogo.src = "../../assets/icons/heart-red.svg";
//     }

//     createDOMElement() {
//         const imgWrapper = document.createElement("div");
//         imgWrapper.className = "gallery_img_wrapper";
//         imgWrapper.setAttribute("aria-label", `Voir '${this.item.title}'`);
        
//         const imgContent = document.createElement("div");
//         imgContent.className = "gallery_img_content";
        
//         const img = document.createElement("img");
//         img.src = `./assets/gallery/${this.id}/${this.item.image}`;
//         img.className = "illustration";
//         img.alt = this.item.title;

//         const imgTitle = document.createElement("h3");
//         imgTitle.className = "gallery_img_title";
//         imgTitle.textContent = this.item.title;

//         const likesWrapper = document.createElement("span");
//         likesWrapper.className = "gallery_img_likes_wrapper";

//         this.likesLogo.src = "../../assets/icons/heart-red.svg";

//         this.likesValue.textContent = this.item.likes;

//         likesWrapper.addEventListener("click", (e) => {
//             e.stopPropagation();
//             this.toggleLike();
//         })

//         likesWrapper.appendChild(this.likesValue);
//         likesWrapper.appendChild(this.likesLogo);

//         imgContent.appendChild(imgTitle);
//         imgContent.appendChild(likesWrapper);

//         imgWrapper.appendChild(img);
//         imgWrapper.appendChild(imgContent);

//         return [this.item.likes, this.likesLogo, likesWrapper, imgWrapper]
//     }

//     toggleLike() {
        
//         if (this.liked) {
//             this.likesLogo.src = "../../assets/icons/heart-red.svg";
//             this.item.likes--;
//             this.likesValue.textContent = this.item.likes;
//             this.updatedTotalLikes--;
//             console.log("1 " + this.updatedTotalLikes)
//         } else {
//             this.likesLogo.src = "../../assets/icons/heart-red-full.svg";
//             this.item.likes++;
//             this.likesValue.textContent = this.item.likes;
//             this.updatedTotalLikes = this.updatedTotalLikes + 1;
//             console.log("2 " + this.updatedTotalLikes)
//         }
//     }
// }

// class GalleryVideo {
//     constructor(item) {
//         this.item = item;
//         this.id = item.photographerId;
//         this.liked = false;
//         this.likesValue = document.createElement("p");
//         this.likesLogo = document.createElement("img");
//         this.likesLogo.src = "../../assets/icons/heart-red.svg";
//     }

//     createDOMElement() {
//         const imgWrapper = document.createElement("div");
//         imgWrapper.className = "gallery_img_wrapper";
//         imgWrapper.setAttribute("aria-label", `Voir '${this.item.title}'`);

//         const imgContent = document.createElement("div");
//         imgContent.className = "gallery_img_content";

//         const video = document.createElement("video");
//         video.src = `./assets/gallery/${this.id}/${this.item.video}`;
//         video.className = "illustration";
//         video.autoplay = true;

//         const imgTitle = document.createElement("h3");
//         imgTitle.className = "gallery_img_title";
//         imgTitle.textContent = this.item.title;

//         const likesWrapper = document.createElement("span");
//         likesWrapper.className = "gallery_img_likes_wrapper";

//         this.likesValue.textContent = this.item.likes;

//         likesWrapper.addEventListener("click", (e) => {
//             e.stopPropagation();
//             this.toggleLike();
//         })

//         likesWrapper.appendChild(this.likesValue);
//         likesWrapper.appendChild(this.likesLogo);

//         imgContent.appendChild(imgTitle);
//         imgContent.appendChild(likesWrapper);

//         imgWrapper.appendChild(video);
//         imgWrapper.appendChild(imgContent);

//         return [this.item.likes, this.likesLogo, likesWrapper, imgWrapper]
//     }

//     toggleLike() {
//         if (this.liked) {
//             this.liked = false;
//             this.likesLogo.src = "../../assets/icons/heart-red.svg";
//             this.item.likes--;
//             this.likesValue.textContent = this.item.likes;
//         } else {
//             this.liked = true;
//             this.likesLogo.src = "../../assets/icons/heart-red-full.svg";
//             this.item.likes++;
//             this.likesValue.textContent = this.item.likes;
//         }
//     }
// }

// export { GalleryMediaFactory, GalleryImage, GalleryVideo }


// const imgWrapper = document.createElement("div");
            // imgWrapper.className = "gallery_img_wrapper";
            // imgWrapper.setAttribute("aria-label", `Voir '${item.title}'`)
            // const imgContent = document.createElement("div");
            // imgContent.className = "gallery_img_content";
            // const imgTitle = document.createElement("h3");
            // imgTitle.className = "gallery_img_title";
            // const likesWrapper = document.createElement("span");
            // likesWrapper.className = "gallery_img_likes_wrapper";
            // const likesNumber = document.createElement("p");
            // const likesLogo = document.createElement("img");
            // likesLogo.src = "../../assets/icons/heart-red.svg";
            // let liked = false;

            // if (item.image) {
            //     const img = document.createElement("img");
            //     img.src = `./assets/gallery/${id}/${item.image}`;
            //     img.className = "illustration";
            //     img.alt = item.title;
            //     imgWrapper.appendChild(img);
            //     imgTitle.textContent = item.title;
            //     likesNumber.textContent = item.likes;
            //     likesWrapper.appendChild(likesNumber);
            //     likesWrapper.appendChild(likesLogo);
            //     imgContent.appendChild(imgTitle);
            //     imgContent.appendChild(likesWrapper);
            //     imgWrapper.appendChild(imgContent);
            //     grid.appendChild(imgWrapper);
            // }

            // if (item.video) {
            //     const video = document.createElement("video");
            //     video.src = `./assets/gallery/${id}/${item.video}`;
            //     video.className = "illustration";
            //     video.autoplay = true;
            //     imgWrapper.appendChild(video);
            //     imgTitle.textContent = item.title;
            //     likesNumber.textContent = item.likes;
            //     likesWrapper.appendChild(likesNumber);
            //     likesWrapper.appendChild(likesLogo);
            //     imgContent.appendChild(imgTitle);
            //     imgContent.appendChild(likesWrapper);
            //     imgWrapper.appendChild(imgContent);
            //     grid.appendChild(imgWrapper);
            // }

            // // Event pour ouvrir la lightbox
            // imgWrapper.addEventListener('click', () => {
            //     currentIndex = index;
            //     handleMediaClick(item, currentIndex);
            // });

            // // Event pour ajouter/supprimer un j'aime
            // likesLogo.addEventListener("click", (e) => {
            //     e.stopPropagation();
            //     if (liked) {
            //         liked = false;
            //         likesLogo.src = "../../assets/icons/heart-red.svg";
            //         item.likes--;
            //         updatedTotalLikes--;
            //     } else {
            //         liked = true;
            //         likesLogo.src = "../../assets/icons/heart-red-full.svg";
            //         item.likes++;
            //         updatedTotalLikes++;
            //     }
            //     likesNumber.textContent = item.likes;
            //     likesAmount.textContent = updatedTotalLikes;
            // });