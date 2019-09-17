import React, { Component } from 'react';
import '../css/home.css';
import LoginForm from './LoginForm';

export default class HomePage extends Component {
  constructor(props) {
    super(props);
      this.state = ({
        shouldShowForm: false,
      });
  }

  showForm = () => {
    this.setState({shouldShowForm: true,});
  }

  hideForm = () => {
    if (this.state.shouldShowForm) {
      this.setState({shouldShowForm: false,})
    }
  }

  render() {
    let loginForm = this.state.shouldShowForm ? <LoginForm/> : '';
    return (
      <div>
        <div onClick={this.hideForm} className={this.state.shouldShowForm ? "fade home": "home"}>
          <div className="navbar">
            <ul>
              <li><a href="">About</a></li>
              <li><a href="">Contact</a></li>
              <li><a href="">FAQ</a></li>
            </ul>
          </div>
        <h1><strong>ANI</strong>MUSIC</h1>
        <h2>A trivia game for anime music</h2>
          <div className="btncontainer">
            <button onClick={this.showForm} className="login mainbtn">Login</button>
            <button onClick={this.showForm} className="signup mainbtn">Sign Up</button>
          </div>
        </div>
        {loginForm}
      </div>
    )
  }
}