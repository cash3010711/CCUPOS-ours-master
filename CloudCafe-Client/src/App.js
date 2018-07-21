import React, {Component} from 'react';

import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import {Grid, Row, Col} from 'react-bootstrap';
import {List, ListItem} from 'material-ui/List';
import FontIcon from 'material-ui/FontIcon';
import FlatButton from 'material-ui/FlatButton';
import base from './rebase';
import SearchBar from 'material-ui-search-bar';

/*
var base
= Rebase.createClass({
    apiKey: "AIzaSyDHmPGR9Lo0ZNC8EuNWmCx-Jp4vDM3jt6I",
    authDomain: "cloudcoffee-e23cb.firebaseapp.com",
    databaseURL: "https://cloudcoffee-e23cb.firebaseio.com"})
*/

class App extends Component {
    constructor() {
        super()
        this.renderOrders = this.renderOrders.bind(this)
        this.state = {
            searchText: ""
        }

    }

    componentDidMount() {
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
    }

    // <FontIcon className="fa fa-compass"/> 點餐人 :  { this.state.users[item.createdBy].displayName }
    /*
                        <FontIcon className="fa fa-compass"/> 點餐人 :  {
                    this.state.users[item.createdBy]?this.state.users[item.createdBy].displayName
                    :null
                    }
    */


    renderOrders(item, key) {

        return (
        <div key={key} className="card">
        {item.serial ? item.serial.replace("^0*","") === this.state.searchText?
                <Card>
                    <CardHeader
                    title={<span>
                        <FontIcon className="fa fa-compass"/> 點餐人 :  {
                    this.state.users[item.createdBy]?this.state.users[item.createdBy].displayName
                    :null
                    }
                    <font>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;訂單編號 :  </font>{item.serial?<font color="red">{item.serial}</font> :null}

                    <font>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;付款狀態 :  </font>
                    {item.checked === "Nonpay"? <font color="red">&nbsp;&nbsp;尚未付款</font>
                                            :null
                    }
                    {item.checked === "Paying"? <font color="red">&nbsp;&nbsp;付款中</font>
                                            :null
                    }
                    {item.checked === "Payed"? <font color="green">&nbsp;&nbsp;已付款</font>
                                            :null
                    }
                    <font>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;訂單狀態 :  </font>
                    {item.status === "Queued"? <font className="status">&nbsp;&nbsp;等待製作中</font>
                                            :null
                    }
                    {item.status === "Making"? <font className="status">&nbsp;&nbsp;製作中</font>
                                            :null
                    }
                    {item.status === "Completed"? <font className="status">&nbsp;&nbsp;訂單完成</font>
                                            :null
                    }
                    </span>}
                    />
                    <CardText>
                    <List>
                        <h4>訂單內容 :</h4><br/>
                        {item.order_list?Object.keys(item.order_list).map((order, key)=>{
                            const product_name = this.state.menu ? this.state.menu[order].name : ""
                            const qty = item.order_list[order].count
                            return <ListItem key={key} primaryText={`${product_name}   ${qty} `} />
                        }) : null }
                            <hr/>
                            <h4>小計:
                                <span className="total_price">NT$ {item.total_price}</span>
                            </h4>
                    </List>
                    </CardText>
                    <CardActions>
                        {item.checked === "Nonpay"?
                            <FlatButton label="訂單付款" labelPosition="after" primary={true} icon={< FontIcon className="fa fa-check-square-o" />} onClick={() => this.handleChecked(item.createdBy,item.orderid)}/>
                        :null
                        }
                        {item.checked === "Paying"?
                            <FlatButton label="取消付款" labelPosition="after" primary={true} icon={< FontIcon className="fa fa-check-square-o" />} onClick={() => this.handleCanceled(item.createdBy,item.orderid)}/>
                        :null
                        }
                    </CardActions>
                </Card>
        :null
        :null
      }
        </div>

    )}


    handleChecked(userID,orderID) {              //state( Queued- > Making )


        const confirmed = window.confirm('您即將為這份訂單付款，確定這張為您的訂單嗎?');

                if(confirmed)
                {
                    let newState = {
                        ...this.state
                    }
                    //newState.preorders[userID][orderID].checked = "Paying"
                    //this.setState(newState)
                    base.update(`preorders/${userID}/${orderID}`, {
                      data: {checked: 'Paying'}
                    }).then(() => {
                      newState.preorders[userID][orderID].checked = 'Paying'
                    }).catch(err => {
                      //handle error
                    });
                }
                else
                {
                    console.log("delete fail")
                }

    }

    handleCanceled(userID,orderID){

            let newState = {
                ...this.state
            }
            //newState.preorders[userID][orderID].checked = "Nonpay"
            //this.setState(newState)
            base.update(`preorders/${userID}/${orderID}`, {
              data: {checked: 'Nonpay'}
            }).then(() => {
              newState.preorders[userID][orderID].checked = 'Nonpay'
            }).catch(err => {
              //handle error
            });
    }

    render(){

        var sortedorder = []  //sortedorder=取代訂單編號


        this.state.preorders?Object.keys(this.state.preorders).map((userid) =>{
        Object.keys(this.state.preorders[userid]).map((orderid) => {
            this.state.preorders[userid][orderid].orderid=orderid
            sortedorder.push(this.state.preorders[userid][orderid])
            })
        }):null

        sortedorder.sort(function (a, b) {
            if (a.createdAt > b.createdAt) { return 1 ;}
            if (a.createdAt < b.createdAt) { return -1 ;}
            return 0;
        })


        return (
            <Grid className="App">
                <Col>
                    <Row>
                        <h1>Cloud Cafe</h1>
                    </Row>
                </Col>
                <Col>
                    <Row>
                    <SearchBar
                    onChange={ (value) =>  {
                        this.setState(...this.state, {searchText: value});    //...this.state = 先繼承this.state後再改變searchtext內容
                    } }  //preordernumber = input value
                    onRequestSearch = { ()=> console.log('success')}
                    style={{
                      margin: '0 auto',
                      maxWidth: 800
                    }}
                  />
                    </Row>
                </Col>
                <Col>
                    <Row>
                    {this.state.preorders ? Object.keys(sortedorder).map((orderid) => {
                        return  this.renderOrders(sortedorder[orderid],orderid)
                        })
                    : <h1>Loading...</h1>}
                    </Row>
                </Col>



            </Grid>
        );
    }
}

export default App;
