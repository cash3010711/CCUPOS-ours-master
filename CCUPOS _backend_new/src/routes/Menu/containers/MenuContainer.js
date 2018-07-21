import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import {
  firebaseConnect,
  pathToJS,
  dataToJS,

  // orderedToJS,
  // populatedDataToJS
} from 'react-redux-firebase'
import { UserIsAuthenticated } from 'utils/router'
import {GridList, GridListTile, GridListTileBar} from 'material-ui-next/GridList'
//import { gridMenu } from 'styles/sidebar'
import { setCombineNumber } from 'store/billcombineActions'
//import cssclasses from './Menucontainers.scss'
//import MediaQuery from 'react-responsive'
import Menubuttonfiled from '../components/Menubuttonfiled'
import Waittime from '../components/Waittime'
import Dialog  , { DialogTitle, DialogContent }from 'material-ui-next/Dialog'
import Card, {CardHeader, CardActions, CardMedia, CardContent} from 'material-ui-next/Card'
import Button from 'material-ui-next/Button'
import Typography from 'material-ui-next/Typography'
import { withStyles } from 'material-ui-next/styles'
import equal from 'deep-equal'
import MenuItem from 'material-ui/MenuItem'
import IconButton from 'material-ui/IconButton'
import FlatButton from 'material-ui/FlatButton'
import SelectField from 'material-ui/SelectField'
import FontIcon from 'material-ui/FontIcon'
import { addToCart, addToCartCustom } from 'store/cartActions'
import Notifications from 'react-notification-system-redux'

import AppBar from 'material-ui-next/AppBar'
import Tabs, { Tab } from 'material-ui-next/Tabs';
import RestaurantMenu from 'material-ui-icons/RestaurantMenu';
import LocalCafe from 'material-ui-icons/LocalCafe';
import Cake from 'material-ui-icons/Cake';
import RoomService from 'material-ui-icons/RoomService';
//import {red500, yellow500, blue500} from 'material-ui/styles/colors';


const icedesciption = { 0:'微冰', 1 : '少冰' , 2: '正常冰'}
const sugardesciption = { 0:'微糖', 1 : '半糖' , 2: '正常糖'}
const count = [];
for (let i = 0; i < 20; i++ ) {
  count.push(<MenuItem value={i} key={i} primaryText={(i===0)?'0':i} />);
}

// const populates = [
//   { child: 'owner', root: 'users', keyProp: 'key' }
// ]
const styles = theme =>({
  root: {
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'space-around',
  overflow: 'hidden',
  background: theme.palette.background.paper,
},
gridList: {

  // omote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
   //transform: 'translate3d(0, 0, 0)',
   transform: 'translateZ(0)',
   WebkitTransform:'translate3d(0,0,0)',

   maxHeight: window.innerHeight-140
   //transform: 'translateZ(0)',
   //backfaceVisibility: 'hidden',
   //perspective: 3000
},
  card: {
    minWidth: 250,
    maxWidth: 700
  },
  media: {
    height: 270
  },
  controls: {
   paddingTop: theme.spacing.unit,
   paddingBottom: theme.spacing.unit,
 },
  cardbutton:{
   marginLeft: theme.spacing.unit,
   marginRight: theme.spacing.unit,
 },
  menudialog:{
    overflowX:'auto'
  },
  buydialog:{
    Width: 300,
    overflowX:'auto'
  },
  button: {
    margin: theme.spacing.unit,
  },
  leftIcon: {
    marginRight: theme.spacing.unit,
  },
  rightIcon: {
    marginLeft: theme.spacing.unit,
  }
}

)

//@UserIsAuthenticated // redirect to /login if user is not authenticated
/*connect to firebase first*/
@firebaseConnect([
   '/menu', // sync full list of todos
   '/pipeline'
  // { path: '/projects', type: 'once' } // for loading once instead of binding
  //{ path: 'todos', queryParams: ['limitToFirst=20'] } // limit to first 20
  // { path: 'todos', queryParams: ['limitToFirst=20'], populates } // populate
  // { path: 'todos', queryParams: ['orderByChild=text'] }, // list todos alphabetically
])

/*store the firebase data to redux*/
@connect(
  ({firebase,combine,cart}) => ({
  menu: dataToJS(firebase, 'menu'),
  pipeline: dataToJS(firebase, 'pipeline'),
  auth: pathToJS(firebase, 'auth'),
  combine : combine,
  cart : cart
  })
)
class Menu extends Component {

  constructor(props) {
        super(props);
        this.state = {
          menuopen: false,
          buyopen : false,
          item :null,
          key:null,
          wait : 0,
          count : 0 ,
          sugar:2,
          ice:2,
          slideIndex: "all"
        };
        //this.closedialog = this.closedialog.bind(this)
      }

  shouldComponentUpdate(nextProps, nextState) {

    return !(equal(this.props,nextProps) && equal(this.state,nextState))
       //return shallowCompare(this, nextProps, nextState);
     }
  /*
  closedialog(e) {
      this.setState({
           dialogopen: false
         })
       }
    */

  menuhandlebuyOpen = () => {

    this.setState({dialogopen: true, buyopen:true, menuopen : false });
  };

  handlemenuOpen = (keyin, itemin) => {
    this.setState({menuopen: true , item : itemin , key : keyin});
  };

  handlemenuClose = () => {
    this.setState({menuopen: false,  item :null ,key:null });
  };
  handlebuyOpen = (keyin,itemin) => {

        this.setState({buyopen: true, key:keyin, item:itemin});
        };
  handlebuyClose = () => {
        this.setState({buyopen: false,count :0 });
        };


  handleSugarChange = (event, index, sugar) => {this.setState({sugar})};
  handleIceChange = (event, index, ice) => {this.setState({ice})};
  handleCountChange = (event, index, count) => {this.setState({count})};
  handletabSilder =  (event, slideIndex) => {
    this.setState({ slideIndex });
  };


  renderMenuItem(key, item) {
    var itemcols = (item.name.length>6)? 2 : 1
    var itemcols = 1
    return (
      <GridListTile key={key}   cols={itemcols}>
        <img src={`/image/fk/${item.image}.jpg`} alt={item.name} onClick={ () => this.handlemenuOpen(key,item)}/>
        <GridListTileBar
              title= {<span style={{'fontSize':'15px'}}>{item.name}</span>}
              titlePosition ='top'

            />
        <GridListTileBar
              //title={<span style={{'fontSize':'20px'}}> {item.name}</span>}
              //subtitle={<span style={{'fontSize':'20px'}}>NT. {item.price}</span>}
              title= {<span style={{'fontSize':'15px'}}> NT. {item.price}</span>}
              actionIcon={
                <IconButton onClick={()=> {
                  this.handlebuyOpen(key,item)
                  }}
                  tooltip="加入購物車" tooltipPosition="top-center">
                  <FontIcon color={'#ffffff'} className="fa fa-cart-plus"/>
                </IconButton>
              }
            />
      </GridListTile>
    )
  }


  createCombine(){
   //console.log(this.props.combine)
   //var temp = "123456"
    fetch('https://us-central1-cloudcoffee-e23cb.cloudfunctions.net/combineorder', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({create : true , uid : this.props.auth.uid})
  }).then(response => {
        if(response.ok)
      {
        response.json().then(data => {
          //console.log(data.combinenumber);
          //console.log(data.combinenumber);
          if(data.combinenumber!=null || data.combinenumber != undefined)
          this.props.dispatch(setCombineNumber(data.combinenumber))
          //console.log(this.props.combine);
        })
      } else {
        console.log('Network response was not ok.');
      }
    })

  }
  static propTypes = {
      menu: PropTypes.object,
    }

  render() {
    const {classes, menu, pipeline, combine} = this.props;

    return (

      <div className={classes.root} >

        <AppBar position="absolute" color="default" style={{marginTop:65}}>
        <Tabs
          value={this.state.slideIndex}
          onChange={this.handletabSilder}
          fullWidth
          indicatorColor="accent"
          textColor="accent"
          centered
        >
            <Tab  value={"all"} label="全部" icon={<RestaurantMenu />} />
            <Tab  value={"drink"}  label="飲品" icon={<LocalCafe />} />
            <Tab  value={"dessert"} label="甜點" icon={<Cake />} />
            <Tab  value={"meal"} label="美食" icon={<RoomService />} />
        </Tabs>
          </AppBar>
                <GridList style={{marginTop:75}} cellHeight={(window.innerHeight-140)/2} className={classes.gridList}>
                  {menu
                    ? Object.keys(menu).sort((a, b) => { return menu[a].priority - menu[b].priority }).reduce((result, item) => {
                      if (menu[item].category != undefined && menu[item].visible){
                        if (this.state.slideIndex == "all")
                          result.push(this.renderMenuItem(item, menu[item]));
                        else if (menu[item].category == this.state.slideIndex)
                          result.push(this.renderMenuItem(item, menu[item]));
                        }
                      return result
                    }, [])
                    : <h1>Loading...</h1>}
                </GridList>



     <Dialog
      //title={this.state.item ? this.state.item.name : null }
      //actions={actions}
      //modal={false}
      open={this.state.buyopen}
      onRequestClose={this.handlebuyClose}
      //autoScrollBodyContent= {true}
      className={classes.buydialog}
    >
      <DialogTitle>{this.state.item?this.state.item.name:''}</DialogTitle>
      <DialogContent>
     <div style={{display: 'inline'}}>
       <SelectField
         floatingLabelText="數量"
         value={this.state.count}
         maxHeight={200}
         onChange={this.handleCountChange}
         fullWidth = {true}
         >
           {count}
         </SelectField>


     </div><br/>
     {(this.state.item?this.state.item.ice:false)?
     (<div style={{display: 'inline'}}>
       <SelectField
         floatingLabelText="糖度"
         value={this.state.sugar}
         onChange={this.handleSugarChange}
         fullWidth = {true}
         >
           <MenuItem value={0} primaryText={sugardesciption[0]} />
           <MenuItem value={1} primaryText={sugardesciption[1]} />
           <MenuItem value={2} primaryText={sugardesciption[2]}/>
         </SelectField>
         <br/>
     </div>)
     :null
   }
   {(this.state.item?this.state.item.sugar:false)?
   (<div style={{display: 'inline'}}>
       <SelectField
         floatingLabelText="冰塊"
         value={this.state.ice}
         onChange={this.handleIceChange}
         //fullWidth = {true}
         >
           <MenuItem value={0} primaryText={icedesciption[0]} />
           <MenuItem value={1} primaryText={icedesciption[1]} />
           <MenuItem value={2} primaryText={icedesciption[2]} />
         </SelectField>
         <br/>
     </div>)
     :null
     }
     <br/><br/>

     <center>
     <FlatButton label="關閉" onClick= {this.handlebuyClose} />
     <FlatButton label="購買" onClick= {()=> {
       if(this.state.count > 0){
         if(this.props.cart[this.state.key]?this.props.cart[this.state.key].count+this.state.count<=20:true){
       (this.state.item.sugar || this.state.item.ice)
       ?
       this.props.dispatch(addToCartCustom(this.state.key,this.state.count,this.state.sugar,this.state.ice))
       :
       this.props.dispatch(addToCart(this.state.key,this.state.count))
       this.props.dispatch( Notifications.success({
         title: "加入購物車成功",
         message:` ${this.state.item.name}  ${this.state.item.sugar?sugardesciption[this.state.sugar]:''} ${this.state.item.ice?icedesciption[this.state.ice]:''} * ${this.state.count} 加入購物車`,
         level: "success",
         position: "tr"
       }));
       this.setState( {count : 0,sugar:2,ice:2})
       this.handlebuyClose()
     }
     else{
       this.props.dispatch( Notifications.error({
         title: "加入購物車失敗",
         message:` 同樣商品最多訂購數量為20 `,

         position: "tr"
       }));
     }

    }
  }}
      />
    </center>
     </DialogContent>
    </Dialog>

        <Dialog
         //title={this.state.item ? this.state.item.name : null }
         //actions={actions}
         className={classes.menudialog}
         open={this.state.menuopen}
         onRequestClose={this.handlemenuClose}

       >
          {this.state.item?
         <Card className={classes.card}>

            <CardMedia
                    className={classes.media}
                    image={this.state.item.image  ?`/image/fk/${this.state.item.image}.jpg`:''}
                    title={this.state.item.name  ? this.state.item.name:''}
                  />
                  <CardHeader

                     title={this.state.item?this.state.item.name:''}
                     subheader={`NT.${this.state.item?this.state.item.price:''}`}
                  />

          <CardContent>

                   { (this.props.pipeline&&this.state.key) ?<Waittime pipeline={this.props.pipeline} keyname={this.state.key}/>:'Loading...'}
                   <br/>
                 <Typography component="p">
                   {this.state.item?this.state.item.description:''}
                 </Typography>
          </CardContent>

          <div className={classes.controls} >

           <center>
             <Button className={classes.cardbutton} raised color="primary" onClick= {this.menuhandlebuyOpen}>
            購買
           </Button>
            <Button className={classes.cardbutton} raised color="primary" onClick= {this.handlemenuClose}>
            關閉
          </Button>
          </center>


          </div>

          </Card>
        :null
        }
       </Dialog>


      </div>

    )
  }
}

Menu.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Menu);

/*

  <RaisedButton
    label="創建合單"
    labelPosition="before"
    onClick = {()=>this.createCombine()}
    containerElement="label"
      disabled = {combine.combine}
  >
  </RaisedButton>

  {combine.combine == false?
  <RaisedButton
    label="加入合單"
    labelPosition="before"
    onClick = {()=>this.createCombine()}
    containerElement="label"
    disabled = {combine.combine}
  >
  </RaisedButton>

  :
  <RaisedButton
    label="取消合單"
    labelPosition="before"
  containerElement="label"
  disabled = {!combine.combine}
  >
  </RaisedButton>
  }

 */
/*
<CardTitle title= {this.props.time ?<Waittime time={this.props.time}/>:'Loading...'}/>

<CardText>
  <p > {this.state.item ? this.state.item.introduction : null } </p>
  </CardText>
  <CardActions>
    <center><FlatButton label="關閉" onClick= {this.handleClose} /> </center>
    </CardActions>
*/
