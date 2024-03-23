import React from "react";
import Login from "../screens/login";
import User from "../screens/user/index";

const Container = () => {
  const accessDetails = localStorage.getItem("role_access");

  if (!accessDetails) return <Login />;

  if (accessDetails === "user") return <User />;

  return <div>Some thing went wrong</div>;
};

export default Container;
