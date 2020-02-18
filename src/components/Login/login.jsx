import React, { Component } from "react";
import axios from 'axios';
import { Default } from 'react-awesome-spinners'
import './login.css'
import { BASE_URL } from "../constants";

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: "",
      loading: false,
      errorMsg: ""
    };
  }

  validateForm() {
    return this.state.username.length > 0 && this.state.password.length > 0 && !this.state.loading;
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  handleSubmit = event => {
    event.preventDefault();
    const userpass = btoa(this.state.username + ':' + this.state.password)
    this.setState({ loading: true })
    axios({
      method: 'POST',
      url: BASE_URL,
      data: this.state,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + userpass
      }
    })
      .then((response) => {
        if (response.data.toString() !== '') {
          this.props.setIsLogin(false)
          this.props.setIsAdmin(this.state.username == "admin")
          this.props.setUsername(this.state.username)
          this.setState({ errorMsg: "" })
        }
        else {
          this.setState({ errorMsg: "Invalid username or password" })
        }
      })
      .catch(err => alert(err))
      .finally(() => this.setState({ loading: false }))
  }

  render() {
    return (
      <div className="main">
        
        <form className="loginContainer" onSubmit={this.handleSubmit}>
        <h1 text-align="left">Welcome to Team Timesheet Portal</h1>
          <input className="textbox" id="username" type="text"
            onChange={this.handleChange}
            placeholder="Enter Username"
          />
          <input className="textbox" id="password" type="password"
            onChange={this.handleChange}
            placeholder="Enter Password"
          />
          <br />
          <input className="submitButton" type="submit" disabled={!this.validateForm()} value="Login" />
          {this.state.errorMsg}
        </form>
        <div className="loadingIcon">
          {this.state.loading && <Default color="red" />}
        </div>
      </div>
    );
  }
}