import React, { ReactNode } from "react";
import Balancer from "react-wrap-balancer";

type CheckoutStepHeaderProps = {
  icon: ReactNode;
  title: string;
  subtitle: string;
};

const CheckoutStepHeader: React.FC<CheckoutStepHeaderProps> = ({
  icon,
  title,
  subtitle,
}) => {
  return (
    <header>
      <i className="justify-center hidden mt-1 mb-3 lg:flex">{icon}</i>
      <div className="hidden lg:block">
        <Balancer>
          <div className="mb-2 heading-lg">{title}</div>
          <div className="sub-heading">{subtitle}</div>
        </Balancer>
      </div>
      <div className="lg:hidden">
        <div className="mb-1 heading-lg">{title}</div>
        <div className="sub-heading">{subtitle}</div>
      </div>
    </header>
  );
};

export default CheckoutStepHeader;
