import { render, screen } from "@testing-library/react";
import Page from ".";
import { useData } from "../../contexts/DataContext";

jest.mock("../../contexts/DataContext", () => ({
    useData: jest.fn(),
}));

describe("When a page is created", () => {
    it("affiche une carte d'événement avec le dernier événement", async () => {
        const simulatedLast = {
            id: 4,
            type: "conférence",
            date: "2022-08-29T20:28:45.744Z",
            title: "Conférence #productCON",
            cover: "/images/headway-F2KRf_QfCqw-unsplash.png",
        };

        // Simulez le comportement de useData pour résoudre last
        useData.mockReturnValue({ last: simulatedLast });

        // Rendu du composant Page
        render(<Page />);

        // Vérification si l'élément EventCard est présent dans le rendu
        const eventCardSmall = await screen.findByTestId("last-event-card");
        expect(eventCardSmall).toBeInTheDocument();
    });
});
