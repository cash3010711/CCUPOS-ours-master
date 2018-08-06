import React, { Component } from "react";
import { Grid } from "material-ui";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch } from "react-router-dom";

import "assets/css/material-dashboard-react.css?v=1.2.0";
import base from '../../rebase';
import indexRoutes from "routes/index.jsx";
// import firebase from 'firebase';
import { connect } from 'react-firebase';
import { RegularCard, Table, ItemGrid } from "components";

// export const config = {
// 	apiKey: "AIzaSyD2LTP1tRQ1lYiMJhLq7_tY720kGkPn66o",
// 	authDomain: "cool-test-menu.firebaseapp.com",
// 	databaseURL: "https://cool-test-menu.firebaseio.com",
// 	projectId: "cool-test-menu",
// 	storageBucket: "cool-test-menu.appspot.com",
// 	messagingSenderId: "365305553438"
// };
// firebase.initializeApp({
//     apiKey: "AIzaSyD2LTP1tRQ1lYiMJhLq7_tY720kGkPn66o",
//     authDomain: "cool-test-menu.firebaseapp.com",
//     databaseURL: "https://cool-test-menu.firebaseio.com",
//     projectId: "cool-test-menu",
//     storageBucket: "cool-test-menu.appspot.com",
//     messagingSenderId: "365305553438"
// })

class TableList extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      data: [['loading...', 'loading...', 'loading...', 'loading...']]
    };
  }

  componentDidMount(){
    base.syncState(`menu`, {
      context: this,
      state: `menu`,
      asArray: false
     });
    // firebase.database().ref('/menu').once('value').then(data => {
    //   let rawData = data.val()
    //   let newData = Object.keys(rawData).map(item => [rawData[item].image, rawData[item].name, rawData[item].price.toString(), rawData[item].price.toString()])

    //   this.setState({...this.state, data: newData})
    // });
  }

  render() {

    let newData = this.state.menu ? Object.keys(this.state.menu).map(item =>
      [this.state.menu[item].image, this.state.menu[item].name]
    ):[['loading...', 'loading...']]

    return (
      <div>
        <Grid container>
          <ItemGrid xs={12} sm={12} md={12}>
            <RegularCard
              cardTitle="商品列表"
              cardSubtitle="修改商品"
              content={
                <Table
                  tableHeaderColor="primary"
                  tableHead={["Name", "名稱"]}
                  tableData={newData}
                />
              }
            />
          </ItemGrid>
        </Grid>
      </div>
    );
  }
}


export default TableList;