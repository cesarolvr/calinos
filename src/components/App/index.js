import React from "react";
import { BrowserRouter as Router } from "react-router-dom";

// Routes
import Routes from "../../utils/routes";

// Styles
import "./App.css";

const App = () => {
  return (
    <Router>
      <div className="wrapper">App</div>
      <Routes />
    </Router>
  );
};

export default App;
