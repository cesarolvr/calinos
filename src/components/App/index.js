import React, { useState } from "react";
import { withRouter } from "react-router";
import classNames from "classnames";
import { Link } from "react-router-dom";

// State
import { useStateValue } from '../../state';

// Routes
import Routes from "../../utils/routes";

// Components
import Bar from "../../components/Bar";
import Menu from "../../components/Menu";

// Styles
import "./App.scss";

// Utils
import { isAuthed } from "../../utils/auth";
import isHome from '../../utils/isHome'

const App = ({ firebaseprops, location }) => {
  const [menuOpened, setMenuOpened] = useState(false);
  const [{ pinOpened }, _] = useStateValue();

  const isHomepage = isHome(location.pathname)

  return (
    <div
      className={classNames("page", {
        "-opened": menuOpened,
        "-pin-opened": !!pinOpened
      })}
    >
      {isAuthed(firebaseprops) && isHomepage && (
        <>
          <Link className="create-post" to="/post"></Link>
          <div
            className="menu-toggle"
            // TODO: transforma isso num reducer, ou usar Context
            onClick={() => setMenuOpened(!menuOpened)}
          />
          <Menu />
        </>
      )}
      <div className="page-holder">
        <Routes />
        {isAuthed(firebaseprops) && isHomepage && <Bar />}
      </div>
    </div>
  );
};

export default withRouter(App);
