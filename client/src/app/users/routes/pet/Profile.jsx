import React, { Component } from 'react';
import styled from 'styled-components';

/* eslint react/prop-types:0 */
const ProfileStyle = styled.div`
  position: absolute;
  z-index: 2;
  top: 70%;
  width: 100%;
  height: 30%;
  overflow: hidden;
  padding-top: 4%;
  color: white;
`;

const P = styled.p`
  font-family: 'Open Sans', sans-serif;
  font-size: 12px;
  margin: 0;
  font-weight: 100;
`;
const Span = styled.span`
  font-family: 'Open Sans', sans-serif;
  font-size: 12px;
  margin: 0;
  font-weight: 100;
`;
const P1 = styled.p`
  font-family: 'Open Sans', sans-serif;
  font-size: 24px;
  font-weight: 100;
  margin: 0;
`;

export default class extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { profile } = this.props;
    const { name, age, breed, location, description } = profile;
    return (
      <ProfileStyle>
        <P1>
          {name}, {age}
        </P1>
        <Span style={{ float: 'left', 'font-style': 'italic' }}>{breed}</Span>{' '}
        {/* <Span style={{ float: 'right' }}>zip: {location} </Span> */}
        <P>
          <br />
          <br />
          {`"${description}"`}
        </P>
      </ProfileStyle>
    );
  }
}
