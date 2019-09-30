import React from "react";
import { Formik, Field } from "formik";

const Step1 = ({ nextStep, prevStep, formValue, setFormValue }) => (
  <div className="panel post">
    <Formik
      initialValues={{
        name: "",
        breed: "",
        color: "",
        size: ""
      }}
      onSubmit={(values, { setSubmitting }) => {
        setFormValue({
          ...formValue,
          animal: values
        });
        nextStep()
      }}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting
      }) => (
        <>
          <h1>Sobre o animal</h1>
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
              </div>
              {errors.name && touched.name && errors.name}
              <div className="input-wrapper">
                <label className="label">Raça</label>
                <Field component="select" name="breed" className="input">
                  <option value="Labrador">Labrador</option>
                  <option value="Poodle">Poodle</option>
                  <option value="Bulldog">Bulldog</option>
                </Field>
              </div>
              <div className="input-wrapper">
                <label className="label">Cor</label>
                <Field component="select" name="color" className="input">
                  <option value="Amarelo">Amarelo</option>
                  <option value="Bege">Bege</option>
                  <option value="Preto">Preto</option>
                  <option value="Branco">Branco</option>
                </Field>
              </div>
              <div className="input-wrapper">
                <label className="label">Porte</label>
                <Field component="select" name="size" className="input">
                  <option value="Pequeno">Pequeno</option>
                  <option value="Medio">Médio</option>
                  <option value="Grande">Grande</option>
                </Field>
              </div>
            </div>
            {errors.password && touched.password && errors.password}
            <button type="button" className="button -secondary" onClick={prevStep}>
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

export default Step1;
