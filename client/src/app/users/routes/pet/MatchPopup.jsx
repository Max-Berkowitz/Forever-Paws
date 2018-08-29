import React from 'react';
import styled from 'styled-components';
import Profile from './Profile';

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
const PDiv = styled.div`
  z-index: 2;
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  background-color: rgba(0, 0, 0, 0.5);
`;
const PDivInner = styled.div`
  position: absolute;
  width: 75%;
  height: 70%;
  left: 5%;
  top: 5%;
  margin: auto;
  background: black;
  color: white;
`;
const Button = styled.button`
  position: 'relative';
  float: 'right';
  margin-right: 1em;
  border-radius: 3px;
  padding: 0.25em 1em;
  background: transparent;
  color: white;
  border: 2px solid white;
`;
export default function({ previousProfileView, togglePopup }) {
  // console.log('from popup', previousProfileView);
  return (
    <PDiv>
      <PDivInner>
        <h1>Its a Match!</h1>
        <br />
        <h2>This pet is availble for adoption:</h2>
        {previousProfileView ? (
          <div>
            <Profile profile={previousProfileView} />
            <ImgDiv>
              <Img alt="dog" src={previousProfileView.picture} />
            </ImgDiv>
          </div>
        ) : null}
        <Button type="button" onClick={togglePopup.bind(null, false)}>
          Cancel
        </Button>
      </PDivInner>
    </PDiv>
  );
}
