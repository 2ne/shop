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
          subtitle="Please enter the participant's birth date"
          icon={
            <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
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
