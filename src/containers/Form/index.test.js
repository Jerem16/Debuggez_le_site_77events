import { fireEvent, render, screen } from "@testing-library/react";
import Form from "./index";

describe("Scénario 4: Lorsque le formulaire est créé", () => {
    it("une liste de champs d'événement est affichée", async () => {
        render(<Form />);
        await screen.findByText("Email");
        await screen.findByText("Nom");
        await screen.findByText("Prénom");
        await screen.findByText("Personne / Entreprise");
    });
    describe("Test d'intégration du formulaire", () => {
        it("soumet le formulaire avec succès", async () => {
            const onSuccess = jest.fn();
            render(<Form onSuccess={onSuccess} />);

            // Remplir les champs du formulaire
            const nomInput = screen.queryByTestId("field-testid-nom");
            const prenomInput = screen.queryByTestId("field-testid-prenom");
            const emailInput = screen.queryByTestId("field-testid-email");
            const messageTextarea = screen.queryByTestId(
                "field-testid-message"
            );
            const inputButton = document.querySelector(".Select > button");

            fireEvent.change(nomInput, { target: { value: "John" } });
            fireEvent.change(prenomInput, { target: { value: "Doe" } });
            fireEvent.change(emailInput, {
                target: { value: "john.doe@example.com" },
            });

            // Cliquer sur le bouton du Select pour afficher les options
            fireEvent.click(screen.getByTestId("collapse-button-testid-type"));

            // Attendre que les options soient affichées
            await screen.findByText("Personne");

            // Sélectionner l'option "Personne"
            fireEvent.click(screen.getByText("Personne"));

            fireEvent.change(messageTextarea, {
                target: { value: "Hello, this is a test message." },
            });

            // Cliquer sur le bouton de soumission
            fireEvent(
                await screen.findByTestId("button-test-id"),
                new MouseEvent("click", {
                    cancelable: true,
                    bubbles: true,
                })
            );

            // Attendre que la fonction onSuccess soit appelée

            // Attendre que l'état de "En cours" change à "Envoyer"
            await screen.findByText("En cours");
            await new Promise((resolve) => {
                setTimeout(() => {
                    resolve();
                }, 2600);
            });

            await screen.findByText("Envoyer");

            // Vérifier que le formulaire est réinitialisé
            expect(nomInput.value).toBe("");
            expect(nomInput.placeholder).toBe("Entrez votre nom");
            expect(prenomInput.value).toBe("");
            expect(prenomInput.placeholder).toBe("Entrez votre prénom");
            expect(emailInput.value).toBe("");
            expect(emailInput.placeholder).toBe("Entrez votre email");
        });
    });
});
