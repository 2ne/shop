import React from "react";
import Wrapper from "./wrapper";

const Footer: React.FC = () => {
  return (
    <footer className="px-3 py-6 mt-auto text-slate-600 bg-slate-100">
      <Wrapper>
        <p className="text-sm text-center">
          © {new Date().getFullYear()} CG Swim School. All rights reserved.
        </p>
      </Wrapper>
    </footer>
  );
};

export default Footer;
