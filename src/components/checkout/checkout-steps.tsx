import React from "react";

interface CheckoutStepsProps {
  step: number;
}

const CheckoutSteps: React.FC<CheckoutStepsProps> = ({ step }) => {
  return (
    <div className="relative">
      yooyyoyo
      {step}
    </div>
  );
};

export default CheckoutSteps;
