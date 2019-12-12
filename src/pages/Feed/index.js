import React, { useEffect } from "react";
import murphy from "murphyjs";


// Components
import Bar from "../../components/Bar";
import PageTitle from '../../components/PageTitle'
import CardList from '../../components/CardList/CardList1'

import './Feed.scss'

const Feed = () => {
  useEffect(() => {
    murphy.play()
  }, []);
  return (
    <div className="feed">
      <PageTitle title="Favoritos" />
      <CardList />
      <Bar />
    </div>
  );
};

export default Feed;
