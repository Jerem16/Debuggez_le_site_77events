import { render, screen, fireEvent } from "@testing-library/react";
import Page from ".";
import { api, DataProvider } from "../../contexts/DataContext";

const data = {
    events: [
        {
            id: 1,
            type: "conférence",
            date: "2022-04-29T20:28:45.744Z",
            title: "User&product MixUsers",
            cover: "/images/alexandre-pellaes-6vAjp0pscX0-unsplash.png",
            description: "Présentation des nouveaux usages UX.",
            nb_guesses: 900,
            periode: "14-15-16 Avril",
        },
        {
            id: 2,
            type: "expérience digitale",
            date: "2022-01-29T20:28:45.744Z",
            title: "#DigitonPARIS",
            cover: "/images/charlesdeluvio-wn7dOzUh3Rs-unsplash.png",
            description:
                "Présentation des outils analytics aux professionnels du secteur ",
            nb_guesses: 1300,
            periode: "24-25-26 Février",
        },
    ],
};

describe("Lorsqu'une page est créée", () => {
    it("Scénario 3: L'utilisateur sélectionne une catégorie spécifique dans le filtre, Les réalisations affichées doivent être filtrées en fonction de la catégorie sélectionné", async () => {
        api.loadData = jest.fn().mockReturnValue(data);

        render(
            <DataProvider>
                <Page />
            </DataProvider>
        );

        const labelConference = await screen.findByTestId(
            "label-testid-conférence"
        );
        expect(labelConference).toBeInTheDocument();

        const labelExpérienceDigitale = await screen.findByTestId(
            "label-testid-expérience digitale"
        );
        expect(labelExpérienceDigitale).toBeInTheDocument();

        const buttons = await screen.findByTestId(
            "collapse-button-testid-select"
        );
        fireEvent.click(buttons);

        const selectConfCat = await screen.findByTestId(
            "input-li-testid-conférence"
        );
        expect(selectConfCat).toBeInTheDocument();

        fireEvent.click(selectConfCat);

        expect(labelConference).toBeInTheDocument();
        expect(labelExpérienceDigitale).not.toBeInTheDocument();
    });
    it("Scénario 8: EventCard affiche une carte d'événement avec le dernier événement", async () => {
        api.loadData = jest.fn().mockReturnValue(data);

        render(
            <DataProvider>
                <Page />
            </DataProvider>
        );

        const eventCardSmall = await screen.findByTestId("last-event-card");
        expect(eventCardSmall).toBeInTheDocument();
    });
});
