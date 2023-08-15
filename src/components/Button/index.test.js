import { fireEvent, render, screen } from "@testing-library/react";
import Button, { BUTTON_TYPES } from "./index";

describe("Lorsqu'un bouton est créé", () => {
    it("le bouton doit inclure un titre", () => {
        render(<Button title="mon-bouton" type={BUTTON_TYPES.DEFAULT} />);
        const elementBouton = screen.getByTitle("mon-bouton");
        expect(elementBouton).toBeInTheDocument();
    });

    it("le bouton doit afficher un libellé", () => {
        render(<Button>libellé</Button>);
        const elementBouton = screen.getByText(/libellé/);
        expect(elementBouton).toBeInTheDocument();
    });

    describe("et qu'il est cliqué", () => {
        it("un événement onClick est exécuté", () => {
            const onClick = jest.fn();
            render(<Button onClick={onClick} />);
            const elementBouton = screen.getByTestId("button-test-id");

            fireEvent.click(elementBouton); // Simule un clic sur le bouton

            expect(onClick).toHaveBeenCalled();
        });
    });

    describe("et que le type sélectionné est soumission", () => {
        it("un input de soumission est créé", () => {
            render(<Button type={BUTTON_TYPES.SUBMIT}>libellé</Button>);
            const elementBouton = screen.getByTestId("button-test-id");
            expect(elementBouton.type).toEqual("submit");
        });
    });
});
