import React, { Component } from "react";
import { withStyles, Grid } from "material-ui";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch } from "react-router-dom";

import "assets/css/material-dashboard-react.css?v=1.2.0";
import base from '../../rebase';
import indexRoutes from "routes/index.jsx";
//import firebase from 'firebase';
import { connect } from 'react-firebase';

import {
  StatsCard,
  ChartCard,
  TasksCard,
  RegularCard,
  Table,
  ItemGrid
} from "components";

import {
  Update,
  ArrowUpward,
  AttachMoney,
  LocalCafe,
  RestaurantMenu
} from "@material-ui/icons";

// export const config = {
// 	apiKey: "AIzaSyD2LTP1tRQ1lYiMJhLq7_tY720kGkPn66o",
// 	authDomain: "cool-test-menu.firebaseapp.com",
// 	databaseURL: "https://cool-test-menu.firebaseio.com",
// 	projectId: "cool-test-menu",
// 	storageBucket: "cool-test-menu.appspot.com",
// 	messagingSenderId: "365305553438"
// };
const menuname = (props)=> {
  <div>{props.name}</div>
}

class TableList extends React.Component {

  constructor(props) {
    super(props);
    this.state = {      
      data: [['loading...', 'loading...', 'loading...', 'loading...']],
      // sending : false,
      // preorders: "null"
    };    
    
    // this.renderOrders = this.renderpayingOrders.bind(this)
    // this.renderOrders = this.renderpayedOrders.bind(this)
    // this.handleComplete = this.handleComplete.bind(this)
    // this.handleMaking = this.handleMaking.bind(this)
    //this.product = this.product.bind(this)
  }

  componentDidMount(){

    base.syncState(`users`, {
      context: this,
      state: `users`,
      asArray: false
    });
    base.syncState(`preorders`, {
        context: this,
        state: `preorders`,
        asArray: false
    });
    base.syncState(`menu`, {
        context: this,
        state: `menu`,
        asArray: false
    });
    base.syncState(`orders`, {
        context: this,
        state: `orders`,
        asArray: false
    });

    // firebase.database().ref('/').once('value').then(data => {
    //  let rootData = data.val()
    //  console.log(rootData)
    //  let secondData = Object.keys(rootData).map(item => rootData[item])
    //  console.log(secondData)

    // let menu_name_Data = Object.keys(secondData[0]).map(item => secondData[0][item].name)
    // console.log(menu_name_Data)
    // let menu_image_Data = Object.keys(secondData[0]).map(item => secondData[0][item].image)
    // console.log(menu_image_Data)
    // let menu_price_Data = Object.keys(secondData[0]).map(item => secondData[0][item].price)
    // console.log(menu_price_Data)

    // let order_Data = Object.keys(secondData[1]).map(item => secondData[1][item])
    // console.log(order_Data)
    // let order_second_Data = Object.keys(order_Data).map(item => order_Data[item].table)
    // console.log(order_second_Data)
    // let order_thrid_Data = Object.keys(order_second_Data).map(item => order_second_Data[item].table)
    // console.log(order_thrid_Data)

    //let newData = Object.keys(secondData[0]).map(item => [secondData[0][item].image, secondData[0][item].name, menucount[item], secondData[0][item].price.toString()])

    //this.setState({...this.state, data: newData})
    // });
  }
  
  render() {
    
    let menuCount = new Object()
    let tempCount = new Object()

    // this.state.preorders?Object.keys(this.state.preorders).map((userid) =>{
    //   Object.keys(this.state.preorders[userid]).map((orderid) => {
    //     Object.keys(this.state.preorders[userid][orderid].order_list).map((product) => {
    //       if(menuCount[product] == null){
    //         menuCount[product] = this.state.preorders[userid][orderid].order_list[product].count           
    //       }else{
    //         menuCount[product] += this.state.preorders[userid][orderid].order_list[product].count 
    //       }    
               
    //     })
    //   })
    // }):null

    this.state.orders?Object.keys(this.state.orders).map((userid) =>{
      Object.keys(this.state.orders[userid]).map((orderid) => {
        Object.keys(this.state.orders[userid][orderid].order_list).map((product) => {
          if(menuCount[product] == null){
            menuCount[product] = this.state.orders[userid][orderid].order_list[product].count           
          }else{
            menuCount[product] += this.state.orders[userid][orderid].order_list[product].count 
          }                   
        })
      })
    }):null

    let allCount = Object.keys(menuCount).map(item => menuCount[item])

    let newData = this.state.menu ? Object.keys(this.state.menu).map(item => 
      [this.state.menu[item].image, this.state.menu[item].name, menuCount[item], '$'+this.state.menu[item].price.toString()]
    ):[['loading...', 'loading...', 'loading...', 'loading...']]
    
    
    let Total = this.state.menu ? Object.keys(this.state.menu).map(item => 
      menuCount[item] *= this.state.menu[item].price.toString()
    ).reduce((sum, elem) => sum + elem):NaN

    // Object.keys(this.state.preorders).map((userid) =>{
    //   Object.keys(this.state.preorders[userid]).map((orderid) => {
    //       this.state.preorders[userid][orderid].order_list
    //       console.log(this.state.preorders[userid][orderid].order_list)
    //       })
    // })
    
    // let countData = Object.keys(orderData).map(item => {
    //   [orderData[item].order_list, orderData.order_list[item].count]
    // })
    // console.log(countData)
   
    return (
      <div>
        <Grid container>
          <ItemGrid xs={12} sm={6} md={3}>
            <StatsCard
              icon={AttachMoney}
              iconColor="blue"
              title="總金額"
              description={Total}
              statIcon={Update}
              statText="Just Updated"
            />
          </ItemGrid>
          <ItemGrid xs={12} sm={6} md={3}>
            <StatsCard
              icon={LocalCafe}
              iconColor="green"
              title="飲料總金額"
              description={NaN}
              statIcon={Update}
              statText="Just Updated"
            />
          </ItemGrid>
          <ItemGrid xs={12} sm={6} md={3}>
            <StatsCard
              icon={RestaurantMenu}
              iconColor="orange"
              title="食物總金額"
              description={NaN}
              statIcon={Update}
              statText="Just Updated"
            />
          </ItemGrid>
        </Grid>
        <Grid container>
          <ItemGrid xs={12} sm={12} md={12}>
            <RegularCard
              cardTitle="總銷貨"
              cardSubtitle="總共賣出多少商品"
              content={
                <Table
                  tableHeaderColor="primary"
                  tableHead={["Name", "名稱", "Count", "Amount"]}
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