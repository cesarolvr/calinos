import React, { useEffect } from "react";
import murphy from "murphyjs";

// State
import { useStateValue } from "../../state";


// Components
import Bar from "../../components/Bar";
import PageTitle from '../../components/PageTitle'
import CardList from '../../components/CardList/CardList1'

import './Feed.scss'

const Feed = () => {
  const [
    {
      favorites
    },
    dispatch
  ] = useStateValue();
  useEffect(() => {
    murphy.play()
  }, []);
  return (
    <div className="feed">
      <PageTitle title="Favoritos" />
      <CardList data={favorites} />
      <Bar />
    </div>
  );
};

export default Feed;
