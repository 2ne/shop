import React from "react";

interface WrapperProps {
  children: React.ReactNode;
  className?: string;
}

const Wrapper: React.FC<WrapperProps> = ({ children, className }) => {
  const baseClassNames = "w-full p-3 mx-auto max-w-screen-2xl";
  const combinedClassNames = className
    ? `${baseClassNames} ${className}`
    : baseClassNames;

  return <div className={combinedClassNames}>{children}</div>;
};

export default Wrapper;
