export function createGallery(id, filteredMedia) {
    const grid = document.querySelector(".gallery_grid");
    
    // Parcourir chaque élément filtré
    filteredMedia.forEach(item => {
        // Créer une balise <img> pour chaque élément image
        if (item.image) {
            const img = document.createElement("img");
            img.src = `./assets/gallery/${id}/${item.image}`;
            img.alt = item.title;
            img.setAttribute('aria-label', `voir l'image '${item.title}'`)
            grid.appendChild(img);
        }

        // Créer une balise <video> pour chaque élément vidéo
        if (item.video) {
            const video = document.createElement("video");
            video.src = `./assets/gallery/${id}/${item.video}`;
            video.setAttribute('aria-label', `voir la vidéo '${item.title}'`)
            video.controls = true; // Ajouter des contrôles pour la vidéo
            grid.appendChild(video);
        }
    });
}