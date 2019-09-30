import React from "react";
import { Formik } from "formik";

const Step2 = ({ nextStep, prevStep, setFormValue, formValue }) => (
  <div className="panel post">
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
        handleSubmit
      }) => (
        <>
          <h1>Sobre o local de desaparecimento</h1>
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
              </div>
              {errors.name && touched.name && errors.name}
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
              </div>
              <div className="input-wrapper">
                <label className="label">Ponto de referência</label>
                <textarea
                  type="text"
                  name="comment"
                  className="input"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.comment}
                  placeholder="Próximo ao parque"
                ></textarea>
              </div>
            </div>
            {errors.password && touched.password && errors.password}
            <button
              type="button"
              className="button -secondary"
              onClick={prevStep}
            >
              Voltar
            </button>
            <button className="button" type="submit">
              Próximo
            </button>
          </form>
        </>
      )}
    </Formik>
  </div>
);

export default Step2;
