import React from "react";

import { Link } from "react-router-dom";

// State
import { useStateValue } from "../../../state";

const Step4 = () => {
  const [{ postUploaded }, dispatch] = useStateValue();
  console.log(postUploaded);
  return (
    <div className="panel post -final">
      <div className="banner"></div>
      <div className="content">
        <h1 className="title">Feito!</h1>
        <p className="description">
          A notícia sobre esse bichinho foi postada para pessoas ao redor e para
          seu amigos.
        </p>
        <button
          className="button share"
          onClick={() => {
            if (navigator.share) {
              navigator
                .share({
                  title: `Ajude um animalzinho perdido.`,
                  text: `Um bichinho desapareceu </3. Compartilhe a notícia.`,
                  url: `https://www.calinos.com.br/#/publication/${postUploaded}`
                })
                .then(() => console.log("Successful share"))
                .catch(error => console.log("Error sharing", error));
            }
          }}
        >
          Compartilhar
        </button>
        <Link className="button to-home" to="/inicio">
          Voltar para home
        </Link>
      </div>
    </div>
  );
};

export default Step4;
