import React, { Component } from "react";
import { Link, NavLink } from "react-router-dom";

class Navbar extends Component {
  constructor(props) {
    super();
    this.state = {
      loggedIn: localStorage.getItem("userTokenTime"),
    };
  }

  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-info">
        <div className="container">
          <Link className="navbar-brand" to="/">
            VideoServer
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNavAltMarkup"
            aria-controls="navbarNavAltMarkup"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse justify-content-end" id="navbarNavAltMarkup">
            <div className="navbar-nav">
              {this.state.loggedIn ? (
                <>
                  <NavLink className="nav-item nav-link" to="/">
                    Home
                  </NavLink>
                  <NavLink className="nav-item nav-link" to="/upload">
                    Upload
                  </NavLink>
                  <NavLink className="nav-item nav-link" to="/signOut">
                    Sign Out
                  </NavLink>
                </>
              ) : (
                <>
                  <NavLink className="nav-item nav-link" to="/login">
                    Login
                  </NavLink>
                  <NavLink className="nav-item nav-link" to="/signup">
                    Sign Up
                  </NavLink>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>
    );
  }
}

export default Navbar;
