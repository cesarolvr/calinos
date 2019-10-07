import React, { useState } from "react";
import { withRouter } from "react-router";
import classNames from "classnames";
import { Link } from "react-router-dom";

// Routes
import Routes from "../../utils/routes";

// Components
import Bar from "../../components/Bar";
import Menu from "../../components/Menu";

// Styles
import "./App.scss";

// Utils
import { isAuthed } from "../../utils/auth";

const App = ({ firebaseprops, location }) => {
  const [menuOpened, setMenuOpened] = useState(false);

  // TODO: passa isso para utils
  const isHome = location.pathname === "/home";

  return (
    <div
      className={classNames("page", {
        "-opened": menuOpened,
      })}
    >
      {isAuthed(firebaseprops) && isHome && (
        <>
          <Link className="create-post" to="/post"></Link>
          <div
            className="menu-toggle"
            // TODO: transforma isso num reƒducer, ou usar Context
            onClick={() => setMenuOpened(!menuOpened)}
          />
          <Menu />
        </>
      )}
      <div className="page-holder">
        <Routes />
        {isAuthed(firebaseprops) && isHome && <Bar />}
      </div>
    </div>
  );
};

export default withRouter(App);
