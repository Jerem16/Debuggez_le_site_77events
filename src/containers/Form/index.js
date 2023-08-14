import React, { useCallback, useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import Field, { FIELD_TYPES } from "../../components/Field";
import Select from "../../components/Select";
import Button, { BUTTON_TYPES } from "../../components/Button";

const mockContactApi = () =>
    new Promise((resolve) => {
        setTimeout(resolve, 1000);
    });

const Form = ({ onSuccess, onError }) => {
    const [sending, setSending] = useState(false);
    const [formSubmitted, setFormSubmitted] = useState(false);
    const [resetSelect, setResetSelect] = useState(false); // Nouvelle variable d'état
    const [errorFields, setErrorFields] = useState({
        nom: "",
        prenom: "",
        email: "",
        type: "",
    });

    const formRef = useRef(null);
    const resetForm = () => {
        setErrorFields({
            nom: "",
            prenom: "",
            email: "",
            type: "",
        });

        if (formRef.current) {
            formRef.current.reset();
        }

        setFormSubmitted(false);
        setResetSelect(true);
    };

    const sendContact = useCallback(
        async (evt) => {
            evt.preventDefault();
            const form = evt.target;
            const formData = new FormData(form);
            let hasErrors = false;

            const requiredFields = ["nom", "prenom", "email", "type"];
            const errors = {};
            requiredFields.forEach((fieldName) => {
                if (!formData.get(fieldName)) {
                    errors[fieldName] = "Ce champ est obligatoire";
                    hasErrors = true;
                }
            });

            setErrorFields(errors);

            if (hasErrors) {
                return;
            }

            setSending(true);
            try {
                await mockContactApi();
                setSending(false);
                setFormSubmitted(true);
                onSuccess();
            } catch (err) {
                setSending(false);
                onError(err);
            }
        },
        [onSuccess, onError]
    );

    useEffect(() => {
        let timeoutId;

        if (formSubmitted) {
            timeoutId = setTimeout(() => {
                resetForm();
            }, 1500);
        }

        return () => {
            if (timeoutId) {
                clearTimeout(timeoutId);
            }
        };
    }, [formSubmitted]);

    return (
        <form ref={formRef} onSubmit={sendContact}>
            <div className="row">
                <div className="col">
                    <Field
                        placeholder="Entrez votre nom"
                        label="Nom"
                        name="nom"
                        error={errorFields.nom}
                    />
                    <Field
                        placeholder="Entrez votre prénom"
                        label="Prénom"
                        name="prenom"
                        error={errorFields.prenom}
                    />
                    <Select
                        selection={["Personne", "Entreprise"]}
                        onChange={() => null}
                        label="Personne / Entreprise"
                        name="type"
                        type="large"
                        titleEmpty
                        error={errorFields.type}
                        reset={resetSelect}
                        placeholder="type"
                    />
                    <Field
                        placeholder="Entrez votre email"
                        label="Email"
                        name="email"
                        error={errorFields.email}
                    />
                    <Button
                        data-testid="button-test-id"
                        type={BUTTON_TYPES.SUBMIT}
                        disabled={sending}
                    >
                        {sending ? "En cours" : "Envoyer"}
                    </Button>
                </div>
                <div className="col">
                    <Field
                        name="message"
                        label="Message"
                        type={FIELD_TYPES.TEXTAREA}
                    />
                </div>
            </div>
        </form>
    );
};

Form.propTypes = {
    onError: PropTypes.func,
    onSuccess: PropTypes.func,
};

Form.defaultProps = {
    onError: () => null,
    onSuccess: () => null,
};

export default Form;
