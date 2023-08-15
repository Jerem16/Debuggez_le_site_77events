/* eslint-disable react/self-closing-comp */
/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/control-has-associated-label */
import { fireEvent, render, screen } from "@testing-library/react";
import Modal from "./index";

describe("Lorsque les données de la modal sont créées", () => {
    it("un contenu de modal est affiché", () => {
        render(
            <Modal opened Content={<div>modal content</div>}>
                {() => null}
            </Modal>
        );
        expect(screen.getByText("modal content")).toBeInTheDocument();
    });
    describe("et qu'un clic est déclenché pour afficher la modal", () => {
        it("le contenu de la modal est affiché", async () => {
            render(
                <Modal Content={<div>modal content</div>}>
                    {() => <button data-testid="open-modal"></button>}
                </Modal>
            );
            expect(screen.queryByText("modal content")).not.toBeInTheDocument();
            fireEvent(
                screen.getByTestId("open-modal"),
                new MouseEvent("click", {
                    cancelable: true,
                    bubbles: true,
                })
            );
        });
    });

    describe("et qu'un clic est déclenché sur le bouton de fermeture de la modal", () => {
        it("le contenu de la modal est masqué", async () => {
            render(
                <Modal opened Content={<div>modal content</div>}>
                    {() => null}
                </Modal>
            );

            expect(screen.getByText("modal content")).toBeInTheDocument();
            fireEvent(
                screen.getByTestId("close-modal"),
                new MouseEvent("click", {
                    cancelable: true,
                    bubbles: true,
                })
            );

            expect(screen.queryByText("modal content")).not.toBeInTheDocument();
        });
    });
});
