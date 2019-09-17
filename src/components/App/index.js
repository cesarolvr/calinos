import React from "react";
import { BrowserRouter as Router } from "react-router-dom";

// Routes
import Routes from "../../utils/routes";

// Styles
import "./App.css";

const App = props => {

  return (
    <Router>
      <div className="wrapper">
        <Routes />
      </div>
    </Router>
  );
};

export default App;
