import React, { Component } from 'react';
// import Dropzone from 'react-dropzone';
import axios, { post } from 'axios';
import styled from 'styled-components';
import { cloud } from '../../../../../../config/config';
import Dropzone from './dropzonetest';
import dislike from '../../../images/dislike.png';

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
const SubmitButton = styled.button`
  float: 'right';
  margin-right: 1em;
  border-radius: 3px;
  padding: 0.25em 1em;
  background: transparent;
  color: white;
  border: 2px solid white;
`;

const Button = styled.button`
  background: transparent;
  border: 0;
`;
export default class extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: null,
      breed: null,
      description: null,
      age: null,
      photos: [],
    };

    this.onChange = this.onChange.bind(this);
    this.onDrop = this.onDrop.bind(this);
    this.onsubmit = this.onsubmit.bind(this);
  }

  onChange(event) {
    const change = {};
    change[event.target.id] = event.target.value;
    this.setState(change);
  }

  // this function uploads all files dropped into the the DropZone to Cloudinary, more info here:
  // https://tinyurl.com/y873sr55
  onDrop(files) {
    // Push all the axios request promises into a single array
    const uploaders = files.map(file => {
      // Initial FormData
      const formData = new FormData();
      formData.append('file', file);
      formData.append('tags', `codeinfuse, medium, gist`);
      // Replace the preset name with your own ***********
      formData.append('upload_preset', cloud.cloudinaryPresetName);
      // Replace API key with your own Cloudinary key  ***********
      // images are hosted on Cloudinary, you can set up your own free account
      formData.append('api_key', cloud.cloudinaryKey);
      formData.append('timestamp', (Date.now() / 1000) | 0);
      // Make an AJAX upload request using Axios (replace Cloudinary URL below with your own) ***********
      return axios
        .post(cloud.CloudinaryURL, formData, {
          headers: { 'X-Requested-With': 'XMLHttpRequest' },
        })
        .then(({ data }) => {
          const { photos } = this.state;
          const { secure_url } = data;
          photos.push(secure_url);
        });
    });

    // Once all the files are uploaded
    axios.all(uploaders).then(() => {
      const { photos } = this.state;

      const temp = [];
      photos.forEach(ele => {
        temp.push({ url: ele });
      });
      this.setState({
        photosData: temp,
      });
    });
  }

  onsubmit() {
    const { name, breed, description, age, photosData } = this.state;

    const submission = {
      name,
      breed,
      age,
      description,
      picture: photosData[0].url,
    };
    post('/api/animal', submission)
      .then(() => console.log('submitted!'))
      .catch(err => console.log(err));
  }

  picOrUpload() {
    const { photosData } = this.state;

    if (photosData) {
      return (
        <div>
          <ImgDiv>
            <Img alt="dog" src={photosData[0].url} />
          </ImgDiv>
          <Button
            style={{ float: 'right' }}
            type="submit"
            onClick={() => {
              this.setState({
                photosData: false,
              });
              console.log('YOYOYOYOY');
            }}
          >
            <img
              src={dislike}
              style={{ float: 'right', color: 'white', height: '60px', width: '60px' }}
              alt="profile"
            />
          </Button>
        </div>
      );
    }
    return (
      <div className="dropzone">
        {/* https://www.npmjs.com/package/react-dropzone */}
        <Dropzone onDrop={this.onDrop} multiple accept="image/jpeg, image/png" maxSize={5242880}>
          <p>Add some pet photos dawg!</p>
        </Dropzone>
      </div>
    );
  }

  render() {
    const { name, breed, description, age, photos } = this.state;

    return (
      <div style={{ 'background-image': 'linear-gradient(-155deg, #6868fd, #fa85a1)', height: '100vh' }}>
        user upload dawg
        <div>
          Whats your pets name?
          <input type="text" id="name" value={name} onChange={this.onChange} />
        </div>
        <div>
          Whats your pets breed?
          <input type="text" id="breed" value={breed} onChange={this.onChange} />
        </div>
        <div>
          Whats your pets description?
          <input type="text" id="description" value={description} onChange={this.onChange} />
        </div>
        <div>
          Whats your pets age?
          <input type="text" id="age" value={age} onChange={this.onChange} />
        </div>
        <div>{photos.length} File(s) Uploaded</div>
        <SubmitButton onClick={this.onsubmit}>submit</SubmitButton>
        <div>{this.picOrUpload()}</div>
      </div>
    );
  }
}
