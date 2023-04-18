import { Button, Drawer } from "antd";
import React from "react";
import { useMediaQuery } from "react-responsive";
import { useBasketContext } from "./basket-context";

const Basket: React.FC = () => {
  const { isOpen, closeBasket, items, removeItem } = useBasketContext();
  const isMobile = useMediaQuery({ maxWidth: 639 });
  const drawerPlacement = isMobile ? "bottom" : "right";

  return (
    <Drawer
      title="Basket"
      placement={drawerPlacement}
      onClose={closeBasket}
      open={isOpen}
    >
      {items.length === 0 ? (
        <div>Your basket is empty.</div>
      ) : (
        items.map((item) => (
          <div key={item.id}>
            <img src={item.image} alt={item.title} className="rounded" />
            <div>{item.title}</div>
            <div>Price: £{item.price.toFixed(2)}</div>
            <Button onClick={() => removeItem(item.id)}>Remove Item</Button>
          </div>
        ))
      )}
      {items.length !== 0 && (
        <div className="sticky z-10 px-4 py-4 mt-auto -mx-4 -mb-4 sm:px-5 sm:-mx-5 -bottom-4 bg-white/95">
          <Button size="large" type="primary" block className="!h-10 lg:!h-12">
            <div className="text-sm sm:text-base">Checkout</div>
          </Button>
        </div>
      )}
    </Drawer>
  );
};

export default Basket;
