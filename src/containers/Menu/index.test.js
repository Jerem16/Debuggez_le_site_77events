import { fireEvent, render, screen } from "@testing-library/react";
import Menu from "./index";

describe("Lorsque le Menu est créé", () => {
    it("une liste de liens obligatoires et le logo sont affichés", async () => {
        render(<Menu />);
        await screen.findByText("Nos services");
        await screen.findByText("Nos réalisations");
        await screen.findByText("Notre équipe");
        await screen.findByText("Contact");
    });

    describe("et qu'un clic est déclenché sur le bouton Contact", () => {
        it("le href de l'emplacement du document change", async () => {
            render(<Menu />);
            fireEvent(
                await screen.findByText("Contact"),
                new MouseEvent("click", {
                    cancelable: true,
                    bubbles: true,
                })
            );
            expect(window.document.location.hash).toEqual("#contact");
        });
    });
});
