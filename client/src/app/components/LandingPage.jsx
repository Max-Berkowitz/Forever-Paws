import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Button = styled.button`
  text-align: center;
  justify-content: center;
  border-radius: 3px;
  padding: 0.25em 1em;
  background: transparent;
  color: palevioletred;
  border: 2px solid palevioletred;
`;
const LandingPage = () => (
  <div style={{ 'text-align': 'center' }}>
    <Link to="/pets">
      <Button type="button">Pets</Button>
    </Link>
  </div>
);

export default LandingPage;
