import { render, screen } from "@testing-library/react";
import PeopleCard from "./index";

describe("Lorsqu'une carte de personne est créée", () => {
    it("une image est affichée avec une valeur 'alt'", () => {
        render(
            <PeopleCard
                imageSrc="http://src-image"
                imageAlt="texte-alt-de-l-image"
                name="nom de test"
                position="poste de test"
            />
        );
        const elementImage = screen.getByTestId("peopleCard-image-testid");
        expect(elementImage).toBeInTheDocument();
        expect(elementImage.alt).toEqual("texte-alt-de-l-image");
    });
    it("un titre et un poste sont affichés", () => {
        render(
            <PeopleCard
                imageSrc="http://src-image"
                imageAlt="texte-alt-de-l-image"
                name="nom de test"
                position="poste de test"
            />
        );
        const elementNom = screen.getByText(/nom de test/);
        const elementPoste = screen.getByText(/poste de test/);
        expect(elementNom).toBeInTheDocument();
        expect(elementPoste).toBeInTheDocument();
    });
});
