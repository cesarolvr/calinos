import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Icon } from "antd";

// Firebase
import firebase from "firebase/app";

// Styles
import "./Publication.scss";

const Publication = () => {
  const { id = "" } = useParams();
  const [post, setPost] = useState({});

  const getPost = () => {
    const databaseInstance = firebase.firestore();
    databaseInstance
      .collection("posts")
      .where("id", "==", id)
      .get()
      .then(querySnapshot => {
        if (querySnapshot.empty) return false;
        querySnapshot.forEach(snapshot => {
          if (snapshot.data()) {
            setPost(snapshot.data());
          }
        });
      })
      .catch(console.log);
  };

  useEffect(() => {
    getPost();
  }, []);

  return (
    <div className="publication">
      <div className="back"></div>
      <div className="slider"></div>
      <div className="content">
        <div className="header">
          <div className="title">Fred</div>
          <div className="share">Compartilhar</div>
        </div>
        <ul className="details-list">
          <li className="item">
            <Icon type="info-circle" />
            Labrador amarelo
          </li>
          <li className="item">
            <Icon type="info-circle" />
            Estação Santo Amaro
          </li>
          <li className="item">
            <Icon type="info-circle" />
            Maria Fernanda é a dona
          </li>
          <li className="item">
            <Icon type="info-circle" />
            Fred é macho
          </li>
        </ul>
        <p className="comment">
          O Fred fugiu da casa de sua dona Fernanda ontem por voltar das 20h00,
          próximo à estação.
        </p>
        <div className="control">
          <button className="button">Ver discussão</button>
          <button className="button -call">Ligar para o dono</button>
        </div>
      </div>
    </div>
  );
};

export default Publication;
