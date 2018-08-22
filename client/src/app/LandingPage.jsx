import React from 'react';
// import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { post } from 'axios';

const sampleData = [
  {
    name: 'Peter',
    breed: 'golden corgie',
    age: '3 years old',
    description: 'Lets skip the small talk and go for a walk',
    picture: 'https://i.ytimg.com/vi/SfLV8hD7zX4/maxresdefault.jpg',
  },
  {
    name: 'Bones',
    breed: 'bulldog',
    age: '2 years old',
    description: 'Lets play fetch',
    picture: 'https://pbs.twimg.com/profile_images/948761950363664385/Fpr2Oz35_400x400.jpg',
  },
  {
    name: 'Rover',
    breed: 'golden corgie',
    age: '1 years old',
    description: 'Cute and fluffy',
    picture: 'https://weloveanimals.me/wp-content/uploads/2017/10/gettyimages-590486672-e1508512743796.jpg',
  },
  {
    name: 'Spot',
    breed: 'pug',
    age: '5 years old',
    description: 'Friendly and playful',
    picture: 'https://www.catster.com/wp-content/uploads/2017/08/A-fluffy-cat-looking-funny-surprised-or-concerned.jpg',
  },
  {
    name: 'Last Dog',
    breed: 'Last Dog',
    age: 'Last Dog',
    description: 'Last Dog',
    picture:
      'https://cdn.vox-cdn.com/thumbor/wng90rt7pFT3o_oPRNV21iK-2x8=/0x0:4560x3041/1200x800/filters:focal(1916x1157:2644x1885)/cdn.vox-cdn.com/uploads/chorus_image/image/58504395/911428568.jpg.0.jpg',
  },
];

const makeData = (e, i = 0) => {
  if (!sampleData[i]) return;
  post('/api/animal', sampleData[i])
    .then(() => makeData(e, i + 1))
    .catch(err => console.log(err));
};

const Button = styled.button`
  border-radius: 3px;
  padding: 0.25em 1em;
  background: transparent;
  color: palevioletred;
  border: 2px solid palevioletred;
`;
const LandingPage = () => (
  <div style={{ textAlign: 'center' }}>
    <a href="/auth/google">
      <Button type="button">Login google</Button>
    </a>
    <a href="/auth/facebook">
      <Button type="button">Login facebook</Button>
    </a>
    <button type="button" onClick={makeData}>
      Hello
    </button>
  </div>
);

export default LandingPage;
