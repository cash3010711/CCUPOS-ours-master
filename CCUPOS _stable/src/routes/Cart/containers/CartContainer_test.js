import React, {  PropTypes } from 'react'
import { connect } from 'react-redux'
import {
  firebaseConnect,
  //isLoaded,
  pathToJS,
  dataToJS,
  //orderedToJS
  // orderedToJS,
  // populatedDataToJS
} from 'react-redux-firebase'
import { UserIsAuthenticated } from 'utils/router'

import { clearCart } from 'store/cartActions'

//import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table'

import FlatButton from 'material-ui/FlatButton'

import { browserHistory } from 'react-router'
import Notifications from 'react-notification-system-redux'
import {
  Step,
  Stepper,
  StepLabel,
} from 'material-ui/Stepper'
import RaisedButton from 'material-ui/RaisedButton'
import Promise from 'promise-polyfill'

import { withStyles } from 'material-ui-next/styles'
import { changeToCart, removeFromCart, changeToCartCustom, removeFromCartCustom } from 'store/cartActions'
import keycode from 'keycode';
import Table, {
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
} from 'material-ui-next/Table';
import Toolbar from 'material-ui-next/Toolbar';
import Typography from 'material-ui-next/Typography';
import Paper from 'material-ui-next/Paper';
import Checkbox from 'material-ui-next/Checkbox';
import IconButton from 'material-ui-next/IconButton';
import Tooltip from 'material-ui-next/Tooltip';
import DeleteIcon from 'material-ui-icons/Delete';
import Button from 'material-ui-next/Button'
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from 'material-ui-next/Dialog'
import classNames from 'classnames'
import Select from 'material-ui-next/Select'
import Radio, { RadioGroup } from 'material-ui-next/Radio';
import { FormLabel, FormControl, FormControlLabel } from 'material-ui-next/Form'


const columnminWidth = {name:85}
const columnmaxWidth = {count:90,price:90}
const columnData = [
  { id: 'name',  disablePadding: true, label: '商品名稱',minWidth:columnminWidth.name ,align:'left'},
  { id: 'count',  disablePadding: true, label: '數量' ,maxWidth:columnmaxWidth.count ,align:'left'},
  { id: 'price', disablePadding: true, label: '價錢(NTD)',maxWidth:columnmaxWidth.price ,align:'center' },
];
const icedesciption = { 0:'微冰', 1 : '少冰' , 2: '正常冰'}
const sugardesciption = { 0:'微糖', 1 : '半糖' , 2: '正常糖'}

class EnhancedTableHead extends React.Component {
  static propTypes = {
    numSelected: PropTypes.number.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    onSelectAllClick: PropTypes.func,
    order: PropTypes.string.isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
  };

  createSortHandler = property => event => {
    this.props.onRequestSort(event, property);
  };

  render() {
    const { onSelectAllClick, order, orderBy, numSelected, rowCount } = this.props;

    return (
      <TableHead>
        <TableRow>
            {onSelectAllClick?
          <TableCell padding="checkbox">

            <Checkbox
              indeterminate={numSelected > 0 && numSelected < rowCount}
              checked={numSelected === rowCount}
              onChange={onSelectAllClick}
            />
            <p>勾選可刪除</p>
          </TableCell>
          :null
          }
          {columnData.map(column => {
            return (
              <TableCell
                key={column.id}
                //numeric={column.numeric}
                padding={(column.disablePadding&&(onSelectAllClick || !(column.id==='name'))) ? 'none' : 'default'}
                style={(column.minWidth&&column.maxWidth)?{ minWidth: column.minWidth,maxWidth:column.maxWidth,textAlign:column.align }:column.minWidth?{ minWidth: column.minWidth,textAlign:column.align}:column.maxWidth?{maxWidth:column.maxWidth,textAlign:column.align }:null}
              >
                <Tooltip
                  title="Sort"
                  placement= 'left'
                  enterDelay={300}
                >
                  <TableSortLabel
                    active={orderBy === column.id}
                    direction={order}
                    onClick={this.createSortHandler(column.id)}
                  >
                    <h2>{column.label}</h2>
                  </TableSortLabel>
                </Tooltip>
              </TableCell>
            );
          }, this)}
        </TableRow>
      </TableHead>
    );
  }
}


const toolbarStyles = theme => ({
  root: {
    paddingRight: 2,
  },
  highlight:
    theme.palette.type === 'light'
      ? {
          color: theme.palette.secondary.A700,
          backgroundColor: theme.palette.secondary.A100,
        }
      : {
          color: theme.palette.secondary.A100,
          backgroundColor: theme.palette.secondary.A700,
        },
  spacer: {
    flex: '1 1 100%',

  },
  actions: {
    color: theme.palette.text.secondary,
  },
  showtotalprice: {
    color: theme.palette.text.secondary,
         minWidth:100
  },
  title: {
    flex: '0 0 auto',

  },
});

let EnhancedTableToolbar = props => {
  const { numSelected, selected, classes, dispatch, removeSelect, total_price, data} = props;
  //console.log(cart)

  return (
    <Toolbar
      className={classNames(classes.root, {
        [classes.highlight]: numSelected > 0,
      })}
    >
      <div className={classes.title}>
        {numSelected > 0 ? (
          <Typography type="subheading">{numSelected} 樣餐點已被選擇</Typography>
        ) : (
          <Typography type="title">購買清單</Typography>
        )}
      </div>
      <div className={classes.spacer} />
        {numSelected > 0 ? (
          <div className={classes.actions}>
          <Tooltip title="Delete">
            <IconButton aria-label="Delete" onClick={()=>{Object.keys(selected).map( (key) => {
              var matchdata
              Object.keys(data).map((item)=>{if(data[item].id===selected[key]) matchdata=data[item]})
              //console.log(matchdata)

               if(matchdata.customcountkey){
                 dispatch(removeFromCartCustom(matchdata.originalname, matchdata.customcountkey));
               }
               else{
                dispatch(removeFromCart(selected[key]));
                }
                removeSelect();

                }
              )}}
           >
              <DeleteIcon />
            </IconButton>
          </Tooltip>
          </div>
        ) : (
          <div className={classes.showtotalprice} >
          <h2>總金額:<br/>{total_price}</h2>
          </div>
        )}

    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
  selected: PropTypes.array.isRequired,
  data: PropTypes.array.isRequired,
  dispatch: PropTypes.func.isRequired,
  removeSelect : PropTypes.func.isRequired,
  total_price : PropTypes.number.isRequired
};

EnhancedTableToolbar = withStyles(toolbarStyles)(EnhancedTableToolbar);

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    marginBottom: theme.spacing.unit * 3
  },
  table: {
    minWidth: 300
  },
  tableWrapper: {
    overflowX: 'auto'
  },
  formControl: {
  margin: theme.spacing.unit * 3,
  },
  group: {
  margin: `${theme.spacing.unit}px 0`,
  },

});

if (!window.Promise) {
  window.Promise = Promise
}

// const populates = [
//   { child: 'owner', root: 'users', keyProp: 'key' }
// ]
@UserIsAuthenticated // redirect to /login if user is not authenticated
@firebaseConnect()
@connect(
  ({firebase , cart}) => ({
  menu: dataToJS(firebase, 'menu'),
  cart : cart,
  auth: pathToJS(firebase, 'auth'),
  orders: pathToJS(firebase, 'profile/orders'),
  table :　dataToJS(firebase, 'menu')
  })
)
class Cart extends React.Component {

  constructor(props,context) {
  super(props,context);
  this.state = {
   finished: false,
   stepIndex: 0,
   type : 'eathere',
   sending : false,
   rows: [{productname:1, amount:1, price:1}],
   order: 'asc',
   orderBy: 'calories',
   selected: [],
   page: 0,
   rowsPerPage: 10,
   data: [ ],
   table : 0,
   serial: null
    };

    if(this.props.cart&&this.props.menu){
      var productlist=[];
      Object.keys(this.props.cart).map(item=> {
        var product = new Object()
        if(this.props.menu[item].ice||this.props.menu[item].sugar){
        for(let i=0;i<=2;i++)
          for(let j=0;j<=2;j++){
            if(this.props.cart[item][`count${i}${j}`] > 0){
              product = new Object()
              product.id = item+ `count${i}${j}`
              product.originalname = item
              product.name=this.props.menu[item].name+'_'+`${sugardesciption[i]} ${icedesciption[j]}`
              product.count = this.props.cart[item][`count${i}${j}`]
              product.price = this.props.menu[item].price * this.props.cart[item][`count${i}${j}`]
              product.customcountkey = `count${i}${j}`
              productlist.push(product)
            }
          }
        }
        else{
        product.id = item
        product.name=this.props.menu[item].name
        product.count = this.props.cart[item].count
        product.price = this.props.menu[item].price * this.props.cart[item].count
        productlist.push(product)
        }
     })
     Promise.all(productlist).then((productlistResults)=>{
       //console.log( productlist)
       this.setState({ data:productlist })
      });
    }

  }

  componentWillReceiveProps(nextProps){
      if(nextProps.cart||nextProps.menu){
        //console.log('change')
        var menu=nextProps.menu?nextProps.menu:this.props.menu

        var productlist=[];
        Object.keys(nextProps.cart).map(item=> {
          var product = new Object()
          if(menu[item].ice||menu[item].sugar){
          for(let i=0;i<=2;i++)
            for(let j=0;j<=2;j++){
              if(nextProps.cart[item][`count${i}${j}`] > 0){
                product = new Object()
                product.id = item+ `count${i}${j}`
                product.originalname = item
                product.name= menu[item].name+'_'+`${sugardesciption[i]} ${icedesciption[j]}`
                product.count = nextProps.cart[item][`count${i}${j}`]
                product.price = menu[item].price * nextProps.cart[item][`count${i}${j}`]
                product.customcountkey = `count${i}${j}`
                productlist.push(product)
              }
            }
          }
          else{
          product.id = item
          product.name=menu[item].name
          product.count = nextProps.cart[item].count
          product.price = menu[item].price * nextProps.cart[item].count
          productlist.push(product)
          }
       })
       Promise.all(productlist).then((productlistResults)=>{
         //console.log( productlist)
         this.setState({ data:productlist })
        });
      }
    }

  handleRequestSort = (event, property) => {
    const orderBy = property;
    let order = 'desc';

    if (this.state.orderBy === property && this.state.order === 'desc') {
      order = 'asc';
    }

    const data =
      order === 'desc'
        ? this.state.data.sort((a, b) => (b[orderBy] < a[orderBy] ? -1 : 1))
        : this.state.data.sort((a, b) => (a[orderBy] < b[orderBy] ? -1 : 1));

    this.setState({ data, order, orderBy });
  };

  handleSelectAllClick = (event, checked) => {
  if (checked) {
    this.setState({ selected: this.state.data.map(n => n.id) });
    return;
  }
  this.setState({ selected: [] });
};

handleKeyDown = (event, id) => {
  if (keycode(event) === 'space') {
    this.handleClick(event, id);
  }
};

handleClick = (event, id) => {
  const { selected } = this.state;
  const selectedIndex = selected.indexOf(id);
  let newSelected = [];

  //console.log(selected[0])
  if (selectedIndex === -1) {
    newSelected = newSelected.concat(selected, id);
  } else if (selectedIndex === 0) {
    newSelected = newSelected.concat(selected.slice(1));
  } else if (selectedIndex === selected.length - 1) {
    newSelected = newSelected.concat(selected.slice(0, -1));
  } else if (selectedIndex > 0) {
    newSelected = newSelected.concat(
      selected.slice(0, selectedIndex),
      selected.slice(selectedIndex + 1),
    );
  }

  this.setState({ selected: newSelected });
};

handleChangePage = (event, page) => {
  this.setState({ page });
};

handleChangeCount = (event, itemname) => {
//console.log(itemname)
  this.props.dispatch(changeToCart(itemname, parseInt(event.target.value) ))
  //this.setState({ page });
};
handleChangeCustomCount = (event, itemname, customcountkey) => {
//console.log(itemname)
  this.props.dispatch(changeToCartCustom(itemname, customcountkey, parseInt(event.target.value) ))
  //this.setState({ page });
};
handleChangeRowsPerPage = event => {
  this.setState({ rowsPerPage: event.target.value });
};

handleSelectAllRemove = ()=>{
  this.setState({selected:[]})

}

handleRadioGroupChange = (event, type) => {
  this.setState({ type });

};

handleTableChange = (event) => {

  this.setState({ table: parseInt(event.target.value)});

};

isSelected = id => this.state.selected.indexOf(id) !== -1;


 handleNext = () => {
   const {stepIndex} = this.state;
   if(this.checkcart())
   this.setState({
     stepIndex: stepIndex + 1,
     finished: stepIndex >= 2,
   });
 };

 handlePrev = () => {
   const {stepIndex} = this.state;
   if (stepIndex > 0) {
     this.setState({stepIndex: stepIndex - 1});
   }
 };


 getStepContent(stepIndex) {
    const { data, order, orderBy, selected, rowsPerPage, page } = this.state;
   const {classes} = this.props
   const selectcount= [],selecttable = []
   for(let i=1;i<=20;i++){selectcount.push(  <option key={i} value={i}>{i}</option>)}
   for(let i=0;i<=14;i++){selecttable.push( i===0? <option key={i} value={i}>尚未選擇</option> : <option key={i} value={i}>{i}</option>)}

   switch (stepIndex) {
     case 0:
       return (

         <Paper className={classes.root}>
                 <EnhancedTableToolbar
                   total_price={this.calcuTotal()}
                   numSelected={selected.length}
                   selected={selected}
                   removeSelect={this.handleSelectAllRemove}
                   dispatch={this.props.dispatch}
                   data={this.state.data}
                 />

                 <div className={classes.tableWrapper}>
                   <Table className={classes.table} >
                     <EnhancedTableHead
                       numSelected={selected.length}
                       order={order}
                       orderBy={orderBy}
                       onSelectAllClick={this.handleSelectAllClick}
                       onRequestSort={this.handleRequestSort}
                       rowCount={data.length}
                     />
                     <TableBody>
                       {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(n => {
                         const isSelected = this.isSelected(n.id);
                         return (
                           <TableRow
                             hover
                             //onClick={event => this.handleClick(event, n.id)}
                             onKeyDown={event => this.handleKeyDown(event, n.id)}
                             role="checkbox"
                             aria-checked={isSelected}
                             tabIndex={-1}
                             key={n.id}
                             selected={isSelected}

                           >
                             <TableCell padding="checkbox">
                               <Checkbox onClick={event => this.handleClick(event, n.id)} checked={isSelected} />
                             </TableCell>
                             <TableCell padding="none" style={{ minWidth: columnminWidth.name,textAlign:'left' }}>{n.name}</TableCell>
                             <TableCell padding="none" style={{ maxWidth: columnmaxWidth.count,textAlign:'left' }}>


                                  <Select
                                      native
                                      value={n.count}
                                      onChange={event => (!n.customcountkey)?this.handleChangeCount(event, n.id):this.handleChangeCustomCount(event, n.originalname, n.customcountkey)}
                                      //input={<Input id={`item-count-${n}`} />}
                                  >
                                  {selectcount}
                                  </Select>


                              </TableCell>
                             <TableCell padding="none"  style={{ maxWidth:columnmaxWidth.price ,textAlign:'center'}}>{n.price}</TableCell>
                           </TableRow>
                         );
                       })}
                     </TableBody>
                     <TableFooter>
                       <TableRow>
                         <TablePagination
                           count={data.length}
                           rowsPerPage={rowsPerPage}
                           page={page}
                           onChangePage={this.handleChangePage}
                           onChangeRowsPerPage={this.handleChangeRowsPerPage}
                         />
                       </TableRow>
                     </TableFooter>
                   </Table>
                 </div>

               </Paper>

       )
       //<FlatButton label="送出菜單" onClick={()=>this.handleSubmit()} primary={true} icon={<FontIcon className="fa fa-shopping-cart"/>}/>
     case 1:
       return (
         <Paper className={classes.root}>
           <FormControl component="fieldset" required className={classes.formControl}>
              <FormLabel component="legend">請選擇用餐類型</FormLabel>
              <RadioGroup
                aria-label="gender"
                name="gender1"
                className={classes.group}
                value={this.state.type}
                onChange={this.handleRadioGroupChange}
              >
                <FormControlLabel value="eathere" control={<Radio />} label="內用" />
                <FormControlLabel value="takeout" control={<Radio />} label="外帶" />
              </RadioGroup>
              {this.state.type==='eathere'?
              <div>
              <FormLabel component="legend">請選擇內用桌號</FormLabel>
              <br/>
              <Select
                  native
                  value={this.state.table}
                  onChange={this.handleTableChange}
                  //input={<Input id={`item-count-${n}`} />}
              >
              {selecttable}
              </Select>
              <br/>
              {this.state.table!=0?  <p>您選擇內用第{this.state.table}桌 , 請按下一步確認訂單內容</p>:null}
            </div>
              :
              <p>您選擇外帶,請按下一步確認訂單內容</p>
              }
            </FormControl>
         </Paper>

       );
     case 2:
       return (
         <Paper className={classes.root}>


                 <div className={classes.tableWrapper}>
                   <Table className={classes.table} >
                     <EnhancedTableHead
                       numSelected={selected.length}
                       order={order}
                       orderBy={orderBy}
                       //onSelectAllClick={this.handleSelectAllClick}
                       onRequestSort={this.handleRequestSort}
                       rowCount={data.length}
                     />
                     <TableBody>
                       {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(n => {
                         const isSelected = this.isSelected(n.id);
                         return (
                           <TableRow
                             hover
                             //onClick={event => this.handleClick(event, n.id)}
                             onKeyDown={event => this.handleKeyDown(event, n.id)}
                             role="checkbox"
                             aria-checked={isSelected}
                             tabIndex={-1}
                             key={n.id}
                             selected={isSelected}

                           >

                             <TableCell padding="default" style={{ minWidth: columnminWidth.name,textAlign:'left' }}>{n.name}</TableCell>
                             <TableCell padding="none" style={{ maxWidth: columnmaxWidth.count,textAlign:'left' }}>
                               {n.count}
                              </TableCell>
                             <TableCell padding="none"  style={{ maxWidth:columnmaxWidth.price ,textAlign:'center'}}>{n.price}</TableCell>
                           </TableRow>
                         );
                       })}
                     </TableBody>
                     <TableFooter>
                       <TableRow>
                         <TablePagination
                           count={data.length}
                           rowsPerPage={rowsPerPage}
                           page={page}
                           onChangePage={this.handleChangePage}
                           onChangeRowsPerPage={this.handleChangeRowsPerPage}
                         />
                       </TableRow>
                     </TableFooter>
                   </Table>
                 </div>

                 <Dialog open={this.state.serial ? true:false} /*onRequestClose={this.handlecanceldialogClose}*/>
                   <DialogTitle>{"付款資訊"}</DialogTitle>
                   <DialogContent>

                         <h2>您的付款編號為 {this.state.serial}</h2>
                         <h2>請至櫃台輸入付款編號並付款,謝謝</h2>

                   </DialogContent>
                   <DialogActions>
                     <Button onClick={()=>{this.setState({serial:null});browserHistory.replace('/order')}} color="primary"  raised autoFocus>
                       知道了
                     </Button>
                   </DialogActions>
                 </Dialog>

               </Paper>


     )
     default:
       return '你跑到奇怪的地方摟';
   }
 }



  renderRow(qty, key){
  return (
    this.props.menu[key]?
    <TableRow key={key}>
      <TableRowColumn>{this.props.menu[key].name}</TableRowColumn>
      <TableRowColumn>{qty}</TableRowColumn>
      <TableRowColumn>{this.props.menu[key].price*qty}</TableRowColumn>
    </TableRow>
    :''
  )
}

checkcart(){
  if(this.calcuTotal()===0){
    const notice ={
      title: "提交錯誤",
      message: "請確認是否有進行點餐",
      position: "tr",
      autoDismiss: 5
    }
      this.props.dispatch( Notifications.error(notice));
      return false
  }
  else if(this.state.stepIndex>0 ){
    if(this.state.type!=='eathere'&&this.state.type!=='takeout'){
      const notice ={
        title: "提交錯誤",
        message: "請確認是否有選擇內用或外帶",
        position: "tr",
        autoDismiss: 5
      }
        this.props.dispatch( Notifications.error(notice));
        return false
    }
    else if(this.state.type==='eathere' && this.state.table===0){
      const notice ={
        title: "提交錯誤",
        message: "內用請選擇桌號",
        position: "tr",
        autoDismiss: 5
      }
        this.props.dispatch( Notifications.error(notice));
        return false
    }
    else return true


  }
  else return true

}

handleSubmit(){
  const order = {

    total_price: this.calcuTotal(),
    createdBy: this.props.authData.uid,
    order_list: this.props.cart,
    type: this.state.type,
    table: this.state.table
    //orderTime: Date(),

  }
  //this.setState({sending:true})
  if(this.checkcart()){
    //this.props.dispatch(clearCart())
    //this.props.firebase.pushWithMeta(`${rfConfig.userProfile}/${this.props.auth.uid}/orders`, order)
    //var oid=this.props.firebase.pushWithMeta('/orders', order).then(() => browserHistory.replace('/order'))


  fetch('https://us-central1-cloudcoffee-e23cb.cloudfunctions.net/orderAdd', {
  method: 'POST',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(order)
}).then(response => {
      if(response.ok)
    {
      response.json().then(data => {
      //this.setState({serial: data.serial})
        this.props.dispatch( Notifications.success({
          title: "點餐成功",
          message: "訂單傳送成功,請稍後",
          level: "success",
          position: "tr"
        }))
        //this.props.dispatch(clearCart())

        //browserHistory.replace('/order')
      })
    } else {
      //console.log('Network response was not ok.');
      response.json().then(data => {
        if(data.error==='busy')
        this.props.dispatch( Notifications.error({
          title: "伺服器繁忙",
          message: "伺服器忙碌中,請再傳送一次",
          level: "error",
          position: "tr"
        }))
        else
        this.props.dispatch( Notifications.error({
          title: "伺服器回傳失敗",
          message: "訂單處理失敗,請再傳送一次",
          level: "error",
          position: "tr"
        }))
        this.setState({sending:false})
      })
    }
  })
.catch((error)=> {
  this.props.dispatch( Notifications.error({
    title: "伺服器連線失敗",
    message: "訂單傳送失敗,請檢察網路或伺服器狀態",
    level: "error",
    position: "tr"
  }))
  //console.log('There has been a problem with your fetch operation: ' + error.message);
  this.setState({sending:false})
})

  }
}

calcuTotal(){
  return Object.keys(this.props.cart).reduce((pre, item)=> pre+this.props.menu[item].price*this.props.cart[item].count, 0)
}


  render() {
    //console.log(this.props)
  //this.props.cart?  console.log(this.props.cart.combine):console.log("123")
    const {finished, stepIndex} = this.state;
    const contentStyle = {margin: '0 16px'};

    return (
      <div style={{'backgroundColor':'#fff9e6', width: '100%', maxWidth:800, margin: 'auto'}}>
        <Stepper activeStep={stepIndex}>
          <Step>
            <StepLabel>訂單資訊</StepLabel>
          </Step>
          <Step>
            <StepLabel>用餐資訊</StepLabel>
          </Step>
          <Step>
            <StepLabel>訂單確認</StepLabel>
          </Step>
        </Stepper>
        <div style={contentStyle}>
          {finished ? (
            <p>
              <a
                href="#"
                onClick={(event) => {
                  event.preventDefault();
                  this.setState({stepIndex: 0, finished: false});
                }}
              >
                Click here
              </a> to reset the example.
            </p>
          ) : (
            <div>
              {this.getStepContent(stepIndex)}
              <div >
                <center>
                <FlatButton
                  label="返回"
                  disabled={stepIndex === 0}
                  onClick={this.handlePrev}
                  style={{marginRight: 12}}
                />
                <RaisedButton
                  label={stepIndex === 2 ? '訂單送出' : '下一步'}
                  primary={true}
                  onClick={stepIndex === 2 ? ()=> {this.setState({sending:true}); this.handleSubmit() }:  this.handleNext}
                  //disabled = {this.state.sending}
                //  { stepIndex === 2 ? this.handleSubmit : this.handleNext}
                />
              </center>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

Cart.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Cart);
