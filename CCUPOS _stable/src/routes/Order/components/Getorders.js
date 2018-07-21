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

import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card'
import {List, ListItem} from 'material-ui/List'
import Avatar from 'material-ui/Avatar'
import equal from 'deep-equal'
import Button from 'material-ui-next/Button'
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from 'material-ui-next/Dialog'
import Notifications from 'react-notification-system-redux'

const styles = theme =>({
  cardbutton:{

 }
}
)

const icedesciption = { 0:'微冰', 1 : '少冰' , 2: '正常冰'}
const sugardesciption = { 0:'微糖', 1 : '半糖' , 2: '正常糖'}


@firebaseConnect((auth) => ([
  `/preorders/${getFirebase().auth().currentUser.uid}#orderByChild=createdAt`,
  `/orders/${getFirebase().auth().currentUser.uid}#orderByChild=createdAt`,
  '/menu'
]))

@connect(
  ({ firebase}) => ({
  preorders: orderedToJS(firebase, `/preorders/${getFirebase().auth().currentUser.uid}`),
  orders: orderedToJS(firebase, `/orders/${getFirebase().auth().currentUser.uid}`),
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
            canceldialogopen : false,
            sending:false,
            cancelcreatedAt : null
          };

        }

    shouldComponentUpdate(nextProps, nextState) {

      return !(equal(this.props,nextProps) && equal(this.state,nextState))
         //return shallowCompare(this, nextProps, nextState);
       }

       handlecanceldialogOpen = (createdAt) => {
         //console.log(createdAt)
         this.setState({canceldialogopen: true ,cancelcreatedAt:createdAt});
       };
       handlecanceldialogClose = () => {

         this.setState({canceldialogopen: false });
       };
       handlecancelorder = (ordertime) => {
         //console.log(ordertime)
         const data = {
           createdAt: ordertime,
           createdBy: getFirebase().auth().currentUser.uid
         }

         fetch('https://us-central1-cloudcoffee-e23cb.cloudfunctions.net/orderRemove', {
         method: 'POST',
         headers: {
           'Accept': 'application/json',
           'Content-Type': 'application/json',
         },
         body: JSON.stringify(data)
       }).then(response => {
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

       })


         //this.setState({canceldialogopen: false });
       };



    renderOrderList(key,item,storetype){

    var amountstring = item.count
    const custom =[]
    if(this.props.menu?(this.props.menu[key].sugar || this.props.menu[key].ice):false) {
      for(let i=0;i<=2;i++)
        for(let j=0;j<=2;j++){
          if(item[`count${i}${j}`] > 0)
          custom.push(<ListItem
            key={`${i}${j}`}
            primaryText={`${sugardesciption[i]} ${icedesciption[j]} * ${item[`count${i}${j}`]}`}
            //leftIcon={<ActionGrade />}
          />)
      }
    }
    var foodicon = this.props.menu ? this.props.menu[key] ? 'image/fk/'+this.props.menu[key].image+'.jpg': null :null
      return (

             <ListItem
               key = {key}
              primaryText={this.props.menu ? this.props.menu[key] ? this.props.menu[key].name + ' * ' +amountstring : key:key}
              secondaryText={<span><p>NT.{item.price}</p>{storetype=='preorders' ? item.status == 'Queued' ? <p style={{color : "red"}}>製作中</p> : <p style={{color : "blue"}}>製作完成</p>  : null}</span>}
              //rightIcon={item.status == 'Queued' ? <p inline style={{color : "red"}}>製作中</p> : <p style={{color : "blue"}}>製作完成</p> }
              leftAvatar= {<Avatar src={foodicon} />}
              nestedItems={custom}
              />



      )

    }


    renderOrderItem(key,item ,storetype){

      var time = new Date()
      time = item.createdAt ? new Date(item.createdAt) : null

      var timestring = new String()

       time ? timestring = time.toLocaleString() :null
      //timestring = '訂單日期 : ' + (time ? time.getFullYear(time).toString() +'年' + (time.getMonth(time)+1).toString() +'月' + time.getDate(time).toString() + '日'+ '  ' + time.getHours(time).toString()
      //+ ':' +time.getMinutes(time).toString()+ ':' +time.getSeconds(time).toString() : '0')

      return (

        <Card key={key}>


          <CardHeader
            title={ timestring }
            subtitle={item.status}
            actAsExpander={true}
            showExpandableButton={true}
          >
          {storetype=='preorders' ? item.checked=='Payed'? <p style={{color : "blue"}}> 已付款,付款編號:{item.serial} </p> : <p style={{color : "red"}}> 尚未付款,付款編號:{item.serial} </p> :null}
          {
            item.status!='Completed'?
           ((item.queuetime>=0)&&(item.coffeemaketime>=0)&&(item.foodmaketime>=0)) ?
            <p style={{color : "green"}}> {item.type==='eathere'?`內用第${item.table}桌,`: `外帶,`}預計取餐時間:約{(item.coffeemaketime>item.foodmaketime) ?
            Math.floor((item.queuetime+item.coffeemaketime)/60):Math.floor((item.queuetime+item.foodmaketime)/60)} 分</p>
            : <p style={{color : "green"}}> 預計取餐時間: 請先付款後餐點開始製作,謝謝!</p>
            : storetype=='preorders' ? <p style={{color : "green"}}> 您的餐點已經準備好了,請至櫃台取餐 </p> :  <p style={{color : "green"}}> 已取餐 </p>
          }
          <p> NT.{item.total_price} </p>
        </CardHeader>
          <CardActions>
            {(item.checked==='Nonpay'&&item.status==='Queued')?
            <Button className={this.props.classes.cardbutton} raised color="primary"  onClick= {()=>this.handlecanceldialogOpen(item.createdAt)}>
              取消訂單
            </Button>
            :null
            }

          </CardActions>
          <CardText expandable={true}>

           <List>

            {item.order_list ? Object.keys(item.order_list).map( key => this.renderOrderList(key, item.order_list[key] , storetype)) :<h1>No Data</h1> }
           </List>

          </CardText>
        </Card>

      )

    }


  render() {
    const { menu, preorders,orders } = this.props;
    //var sortedorder = this.props.orders
    //console.log(preorders)
    return (
     <div>
       <Card initiallyExpanded = {true} key="queue">

         <CardHeader
           title={<h1>處理中訂單</h1>}

           actAsExpander={true}
           showExpandableButton={true}
         />
       <CardText expandable={true}>

      { this.props.preorders
        ? Object.keys(preorders).reverse().map( key =>this.renderOrderItem(key, preorders[key] , 'preorders' )  )
        : <p>目前沒有訂單,來去點一杯吧!</p> }
       </CardText>
       <Dialog open={this.state.canceldialogopen} onRequestClose={this.handlecanceldialogClose}>
         <DialogTitle>{"刪除訂單"}</DialogTitle>
         <DialogContent>
           <DialogContentText>
             請問您確定要刪除此筆訂單嗎?
           </DialogContentText>
         </DialogContent>
         <DialogActions>
           <Button onClick={()=> { this.setState({sending:true}); this.handlecancelorder(this.state.cancelcreatedAt)}} disabled = {this.state.sending}  raised color="primary">
             確定
           </Button>
           <Button onClick={this.handlecanceldialogClose} disabled = {this.state.sending} raised autoFocus>
             取消
           </Button>
         </DialogActions>
       </Dialog>

        </Card>


        <Card key="done">

          <CardHeader
            title={<h1>歷史訂單</h1>}

            actAsExpander={true}
            showExpandableButton={true}
          />
        <CardActions>
        </CardActions>
        <CardText expandable={true}>

          { this.props.orders
            ?Object.keys(orders).reverse().map( key => ( this.renderOrderItem(key, orders[key] ,'orders' ) ))
            : <p>無歷史訂單</p> }
        </CardText>
         </Card>

     </div>


    )
  }
}


Getorders.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Getorders);
