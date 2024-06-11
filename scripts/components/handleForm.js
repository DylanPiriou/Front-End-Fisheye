export const handleForm = (photographerData) => {
	const contactModalTitle = document.querySelector(".contact_modal_title");
	contactModalTitle.innerHTML = `Contactez-moi<br>${photographerData[0].name}`;
	const form = document.getElementById("modal_form");
	const contactModal = document.getElementById("contact_modal");
	const contactButton = document.querySelector(".contact_button");
	const closeContactButton = document.querySelector(".contact-modal_close");
	let focusable = document
		.querySelector("#contact_modal")
		.querySelectorAll("input,button,select,textarea, [tabindex");
	const lastFocusableElement = focusable[focusable.length - 1];

	lastFocusableElement.addEventListener("keydown", (e) => {
		if (e.key === "Tab" && !e.shiftKey) {
			e.preventDefault();
			focusable[0].focus();
		}
	});

	focusable.forEach((element, index) => {
		element.setAttribute("tabindex", index + 1);
	});

	focusable[0].addEventListener("keydown", (e) => {
		if (e.key === "Tab" && e.shiftKey) {
			e.preventDefault();
			lastFocusableElement.focus();
		}
	});
	
	contactButton.addEventListener("click", () => {
		contactModal.style.display = "block";
		focusable[0].focus();
	});

	closeContactButton.addEventListener("click", () => {
		contactModal.style.display = "none";
	});

	closeContactButton.addEventListener("keydown", (e) => {
		if (e.key === "Enter") {
			contactModal.style.display = "none";
		}
	});

	form.addEventListener("submit", (e) => {
		e.preventDefault();
		const firstName = document.getElementById("prenom").value;
		const lastName = document.getElementById("nom").value;
		const email = document.getElementById("email").value;
		const message = document.getElementById("message").value;
		console.log("---- Formulaire envoyé avec succès ----");
		console.log(`Prénom : ${firstName}`);
		console.log(`Nom : ${lastName}`);
		console.log(`Email : ${email}`);
		console.log(`Message : ${message}`);
	});
	
};

