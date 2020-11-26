import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import Form from "../form";
import "../form.css";

class SignUp extends React.Component {
  constructor(props) {
    super();

    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    };

    this.onSubmitHandler = this.onSubmitHandler.bind(this);
    this.onChangeHandler = this.onChangeHandler.bind(this);
  }

  onSubmitHandler(e) {
    e.preventDefault();
    if (
      !(
        this.state.firstName === "" ||
        this.state.lastName === "" ||
        this.state.email === "" ||
        this.state.password === ""
      ) &&
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        this.state.email
      )
    ) {
      axios
        .post("http://localhost:5000/api/signUp/", {
          firstName: this.state.firstName,
          lastName: this.state.lastName,
          email: this.state.email,
          password: this.state.password,
        })
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
      this.setState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
      });
      //   console.log(this.state);
    } else {
      alert("Please enter valid details");
    }
  }

  onChangeHandler(e) {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  }

  render() {
    return (
      <Form onSubmit={this.onSubmitHandler.bind(this)}>
        <h3 className="text-center text-info">Register</h3>
        <div className="form-group">
          <label htmlFor="first-name" className="text-info">
            First Name:
          </label>
          <br />
          <input
            id="first-name"
            className="form-control"
            type="text"
            name="firstName"
            value={this.state.firstName}
            placeholder="First Name"
            onChange={this.onChangeHandler}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="last-name" className="text-info">
            Last Name:
          </label>
          <br />
          <input
            id="last-name"
            className="form-control"
            type="text"
            name="lastName"
            value={this.state.lastName}
            placeholder="Last Name"
            onChange={this.onChangeHandler}
            required
          />
        </div>
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
          <input type="submit" name="submit" className="btn btn-info btn-md" value="Submit" />
          <Link to="/login" className="text-info">
            Login here
          </Link>
        </div>
      </Form>
    );
  }
}

export default SignUp;
