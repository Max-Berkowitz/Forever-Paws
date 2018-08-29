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
    const { profileQueue } = this.state;
    try {
      const {
        data: { animals },
      } = await get('/api/animals', {
        params: { location: localStorage.getItem('myLocationData') },
      });
      if (!animals.length) return;
      this.setState({
        profileQueue: animals.concat(profileQueue),
      });

      this.nextPet();
    } catch (e) {
      // eslint-disable-next-line
      console.log(e);
    }
  }

  nextPet() {
    const { profileQueue, nextProfileView } = this.state;
    if (profileQueue.length < 5) {
      this.fetchPets();
    } else {
      this.setState({
        currentProfileView: nextProfileView.picture ? nextProfileView : profileQueue.pop(),
        nextProfileView: profileQueue.pop(),
        profileQueue,
      });
    }
  }

  render() {
    const { currentProfileView, nextProfileView } = this.state;
    return (
      <div style={{ 'background-image': 'linear-gradient(-155deg, #6868fd, #fa85a1)', height: '100vh' }}>
        <NavComponent />
        <CardStack profile={currentProfileView} nextPet={this.nextPet} />
        <CardStackBottom profile={nextProfileView} />
        <BottomLaunchPad nextPet={this.nextPet} id={currentProfileView.id} />
      </div>
    );
  }
}
