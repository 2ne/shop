import React from "react";

interface CheckoutStepsProps {
  count: number;
}

const CheckoutSteps: React.FC<CheckoutStepsProps> = ({ count }) => {
  return (
    <div className="heading">
      Checkout <span className="text-neutral-500">· Step {count} of 8</span>
    </div>
  );
};

export default CheckoutSteps;
