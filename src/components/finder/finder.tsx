import React, { useState } from "react";
import DateOfBirthInput from "../dob-input";
import { Button, Form, Input, Select } from "antd";
import FormHeader from "../checkout/checkout-header";
const { Option } = Select;

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
    <div className="mt-8 mb-20 lg:flex lg:items-center lg:justify-between lg:gap-8">
      <div className="w-full lg:max-w-[22rem] space-y-6">
        <div className="relative lg:text-center">
          <FormHeader
            title="Class Finder"
            subtitle="Enter the participant's details and we'll find the perfect classes for them"
          />
        </div>
        <Form layout="vertical" className="" requiredMark={false}>
          {participants.map((participant, index) => (
            <div
              key={index}
              className="p-4 relative border mb-4 rounded-md bg-white border-neutral-200 [&:has(.ant-form-item-has-error)]:border-error"
            >
              <Form.Item
                label="First name"
                name="firstName"
                rules={[
                  { required: true, message: "Please enter a first name" },
                ]}
              >
                <Input />
              </Form.Item>
              <div className="relative">
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
              <Form.Item
                name="skillLevel"
                label={
                  <div className="flex items-center">
                    <div>Skill level</div>
                    <span className="mx-1">·</span>
                    <Button type="link" className="!px-0">
                      Unsure? Use our level finder
                    </Button>
                  </div>
                }
                rules={[{ required: true }]}
                className="!mb-1 relative"
              >
                <Select placeholder="Select a level...">
                  <Option value="1">Level 1</Option>
                  <Option value="2">Level 2</Option>
                  <Option value="3">Level 3</Option>
                </Select>
              </Form.Item>
            </div>
          ))}
          <Button block onClick={addParticipant} className="bg-white">
            Add participant
          </Button>
          <Button
            type="primary"
            htmlType="submit"
            block
            size="large"
            className="mt-12"
          >
            Continue
          </Button>
        </Form>
      </div>
      <div className="relative hidden mt-2 lg:block">
        <img
          src="https://i.ibb.co/bmSB90s/image-1.jpg"
          className="rounded-md h-[73vh] w-full object-cover object-center"
        />
      </div>
    </div>
  );
};

export default Finder;
