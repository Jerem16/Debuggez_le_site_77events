import PropTypes from "prop-types";
import React from "react"; // Don't forget to import React if it's not imported already
import "./style.scss";

export const FIELD_TYPES = {
    INPUT_TEXT: 1,
    TEXTAREA: 2,
};

const Field = ({
    type = FIELD_TYPES.INPUT_TEXT,
    label,
    name,
    placeholder,
    error,
    onChange,
}) => {
    let component;
    switch (type) {
        case FIELD_TYPES.INPUT_TEXT:
            component = (
                <input
                    type="text"
                    name={name}
                    placeholder={placeholder}
                    data-testid={`field-testid-${name}`}
                    onChange={onChange} // Ajoutez cette ligne
                />
            );
            break;
        case FIELD_TYPES.TEXTAREA:
            component = (
                <textarea
                    name={name}
                    placeholder="Entrez votre message"
                    data-testid={`field-testid-${name}`}
                />
            );
            break;
        default:
            component = (
                <input
                    type="text"
                    name={name}
                    placeholder={placeholder}
                    data-testid={name}
                />
            );
    }
    return (
        <div className={`inputField ${error ? "error" : ""}`}>
            <label htmlFor={name}>{label}</label>
            {component}
            {error && <div className="error-message">{error}</div>}
        </div>
    );
};

Field.propTypes = {
    type: PropTypes.oneOf(Object.values(FIELD_TYPES)),
    name: PropTypes.string,
    label: PropTypes.string,
    placeholder: PropTypes.string,
    error: PropTypes.string,
    onChange: PropTypes.func,
};

Field.defaultProps = {
    label: "",
    placeholder: "",
    type: FIELD_TYPES.INPUT_TEXT,
    name: "field-name",
    error: "",
    onChange: () => {},
};

export default Field;
