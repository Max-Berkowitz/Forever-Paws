import React, {Fragment, Component} from 'react';
import styled from 'styled-components';
import { withGesture, Gesture } from 'react-with-gesture'
import { Spring, animated, Transition } from 'react-spring'

/* eslint react/prop-types:0 */

const ProfileStyle = styled.div`
height:${window.outerHeight*.2}px;
  border-radius: 4px;
  margin: 0.2em;
  padding: 0.5em 0.5em 0.5em 0.5em;
  color: palevioletred;
  border: 2px solid palevioletred;
  background: orange;

`;

class Profile extends Component {
    constructor({props}) {
        super(props);
        this.state = {
        };
    }
    
    render() {
        const { name, age, breed, location, description } = this.props.props;
        return (
            <ProfileStyle>
                <h1>
                    {name}, {age}
                </h1>
                <h4>{breed} </h4>
                <h5> Location: {location} </h5>
                <h5>{description} </h5>
            </ProfileStyle>
        );
    }
  }
  
  export default Profile;


//   style={{  
//     'background': 'black',
//     'transform': `translate3d(${xDelta}px,${yDelta}px,0px)`,
//     }}