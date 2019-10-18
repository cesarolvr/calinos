import React from "react";
import { Formik } from "formik";

const Step2 = ({ nextStep, prevStep, setFormValue, formValue }) => (
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
                    className="textarea"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.comment}
                    placeholder="Próximo ao parque"
                  ></textarea>
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
                <button className="button next" type="submit">
                  Próximo
                </button>
              </div>
            </form>
          </>
        )}
      </Formik>
    </div>
  </div>
);

export default Step2;
