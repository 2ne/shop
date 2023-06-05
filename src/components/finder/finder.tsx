import React, { useState } from "react";
import DateOfBirthInput from "../dob-input";
import { Button, Form, Input, Select } from "antd";
import FormHeader from "../checkout/checkout-header";
import { SearchOutlined } from "@ant-design/icons";
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
    <div
      className={`lg:mt-8 lg:mb-20 mb-8 lg:flex lg:justify-between lg:gap-14 ${
        participants.length > 1 ? " lg:items-start " : " lg:items-center "
      } `}
    >
      <div
        className="absolute inset-0 bg-grid bg-[bottom_1px_center] pointer-events-none"
        style={{
          maskImage: "radial-gradient(black, transparent)",
          WebkitMaskImage: "radial-gradient(black, transparent)",
        }}
      ></div>
      <div className="shrink-0 w-full lg:max-w-[22rem] space-y-6">
        <div className="relative lg:text-center">
          <FormHeader
            title="Swim Class Finder"
            subtitle="Enter the participant's details and we'll find the perfect classes for them"
          />
        </div>
        <Form layout="vertical" className="" requiredMark={false}>
          {participants.map((participant, index) => (
            <div
              key={index}
              className="p-4 relative border mb-4 rounded-md bg-white border-neutral-200 [&:has(.ant-form-item-has-error)]:border-error"
            >
              {participants.length > 1 && (
                <div className="relative">
                  <Form.Item
                    label="First name"
                    name="firstName"
                    rules={[
                      { required: true, message: "Please enter a first name" },
                    ]}
                  >
                    <Input />
                  </Form.Item>
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
              )}
              <DateOfBirthInput
                onDateChange={(day, month, year, age) =>
                  handleDateChange(index, day, month, year, age)
                }
              />
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
            icon={<SearchOutlined />}
          >
            Search
          </Button>
        </Form>
      </div>
      <div className="sticky hidden mt-0.5 lg:block top-10">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          <div className="grid gap-4">
            <div>
              <img
                className="object-cover object-center h-full max-w-full transition-opacity rounded-lg"
                src="https://images.unsplash.com/photo-1560090995-01632a28895b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2338&q=80"
                alt=""
              />
            </div>
            <div>
              <img
                className="object-cover object-center h-full max-w-full transition-opacity rounded-lg"
                src="https://images.unsplash.com/photo-1600965962102-9d260a71890d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80"
                alt=""
              />
            </div>
            <div>
              <img
                className="object-cover object-center h-full max-w-full transition-opacity rounded-lg"
                src="https://images.unsplash.com/photo-1574744918163-6cef6f4a31b0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=987&q=80"
                alt=""
              />
            </div>
          </div>
          <div className="grid gap-4">
            <div>
              <img
                className="object-cover object-center h-full max-w-full transition-opacity rounded-lg"
                src="https://images.unsplash.com/photo-1487491506942-373c8f7a7ad5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2338&q=80"
                alt=""
              />
            </div>
            <div>
              <img
                className="object-cover object-center h-full max-w-full transition-opacity rounded-lg"
                src="https://images.unsplash.com/photo-1600965962361-9035dbfd1c50?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80"
                alt=""
              />
            </div>
            <div>
              <img
                className="object-cover object-center h-full max-w-full transition-opacity rounded-lg"
                src="https://images.unsplash.com/photo-1622629797619-c100e3e67e2e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2662&q=80"
                alt=""
              />
            </div>
          </div>
          <div className="grid gap-4">
            <div>
              <img
                className="object-cover object-center h-full max-w-full transition-opacity rounded-lg"
                src="https://images.unsplash.com/photo-1519315901367-f34ff9154487?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80"
                alt=""
              />
            </div>
            <div>
              <img
                className="object-cover object-center h-full max-w-full transition-opacity rounded-lg"
                src="https://images.unsplash.com/photo-1560089000-7433a4ebbd64?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1035&q=80"
                alt=""
              />
            </div>
            <div>
              <img
                className="object-cover object-center h-full max-w-full transition-opacity rounded-lg"
                src="https://images.unsplash.com/photo-1558617320-e695f0d420de?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80"
                alt=""
              />
            </div>
          </div>
          <div className="grid gap-4">
            <div>
              <img
                className="object-cover object-center h-full max-w-full transition-opacity rounded-lg"
                src="https://images.unsplash.com/photo-1560088971-123158b94b34?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2338&q=80"
                alt=""
              />
            </div>
            <div>
              <img
                className="object-cover object-center h-full max-w-full transition-opacity rounded-lg"
                src="https://images.unsplash.com/photo-1600965962323-6362f726c3f8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80"
                alt=""
              />
            </div>
            <div>
              <img
                className="object-cover object-center h-full max-w-full transition-opacity rounded-lg"
                src="https://images.unsplash.com/photo-1630049038179-afaaebb62fe2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2450&q=80"
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Finder;
