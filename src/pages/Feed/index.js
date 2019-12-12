import React from "react";

// Components
import Bar from "../../components/Bar";
import PageTitle from '../../components/PageTitle'
import CardList from '../../components/CardList/CardList1'

import './Feed.scss'

const Feed = () => {
  return (
    <div className="feed">
      <PageTitle title="Feed" />
      <CardList />
      <Bar />
    </div>
  );
};

export default Feed;
