import React, { Component } from 'react';
import { get } from 'axios';
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

export default class extends Component {
  constructor(props) {
    super(props);
    this.state = { topDogs: [] };
  }

  async componentDidMount() {
    const { data } = await get('/api/animals/dailytop');
    this.setState({ topDogs: data.dailyTop });
  }

  render() {
    const { topDogs } = this.state;
    return (
      <div style={{ 'background-image': 'linear-gradient(-155deg, #6868fd, #fa85a1)', height: '325vh' }}>
        <ul>
          {topDogs.map(({ picture, name, age, likeCounter, breed }) => (
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
          ))}
        </ul>
      </div>
    );
  }
}
