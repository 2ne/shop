import React, { forwardRef, useImperativeHandle, useState } from "react";
import FormHeader from "../form-header";
import { useBasketContext } from "../basket/basket-context";
import { Participant } from "../../types/types";
import { Button } from "antd";

export interface CheckoutAdditionalProductsHandles {
  submitForm: () => Promise<boolean>;
}

interface CheckoutAdditionalProductsProps {
  title: string;
  subtitle: string;
  onFormValidation: (isValid: boolean) => void;
}

const CheckoutAdditionalProducts = forwardRef<
  CheckoutAdditionalProductsHandles,
  CheckoutAdditionalProductsProps
>(
  (
    { onFormValidation, title, subtitle }: CheckoutAdditionalProductsProps,
    ref: React.Ref<CheckoutAdditionalProductsHandles>
  ) => {
    const [addItemToBasket, setAddItemToBasket] = useState<boolean | null>(
      null
    );
    const { basketItems, addRequiredProducts } = useBasketContext();

    useImperativeHandle(ref, () => ({
      submitForm: async () => {
        // Only set the form as valid if an item has been added to the basket
        if (addItemToBasket) {
          onFormValidation(true);
          console.log("Add required products:", basketItems);

          // Return true to indicate that the form submission was successful
          return true;
        } else {
          onFormValidation(false);
          setAddItemToBasket(false);
          return false;
        }
      },
    }));

    const handleAddItem = () => {
      setAddItemToBasket(true);
      // Add the linked required products from items already in the basket
      addRequiredProducts();
    };

    const basketButtonClasses =
      addItemToBasket &&
      "pointer-events-none !bg-emerald-600 !text-white !border-emerald-600";

    const basketButtonText = addItemToBasket ? "Added" : "Add to basket";

    return (
      <>
        <FormHeader
          title={title}
          subtitle={subtitle}
          icon={
            <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M12 5.75V18.25"
              ></path>
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M18.25 12L5.75 12"
              ></path>
            </svg>
          }
        />
        {/* Look through basket items and show the required product for each */}
        {basketItems.map((item) => {
          const requiredProduct = item.requiredProduct;
          const itemParticipants = item.participants || [];
          if (!requiredProduct) {
            return null;
          }
          return (
            <div
              key={requiredProduct.id}
              className={`p-4 space-y-4 text-sm text-left border rounded-md ${
                addItemToBasket === false
                  ? " border-error "
                  : " border-neutral-200 "
              }`}
            >
              <div className="flex gap-3 pb-4 border-b">
                <img
                  src={requiredProduct.image}
                  alt={requiredProduct.title}
                  className="object-cover w-16 h-16 rounded"
                />
                <div className="grid items-center flex-1 min-w-0">
                  <div>
                    <div className="font-medium">{requiredProduct.title}</div>
                    <div className="text-neutral-500">12 months</div>
                    <div className="pt-1.5 mt-auto text-neutral-500/75">
                      {requiredProduct.cost} · per month
                    </div>
                  </div>
                </div>
              </div>
              <div className="grid gap-1.5">
                {itemParticipants.map((participant: Participant) => {
                  return (
                    <div
                      key={`${requiredProduct.id}_${participant.id}`}
                      className="flex items-center space-x-1.5"
                    >
                      <span className="text-neutral-500">Participant</span>
                      <span className="text-neutral-500">·</span>
                      <span className="font-medium">
                        {participant.firstName} {participant.lastName}
                      </span>
                    </div>
                  );
                })}
              </div>
              <div>
                <Button
                  danger={addItemToBasket === false}
                  block
                  className={`!transition-all !duration-500 ${basketButtonClasses}`}
                  onClick={handleAddItem}
                >
                  {addItemToBasket && (
                    <svg
                      width="24"
                      height="24"
                      fill="none"
                      viewBox="0 0 24 24"
                      className="mr-0.5 -ml-1"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.5"
                        d="M4.75 12A7.25 7.25 0 0112 4.75v0A7.25 7.25 0 0119.25 12v0A7.25 7.25 0 0112 19.25v0A7.25 7.25 0 014.75 12v0z"
                      ></path>
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.5"
                        d="M9.75 12.75l.434.924a1 1 0 001.772.073L14.25 9.75"
                      ></path>
                    </svg>
                  )}
                  <span>{basketButtonText}</span>
                </Button>
                {addItemToBasket === false && (
                  <div className="mt-2 text-error">Please add the product</div>
                )}
              </div>
            </div>
          );
        })}
      </>
    );
  }
);

export default CheckoutAdditionalProducts;
