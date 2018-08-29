import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import heart from '../../images/heart.png';
import profile from '../../images/profile.png';

const Header = styled.header`
  height: 50px;
  width: 100%;
`;
// const Nav = styled.nav`
//   position: relative;
//   -webkit-transform: translateY(-50%);
//   -ms-transform: translateY(-50%);
//   -moz-transform: translateY(-50%);
//   -o-transform: translateY(-50%);
//   transform: translateY(-50%);
//   top: 50%;
// `;

const NavBar = () => (
  <Header>
    <nav style={{ textAlign: 'center', padding: '20px' }}>
      <Link to="/user">
        <img src={profile} style={{ float: 'left', color: 'white', height: '30px', width: '30px' }} alt="profile" />
      </Link>
      <Link to="/pets">
        <span style={{ paddingleft: '20px', color: 'white', fontSize: '28px' }}> Paws.</span>
      </Link>
      <Link to="/topdogs">
        <img src={heart} style={{ float: 'right', color: 'white', height: '30px', width: '30px' }} alt="heart" />
      </Link>
    </nav>
  </Header>
);

export default NavBar;
