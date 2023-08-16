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
describe("Fonction getMonth", () => {
    it("devrait retourner le mois correct en français", () => {
        const february = new Date("2022-02-20T20:28:45.744Z");
        const september = new Date("2022-09-29T20:28:45.744Z");
        const december = new Date("2022-12-31T20:28:45.744Z");

        expect(getMonth(february)).toBe("février");
        expect(getMonth(september)).toBe("septembre");
        expect(getMonth(december)).toBe("décembre");
    });
});
describe("Composant Slider", () => {
    it("devrait afficher les slides triées par date, du plus ancien au plus récent", async () => {
        window.console.error = jest.fn();
        api.loadData = jest.fn().mockReturnValue(mockEventData);

        render(
            <DataProvider>
                <Slider />
            </DataProvider>
        );

        const janvier = await screen.findByTestId("0");
        expect(janvier).toHaveTextContent("janvier");
        const mars = await screen.findByTestId("1");
        expect(mars).toHaveTextContent("mars");
        const mai = await screen.findByTestId("2");
        expect(mai).toHaveTextContent("mai");
    });
});
