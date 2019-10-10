import React, { useEffect, useState } from "react";
import firebase from "firebase/app";
// import history from '../../utils/history';
import { withRouter } from "react-router-dom";


// State
import { useStateValue } from "../../state";

const Messages = ({ history, ...props }) => {
  const [_, dispatch] = useStateValue();
  const [localChats, setLocalChats] = useState([]);
  const currentUser = firebase.auth().currentUser;

  const loadChats = () => {
    const databaseInstance = firebase.firestore();

    databaseInstance
      .collection("users")
      .where("id", "==", currentUser.uid)
      .get()
      .then(querySnapshot => {
        if (querySnapshot.empty) return false;
        querySnapshot.forEach(snapshot => {
          if (snapshot.data()) {
            setLocalChats(snapshot.data().messages);
          }
        });
      });
  };

  useEffect(() => {
    loadChats();
  }, []);
  

  return (
    <div className="panel messages">
      Mensagens
      <ul>
        {localChats &&
          localChats.map(({ email, id }, index) => (
            <li
              key={index}
              onClick={() => {
                dispatch({
                  type: "setActiveChat",
                  activeChat: `${currentUser.uid}${id}`,
                  receiver: id
                });
                history.push('/chat')
              }}
            >
              <h3>{email}</h3>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default withRouter(Messages);
