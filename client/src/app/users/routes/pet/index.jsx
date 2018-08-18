import React, { Component, Fragment } from 'react';
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
      currentProfileIndex: 0,
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
      const temp = profileQueue.length;
      this.setState({
        profileQueue: [...profileQueue, ...data.animals],
      });
      if (!temp) {
        this.nextPet();
      }
    } catch (e) {
      Console.log(e);
    }
  }

  nextPet() {
    const { profileQueue, currentProfileIndex } = this.state;
    if (profileQueue.length - currentProfileIndex <= 2) {
      this.fetchPets();
    }
    this.setState({
      currentProfileIndex: currentProfileIndex + 1,
      currentProfileView: profileQueue[currentProfileIndex],
      nextProfileView: profileQueue[currentProfileIndex + 1],
    });
  }

  render() {
    const { currentProfileView, nextProfileView } = this.state;
    return (
      <Fragment>
        <NavComponent />
        <CardStack profileQueue={currentProfileView} nextPet={this.nextPet} />
        <CardStackBottom profileQueue={nextProfileView} />
        <BottomLaunchPad nextPet={this.nextPet} />
      </Fragment>
    );
  }
}
