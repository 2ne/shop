import { Steps } from "antd";
import React, { useState } from "react";

const CheckoutSteps: React.FC = () => {
  const [current, setCurrent] = useState(0);
  const totalSteps = 8;

  const nextStep = () => {
    setCurrent(current + 1);
  };

  const prevStep = () => {
    setCurrent(current - 1);
  };
  return (
    <>
      <div className="flex items-center justify-between -mt-1.5 lg:hidden h-6 mb-2">
        {current > 0 && (
          <button
            type="button"
            className="flex items-center -ml-2 text-sm"
            onClick={prevStep}
          >
            <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.25"
                d="M13.25 8.75L9.75 12l3.5 3.25"
              ></path>
            </svg>
            <div className="-ml-0.5">Back</div>
          </button>
        )}
        <div className="lg:hidden sub-heading">
          Step {current + 1} of {totalSteps}
        </div>
      </div>
      <div className="hidden lg:block">
        <div className="mb-5 heading">
          Checkout{" "}
          <span className="text-neutral-500">
            · Step {current + 1} of {totalSteps}
          </span>
        </div>
        <Steps
          progressDot
          direction="vertical"
          size="small"
          current={current}
          items={[
            { title: "Select participants" },
            { title: "Additional products" },
            { title: "Medical info" },
            { title: "Emergency contacts" },
            { title: "Consents forms" },
            { title: "Additional info" },
            { title: "Upload files" },
            { title: "Payment" },
          ]}
        />
      </div>
    </>
  );
};

export default CheckoutSteps;
