import React from "react";
import { BrowserRouter as Router } from "react-router-dom";

// Routes
import Routes from "../../utils/routes";

// Styles
import "./App.scss";

const App = () => {
  return (
    <Router>
      <div className="wrapper">
        <Routes />
      </div>
    </Router>
  );
};

export default App;
