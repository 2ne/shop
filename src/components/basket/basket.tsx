import { Drawer } from "antd";
import React from "react";
import { useMediaQuery } from "react-responsive";
import { useBasketContext } from "./basket-context";

const Basket: React.FC = () => {
  const { isOpen, closeBasket } = useBasketContext();
  const isMobile = useMediaQuery({ maxWidth: 639 });
  const drawerPlacement = isMobile ? "bottom" : "right";

  return (
    <Drawer
      title="Basket"
      placement={drawerPlacement}
      onClose={closeBasket}
      open={isOpen}
    >
      <p>Some contents...</p>
    </Drawer>
  );
};

export default Basket;
