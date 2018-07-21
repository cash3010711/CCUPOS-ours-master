import React, {PropTypes} from 'react'
import { connect } from 'react-redux'
import {
  firebaseConnect,
  isLoaded,
  pathToJS,
  dataToJS,
  // orderedToJS,
  // populatedDataToJS
} from 'react-redux-firebase'
import { UserIsAuthenticated } from 'utils/router'
import style from 'styles/sidebar'
import { clearCart } from 'store/cartActions'
import { Card } from 'material-ui/Card';
import Divider from 'material-ui/Divider';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import FlatButton from 'material-ui/FlatButton';
import FontIcon from 'material-ui/FontIcon';
import { getFirebase } from 'react-redux-firebase';
import { browserHistory } from 'react-router'
import {List, ListItem} from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import classes from './CartContainer.scss'
import NumericInput from 'react-numeric-input';
import Notifications from 'react-notification-system-redux';
// const populates = [
//   { child: 'owner', root: 'users', keyProp: 'key' }
// ]
//
var  purchaselist= new Object()


@UserIsAuthenticated // redirect to /login if user is not authenticated
@firebaseConnect(
  { path: '/menu', type: 'once' }
)
@connect(
  ({firebase}) => ({
  menu: dataToJS(firebase, 'menu'),
  })
)
export default class Cart extends React.Component {


  constructor(props) {
      super(props);
      this.state = {purchase_total_price: 0};
    }
/*處理進貨送出事件*/

handleSubmit(){

  for (var Key in purchaselist){
    if (purchaselist[Key] == (null || 0)  ){
        delete purchaselist[Key];
    }
}

if( Object.keys(purchaselist).length === 0 ) {
  const notice ={
    title: "進貨錯誤",
    message: "無進貨數量,請確認",

    position: "tr",
    autoDismiss: 5

  }
  this.props.dispatch( Notifications.error(notice));
}
else{

  const notice ={
    title: "進貨成功",
    message: "進貨資料已送出",
    position: "tr",
    autoDismiss: 5

  }
  this.props.dispatch( Notifications.success(notice));

const submit = { purchase_list : purchaselist  , purchase_Time: Date() }
getFirebase().push('/purchase', submit ).then(() => browserHistory.replace('/'))
purchaselist={}

}

}


    handlepurchaseinput = (key, event) => {
      purchaselist[key]= event
      this.setState({purchase_total_price : Object.keys(purchaselist).reduce((previous , item )=> previous + this.props.menu[item].purchase_price*purchaselist[item], 0) })
    };

   renderMenuList (key, menuitem) {
    var foodicon = menuitem ? 'image/fk/' + menuitem.image + '.jpg' : null
    var purchaseprice = '進貨成本 : ' + 'NT.' + menuitem.purchase_price
    purchaselist[key] ? null : purchaselist[key] = 0

    return (
      <div >

        <ListItem
           key= {key}
           primaryText={ menuitem.name ? menuitem.name : key}
           secondaryText={purchaseprice}
           leftAvatar= {<Avatar src={foodicon} />}
           style={{'width':'50%'}}
        />

        <NumericInput
          key= {menuitem.name}
          mobile={true}
          min={0}
          value={purchaselist[key]}
          onChange = { this.handlepurchaseinput.bind(this,key)}
          step={1}
          style={style.numericinput()} />

</div>
  )

}
  render() {
    const { menu } = this.props;
    return (
     <div className = {classes.container}>
      <List>
       {this.props.menu ? Object.keys(this.props.menu ).map( key => this.renderMenuList(key, this.props.menu [key] )) :<h1>Loading...</h1> }
      </List>
      <List>
        <span>{'進貨總金額 :  '}</span>
        <span>{this.state.purchase_total_price}</span>
        <br/>
      <FlatButton label="送出"  onClick={()=>this.handleSubmit(purchaselist)} primary={true} icon={<FontIcon className="fa fa-shopping-cart"/>}/>
      </List>
     </div>
    );
  }
}
