import React from "react";
import { Route } from "react-router-dom";
import Dashboard from "./components/Dashboard/Dashboard";
import VideoPlayer from "./components/VideoPlayer/VideoPlayer";
import SignIn from "./components/Form/SignIn/SignIn";
import SignUp from "./components/Form/SignUp/SignUp";
import Upload from "./components/Upload/Upload";
import signOut from "./components/signOut/SignOut";

// import Navbar from "./components/Navbar/Navbar";
function App() {
  return (
    <>
      {/* <Navbar /> */}
      <Route exact path="/" component={Dashboard} />
      <Route exact path="/video/:videoTitle" component={VideoPlayer} />
      <Route exact path="/login" component={SignIn} />
      <Route exact path="/signup" component={SignUp} />
      <Route exact path="/upload" component={Upload} />
      <Route exact path="/signout" component={signOut} />
    </>
  );
}

export default App;
