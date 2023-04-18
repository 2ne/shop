import React from "react";
import Basket from "./basket";

const BasketLayout: React.FC = ({ children }) => {
  return (
    <>
      {children}
      <Basket />
    </>
  );
};

export default BasketLayout;
