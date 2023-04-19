import React, { createContext, useContext, useState } from "react";

interface Item {
  id: string;
  image: string;
  title: string;
  subTitle: string;
  dates: string;
  price: string;
  cost: string;
  billing: string;
}

interface BasketContextValue {
  isOpen: boolean;
  openBasket: () => void;
  closeBasket: () => void;
  items: Item[];
  addItem: (item: Item) => void;
  removeItem: (itemId: string) => void;
  itemCount: () => number;
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
  const [items, setItems] = useState<Item[]>([]);

  const openBasket = () => {
    setIsOpen(true);
  };

  const closeBasket = () => {
    setIsOpen(false);
  };

  const addItem = (item: Item) => {
    setItems((prevItems) => [...prevItems, item]);
  };

  const removeItem = (itemId: string) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
  };

  const itemCount = () => {
    return items.length;
  };

  return (
    <BasketContext.Provider
      value={{
        isOpen,
        openBasket,
        closeBasket,
        items,
        addItem,
        removeItem,
        itemCount,
      }}
    >
      {children}
    </BasketContext.Provider>
  );
};
