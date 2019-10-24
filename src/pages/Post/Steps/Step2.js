import React from "react";
import { Formik } from "formik";
import classNames from "classnames";

import { CSSTransition } from "react-transition-group";

const Step2 = ({ nextStep, prevStep, step, setFormValue, formValue }) => (
  <CSSTransition in={step} timeout={200} classNames="panel">
    <div className="panel post -local">
      <div className="content">
        <Formik
          initialValues={{
            street: "",
            reference: "",
            comment: "",
            pin: {
              lat: 0,
              lng: 0
            }
          }}
          validate={values => {
            let errors = {};
            if (!values.street) {
              errors.street = "Obrigatório";
            }
            if (!values.reference) {
              errors.reference = "Obrigatório";
            }
            return errors;
          }}
          onSubmit={values => {
            setFormValue({
              ...formValue,
              local: values
            });
            nextStep();
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
              <h1 className="title">Sobre o local de desaparecimento</h1>
              <form className="form" onSubmit={handleSubmit} noValidate>
                <div className="box">
                  <div className="input-wrapper">
                    <label className="label">Local do último contato</label>
                    <input
                      type="text"
                      name="street"
                      className="input"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.street}
                      placeholder="Rua Tal, 94"
                    />
                    {errors.street && touched.street && errors.street && (
                      <span className="error">
                        {errors.street && touched.street && errors.street}
                      </span>
                    )}
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

export default Step2;
