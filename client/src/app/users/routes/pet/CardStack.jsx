import React, { Component, Fragment } from 'react';
import styled from 'styled-components';
import { patch } from 'axios';
import Profile from './Profile';

/* eslint react/prop-types:0 */
const CardStyle = styled.div`
  position: absolute;
  z-index: 2;
  margin-left: 12%;
  margin-right: 12%;
  top: 12%;
  width: 75%;
  height: 70%;
  border-radius: 15px;
  overflow: hidden;
`;
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

class CardStack extends Component {
  constructor(props) {
    super(props);
    this.state = {
      renderCard: true,
      x: 0,
      y: 0,
      xDelta: 0,
      yDelta: 0,
      xInitial: 0,
      yInitial: 0,
      xPrev: 0,
      yPrev: 0,
      down: false,
    };
    const { onUp, onDown, onMove } = this.props;
    this.onUp = onUp;
    this.onDown = onDown;
    this.onMove = onMove;

    this.handleTouchStart = this.handleTouchStart.bind(this);
    this.handleTouchMove = this.handleTouchMove.bind(this);

    this.handleMouseUp = this.handleMouseUp.bind(this);
    this.handleMouseDown = this.handleMouseDown.bind(this);
    this.handleMouseMoveRaf = this.handleMouseMoveRaf.bind(this);
    this.handleMouseMove = this.handleMouseMove.bind(this);

    this.onGotCapture = this.onGotCapture.bind(this);
    this.onLostCapture = this.onLostCapture.bind(this);

    this.onRelease = this.onRelease.bind(this);
    this.cardPos = this.cardPos.bind(this);
  }

  componentDidMount() {
    // snaps back to place:
    window.addEventListener('touchend', this.onRelease);
  }

  componentWillReceiveProps() {
    this.setState({
      xDelta: 0,
      yDelta: 0,
      renderCard: true,
    });
  }

  onRelease() {
    const { profileQueue } = this.props;

    const { xDelta } = this.state;
    const { nextPet } = this.props;
    if (Math.abs(xDelta) < 150) {
      this.setState({
        xDelta: 0,
        yDelta: 0,
      });
    } else {
      if (xDelta > 150) {
        patch('/api/animal/addLike', { id: profileQueue.id });
      }
      // discard card
      this.setState({
        renderCard: false,
      });
      // call next pet
      nextPet();
      // set this card back to 0,0 in componentWillReceiveProps
    }
  }

  onGotCapture() {
    this.setState({ hasCapture: true });
  }

  onLostCapture() {
    this.setState({ hasCapture: false });
  }

  onDown(event) {
    this.isDragging = true;
    event.target.setPointerCapture(event.pointerId);

    // We store the initial coordinates to be able to calculate the changes
    // later on.
    this.extractPositionDelta(event);
  }

  onMove(event) {
    if (!this.isDragging) {
      return;
    }
    const { left, top } = this.extractPositionDelta(event);

    this.setState(({ circleLeft, circleTop }) => ({
      circleLeft: circleLeft + left,
      circleTop: circleTop + top,
    }));
  }

  onUp() {
    this.isDragging = false;
  }

  handleMouseUp() {
    window.removeEventListener('touchmove', this.handleTouchMove);
    window.removeEventListener('touchend', this.handleMouseUp);
    window.removeEventListener('mousemove', this.handleMouseMoveRaf);
    window.removeEventListener('mouseup', this.handleMouseUp);
    const newProps = { ...this.state, down: false };
    this.setState(this.onUp ? this.onUp(newProps) : newProps);
  }

  handleMouseDown({ pageX, pageY }) {
    window.addEventListener('touchmove', this.handleTouchMove);
    window.addEventListener('touchend', this.handleMouseUp);
    window.addEventListener('mousemove', this.handleMouseMoveRaf);
    window.addEventListener('mouseup', this.handleMouseUp);
    const newProps = {
      ...this.state,
      x: pageX,
      y: pageY,
      xDelta: 0,
      yDelta: 0,
      xInitial: pageX,
      yInitial: pageY,
      xPrev: pageX,
      yPrev: pageY,
      down: true,
    };
    this.setState(this.onDown ? this.onDown(newProps) : newProps);
  }

  handleMouseMoveRaf({ pageX, pageY }) {
    if (!this.busy) {
      requestAnimationFrame(() => this.handleMouseMove({ pageX, pageY }));
      this.busy = true;
    }
  }

  handleMouseMove({ pageX, pageY }) {
    const { xInitial, yInitial, x, y } = this.state;
    const newProps = {
      ...this.state,
      x: pageX,
      y: pageY,
      xDelta: pageX - xInitial,
      yDelta: pageY - yInitial,
      xPrev: x,
      yPrev: y,
      xVelocity: pageX - x,
      yVelocity: pageY - y,
    };
    this.setState(this.onMove ? this.onMove(newProps) : newProps, () => {
      this.busy = false;
      return this.busy;
    });
  }

  handleTouchMove(e) {
    this.handleMouseMove(e.touches[0]);
  }

  handleTouchStart(e) {
    this.handleMouseDown(e.touches[0]);
  }

  extractPositionDelta(event) {
    const left = event.pageX;
    const top = event.pageY;
    const delta = {
      left: left - this.previousLeft,
      top: top - this.previousTop,
    };
    this.previousLeft = left;
    this.previousTop = top;
    return delta;
  }

  // sets the card css position or disables
  cardPos() {
    const { renderCard, xDelta, yDelta } = this.state;
    if (renderCard) {
      return `translate3d(${xDelta}px,${yDelta}px,0px)`;
    }
    return `translate3d(500px,500px,0px)`;
  }

  render() {
    const { profileQueue } = this.props;

    return (
      <Fragment>
        <CardStyle
          onMouseDown={this.handleMouseDown}
          onTouchStart={this.handleTouchStart}
          onPointerDown={this.onDown}
          onPointerMove={this.onMove}
          onPointerUp={this.onUp}
          onPointerCancel={this.onUp}
          onGotPointerCapture={this.onGotCapture}
          onLostPointerCapture={this.onLostCapture}
          style={{
            transform: `${this.cardPos()}`,
          }}
        >
          <ImgDiv>
            <Img alt="dog" src={profileQueue.picture} />
          </ImgDiv>
          <Profile profile={profileQueue} />
        </CardStyle>
      </Fragment>
    );
  }
}

export default CardStack;
