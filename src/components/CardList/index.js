import React from "react";

import userPhoto from "../../assets/images/woman-user-photo.png";
import dogPhoto from "../../assets/images/dog-photo.png";

const CardList = ({ type = 1 }) => {
  return (
    <ul className="card-list">
      <li className="item">
        {type === 1 && (
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
        )}
        <div className="card-body">
          <div className="slider">
            <img src={dogPhoto} alt="" />
          </div>
          {type === 1 && (
            <div className="control">
              <button className="button">Presentear Fred</button>
              <button className="button">Perguntar sobre Fred</button>
            </div>
          )}
          {type === 2 && (
            <div className="panel">
              Fred
            </div>
          )}
        </div>
      </li>
    </ul>
  );
};

export default CardList;
