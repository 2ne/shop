import { Drawer } from "antd";
import React from "react";
import { useMediaQuery } from "react-responsive";
import { useBasketContext } from "./basket-context";
import Basket from "./basket";
import { useCheckoutContext } from "../checkout/checkout-context";

const BasketDrawer: React.FC = () => {
  const { isCheckout } = useCheckoutContext();
  const { isOpen, closeBasket, items } = useBasketContext();
  const isMobile = useMediaQuery({ maxWidth: 1023 });
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
      zIndex={30}
      rootClassName={isCheckout ? "max-lg:bottom-[8.35rem]" : " "}
    >
      <Basket />
    </Drawer>
  );
};

export default BasketDrawer;
