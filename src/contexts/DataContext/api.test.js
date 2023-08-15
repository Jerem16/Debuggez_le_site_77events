import { api } from ".";

describe("api.loadData", () => {
    const mockFetch = (response, status) => {
        global.fetch = jest.fn().mockResolvedValue({
            json: async () => response,
            status,
        });
    };

    afterEach(() => {
        global.fetch.mockRestore();
    });

    it("charge les données avec succès", async () => {
        const mockResponse = { events: [{ date: "2023-08-15" }] };
        mockFetch(mockResponse, 200);

        const data = await api.loadData();

        expect(data).toEqual(mockResponse);
    });

    it("gère les erreurs lors du chargement", async () => {
        const errorMessage = "Une erreur s'est produite";
        mockFetch({ error: errorMessage }, 500);

        try {
            await api.loadData();
        } catch (error) {
            expect(error.message).toBe(errorMessage);
        }
    });
});
