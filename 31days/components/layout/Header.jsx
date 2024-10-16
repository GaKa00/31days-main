// src/components/Layout/Header.js
import React from "react";
import { Navbar, NavItem } from "@shadcn-ui";

const Header = () => {
  return (
    <Navbar>
      <Navbar.Brand>
        <h1>My App</h1>
      </Navbar.Brand>
      <Navbar.Nav>
        <NavItem href="/">Home</NavItem>
        <NavItem href="/profile">Profile</NavItem>
        <NavItem href="/login">Login</NavItem>
      </Navbar.Nav>
    </Navbar>
  );
};

export default Header;
