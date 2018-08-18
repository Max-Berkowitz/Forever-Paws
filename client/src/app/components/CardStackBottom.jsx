import React, {Component, Fragment} from 'react';
import styled from 'styled-components';

import Profile from './Profile';
/* eslint react/prop-types:0 */

const CardStyle2 = styled.div`
  position: absolute;
  top: ${window.outerHeight*.1}px;
  width:${window.innerWidth-20}px;
  height:${window.outerHeight*.8}px;
  border-radius: 15px;
  overflow: hidden;
  background: lightblue;
  color: palevioletred;
  border: 2px solid black;
`;

const ImgDiv2 = styled.div`
  position: relative;
`;
const Img2 = styled.img`
  width: auto;
  height:${window.outerHeight*.55}px;
  `;
  
  class CardStackBottom extends Component {
    constructor(props) {
      super(props);
      this.state = {
      }
    }
    render() {
          const { style, className, ...props } = this.props
          
      return (
          <CardStyle2>
              <ImgDiv2>
                <Img2 alt="dog" src={this.props.profileQueue.picture} />
              </ImgDiv2>
              <Profile props={this.props.profileQueue} />
          </CardStyle2>
      );
    }
  
}
export default CardStackBottom;