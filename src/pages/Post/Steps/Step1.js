import React, { useState } from "react";
import { Formik, Field } from "formik";
import classNames from "classnames";

// Utils
import getBreed from "../../../utils/getBreed";

const Step1 = ({ nextStep, prevStep, formValue, setFormValue }) => {
  return (
    <div className="panel post -animal">
      <div className="content">
        <Formik
          initialValues={{
            type: "",
            name: "",
            breed: "",
            gender: "",
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
            if (!values.gender) {
              errors.gender = "Selecione o gênero";
            }
            if (!values.color) {
              errors.color = "Selecione uma cor";
            }
            if (!values.size) {
              errors.size = "Selecione o porte do animal";
            }
            if (!values.type) {
              errors.type = "Selecione o tipo do animal";
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
            const { type } = values;
            return (
              <>
                <h1 className="title">Sobre o animal</h1>
                <form className="form" onSubmit={handleSubmit} noValidate>
                  <div className="box">
                    <div className="input-wrapper">
                      <label className="label">Tipo do bichinho</label>
                      <Field component="select" name="type" className="input">
                        <option value="">Selecionar</option>
                        <option value="dog">Cachorro</option>
                        <option value="cat">Gato</option>
                      </Field>
                      {errors.type && touched.type && errors.type && (
                        <span className="error">
                          {errors.type && touched.type && errors.type}
                        </span>
                      )}
                    </div>
                    <div className="input-wrapper">
                      <label className="label">Nome</label>
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
                      <label className="label">Sexo</label>
                      <Field component="select" name="gender" className="input">
                        <option value="">Selecionar</option>
                        <option value="M">Macho</option>
                        <option value="F">Fêmea</option>
                      </Field>
                      {errors.gender && touched.gender && errors.gender && (
                        <span className="error">
                          {errors.gender && touched.gender && errors.gender}
                        </span>
                      )}
                    </div>
                    <div className="input-wrapper">
                      <label className="label">Raça</label>
                      <Field component="select" name="breed" className="input">
                        <option value="">Selecionar</option>
                        {getBreed(type === "cat" ? "cat" : "dog").map(
                          ({ name }, index) => {
                            return (
                              <option key={index} value={name}>
                                {name}
                              </option>
                            );
                          }
                        )}
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
                        <option value="Médio">Médio</option>
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
};

export default Step1;
