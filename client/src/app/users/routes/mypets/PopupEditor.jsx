import React, { Component } from 'react';
import { patch } from 'axios';
import styled from 'styled-components';

const ImgDiv = styled.div`
  position: relative;
  height: ${window.outerHeight * 0.5}px;
  border-radius: 15px;
  background: black;
`;
const Img = styled.img`
  max-width: auto;
  max-height: 100%;
  border-radius: 15px;
`;
const PDiv = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  background-color: rgba(0, 0, 0, 0.5);
`;
const PDivInner = styled.div`
  position: absolute;
  width: 500px;
  height: 800px;
  left: 5%;
  top: 5%;
  margin: auto;
  background: black;
`;

export default class extends Component {
  constructor(props) {
    super(props);
    /* eslint-disable react/prop-types */
    const { pet } = this.props;
    this.state = pet;

    this.onChange = this.onChange.bind(this);
    this.save = this.save.bind(this);
  }

  onChange({ target: { name, value } }) {
    this.setState({ [name]: value });
  }

  async save() {
    const { togglePopup, id } = this.props;
    await patch(`/api/animal/${id}`, this.state);
    togglePopup();
  }

  render() {
    const { togglePopup } = this.props;
    const { picture, age, description, breed, name } = this.state;
    return (
      <PDiv onClick={togglePopup}>
        <PDivInner onClick={e => e.stopPropagation()}>
          <ImgDiv>
            <Img alt="dog" src={picture} />
          </ImgDiv>
          <form style={{ color: 'white' }}>
            Name:
            <br />
            <input type="text" name="name" value={name} onChange={this.onChange} />
            <br />
            Age:
            <br />
            <input type="text" name="age" value={age} onChange={this.onChange} />
            <br />
            Breed:
            <br />
            <input type="text" name="breed" value={breed} onChange={this.onChange} />
            <br />
            Description:
            <br />
            <textarea type="text" name="description" value={description} onChange={this.onChange} />
            <br />
            <button type="submit" onClick={this.save}>
              Save
            </button>
            <button type="button" onClick={togglePopup}>
              Cancel
            </button>
          </form>
        </PDivInner>
      </PDiv>
    );
  }
}
