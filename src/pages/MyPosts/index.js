import React from "react";
import { withRouter } from "react-router-dom";

// Components
import Bar from "../../components/Bar";

const MyPosts = ({ history }) => {
  return (
    <div className="panel messages">
      Mensagens
      <ul>
        <li
          onClick={() => {
            history.push("/chat");
          }}
        >
          <h3>Opa</h3>
        </li>
      </ul>
      <Bar fixed />
    </div>
  );
};

export default withRouter(MyPosts);
