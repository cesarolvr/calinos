import React from "react";
import { withRouter } from "react-router-dom";

const Messages = ({ history }) => {
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
    </div>
  );
};

export default withRouter(Messages);
