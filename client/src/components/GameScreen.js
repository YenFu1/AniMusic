import React, { Component } from 'react';
import VideoPlayer from './VideoPlayer';
import ControlBar from './ControlBar';
import Details from './Details';
import InputForm from './InputForm';
import '../css/game.css';
import openSocket from 'socket.io-client';
const socket = openSocket('http://localhost:8000');

export default class GameScreen extends Component {
  constructor(props) {
    super(props);
      this.state = ({
        guessingTime: 15,
        rounds: 15,
        round: 0,
        isVideoLoaded: false,
        song: null,
        title: null,
        artist: null,
        type: null,
        source: null,
        shows: null,
        isGuessingPhase: true,
        remainingTime: 15,
        isAnswerCorrect: false,
        players: null,
      })
      this.loadNewSong = this.loadNewSong.bind(this);
      this.startGuessingPhase = this.startGuessingPhase.bind(this);
      this.handler = this.handler.bind(this);
      this.getAllShows();
      socket.emit('JOIN');
  }

  componentDidMount() {
    socket.emit('GETPLAYERS');

    socket.on('PLAYERS', players => {
      this.setState({ players: players, });
    });

    socket.on('SONG', song => {
      this.setState({
        song: song.filename,
        title: song.title,
        artist: song.artist,
        type: song.type,
        source: song.source,
        round: this.state.round + 1,
      });
      console.log(song);
    });

    socket.on('SHOWS', shows => {
      this.setState({ shows: shows, });
    });

    socket.on('PLAYERS', players => {
      this.setState( {players: players,});
      setTimeout(() => {
        this.setState({
          isVideoLoaded: false,
          song: null,
          title: null,
          artist: null,
          type: null,
          source: null,
          isGuessingPhase: true,
          remainingTime: this.state.guessingTime,
          isAnswerCorrect: false,
        });
        if (this.state.round === this.state.rounds) {
          this.determineWinner();
        } else {
          this.loadNewSong();
        }
      }, 10000);
    })
  }

  handler(isAnswerCorrect) {
    this.setState( {isAnswerCorrect: isAnswerCorrect,} );
  }

  async getAllShows() {
    socket.emit('GETALLSHOWS');
  }

  async loadNewSong() {
    socket.emit('GETRANDOMSONG');
  }

  startGuessingPhase = () => {
    this.setState({ isVideoLoaded: true, });
    let timer = setInterval(() => {
      if (this.state.remainingTime <= 0) {
        this.setState({isGuessingPhase: false,});
        this.startVideoPhase();
        clearInterval(timer);
      }
      this.setState({ remainingTime: parseInt(this.state.remainingTime) - 1, });
    }, 1000);
  }

  startVideoPhase() {
    socket.emit('UPDATE', this.state.isAnswerCorrect);
    socket.emit('GETPLAYERS');
  }

  render() {
      return (
        <div>
          <ControlBar round={this.state.round} rounds={this.state.rounds}/>
          <Details source={this.state.source} title={this.state.title} type={this.state.type}
            artist={this.state.artist} filepath={this.state.song} players={this.state.players}
            isGuessingPhase={this.state.isGuessingPhase}
          />
          <VideoPlayer round={this.state.round} rounds={this.state.rounds} 
            song={this.state.song} isVideoLoaded={this.state.isVideoLoaded}
            remainingTime={this.state.remainingTime}
            isGuessingPhase={this.state.isGuessingPhase}
            startGuessingPhase={this.startGuessingPhase}
          />
          <InputForm isGuessingPhase={this.state.isGuessingPhase} answer={this.state.source}
            shows={this.state.shows} socket={socket} handler={this.handler}/>
        </div>
      )
  }
}