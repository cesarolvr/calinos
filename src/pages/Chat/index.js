import React from "react";
import { Formik } from "formik";

// Style
import "./Chat.scss";

const Chat = () => {

  return (
    <div className="panel chat">
      Chat
      <Formik
        initialValues={{ text: "" }}
        validate={values => {
          let errors = {};
          if (!values.text) {
            errors.text = "Required";
          }
          return errors;
        }}
        onSubmit={(values, {}) => {
          const payload = values;
          console.log(payload);
          
        }}
      >
        {({
          values,
          handleChange,
          handleBlur,
          handleSubmit,
          errors,
          touched
        }) => (
          <form className="form" onSubmit={handleSubmit}>
            <div className="box">
              <div className="input-wrapper">
                <label className="label">Mensagem</label>
                <input
                  type="text"
                  name="text"
                  className="input"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                  placeholder="Digite uma mensagem"
                />
                {errors.text && touched.text && errors.text}
              </div>
            </div>
            <button className="button" type="submit">
              Enviar
            </button>
          </form>
        )}
      </Formik>
      <ul>
        <li>
          <small>Small</small>
          <h3>Message</h3>
        </li>
      </ul>
    </div>
  );
};

export default Chat;
