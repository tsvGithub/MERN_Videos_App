import React, { Component } from "react";
import axios from "axios";
import { Progress } from "reactstrap";
import { ToastContainer, toast } from "react-toastify";
import { Redirect } from "react-router-dom";

import "react-toastify/dist/ReactToastify.css";
import "./Upload.css";
import Navbar from "../Navbar/Navbar";

class Upload extends Component {
  state = {
    selectedVideos: null,
    loaded: 0,
  };

  maxSelectFile(e) {
    let files = e.target.files;
    if (files.length > 1) {
      toast.error("Only one file is allowed!");
      e.target.value = null;
      return false;
    } else {
      let err = "";
      for (let i = 0; i < files.length; i++) {
        if (files[i].size > 52428800) {
          //50MB
          err = +files[i].name + ", ";
        }
      }
      if (err !== "") {
        e.target.value = null;
        toast.error(err + "is too large. The limit is 50Mb");
      }
    }
    return true;
  }

  fileChangeHandler(e) {
    const files = e.target.files;
    if (this.maxSelectFile(e)) {
      this.setState({
        selectedVideos: files,
        loaded: 0,
      });
    }
  }

  fileUploadHandler(e) {
    const data = new FormData();
    for (let i = 0; i < this.state.selectedVideos.length; i++) {
      data.append("file", this.state.selectedVideos[i]);
    }
    axios
      .post(
        "http://localhost:5000/api/upload/",
        data,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + JSON.parse(localStorage.getItem("userTokenTime")).token,
          },
        },
        {
          onUploadProgress: (ProgressEvent) => {
            this.setState({
              loaded: (ProgressEvent.loaded / ProgressEvent.total) * 100,
            });
          },
        }
      )
      .then((res) => {
        toast.success("Uploaded successfully!");
      })
      .catch((err) => {
        toast.error(`Upload Fail wit status: ${err.statusText}`);
      });
  }

  render() {
    if (!localStorage.getItem("userTokenTime")) return <Redirect to="/login" />;

    return (
      <>
        <Navbar />
        <div className="container mt-5">
          <div className="form-group">
            <ToastContainer />
          </div>
          <h4>Upload Video</h4>
          <hr className="my-4" />
          <form method="post" name="videoUpload" action="/api/upload" id="#" encType="multipart/form-data">
            <div className="form-group files">
              <label>Upload Your Video Here</label>
              <input
                type="file"
                name="file"
                className="form-control"
                multiple="multiple"
                accept="video/*"
                onChange={this.fileChangeHandler.bind(this)}
              />
              <Progress max="100" color="success" value={this.state.loaded} className="mt-4 mb-1">
                {isNaN(Math.round(this.state.loaded, 2)) ? 0 : Math.round(this.state.loaded, 2)}%
              </Progress>
              <button type="button" className="btn btn-success btn-block" onClick={this.fileUploadHandler.bind(this)}>
                Upload Video
              </button>
            </div>
          </form>
        </div>
      </>
    );
  }
}

export default Upload;
