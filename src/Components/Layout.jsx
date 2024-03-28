import React from "react";

const Layout = ({ children, className = "" }) => {
  return <div className={`flex flex-col ${className}`}>{children}</div>;
};

export default Layout;
