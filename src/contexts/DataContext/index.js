import PropTypes from "prop-types";
import {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useState,
    useMemo, // Importation de useMemo
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

    // Utilisation de reduce pour définir le dernier événement (last) en fonction de la date
    const last = data?.events?.reduce((latestEvent, currentEvent) => {
        if (
            !latestEvent ||
            new Date(currentEvent.date) > new Date(latestEvent.date)
        ) {
            return currentEvent;
        }
        return latestEvent;
    }, null);

    // Utilisation de useMemo pour optimiser contextValue, ajout de la variable locale last
    const contextValue = useMemo(() => ({ data, last, error }), [data, error]);

    return (
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
