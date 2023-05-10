import React, { forwardRef, useImperativeHandle } from "react";
import FormHeader from "./checkout-header";
import { useBasketContext } from "../basket/basket-context";
import { Participant } from "../../types/types";

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
    const { basketItems, addRequiredProducts } = useBasketContext();

    useImperativeHandle(ref, () => ({
      submitForm: async () => {
        // Notify the parent component that the form is valid
        onFormValidation(true);

        // Add the linked required products from items already in the basket
        addRequiredProducts();

        console.log("Add required products:", basketItems);

        // Return true to indicate that the form submission was successful
        return true;
      },
    }));

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
              className="p-4 space-y-4 text-sm text-left border rounded-md border-neutral-200"
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
            </div>
          );
        })}
      </>
    );
  }
);

export default CheckoutAdditionalProducts;
