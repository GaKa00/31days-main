// src/components/Layout/Footer.js
import React from "react";
import { Footer as ShadFooter } from "@shadcn-ui";

const Footer = () => {
  return (
    <ShadFooter>
      <p>&copy; {new Date().getFullYear()} My App. All rights reserved.</p>
    </ShadFooter>
  );
};

export default Footer;
