import React, { useEffect, useState } from "react";
import { Formik } from "formik";
import { Link } from "react-router-dom";

// State
import { useStateValue } from "../../state";

// Firebase
import firebase from "firebase/app";

// Style
import "./Chat.scss";

const Chat = () => {
  const [{ pinOpened }, dispatch] = useStateValue();
  const [localMessages, setLocalMessages] = useState([]);
  const db = firebase.firestore();
  const hasMessages = localMessages.length > 0;
  const { id } = pinOpened;

  const sendMessage = message => {
    const newMessage = {
      ...message,
      date: new Date()
    };
    db.collection("chats")
      .doc(id)
      .update({
        messages: firebase.firestore.FieldValue.arrayUnion(newMessage)
      });
  };

  const chatListener = () => {
    db.collection("chats")
      .doc(id)
      .onSnapshot(doc => {
        if (!doc || !doc.data()) return;
        const messagesUpdated = doc.data().messages;
        setLocalMessages(messagesUpdated);
      });
  };

  useEffect(() => {
    chatListener();
  }, []);

  console.log(localMessages);
  return (
    <div className="panel chat">
      <div className="header">
        <Link className="back" to="/home"></Link>
        <h2 className="name">Vamos achar o Fred!</h2>
      </div>
      <div className="artboard">
        {hasMessages ? (
          <ul className="message-list">
            {localMessages.map(({ text, ...props }, index) => {
              console.log(props);

              return (
                <li className="message" key={index}>
                  <h3>{text}</h3>
                </li>
              );
            })}
          </ul>
        ) : (
          <div className="actions">
            <h3 className="title">
              Como você <br /> quer ajudar Maria?
            </h3>
            <button className="button find">Informar que achou Fred</button>
            <button className="button share">Compatilhar a notícia</button>
          </div>
        )}
      </div>
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
          sendMessage(payload);
        }}
      >
        {({ values, handleChange, handleBlur, handleSubmit }) => (
          <form className="form" onSubmit={handleSubmit}>
            <div className="input-wrapper">
              <input
                type="text"
                name="text"
                className="input"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
                placeholder="Digite uma mensagem"
              />
              <button className="button send" type="submit">
                Enviar
              </button>
            </div>
          </form>
        )}
      </Formik>
    </div>
  );
};

export default Chat;
