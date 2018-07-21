import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { withStyles } from 'material-ui-next/styles'
import {
  firebaseConnect,
  orderedToJS,
  dataToJS,
  getFirebase
  // orderedToJS,
  // populatedDataToJS
} from 'react-redux-firebase'

import equal from 'deep-equal'
import TextField from 'material-ui-next/TextField'
const styles = theme =>({
  cardbutton:{

  },
  container: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
}
)

@firebaseConnect((auth) => ([
  `/preorders`,
  `/orders`,
  '/menu'
]))

@connect(
  ({ firebase}) => ({
  preorders: orderedToJS(firebase, `/preorders`),
  orders: orderedToJS(firebase, `/orders`),
  menu: dataToJS(firebase, 'menu'),
  //profile: pathToJS(firebase, 'profile'),
  //auth: pathToJS(firebase, 'auth'),

  })
)

class Getorders extends Component {
  static propTypes = {
      preorders: PropTypes.array,
      orders: PropTypes.array,
      menu: PropTypes.object
    }

    constructor(props) {
          super(props);
          this.state = {
            begindate:'2017-05-30',
            enddate:'2017-06-30'
          };

        }

    shouldComponentUpdate(nextProps, nextState) {

      return !(equal(this.props,nextProps) && equal(this.state,nextState))
         //return shallowCompare(this, nextProps, nextState);
       }





  render() {
    const {classes, orders} = this.props
    var begin = new Date('2017-05-24')
    var totalprice=0
    var totalitem = new Object()
    var dayprice = new Object()
    var orderlistmap=(orderlist)=>{
      Object.keys(orderlist).map((item)=>{
          orderlist[item].count? totalitem[item] ? totalitem[item]+= parseInt(orderlist[item].count):totalitem[item]= parseInt(orderlist[item].count):null

      })

    }
    var ordermap = (orders,uid) =>{

        Object.keys(orders).map((orderid) => {
            //console.log(orders[orderid].total_price)
            orders[orderid].total_price?totalprice += parseInt(orders[orderid].total_price):null
            orders[orderid].order_list? orderlistmap(orders[orderid].order_list):null
            var orderday= orders[orderid].createdAt ? new Date(orders[orderid].createdAt) :null
            orderday ? dayprice[orderday.toDateString()] ? dayprice[orderday.toDateString()] += parseInt(orders[orderid].total_price) : dayprice[orderday.toDateString()] = parseInt(orders[orderid].total_price)  :null
          //orders[orderid].createdAt ? console.log(orderday.toDateString()) : console.log('not loaded')
        })

        }

    if(orders!=null && orders!=undefined) Object.keys(orders).map(uid => {

       ordermap(orders[uid],uid)

     })
    dayprice ? Object.keys(dayprice).map(day =>{
      console.log(day+'----'+dayprice[day])

    }) :null
    console.log(totalprice)
    console.log(this.state.begindate)
    //var sortedorder = this.props.orders
    //console.log(preorders)

    return (

     <div>


          { orders!=null && orders!=undefined
            ?
            <div>
            <form className={classes.container} noValidate>
              <TextField
                id="date"
                label="查詢起始日"
                type="date"
                defaultValue="2017-05-24"
                value = {this.state.begindate}
                className={classes.textField}
                InputLabelProps={{
                shrink: true,
                }}

              />
              <TextField
                id="date"
                label="查詢結束日"
                type="date"
                defaultValue="2017-05-24"
                value = {this.state.enddate}
                className={classes.textField}
                InputLabelProps={{
                shrink: true,
                }}
              />
            </form>
            {
            dayprice ? Object.keys(dayprice).sort( function(a, b){ return Date.parse(a) - Date.parse(b) } ).map(day =>{
              return (<p>{day}---{dayprice[day]}</p>)


            }) :(null)
            }
            <p>{totalprice}</p>
          </div>
            : <p>您沒有權限</p> }
     </div>


    )
  }
}


Getorders.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Getorders);
