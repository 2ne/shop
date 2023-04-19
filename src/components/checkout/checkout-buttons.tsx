import { Button } from "antd";
import React from "react";

const BaseButton: React.FC<{
  text: string;
  className?: string;
  onClick?: () => void;
}> = ({ text, className, onClick }) => (
  <Button
    size="large"
    type="primary"
    block
    className={className}
    onClick={onClick}
  >
    {text}
  </Button>
);

export const CheckoutButton: React.FC<{ onClick?: () => void }> = ({
  onClick,
}) => <BaseButton text="Continue" onClick={onClick} />;

export const CheckoutButtonPay: React.FC<{ onClick?: () => void }> = ({
  onClick,
}) => (
  <BaseButton
    text="Pay now"
    className="!bg-emerald-500 hover:!bg-emerald-400"
    onClick={onClick}
  />
);
