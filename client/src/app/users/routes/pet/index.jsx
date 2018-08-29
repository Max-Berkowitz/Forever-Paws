import React, { Component } from 'react';
import { get } from 'axios';
import NavComponent from '../../navbar/index';
import CardStack from './CardStack';
import BottomLaunchPad from './BottomLaunchPad';
import CardStackBottom from './CardStackBottom';
import MatchPopup from './MatchPopup';

export default class extends Component {
  constructor(props) {
    super(props);
    this.state = {
      profileQueue: [],
      currentProfileView: {},
      nextProfileView: {},
      previousProfileView: {},
      matchPopup: false,
    };

    this.nextPet = this.nextPet.bind(this);
    this.fetchPets = this.fetchPets.bind(this);
    this.togglePopup = this.togglePopup.bind(this);
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
    const { profileQueue, nextProfileView, currentProfileView, previousProfileView } = this.state;
    if (profileQueue.length < 5) {
      this.fetchPets();
    } else {
      this.setState({
        previousProfileView: currentProfileView.picture ? currentProfileView : null,
        currentProfileView: nextProfileView.picture ? nextProfileView : profileQueue.pop(),
        nextProfileView: profileQueue.pop(),
        profileQueue,
      });
    }
    // console.log('CURR', currentProfileView);
    // console.log('PREV', previousProfileView);
    // console.log('Next', nextProfileView);
  }

  togglePopup(close = false) {
    const {
      currentProfileView: { adoptable },
    } = this.state;
    if (close) {
      if (adoptable) {
        this.setState({ matchPopup: true });
      }
    } else {
      this.setState({ matchPopup: false });
    }
  }

  render() {
    const { currentProfileView, nextProfileView, previousProfileView, matchPopup } = this.state;

    return (
      <div style={{ 'background-image': 'linear-gradient(-155deg, #6868fd, #fa85a1)', height: '100vh' }}>
        <NavComponent />
        <CardStack profile={currentProfileView} nextPet={this.nextPet} togglePopup={this.togglePopup} />
        <CardStackBottom profile={nextProfileView} />
        <BottomLaunchPad nextPet={this.nextPet} id={currentProfileView.id} togglePopup={this.togglePopup} />
        {matchPopup ? <MatchPopup togglePopup={this.togglePopup} previousProfileView={previousProfileView} /> : null}
      </div>
    );
  }
}
