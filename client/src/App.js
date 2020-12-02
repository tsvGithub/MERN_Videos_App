import React from "react";
import { Route } from "react-router-dom";

import SignIn from "./components/Form/SignIn/SignIn";
import SignUp from "./components/Form/SignUp/SignUp";
import Upload from "./components/Upload/Upload";
function App() {
  return (
    <>
      <Route exact path="/login" component={SignIn} />
      <Route exact path="/signup" component={SignUp} />
      <Route exact path="/upload" component={Upload} />
    </>
  );
}

export default App;
