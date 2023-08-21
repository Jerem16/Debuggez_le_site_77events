import React, { useEffect, useState } from "react";
import { useData } from "../../contexts/DataContext";
import { getMonth } from "../../helpers/Date";

import "./style.scss";

const Slider = () => {
    const { data } = useData();
    const [index, setIndex] = useState(0);
    // Tri des événements par date décroissante, l'opérateur (?.) assure que data.focus existe avant d'effectuer le tri
    // La fonction de comparaison prend deux événements (evtA et evtB) et compare leurs dates, la différence entre les dates est utilisée pour déterminer l'ordre (plus ancien au plus récent)
    const byDateDesc = data?.focus?.sort(
        (evtA, evtB) => new Date(evtA.date) - new Date(evtB.date)
    );

    useEffect(() => {
        const nextCard = () => {
            if (byDateDesc.length > 0) {
                // La fonction nextCard qui fait avancer l'index en utilisant le modulo (le modulo assure que l'index reste à l'intérieur des limites des données triées)
                setIndex((prevIndex) => (prevIndex + 1) % byDateDesc.length);
            }
        };

        // Défilement automatique 5000 ms
        const timeoutId = setTimeout(nextCard, 5000);

        return () => {
            // Nettoyage du timeout lors du démontage du composant => fuites mémoire
            clearTimeout(timeoutId);
        };
    }, [byDateDesc, index]); // Mise à jour lorsque les données ou l'index changent

    return (
        <div className="SlideCardList">
            {byDateDesc?.map((event, idx) => (
                <div
                    key={event.date + event.id}
                    className={`SlideCard SlideCard--${
                        index === idx ? "display" : "hide"
                    }`}
                    data-testid="SlideCard"
                >
                    <img src={event.cover} alt="forum" />
                    <div className="SlideCard__descriptionContainer">
                        <div className="SlideCard__description">
                            <h3>{event.title}</h3>
                            <p>{event.description}</p>
                            <div data-testid={idx}>
                                {getMonth(new Date(event.date))}
                            </div>
                        </div>
                    </div>
                </div>
            ))}
            <div className="SlideCard__paginationContainer">
                <div className="SlideCard__pagination">
                    {byDateDesc?.map((event, radioIdx) => (
                        <input
                            key={event.id + event.date}
                            type="radio"
                            name="radio-button"
                            checked={index === radioIdx}
                            readOnly // Empêche l'interaction utilisateur avec les boutons radio
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Slider;
