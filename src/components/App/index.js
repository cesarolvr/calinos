import React, { useEffect } from "react";
import { withRouter } from "react-router";
import classNames from "classnames";
import { Link } from "react-router-dom";

// TODO: refatorar esse App. Ele é mais um wrapper do que um componente

// State
import { useStateValue } from "../../state";

// Routes
import Routes from "../../utils/routes";

// Components
import Bar from "../../components/Bar";
import Menu from "../../components/Menu";

import logoLoading from "../../assets/images/logo-full.svg";

// Styles
import "./App.scss";
import "./LoginAnimation.scss";

// Utils
import { isAuthed } from "../../utils/auth";
import isHome from "../../utils/isHome";

const App = ({ firebaseprops, location }) => {
  const [
    { pinOpened, menuOpened, aplicationLoaded, loginSelected },
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
    }, 1000);
  }, []);

  return (
    <>
      <div className="locker">
        <img src={logoLoading} alt="" />
        <p>Acesse através de um dispositivo móvel</p>
      </div>
      <div
        className={classNames("wrapper", {
          "-opened": menuOpened,
          "-pin-opened": !!pinOpened,
          "-loaded": !!aplicationLoaded && !loginSelected,
          "-login-selected": !!loginSelected
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
        <div
          className="page-holder"
          onClick={() => {
            if (menuOpened) {
              toggleMenu();
            }
          }}
        >
          <Routes />
          {isAuthed(firebaseprops) && isHomepage && <Bar />}
        </div>
      </div>
    </>
  );
};

export default withRouter(App);
