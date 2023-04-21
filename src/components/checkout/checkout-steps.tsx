import React from "react";
import CustomSteps from "./checkout-custom-steps";

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
        <CustomSteps
          currentStep={currentStep}
          furthestStep={furthestStep}
          steps={steps}
          handleStepClick={handleStepClick}
        />
      </div>
    </>
  );
};

export default CheckoutSteps;
