import React from "react";

interface WrapperProps {
  children: React.ReactNode;
  className?: string;
}

const Wrapper: React.FC<WrapperProps> = ({ children, className }) => {
  const baseClassNames = "w-full p-3 mx-auto container";
  const combinedClassNames = className
    ? `${baseClassNames} ${className}`
    : baseClassNames;

  return <div className={combinedClassNames}>{children}</div>;
};

export default Wrapper;
