import React, { useState } from "react";
import { Formik, Field } from "formik";
import classNames from "classnames";

import getGeolocation from "../../../utils/geolocation";

import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng
} from "react-places-autocomplete";

import { CSSTransition } from "react-transition-group";

const Step2 = ({ nextStep, prevStep, step, setFormValue, formValue }) => {
  const [address, setAddress] = useState("");
  
  const placesChange = address => {
    setAddress(address);
  };

  const placesSelect = address => {
    geocodeByAddress(address)
      .then(address => {
        getLatLng(address[0]).then(res => {
          const payloadAdress = {
            pin: res,
            street: address[0].formatted_address
          };

          setAddress(address[0].formatted_address)

          console.log(address);

          setFormValue({
            ...formValue,
            local: {
              ...formValue.local,
              ...payloadAdress
            }
          });
        });
      })
      .catch(error => console.error("Error", error));
  };

  return (
    <CSSTransition in={step} timeout={200} classNames="panel">
      <div className="panel post -local">
        <div className="content">
          <Formik
            initialValues={{
              reference: "",
              comment: "",
              contactPhone: ""
            }}
            validate={values => {
              let errors = {};
              if (!values.reference) {
                errors.reference = "Obrigatório";
              }
              if (!values.contactPhone) {
                errors.contactPhone = "Obrigatório";
              }
              return errors;
            }}
            onSubmit={values => {
              setFormValue({
                ...formValue,
                local: {
                  ...formValue.local,
                  ...values
                }
              });
              if (formValue.local.pin.lat === 0) {
                return getGeolocation().then(location => {
                  setFormValue({
                    ...formValue,
                    local: {
                      pin: {
                        lat: location.lat,
                        lng: location.lng
                      }
                    }
                  });
                });
              }
              return nextStep();
            }}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
              isValid
            }) => (
              <>
                <h1 className="title">Informações sobre o desaparecimento</h1>
                <form className="form" onSubmit={handleSubmit} noValidate>
                  <div className="box">
                    <div className="input-wrapper">
                      <label className="label">Local do último contato</label>
                      <PlacesAutocomplete
                        value={address}
                        onChange={placesChange}
                        onSelect={placesSelect}
                      >
                        {({
                          getInputProps,
                          suggestions,
                          getSuggestionItemProps,
                          loading
                        }) => (
                          <>
                            <input
                              placeholder="Procurar endereço"
                              {...getInputProps({
                                className: "location-search-input"
                              })}
                            />
                            <div className="autocomplete-dropdown-container">
                              {loading && <div>Carregando...</div>}
                              {suggestions.map(suggestion => {
                                const className = suggestion.active
                                  ? "suggestion-item--active"
                                  : "suggestion-item";
                                // inline style for demonstration purpose
                                const style = suggestion.active
                                  ? {
                                      backgroundColor: "#fafafa",
                                      cursor: "pointer"
                                    }
                                  : {
                                      backgroundColor: "#ffffff",
                                      cursor: "pointer"
                                    };
                                return (
                                  <div
                                    {...getSuggestionItemProps(suggestion, {
                                      className,
                                      style
                                    })}
                                  >
                                    <span>{suggestion.description}</span>
                                  </div>
                                );
                              })}
                            </div>
                          </>
                        )}
                      </PlacesAutocomplete>
                    </div>
                    <div className="input-wrapper">
                      <label className="label">Ponto de referência</label>
                      <input
                        type="text"
                        name="reference"
                        className="input"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.reference}
                        placeholder="Próximo ao parque"
                      />
                      {errors.reference &&
                        touched.reference &&
                        errors.reference && (
                          <span className="error">
                            {errors.reference &&
                              touched.reference &&
                              errors.reference}
                          </span>
                        )}
                    </div>
                    <div className="input-wrapper">
                      <label className="label">Comentário adicional</label>
                      <textarea
                        type="text"
                        name="comment"
                        className="textarea"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.comment}
                        placeholder="O animal estava um pouco assustado e usava uma coleira preta"
                      ></textarea>
                      {errors.comment && touched.comment && errors.comment && (
                        <span className="error">
                          {errors.comment && touched.comment && errors.comment}
                        </span>
                      )}
                    </div>
                    <div className="input-wrapper">
                      <label className="label">Telefone para contato</label>
                      <input
                        type="tel"
                        name="contactPhone"
                        className="input"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.contactPhone}
                        placeholder="XX XXXXX XXXX"
                      />
                      {errors.contactPhone &&
                        touched.contactPhone &&
                        errors.contactPhone && (
                          <span className="error">
                            {errors.contactPhone &&
                              touched.contactPhone &&
                              errors.contactPhone}
                          </span>
                        )}
                    </div>
                  </div>
                  {errors.password && touched.password && errors.password}
                  <div className="step-control">
                    <button
                      type="button"
                      className="button -secondary prev"
                      onClick={prevStep}
                    >
                      Voltar
                    </button>
                    <button
                      className={classNames("button next", {
                        "-disabled": !isValid
                      })}
                      type="submit"
                    >
                      Próximo
                    </button>
                  </div>
                </form>
              </>
            )}
          </Formik>
        </div>
      </div>
    </CSSTransition>
  );
};

export default Step2;
