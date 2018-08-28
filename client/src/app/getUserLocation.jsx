import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import styled from 'styled-components';

const Button = styled.button`
  float: 'right';
  margin-right: 1em;
  border-radius: 3px;
  padding: 0.25em 1em;
  background: transparent;
  color: white;
  border: 2px solid white;
`;

export default class extends Component {
  constructor(props) {
    super(props);
    this.state = { redirect: false };
    this.setRedirect = this.setRedirect.bind(this);
  }

  componentDidMount() {
    if (localStorage.getItem('myLocationData')) {
      this.setRedirect();
    } else {
      navigator.geolocation.getCurrentPosition(data => {
        const locationData = {
          userLatitude: data.coords.latitude,
          userLongitude: data.coords.longitude,
        };
        localStorage.setItem('myLocationData', JSON.stringify(locationData));
        this.setRedirect();
      });
    }
  }

  setRedirect() {
    this.setState({ redirect: true });
  }

  render() {
    const { redirect } = this.state;
    return (
      <div style={{ 'background-image': 'linear-gradient(-155deg, #6868fd, #fa85a1)', height: '100vh' }}>
        {redirect ? <Redirect to="/pets" /> : null}
        HELLO, Loading location data please wait...
        <Button type="submit" onClick={this.setRedirect}>
          Redirect
        </Button>
      </div>
    );
  }
}
