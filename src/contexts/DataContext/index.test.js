import React from "react";
import { render, screen } from "@testing-library/react";
import { DataProvider, api, useData } from "./index";

describe("Lorsqu'un contexte de données est créé", () => {
    it("un appel est exécuté sur le fichier events.json", async () => {
        api.loadData = jest.fn().mockReturnValue({ result: "ok" });
        const Component = () => {
            const { data } = useData();
            return <div>{data?.result}</div>;
        };
        render(
            <DataProvider>
                <Component />
            </DataProvider>
        );
        const dataDisplayed = await screen.findByText("ok");
        expect(dataDisplayed).toBeInTheDocument();
    });

    describe("et que l'appel aux événements échoue", () => {
        it("l'erreur est affichée", async () => {
            window.console.error = jest.fn();
            api.loadData = jest
                .fn()
                .mockRejectedValue("erreur lors de l'appel aux événements");

            const Component = () => {
                const { error } = useData();
                return <div>{error}</div>;
            };
            render(
                <DataProvider>
                    <Component />
                </DataProvider>
            );
            const dataDisplayed = await screen.findByText(
                "erreur lors de l'appel aux événements"
            );
            expect(dataDisplayed).toBeInTheDocument();
        });
    });
});
