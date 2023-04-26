import { Button } from "antd";
import React from "react";

interface CheckoutButtonProps {
  onClick?: () => void;
  type?: "continue" | "pay" | "confirm";
}

export const CheckoutButton: React.FC<CheckoutButtonProps> = ({
  onClick,
  type = "continue",
}) => {
  let text = "";
  let buttonClass;

  switch (type) {
    case "pay":
      text = "Pay now";
      buttonClass = "!bg-emerald-500 hover:!bg-emerald-400";
      break;
    case "confirm":
      text = "Confirm";
      buttonClass = "!bg-emerald-500 hover:!bg-emerald-400";
      break;
    default:
      text = "Continue";
  }

  return (
    <Button
      size="large"
      type="primary"
      block
      className={buttonClass}
      onClick={onClick}
    >
      {text}
    </Button>
  );
};

export default CheckoutButton;
