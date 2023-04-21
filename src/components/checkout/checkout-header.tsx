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
      <div className="justify-center hidden mb-3 lg:flex">
        <i className="w-[3.25rem] h-[3.25rem] p-[calc(0.5rem+1px)] rounded-full bg-primary text-primary_text border-[5px] border-white/75">
          {icon}
        </i>
      </div>
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
