import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";
import { Button, Form, Radio, Tooltip } from "antd";
import CheckoutStepHeader from "./checkout-header";
import AddParticipantModal, {
  AddParticipantValues,
} from "./checkout-01-select-participants-add-modal";
import { useBasketContext } from "../basket/basket-context";
import { calculateAge } from "./checkout-utils";
import { BasketItem, Participant } from "../../types/types";

export interface CheckoutMedicalInfoHandles {
  submitForm: () => Promise<boolean>;
}

interface CheckoutMedicalInfoProps {
  title: string;
  subtitle: string;
  onFormValidation: (isValid: boolean) => void;
}

const CheckoutMedicalInfo = forwardRef<
  CheckoutMedicalInfoHandles,
  CheckoutMedicalInfoProps
>(
  (
    { onFormValidation, title, subtitle }: CheckoutMedicalInfoProps,
    ref: React.Ref<CheckoutMedicalInfoHandles>
  ) => {
    const { basketItems, addParticipant } = useBasketContext();
    const basketItemsExcludingRequired = basketItems.filter(
      (item) => !item.isRequiredProduct
    );
    const [selectParticipantForm] = Form.useForm();
    const [isAddParticipantModalOpen, setIsAddParticipantModalOpen] =
      useState(false);

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
          id: 1,
          firstName: "James",
          lastName: "Toone",
          dob: new Date("1986-04-14"),
        },
        {
          id: 2,
          firstName: "Sam",
          lastName: "Toone",
          dob: new Date("1989-10-19"),
        },
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

    const onModalSave = (values: AddParticipantValues) => {
      // Convert input values to a Date object
      const dob = new Date(values.dobYYYY, values.dobMM - 1, values.dobDD);

      // Generate a new participant ID
      const newParticipantId = participants.length + 1;

      // Create a new participant object
      const newParticipant = {
        id: newParticipantId,
        firstName: values.firstName,
        lastName: values.lastName,
        dob,
        meetsAgeCriteria: isAgeWithinRange(dob),
      };

      // Add the new participant to the participants array
      setParticipants([...participants, newParticipant]);

      // If the new participant meets the age criteria, find the product and set the participant
      if (newParticipant.meetsAgeCriteria) {
        // Find the index of the product that has no participant selected
        const emptyProductIndex = basketItems.findIndex(
          (item, index) =>
            !selectParticipantForm.getFieldValue(`participant_${index}`)
        );

        // If there is an empty product, set the new participant as the selected participant for that product
        if (emptyProductIndex !== -1) {
          selectParticipantForm.setFieldsValue({
            [`participant_${emptyProductIndex}`]: newParticipantId,
          });
        }
      }

      // Close the add participant modal
      setIsAddParticipantModalOpen(false);
    };

    const onDetailsFinish = (
      values: { [key: string]: number },
      participants: Participant[],
      items: BasketItem[]
    ) => {
      items.forEach((item, index) => {
        const participantId = values[`participant_${index}`];
        const participant = participants.find((p) => p.id === participantId);

        if (!participant) {
          return;
        }

        addParticipant(item.id, participant);

        console.log("Add participants:", basketItems);
      });
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
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9 8C9 8.41421 9.33579 8.75 9.75 8.75C10.1642 8.75 10.5 8.41421 10.5 8H9ZM13.5 8C13.5 8.41421 13.8358 8.75 14.25 8.75C14.6642 8.75 15 8.41421 15 8H13.5ZM17.25 19.25L17.25 18.5H17.25V19.25ZM6.75 19.25L6.75 20H6.75V19.25ZM19.25 17.25L20 17.25V17.25H19.25ZM19.25 10L18.5 10V10H19.25ZM17.25 8L17.25 8.75L17.25 8ZM6.75 8L6.75 7.25L6.75 8ZM4.75 10L4 10L4.75 10ZM4.75 17.25L5.5 17.25L4.75 17.25ZM15.25 14.25C15.6642 14.25 16 13.9142 16 13.5C16 13.0858 15.6642 12.75 15.25 12.75V14.25ZM8.75 12.75C8.33579 12.75 8 13.0858 8 13.5C8 13.9142 8.33579 14.25 8.75 14.25V12.75ZM12.75 10.75C12.75 10.3358 12.4142 10 12 10C11.5858 10 11.25 10.3358 11.25 10.75L12.75 10.75ZM11.25 16.25C11.25 16.6642 11.5858 17 12 17C12.4142 17 12.75 16.6642 12.75 16.25H11.25ZM10.75 4.75L10.75 5.5L10.75 4.75ZM9.75 5.75L9 5.75V5.75H9.75ZM13.25 4.75L13.25 4L13.25 4.75ZM14.25 5.75L15 5.75L15 5.75L14.25 5.75ZM13.25 4L10.75 4L10.75 5.5L13.25 5.5L13.25 4ZM9 5.75V8H10.5V5.75H9ZM13.5 5.75V8H15V5.75H13.5ZM17.25 18.5H6.75V20H17.25V18.5ZM20 17.25V10H18.5V17.25H20ZM17.25 7.25L6.75 7.25L6.75 8.75L17.25 8.75L17.25 7.25ZM4 10L4 17.25L5.5 17.25L5.5 10L4 10ZM6.75 7.25C5.23122 7.25 4 8.48122 4 10L5.5 10C5.5 9.30964 6.05964 8.75 6.75 8.75L6.75 7.25ZM20 10C20 8.48122 18.7688 7.25 17.25 7.25L17.25 8.75C17.9404 8.75 18.5 9.30964 18.5 10L20 10ZM6.75 18.5C6.05964 18.5 5.5 17.9404 5.5 17.25L4 17.25C4 18.7688 5.23122 20 6.75 20L6.75 18.5ZM17.25 20C18.7688 20 20 18.7688 20 17.25L18.5 17.25C18.5 17.9404 17.9404 18.5 17.25 18.5L17.25 20ZM15.25 12.75H12V14.25H15.25V12.75ZM12 12.75H8.75V14.25H12V12.75ZM11.25 10.75L11.25 13.5L12.75 13.5L12.75 10.75L11.25 10.75ZM11.25 13.5V16.25H12.75V13.5H11.25ZM10.75 4C9.7835 4 9 4.7835 9 5.75L10.5 5.75C10.5 5.61193 10.6119 5.5 10.75 5.5L10.75 4ZM13.25 5.5C13.3881 5.5 13.5 5.61193 13.5 5.75L15 5.75C15 4.7835 14.2165 4 13.25 4L13.25 5.5Z"
                fill="currentColor"
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
        >
          {/* Loop through basket items but don't show their linked required products */}
          {basketItemsExcludingRequired.map((item, index) => (
            <div
              key={item.id}
              className="p-3 space-y-3 border rounded-md border-neutral-200 [&:has(.ant-form-item-has-error)]:border-error"
            >
              <div className="flex gap-3.5 border-b pb-3">
                <img
                  src={item.image}
                  alt={item.title}
                  className="object-cover w-16 h-16 rounded"
                />
                <div className="grid items-center flex-1 min-w-0 text-sm">
                  <div>
                    <div className="font-medium">{item.title}</div>
                    <div className="text-neutral-500">{item.subTitle}</div>
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
                label="Select a participant"
                rules={[
                  { required: true, message: "Please select a participant" },
                ]}
                validateTrigger={false}
              >
                <Radio.Group>
                  <div className="grid gap-1.5">
                    {participants.map((participant) => (
                      <Tooltip
                        key={`${item.id}_${participant.id}`}
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
              <div>
                <Button
                  block
                  onClick={() => {
                    setIsAddParticipantModalOpen(true);
                  }}
                >
                  Add new participant
                </Button>
                <AddParticipantModal
                  openModal={isAddParticipantModalOpen}
                  onModalSave={onModalSave}
                  onModalCancel={() => {
                    setIsAddParticipantModalOpen(false);
                  }}
                />
              </div>
            </div>
          ))}
        </Form>
      </>
    );
  }
);

export default CheckoutMedicalInfo;