import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";
import { Form, Radio, Tooltip } from "antd";
import CheckoutStepHeader from "./checkout-header";
import { useBasketContext, BasketItem } from "../basket/basket-context";
import { calculateAge } from "./checkout-utils";

interface Participant {
  id: number;
  firstName: string;
  lastName: string;
  dob: Date;
  meetsAgeCriteria?: boolean;
}

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
    const [selectParticipantForm] = Form.useForm();

    useImperativeHandle(ref, () => ({
      // The 'submitForm' function is exposed to the parent component (checkout) via the ref so it can be called externally to trigger form validation and submission
      submitForm: async () => {
        try {
          // Validate all form fields
          await selectParticipantForm.validateFields();
          // If validation is successful, submit the form
          selectParticipantForm.submit();
          // Notify the parent component that the form is valid
          onFormValidation(true);
          // Return true to indicate that the form submission was successful
          addRequiredProducts();
          // Add the linked required products from items already in the basket
          return true;
        } catch (error) {
          // Log the validation error
          console.log("Validation failed:", error);
          // Notify the parent component that the form is not valid
          onFormValidation(false);
          // Return false to indicate that the form submission failed
          return false;
        }
      },
    }));

    const [ageCriteria, setAgeCriteria] = useState<{
      min?: number;
      max?: number;
    }>({
      // min: 4,
      max: 4,
    });

    const isAgeWithinRange = (dob: Date): boolean => {
      const participantAge = calculateAge(dob);
      const { min, max } = ageCriteria;

      return (!min || participantAge >= min) && (!max || participantAge <= max);
    };

    const [participants, setParticipants] = useState<Participant[]>(() => {
      const loadParticipants: Participant[] = [
        {
          id: 3,
          firstName: "Jacob",
          lastName: "Toone",
          dob: new Date("2021-12-06"),
        },
      ];
      return loadParticipants.map((participant) => ({
        ...participant,
        meetsAgeCriteria: isAgeWithinRange(participant.dob),
      }));
    });

    useEffect(() => {
      // Update the 'meetsAgeCriteria' property for each participant in the 'participants' array
      // based on the current 'ageCriteria'
      setParticipants(
        participants.map((participant) => ({
          ...participant,
          meetsAgeCriteria: isAgeWithinRange(participant.dob),
        }))
      );
    }, [ageCriteria]);

    const onDetailsFinish = (
      values: { [key: string]: number },
      participants: Participant[],
      items: BasketItem[]
    ) => {
      const result = items
        .filter((item) => item.requiredProduct)
        .map((item, index) => {
          const requiredProduct = item.requiredProduct;
          if (!requiredProduct) {
            return null;
          }
          const participantId = values[`participant_${index}`];
          const participant = participants.find((p) => p.id === participantId);

          if (!participant) {
            return null;
          }

          return {
            itemId: requiredProduct.id,
            itemName: requiredProduct.title,
            participantId: participant.id,
            participantFirstName: participant.firstName,
            participantLastName: participant.lastName,
            participantDob: participant.dob,
          };
        })
        .filter((value) => value !== null);

      console.log(result);
    };

    const onDetailsFinishFailed = (errorInfo: any) => {
      console.log(errorInfo);
    };

    return (
      <>
        <CheckoutStepHeader
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
        <Form
          layout="vertical"
          form={selectParticipantForm}
          name="selectParticipantForm"
          onFinish={(values) =>
            onDetailsFinish(values, participants, basketItems)
          }
          onFinishFailed={onDetailsFinishFailed}
          className="space-y-6 text-left hide-validation-asterix"
          initialValues={{ participant_0: participants[0].id }}
        >
          {/* Look through basket items and show the required product for each  */}
          {basketItems.map((item, index) => {
            const requiredProduct = item.requiredProduct;
            if (!requiredProduct) {
              return null;
            }
            return (
              <div
                key={requiredProduct.id}
                className="p-3 space-y-3 border rounded-md border-neutral-200 [&:has(.ant-form-item-has-error)]:border-error"
              >
                <div className="flex gap-3.5 border-b pb-3">
                  <img
                    src={requiredProduct.image}
                    alt={requiredProduct.title}
                    className="object-cover w-16 h-16 rounded"
                  />
                  <div className="grid items-center flex-1 min-w-0 text-sm">
                    <div>
                      <div className="font-medium">{requiredProduct.title}</div>
                      <div className="text-neutral-500">
                        {requiredProduct.subTitle}
                      </div>
                    </div>
                    {Object.keys(ageCriteria).length > 0 && (
                      <div className="pt-1.5 mt-auto text-neutral-500/75">
                        {ageCriteria.min && ageCriteria.max
                          ? `Age limit · between ${ageCriteria.min} and ${ageCriteria.max} years old`
                          : ageCriteria.min
                          ? `Age limit · ${ageCriteria.min} years or older`
                          : ageCriteria.max
                          ? `Age limit · ${ageCriteria.max} years or younger`
                          : ""}
                      </div>
                    )}
                  </div>
                </div>
                <Form.Item
                  name={`participant_${index}`}
                  label="Participant"
                  rules={[
                    {
                      required: true,
                      message: "Please select a participant",
                    },
                  ]}
                  validateTrigger={false}
                >
                  <Radio.Group>
                    <div className="grid gap-1.5">
                      {participants.map((participant) => (
                        <Tooltip
                          key={`${requiredProduct.id}_${participant.id}`}
                          title={`Age: ${calculateAge(participant.dob)}`}
                          placement="left"
                        >
                          <Radio
                            value={participant.id}
                            disabled={!participant.meetsAgeCriteria}
                          >
                            {participant.firstName} {participant.lastName}
                            {!participant.meetsAgeCriteria && (
                              <span>
                                {calculateAge(participant.dob) <
                                (ageCriteria.min ?? 0)
                                  ? " · Below age limit"
                                  : " · Above age limit"}
                              </span>
                            )}
                          </Radio>
                        </Tooltip>
                      ))}
                    </div>
                  </Radio.Group>
                </Form.Item>
              </div>
            );
          })}
        </Form>
      </>
    );
  }
);

export default CheckoutAdditionalProducts;
