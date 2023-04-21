import React, { createContext, useContext, useState } from "react";

export interface BasketItem {
  id: string;
  image: string;
  title: string;
  subTitle: string;
  dates?: string;
  price?: string;
  cost?: string;
  billing?: string;
  requiredProduct?: BasketItem;
  isVisible?: boolean;
}

interface BasketContextValue {
  isOpen: boolean;
  openBasket: () => void;
  closeBasket: () => void;
  basketItems: BasketItem[];
  addItem: (item: BasketItem) => void;
  removeItem: (itemId: string) => void;
  basketItemsCount: () => number;
  showRequiredProduct: (itemId: string) => void;
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
    setItems((prevItems) => {
      const newItems = [...prevItems, { ...item, isVisible: true }];
      if (item.requiredProduct) {
        newItems.push({ ...item.requiredProduct, isVisible: false });
      }
      return newItems;
    });
  };

  const removeItem = (itemId: string) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
  };

  const basketItemsCount = () => {
    return items.filter((item) => item.isVisible).length;
  };

  const showRequiredProduct = (itemId: string) => {
    setItems((prevItems) =>
      prevItems.map((item) => {
        if (item.id === itemId && item.requiredProduct) {
          return {
            ...item,
            requiredProduct: { ...item.requiredProduct, isVisible: true },
          };
        }
        return item;
      })
    );
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
        basketItemsCount: basketItemsCount,
        showRequiredProduct,
      }}
    >
      {children}
    </BasketContext.Provider>
  );
};
