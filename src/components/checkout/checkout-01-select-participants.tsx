import { Button, Form, Radio, Tooltip } from "antd";
import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";
import CheckoutStepHeader from "./checkout-header";
import AddParticipantModal, {
  AddParticipantValues,
} from "./checkout-01-select-participants-add-modal";
import { useBasketContext } from "../basket/basket-context";

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
  onFormValidation: (isValid: boolean) => void;
}

const CheckoutSelectParticipants = forwardRef<
  CheckoutSelectParticipantsHandles,
  CheckoutSelectParticipantsProps
>((props, ref) => {
  useImperativeHandle(ref, () => ({
    submitForm: async () => {
      try {
        await selectParticipantForm.validateFields();
        selectParticipantForm.submit();
        props.onFormValidation(true);
        console.log("YO");
        return true;
      } catch (error) {
        console.log("Validation failed:", error);
        props.onFormValidation(false);
        return false;
      }
    },
  }));

  const { basketItems } = useBasketContext();
  const [selectParticipantForm] = Form.useForm();
  const [isAddParticipantModalOpen, setIsAddParticipantModalOpen] =
    useState(false);

  const calculateAge = (dob: Date, currentDate: Date = new Date()) => {
    const birthDate = new Date(dob);
    let age = currentDate.getFullYear() - birthDate.getFullYear();
    const monthDifference = currentDate.getMonth() - birthDate.getMonth();

    if (
      monthDifference < 0 ||
      (monthDifference === 0 && currentDate.getDate() < birthDate.getDate())
    ) {
      age--;
    }

    return age;
  };

  const [ageCriteria, setAgeCriteria] = useState<{
    min?: number;
    max?: number;
  }>({
    min: 4,
    // max: 8,
  });

  const isAgeWithinRange = (dob: Date) => {
    const participantAge = calculateAge(dob);
    const isAboveMinAge =
      ageCriteria.min === undefined || participantAge >= ageCriteria.min;
    const isBelowMaxAge =
      ageCriteria.max === undefined || participantAge <= ageCriteria.max;
    return isAboveMinAge && isBelowMaxAge;
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
    setParticipants(
      participants.map((participant) => ({
        ...participant,
        meetsAgeCriteria: isAgeWithinRange(participant.dob),
      }))
    );
  }, [ageCriteria]);

  const onModalSave = (values: AddParticipantValues) => {
    const dob = new Date(values.dobYYYY, values.dobMM - 1, values.dobDD);
    const newParticipantId = participants.length + 1;
    const newParticipant = {
      id: newParticipantId,
      firstName: values.firstName,
      lastName: values.lastName,
      dob,
      meetsAgeCriteria: isAgeWithinRange(dob),
    };
    setParticipants([...participants, newParticipant]);

    if (newParticipant.meetsAgeCriteria) {
      // Find the index of the product that has no participant selected
      const emptyProductIndex = basketItems.findIndex(
        (item, index) =>
          !selectParticipantForm.getFieldValue(`participant_${index}`)
      );

      if (emptyProductIndex !== -1) {
        selectParticipantForm.setFieldsValue({
          [`participant_${emptyProductIndex}`]: newParticipantId,
        });
      }
    }
    setIsAddParticipantModalOpen(false);
  };

  const onDetailsFinish = (
    values: { [x: string]: any },
    participants: any[],
    items: any[]
  ) => {
    const result = items.map((item: { id: any; title: any }, index: any) => {
      const participantId = values[`participant_${index}`];
      const participant = participants.find(
        (p: { id: any }) => p.id === participantId
      );

      return {
        itemId: item.id,
        itemName: item.title,
        participantId: participant.id,
        participantFirstName: participant.firstName,
        participantLastName: participant.lastName,
        participantDob: participant.dob,
      };
    });

    console.log(result);
  };

  const onDetailsFinishFailed = (errorInfo: any) => {
    console.log(errorInfo);
  };

  return (
    <>
      <CheckoutStepHeader
        title="Select participants"
        subtitle="Please select the participants that you are buying each product for."
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
            className="p-3 space-y-3 border rounded-md border-neutral-200"
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
});

export default CheckoutSelectParticipants;
