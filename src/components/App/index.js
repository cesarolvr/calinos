import React, { useState } from "react";
import { withRouter } from "react-router"
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

const App = ({ firebaseprops, location, ...props }) => {
  
  const [menuOpened, setMenuOpened] = useState(false);
  
  const isHome = location.pathname === '/home'
  console.log(isHome);

  return (
    <div
      className={classNames("page", {
        "-opened": menuOpened
      })}
    >
      <Link className="create-post" to="/post"></Link>
      {isAuthed(firebaseprops) && isHome && (
        <>
          <div
            className="menu-toggle"
            onClick={() => setMenuOpened(!menuOpened)}
          />
          <Menu />
        </>
      )}
      <div className="page-holder">
        <Routes />
        {isAuthed(firebaseprops) && <Bar />}
      </div>
    </div>
  );
};

export default withRouter(App);
