import PropTypes from "prop-types";
import { getMonth } from "../../helpers/Date";

import "./style.scss";

const EventCard = ({
    imageSrc,
    imageAlt,
    date = new Date(),
    title,
    label,
    small = false,
    ...props
}) => (
    <div
        data-testid="card-testid" // Ajout du data-testid pour les tests unitaires
        className={`EventCard${small ? " EventCard--small" : ""}`}
        {...props}
    >
        <div className="EventCard__imageContainer">
            <img
                data-testid="card-image-testid" // Ajout du data-testid pour les tests unitaires
                src={imageSrc}
                alt={imageAlt}
            />
            <div
                className="EventCard__label"
                data-testid={`label-testid-${label}`} // Ajout du data-testid pour les tests unitaires
            >
                {label}
            </div>
        </div>
        <div className="EventCard__descriptionContainer">
            <div
                data-testid="card-title-testid" // Ajout du data-testid pour les tests unitaires
                className="EventCard__title"
            >
                {title}
            </div>
            <div className="EventCard__month">{getMonth(date)}</div>
        </div>
    </div>
);

EventCard.propTypes = {
    imageSrc: PropTypes.string.isRequired,
    imageAlt: PropTypes.string,
    date: PropTypes.instanceOf(Date).isRequired,
    title: PropTypes.string.isRequired,
    small: PropTypes.bool,
    label: PropTypes.string.isRequired,
};

EventCard.defaultProps = {
    imageAlt: "image",
    small: false,
};

export default EventCard;
