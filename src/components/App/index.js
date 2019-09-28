import React, { useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";
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

const App = ({ firebaseprops }) => {
  const [menuOpened, setMenuOpened] = useState(false);
  
  

  return (
    <Router>
      <div
        className={classNames("page", {
          "-opened": menuOpened
        })}
      >
        <Link className="create-post" to="/post"></Link>
        {isAuthed(firebaseprops) && (
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
    </Router>
  );
};

export default App;
