import { render, screen } from "@testing-library/react";
import ServiceCard from "./index";

describe("Lorsqu'une carte de service est créée", () => {
    it("une image est affichée avec une valeur 'alt'", () => {
        render(
            <ServiceCard
                imageSrc="http://src-image"
                imageAlt="texte-alt-de-l-image"
            >
                {" "}
            </ServiceCard>
        );
        const elementImage = screen.getByTestId("card-image-testid");
        expect(elementImage).toBeInTheDocument();
        expect(elementImage.alt).toEqual("texte-alt-de-l-image");
    });
    it("un contenu est affiché", () => {
        render(
            <ServiceCard
                imageSrc="http://src-image"
                imageAlt="texte-alt-de-l-image"
            >
                Voici le contenu de la carte
            </ServiceCard>
        );
        const elementContenu = screen.getByText(/Voici le contenu de la carte/);
        expect(elementContenu).toBeInTheDocument();
    });
});
