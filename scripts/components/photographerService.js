// Appel des données depuis le JSON
export async function fetchPhotographers() {
    try {
        const response = await fetch("../../data/photographers.json");
        if (!response.ok) {
            throw new Error(`Erreur de chargement du JSON : ${response.statusText}`);
        }
        const data = await response.json();
        return data.photographers;
    } catch (error) {
        console.error(`Une erreur s'est produite : ${error}`);
        return [];
    }
}
