import React, { Component } from 'react';
import styled from 'styled-components';

/* eslint react/prop-types:0 */
const ProfileStyle = styled.div`
  height: ${window.outerHeight * 0.2}px;
  border-radius: 4px;
  margin: 0.2em;
  padding: 0.5em 0.5em 0.5em 0.5em;
  color: palevioletred;
  border: 2px solid palevioletred;
  background: orange;
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
        <h1>
          {name}, {age}
        </h1>
        <h4>{breed} </h4>
        <h5> Location: {location} </h5>
        <h5>{description} </h5>
      </ProfileStyle>
    );
  }
}
