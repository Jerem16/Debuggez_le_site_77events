import { fireEvent, render, screen } from "@testing-library/react";
import Form from "./index";

describe("et qu'un clic est déclenché sur le bouton de soumission", () => {
    it("Scénario 4-5-6-9: Le formulaire est prêt pour être rempli, les champs non remplis affichent un message d’erreur. les champs sont remplis l'action de 'onSuccess' est appelée, après un court délai, tous les champs de formulaires sont réinitialisés", async () => {
        const onSuccess = jest.fn();
        render(<Form onSuccess={onSuccess} />);

        const nomInput = screen.queryByTestId("field-testid-nom");
        const prenomInput = screen.queryByTestId("field-testid-prenom");
        const emailInput = screen.queryByTestId("field-testid-email");
        const messageTextarea = screen.queryByTestId("field-testid-message");
        const selectButton = document.querySelector(".Select > button");

        // Scénario 4 Les éléments "Email", "Nom", "Prénom", et "Personne / Entreprise" et "Message" sont correctement affichés
        expect(nomInput).toBeInTheDocument();
        expect(prenomInput).toBeInTheDocument();
        expect(emailInput).toBeInTheDocument();
        expect(selectButton).toBeInTheDocument();
        expect(messageTextarea).toBeInTheDocument();

        // Scénario 5 Les champs non remplis affichent un message d’erreur.
        fireEvent(
            await screen.findByTestId("button-test-id"),
            new MouseEvent("click", {
                cancelable: true,
                bubbles: true,
            })
        );

        const errorMessage = screen.getAllByText("Ce champ est obligatoire");
        expect(errorMessage[0]).toBeInTheDocument();
        expect(errorMessage[1]).toBeInTheDocument();
        expect(errorMessage[2]).toBeInTheDocument();
        expect(errorMessage[3]).toBeInTheDocument();
        expect(errorMessage[4]).toBeInTheDocument();

        // Scénario 6: Les champs "Nom", "Prénom", "Email", "Message" sont remplis et "Personne ou Entreprise" est sélectionné. Le bouton d'envoi est cliqué : le message "Message envoyé !" s'affiche après un court délai

        fireEvent.change(nomInput, { target: { value: "John" } });
        fireEvent.change(prenomInput, { target: { value: "Doe" } });
        fireEvent.change(emailInput, {
            target: { value: "john.doe@example.com" },
        });
        fireEvent.change(messageTextarea, {
            target: { value: "Hello, this is a test message." },
        });

        // Click sur le bouton du Select => affichage des options
        fireEvent.click(selectButton);
        // Attendre que les options soient affichées
        await screen.findByText("Personne");
        // Sélection de l'option "Personne"
        fireEvent.click(screen.getByText("Personne"));

        // Click sur le bouton de validation pour soumettre du formulaire
        fireEvent(
            await screen.findByTestId("button-test-id"),
            new MouseEvent("click", {
                cancelable: true,
                bubbles: true,
            })
        );
        // Le bouton de validation affiche "En cours"
        await screen.findByText("En cours");
        await new Promise((resolve) => {
            setTimeout(() => {
                resolve();
            }, 1000);
        });
        // l'action de 'onSuccess' est appelé, le message à été envoyer
        expect(onSuccess).toHaveBeenCalled();

        // Scénario 9: Le message est envoyé, après un court délai, les champs de formulaires sont réinitialisés

        await screen.findByText("Envoyer");
        await new Promise((resolve) => {
            setTimeout(() => {
                resolve();
            }, 1500);
        });

        expect(nomInput.value).toBe("");
        expect(nomInput.placeholder).toBe("Entrez votre nom");
        expect(prenomInput.value).toBe("");
        expect(prenomInput.placeholder).toBe("Entrez votre prénom");
        expect(emailInput.value).toBe("");
        expect(emailInput.placeholder).toBe("Entrez votre email");
    });
});
