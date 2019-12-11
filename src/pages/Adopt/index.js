import React from "react";

// Components
import Bar from "../../components/Bar";
import PageTitle from "../../components/PageTitle";
import CardList from "../../components/CardList";

const Adopt = () => {
  return (
    <div className="adopt">
      <PageTitle title="Adoção e apadrinhamento de bichinhos" />
      <CardList type={2} />
      <Bar />
    </div>
  );
};

export default Adopt;
