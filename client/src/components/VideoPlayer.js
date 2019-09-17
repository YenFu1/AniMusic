import React, { Component } from 'react';

export default class VideoPlayer extends Component {

  render() {
    let shouldHide = this.props.isGuessingPhase ? "hidden": '';
    let timerText = this.props.remainingTime >= 0 ? this.props.remainingTime : '';
    let loadingSpinner = <div className="lds-ring"><div></div><div></div><div></div><div></div></div>;
    let stateDisplay = this.props.isVideoLoaded ? <h2 id="timer">{timerText}</h2> : loadingSpinner;
    const GameDisplay = (
      <div>
        <div className="videoContainer game">
          {stateDisplay}
          <video autoPlay id="videoPlayer" className={shouldHide}
            onCanPlayThrough={this.props.startGuessingPhase}>
            <source src={`https://openings.moe/video/${this.props.song}.mp4`}
              id="vid" type="video/mp4"/>
          </video>
        </div>
      </div>
    )
  
    return this.props.song ? GameDisplay: null;
  }
}