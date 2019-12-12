import React from "react";

import './Adopt.scss'

// Components
import Bar from "../../components/Bar";
import PageTitle from "../../components/PageTitle";
import CardList2 from "../../components/CardList/CardList2";

const Adopt = () => {
  return (
    <div className="adopt">
      <PageTitle title="Adoção e apadrinhamento de bichinhos" />
      <CardList2 />
      <Bar />
    </div>
  );
};

export default Adopt;
