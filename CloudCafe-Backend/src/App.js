import React, {Component} from 'react';

import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import {Grid, Row, Col} from 'react-bootstrap';
import {List, ListItem} from 'material-ui/List';
import FontIcon from 'material-ui/FontIcon';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
import base from './rebase';
import SearchBar from 'material-ui-search-bar';
import LinearProgress from 'material-ui/LinearProgress';
import Badge from 'material-ui/Badge';
import IconButton from 'material-ui/IconButton';
import NotificationsIcon from 'material-ui/svg-icons/social/notifications';
import {blue300, indigo900,deepOrange500,blueGrey100,deepOrangeA100} from 'material-ui/styles/colors'
import Chip from 'material-ui/Chip'
import Avatar from 'material-ui/Avatar'
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
        this.renderOrders = this.renderpayingOrders.bind(this)
        this.renderOrders = this.renderpayedOrders.bind(this)
        this.handleComplete = this.handleComplete.bind(this)
        this.handleMaking = this.handleMaking.bind(this)
        this.state = {
          sending : false
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
        base.syncState(`orders`, {
            context: this,
            state: `orders`,
            asArray: false
        });
    }


    rendersearchOrders(item, key) {
        return (

        <div key={key} className="card">
        {item.serial === this.state.searchText?
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
                    subtitle={  item.type === "eathere"?
                      <Chip
                        backgroundColor={blue300}

                        //style={styles.chip}
                        >
                          <Avatar size={32} color={"White"} backgroundColor={indigo900}>
                            內
                          </Avatar>
                            內用
                        </Chip>
                        :
                        <Chip
                          backgroundColor={deepOrangeA100}
                          color={"White"}
                          //style={styles.chip}
                          >
                            <Avatar size={32} color={"White"} backgroundColor={deepOrange500}>
                            外
                            </Avatar>
                            外帶
                          </Chip>
                        }
                    />
                    <CardText>
                    <List>
                        <h4>訂單內容 :</h4><br/>
                        {item.order_list?Object.keys(item.order_list).map((order, key)=>{
                            const product_name = this.state.menu ? this.state.menu[order].name : ""
                            const qty = item.order_list[order].count
                            return <ListItem key={key} primaryText={`${product_name}   ${qty} `} />
                        }):null}
                            <hr/>
                            <h4>小計:
                                {item.total_price?<span className="total_price">NT$ {item.total_price}</span>
                                :null}
                            </h4>
                    </List>
                    </CardText>
                    <CardActions>
                        <FlatButton label="刪除訂單" labelPosition="after" primary={true} icon={< FontIcon className="fa fa-check-square-o" />} onClick={()=>this.handleDelete(item.createdAt,item.createdBy)}/>
                    </CardActions>
                </Card>
        :null}
        </div>
    )}

    renderpayingOrders(item, key) {
        return (
        <div key={key} className="card">
        {item.checked === "Paying"?
                <Card >
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

                    subtitle={  item.type === "eathere"?
                      <Chip
                        backgroundColor={blue300}

                        //style={styles.chip}
                        >
                          <Avatar size={32} color={"White"} backgroundColor={indigo900}>
                            內
                          </Avatar>
                            內用
                        </Chip>
                        :
                        <Chip
                          backgroundColor={deepOrangeA100}
                          color={"White"}
                          //style={styles.chip}
                          >
                            <Avatar size={32} color={"White"} backgroundColor={deepOrange500}>
                            外
                            </Avatar>
                            外帶
                          </Chip>
                        }
                    />
                    <CardText>
                    <List>
                        <h4>訂單內容 :</h4><br/>
                        {item.order_list?Object.keys(item.order_list).map((order, key)=>{
                            const product_name = this.state.menu ? this.state.menu[order].name : ""
                            const qty = item.order_list[order].count
                            return <ListItem key={key} primaryText={`${product_name}   ${qty} `} />
                        }):null}
                            <hr/>
                            <h4>小計:
                                <span className="total_price">NT$ {item.total_price}</span>
                            </h4>
                    </List>
                    </CardText>
                    <CardActions>
                        {item.checked === "Paying"?
                            <FlatButton label="確認付款" labelPosition="after" primary={true} icon={< FontIcon className="fa fa-check-square-o" />} onClick={() => this.handleChecked(item.createdBy,item.orderid)}/>
                        :null
                        }
                        <FlatButton label="刪除訂單" labelPosition="after" primary={true} icon={< FontIcon className="fa fa-check-square-o" />} onClick={()=>this.handleDelete(item.createdAt,item.createdBy)}/>
						<FlatButton label="悠遊卡付款" labelPosition="after" primary={true} icon={< FontIcon className="fa fa-check-square-o" />} onClick={()=>this.easycard(item.createdBy,item.orderid,item.total_price)}/>
                    </CardActions>
                </Card>
        :null}
        </div>
    )}

    renderpayedOrders(item, key) {
        return (
        <div key={key} className="card">
        {item.checked === "Payed"?
                <Card style={item.status === "Making"?{background:'#FFECB3'}:item.status === "Completed"?{background:	'#FFC107'} :{}}>
                    <CardHeader
                    title={<span>
                        <FontIcon className="fa fa-compass"/> 點餐人 :  {
                    this.state.users[item.createdBy]?this.state.users[item.createdBy].displayName
                    :null
                    }
                    <font>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;桌號 :  </font>{item.table?<font color="red">{item.table}</font> :null}
                    <font>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;付款編號 :  </font>{item.serial?<font color="red">{item.serial}</font> :null}

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
                    subtitle={  item.type === "eathere"?
                      <Chip
                        backgroundColor={blue300}

                        //style={styles.chip}
                        >
                          <Avatar size={32} color={"White"} backgroundColor={indigo900}>
                            內
                          </Avatar>
                            內用
                        </Chip>
                        :
                        <Chip
                          backgroundColor={deepOrangeA100}
                          color={"White"}
                          //style={styles.chip}
                          >
                            <Avatar size={32} color={"White"} backgroundColor={deepOrange500}>
                            外
                            </Avatar>
                            外帶
                          </Chip>
                        }
                    />
                    <CardText>
                    <List>
                        <h4>訂單內容 :</h4><br/>
                        {item.order_list?Object.keys(item.order_list).map((order, key)=>{
                            const product_name = this.state.menu ? this.state.menu[order].name : ""
                            const qty = item.order_list[order].count
                            return <ListItem
                              style={item.order_list[order].status === "Queued"?{backgroundColor:	'white'}:item.order_list[order].status === "Making"?{backgroundColor:	'#FFE082'}: item.order_list[order].status === "Completed"?{backgroundColor:	'#FFC107'} :{}}
                              key={key}
                              primaryText={ <div > <p style={{display:'inline'}} >{product_name}  * {qty} 份 </p>
                              {item.order_list[order].status=='Queued'?
                              <Chip
                                backgroundColor={deepOrangeA100}
                                color={"White"}
                                style={{display:'inline'}}
                                //style={styles.chip}
                                >
                                尚未製作
                                </Chip>:
                              item.order_list[order].status=='Making'? (
                                  <Chip
                                    backgroundColor={deepOrangeA100}
                                    color={"White"}
                                    style={{display:'inline'}}
                                    //style={styles.chip}
                                    >
                                    製作中
                                    </Chip>
                                    //<p>製作完成</p>
                                  ):
                              item.order_list[order].status=='Completed'? (
                                <Chip
                                  backgroundColor={deepOrangeA100}
                                  color={"White"}
                                  style={{display:'inline'}}
                                  //style={styles.chip}
                                  >
                                  製作完成
                                  </Chip>
                                  //<p>製作完成</p>
                                ):
                                  null}
                               </div>}

                              onClick={() => this.handleItemComplete(item.createdBy,item.orderid,order)}
                            />

                        }):null}
                            <hr/>
                            <h4>小計:
                                <span className="total_price">NT$ {item.total_price}</span>
                            </h4>
                    </List>
                    </CardText>
                    <CardActions>
                        {item.checked === "Paying"?
                            <FlatButton label="確認付款" labelPosition="after"  backgroundColor={blueGrey100}  icon={< FontIcon className="fa fa-check-square-o" />} onClick={() => this.handleChecked(item.createdBy,item.orderid)}/>
                        :null
                        }
                        {item.status === "Queued"&&item.checked === "Payed"?
                            <FlatButton label="開始製作" labelPosition="after"  backgroundColor={blueGrey100} icon={< FontIcon className="fa fa-check-square-o" />} onClick={() => this.handleMaking(item.createdBy,item.orderid)}/>
                            :null
                        }
                        {item.status === "Making"||item.status === "Completed"?
                            <FlatButton label="製作完成、發送取餐通知" labelPosition="after"  backgroundColor={blueGrey100}  icon={< FontIcon className="fa fa-check-square-o" />} onClick={() => this.handleComplete(item.createdBy,item.orderid)}/>
                            :null
                        }
                        {item.status === "Completed"?
                            <FlatButton disabled={this.state.sending} label="取餐完成" labelPosition="after"  backgroundColor={blueGrey100}  icon={< FontIcon className="fa fa-check-square-o" />} onClick={() => this.getorders(item.createdBy,item.orderid)}/>
                            :null
                        }
                    </CardActions>
                </Card>
        :null}
        </div>
    )}




    handleDelete(createAt,createBy) {             //state( Queued- > Making ) createAt createby

        const confirmed = window.confirm('刪除後訂單無法復原，確定要刪除嗎?');
        if(confirmed){
        const data = {
            createdAt: createAt,
            createdBy: createBy
          }
          console.log(data)
          fetch('https://us-central1-cafe-le-cloud.cloudfunctions.net/orderRemove', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data)
        })
        }
        /*.then(response => {
              if(response.ok)
            {
              response.json().then(data => {
                this.props.dispatch( Notifications.success({
                  title: "訂單資訊",
                  message: "訂單刪除成功",
                  level: "success",
                  position: "tr"
                }))

                this.setState({canceldialogopen: false });
                this.setState({sending:false})
              })
            } else {
              console.log('Network response was not ok.');
              this.props.dispatch( Notifications.error({
                title: "伺服器回傳失敗",
                message: "訂單處理失敗,請再傳送一次",
                level: "error",
                position: "tr"
              }))
              this.setState({sending:false})

            }
          })
        .catch((error)=> {
          this.props.dispatch( Notifications.error({
            title: "伺服器連線失敗",
            message: "訂單刪除失敗,請檢察網路或伺服器狀態",
            level: "error",
            position: "tr"
          }))
          console.log('There has been a problem with your fetch operation: ' + error.message);
          this.setState({sending:false})

        })*/

    }
	easycard(e_userID,e_orderID,e_money)
	{
		this.handleChecked(e_userID,e_orderID)
		window.external.Ecard(e_money)
	}
	
	handleChecked(userID,orderID) {

        const data = {
            orderId: orderID,
            createdBy:userID
          }
          console.log(data)
          fetch('https://us-central1-cafe-le-cloud.cloudfunctions.net/check', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data)
        })
    }
	
    handleMaking(userID,orderID) {              //state( Queued -> Making )
        let newState = {
            ...this.state
        }
        //newState.preorders[userID][orderID].status = "Making"
        //this.setState(newState)
        base.update(`preorders/${userID}/${orderID}`, {
          data: {status: 'Making'}
        }).then(() => {
          newState.preorders[userID][orderID].status = "Making"
        }).catch(err => {
          //handle error
        });
    }

    handleComplete(userID,orderID) {              //state( Making -> Complete ) 發送通知
        let newState = {
            ...this.state
        }
        //newState.preorders[userID][orderID].status = "Completed"
        //this.setState(newState.preorders[userID][orderID].status)
        base.update(`preorders/${userID}/${orderID}`, {
          data: {status: 'Completed'}
        }).then(() => {
          newState.preorders[userID][orderID].status = "Completed"
        }).catch(err => {
          //handle error
        });
        fetch('https://fcm.googleapis.com/fcm/send', {

                        method: 'POST',
                        headers: {
                         'Authorization' : 'key=AIzaSyBkOXro-6aRTgd_e7Axc-r0g7RW_SLZavk',
                          'Accept'       : 'application/json',
                          'Content-Type' : 'application/json; charset=utf-8',
                        },
                        body: JSON.stringify({
                            data : {title:"Cloud Le Cafe" , body: "您的餐點好了 , 請至櫃台取餐。" , click_url: "https://cloudcoffee-e23cb.firebaseapp.com/"},
                            to: this.state.users[userID]?this.state.users[userID].deviceId :null,
                        })
                      })

                    console.log(this.state.users[userID].deviceId)
    }


    handleItemComplete(userID,orderID,itemkey) {              //state( Making -> Complete ) 發送通知
      /*
      let prevState = {
          ...this.state
      }
      this.setState(prevState => {
        var preorders = prevState.preorders;
        let foods = { ...prevFoods };
        foods[key] = null;
        debugger;
        return { foods };
      })
      */

        let newState = {
            ...this.state
        }
        //console.log(newState.preorders[userID][orderID].order_list[itemkey])
        if(newState.preorders[userID][orderID].order_list[itemkey].status === "Queued" ) {
          //newState.preorders[userID][orderID].order_list[itemkey].status = "Making"
          if(newState.preorders[userID][orderID].status !="Completed") {
             //newState.preorders[userID][orderID].status = "Making"
             base.update(`preorders/${userID}/${orderID}`, {
               data: {status: 'Making'}
             }).then(() => {
              newState.preorders[userID][orderID].status = "Making"
             }).catch(err => {
               //handle error
             });
          }
          //this.setState(newState)
            base.update(`preorders/${userID}/${orderID}/order_list/${itemkey}`, {
              data: {status: 'Making'}
            }).then(() => {
              newState.preorders[userID][orderID].order_list[itemkey].status = "Making"
            }).catch(err => {
              //handle error
            });
        }
        else if(newState.preorders[userID][orderID].order_list[itemkey].status === "Making") {
          //newState.preorders[userID][orderID].order_list[itemkey].status = "Completed"
          //this.setState(newState)
          base.update(`preorders/${userID}/${orderID}/order_list/${itemkey}`, {
            data: {status: 'Completed'}
          }).then(() => {
            newState.preorders[userID][orderID].order_list[itemkey].status = "Completed"
          }).catch(err => {
            //handle error
          });
          //newState.preorders[userID][orderID].status == = "Making"
        }
        //this.setState(newState)
        /*
        fetch('https://fcm.googleapis.com/fcm/send', {

                        method: 'POST',
                        headers: {
                         'Authorization' : 'key=AIzaSyBkOXro-6aRTgd_e7Axc-r0g7RW_SLZavk',
                          'Accept'       : 'application/json',
                          'Content-Type' : 'application/json; charset=utf-8',
                        },
                        body: JSON.stringify({
                            data : {title:"Cloud Le Cafe" , body: "您的餐點好了 , 請至櫃台取餐。" , click_url: "https://cloudcoffee-e23cb.firebaseapp.com/"},
                            to: this.state.users[userID]?this.state.users[userID].deviceId :null,
                        })
                      })

                    console.log(this.state.users[userID].deviceId)*/
    }


    getorders(userID,orderID) {             //取餐完成 preorder ---> order

      console.log("insert success");
      const data = {
          createdAt: this.state.preorders[userID][orderID].createdAt,
          createdBy: this.state.preorders[userID][orderID].createdBy
        }
      var pushdata ={
          checked: this.state.preorders[userID][orderID].checked,
          createdAt: this.state.preorders[userID][orderID].createdAt,
          createdBy:  this.state.preorders[userID][orderID].createdBy,
          order_list:  this.state.preorders[userID][orderID].order_list,
          orderid:  this.state.preorders[userID][orderID].orderid,
          status:  this.state.preorders[userID][orderID].status,
          total_price:  this.state.preorders[userID][orderID].total_price,
          type:  this.state.preorders[userID][orderID].type,
          table: this.state.preorders[userID][orderID].table
      }

      console.log(data)
      this.setState({sending:true});
      fetch('https://us-central1-cafe-le-cloud.cloudfunctions.net/orderRemove', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      }).then( response =>{
        if(response.ok){
        console.log(pushdata)
        base.push(`/orders/${userID}`,{data:pushdata}).then(()=>{console.log("orderpush success");this.setState({sending:false});}).catch(err => {
            //handle error
            console.log(err)
            this.setState({sending:false});
        })
        }
        else{
          console.log("delete error")
        }
      }).catch(err => {
          //handle error

          console.log(err)
          this.setState({sending:false});
      })

      /*
        base.push(`/orders/${userID}`,
        {
            data: {
                checked: this.state.preorders[userID][orderID].checked,
                createdAt: this.state.preorders[userID][orderID].createdAt,
                createdBy:  this.state.preorders[userID][orderID].createdBy,
                order_list:  this.state.preorders[userID][orderID].order_list,
                orderid:  this.state.preorders[userID][orderID].orderid,
                status:  this.state.preorders[userID][orderID].status,
                total_price:  this.state.preorders[userID][orderID].total_price,
                type:  this.state.preorders[userID][orderID].type,
                table: this.state.preorders[userID][orderID].table
            }
        }).then(()=>{

                console.log("insert success");
                const data = {
                    createdAt: this.state.preorders[userID][orderID].createdAt,
                    createdBy: this.state.preorders[userID][orderID].createdBy
                  }
                  console.log(data)
                  fetch('https://us-central1-cloudcoffee-e23cb.cloudfunctions.net/orderRemove', {
                  method: 'POST',
                  headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify(data)
                }).catch(err => {
                    //handle error
                    console.log(err)
                })

        }).catch(err => {
            //handle error
            console.log(err)
        });


        /*
        base.update(`/preorders/${userID}/${orderID}`,
        {
            data: {
                serial: null,
                checked: null,
                coffeemaketime: null,
                createdAt: null,
                createdBy: null,
                foodmaketime: null,
                order_list: null,
                orderid: null,
                queuetime: null,
                status: null,
                total_price: null,
                type: null,
                table: null,
                idtoken: null
            },
            then(err){
              if(!err){
                console.log("delete success");
            }}
        })*/
    }
    /*<Row>
    <RaisedButton label="尚未付款訂單數" secondary={true} style={style} />
    </Row>*/


    render(){
        var sortedorder = []
        const style = {
            margin: 12
          };

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
            <Grid  className="App">
                <Col>
                    <Row>
                        <h1>Backend Manager</h1>
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
                    <Row>
                        {this.state.preorders ? Object.keys(sortedorder).map((orderid) => {
                        return  this.rendersearchOrders(sortedorder[orderid],orderid)
                        }):null
                        }
                    </Row>
                    <Row>
                        <br/><br/>
                    </Row>
                </Col>

                <Col>
                    <Row>
                        <LinearProgress mode="determinate"/>
                    </Row>
                </Col>
                <Col>
                    <Row>
                        {this.state.preorders ? Object.keys(sortedorder).map((orderid) => {
                        return  this.renderpayingOrders(sortedorder[orderid],orderid)
                        }):null
                        }
                    </Row>
                    <Row>
                        <br/><br/>
                    </Row>
                </Col>
                <Col>
                    <Row>
                        <LinearProgress mode="determinate"/>
                    </Row>
                </Col>
                <Col>
                    <Row>
                        {this.state.preorders ? Object.keys(sortedorder).map((orderid) => {
                        return  this.renderpayedOrders(sortedorder[orderid],orderid)
                        }): <h1>Loading...</h1>



                             // Object.keys(this.state.orders[userid]).map((orderid) => {
                             //if (this.state.orders[userid][orderid].status&&this.state.orders[userid][orderid].status === "Queued")
                             //console.log(this.state.orders[userid][orderid])
                             //return this.renderOrders(this.state.orders[userid][orderid], orderid)
                       // })
                    }

                    </Row>
                </Col>
            </Grid>
        );
    }
}

export default App;
