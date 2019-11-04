import React from "react";

// State
import { useStateValue } from "../../../state";

import { Link } from "react-router-dom";

const Step4 = () => {

  const [
    { pinOpened },
    dispatch
  ] = useStateValue();

  // const {
  //   animal = {},
  //   ownerName = "",
  //   id: postId,
  //   postType = ""
  // } = post;
  // const { name = "", breed = "", color = "", gender = "", type = "" } = animal;

  console.log(pinOpened);
  

  const sharePostLabels = () => {
    // const the = gender === "M" ? "O" : "A";
    // const animalType = type === "cat" ? "gatinh" : "cachorrinh";
    // return {
    //   title: `Ajude um animalzinho perdido.`,
    //   description: `${the} ${animalType}${the.toLowerCase()} ${name.trim()} desapareceu </3. Compartilhe a notícia.`
    // };
    return {
      title: '',
      description: ''
    }
  };
  return (
    <div className="panel post -final">
      <div className="banner"></div>
      <div className="content">
        <h1 className="title">Feito!</h1>
        <p className="description">
          A notícia sobre seu bichinho foi postada para pessoas ao redor e para
          seu amigos.
        </p>
        <button
          className="button share"
          onClick={() => {
            if (navigator.share) {
              navigator
                .share({
                  title: `${sharePostLabels().title}`,
                  text: `${sharePostLabels().description}`,
                  // url: `https://www.calinos.com.br/#/publication/${id}`
                })
                .then(() => console.log("Successful share"))
                .catch(error => console.log("Error sharing", error));
            }
          }}
        >
          Compartilhar
        </button>
        <Link className="button to-home" to="/home">
          Voltar para home
        </Link>
      </div>
    </div>
  );
};

export default Step4;
