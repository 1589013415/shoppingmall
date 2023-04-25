import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Redirect, Switch } from "react-router-dom"
import UserHome from "./pages/UserPage/Home";
import UserLoginPage from "./pages/UserPage/LoginPage";
import Register from "./pages/UserPage/Register"
import ManageHome from "./pages/ManagePage/Home";

export class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path="/userhome" component={UserHome} />
          <Route path="/userlogin" component={UserLoginPage} />
          <Route path="/register" component={Register} />
          <Route path="/manage/login" component={ManageHome} />
          <Redirect to="/userhome" />
        </Switch>
      </Router>

      // <Router>
      //   {/* 注册路由 */}
      //   <Switch>
      //     <Route path="/userhome" component={UseHome} />
      //     <Route path="/managehome" component={ManageHome} />
      //     <Route path="/usermyorder" component={UserMyOreder}></Route>

      //     <Redirect to="/userhome" />
      //   </Switch>
      // </Router>

    )
  }
}

export default App

