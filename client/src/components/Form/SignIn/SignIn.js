import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import Form from "../form";
import "../form.css";

class SignIn extends Component {
  constructor(props) {
    super();
    this.state = {
      email: "",
      password: "",
    };
    // console.log(this.state);
    this.onSubmitHandler = this.onSubmitHandler.bind(this);
    this.onChangeHandler = this.onChangeHandler.bind(this);
  }
  onChangeHandler(e) {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  }

  async onSubmitHandler(e) {
    // debugger;
    e.preventDefault();
    // console.log(this.state.email, this.state.password);
    if (
      // this.state.email &&
      // this.state.password &&
      !(this.state.email === "" || this.state.password === "") &&
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        this.state.email
      )
    ) {
      await axios
        .post("http://localhost:5000/api/login/", {
          email: this.state.email,
          password: this.state.password,
        })
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });

      //after the Form is submitted set STATE to blank
      this.setState({
        email: "",
        password: "",
      });
      console.log(this.state);
    } else {
      alert("Please enter valid details");
    }
  }
  render() {
    return (
      <Form onSubmit={this.onSubmitHandler.bind(this)}>
        <h3 className="text-center text-info">Login</h3>
        <div className="form-group">
          <label htmlFor="email" className="text-info">
            Email:
          </label>
          <br />
          <input
            id="email"
            className="form-control"
            type="email"
            name="email"
            value={this.state.email}
            placeholder="example@domain.com"
            onChange={this.onChangeHandler}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password" className="text-info">
            Password:
          </label>
          <br />
          <input
            id="password"
            className="form-control"
            type="password"
            name="password"
            value={this.state.password}
            placeholder="********"
            onChange={this.onChangeHandler}
            required
          />
        </div>
        <div className="d-flex justify-content-between align-items-end">
          <button onClick={this.onSubmitHandler} className="btn btn-info btn-md" type="button">
            Submit
          </button>
          <Link to="/signUp" className="text-info">
            Sign Up here
          </Link>
        </div>
      </Form>
    );
  }
}

export default SignIn;
