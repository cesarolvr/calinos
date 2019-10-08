import React, { useEffect } from "react";
import firebase from "firebase/app";

// Style
// import "./Home.scss";

// State
import { useStateValue } from "../../state";

const initChat = ({ receiverId }) => {
  const databaseInstance = firebase.firestore();
  const currentUser = firebase.auth().currentUser;
  const chatId = `${receiverId}${currentUser.uid}`;
  // TODO: tirar essa criação desnecessária e verificar se tem alguém pra fazer update
  databaseInstance
    .collection("chats")
    .doc(chatId)
    .set({});
  databaseInstance
    .collection("chats")
    .doc(chatId)
    .onSnapshot(function(doc) {
      console.log("Current data: ", doc.data());
    });
};

const sendMessage = ({ receiverId }) => {
  const databaseInstance = firebase.firestore();
  const currentUser = firebase.auth().currentUser;
  const chatId = `${receiverId}${currentUser.uid}`;
  const randomKey = Math.floor(Math.random() * 1000000000);

  databaseInstance
    .collection("chats")
    .doc(chatId)
    .update({
      [randomKey]: {
        message: "testeeee",
        receiverId,
        senderId: currentUser.uid
      }
    });
};

const Chat = () => {
  const [{ pinOpened }, dispatch] = useStateValue();
  const { authorId } = pinOpened;

  useEffect(() => {
    initChat({ receiverId: authorId });
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
    </div>
  );
};

export default Chat;
