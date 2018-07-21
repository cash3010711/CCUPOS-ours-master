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
   {  path: '/menu'}// sync full list of todos
  // { path: '/projects', type: 'once' } // for loading once instead of binding
  //{ path: 'todos', queryParams: ['limitToFirst=20'] } // limit to first 20
  // { path: 'todos', queryParams: ['limitToFirst=20'], populates } // populate
  // { path: 'todos', queryParams: ['orderByChild=text'] }, // list todos alphabetically
])

@connect(
  ({firebase}) => ({
  orders: dataToJS(firebase, 'orders'),
  menu: dataToJS(firebase, 'menu'),

  })
)
export default class Order extends React.Component {
  static propTypes = {
      orders: PropTypes.object,
      menu: PropTypes.object
    }


    renderOrderList(key,amount){

    var amountstring = '數量 : ' + amount
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


    renderOrderItem(key,item){

      var time = new Date()
      time = item.orderTime ? new Date(item.orderTime) : null

      var timestring = new String()

      timestring = '訂單日期 : ' + (time ? time.getFullYear(time).toString() +'年' + time.getMonth(time).toString() +'月' + time.getDate(time).toString() + '日'+ '  ' + time.getHours(time).toString()
      + ':' +time.getMinutes(time).toString()+ ':' +time.getSeconds(time).toString() : '0')

      return (

        <Card key={key}>

          <CardHeader
            title={ timestring }
            subtitle={item.status}
            actAsExpander={true}
            showExpandableButton={true}
          />
          <CardActions>

          </CardActions>
          <CardText expandable={true}>

           <List>

            {item.order_list ? Object.keys(item.order_list).map( key => this.renderOrderList(key, item.order_list[key])) :<h1>No Data</h1> }
           </List>

          </CardText>
        </Card>

      )

    }


  render() {
    const { menu, orders } = this.props;
    var sortedorder = this.props.orders

    return (
     <div>
       <Card initiallyExpanded = {true} key="queue">

         <CardHeader
           title="未完成訂單"

           actAsExpander={true}
           showExpandableButton={true}
         />
       <CardActions>
       </CardActions>
       <CardText expandable={true}>

      { this.props.orders
        ? Object.keys(sortedorder).sort(function (a, b) {return sortedorder[b].orderTime > sortedorder[a].orderTime ? 1 : -1;}).map( key => (sortedorder[key].status == 'Queued' ) ? this.renderOrderItem(key, sortedorder[key] ) : null )
        : <h1>Loading...</h1> }
       </CardText>
        </Card>


        <Card key="done">

          <CardHeader
            title="已完成訂單"

            actAsExpander={true}
            showExpandableButton={true}
          />
        <CardActions>
        </CardActions>
        <CardText expandable={true}>

          { this.props.orders
            ?Object.keys(sortedorder).sort(function (a, b) {return sortedorder[b].orderTime > sortedorder[a].orderTime ? 1 : -1;}).map( key => (sortedorder[key].status == 'Done') ? this.renderOrderItem(key, sortedorder[key] ) : null )
            : <h1>Loading...</h1> }
        </CardText>
         </Card>

     </div>


    )
  }
}
