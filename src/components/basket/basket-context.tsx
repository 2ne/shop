import React, { createContext, useContext, useState } from "react";

export interface BasketItem {
  id: string;
  title: string;
  subTitle?: string;
  image?: string;
  dates?: string;
  price?: string;
  cost?: string;
  billing?: string;
  requiredProduct?: BasketItem;
}

interface BasketContextValue {
  isOpen: boolean;
  openBasket: () => void;
  closeBasket: () => void;
  basketItems: BasketItem[];
  addItem: (item: BasketItem) => void;
  removeItem: (itemId: string) => void;
  itemCount: () => number;
  addRequiredProducts: () => void;
}

const BasketContext = createContext<BasketContextValue | null>(null);

export const useBasketContext = () => {
  const context = useContext(BasketContext);
  if (!context) {
    throw new Error("useBasketContext must be used within a BasketProvider");
  }
  return context;
};

export const BasketProvider: React.FC = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [items, setItems] = useState<BasketItem[]>([]);

  const openBasket = () => {
    setIsOpen(true);
  };

  const closeBasket = () => {
    setIsOpen(false);
  };

  const addItem = (item: BasketItem) => {
    setItems((prevItems) => [...prevItems, item]);
  };

  const removeItem = (itemId: string) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
  };

  const itemCount = () => {
    return items.length;
  };

  const addRequiredProducts = () => {
    setItems((prevItems) => {
      const newItems = [...prevItems];

      prevItems.forEach((item) => {
        if (item.requiredProduct) {
          const requiredProductId = item.requiredProduct.id;
          const isRequiredProductInBasket = newItems.some(
            (basketItem) => basketItem.id === requiredProductId
          );

          if (!isRequiredProductInBasket) {
            newItems.push(item.requiredProduct);
          }
        }
      });

      return newItems;
    });
  };

  return (
    <BasketContext.Provider
      value={{
        isOpen,
        openBasket,
        closeBasket,
        basketItems: items,
        addItem,
        removeItem,
        itemCount,
        addRequiredProducts,
      }}
    >
      {children}
    </BasketContext.Provider>
  );
};
