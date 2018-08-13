import React, {Component} from 'react';
// import Button from '@material-ui/core/Button';

import PetProfile from './components/petProfile.jsx';
import UserProfile from './components/userProfile.jsx';

class App extends Component {
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
        }
      ],
      date: new Date(),
      currentProfileIndex: 0,
      currentProfileView: {}
    };
  }

  componentDidMount() {
    this.nextPet();
  }

  nextPet = () => { 
    this.setState({
      currentProfileView: this.state.profileQueue[this.state.currentProfileIndex],
      currentProfileIndex: this.state.currentProfileIndex+1
    })
  }

  tempStyleDELETE = {
    margin: '5px',
    border: '1px solid red'
  };

  render() {
    return (
      <div>
        <UserProfile />
        <h2>Doggie Swipe {this.state.date.toLocaleTimeString()}.</h2>
        <PetProfile profileQueue={this.state.currentProfileView}/>
        <button type='submit' style={this.tempStyleDELETE} onClick={this.nextPet}>Like</button>
        <button type='submit' style={this.tempStyleDELETE} onClick={this.nextPet}>Don't Like</button>
      </div>
    );
  }
}

export default App;

