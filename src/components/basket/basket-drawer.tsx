import { Drawer } from "antd";
import React from "react";
import { useMediaQuery } from "react-responsive";
import { useBasketContext } from "./basket-context";
import Basket from "./basket";
import { useCheckoutContext } from "../checkout/checkout-context";

const BasketDrawer: React.FC = () => {
  const { isCheckout } = useCheckoutContext();
  const { isOpen, closeBasket, basketItemsCount } = useBasketContext();
  const isMobile = useMediaQuery({ maxWidth: 1023 });
  const drawerPlacement = isMobile ? "bottom" : "right";

  return (
    <Drawer
      title={
        basketItemsCount() === 0
          ? "Basket"
          : `Basket · ${basketItemsCount()} item${
              basketItemsCount() > 1 ? "s" : ""
            }`
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
