import React, { Component } from 'react';
import styled from 'styled-components';
// import Profile from './Profile';

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
        {/* <Profile profile={profileQueue} /> */}
      </CardStyle2>
    );
  }
}
