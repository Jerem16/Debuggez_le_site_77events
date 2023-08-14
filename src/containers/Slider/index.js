import React, { useEffect, useState } from "react";
import { useData } from "../../contexts/DataContext";
import { getMonth } from "../../helpers/Date";

import "./style.scss";

const Slider = () => {
    const { data } = useData();
    const [currentIndex, setCurrentIndex] = useState(0);
    const byDateDesc = data?.focus?.sort(
        (evtA, evtB) => new Date(evtA.date) - new Date(evtB.date)
    );

    useEffect(() => {
        const nextCard = () => {
            if (byDateDesc.length > 0) {
                setCurrentIndex(
                    (prevIndex) => (prevIndex + 1) % byDateDesc.length
                );
            }
        };

        const timeoutId = setTimeout(nextCard, 5000);

        return () => {
            clearTimeout(timeoutId); // Nettoyage en cas de démontage du composant
        };
    }, [byDateDesc, currentIndex]);

    return (
        <div className="SlideCardList">
            {byDateDesc?.map((event, idx) => (
                <div
                    key={event.date + event.id}
                    className={`SlideCard SlideCard--${
                        currentIndex === idx ? "display" : "hide"
                    }`}
                >
                    <img src={event.cover} alt="forum" />
                    <div className="SlideCard__descriptionContainer">
                        <div className="SlideCard__description">
                            <h3>{event.title}</h3>
                            <p>{event.description}</p>
                            <div>{getMonth(new Date(event.date))}</div>
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
                            checked={currentIndex === radioIdx}
                            readOnly
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Slider;
