import React from "react";

import "./Page.scss";

const Page = ({ children, name }) => {
  return <div className={`page ${name}`}>{children}</div>;
};

export default Page;
