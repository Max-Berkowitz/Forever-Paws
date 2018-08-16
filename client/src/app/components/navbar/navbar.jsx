import React from 'react';
// import styled from 'styled-components';
import { Container } from 'styled-container-component';
import { Navbar, NavbarLink } from 'styled-navbar-component';
import { Nav } from 'styled-nav-component';
import { Link } from 'react-router-dom';

// const Nav = styled.a`
//   position: fixed;
//   width: 100%;
//   backround: black;
//   height: 56px;
// `;
const NavComponent = () => (
  <Container fluid>
    <Navbar expandSm light>
      <Nav justified>
        <Link to="/settings">
          <NavbarLink>
            <span>&#9776;</span>
          </NavbarLink>
        </Link>
        <Link to="/">
          <NavbarLink light>Forever Paws</NavbarLink>
        </Link>
        <Link to="/userProfile">
          <NavbarLink light>Your Profile</NavbarLink>
        </Link>
      </Nav>
    </Navbar>
  </Container>
);

export default NavComponent;
