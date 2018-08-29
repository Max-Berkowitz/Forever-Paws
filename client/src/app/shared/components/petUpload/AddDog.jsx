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
const Video = styled.video`
  width: 512px;
  max-width: 100%;
  display: none;
  margin: auto;
`;
const Button = styled.button`
  background: transparent;
  border: 0;
`;
let picture;
console.log(picture);
function initializeMedia() {
  const videoPlayer = document.getElementById('player');
  console.log('video player', videoPlayer);
  if (!('mediaDevices' in navigator)) {
    navigator.mediaDevices = {};
  }
  if (!('getUserMedia' in navigator.mediaDevices)) {
    navigator.mediaDevices.getUserMedia = constraints => {
      const getUserMedia = navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
      if (!getUserMedia) {
        return Promise.reject(new Error('getUserMedia is not implemented!'));
      }
      return new Promise((resolve, reject) => {
        getUserMedia.call(navigator, constraints, resolve, reject);
      });
    };
  }
  navigator.mediaDevices
    .getUserMedia({ video: true })
    .then(stream => {
      videoPlayer.srcObject = stream;
      videoPlayer.style.display = 'block';
    })
    .catch(err => {
      // eslint-disable-next-line
      console.log(err);
    });
}
function dataURItoBlob(dataURI) {
  // convert base64 to raw binary data held in a string
  const byteString = atob(dataURI.split(',')[1]);

  // separate out the mime component
  const mimeString = dataURI
    .split(',')[0]
    .split(':')[1]
    .split(';')[0];

  // write the bytes of the string to an ArrayBuffer
  const arrayBuffer = new ArrayBuffer(byteString.length);
  const ia = new Uint8Array(arrayBuffer);
  for (let i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }

  const dataView = new DataView(arrayBuffer);
  const blob = new Blob([dataView], { type: mimeString });
  return blob;
}
function saveImg() {
  const videoPlayer = document.getElementById('player');
  const canvasElement = document.getElementById('canvas');
  const captureButton = document.getElementById('pictureButton');
  canvasElement.style.display = 'block';
  videoPlayer.style.display = 'none';
  captureButton.style.display = 'none';
  const context = canvasElement.getContext('2d');
  context.drawImage(videoPlayer, 0, 0, canvas.width, videoPlayer.videoHeight / (videoPlayer.videoWidth / canvas.width));
  videoPlayer.srcObject.getVideoTracks().forEach(track => {
    track.stop();
  });
  picture = dataURItoBlob(canvasElement.toDataURL());
  const formData = new FormData();
  formData.append('file', picture);
  formData.append('tags', `codeinfuse, medium, gist`);
  // Replace the preset name with your own ***********
  formData.append('upload_preset', cloud.cloudinaryPresetName);
  // Replace API key with your own Cloudinary key  ***********
  // images are hosted on Cloudinary, you can set up your own free account
  formData.append('api_key', cloud.cloudinaryKey);
  formData.append('timestamp', Math.floor(Date.now() / 1000));
  // Make an AJAX upload request using Axios (replace Cloudinary URL below with your own) ***********
  axios
    .post(cloud.CloudinaryURL, formData, {
      headers: { 'X-Requested-With': 'XMLHttpRequest' },
    })
    .then(({ data: { secure_url: url } }) => {
      console.log(url);
    });
}
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
      formData.append('timestamp', Math.floor(Date.now() / 1000));
      // Make an AJAX upload request using Axios (replace Cloudinary URL below with your own) ***********
      return axios
        .post(cloud.CloudinaryURL, formData, {
          headers: { 'X-Requested-With': 'XMLHttpRequest' },
        })
        .then(({ data: { secure_url: url } }) => {
          const { photos } = this.state;
          photos.push(url);
        });
    });

    // Once all the files are uploaded
    axios.all(uploaders).then(() => {
      const { photos } = this.state;

      const photosData = [];
      photos.forEach(ele => {
        photosData.push({ url: ele });
      });
      this.setState({
        photosData,
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
      .then(() => console.log('submitted!')) // eslint-disable-line
      .catch(err => console.log(err)); // eslint-disable-line
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
        <SubmitButton className="player" onClick={initializeMedia}>
          Open Camera
        </SubmitButton>
        <SubmitButton id="pictureButton" onClick={saveImg}>
          Capture
        </SubmitButton>
        <Video id="player" autoPlay muted />
        <canvas id="canvas" width="320px" height="240px" />
        <div>{this.picOrUpload()}</div>
      </div>
    );
  }
}
