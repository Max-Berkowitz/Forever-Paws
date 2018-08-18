import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Logo from '../../images/pawLogo.svg';
import Settings from './Settings';
import Profile from './YourProfile';

const Header = styled.header`
  height: 50px;
  width: 100%;
  background-color: #ffb3da;
`;
const Nav = styled.nav`
  position: relative;
  -webkit-transform: translateY(-50%);
  -ms-transform: translateY(-50%);
  -moz-transform: translateY(-50%);
  -o-transform: translateY(-50%);
  transform: translateY(-50%);
  top: 50%;
`;

const NavBar = () => (
  <Header>
    <Nav>
      <Link to="/settings">
        <Settings />
      </Link>
      <Link to="/">
        <Logo />
      </Link>
      <Link to="/profile">
        <Profile />
      </Link>
    </Nav>
  </Header>
);

export default NavBar;
