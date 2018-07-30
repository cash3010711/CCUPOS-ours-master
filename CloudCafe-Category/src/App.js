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

class App extends Component {
    constructor() {
        super()
        this.renderOrders = this.renderpayedOrders.bind(this)
        this.state = {
          sending : false,
		  goodtype : "start",
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
		base.syncState(`foodcategory`, {
            context: this,
            state: `foodcategory`,
            asArray: false
        });
    }

    renderpayedOrders(item, key) {
        return (
        <div key={key} className="card">
        {item.checked === "Payed"?
                <Card style={item.status === "Making"?{background:'#FFECB3'}:item.status === "Completed"?{background:	'#FFC107'} :{}}>
                    <CardHeader
                    title={<span>
                        <FontIcon className="fa fa-compass"/> 
                    <font>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;桌號 :  </font>{item.table?<font color="red">{item.table}</font> :null}
                    <font>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;付款編號 :  </font>{item.serial?<font color="red">{item.serial}</font> :null}

                    </span>}
                    subtitle={  item.type === "eathere"?
                      <Chip
                        backgroundColor={blue300}
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
							const catename= this.state.menu ? this.state.menu[order].category : ""
                            return catename===this.state.goodtype ? <ListItem
                              style={item.order_list[order].status === "Queued"?{backgroundColor:	'white'}:item.order_list[order].status === "Making"?{backgroundColor:	'#FFE082'}: item.order_list[order].status === "Completed"?{backgroundColor:	'#FFC107'} :{}}
                              key={key}
                              primaryText={ <div > <p style={{display:'inline'}} >{product_name}  * {qty} 份 </p>
                              {item.order_list[order].status=='Queued'?
                              <Chip
                                backgroundColor={deepOrangeA100}
                                color={"White"}
                                style={{display:'inline'}}
                                >
                                尚未製作
                                </Chip>:
                              item.order_list[order].status=='Making'? (
                                  <Chip
                                    backgroundColor={deepOrangeA100}
                                    color={"White"}
                                    style={{display:'inline'}}
                                    >
                                    製作中
                                    </Chip>
                                  ):
                              item.order_list[order].status=='Completed'? (
                                <Chip
                                  backgroundColor={deepOrangeA100}
                                  color={"White"}
                                  style={{display:'inline'}}
                                  >
                                  製作完成
                                  </Chip>
                                ):
                                  null}
                               </div>}

                              onClick={() => this.handleItemComplete(item.createdBy,item.orderid,order)}
                            />

							:null}):null}
                            <hr/>
                    </List>
                    </CardText>
                </Card>
        :null}
        </div>
    )}

    handleItemComplete(userID,orderID,itemkey) {              //state( Making -> Complete ) 發送通知

        let newState = {
            ...this.state
        }
        if(newState.preorders[userID][orderID].order_list[itemkey].status === "Queued" ) {
          if(newState.preorders[userID][orderID].status !="Completed") {
             base.update(`preorders/${userID}/${orderID}`, {
               data: {status: 'Making'}
             }).then(() => {
              newState.preorders[userID][orderID].status = "Making"
             }).catch(err => {
               //handle error
             });
          }
            base.update(`preorders/${userID}/${orderID}/order_list/${itemkey}`, {
              data: {status: 'Making'}
            }).then(() => {
              newState.preorders[userID][orderID].order_list[itemkey].status = "Making"
            }).catch(err => {
              //handle error
            });
        }
        else if(newState.preorders[userID][orderID].order_list[itemkey].status === "Making") {
          base.update(`preorders/${userID}/${orderID}/order_list/${itemkey}`, {
            data: {status: 'Completed'}
          }).then(() => {
            newState.preorders[userID][orderID].order_list[itemkey].status = "Completed"
          }).catch(err => {
            //handle error
          });
        }
    }

	changeCategory(category){
		return(
		<div key={category}>
		<FlatButton label={category} labelPosition="after"  backgroundColor={blueGrey100}  icon={< FontIcon className="fa fa-check-square-o" />} onClick={() => this.setState({goodtype : category})}/>
		</div>
		)
	}

    render(){
        var sortedorder = []
        const style = {
            margin: 12,
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
                        <h1>{this.state.goodtype}</h1>
                    </Row>
                </Col>
                <Col>
					<Row>
						{this.state.foodcategory ? Object.values(this.state.foodcategory).map((foodcategory) => {
                        return  this.changeCategory(foodcategory)
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
                    }
                    </Row>
                </Col>
            </Grid>
        );
    }
}

export default App;
