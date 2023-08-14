import PropTypes from "prop-types";
import {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useState,
    useMemo,
} from "react";

const DataContext = createContext({});

export const api = {
    loadData: async () => {
        const json = await fetch("/events.json");
        return json.json();
    },
};

export const DataProvider = ({ children }) => {
    const [error, setError] = useState(null);
    const [data, setData] = useState(null);

    const getData = useCallback(async () => {
        try {
            setData(await api.loadData());
        } catch (err) {
            setError(err);
        }
    }, []);

    useEffect(() => {
        getData();
    }, []);

    // Trier tous les events de "data" du plus recent au plus ancient
    // const last = data?.events?.sort(
    //     (evtA, evtB) => new Date(evtB.date) - new Date(evtA.date)
    // )[0];

    // Trouve le projet le plus récent sans trier "data"
    const last = data?.events?.reduce((latestEvent, currentEvent) => {
        if (
            !latestEvent ||
            new Date(currentEvent.date) > new Date(latestEvent.date)
        ) {
            return currentEvent;
        }
        return latestEvent;
    }, null);

    const contextValue = useMemo(() => ({ data, last, error }), [data, error]);

    return (
        // (useMemo = optimisation des performances)
        //     <DataContext.Provider   
        // eslint-disable-next-line react/jsx-no-constructed-context-values
        //     value={{ data, last, error }}
        // >
        <DataContext.Provider value={contextValue}>
            {children}
        </DataContext.Provider>
    );
};

DataProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export const useData = () => useContext(DataContext);

export default DataContext;
