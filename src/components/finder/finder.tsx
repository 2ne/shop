import React, { useState } from "react";
import DateOfBirthInput from "../dob-input";
import { Button, Form } from "antd";
import CheckoutStepHeader from "../checkout/checkout-header";

const Finder: React.FC = () => {
  const [bdayDay, setBdayDay] = useState("");
  const [bdayMonth, setBdayMonth] = useState("");
  const [bdayYear, setBdayYear] = useState("");
  const [age, setAge] = useState<number | null>(null);

  const handleDateChange = (
    day: string,
    month: string,
    year: string,
    age: number | null
  ) => {
    setBdayDay(day);
    setBdayMonth(month);
    setBdayYear(year);
    setAge(age);
  };

  return (
    <div className="w-full lg:max-w-[22rem] lg:mx-auto space-y-6">
      <div className="lg:text-center">
        <CheckoutStepHeader
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
        <div className="p-4 mb-8 border space-y-4 rounded-md border-neutral-200 [&:has(.ant-form-item-has-error)]:border-error">
          <DateOfBirthInput onDateChange={handleDateChange} />
          <Button block>Add participant</Button>
        </div>
        <Button type="primary" htmlType="submit" block size="large">
          Continue
        </Button>
      </Form>
    </div>
  );
};

export default Finder;
