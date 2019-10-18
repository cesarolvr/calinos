import React from "react";

import { Link } from "react-router-dom";

const Step4 = () => (
  <div className="panel post -final">
    <div className="banner"></div>
    <div className="content">
      <h1 className="title">Feito!</h1>
      <p className="description">
        A notícia sobre seu bichinho foi postada para pessoas ao redor e para
        seu amigos.
      </p>
      <button className="button share">Compartilhar</button>
      <Link className="button to-home" to="/home">
        Voltar para home
      </Link>
    </div>
  </div>
);

export default Step4;
