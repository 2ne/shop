import React from "react";
import Wrapper from "./wrapper";

const Footer: React.FC = () => {
  return (
    <footer className="px-3 py-4 mt-auto sm:py-6 text-slate-600 bg-slate-100">
      <Wrapper>
        <p className="text-xs text-center sm:text-sm">
          © {new Date().getFullYear()} CG Swim School. All rights reserved.
        </p>
      </Wrapper>
    </footer>
  );
};

export default Footer;
