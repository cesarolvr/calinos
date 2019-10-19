import React from "react";
import { withRouter } from "react-router-dom";

// Components
import Bar from "../../components/Bar";
import MenuButton from "../../components/MenuButton";

const MyPosts = ({ history }) => {
  return (
    <div className="panel messages">
      <MenuButton />
      <div className="content">
        <h1 className="title">Publicações</h1>
        <ul>
          <li
            onClick={() => {
              history.push("/chat");
            }}
          >
            <h3>Opa</h3>
          </li>
        </ul>
      </div>
      <Bar fixed />
    </div>
  );
};

export default withRouter(MyPosts);
