import React from 'react'
import { connect } from 'react-redux'
import {
  firebaseConnect,
  isLoaded,
  pathToJS,
  dataToJS,
  getFirebase
  // orderedToJS,
  // populatedDataToJS
} from 'react-redux-firebase'
import { UserIsAuthenticated } from 'utils/router'
import TextField from 'material-ui/TextField'
import {List, ListItem} from 'material-ui/List'
import Avatar from 'material-ui/Avatar'
import {
  Step,
  Stepper,
  StepLabel,
  StepContent,
} from 'material-ui/Stepper'
import RaisedButton from 'material-ui/RaisedButton'
import FlatButton from 'material-ui/FlatButton'
import Checkbox from 'material-ui/Checkbox';
// const populates = [
//   { child: 'owner', root: 'users', keyProp: 'key' }
// ]

@firebaseConnect( () => ([
  `/BloodPressure/${getFirebase().auth().currentUser.uid}#orderByChild=createdAt`,
  '/menu'
]))
@connect(
  ({firebase}) => ({
    account: pathToJS(firebase, 'profile'),
    menu: dataToJS(firebase, 'menu'),
    BloodPressure: dataToJS(firebase,   `/BloodPressure/${getFirebase().auth().currentUser.uid}`)
  })
)



export default class Heathrecommandation extends React.Component {
  //var BMIstandard={ "過輕": 18.5 , "正常" : 24 , "過重" : 27  }
  //state = {  caffine: this.calCaf(this.props.account.age,this.props.account.weight)}

  state = {
    finished: false,
    stepIndex: 0,
  };

  handleNext = () => {
    const {stepIndex} = this.state;
    this.setState({
      stepIndex: stepIndex + 1,
      finished: stepIndex >= 3,
    });
  };

  handlePrev = () => {
    const {stepIndex} = this.state;
    if (stepIndex > 0) {
      this.setState({stepIndex: stepIndex - 1});
    }
  };

  renderStepActions(step) {
    const {stepIndex} = this.state;

    return (
      <div style={{margin: '12px 0'}}>
        <RaisedButton
          label={stepIndex === 3 ? '完成' : '下一步'}
          disableTouchRipple={true}
          disableFocusRipple={true}
          primary={true}
          onClick={this.handleNext}
          style={{marginRight: 12}}
        />
        {step > 0 && (
          <FlatButton
            label="上一步"
            disabled={stepIndex === 0}
            disableTouchRipple={true}
            disableFocusRipple={true}
            onClick={this.handlePrev}
          />
        )}
      </div>
    );
  }


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


  personalinfomation(account){
    return (
   <div>
   <span>{'體重:  '}</span>
      <TextField
       id="text-field-weight"
       value={account?account.weight:"Loading..."}
       //onChange={this.handleChange}
     />
   <br/>
   <span>{'身高:  '}</span>
   <TextField
    id="text-field-height"
    value={account?account.height:"Loading..."}
    //onChange={this.handleChange}
  />
  <br/>
  <span>{'年齡:  '}</span>
  <TextField
   id="text-field-age"
   value={account?account.age:"Loading..."}
   //onChange={this.handleChange}
 />
 <br/>
 <span>{'職業:  '}</span>
 <TextField
  id="text-field-age"
  value={account?account.career:"Loading..."}
  //onChange={this.handleChange}
/>
</div>
  )


  }

  calBMI(bmi){
    // const BMIstandard={ "過輕": 18.5 , "正常" : 24 , "過重" : 27  , "輕度肥胖" : 30 ,"中度肥胖" : 35}
     var bmidescription = ''
     var suggestion =''
     if(bmi < 18.5) {bmidescription = "過輕"; suggestion = '嗯...有點過輕了呢...看來得要多吃點了'}
     else if (bmi >= 18.5 && bmi < 24 ){bmidescription =  "正常"; suggestion = '看來您身材維持得不錯呢...繼續維持!'}
     else if (bmi >= 24 && bmi < 27) {bmidescription =  "過重"; suggestion ='最近吃得有點多歐...該控制一下了'}
     else if (bmi >= 27 && bmi < 30) bmidescription =  "輕度肥胖"
     else if (bmi >= 30 && bmi < 35) bmidescription =  "中度肥胖"
     else bmidescription =  "你超肥"


     return (
       <div>
       <span>{'您的BMI為:  '}</span>
          <TextField
           id="text-field-bmi"
           value={bmi.toFixed(2)}

         />
       <br/>
      <h3>{'屬於:  ' + bmidescription + '  體型'}</h3>
      <h3>{suggestion}</h3>

       </div>
     )
  }

  calDisease(age){
    // const BMIstandard={ "過輕": 18.5 , "正常" : 24 , "過重" : 27  , "輕度肥胖" : 30 ,"中度肥胖" : 35}
     var disease = []
     var back =''
     if(age < 18) disease = ['先天性疾病','蛀牙','避免刺激性食物']
     else if (age >= 18 && age < 55 ) disease = ['貧血','偏頭痛','肝炎','結締組織疾病','繼發性高血壓','先天性腦血管疾病']
     else disease = ['老人癡呆症','良性前列腺增生症','白內障','糖尿病','退化性關節炎','心臟病','高血壓','骨質疏鬆症','柏金森症','中風']
     return disease.map((number) =>  <Checkbox
          key = {number}
          label={number}
          //style={styles.checkbox}
        />)

  }



  render() {

    const { account ,menu ,BloodPressure }= this.props
    const {finished, stepIndex} = this.state;
    //console.log(BloodPressure)


    return (
      <div style={{'backgroundColor':'#fff9e6',maxWidth: 380, margin: 'auto'}}>
        <Stepper activeStep={stepIndex} orientation="vertical">
          <Step>
            <StepLabel ><h1>歡迎使用健康推薦系統</h1></StepLabel>
            <StepContent>
              <h2>您好,系統將依照您的健康狀況推薦您適合的飲食</h2>
              <h3>首先先確認您的基本資訊</h3>
              {this.personalinfomation(account)}
              {this.renderStepActions(0)}
            </StepContent>
          </Step>
          <Step>
            <StepLabel><h1>計算您的BMI中...</h1></StepLabel>
            <StepContent>
              <h2>現在進行分析</h2>
              {account? this.calBMI((account.weight/((account.height/100)*(account.height/100)))):'Loading...'}
              {this.renderStepActions(1)}
            </StepContent>
          </Step>
          <Step>
            <StepLabel><h1>分析可能隱藏的疾病中...</h1></StepLabel>
            <StepContent>
              <h2>{'根據您的年齡:  ' + (account ?account.age:'Loading')  + '  分析'}</h2>
              <h3>請問您是否有下列疾病呢?</h3>
              {account? this.calDisease(account.age) : 'Loading...'}
              {this.renderStepActions(2)}
            </StepContent>
          </Step>
          <Step>
            <StepLabel><h1>根據血壓狀態分析中...</h1></StepLabel>
            <StepContent>
               <h2>{'分析中: '}</h2>
               <h2>{'脈搏: '}</h2>
               {this.props.BloodPressure?<p>{this.props.BloodPressure.Pulse} </p> : <p>Loading...</p>}
               <h2>{'舒張壓: '}</h2>
               {this.props.BloodPressure?<p>{this.props.BloodPressure.Diastolic} </p> : <p>Loading...</p>}
               <h2>{'收縮壓: '}</h2>
               {this.props.BloodPressure?<p>{this.props.BloodPressure.Systolic} </p> : <p>Loading...</p>}
              {this.renderStepActions(3)}
            </StepContent>
          </Step>
        </Stepper>
        {finished && (
          <p style={{margin: '20px 0', textAlign: 'center'}}>
            <a
              href="#"
              onClick={(event) => {
                event.preventDefault();
                this.setState({stepIndex: 0, finished: false});
              }}
            >
              重新開始
            </a>
          </p>
        )}
      </div>




    );
  }
}
