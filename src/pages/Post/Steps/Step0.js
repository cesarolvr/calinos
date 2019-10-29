import React from "react";
import { withRouter } from "react-router";

const Step0 = ({ nextStep, history, prevStep, formValue, setFormValue }) => (
  <div className="page panel post -intro">
    <div className="banner"></div>
    <div className="content">
      <button
        className="cancel"
        onClick={() => {
          history.goBack();
        }}
      ></button>
      <h1 className="title">Vamos lá!</h1>
      <p className="description">
        Para que seu bichinho possa ser achado, precisamos de alguns dados.
      </p>
      <p className="description">
        O animal é seu ou você apenas o viu perdido na rua?
      </p>
      <button className="button -option-1" onClick={() => {
        setFormValue({
          ...formValue,
          postType: 'lost'
        });
        nextStep();
      }}>
        O animal é meu
      </button>
      <button className="button -option-2" onClick={() => {
        setFormValue({
          ...formValue,
          postType: 'abandoned'
        });
        nextStep();
      }}>
        Vi o animal na rua
      </button>
    </div>
  </div>
);

export default withRouter(Step0);
