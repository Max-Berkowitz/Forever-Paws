import React, { Component } from 'react';
import axios from 'axios';
import NavComponent from './navbar/navbar';
import CardStack from './CardStack';
import BottomLaunchPad from './BottomLaunchpad';

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      profileQueue: [
        {
          name: 'Peter',
          breed: 'golden corgie',
          age: '3 years old',
          description: 'Lets skip the small talk and go for a walk',
          picture: ['https://i.ytimg.com/vi/SfLV8hD7zX4/maxresdefault.jpg'],
          location: '20057',
        },
        {
          name: 'Bones',
          breed: 'bulldog',
          age: '2 years old',
          description: 'Lets play fetch',
          picture: ['https://i.ytimg.com/vi/SfLV8hD7zX4/maxresdefault.jpg'],
          location: '45693',
        },
        {
          name: 'Rover',
          breed: 'golden corgie',
          age: '1 years old',
          description: 'Cute and fluffy',
          picture: ['https://i.ytimg.com/vi/SfLV8hD7zX4/maxresdefault.jpg'],
          location: '82179',
        },
        {
          name: 'Spot',
          breed: 'pug',
          age: '5 years old',
          description: 'Friendly and playful',
          picture: ['https://i.ytimg.com/vi/SfLV8hD7zX4/maxresdefault.jpg'],
          location: '90210',
        },
        {
          name: 'Last Dog',
          breed: 'Last Dog',
          age: 'Last Dog',
          description: 'Last Dog',
          picture: ['https://i.ytimg.com/vi/SfLV8hD7zX4/maxresdefault.jpg'],
          location: 'Last Dog',
        },
      ],
      currentProfileIndex: 0,
      currentProfileView: {},
    };

    this.nextPet = this.nextPet.bind(this);

    this.tempStyleDELETE = {
      margin: '5px',
      border: '1px solid red',
    };
  }

  componentDidMount() {
    const { profileQueue } = this.state;
    axios
      .post('api/animal', {
        profileQueue,
      })
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.log('post error', error);
      });
    axios
      .get('api/animals')
      .then(response => {
        this.setState({
          profileQueue: response.data,
        });
      })
      .catch(error => console.log(error));
    this.nextPet();
  }

  handleClick(e) {
    e.preventDefault();
    this.nextPet();
  }

  nextPet() {
    const { profileQueue, currentProfileIndex } = this.state;
    this.setState({
      currentProfileView: profileQueue[currentProfileIndex],
      currentProfileIndex: currentProfileIndex + 1,
    });
  }

  render() {
    const { currentProfileView } = this.state;
    // const Button = styled.button`
    //   border-radius: 3px;
    //   padding: 0.25em 1em;
    //   margin: 0 1em;
    //   background: transparent;
    //   color: palevioletred;
    //   border: 2px solid palevioletred;
    // `;

    return (
      <div>
        <NavComponent />
        <CardStack profileQueue={currentProfileView} />
        <BottomLaunchPad nextPet={this.nextPet} />
      </div>
    );
  }
}

export default HomePage;
