import React from "react";

import './PageTitle.scss'

const PageTitle = ({ title = "" }) => (
  <h1 className="page-title" >{title}</h1>
);

export default PageTitle;
