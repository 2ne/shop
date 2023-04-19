import { Button, Form, Radio } from "antd";
import React from "react";
import Balancer from "react-wrap-balancer";

const CheckoutSelectParticipants: React.FC = () => {
  return (
    <div className="space-y-4 lg:space-y-6 lg:max-w-xs lg:m-auto">
      <header>
        <div className="justify-center hidden mt-1 mb-3 lg:flex">
          <svg
            width="24"
            height="24"
            fill="none"
            viewBox="0 0 24 24"
            className="w-14 h-14 p-2 rounded-full bg-primary text-primary_text border-[5px] border-white/75"
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
        </div>
        <div>
          <Balancer>
            <div className="mb-2 heading-lg">Select participants</div>
            <div className="sub-heading">
              Please select the participants that you are buying each product
              for.
            </div>
          </Balancer>
        </div>
      </header>
      <Form layout="vertical" className="space-y-6 text-left">
        <div className="p-3 space-y-3 border rounded-md border-neutral-200">
          <div className="flex gap-3.5 border-b pb-3">
            <img
              src="https://images.unsplash.com/photo-1651614158095-b98b6c1da74b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1172&q=80"
              alt="Bubble the Seahorse"
              className="object-cover w-16 h-16 rounded"
            />
            <div className="grid items-center flex-1 min-w-0 text-sm">
              <div>
                <div className="-mt-1 font-medium">Bubble the Seahorse</div>
                <div className="text-neutral-500">
                  Every Tuesday at 11:30 - 12:00
                </div>
              </div>
              <div className="mt-auto text-xs text-neutral-400">
                Participants must be 4 years or older.
              </div>
            </div>
          </div>
          <Form.Item name="radio-group" label="Select participant">
            <Radio.Group>
              <div className="grid gap-1.5">
                <Radio value={1}>Option A</Radio>
                <Radio value={2}>Option B</Radio>
                <Radio value={3}>Option C</Radio>
              </div>
            </Radio.Group>
          </Form.Item>
          <div>
            <Button block>Add new participant</Button>
          </div>
        </div>
        <div className="pt-2">
          <Button type="primary" size="large" block>
            Continue
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default CheckoutSelectParticipants;
