import { getMonth } from ".";

describe("Assistant de dates", () => {
    describe("Lorsque la fonction getMonth est appelée", () => {
        it("retourne 'janvier' pour la date 2022-01-01", () => {
            const date = new Date(2022, 0, 1);
            const result = getMonth(date);
            expect(result).toBe("janvier");
        });

        it("retourne 'juillet' pour la date 2022-07-08", () => {
            const date = new Date(2022, 6, 8);
            const result = getMonth(date);
            expect(result).toBe("juillet");
        });
    });
});
