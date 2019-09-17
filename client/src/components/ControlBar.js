import React, { Component } from 'react';
import '../css/controls.css'
import volume2 from '../assets/volume2.png'
import volume1 from '../assets/volume1.png'
import volume0 from '../assets/volume0.png'

export default class ControlBar extends Component {
    constructor(props) {
      super(props);
        this.state = ({
          volume: 50,
        })
    }

    handleChange(e){
        this.setState({volume: e.target.value,});
    }

    render() {
      let volume = parseInt(this.state.volume);
      let video = document.getElementById('videoPlayer');
      if (video) {
        video.volume = volume/100;
      }
      let volumeIcon = volume2;
      if (volume === 0) {
        volumeIcon = volume0;
      } else if (volume < 50) {
        volumeIcon = volume1;
      }

        return (
            <div className="controls">
              <ul>
                <li><p>{this.props.round}/{this.props.rounds}</p></li>
                <li><p>Kaven's Game</p></li>
                <li><div className="volumeContainer">
                <img src={volumeIcon} alt="logo" className="icon"/>
                <input type="range" min="0" max="100" className="slider"
                  onChange={(e) => {this.handleChange(e)}}></input>
                </div></li>
              </ul>
            </div>
        )
    }
}