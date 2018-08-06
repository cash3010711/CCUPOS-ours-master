import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch } from "react-router-dom";

import "assets/css/material-dashboard-react.css?v=1.2.0";

import indexRoutes from "routes/index.jsx";
// import firebase from "firebase";

const hist = createBrowserHistory();

// var config = {
// 	apiKey: "AIzaSyAq8Xt1gbv-1CjYPYtTVsKAdUEcxlvujwI",
// 	authDomain: "cafe-le-cloud.firebaseapp.com",
// 	databaseURL: "https://cafe-le-cloud.firebaseio.com",
// 	projectId: "cafe-le-cloud",
// 	storageBucket: "cafe-le-cloud.appspot.com",
//   messagingSenderId: "287731448266"
// }
// firebase.initializeApp(config);

ReactDOM.render(
  <Router history={hist}>
    <Switch>
      {indexRoutes.map((prop, key) => {
        return <Route path={prop.path} component={prop.component} key={key} />;
      })}
    </Switch>
  </Router>,
  document.getElementById("root")
);
