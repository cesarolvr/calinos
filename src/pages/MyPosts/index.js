import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";

// Components
import Bar from "../../components/Bar";
import MenuButton from "../../components/MenuButton";

// State
import { useStateValue } from "../../state";

// Styles
import "./MyPosts.scss";

// Firebase
import firebase from "firebase/app";

const MyPosts = ({ history }) => {
  const [myPosts, setMyPosts] = useState([]);
  const [_, dispatch] = useStateValue();

  const getMyPosts = () => {
    const db = firebase.firestore();
    const currentUser = firebase.auth().currentUser;
    db.collection("posts")
      .where("authorId", "==", currentUser.uid)
      .get()
      .then(querySnapshot => {
        if (querySnapshot.empty) return false;
        const newPosts = querySnapshot.docs.map(doc => doc.data());
        setMyPosts([...myPosts, ...newPosts]);
      })
      .catch(console.log);
  };
  useEffect(() => {
    getMyPosts();
  }, []);
  

  const setChat = marker => {
    const { id } = marker
    
    dispatch({
      type: "setPinOpened",
      pinOpened: marker
    });
    history.push(`/chat/${id}`);
  };

  return (
    <div className="panel publications">
      <MenuButton />
      <div className="content">
        <h1 className="title">Publicações</h1>
        <ul className="post-list">
          {myPosts.map((item, index) => {
            const { animal = {}, local = {}, photos = [] } = item;
            const {
              name = ''
            } = animal
            const {
              comment = ''
            } = local
            
            return (
              <li className="post" key={index} onClick={() => setChat(item)}>
                <div className="photo">
                  <img src={photos[0]} alt=""/>
                </div>
                <div className="info">
                  <h3 className="title">{ name }</h3>
                  <p className="description">
                    {comment}
                  </p>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
      <Bar fixed />
    </div>
  );
};

export default withRouter(MyPosts);
