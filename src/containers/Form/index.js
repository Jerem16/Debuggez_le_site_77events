import { act } from "react-dom/test-utils";
import React, { useCallback, useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import Field, { FIELD_TYPES } from "../../components/Field";
import Select from "../../components/Select";
import Button, { BUTTON_TYPES } from "../../components/Button";

// Fonction simulant une API de contact
const mockContactApi = () =>
    new Promise((resolve) => {
        setTimeout(resolve, 1000);
    });

const Form = ({ onSuccess, onError }) => {
    const [sending, setSending] = useState(false);

    // État pour gérer la soumission du formulaire
    const [formSubmitted, setFormSubmitted] = useState(false);

    // Nouvelle variable d'état pour réinitialiser le Select
    const [resetSelect, setResetSelect] = useState(false);

    // État pour gérer les erreurs de validation des champs
    const [errorFields, setErrorFields] = useState({
        nom: "",
        prenom: "",
        email: "",
        type: "",
    });

    // Référence au formulaire
    const formRef = useRef(null);

    // Fonction de réinitialisation du formulaire
    const resetForm = () => {
        setErrorFields({
            nom: "",
            prenom: "",
            email: "",
            type: "",
        });

        if (formRef.current) {
            formRef.current.reset(); // Réinitialisation du formulaire
        }

        setFormSubmitted(false);
        setResetSelect(true); // Activation de la réinitialisation de Select
    };

    // Fonction de soumission du formulaire
    const sendContact = useCallback(
        async (evt) => {
            evt.preventDefault();
            const form = evt.target;
            const formData = new FormData(form);
            let hasErrors = false;

            const requiredFields = [
                "nom",
                "prenom",
                "email",
                "type",
                "message",
            ];
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
                act(() => {
                    setSending(false);
                    setFormSubmitted(true);
                    onSuccess();
                });
            } catch (err) {
                setSending(false);
                onError(err);
                act(() => {
                    setSending(false);
                    onError(err);
                });
            }
        },
        [onSuccess, onError]
    );

    // Réinitialisation du formulaire après soumission
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

    // Rendu du composant
    return (
        <form ref={formRef} onSubmit={sendContact}>
            <div className="row">
                <div className="col">
                    <Field
                        placeholder="Entrez votre nom"
                        label="Nom"
                        name="nom"
                        error={errorFields.nom} // Gestion des erreurs
                    />
                    <Field
                        placeholder="Entrez votre prénom"
                        label="Prénom"
                        name="prenom"
                        error={errorFields.prenom} // Gestion des erreurs
                    />
                    <Select
                        selection={["Personne", "Entreprise"]}
                        onChange={() => null}
                        label="Personne / Entreprise"
                        name="type"
                        type="large"
                        titleEmpty
                        error={errorFields.type} // Gestion des erreurs
                        reset={resetSelect} // Variable d'état pour la réinitialisation
                        placeholder="type"
                    />
                    <Field
                        placeholder="Entrez votre email"
                        label="Email"
                        name="email"
                        error={errorFields.email} // Gestion des erreurs
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
                        error={errorFields.message} // Gestion des erreurs
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
