import React from 'react'
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
import TextField from 'material-ui/TextField'
import {List, ListItem} from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
// const populates = [
//   { child: 'owner', root: 'users', keyProp: 'key' }
// ]
@UserIsAuthenticated // redirect to /login if user is not authenticated
@firebaseConnect( [ '/orders' , '/menu' ])
@connect(
  ({firebase}) => ({
    account: pathToJS(firebase, 'profile'),
    orders: dataToJS(firebase, 'orders'),
    menu: dataToJS(firebase, 'menu'),

  })
)
export default class Favorite extends React.Component {
  //var BMIstandard={ "過輕": 18.5 , "正常" : 24 , "過重" : 27  }
  //state = {  caffine: this.calCaf(this.props.account.age,this.props.account.weight)}


  renderMenuList (key, menuitem) {
      var foodicon = menuitem ? 'image/fk/' + menuitem.image + '.jpg' : null

      var nutrition_facts = menuitem.nutrition_facts? menuitem.nutrition_facts : null

      if ((nutrition_facts? nutrition_facts.caffeine ?nutrition_facts.caffeine :null:null) == null ) return ;
      if ((nutrition_facts ? nutrition_facts.caffeine ?nutrition_facts.caffeine :null:null) > (this.props.account?this.calCaf(this.props.account.age,this.props.account.weight):null) ) return null;
      var purchaseprice = '咖啡因 : '  + nutrition_facts.caffeine
      return (

        <div >

          <ListItem
             key= {key}
             primaryText={ menuitem.name ? menuitem.name : key}
             secondaryText={purchaseprice}
             leftAvatar= {<Avatar src={foodicon} />}
             style={{'width':'50%'}}
          />


  </div>
    )

  }

  calCaf(age,weight){
    // const BMIstandard={ "過輕": 18.5 , "正常" : 24 , "過重" : 27  , "輕度肥胖" : 30 ,"中度肥胖" : 35}
     if(age < 18) return 2.6*weight
     else  return 6*weight
  }

  calCal(bmi,weight){
    // const BMIstandard={ "過輕": 18.5 , "正常" : 24 , "過重" : 27  , "輕度肥胖" : 30 ,"中度肥胖" : 35}
     if(bmi < 18.5) return 35*weight
     else if (bmi >= 18.5 && bmi < 24 ) return 30*weight
     else if (bmi >= 24 && bmi < 27) return 25*weight
     else if (bmi >= 27 && bmi < 30) return 23*weight
     else if (bmi >= 30 && bmi < 35) return 21*weight
     else return 20*weight
  }
  calBMI(bmi){
    // const BMIstandard={ "過輕": 18.5 , "正常" : 24 , "過重" : 27  , "輕度肥胖" : 30 ,"中度肥胖" : 35}
     if(bmi < 18.5) return "過輕"
     else if (bmi >= 18.5 && bmi < 24 ) return "正常"
     else if (bmi >= 24 && bmi < 27) return "過重"
     else if (bmi >= 27 && bmi < 30) return "輕度肥胖"
     else if (bmi >= 30 && bmi < 35) return "中度肥胖"
     else return "你超肥"
  }
  calDisease(age){
    // const BMIstandard={ "過輕": 18.5 , "正常" : 24 , "過重" : 27  , "輕度肥胖" : 30 ,"中度肥胖" : 35}
     if(age < 18) return "先天性疾病,蛀牙,避免刺激性食物"
     else if (age >= 18 && age < 55 ) return "貧血,偏頭痛,肝炎,結締組織疾病,繼發性高血壓,先天性腦血管疾病"
     else return "老人癡呆症、良性前列腺增生症、白內障、糖尿病、退化性關節炎、心臟病、高血壓、骨質疏鬆症、柏金森症、中風"
  }

  countorderamount(orderamount , orders){

    Object.keys(orders.order_list).map( key => {  orderamount[key] += orders.order_list[key] })

  }



  render() {

    const { account ,menu , orders }= this.props
    var orderamount = new Object()
    menu ? Object.keys(menu).map( menu ? key =>  { orderamount[key] = 0 } : null ) :null
      orders
      ? Object.keys(orders).sort(function (a, b) {return orders[b].orderTime > orders[a].orderTime ? 1 : -1;}).map( key => ( orders[key].status != 'Deleted' && orders[key].user_email == this.props.authData.email) ? this.countorderamount( orderamount ,orders[key]) : null )
      : null


    return (

      <div>
        <span>{'體重:  '}</span>
        <TextField
         id="text-field-controlled"
         value={account?account.weight:"Loading..."}
         onChange={this.handleChange}
       />
     <br/>
     <span>{'身高:  '}</span>
     <TextField
      id="text-field-controlled"
      value={account?account.height:"Loading..."}
      onChange={this.handleChange}
    />
     <span>{'  BMI:  '}</span> <span>{account?(account.weight/((account.height/100)*(account.height/100))).toFixed(1):"Loading..."}</span>
     <span>{'  屬:  '}</span> <span>{account?this.calBMI((account.weight/((account.height/100)*(account.height/100))).toFixed(1)):"Loading..."}</span>
     <br/>
     <br/>
     <span>{'  年齡為:  '}</span> <span>{account?account.age:"Loading..."}</span>
     <br/>
     <br/>
     <br/>
     <span>{'  職業為:  '}</span> <span>{account?account.career:"Loading..."}</span>
      <span>{'  屬:  '}</span> <span>{account?"輕度工作者":"Loading..."}</span>
      <br/>
      <br/>
     <span>{'  擁有疾病: 無 '}</span>
     <br/>
     <br/>
     <span>{'  可能有的疾病:  '}</span> <span>{account?this.calDisease(account.age):"Loading..."}</span>

      <br/>
      <br/>
      <br/>

    <span>{' 血壓 : 無    心跳: 無'}</span>
      <br/>
      <br/>
      <br/>
       <span>{'  每日建議攝取熱量 :  '}</span> <span>{account?this.calCal((account.weight/((account.height/100)*(account.height/100))).toFixed(1),account.weight):"Loading..."}</span>
       <br/>
       <span>{'  建議攝取咖啡因量 :  '}</span> <span>{account?this.calCaf(account.age,account.weight):"Loading..."}</span>
       <br/>
       <br/>
       <br/>
       <span>{'  個人偏好口味 : '}</span>   <span>{(orderamount&&menu) ? Object.keys(orderamount).map(key =>{if(orderamount[key] !=0) return menu[key].name+orderamount[key] } ) :null}</span>     <span>{'  族群偏好口味 : 無 '}</span>
       <br/>
       <br/>
       <br/>
       <span>{'  推薦食物 :  '}</span>

       <List>
            {menu ? Object.keys(menu ).map( key => this.renderMenuList(key, menu [key] )) :<h1>Loading...</h1> }
           </List>


      </div>




    );
  }
}
