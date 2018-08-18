import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Button = styled.button`
  border-radius: 3px;
  padding: 0.25em 1em;
  background: transparent;
  color: palevioletred;
  border: 2px solid palevioletred;
`;
const LandingPage = () => (
  <div style={{ textAlign: 'center' }}>
    <Link to="/pets">
      <Button type="button">Pets</Button>
    </Link>
  </div>
);

export default LandingPage;
