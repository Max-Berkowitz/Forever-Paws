import React, { Component } from 'react';
import { get } from 'axios';
import NavComponent from '../../navbar/index';
import CardStack from './CardStack';
import BottomLaunchPad from './BottomLaunchPad';
import CardStackBottom from './CardStackBottom';

export default class extends Component {
  constructor(props) {
    super(props);
    this.state = {
      profileQueue: [],
      currentProfileView: {},
      nextProfileView: {},
    };

    this.nextPet = this.nextPet.bind(this);
    this.fetchPets = this.fetchPets.bind(this);
  }

  componentDidMount() {
    this.fetchPets();
  }

  async fetchPets() {
    const Console = console;
    const { profileQueue } = this.state;
    try {
      const { data } = await get('/api/animals');
      this.setState({
        profileQueue: profileQueue.concat(data.animals),
      });
      this.nextPet();
    } catch (e) {
      Console.log(e);
    }
  }

  nextPet() {
    const { profileQueue, nextProfileView } = this.state;
    if (profileQueue.length < 3) {
      this.fetchPets();
    } else {
      this.setState({
        currentProfileView: nextProfileView.picture ? nextProfileView : profileQueue.splice(0, 1)[0],
        nextProfileView: profileQueue[0],
        profileQueue: profileQueue.slice(1),
      });
    }
  }

  render() {
    const { currentProfileView, nextProfileView } = this.state;
    return (
      <div style={{ 'background-image': 'linear-gradient(-155deg, #6868fd, #fa85a1)', height: '100vh' }}>
        <NavComponent />
        <CardStack profileQueue={currentProfileView} nextPet={this.nextPet} />
        <CardStackBottom profileQueue={nextProfileView} />
        <BottomLaunchPad nextPet={this.nextPet} />
      </div>
    );
  }
}
