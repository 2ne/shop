import { Steps } from "antd";
import React from "react";

interface CheckoutStepsProps {
  currentStep: number;
  furthestStep: number;
  steps: { title: string }[];
  handleStepClick: (stepIndex: number) => void;
}

const CheckoutSteps: React.FC<CheckoutStepsProps> = ({
  currentStep,
  furthestStep,
  steps,
  handleStepClick,
}) => {
  const totalSteps = steps.length;
  const onStepClick = (stepIndex: number) => {
    if (stepIndex <= furthestStep) {
      handleStepClick(stepIndex);
    }
  };

  return (
    <>
      <div className="hidden lg:block">
        <div className="mb-5 heading">
          Checkout{" "}
          <span className="text-neutral-500">
            · Step {currentStep + 1} of {totalSteps}
          </span>
        </div>
        <Steps
          progressDot
          direction="vertical"
          size="small"
          current={currentStep}
          onChange={onStepClick}
        >
          {steps.map((step, index) => (
            <Steps.Step key={index} title={step.title} />
          ))}
        </Steps>
      </div>
    </>
  );
};

export default CheckoutSteps;
