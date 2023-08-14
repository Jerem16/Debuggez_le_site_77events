import { fireEvent, render, screen } from "@testing-library/react";
import Page from ".";

describe("When Form is created", () => {
    it("a list of fields card is displayed", async () => {
        render(<Page />);
        await screen.findByText("Email");
        await screen.findByText("Nom");
        await screen.findByText("Prénom");
        await screen.findByText("Personel / Entreprise");
    });

    describe("and a click is triggered on the submit button", () => {
        it("the success message is displayed", async () => {
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

            // Cliquer sur le bouton du Select pour afficher les options
            fireEvent.click(inputButton);

            // Attendre que les options soient affichées
            await screen.findByText("Personel");

            // Sélectionner l'option "Personel"
            fireEvent.click(screen.getByText("Personel"));

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

describe("When a page is created", () => {
    it("displays the EventCard elements", () => {
        render(<Page />);

        const EventCardImages = screen.queryAllByTestId("card-image-testid");
        const image = EventCardImages[0];

        expect(image).toBeInTheDocument();
    });

    it("a list a people is displayed", () => {
        render(<Page />);

        const PeopleCardImages = screen.queryAllByTestId(
            "peopleCard-image-testid"
        );
        const image = PeopleCardImages[0];

        expect(image).toBeInTheDocument();
    });

    it("a footer is displayed", () => {
        render(<Page />);

        const footer = screen.getByRole("contentinfo");
        expect(footer).toBeInTheDocument();
    });
});
