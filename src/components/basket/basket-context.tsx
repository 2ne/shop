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

  // This function adds a participant to an time in the basket
  const addParticipant = (itemId: string, participant: Participant) => {
    // Update the basket items
    setItems((prevItems) => {
      // Create a copy of the previous basket array
      const newItems = [...prevItems];
      // Find the index of the item with the specified itemId in the new basket array
      const itemIndex = newItems.findIndex((item) => item.id === itemId);

      // Check if the item with the specified itemId exists in the new basket array
      if (itemIndex >= 0) {
        // Replace the item's participants array with an array containing the new participant
        newItems[itemIndex].participants = [participant];
      }

      // Return the updated basket array
      return newItems;
    });
  };

  // This function adds required products to the items list if they are not already present
  const addRequiredProducts = () => {
    // Update the items state using a function
    setItems((prevItems) => {
      // Create a copy of the previous items array
      const newItems = [...prevItems];

      // Iterate through each item in the previous items array
      prevItems.forEach((item) => {
        // Check if the current item has a required product
        if (item.requiredProduct) {
          // Extract the ID of the required product
          const requiredProductId = item.requiredProduct.id;
          // Check if the required product is already in the new items array
          const isRequiredProductInBasket = newItems.some(
            (basketItem) => basketItem.id === requiredProductId
          );

          // If the required product is not in the new items array, add it
          if (!isRequiredProductInBasket) {
            newItems.push(item.requiredProduct);
          }
        }
      });

      // Return the updated items array
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
