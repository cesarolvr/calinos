import React from "react";

const Step0 = ({ nextStep }) => (
  <div className="panel post">
    <h1>Vamos lá!</h1>
    <p className="description">
      Para que possamos achar juntos o seu bichinho, precisamos do maior número
      de informações possíveis.
    </p>
    <button className="button" onClick={nextStep}>
      Começar
    </button>
  </div>
);

export default Step0;
