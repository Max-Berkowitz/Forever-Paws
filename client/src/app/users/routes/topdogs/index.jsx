import React, { Component } from 'react';
import { get } from 'axios';

export default class extends Component {
  constructor(props) {
    super(props);
    this.state = { topDogs: [] };
  }

  async componentDidMount() {
    const { data } = await get('/api/animals/dailytop');
    this.setState('topDogs', data);
  }

  render() {
    let { topDogs } = this.state;
    return (
      <ul>
        {topDogs.map(pet => (
          <li />
        ))}
      </ul>
    );
  }
}
