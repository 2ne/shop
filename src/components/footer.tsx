import React from "react";
import Wrapper from "./wrapper";

const Footer: React.FC = () => {
  return (
    <footer className="sticky bottom-0 px-3 py-4 sm:py-6 text-neutral-600 bg-neutral-100">
      <Wrapper>
        <p className="text-xs text-center sm:text-sm">
          © {new Date().getFullYear()} CG Swim School. All rights reserved.
        </p>
      </Wrapper>
    </footer>
  );
};

export default Footer;
