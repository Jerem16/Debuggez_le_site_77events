import { fireEvent, render, screen } from "@testing-library/react";
import Field, { FIELD_TYPES } from "./index";

describe("Lorsqu'un champ est créé", () => {
    it("un nom est défini sur le champ", () => {
        render(<Field name="nom-du-champ" />);
        const elementChamp = screen.getByTestId("field-testid-nom-du-champ");
        expect(elementChamp).toBeInTheDocument();
        expect(elementChamp.name).toEqual("nom-du-champ");
    });

    it("un texte de substitution est défini sur le champ", () => {
        render(<Field placeholder="texte-de-substitution" name="test" />);
        const elementChamp = screen.getByTestId("field-testid-test");
        expect(elementChamp.placeholder).toEqual("texte-de-substitution");
    });

    it("une étiquette est définie avec le champ", () => {
        render(
            <Field
                placeholder="texte-de-substitution"
                label="etiquette_de_champ"
                name="test"
            />
        );
        const elementEtiquette = screen.getByText(/etiquette_de_champ/);
        expect(elementEtiquette).toBeInTheDocument();
    });

    describe("et sa valeur est modifiée", () => {
        it("une fonction onChange est exécutée", () => {
            const onChange = jest.fn();
            render(<Field onChange={onChange} name="test" />);
            const elementChamp = screen.getByTestId("field-testid-test");

            fireEvent.change(elementChamp, {
                target: { value: "nouvelle valeur" },
            });

            expect(onChange).toHaveBeenCalled();
        });
    });

    describe("et son type est défini sur FIELD_TYPES.INPUT_TEXT", () => {
        it("un champ de saisie de texte est rendu", () => {
            window.console.error = jest.fn().mockImplementation(() => null); // désactiver l'avertissement de propTypes
            render(<Field type={FIELD_TYPES.INPUT_TEXT} name="test" />);
            const elementChamp = screen.getByTestId("field-testid-test");
            expect(elementChamp.type).toEqual("text");
        });
    });

    describe("et son type est défini sur FIELD_TYPES.TEXTAREA", () => {
        it("un champ de texte est rendu", () => {
            window.console.error = jest.fn().mockImplementation(() => null); // désactiver l'avertissement de propTypes
            render(<Field type={FIELD_TYPES.TEXTAREA} name="test" />);
            const elementChamp = screen.getByTestId("field-testid-test");
            expect(elementChamp.tagName).toEqual("TEXTAREA");
        });
    });

    describe("et son type est défini sur une valeur incorrecte", () => {
        it("un champ de saisie de texte est rendu", () => {
            window.console.error = jest.fn().mockImplementation(() => null); // désactiver l'avertissement de propTypes
            render(<Field type="mauvais-type" name="test" />);
            const elementChamp = screen.getByTestId("test");
            expect(elementChamp.type).toEqual("text");
        });
    });
});
