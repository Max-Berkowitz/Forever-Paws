import React from 'react';
import styled from 'styled-components';
import { patch } from 'axios';
import dislike from '../../../images/dislike.png';
import like from '../../../images/like.png';

const LaunchpadStyle = styled.div`
  position: absolute;
  top: 85%;
  height: 15%;
  width: 75%;
  margin-left: 12%;
  margin-right: 12%;
  background: transparent;
`;

const Button = styled.button`
  background: transparent;
  border: 0;
`;

/* eslint react/prop-types:0 */
export default ({ nextPet, id, togglePopup }) => (
  <LaunchpadStyle>
    <Button type="submit" onClick={nextPet}>
      <img src={dislike} style={{ float: 'left', color: 'white', height: '60px', width: '60px' }} alt="profile" />
    </Button>
    <Button
      style={{ float: 'right' }}
      type="submit"
      onClick={() => {
        patch('/api/animal/addlike', { id });
        togglePopup(true);
        nextPet();
      }}
    >
      <img src={like} style={{ float: 'right', color: 'white', height: '60px', width: '60px' }} alt="profile" />
    </Button>
  </LaunchpadStyle>
);
