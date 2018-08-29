import React from 'react';
import styled from 'styled-components';
import Profile from './Profile';

/* eslint react/prop-types:0 */

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
  return (
    <PDiv onClick={() => togglePopup(false)}>
      <PDivInner onClick={e => e.stopPropagation()}>
        <h1>Its a Match!</h1>
        <br />
        <h2>This pet is availble for adoption:</h2>
        {previousProfileView ? (
          <div>
            <Profile profile={previousProfileView} />
            <br />
            {Math.floor(previousProfileView.distance * 0.000621371)} miles away
            <br />
            <a href={`https://${previousProfileView.website}`} rel="noopener noreferrer" target="_blank">
              Shelter
              {`'`}s website
            </a>
            <ImgDiv>
              <Img alt="dog" src={previousProfileView.picture} />
            </ImgDiv>
          </div>
        ) : null}
        <Button type="button" onClick={() => togglePopup(false)}>
          Cancel
        </Button>
      </PDivInner>
    </PDiv>
  );
}
