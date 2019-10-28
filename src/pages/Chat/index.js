import React, { useEffect, useState } from "react";
import { Formik } from "formik";
import { Link } from "react-router-dom";
import classNames from "classnames";

// State
import { useStateValue } from "../../state";

// Firebase
import firebase from "firebase/app";

// Style
import "./Chat.scss";

const Chat = ({ history }) => {
  const [{ pinOpened }, dispatch] = useStateValue();
  const [localMessages, setLocalMessages] = useState([]);
  const currentUser = firebase.auth().currentUser;
  const db = firebase.firestore();
  const hasMessages = localMessages && localMessages.length > 0;
  const { id, animal = {}, ownerName = '' } = pinOpened;
  const days = ["Seg", "Ter", "Qua", "Qui", "Sex", "Sab", "Dom"];

  const sendMessage = message => {
    const date = `${
      days[new Date().getDay()]
    }, ${new Date().getHours()}:${new Date().getMinutes()}`;

    const newMessage = {
      ...message,
      sendedAt: {
        date,
        at: new Date()
      },
      authorId: currentUser.uid,
      authorName: currentUser.displayName
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

  const isFounded = () => {
    const date = `${
      days[new Date().getDay()]
    }, ${new Date().getHours()}:${new Date().getMinutes()}`;
    const newMessage = {
      text: `Eu encontrei o ${animal.name}`,
      sendedAt: {
        date,
        at: new Date()
      },
      authorId: currentUser.uid,
      authorName: currentUser.displayName
    };
    db.collection("chats")
      .doc(id)
      .update({
        messages: firebase.firestore.FieldValue.arrayUnion(newMessage)
      });
  };

  useEffect(() => {
    chatListener();
  }, []);

  if (!pinOpened) return null;

  return (
    <div className="panel chat">
      <div className="header">
        <button
          className="back"
          onClick={() => {
            history.goBack();
          }}
        ></button>
        <h2 className="name">{animal.name}</h2>
      </div>
      <div className="artboard">
        {hasMessages ? (
          <ul className="message-list">
            {localMessages.map(
              ({ text, authorId, sendedAt, authorName = "Usuário" }, index) => {
                return (
                  <li
                    className={classNames("message", {
                      "-me": authorId === currentUser.uid
                    })}
                    key={index}
                  >
                    <h4 className="name">{authorName}</h4>
                    <h3 className="text">{text}</h3>
                    <span className="hour">{sendedAt.date}</span>
                  </li>
                );
              }
            )}
          </ul>
        ) : (
          <div className="actions">
            <h3 className="title">
              Como você <br /> quer ajudar {ownerName.split(' ')[0]}?
            </h3>
            <button className="button find" onClick={isFounded}>
              Informar que achou {animal.name}
            </button>
            <button
              className="button share"
              onClick={() => {
                if (navigator.share) {
                  navigator
                    .share({
                      title: "Testing Share",
                      text: "Check out Web Fundamentals — it rocks!",
                      url: "https://developers.google.com/web"
                    })
                    .then(() => console.log("Successful share"))
                    .catch(error => console.log("Error sharing", error));
                }
              }}
            >
              Compatilhar a notícia
            </button>
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
        onSubmit={(values, { resetForm }) => {
          const payload = values;
          sendMessage(payload);
          resetForm({});
        }}
      >
        {({ values, handleChange, handleBlur, handleSubmit }) => {
          return (
            <form className="form" onSubmit={handleSubmit}>
              <div className="input-wrapper">
                <input
                  type="text"
                  name="text"
                  className="input"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.text || ""}
                  placeholder="Digite uma mensagem"
                />
                <button className="button send" type="submit">
                  Enviar
                </button>
              </div>
            </form>
          );
        }}
      </Formik>
    </div>
  );
};

export default Chat;
