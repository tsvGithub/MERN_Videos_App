import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import axios from "axios";

import "./Dashboard.css";
import Navbar from "../Navbar/Navbar";

class Dashboard extends Component {
  constructor(props) {
    super();

    let shouldRedirect = false;

    if (localStorage.getItem("userTokenTime")) {
      //check user's toket + valid time
      const data = JSON.parse(localStorage.getItem("userTokenTime"));

      if (new Date().getTime() - data.time > 1 * 60 * 60 * 1000) {
        // token expired
        localStorage.removeItem("userTokenTime");
        shouldRedirect = true;
      }
    } else {
      shouldRedirect = true;
    }

    this.state = {
      redirect: shouldRedirect,
      videoList: [],
    };
  }

  componentDidMount() {
    if (localStorage.getItem("userTokenTime")) {
      axios
        .get("http://localhost:5000/api/videoList", {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + JSON.parse(localStorage.getItem("userTokenTime")).token,
          },
        })
        .then((res) => {
          this.setState({
            videoList: res.data,
          });
        });
    }
  }
  render() {
    if (this.state.redirect) return <Redirect to="/login" />;

    const videos = this.state.videoList.map((video) => {
      return (
        <div className="video col-xs-12 col-sm-12 col-md-3 col-lg-4" key={video._id}>
          <Link to={"/video/" + video.upload_title}>
            <div className="video-thumbnail">
              <img src={video.thumbnail_path} alt="video thumbnail" />
            </div>
          </Link>
          <span className="username">
            <Link to={"/api/videos/" + video.upload_title}>{video.uploader_name}</Link>
          </span>
          <span className="video-title">{video.upload_title.replace(/_/g, " ")}</span>
        </div>
      );
    });

    return (
      <>
        <Navbar />
        <div className="container mt-5">
          <h4>Videos</h4>
          <hr className="my-4" />

          <div className="streams row">{videos}</div>
        </div>
      </>
    );
  }
}

export default Dashboard;
