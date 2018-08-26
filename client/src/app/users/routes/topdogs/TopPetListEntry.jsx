import React from 'react';
import styled from 'styled-components';

const ImgDiv = styled.div`
  position: relative;
  height: ${window.outerHeight * 0.5}px;
  border-radius: 15px;
  background: black;
`;
const Img = styled.img`
  max-width: auto;
  max-height: 100%;
  border-radius: 15px;
`;

/* eslint-disable react/prop-types */
export default ({ pet: { picture, name, age, likeCounter, breed } }) => (
  <li style={{ listStyleType: 'none', color: 'white', paddingTop: '40px' }}>
    <ImgDiv>
      <Img alt="dog" src={picture} />
    </ImgDiv>
    <span>
      {name}, {age}
    </span>
    <br />
    <span style={{ float: 'left', 'font-style': 'italic' }}>{breed}</span>
    <br />
    <span style={{ fontWeight: 'bold' }}>{`Like Count: ${likeCounter}`}</span>
    <br />
  </li>
);
