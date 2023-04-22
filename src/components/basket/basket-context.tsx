import React, { createContext, useContext, useState } from "react";

import {
  Participant,
  BasketItem,
  medicalInfo,
  EmergencyContact,
  ConsentForm,
  AdditionalForm,
  UploadedFile,
} from "../../types/types";

interface BasketContextValue {
  isOpen: boolean;
  openBasket: () => void;
  closeBasket: () => void;
  basketItems: BasketItem[];
  addItem: (item: BasketItem) => void;
  removeItem: (itemId: string) => void;
  itemCount: () => number;
  addParticipant: (itemId: string, participant: Participant) => void;
  addRequiredProducts: () => void;
  addMedicalInfo: (itemId: string, medicalInfo: medicalInfo) => void;
  addEmergencyContact: (
    itemId: string,
    emergencyContact: EmergencyContact
  ) => void;
  addConsentForm: (itemId: string, consentForm: ConsentForm) => void;
  addAdditionalForm: (itemId: string, additionalForm: AdditionalForm) => void;
  addUploadedFile: (itemId: string, uploadedFile: UploadedFile) => void;
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
      const updatedItem = item.requiredProduct
        ? {
            ...item,
            requiredProduct: {
              ...item.requiredProduct,
              isRequiredProduct: true,
            },
          }
        : item;

      return [...prevItems, updatedItem];
    });
  };

  const removeItem = (itemId: string) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
  };

  const itemCount = () => {
    return items.length;
  };

  const addParticipant = (itemId: string, participant: Participant) => {
    setItems((prevItems) => {
      const newItems = [...prevItems];
      const itemIndex = newItems.findIndex((item) => item.id === itemId);
      if (itemIndex >= 0) {
        // Replace the item's participants array with the new participant
        newItems[itemIndex].participants = [participant];
      }
      return newItems;
    });
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

  const addMedicalInfo = (itemId: string, medicalInfo: medicalInfo) => {
    setItems((prevItems) => {
      const newItems = [...prevItems];
      const itemIndex = newItems.findIndex((item) => item.id === itemId);
      if (itemIndex >= 0) {
        newItems[itemIndex].medicalInfo = [
          ...(newItems[itemIndex].medicalInfo || []),
          medicalInfo,
        ];
      }
      return newItems;
    });
  };

  const addEmergencyContact = (
    itemId: string,
    emergencyContact: EmergencyContact
  ) => {
    setItems((prevItems) => {
      const newItems = [...prevItems];
      const itemIndex = newItems.findIndex((item) => item.id === itemId);
      if (itemIndex >= 0) {
        newItems[itemIndex].emergencyContact = [
          ...(newItems[itemIndex].emergencyContact || []),
          emergencyContact,
        ];
      }
      return newItems;
    });
  };

  const addConsentForm = (itemId: string, consentForm: ConsentForm) => {
    setItems((prevItems) => {
      const newItems = [...prevItems];
      const itemIndex = newItems.findIndex((item) => item.id === itemId);
      if (itemIndex >= 0) {
        newItems[itemIndex].consentForms = [
          ...(newItems[itemIndex].consentForms || []),
          consentForm,
        ];
      }
      return newItems;
    });
  };

  const addAdditionalForm = (
    itemId: string,
    additionalForm: AdditionalForm
  ) => {
    setItems((prevItems) => {
      const newItems = [...prevItems];
      const itemIndex = newItems.findIndex((item) => item.id === itemId);
      if (itemIndex >= 0) {
        newItems[itemIndex].additionalForms = [
          ...(newItems[itemIndex].additionalForms || []),
          additionalForm,
        ];
      }
      return newItems;
    });
  };

  const addUploadedFile = (itemId: string, uploadedFile: UploadedFile) => {
    setItems((prevItems) => {
      const newItems = [...prevItems];
      const itemIndex = newItems.findIndex((item) => item.id === itemId);
      if (itemIndex >= 0) {
        newItems[itemIndex].uploadedFiles = [
          ...(newItems[itemIndex].uploadedFiles || []),
          uploadedFile,
        ];
      }
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
        addParticipant,
        addRequiredProducts,
        addMedicalInfo,
        addEmergencyContact,
        addConsentForm,
        addAdditionalForm,
        addUploadedFile,
      }}
    >
      {children}
    </BasketContext.Provider>
  );
};
