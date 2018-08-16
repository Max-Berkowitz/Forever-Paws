import React from 'react';
import styled from 'styled-components';

/* eslint react/prop-types:0 */

function Profile({ props }) {
  const ProfileStyle = styled.div`
    background: lightpink;
    border-radius: 3px;
    margin: 0.5em;
    padding: 0.25em 1em;
    color: palevioletred;
    border: 2px solid palevioletred;
  `;

  const { name, age, breed, location, description } = props;
  return (
    <ProfileStyle>
      <h1>
        {name}, {age}
      </h1>
      <h4>{breed} </h4>
      <h5> Location: {location}</h5>
      <h5>{description} </h5>
    </ProfileStyle>
  );
}

export default Profile;
