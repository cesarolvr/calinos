import React from "react";

const Step4 = ({ setStep, formValue, setFormValue }) => (
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
    <button className="button -disable">Voltar para home</button>
  </div>
);

export default Step4;
