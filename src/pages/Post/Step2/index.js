import React from "react";

const Step2 = ({ nextStep, prevStep }) => (
  <div className="panel post">
    <button type="button" className="button -secondary" onClick={prevStep}>
      Voltar
    </button>
    <button className="button" onClick={nextStep}>
      Próximo
    </button>
  </div>
);

export default Step2;
