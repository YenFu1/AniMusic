import React, { Component } from 'react';
import '../css/home.css';

export default class LoginForm   extends Component {
  constructor(props) {
    super(props);
      this.state = ({
        isRegistering: false,
      });
  }

  showLoginForm = (e) => {
    e.preventDefault();
    this.setState ({isRegistering: false, });
  }

  showRegisterForm = (e) => {
    e.preventDefault();
    this.setState ({isRegistering: true, });
  }

  render() {
    let loginForm = (
      <form className="login-form">
        <input type="text" placeholder="username"/>
        <input type="password" placeholder="password"/>
        <button>login</button>
        <p className="message">Not registered? <a onClick={this.showRegisterForm} href="#">Create an account</a></p>
      </form>
    );

      let registerForm = (
          <form className="register-form">
            <input type="text" placeholder="name"/>
            <input type="password" placeholder="password"/>
            <input type="text" placeholder="email address"/>
            <button>create</button>
            <p className="message">Already registered? <a onClick={this.showLoginForm} href="#">Sign In</a></p>
          </form>
      )

    let currentForm = this.state.isRegistering ? registerForm: loginForm;
    return(
      <div className="login-page">
        <div className="form">
          {currentForm}
        </div>
      </div>
    )
  }
}