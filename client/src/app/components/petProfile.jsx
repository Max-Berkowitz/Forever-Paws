import React, {Component} from 'react';
import {CSSTransition, TransitionGroup} from 'react-transition-group';

class petProfile extends Component {

    tempStyleDELETE = {
        margin: '5px',
        border: '1px solid red',
        transform: 'translateY() scale(0.75)'       
      };

    render() {
        return (

            <div style={this.tempStyleDELETE}>
            <h1>{this.props.profileQueue.name}</h1>
            <img width="100%" src={this.props.profileQueue.picture} />
            <h3>Breed: {this.props.profileQueue.breed} </h3>
            <h3>Age: {this.props.profileQueue.age} </h3>
            <h3>{this.props.profileQueue.description} </h3>
            </div>
        );
    }
}

export default petProfile;

