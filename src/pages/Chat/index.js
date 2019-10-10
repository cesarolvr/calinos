import React, { useEffect, useState } from "react";
import firebase from "firebase/app";

// Style
// import "./Home.scss";

// State
import { useStateValue } from "../../state";

const Chat = () => {
  const [{ pinOpened }, dispatch] = useStateValue();
  const [localMessages, setLocalMessages] = useState([]);
  const { authorId } = pinOpened;

  const getTalk = ({ receiverId }) => {
    const databaseInstance = firebase.firestore();
    const currentUser = firebase.auth().currentUser;
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
    const currentUser = firebase.auth().currentUser;
    const chatId = `${receiverId}${currentUser.uid}`;

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

  const sendMessage = ({ receiverId }) => {
    const databaseInstance = firebase.firestore();
    const currentUser = firebase.auth().currentUser;
    const chatId = `${receiverId}${currentUser.uid}`;

    const message = {
      message: "teste",
      senderId: currentUser.uid,
      receiverId: receiverId,
      date: new Date()
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
            .set({});
        } else {
          databaseInstance
            .collection("chats")
            .doc(chatId)
            .update({
              messages: firebase.firestore.FieldValue.arrayUnion(message)
            });
        }
      });
  };

  useEffect(() => {
    getTalk({ receiverId: authorId });
    chatListener({ receiverId: authorId });
  }, []);
  return (
    <div className="panel chat">
      Chat
      <button
        className="button"
        type="button"
        onClick={() => {
          sendMessage({ receiverId: authorId });
        }}
      >
        Enviar
      </button>
      <ul>
        {localMessages &&
          localMessages.map(({ message }) => <li>{message}</li>)}
      </ul>
    </div>
  );
};

export default Chat;
