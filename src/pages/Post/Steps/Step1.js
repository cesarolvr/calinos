import React from "react";
import { Formik, Field } from "formik";
import classNames from 'classnames'

const Step1 = ({ nextStep, prevStep, formValue, setFormValue }) => (
  <div className="panel page post -animal">
    <div className="content">
      <Formik
        initialValues={{
          name: "",
          breed: "",
          color: "",
          size: ""
        }}
        validate={values => {
          let errors = {};
          if (!values.name) {
            errors.name = "Obrigatório";
          }
          if (!values.breed) {
            errors.breed = "Selecione uma raça";
          }
          if (!values.color) {
            errors.color = "Selecione uma cor";
          }
          if (!values.size) {
            errors.size = "Selecione o porte do animal";
          }
          return errors;
        }}
        onSubmit={values => {
          setFormValue({
            ...formValue,
            animal: values
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
        }) => {
          return (
            <>
              <h1 className="title">Sobre o animal</h1>
              <form className="form" onSubmit={handleSubmit} noValidate>
                <div className="box">
                  <div className="input-wrapper">
                    <label className="label">Name</label>
                    <input
                      type="text"
                      name="name"
                      className="input"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.name}
                      placeholder="Totó"
                    />
                    {errors.name && touched.name && errors.name && (
                      <span className="error">
                        {errors.name && touched.name && errors.name}
                      </span>
                    )}
                  </div>
                  <div className="input-wrapper">
                    <label className="label">Raça</label>
                    <Field component="select" name="breed" className="input">
                      <option value="">Selecionar</option>
                      <option value="Labrador">Labrador</option>
                      <option value="Poodle">Poodle</option>
                      <option value="Bulldog">Bulldog</option>
                    </Field>
                    {errors.breed && touched.breed && errors.breed && (
                      <span className="error">
                        {errors.breed && touched.breed && errors.breed}
                      </span>
                    )}
                  </div>
                  <div className="input-wrapper">
                    <label className="label">Cor</label>
                    <Field component="select" name="color" className="input">
                      <option value="">Selecionar</option>
                      <option value="Amarelo">Amarelo</option>
                      <option value="Bege">Bege</option>
                      <option value="Preto">Preto</option>
                      <option value="Branco">Branco</option>
                    </Field>
                    {errors.color && touched.color && errors.color && (
                      <span className="error">
                        {errors.color && touched.color && errors.color}
                      </span>
                    )}
                  </div>
                  <div className="input-wrapper">
                    <label className="label">Porte</label>
                    <Field component="select" name="size" className="input">
                      <option value="">Selecionar</option>
                      <option value="Pequeno">Pequeno</option>
                      <option value="Medio">Médio</option>
                      <option value="Grande">Grande</option>
                    </Field>
                    {errors.size && touched.size && errors.size && (
                      <span className="error">
                        {errors.size && touched.size && errors.size}
                      </span>
                    )}
                  </div>
                </div>
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
          );
        }}
      </Formik>
    </div>
  </div>
);

export default Step1;
