import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Icon } from "antd";
import Glide from "@glidejs/glide";
import { Link } from "react-router-dom";

// Utils
import getGender from "../../utils/getGender";

// Firebase
import firebase from "firebase/app";

// Styles
import "./Publication.scss";

const Publication = ({ history }) => {
  const { id = "" } = useParams();
  const [post, setPost] = useState({});

  const {
    animal = {},
    ownerName = "",
    local = {},
    photos = [],
    id: postId
  } = post;
  const { name = "", breed = "", color = "", gender = "", type = "" } = animal;
  const { comment = "", contactPhone = "" } = local;

  const getPost = () => {
    const databaseInstance = firebase.firestore();
    // TODO: abstrair essas chamadas no DB
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

  const sharePostLabels = () => {
    const the = gender === "M" ? "O" : "A";
    const animalType = type === "cat" ? "gatinh" : "cachorrinh";
    return {
      title: `Ajude um animalzinho perdido.`,
      description: `${the} ${animalType}${the.toLowerCase()} ${name.trim()} desapareceu </3. Compartilhe a notícia.`
    };
  };

  useEffect(() => {
    getPost();
  }, []);

  useEffect(() => {
    new Glide(".slider", {
      gap: 0
    }).mount();
  }, [photos]);

  return (
    <div className="publication">
      <button
        className="back"
        onClick={() => {
          history.push("/inicio");
        }}
      >
        <Icon type="left" />
      </button>
      <div className="slider">
        <div data-glide-el="track" className="glide__track">
          <ul className="glide__slides">
            {photos.map((photo, index) => (
              <li className="glide__slide" key={index}>
                <img src={photo} className="image" />
              </li>
            ))}
          </ul>
          <div className="glide__bullets" data-glide-el="controls[nav]">
            {photos.map((item, index) => {
              return (
                <button
                  key={index}
                  className="glide__bullet"
                  data-glide-dir={`=${index}`}
                ></button>
              );
            })}
          </div>
        </div>
      </div>
      <div className="content">
        <div className="header">
          <div className="title">{name}</div>
          <div
            className="share"
            onClick={() => {
              if (navigator.share) {
                navigator
                  .share({
                    title: `${sharePostLabels().title}`,
                    text: `${sharePostLabels().description}`,
                    url: `https://www.calinos.com.br/#/publicacao/${id}`
                  })
                  .then(() => console.log("Successful share"))
                  .catch(error => console.log("Error sharing", error));
              }
            }}
          >
            Compartilhar
            <Icon type="share-alt" />
          </div>
        </div>
        <ul className="details-list">
          <li className="item">
            <Icon type="gitlab" theme="filled" />
            {name} é um {breed} {color.toLowerCase()}
          </li>
          <li className="item">
            <Icon type="environment" theme="filled" />
            {(local && local.street) || ""}
          </li>
          <li className="item">
            <Icon type="user" />
            {ownerName && ownerName.split(" ")[0]} é a pessoa responsável
          </li>
          <li className="item">
            {getGender(gender) &&
            getGender(gender).toLowerCase() === "fêmea" ? (
              <Icon type="woman" />
            ) : (
              <Icon type="man" />
            )}
            {name} é {getGender(gender).toLowerCase()}
          </li>
        </ul>
        <p className="comment">{comment}</p>
        <div className="control">
          <Link className="button" to={`/chat/${postId}`}>
            Ver discussão
          </Link>
          <a href={`tel:+${contactPhone}`} className="button -call">
            Ligar para o dono
          </a>
        </div>
      </div>
    </div>
  );
};

export default Publication;
