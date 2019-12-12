import React from "react";

import "./Adopt.scss";

// Components
import Bar from "../../components/Bar";
import PageTitle from "../../components/PageTitle";
import CardList2 from "../../components/CardList/CardList2";

const Adopt = () => {
  return (
    <div className="adopt">
      <PageTitle title="Adoção e apadrinhamento de bichinhos" />
      <div className="filter">
        <div className="select-wrapper">
          <select name="" id="" className="select">
            <option value="" defaultValue>
              Tipo
            </option>
            <option value="">Cachorros</option>
            <option value="">Gatos</option>
          </select>
        </div>
        <div className="select-wrapper">
          <select name="" id="" className="select">
            <option value="">Porte</option>
            <option value="">Pequeno</option>
            <option value="">Médio</option>
            <option value="">Grande</option>
          </select>
        </div>
        <div className="select-wrapper">
          <select name="" id="" className="select">
            <option value="">Sexo</option>
            <option value="">Macho</option>
            <option value="">Fêmea</option>
          </select>
        </div>
      </div>
      <CardList2 />
      <Bar />
    </div>
  );
};

export default Adopt;
