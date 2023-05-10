import React, { useState } from "react";
import DateOfBirthInput from "../dob-input";
import { Button, Form } from "antd";
import FormHeader from "../checkout/checkout-header";

interface Participant {
  day: string;
  month: string;
  year: string;
  age: number | null;
}

const Finder: React.FC = () => {
  const [participants, setParticipants] = useState<Participant[]>([
    { day: "", month: "", year: "", age: null },
  ]);

  const handleDateChange = (
    index: number,
    day: string,
    month: string,
    year: string,
    age: number | null
  ) => {
    const newParticipants = [...participants];
    newParticipants[index] = { day, month, year, age };
    setParticipants(newParticipants);
  };

  const addParticipant = () => {
    setParticipants([
      ...participants,
      { day: "", month: "", year: "", age: null },
    ]);
  };

  const removeParticipant = (index: number) => {
    setParticipants(participants.filter((_, i) => i !== index));
  };

  return (
    <div className="w-full lg:max-w-[22rem] lg:mx-auto space-y-6">
      <div className="lg:text-center">
        <FormHeader
          title="Class Finder"
          subtitle="Enter the participant's birth date and we'll find the perfect classes for them"
          icon={
            <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M19.25 19.25L15.5 15.5M4.75 11a6.25 6.25 0 1112.5 0 6.25 6.25 0 01-12.5 0z"
              ></path>
            </svg>
          }
        />
      </div>
      <Form layout="vertical">
        <div className="p-4 mb-8 border rounded-md border-neutral-200 [&:has(.ant-form-item-has-error)]:border-error">
          {participants.map((participant, index) => (
            <div key={index} className="relative !mb-10">
              <DateOfBirthInput
                onDateChange={(day, month, year, age) =>
                  handleDateChange(index, day, month, year, age)
                }
              />
              {index !== 0 && (
                <Button
                  className="absolute -top-1.5 right-0 !px-0"
                  type="link"
                  onClick={() => removeParticipant(index)}
                >
                  Remove
                </Button>
              )}
            </div>
          ))}
          <Button block onClick={addParticipant}>
            Add participant
          </Button>
        </div>
        <Button type="primary" htmlType="submit" block size="large">
          Continue
        </Button>
      </Form>
    </div>
  );
};

export default Finder;
