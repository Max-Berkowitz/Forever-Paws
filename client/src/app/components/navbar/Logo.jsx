import React, { Fragment } from 'react';
import styled from 'styled-components';
import logo from '../../Images/pawLogo.svg';

const Img = styled.img`
  display: block;
  margin-left: auto;
  margin-right: auto;
  max-width: 30px;
`;
const Logo = () => (
  <Fragment>
    <Img src={logo} alt="paws" />
  </Fragment>
);

export default Logo;
