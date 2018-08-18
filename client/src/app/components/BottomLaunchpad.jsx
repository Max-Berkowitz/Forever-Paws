import React from 'react';
import styled from 'styled-components';

/* eslint react/prop-types:0 */

function BottomLaunchpad(props) {
  const LaunchpadStyle = styled.div`
    position: absolute;
    top: ${window.outerHeight*.9}px;
    height:${window.outerHeight*.1}px;
    width:${window.outerWidth-20}px;
    align-items: center;
    border-radius: 3px;
    background: white;
    color: palevioletred;
    border: 2px solid palevioletred;
  `;

  const Button = styled.button`
    padding: 5px 5px 5px 5px;
    border-radius: 3px;
    margin: 20px 40px;
    background: transparent;
    color: palevioletred;
    border: 2px solid palevioletred;
  `;

  const { nextPet } = props;

  return (
    <LaunchpadStyle>
      <Button type="submit" onClick={nextPet}>
        {`Don't Like`}
      </Button>
      <Button type="submit" onClick={nextPet}>
        Like
      </Button>
    </LaunchpadStyle>
  );
}

export default BottomLaunchpad;
