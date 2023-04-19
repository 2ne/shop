import { Drawer } from "antd";
import React from "react";
import { useMediaQuery } from "react-responsive";
import { useBasketContext } from "./basket-context";
import Basket from "./basket";

const BasketDrawer: React.FC = () => {
  const { isOpen, closeBasket, items } = useBasketContext();
  const isMobile = useMediaQuery({ maxWidth: 639 });
  const drawerPlacement = isMobile ? "bottom" : "right";

  return (
    <Drawer
      title={
        items.length === 0
          ? "Basket"
          : `Basket · ${items.length} item${items.length > 1 ? "s" : ""}`
      }
      placement={drawerPlacement}
      onClose={closeBasket}
      open={isOpen}
    >
      <Basket />
    </Drawer>
  );
};

export default BasketDrawer;
