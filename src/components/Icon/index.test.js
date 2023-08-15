import { render, screen } from "@testing-library/react";
import md5 from "md5";
import Icon from ".";

describe("Composant Icon", () => {
    describe("Lorsqu'une icône est créée avec le nom 'twitch'", () => {
        it("l'icône contient la valeur de hachage du chemin égale à 327fbc38c8e878259c3ec35ef231517a", () => {
            render(<Icon name="twitch" />);
            expect(
                md5(screen.getByTestId("icon-twitch").getAttribute("d"))
            ).toEqual("327fbc38c8e878259c3ec35ef231517a");
        });
    });
    describe("Lorsqu'une icône est créée avec le nom 'facebook'", () => {
        it("l'icône contient la valeur de hachage du chemin égale à bbea4c9e40773b969fdb6e406059f853", () => {
            render(<Icon name="facebook" />);
            expect(
                md5(screen.getByTestId("icon-facebook").getAttribute("d"))
            ).toEqual("bbea4c9e40773b969fdb6e406059f853");
        });
    });
});
