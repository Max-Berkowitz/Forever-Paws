import React, { Component } from 'react';
import { get } from 'axios';
import TopPetListEntry from './TopPetListEntry';

export default class extends Component {
  constructor(props) {
    super(props);
    this.state = { dailyTop: [] };
  }

  async componentDidMount() {
    const {
      data: { dailyTop },
    } = await get('/api/animals/dailytop');
    this.setState({ dailyTop });
  }

  render() {
    const { dailyTop } = this.state;
    return (
      <div style={{ 'background-image': 'linear-gradient(-155deg, #6868fd, #fa85a1)', height: '325vh' }}>
        <ul>
          {dailyTop.map(pet => (
            <TopPetListEntry pet={pet} />
          ))}
        </ul>
      </div>
    );
  }
}
