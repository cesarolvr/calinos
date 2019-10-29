import React from "react";
import { withRouter } from "react-router";

const Step0 = ({ nextStep, history }) => (
  <div className="page panel post -intro">
    <div className="banner"></div>
    <div className="content">
      <button
        className="button cancel"
        onClick={() => {
          history.goBack();
        }}
      ></button>
      <h1 className="title">Vamos lá!</h1>
      <p className="description">
        Para que possamos achar juntos o seu bichinho, precisamos do maior
        número de informações possíveis.
      </p>
      <p className="description">
        O bichinho é seu ou você apenas viu um animal perdido na rua?
      </p>
      <button className="button -option-1" onClick={nextStep}>
        O animal é meu
      </button>
      <button className="button -option-2" onClick={nextStep}>
        Vi o animal na rua
      </button>
    </div>
  </div>
);

export default withRouter(Step0);
