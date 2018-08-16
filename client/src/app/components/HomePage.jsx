import React, { Component } from 'react';
import axios from 'axios';
import NavComponent from './navbar/navbar';
import CardStack from './CardStack';
import BottomLaunchPad from './BottomLaunchpad';

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      profileQueue: [],
      currentProfileIndex: 0,
      currentProfileView: {},
    };

    this.nextPet = this.nextPet.bind(this);

    this.tempStyleDELETE = {
      margin: '5px',
      border: '1px solid red',
    };
  }

  async componentDidMount() {
    const Console = console;
    try {
      const { data } = await axios.get('/api/animals');
      this.setState({
        profileQueue: data.animals,
      });
      this.nextPet();
    } catch (e) {
      Console.log(e);
    }
  }

  handleClick(e) {
    e.preventDefault();
    this.nextPet();
  }

  nextPet() {
    const { profileQueue, currentProfileIndex } = this.state;
    if (currentProfileIndex === profileQueue.length) {
      this.setState({
        currentProfileView: profileQueue[0],
        currentProfileIndex: 0,
      });
    } else {
      this.setState({
        currentProfileView: profileQueue[currentProfileIndex],
        currentProfileIndex: currentProfileIndex + 1,
      });
    }
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
