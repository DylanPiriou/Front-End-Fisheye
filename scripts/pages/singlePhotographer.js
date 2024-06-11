import { handleForm } from "../components/handleForm.js";
import { handleInfosPhotographerData } from "../components/handleInfosPhotographerData.js";
import { createGallery } from "../components/photographerGallery.js";
import { getPhotographerData } from "../components/photographerService.js";

// Executer la fonction après le chargement du DOM
document.addEventListener("DOMContentLoaded", async () => {
	const data = await getPhotographerData();

	if (data) {
		// Récupération de l'id dans l'URL + filter
		const { photographers, media } = data;
		const urlParams = new URLSearchParams(window.location.search);
		const urlID = urlParams.get("id");
		const photographerData = photographers.filter((x) => x.id == urlID);

		if (photographerData) {
			// Hydratation infos du photographe
			handleInfosPhotographerData(photographerData);
			// Gestion de la modale de contact
			handleForm(photographerData);
			// Création de la gallerie
			createGallery(photographerData, media);
		}
	}
});
