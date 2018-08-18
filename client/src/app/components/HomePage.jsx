import React, { Component } from 'react';
import axios from 'axios';
import NavComponent from './navbar/navbar';
import CardStack from './CardStack';
import BottomLaunchPad from './BottomLaunchpad';
import CardStackBottom from './CardStackBottom';

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      profileQueue: [],
      currentProfileIndex: 0,
      currentProfileView: {},
      nextProfileView: {},
    };

    this.nextPet = this.nextPet.bind(this);
    this.fetchPets = this.fetchPets.bind(this);

    this.tempStyleDELETE = {
      margin: '5px',
      border: '1px solid red',
    };
  }

  componentDidMount() {
    this.fetchPets();
  }
  
  async fetchPets() {
    const Console = console;
    const { profileQueue} = this.state;
    try {
      const { data } = await axios.get('/api/animals');
      let temp = profileQueue.length;
      this.setState({
        profileQueue: [...profileQueue,...data.animals],
      });
      if(temp ===0) {
        this.nextPet();
      }
    } catch (e) {
      Console.log(e);
    }
  }

  nextPet() {
    const { profileQueue, currentProfileIndex } = this.state;
    console.log(profileQueue.length)
    if (profileQueue.length-currentProfileIndex<=2) {
      this.fetchPets();
    } 
      this.setState({
        currentProfileIndex: currentProfileIndex+1,
        currentProfileView: profileQueue[currentProfileIndex],
        nextProfileView: profileQueue[currentProfileIndex+1],
      });
    
  }

  render() {
    const { currentProfileView, nextProfileView} = this.state;
    return (
      <div>
        <NavComponent />
        <CardStack profileQueue={currentProfileView} nextPet={this.nextPet}/>
        <CardStackBottom profileQueue={nextProfileView} />
        <BottomLaunchPad nextPet={this.nextPet} />
      </div>
    );
  }
}

export default HomePage;
