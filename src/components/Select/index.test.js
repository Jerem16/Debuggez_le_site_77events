import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import Select from "./index";

describe("Lorsqu'un sélecteur est créé", () => {
    it("une liste de choix est affichée", () => {
        render(<Select selection={["valeur1", "valeur2"]} />);
        const elementSelect = screen.getByTestId("select-testid");
        const selectParDefaut = screen.getByText("Toutes");
        expect(elementSelect).toBeInTheDocument();
        expect(selectParDefaut).toBeInTheDocument();
    });

    it("un bouton d'action de réduction est affiché", () => {
        render(<Select selection={["valeur1", "valeur2"]} />);
        const elementBoutonReduction = screen.getByTestId(
            "collapse-button-testid"
        );
        expect(elementBoutonReduction).toBeInTheDocument();
    });

    describe("avec une étiquette", () => {
        it("une étiquette est affichée", () => {
            render(
                <Select label="étiquette" selection={["valeur1", "valeur2"]} />
            );
            const etiquetteParDefaut = screen.getByText("étiquette");
            expect(etiquetteParDefaut).toBeInTheDocument();
        });
    });

    describe("et un clic est déclenché sur le bouton de réduction", () => {
        it("une liste de valeurs est affichée", () => {
            render(<Select selection={["valeur1", "valeur2"]} />);
            const elementBoutonReduction = screen.getByTestId(
                "collapse-button-testid"
            );
            fireEvent(
                elementBoutonReduction,
                new MouseEvent("click", {
                    bubbles: true,
                    cancelable: true,
                })
            );
            const choix1 = screen.getByText("valeur1");
            const choix2 = screen.getByText("valeur2");
            expect(choix1).toBeInTheDocument();
            expect(choix2).toBeInTheDocument();
        });

        describe("et un clic est déclenché sur un élément de choix", () => {
            it("un rappel onChange est appelé", () => {
                const onChange = jest.fn();
                render(
                    <Select
                        selection={["valeur1", "valeur2"]}
                        onChange={onChange}
                    />
                );
                const elementBoutonReduction = screen.getByTestId(
                    "collapse-button-testid"
                );
                fireEvent(
                    elementBoutonReduction,
                    new MouseEvent("click", {
                        bubbles: true,
                        cancelable: true,
                    })
                );
                const choix1 = screen.getByText("valeur1");
                fireEvent(
                    choix1,
                    new MouseEvent("click", {
                        bubbles: true,
                        cancelable: true,
                    })
                );
                expect(onChange.mock.calls.length).toBeGreaterThan(0);

                fireEvent(
                    elementBoutonReduction,
                    new MouseEvent("click", {
                        bubbles: true,
                        cancelable: true,
                    })
                );

                const choixTous = screen.getByText("Toutes");
                fireEvent(
                    choixTous,
                    new MouseEvent("click", {
                        bubbles: true,
                        cancelable: true,
                    })
                );
                expect(onChange.mock.calls.length).toBeGreaterThan(1);
            });
        });
    });
});
 