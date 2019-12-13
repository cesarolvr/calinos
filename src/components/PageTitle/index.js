import React from "react";

import "./PageTitle.scss";

const PageTitle = ({ title = "", subtitle }) => (
  <h1 className="page-title">
    {title}
    {subtitle && <small>{subtitle}</small>}
  </h1>
);

export default PageTitle;
