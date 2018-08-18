import React, { Fragment } from 'react';
import styled from 'styled-components';

const Span = styled.span`
  float: left;
  margin-left: 20px;
`;
const Settings = () => (
  <Fragment>
    <Span>&#9776;</Span>
  </Fragment>
);

export default Settings;
