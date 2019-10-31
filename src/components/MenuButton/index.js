import React from "react";

// State
import { useStateValue } from "../../state";

// Styles
import "./MenuButton.scss";

const MenuButton = () => {
  const [{ menuOpened }, dispatch] = useStateValue();

  const toggleMenu = () => {
    dispatch({
      type: "setMenuOpened",
      menuOpened: !menuOpened
    });
  };

  return <div className="menu-toggle" onClick={toggleMenu} />;
};

export default MenuButton;
