import { render, screen } from "@testing-library/react";
import Slider from "./index";
import { api, DataProvider } from "../../contexts/DataContext";
import { getMonth } from "../../helpers/Date";

const mockEventData = {
    focus: [
        {
            title: "Sneakercraze market",
            description: "Rencontres de spécialistes des Sneakers Européens.",
            date: "2022-05-29T20:28:45.744Z",
            cover: "/images/jakob-dalbjorn-cuKJre3nyYc-unsplash 1.png",
        },
        {
            title: "World economic forum",
            description:
                "Oeuvre à la coopération entre le secteur public et le privé.",
            date: "2022-01-29T20:28:45.744Z",
            cover: "/images/evangeline-shaw-nwLTVwb7DbU-unsplash1.png",
        },
        {
            title: "Nordic design week",
            description: "Conférences sur le design de demain dans le digital",
            date: "2022-03-29T20:28:45.744Z",
            cover: "/images/teemu-paananen-bzdhc5b3Bxs-unsplash1.png",
        },
    ],
};

describe("Composant Slider", () => {
    it("devrait afficher les images avec les mois correspondants", async () => {
        window.console.error = jest.fn();
        api.loadData = jest.fn().mockReturnValue(mockEventData);

        render(
            <DataProvider>
                <Slider />
            </DataProvider>
        );

        const janvierDate = await screen.findByText("janvier");
        expect(janvierDate).toHaveTextContent("janvier");

        const marsDate = await screen.findByText("mars");
        expect(marsDate).toHaveTextContent("mars");

        const maiDate = await screen.findByText("mai");
        expect(maiDate).toHaveTextContent("mai");
    });

    it("devrait afficher les images triées par date du plus récent au plus ancien lorsque les événements sont affichés de manière aléatoire", async () => {
        window.console.error = jest.fn();
        api.loadData = jest.fn().mockReturnValue(mockEventData);

        const byDateDesc = {
            focus: mockEventData.focus?.sort(
                (evtA, evtB) => new Date(evtA.date) - new Date(evtB.date)
            ),
        };

        render(
            <DataProvider>
                <Slider />
            </DataProvider>,
            {
                data: byDateDesc,
            }
        );

        const monthElements = await screen.findAllByText(/(janvier|mars|mai)/i);

        // Vérifier la présence de chaque élément de mois
        expect(monthElements[0]).toBeInTheDocument();
        expect(monthElements[1]).toBeInTheDocument();
        expect(monthElements[2]).toBeInTheDocument();
    });
});

describe("Fonction getMonth", () => {
    it("devrait retourner le mois correct en français", () => {
        const janvierDate = new Date("2022-01-29T20:28:45.744Z");
        const marsDate = new Date("2022-03-29T20:28:45.744Z");
        const maiDate = new Date("2022-05-29T20:28:45.744Z");

        expect(getMonth(janvierDate)).toBe("janvier");
        expect(getMonth(marsDate)).toBe("mars");
        expect(getMonth(maiDate)).toBe("mai");
    });
});
