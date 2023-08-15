import { fireEvent, render, screen } from "@testing-library/react";
import { api, DataProvider } from "../../contexts/DataContext";
import Events from "./index";

const data = {
    events: [
        {
            id: 1,
            type: "soirée entreprise",
            date: "2022-04-29T20:28:45.744Z",
            title: "Conférence #productCON",
            cover: "/images/stem-list-EVgsAbL51Rk-unsplash.png",
            description:
                "Présentation des outils analytics aux professionnels du secteur",
            nb_guesses: 1300,
            periode: "24-25-26 Février",
            prestations: [
                "1 espace d’exposition",
                "1 scéne principale",
                "2 espaces de restaurations",
                "1 site web dédié",
            ],
        },

        {
            id: 2,
            type: "forum",
            date: "2022-04-29T20:28:45.744Z",
            title: "Forum #productCON",
            cover: "/images/stem-list-EVgsAbL51Rk-unsplash.png",
            description:
                "Présentation des outils analytics aux professionnels du secteur",
            nb_guesses: 1300,
            periode: "24-25-26 Février",
            prestations: ["1 espace d’exposition", "1 scéne principale"],
        },
    ],
};

describe("Lorsque Events est créé", () => {
    it("une liste de cartes d'événements est affichée", async () => {
        api.loadData = jest.fn().mockReturnValue(data);
        render(
            <DataProvider>
                <Events />
            </DataProvider>
        );
        await screen.findByText("avril");
    });
    describe("et une erreur est survenue", () => {
        it("un message d'erreur est affiché", async () => {
            api.loadData = jest.fn().mockRejectedValue();
            render(
                <DataProvider>
                    <Events />
                </DataProvider>
            );
            expect(
                await screen.findByText("Une erreur est survenue")
            ).toBeInTheDocument();
        });
    });
    describe("et nous sélectionnons une catégorie", () => {
        it.only("une liste filtrée est affichée", async () => {
            api.loadData = jest.fn().mockReturnValue(data);
            render(
                <DataProvider>
                    <Events />
                </DataProvider>
            );
            await screen.findByText("Forum #productCON");
            fireEvent(
                await screen.findByTestId("collapse-button-testid-select"),
                new MouseEvent("click", {
                    cancelable: true,
                    bubbles: true,
                })
            );
            fireEvent(
                (await screen.findAllByText("soirée entreprise"))[0],
                new MouseEvent("click", {
                    cancelable: true,
                    bubbles: true,
                })
            );

            await screen.findByText("Conférence #productCON");
            expect(
                screen.queryByText("Forum #productCON")
            ).not.toBeInTheDocument();
        });
    });

    describe("et nous cliquons sur un événement", () => {
        it("les détails de l'événement sont affichés", async () => {
            api.loadData = jest.fn().mockReturnValue(data);
            render(
                <DataProvider>
                    <Events />
                </DataProvider>
            );

            fireEvent(
                await screen.findByText("Conférence #productCON"),
                new MouseEvent("click", {
                    cancelable: true,
                    bubbles: true,
                })
            );

            await screen.findByText("24-25-26 Février");
            await screen.findByText("1 site web dédié");
        });
    });
});
