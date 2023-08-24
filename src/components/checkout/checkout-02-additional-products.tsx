import React, { forwardRef, useImperativeHandle, useState } from "react";
import FormHeader from "../form-header";
import { useBasketContext } from "../basket/basket-context";
import { Participant } from "../../types/types";
import { Button, Select } from "antd";
const { Option } = Select;

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

    const [selectedLabel, setSelectedLabel] = useState(null);

    const titles = ["Annual Title", "Monthly Title"];
    const values = ["annual", "monthly"];

    const options = [
      {
        value: "annual",
        label: "Annual Title",
        content: (
          <div className="flex gap-4 py-1 text-sm">
            <div className="flex-grow min-w-0">
              <div className="truncate">Annual Title</div>
              <div className="truncate text-neutral-500">Subtitle</div>
              <div className="truncate text-neutral-500">Age</div>
            </div>
            <div className="text-right">Price</div>
          </div>
        ),
      },
      {
        value: "monthly",
        label: "Monthly Title",
        content: (
          <div className="flex gap-4 py-1 text-sm">
            <div className="flex-grow min-w-0">
              <div className="truncate">Monthly Title</div>
              <div className="truncate text-neutral-500">Subtitle</div>
              <div className="truncate text-neutral-500">Age</div>
            </div>
            <div className="text-right">Price</div>
          </div>
        ),
      },
      {
        value: "weekly",
        label: "Weekly Title",
        content: (
          <div className="flex gap-4 py-1 text-sm">
            <div className="flex-grow min-w-0">
              <div className="truncate">Weekly Title</div>
              <div className="truncate text-neutral-500">Subtitle</div>
              <div className="truncate text-neutral-500">Age</div>
            </div>
            <div className="text-right">Price</div>
          </div>
        ),
      },
    ];

    const handleChange = (value, option) => {
      setSelectedLabel(option.label);
    };

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
            <>
              <div
                key={requiredProduct.id}
                className={`text-sm p-4 space-y-4 rounded-md relative bg-white shadow ring-1 ring-opacity-5 text-left ${
                  addItemToBasket === false ? " ring-error " : " ring-black "
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
                <div>
                  <div>
                    {itemParticipants.map((participant: Participant) => {
                      return (
                        <>
                          <div key={`${requiredProduct.id}_${participant.id}`}>
                            <label className="block mb-1 font-medium">
                              Select memberhsip for {participant.firstName}{" "}
                              {participant.lastName}
                            </label>
                            <Select
                              popupClassName="ant-select-dropdown-products"
                              virtual={false}
                              className="w-full ant-select-products"
                              placeholder="Select membership..."
                              onChange={handleChange}
                              value={selectedLabel || undefined}
                            >
                              {options.map((option) => (
                                <Option
                                  key={option.value}
                                  value={option.value}
                                  label={option.label}
                                >
                                  {option.content}
                                </Option>
                              ))}
                            </Select>
                            {addItemToBasket === false && (
                              <div className="mt-2 text-error">
                                Please add the product
                              </div>
                            )}
                          </div>
                        </>
                      );
                    })}
                  </div>
                </div>
              </div>
            </>
          );
        })}
      </>
    );
  }
);

export default CheckoutAdditionalProducts;
