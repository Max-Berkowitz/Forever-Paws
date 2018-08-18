import React, { Component } from 'react';
import styled from 'styled-components';
import Profile from './Profile';

/* eslint react/prop-types:0 */
const CardStyle2 = styled.div`
  position: absolute;
  top: ${window.outerHeight * 0.1}px;
  width: ${window.innerWidth - 20}px;
  height: ${window.outerHeight * 0.8}px;
  border-radius: 15px;
  overflow: hidden;
  background: lightblue;
  color: palevioletred;
  border: 2px solid black;
`;
const ImgDiv2 = styled.div`
  position: relative;
`;
const Img2 = styled.img`
  width: auto;
  height: ${window.outerHeight * 0.55}px;
`;

export default class extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { profileQueue } = this.props;

    return (
      <CardStyle2>
        <ImgDiv2>
          <Img2 alt="dog" src={profileQueue.picture} />
        </ImgDiv2>
        <Profile profile={profileQueue} />
      </CardStyle2>
    );
  }
}
