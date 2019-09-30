import React from "react";

import { Link } from "react-router-dom";

const Step4 = () => (
  <div className="panel post">
    <h1>Feito!</h1>
    <p className="description">
      A notícia sobre seu bichinho foi postada para pessoas ao redor e para seu
      amigos.
    </p>
    <p className="description">
      Você pode compartilhar em outras redes para obter um alcance maior.
    </p>
    <button className="button">Compartilhar</button>
    <Link className="link" to="/home">
      Voltar para home
    </Link>
  </div>
);

export default Step4;
