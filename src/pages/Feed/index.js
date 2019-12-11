import React from "react";

import userPhoto from "../../assets/images/woman-user-photo.png";
import dogPhoto from "../../assets/images/dog-photo.png";

// Components
import Bar from "../../components/Bar";

import './Feed.scss'

const Feed = () => {
  return (
    <div className="feed">
      <h1 className="page-title">Feed</h1>
      <ul className="card-list">
        <li className="item">
          <div className="card-header">
            <div className="holder">
              <img src={userPhoto} alt="" />
            </div>
            <div className="holder">
              <div className="name">Maria Fernanda</div>
              <div className="description">
                Perdeu o <strong>Fred</strong> em Santo Amaro
              </div>
            </div>
          </div>
          <div className="card-body">
            <div className="slider">
              <img src={dogPhoto} alt="" />
            </div>
            <div className="control">
              <button className="button">Presentear Fred</button>
              <button className="button">Perguntar sobre Fred</button>
            </div>
          </div>
        </li>
      </ul>
      <Bar />
    </div>
  );
};

export default Feed;
