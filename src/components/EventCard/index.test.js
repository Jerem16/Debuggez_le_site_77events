import { render, screen } from "@testing-library/react";
import EventCard from "./index";

describe("Lorsqu'une carte d'événement est créée", () => {
    it("une image est affichée avec une valeur alt", () => {
        render(
            <EventCard
                imageSrc="http://src-image"
                imageAlt="texte-alt-image"
                date={new Date("2022-04-01")}
                title="événement de test"
                label="étiquette de test"
            />
        );
        const elementImage = screen.getByTestId("card-image-testid");
        expect(elementImage).toBeInTheDocument();
        expect(elementImage.alt).toEqual("texte-alt-image");
    });

    it("un titre, une étiquette et un mois sont affichés", () => {
        render(
            <EventCard
                imageSrc="http://src-image"
                imageAlt="texte-alt-image"
                title="événement de test"
                label="étiquette de test"
                date={new Date("2022-04-01")}
            />
        );
        const elementTitre = screen.getByText(/événement de test/);
        const elementMois = screen.getByText(/avril/);
        const elementEtiquette = screen.getByText(/étiquette de test/);
        expect(elementTitre).toBeInTheDocument();
        expect(elementEtiquette).toBeInTheDocument();
        expect(elementMois).toBeInTheDocument();
    });

    describe("avec des propriétés small", () => {
        it("un modificateur small est ajouté", () => {
            render(
                <EventCard
                    imageSrc="http://src-image"
                    imageAlt="texte-alt-image"
                    title="événement de test"
                    label="étiquette de test"
                    date={new Date("2022-04-01")}
                    small
                />
            );
            const elementCarte = screen.getByTestId("card-testid");
            expect(elementCarte.className.includes("EventCard--small")).toEqual(
                true
            );
        });
    });
});
