import React, { Component } from 'react';
import { get } from 'axios';
import PetListEntry from './PetListEntry';
import PopupEditor from './PopupEditor';

export default class extends Component {
  constructor(props) {
    super(props);
    this.state = { myPets: [], popUp: false, petToEdit: {}, petId: 0 };

    this.togglePopup = this.togglePopup.bind(this);
    this.pickPet = this.pickPet.bind(this);
  }

  async componentDidMount() {
    const {
      data: { myPets },
    } = await get('/api/animals/my');
    this.setState({ myPets });
  }

  togglePopup() {
    const { popUp } = this.state;
    this.setState({ popUp: !popUp });
  }

  pickPet(petToEdit, petId) {
    this.setState({ petToEdit, petId });
    this.togglePopup();
  }

  render() {
    const { myPets, popUp, petToEdit, petId } = this.state;
    return (
      <div style={{ backgroundImage: 'linear-gradient(-155deg, #6868fd, #fa85a1)', height: `${70 * myPets.length}vh` }}>
        <ul>
          {myPets.map(pet => (
            <PetListEntry pet={pet} pickPet={this.pickPet} />
          ))}
        </ul>
        {popUp ? <PopupEditor pet={petToEdit} id={petId} togglePopup={this.togglePopup} /> : null}
      </div>
    );
  }
}
