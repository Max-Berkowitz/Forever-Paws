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
      if (localStorage.getItem('myLocationData')) {
        const { data } = await get('/api/animals/closest', {
          params: { location: JSON.parse(localStorage.getItem('myLocationData')) },
        });
        this.setState({
          profileQueue: profileQueue.concat(data.animals),
        });
      } else {
        const { data } = await get('/api/animals');
        this.setState({
          profileQueue: profileQueue.concat(data.animals),
        });
      }
      this.nextPet();
    } catch (e) {
      // eslint-disable-next-line
      console.log(e);
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
        <CardStack profile={currentProfileView} nextPet={this.nextPet} />
        <CardStackBottom profile={nextProfileView} />
        <BottomLaunchPad nextPet={this.nextPet} />
      </div>
    );
  }
}
