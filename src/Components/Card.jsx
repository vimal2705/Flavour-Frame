import React from "react";
const Card = ({ children, className }) => {
  return (
    <div
      className={`p-4 rounded-md ${className}`}
      style={{
        boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
      }}
    >
      {children}
    </div>
  );
};

export default Card;
