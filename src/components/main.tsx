import React from "react";

interface MainProps {
  children: React.ReactNode;
  className?: string;
}

const Main: React.FC<MainProps> = ({ children, className }) => {
  const baseClassNames = "mb-28 sm:mb-48 w-full p-3 sm:py-6 mx-auto container";
  const combinedClassNames = className
    ? `${baseClassNames} ${className}`
    : baseClassNames;

  return <main className={combinedClassNames}>{children}</main>;
};

export default Main;
