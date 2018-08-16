import React from 'react';
import styled from 'styled-components';

import Profile from './Profile';
/* eslint react/prop-types:0 */
function CardStack({ profileQueue }) {
  const CardStyle = styled.div`
    border-radius: 15px;
    margin: 0.5em 0em 0.5em 0em;
    background: transparent;
    color: palevioletred;
    border: 2px solid palevioletred;
  `;

  const imgDiv = styled.div`
    position: relative;
  `;
  const Img = styled.img`
    width: 100%;
    height: auto;
  `;

  return (
    <CardStyle>
      <imgDiv>
        <Img alt="dog" src={profileQueue.picture} />
      </imgDiv>
      <Profile props={profileQueue} />
    </CardStyle>
  );
}

// CardStack.propTypes = {
//     profileQueue: PropTypes.element.isRequired
//   };

export default CardStack;
