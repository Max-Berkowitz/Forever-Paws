import React, {Component, Fragment} from 'react';
import styled from 'styled-components';

import Profile from './Profile';
/* eslint react/prop-types:0 */

const CardStyle = styled.div`
  position: absolute;
  z-index: 2;
  top: ${window.outerHeight*.1}px;
  width:${window.outerWidth-20}px;
  height:${window.outerHeight*.8}px;
  border-radius: 15px;
  overflow: hidden;
  background: grey;
  color: palevioletred;
  border: 2px solid palevioletred;
`;

const ImgDiv = styled.div`
  position: relative;
`;
const Img = styled.img`
  width: auto;
  height:${window.outerHeight*.55}px;
  `;
  
  // @withGesture
  class CardStack extends Component {
    constructor({onUp, onDown, onMove}) {
      super({onUp, onDown, onMove});
      this.state = {
        renderCard: true,
        x: 0, y: 0, xDelta: 0, yDelta: 0, xInitial: 0, yInitial: 0, xPrev: 0, yPrev: 0, down: false 
      }
      this.onUp = onUp;
      this.onDown = onDown;
      this.onMove = onMove;

      this.handleTouchStart = this.handleTouchStart.bind(this)
      this.handleTouchMove = this.handleTouchMove.bind(this)

      this.handleMouseUp = this.handleMouseUp.bind(this)
      this.handleMouseDown = this.handleMouseDown.bind(this)
      this.handleMouseMoveRaf = this.handleMouseMoveRaf.bind(this)
      this.handleMouseMove = this.handleMouseMove.bind(this)
  
      this.onGotCapture = this.onGotCapture.bind(this)
      this.onLostCapture = this.onLostCapture.bind(this)

      this.onRelease = this.onRelease.bind(this)
      this.cardPos = this.cardPos.bind(this)

    }


    onUp (e) {this.isDragging = false};

    onGotCapture (event) {this.setState({hasCapture: true})};

    onLostCapture(event)
      {this.setState({hasCapture: false})};

    onDown (event) {
      this.isDragging = true;
      event.target.setPointerCapture(event.pointerId);
  
      // We store the initial coordinates to be able to calculate the changes
      // later on.
      this.extractPositionDelta(event);
    };
    
    onMove(event) {
      if (!this.isDragging) {
        return;
      }
      const {left, top} = this.extractPositionDelta(event);
  
      this.setState(({circleLeft, circleTop}) => ({
        circleLeft: circleLeft + left,
        circleTop: circleTop + top,
      }));
    };
    
    extractPositionDelta (event) {
      const left = event.pageX;
      const top = event.pageY;
      const delta = {
        left: left - this.previousLeft,
        top: top - this.previousTop,
      };
      this.previousLeft = left;
      this.previousTop = top;
      return delta;
    };





      // handleMouseMove(){
        //   const {xDelta} = this.props;
        
      //   if(xDelta>60) {
        //     nextPet();
        //   }
        // }
        handleTouchStart (e) {
          this.handleMouseDown(e.touches[0])}
        
          handleTouchMove (e) {this.handleMouseMove(e.touches[0])}

        handleMouseUp(){
          window.removeEventListener('touchmove', this.handleTouchMove)
          window.removeEventListener('touchend', this.handleMouseUp)
          window.removeEventListener('mousemove', this.handleMouseMoveRaf)
          window.removeEventListener('mouseup', this.handleMouseUp)
          const newProps = { ...this.state, down: false }
          this.setState(this.onUp ? this.onUp(newProps) : newProps)
        }
        
        handleMouseDown({ pageX, pageY }){
          window.addEventListener('touchmove', this.handleTouchMove)
          window.addEventListener('touchend', this.handleMouseUp)
          window.addEventListener('mousemove', this.handleMouseMoveRaf)
          window.addEventListener('mouseup', this.handleMouseUp)
          const newProps = { ...this.state, x: pageX, y: pageY, xDelta: 0, yDelta: 0, xInitial: pageX, yInitial: pageY, xPrev: pageX, yPrev: pageY, down: true }
          this.setState(this.onDown ? this.onDown(newProps) : newProps)
        }
        
        handleMouseMoveRaf({ pageX, pageY }){
          if(!this.busy){
            requestAnimationFrame(() => this.handleMouseMove({ pageX, pageY }))
            this.busy = true
          }
        }

        handleMouseMove({ pageX, pageY }){
          const newProps = { ...this.state, x: pageX, y: pageY, xDelta: pageX - this.state.xInitial, yDelta: pageY - this.state.yInitial, xPrev: this.state.x, yPrev: this.state.y, xVelocity: pageX - this.state.x, yVelocity: pageY - this.state.y }
          this.setState(this.onMove ? this.onMove(newProps) : newProps, () => (this.busy = false))
        }
        
        componentDidMount(){
          //snaps back to place:
          window.addEventListener('touchend', this.onRelease)
          this.consoleLogger();
        }
        
        onRelease(){
          if(this.state.down && Math.abs(this.state.xDelta)<150) {
            console.log("HELLO",this.state.down)
            console.log("HELLO",this.state.xDelta)
            this.setState({
              xDelta:0,
              yDelta:0
            })
          }
          else {
            //discard card
            this.setState({
              renderCard: false
            })
            //call next pet
            this.props.nextPet()
            //set this card back to 0,0
            this.setState({
              xDelta:0,
              yDelta:0,
              renderCard: true
            })
          }
        }
        //sets the card css position or disables
        cardPos() {
          if(this.state.renderCard) {
            return `translate3d(${this.state.xDelta}px,${this.state.yDelta}px,0px)`
          } 
          return `translate3d(500px,500px,0px)`
        }

        consoleLogger(){
          console.log("this is window innerWidth:",window.innerWidth);
          console.log("this is window outerHeight:",window.window.outerHeight);
          console.log("this is window outerWidth:",window.outerWidth);
        }

    render() {
          const { down, x, y, xDelta, yDelta, xInitial, yInitial  } = this.state
          const { style, className, ...props } = this.props
          
    return (
      <div 
          onMouseDown={this.handleMouseDown}
          onTouchStart={this.handleTouchStart}
          
          onPointerDown={this.onDown}
          onPointerMove={this.onMove}
          onPointerUp={this.onUp}
          onPointerCancel={this.onUp}
          onGotPointerCapture={this.onGotCapture}
          onLostPointerCapture={this.onLostCapture}
          >
        <CardStyle style={{  
        'background': 'black',
        'transform': `${this.cardPos()}`,
        }}>
            <ImgDiv>
              <Img alt="dog" src={this.props.profileQueue.picture} />
            </ImgDiv>
            <Profile props={this.props.profileQueue} />
        </CardStyle>
      </div>
    );
  }
}

// CardStack.propTypes = {
//     profileQueue: PropTypes.element.isRequired
//   };

export default CardStack;


