import React from "react";

interface CheckoutStepsProps {
  count: number;
}

const CheckoutSteps: React.FC<CheckoutStepsProps> = ({ count }) => {
  return <div className="relative">step {count}</div>;
};

export default CheckoutSteps;
