import React, { useEffect, useState } from "react";
import firebase from "firebase/app";

// State
import { useStateValue } from "../../state";

const Chat = ({  }) => {
  const [{ pinOpened }, dispatch] = useStateValue();
  const [localChats, setLocalChats] = useState([]);
  const { authorId } = pinOpened;

  const initTalk = ({ receiverId }) => {
    const databaseInstance = firebase.firestore();
    const currentUser = firebase.auth().currentUser;
    const chatId = `${currentUser.uid}${receiverId}`;

    databaseInstance
      .collection("chats")
      .doc(chatId)
      .get()
      .then(doc => {
        if (!doc || !doc.data()) return;
        console.log(doc);
        
        // const currentMessages = doc.data().messages;
        // if (currentMessages && currentMessages.length > 0) {
        //   setLocalMessages([...currentMessages, ...localMessages]);
        // }
      });
  };

  useEffect(() => {
    initTalk({ receiverId : '' });
  }, []);
  return (
    <div className="panel messages">
      Mensagens
      
      <ul>
        {localChats &&
          localChats.map(({ message, date }, index) => (
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
