export const handleInfosPhotographerData = (photographerData) => {
    const title = document.querySelector(".photographer_data h1");
		title.textContent = photographerData[0].name;
		const location = document.querySelector(".photographer_data span");
		location.textContent =
			photographerData[0].city + ", " + photographerData[0].country;
		const tagline = document.querySelector(".photographer_data p");
		tagline.textContent = photographerData[0].tagline;
		const img = document.querySelector(".photographer_header img");
		img.src = `./assets/photographers/${photographerData[0].portrait}`;
		img.alt = photographerData[0].name;
}