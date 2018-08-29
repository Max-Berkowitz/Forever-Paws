import React, { Component, Fragment } from 'react';
import Nav from '../navbar/index';
import MyPets from './PetListEntries';

export default class extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Fragment>
        <Nav />
        <MyPets />
      </Fragment>
    );
  }
}
