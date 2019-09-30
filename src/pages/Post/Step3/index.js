import React from "react";

const Step3 = ({ prevStep, nextStep }) => (
  <div className="panel post">
    <h1>Adicione fotos do seu bichinho</h1>
    <button type="button" className="button -secondary" onClick={prevStep}>
      Voltar
    </button>
    <button className="button" onClick={nextStep}>
      Próximo
    </button>
  </div>
);

export default Step3;
