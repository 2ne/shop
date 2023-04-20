import { Button, Form, Radio, Tooltip } from "antd";
import React, { useEffect, useState } from "react";
import CheckoutStepHeader from "./checkout-header";
import AddParticipantModal, {
  AddParticipantValues,
} from "./checkout-01-select-participants-add-modal";

interface Participant {
  id: number;
  firstName: string;
  lastName: string;
  dob: Date;
  meetsAgeCriteria?: boolean;
}

const CheckoutSelectParticipants: React.FC = () => {
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
    // Update the participants and check age criteria
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
      selectParticipantForm.setFieldsValue({
        selectParticipant: newParticipantId,
      });
    }
    setIsAddParticipantModalOpen(false);
  };

  const onDetailsFinish = (values: any) => {
    console.log(values);
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
        onFinish={onDetailsFinish}
        onFinishFailed={onDetailsFinishFailed}
        className="space-y-6 text-left hide-validation-asterix"
      >
        <div className="p-3 space-y-3 border rounded-md border-neutral-200">
          <div className="flex gap-3.5 border-b pb-3">
            <img
              src="https://images.unsplash.com/photo-1651614158095-b98b6c1da74b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1172&q=80"
              alt="Bubble the Seahorse"
              className="object-cover w-16 h-16 rounded"
            />
            <div className="grid items-center flex-1 min-w-0 text-sm">
              <div>
                <div className="font-medium">Bubble the Seahorse</div>
                <div className="text-neutral-500">
                  Every Tuesday at 11:30 - 12:00
                </div>
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
          <Form.Item name="selectParticipant" label="Select participant">
            <Radio.Group>
              <div className="grid gap-1.5">
                {participants.map((participant) => (
                  <Tooltip
                    title={`Age: ${calculateAge(participant.dob)}`}
                    placement="left"
                  >
                    <Radio
                      key={participant.id}
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
      </Form>
    </>
  );
};

export default CheckoutSelectParticipants;
