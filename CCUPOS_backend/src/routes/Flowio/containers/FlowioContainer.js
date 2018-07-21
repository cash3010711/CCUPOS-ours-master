import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import {
  firebaseConnect,
  isLoaded,
  isEmpty,
  pathToJS,
  dataToJS,
  getFirebase
  // orderedToJS,
  // populatedDataToJS
} from 'react-redux-firebase'
import { UserIsAuthenticated } from 'utils/router'
import {GridList, GridTile} from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import Subheader from 'material-ui/Subheader';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import {List, ListItem} from 'material-ui/List';
import Avatar from 'material-ui/Avatar';

// const populates = [
//   { child: 'owner', root: 'users', keyProp: 'key' }
// ]

@UserIsAuthenticated // redirect to /login if user is not authenticated
@firebaseConnect([
   {  path: '/orders'},//, queryParams: [ 'orderByChild=user_email', 'startAt=${}', 'endAt=${}' ]},
   {  path: '/menu'},
   {  path: '/purchase'}
   // sync full list of todos
  // { path: '/projects', type: 'once' } // for loading once instead of binding
  //{ path: 'todos', queryParams: ['limitToFirst=20'] } // limit to first 20
  // { path: 'todos', queryParams: ['limitToFirst=20'], populates } // populate
  // { path: 'todos', queryParams: ['orderByChild=text'] }, // list todos alphabetically
])

@connect(
  ({firebase}) => ({
  orders: dataToJS(firebase, 'orders'),
  menu: dataToJS(firebase, 'menu'),
  purchase: dataToJS(firebase, 'purchase')
  })
)
export default class Flowio extends React.Component {


  static propTypes = {
      orders: PropTypes.object,
      menu: PropTypes.object,
      purchase: PropTypes.object
    }
    constructor(props) {
        super(props);
        this.state = {purchase_total_price: 0 , order_total_price : 0};
      }


    renderStockList(key,orderamount,purchaseamount){

      var amountstring = '庫存數量 : ' + (purchaseamount - orderamount)
      var foodicon = this.props.menu ? this.props.menu[key] ? 'image/fk/'+this.props.menu[key].image+'.jpg': null :null
      return (

        <ListItem
         key = {key}
         primaryText={this.props.menu ? this.props.menu[key] ? this.props.menu[key].name : key:key}
         secondaryText={amountstring}

         leftAvatar= {<Avatar src={foodicon} />}

         />

      )

    }


    renderPurchaseList(key,amount){

      var amountstring = '總進貨數量 : ' + amount
      var foodicon = this.props.menu ? this.props.menu[key] ? 'image/fk/'+this.props.menu[key].image+'.jpg': null :null
      return (

        <ListItem
         key = {key}
         primaryText={this.props.menu ? this.props.menu[key] ? this.props.menu[key].name : key:key}
         secondaryText={amountstring}

         leftAvatar= {<Avatar src={foodicon} />}

         />

      )

    }



    renderOrderList(key,amount){

      var amountstring = '總銷售數量 : ' + amount
      var foodicon = this.props.menu ? this.props.menu[key] ? 'image/fk/'+this.props.menu[key].image+'.jpg': null :null
      return (

        <ListItem
         key = {key}
         primaryText={this.props.menu ? this.props.menu[key] ? this.props.menu[key].name : key:key}
         secondaryText={amountstring}

         leftAvatar= {<Avatar src={foodicon} />}

         />

      )

    }

  countpurchaseamount(purchaseamount , purchase){

      Object.keys(purchase.purchase_list).map( key => {purchaseamount[key] += purchase.purchase_list[key] })

    }
  countorderamount(orderamount , orders){

    Object.keys(orders.order_list).map( key => {orderamount[key] += orders.order_list[key] })

  }
 //Object.keys(this.props.orders[key].order_list).map( key => {test[key] += this.props.orders[key].order_list[key] })
  render() {
    const { menu, orders , purchase} = this.props;

    var sortedorder = this.props.orders
    var orderamount = new Object()
    var purchaseamount = new Object()

    this.props.menu ? Object.keys(this.props.menu).map( this.props.menu ? key =>  { orderamount[key] = 0 } : null ) :null
    this.props.menu ? Object.keys(this.props.menu).map( this.props.menu ? key =>  { purchaseamount[key] = 0} : null ) : null
    this.props.orders ? Object.keys(this.props.orders).map( (this.props.orders && orderamount ) ? key => this.countorderamount( orderamount ,this.props.orders[key]) : null) : null
    this.props.purchase ? Object.keys(this.props.purchase).map( (this.props.purchase && purchaseamount ) ? key => this.countpurchaseamount( purchaseamount ,this.props.purchase[key]) : null) : null
    //console.log(Object.keys(purchaseamount).reduce((previous , item )=> previous + this.props.menu[item].purchase_price*purchaseamount[item], 0))
    this.state.purchase_total_price =Object.keys(purchaseamount).reduce((previous , item )=> previous + this.props.menu[item].purchase_price*purchaseamount[item], 0)
    this.state.order_total_price =Object.keys(orderamount).reduce((previous , item )=> previous + this.props.menu[item].price*orderamount[item], 0)
    //this.setState({purchase_total_price : Object.keys(purchaseamount).reduce((previous , item )=> previous + this.props.menu[item].purchase_price*purchaseamount[item], 0))
    return (
     <div>

       <Card key="stock">

         <CardHeader
           title="庫存"
           actAsExpander={true}
           showExpandableButton={true}
         />
       <CardActions>
       </CardActions>
       <CardText expandable={true}>
         <span style={{color: 'green','font-size': '30pt'}} >庫存總金額:</span>
         <span style={{'font-size': '30pt'}}>{this.state.purchase_total_price -this.state.order_total_price}</span>
         { this.props.menu
           ?Object.keys(this.props.menu).map( key => this.renderStockList(key, orderamount[key],purchaseamount[key] ))
           : <h1>Loading...</h1> }

       </CardText>
        </Card>

       <Card initiallyExpanded = {false} key="order">

         <CardHeader
           title="出貨"
           actAsExpander={true}
           showExpandableButton={true}
         />
       <CardActions>
       </CardActions>
       <CardText expandable={true}>
         <span style={{color: 'green','font-size': '30pt'}} >出貨總金額:</span>
         <span style={{'font-size': '30pt'}}>{this.state.order_total_price}</span>
         { this.props.menu
           ?Object.keys(this.props.menu).map( key => this.renderOrderList(key, orderamount[key] ))
           : <h1>Loading...</h1> }

       </CardText>
        </Card>


        <Card key="purchse">

          <CardHeader
            title="進貨"
            actAsExpander={true}
            showExpandableButton={true}
          />
        <CardActions>
        </CardActions>
        <CardText expandable={true}>
          <span style={{color: 'green','font-size': '30pt'}} >進貨總金額:</span>
          <span style={{'font-size': '30pt'}}>{this.state.purchase_total_price}</span>
          { this.props.menu
            ?Object.keys(this.props.menu).map( key => this.renderOrderList(key, purchaseamount[key] ))
            : <h1>Loading...</h1> }
        </CardText>
         </Card>

     </div>


    )
  }
}
