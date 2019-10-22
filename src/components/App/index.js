import React, { useEffect } from "react";
import { withRouter } from "react-router";
import classNames from "classnames";
import { Link } from "react-router-dom";

// State
import { useStateValue } from "../../state";

// Routes
import Routes from "../../utils/routes";

// Components
import Bar from "../../components/Bar";
import Menu from "../../components/Menu";

// Styles
import "./App.scss";
import "./LoginAnimation.scss";

// Utils
import { isAuthed } from "../../utils/auth";
import isHome from "../../utils/isHome";

const App = ({ firebaseprops, location }) => {
  const [
    { pinOpened, menuOpened, aplicationLoaded },
    dispatch
  ] = useStateValue();

  const isHomepage = isHome(location.pathname);

  const toggleMenu = () => {
    dispatch({
      type: "setMenuOpened",
      menuOpened: !menuOpened
    });
  };

  const triggerAnimation = () => {
    dispatch({
      type: "setAplicationLoaded",
      aplicationLoaded: !aplicationLoaded
    });
  };

  useEffect(() => {
    setTimeout(() => {
      triggerAnimation();
    }, 500);
  }, []);

  return (
    <div
      className={classNames("wrapper", {
        "-opened": menuOpened,
        "-pin-opened": !!pinOpened,
        "-loaded": !!aplicationLoaded,
        "-loading": !aplicationLoaded
      })}
    >
      {isAuthed(firebaseprops) && isHomepage && (
        <>
          <Link className="create-post" to="/post">
            Alertar
          </Link>
          <div className="menu-toggle" onClick={toggleMenu} />
        </>
      )}
      <Menu toggleMenu={toggleMenu} />
      <div className="page-holder">
        <Routes />
        {isAuthed(firebaseprops) && isHomepage && <Bar />}
      </div>
    </div>
  );
};

export default withRouter(App);
