import React from "react";

const Button = ({ children, className, ...rest }) => {
  return (
    <div
      className={`bg-[#33adff] cursor-pointer rounded-[4px] text-white justify-center font-bold px-[16.5px] py-[13px] flex ${className}`}
      {...rest}
    >
      {children}
    </div>
  );
};

export default Button;
