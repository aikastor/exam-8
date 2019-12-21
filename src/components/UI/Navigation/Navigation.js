import React from 'react';
import {Nav, Navbar, NavbarBrand, NavItem, NavLink} from "reactstrap";
import {NavLink as RouterNavLink} from "react-router-dom";

const Navigation = () => {
  return (
      <Navbar color="light" light expand="md">
        <NavbarBrand tag={RouterNavLink} to="/">Quotes</NavbarBrand>
        <Nav className="mr-auto" navbar>
          <NavItem>
            <NavLink tag={RouterNavLink} to="/add-quote/">New Quote</NavLink>
          </NavItem>
        </Nav>
      </Navbar>
  );
};

export default Navigation;