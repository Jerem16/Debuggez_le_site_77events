import { fireEvent, render, screen } from "@testing-library/react";
import Page from ".";

describe("Lorsque le formulaire est créé", () => {
    it("affiche une liste de champs", async () => {
        render(<Page />);
        await screen.findByText("Email");
        await screen.findByText("Nom");
        await screen.findByText("Prénom");
        await screen.findByText("Personne / Entreprise");
    });

    describe("et qu'un clic est déclenché sur le bouton d'envoi", () => {
        it("affiche le message de réussite", async () => {
            render(<Page />);

            const nomInput = screen.queryByTestId("field-testid-nom");
            const prenomInput = screen.queryByTestId("field-testid-prenom");
            const emailInput = screen.queryByTestId("field-testid-email");
            const messageTextarea = screen.queryByTestId(
                "field-testid-message"
            );
            const inputButton = document.querySelector(
                "#contact .Select > button"
            );

            fireEvent.change(nomInput, { target: { value: "John" } });
            fireEvent.change(prenomInput, { target: { value: "Doe" } });
            fireEvent.change(emailInput, {
                target: { value: "john.doe@example.com" },
            });
            fireEvent.click(inputButton);

            await screen.findByText("Personne");

            fireEvent.click(screen.getByText("Personne"));
            fireEvent.change(messageTextarea, {
                target: { value: "Hello, this is a test message." },
            });

            fireEvent(
                await screen.findByText("Envoyer"),
                new MouseEvent("click", {
                    cancelable: true,
                    bubbles: true,
                })
            );
            await screen.findByText("En cours");
            await new Promise((resolve) => {
                setTimeout(() => {
                    resolve();
                }, 1000);
            });
            await screen.findByText("Message envoyé !");
        });
    });
});

describe("Lorsqu'une page est créée alors elle :", () => {
    it("affiche les éléments EventCard", () => {
        render(<Page />);

        const EventCardImages = screen.queryAllByTestId("card-image-testid");
        const image = EventCardImages[0];

        expect(image).toBeInTheDocument();
    });

    it("affiche la liste PeopleCard", () => {
        render(<Page />);

        const PeopleCardImages = screen.queryAllByTestId(
            "peopleCard-image-testid"
        );
        const image = PeopleCardImages[0];

        expect(image).toBeInTheDocument();
    });

    it("affiche le footer", () => {
        render(<Page />);

        const footer = screen.getByRole("contentinfo");
        expect(footer).toBeInTheDocument();
    });
});