import React, { useEffect, useState } from "react";
import firebase from "firebase/app";
import { Formik } from "formik";

// Style
import "./Chat.scss";

// State
import { useStateValue } from "../../state";

const Chat = () => {
  const [{ receiverId }, dispatch] = useStateValue();
  const [localMessages, setLocalMessages] = useState([]);
  const currentUser = firebase.auth().currentUser;

  const initTalk = ({ receiverId }) => {
    const databaseInstance = firebase.firestore();
    const chatId = `${receiverId}${currentUser.uid}`;

    databaseInstance
      .collection("chats")
      .doc(chatId)
      .get()
      .then(doc => {
        if (!doc || !doc.data()) return;
        const currentMessages = doc.data().messages;
        if (currentMessages && currentMessages.length > 0) {
          setLocalMessages([...currentMessages, ...localMessages]);
        }
      });
  };

  const chatListener = ({ receiverId }) => {
    const databaseInstance = firebase.firestore();
    const chatId = `${currentUser.uid}${receiverId}`;

    databaseInstance
      .collection("chats")
      .doc(chatId)
      .onSnapshot(doc => {
        if (!doc || !doc.data()) return;
        const currentMessages = doc.data().messages;
        if (currentMessages && currentMessages.length > 0) {
          setLocalMessages([...currentMessages, ...localMessages]);
        }
      });
  };

  const sendMessage = ({ text }, { receiverId }) => {
    const databaseInstance = firebase.firestore();
    const chatId = `${receiverId}${currentUser.uid}`;

    const message = {
      receiverId,
      message: text,
      senderId: currentUser.uid,
      date: new Date().getTime()
    };

    databaseInstance
      .collection("chats")
      .doc(chatId)
      .get()
      .then(doc => {
        if (!doc || !doc.data()) {
          databaseInstance
            .collection("chats")
            .doc(chatId)
            .set({ messages: [] });
        } else {
          databaseInstance
            .collection("chats")
            .doc(chatId)
            .update({
              messages: firebase.firestore.FieldValue.arrayUnion(message)
            });
        }
      });

    databaseInstance
      .collection("users")
      .where("id", "==", receiverId)
      .get()
      .then(querySnapshot => {
        if (querySnapshot.empty) return false;
        querySnapshot.forEach(snapshot => {
          if (snapshot.data()) {
            databaseInstance
              .collection("users")
              .doc(snapshot.id)
              .set(
                {
                  messages: firebase.firestore.FieldValue.arrayUnion({
                    email: currentUser.email,
                    id: currentUser.uid,
                    name: currentUser.name || ""
                  })
                },
                { merge: true }
              );
          }
        });
      })
      .catch(console.log);

    databaseInstance
      .collection("users")
      .where("id", "==", currentUser.uid)
      .get()
      .then(querySnapshot => {
        if (querySnapshot.empty) return false;
        querySnapshot.forEach(snapshot => {
          if (snapshot.data()) {
            databaseInstance
              .collection("users")
              .doc(snapshot.id)
              .set(
                {
                  messages: firebase.firestore.FieldValue.arrayUnion({
                    email: "email@gmail.com",
                    id: receiverId,
                    name: "A pessoa"
                  })
                },
                { merge: true }
              );
          }
        });
      })
      .catch(console.log);
  };

  useEffect(() => {
    initTalk({ receiverId });
    chatListener({ receiverId });
  }, []);

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
          sendMessage(payload, { receiverId });
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
        {localMessages &&
          localMessages.map(({ message, date }, index) => (
            <li key={index}>
              <small>{date}</small>
              <h3>{message}</h3>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default Chat;
