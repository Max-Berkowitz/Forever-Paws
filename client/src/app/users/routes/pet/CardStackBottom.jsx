import React from 'react';
import styled from 'styled-components';

/* eslint react/prop-types:0 */
const CardStyle2 = styled.div`
  position: absolute;
  z-index: 1;
  margin-left: 12%;
  margin-right: 12%;
  top: 12%;
  width: 75%;
  height: 70%;
  border-radius: 15px;
  overflow: hidden;
`;
const ImgDiv2 = styled.div`
  position: relative;
  height: ${window.outerHeight * 0.5}px;
  border-radius: 15px;
  background: black;
`;
const Img2 = styled.img`
  max-width: auto;
  max-height: 100%;
  border-radius: 15px;
`;

export default ({ profile: { picture } }) => (
  <CardStyle2>
    <ImgDiv2>
      <Img2 alt="dog" src={picture} />
    </ImgDiv2>
  </CardStyle2>
);
