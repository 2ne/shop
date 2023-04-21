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
import { useBasketContext, BasketItem } from "../basket/basket-context";
import { calculateAge } from "./checkout-utils";

interface Participant {
  id: number;
  firstName: string;
  lastName: string;
  dob: Date;
  meetsAgeCriteria?: boolean;
}

export interface CheckoutSelectParticipantsHandles {
  submitForm: () => Promise<boolean>;
}

interface CheckoutSelectParticipantsProps {
  title: string;
  subtitle: string;
  onFormValidation: (isValid: boolean) => void;
}

const CheckoutSelectParticipants = forwardRef<
  CheckoutSelectParticipantsHandles,
  CheckoutSelectParticipantsProps
>(
  (
    { onFormValidation, title, subtitle }: CheckoutSelectParticipantsProps,
    ref: React.Ref<CheckoutSelectParticipantsHandles>
  ) => {
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

    const { basketItems } = useBasketContext();
    const [selectParticipantForm] = Form.useForm();
    const [isAddParticipantModalOpen, setIsAddParticipantModalOpen] =
      useState(false);

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
      const result = items
        .map((item, index) => {
          const participantId = values[`participant_${index}`];
          const participant = participants.find((p) => p.id === participantId);

          if (!participant) {
            return null;
          }

          return {
            itemId: item.id,
            itemName: item.title,
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
            <svg
              width="24"
              height="24"
              fill="none"
              viewBox="0 0 24 24"
              className="w-[3.25rem] h-[3.25rem] p-[calc(0.5rem+1px)] rounded-full bg-primary text-primary_text border-[5px] border-white/75"
            >
              <circle
                cx="12"
                cy="8"
                r="3.25"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
              ></circle>
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M12.25 19.25h-5.3c-1.18 0-2.06-1.04-1.46-2.055C6.363 15.723 8.24 14 12.25 14M17 14.75v4.5M19.25 17h-4.5"
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
          {basketItems.map((item, index) => (
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
                        ? `Participants must be between ${ageCriteria.min} and ${ageCriteria.max} years old`
                        : ageCriteria.min
                        ? `Participants must be ${ageCriteria.min} years or older`
                        : ageCriteria.max
                        ? `Participants must be ${ageCriteria.max} years or younger`
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

export default CheckoutSelectParticipants;
