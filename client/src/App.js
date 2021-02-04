import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import LandingPage from './components/view/LandingPage/LandingPage'
import LoginPage from './components/view/LoginPage/LoginPage'
import RegisterPage from './components/view/RegisterPage/RegisterPage'

import Auth from './hoc/auth'
/*
export default function (Specification, option, adminRout = null) 
  에서 option => null(아무나 출입 가능), true(로그인유저만 출입 가능), false(로그인한 유저는 출입 불가)
  사용 : Auth( Page, null, true) 마지막true -> 어드민유저만 출입 가능
*/


function App() {
  return (
    <Router>
      <div>
        {/*
          A <Switch> looks through all its children <Route>
          elements and renders the first one whose path
          matches the current URL. Use a <Switch> any time
          you have multiple routes, but you want only one
          of them to render at a time
        */}
        <Switch>
          <Route exact path="/" component={Auth(LandingPage, null)} />
            {/* <LandingPage/> */}
            {/* 컴포넌트를 Auth(HOC)가 감싸줌 */}
          <Route exact path="/LoginPage" component={Auth(LoginPage, false)} />
          <Route exact path="/RegisterPage" component={Auth(RegisterPage, false)} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
