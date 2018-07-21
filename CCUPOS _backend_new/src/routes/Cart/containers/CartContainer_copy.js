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
import style from 'styles/sidebar'
import { clearCart } from 'store/cartActions'
import { Card } from 'material-ui/Card'
import Divider from 'material-ui/Divider'
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table'
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton'
import FlatButton from 'material-ui/FlatButton'
import FontIcon from 'material-ui/FontIcon'
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

import {
  SortingState, EditingState, PagingState,
  LocalPaging, LocalSorting,
  ColumnOrderState,
} from '@devexpress/dx-react-grid';
import {
  Grid,
  TableView, TableHeaderRow, TableEditRow, TableEditColumn,
  PagingPanel, DragDropContext,
} from '@devexpress/dx-react-grid-material-ui';
import {
  TableCell,
  Button,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  MenuItem,
  Input,
  Select,
} from 'material-ui-next';

import DeleteIcon from 'material-ui-icons/Delete';
import EditIcon from 'material-ui-icons/Edit';
import SaveIcon from 'material-ui-icons/Save';
import CancelIcon from 'material-ui-icons/Cancel';
import { changeToCart, removeFromCart } from 'store/cartActions'

const styles = theme => ({
  commandButton: {
    minWidth: '15px',
  },
  lookupEditCell: {
    verticalAlign: 'top',
    paddingRight: theme.spacing.unit,
    paddingTop: theme.spacing.unit * 1,
    '& ~ $lookupEditCell': {
      paddingLeft: theme.spacing.unit,
    },
  },
  dialog: {
    width: 'calc(100% - 16px)',
  },
  inputRoot: {
    width: '100%',
  }
});

const commandTemplates = {
  edit: onClick => (
    <IconButton onClick={onClick} style={{width: '15px' , height: '15px'}} title="Edit row">
      <EditIcon />
    </IconButton>
  ),
  delete: onClick => (
    <IconButton onClick={onClick} style={{width: '15px' , height: '15px'}} title="Delete row">
      <DeleteIcon />
    </IconButton>
  ),
  commit: onClick => (
    <IconButton onClick={onClick} style={{width: '15px' , height: '15px'}} title="Save changes">
      <SaveIcon />
    </IconButton>
  ),
  cancel: onClick => (
    <IconButton color="accent" style={{width: '15px' , height: '15px'}} onClick={onClick} title="Cancel changes">
      <CancelIcon />
    </IconButton>
  ),
};

const LookupEditCellBase = (({
  value, onValueChange, availableValues, classes,
}) => (
  <TableCell
    className={classes.lookupEditCell}
  >
    <Select
      value={value}
      onChange={event => onValueChange(event.target.value)}
      input={<Input classes={{ root: classes.inputRoot }} />}
    >
      {availableValues.map(item => (
        <MenuItem key={item} value={item}>{item}</MenuItem>
      ))}
    </Select>
  </TableCell>
));
LookupEditCellBase.propTypes = {
  value: PropTypes.any,
  onValueChange: PropTypes.func.isRequired,
  availableValues: PropTypes.array.isRequired,
  classes: PropTypes.object.isRequired,
};
LookupEditCellBase.defaultProps = {
  value: undefined,
};

export const LookupEditCell = withStyles(styles)(LookupEditCellBase);

const getRowId = row => row.id;

// To add to window
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

  constructor(props) {
  super(props);
  this.state = {
   finished: false,
   stepIndex: 0,
   type : null,
   sending : false,
   columns: [
        { name: 'productname', title: '產品名稱' },
        { name: 'amount', title: '數量'},

        { name: 'price', title: '價格' },
      ],
      rows: [{productname:1, amount:1, price:1}],
      sorting: [],
      editingRows: [],
      changedRows: {},
      deletingRows: [],
      columnOrder: ['productname', 'amount', 'price'],
    };

    if(this.props.cart){
      var productlist=[];
      Object.keys(this.props.cart).map(item=> {
        var product = new Object()
        product.id = item
        product.productname=this.props.menu[item].name
        product.amount = this.props.cart[item].count
        product.price = this.props.menu[item].price * this.props.cart[item].count
        productlist.push(product)
     })
     Promise.all(productlist).then((productlistResults)=>{
       //console.log( productlist)
       this.setState({ rows:productlist })
      });
    }

    this.changeSorting = sorting => this.setState({ sorting });
    this.changeEditingRows = editingRows => this.setState({ editingRows });

    this.changeChangedRows = changedRows => this.setState({ changedRows });
    //this.changePageSize = pageSize => this.setState({ pageSize });
    this.commitChanges = ({ changed, deleted }) => {
      let { rows } = this.state;
      if (changed) {
        rows.map(row => {if(changed[row.id]) this.props.dispatch(changeToCart(row.id, changed[row.id].amount))})
        rows = rows.map(row => (changed[row.id] ? { ...row, ...changed[row.id] } : row));
      }
      //console.log(changed)

      this.setState({ rows, deletingRows: deleted || this.state.deletingRows });
    };
    this.cancelDelete = () => this.setState({ deletingRows: [] });
    this.deleteRows = () => {
      const rows = this.state.rows.slice();
      //console.log(this.state.deletingRows)
      this.props.dispatch(removeFromCart(this.state.deletingRows))
      this.state.deletingRows.forEach((rowId) => {
        //rows.map(row => {if(row.id === rowId) this.props.dispatch(changeToCart(rowID))})
        const index = rows.findIndex(row => row.id === rowId);
        if (index > -1) {
          rows.splice(index, 1);
        }
      });
      this.setState({ rows, deletingRows: [] });
    };
    this.changeColumnOrder = (order) => {
      this.setState({ columnOrder: order });
    };

    this.editCellTemplate = ({ column, value, onValueChange }) => {
      const columnValues = [];
      for(let i=0;i<=20;i++) columnValues.push(i)
      if (column.name !== 'amount') {
      return (<TableCell>{value}</TableCell>);
    }
      if (column.name === 'amount') {
        return (
          <LookupEditCell
            column={column}
            value={value}
            onValueChange={onValueChange}
            availableValues={columnValues}
          />
        );
      }
      return undefined;
    };

    this.commandTemplate = ({ executeCommand, id }) => {
      const template = commandTemplates[id];
      if (template) {
        const allowAdding = false;
        const onClick = (e) => {
          executeCommand();
          e.stopPropagation();
        };
        return template(
          onClick,
          allowAdding,
        );
      }
      return undefined;
    };

  }


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

   const {
     classes,
   } = this.props;
   const {
     rows,
     columns,
     sorting,
     editingRows,
     changedRows,
     deletingRows,
     columnOrder,
   } = this.state;

   switch (stepIndex) {
     case 0:
       return (

         <div>
       <Grid
         rows={rows}
         columns={columns}
         getRowId={getRowId}
       >
         <ColumnOrderState
           order={columnOrder}
           onOrderChange={this.changeColumnOrder}
         />

         <SortingState
           sorting={sorting}
           onSortingChange={this.changeSorting}
         />
         <LocalSorting />

         <EditingState
           editingRows={editingRows}
           onEditingRowsChange={this.changeEditingRows}
           changedRows={changedRows}
           onChangedRowsChange={this.changeChangedRows}
           onCommitChanges={this.commitChanges}
         />

         <DragDropContext />

         <TableView
           tableCellTemplate={this.tableCellTemplate}
           allowColumnReordering
         />

         <TableHeaderRow allowSorting allowDragging />
         <TableEditRow
           editCellTemplate={this.editCellTemplate}
         />

         <TableEditColumn
           width={60}
           //allowAdding
           allowEditing
           allowDeleting
           commandTemplate={this.commandTemplate}
         />
       </Grid>
       <Dialog
         open={!!deletingRows.length}
         onRequestClose={this.cancelDelete}
         classes={{ paper: classes.dialog }}
       >
         <DialogTitle>刪除餐點</DialogTitle>
         <DialogContent>
           <DialogContentText>
             確認要刪除下列餐點嗎?
           </DialogContentText>
           <Grid
             rows={rows.filter(row => deletingRows.indexOf(row.id) > -1)}
             columns={columns}
           >
             <TableView
               tableCellTemplate={this.tableCellTemplate}
             />
             <TableHeaderRow />
           </Grid>
         </DialogContent>
         <DialogActions>
           <Button onClick={this.cancelDelete} color="primary">取消</Button>
           <Button onClick={this.deleteRows} color="accent">確認</Button>
         </DialogActions>
       </Dialog>
       <br/>
       <br/>
     </div>


       )
       //<FlatButton label="送出菜單" onClick={()=>this.handleSubmit()} primary={true} icon={<FontIcon className="fa fa-shopping-cart"/>}/>
     case 1:
       return '選擇座位';
     case 2:
       return '確認付款方式';
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
  if(/*this.state.type===null||*/this.calcuTotal()===0){
    const notice ={
      title: "提交錯誤",
      message: "請確認是否有進行點餐，以及選擇內用或外帶",
      position: "tr",
      autoDismiss: 5
    }
      this.props.dispatch( Notifications.error(notice));
      return false
  }
  return true

}

handleSubmit(){
  const order = {

    total_price: this.calcuTotal(),
    createdBy: this.props.authData.uid,
    order_list: this.props.cart,
    type: this.state.type,
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
        this.props.dispatch( Notifications.success({
          title: "點餐成功",
          message: "訂單傳送成功,請稍後",
          level: "success",
          position: "tr"
        }))
        this.props.dispatch(clearCart())

        browserHistory.replace('/order')
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
    message: "訂單傳送失敗,請檢察網路或伺服器狀態",
    level: "error",
    position: "tr"
  }))
  console.log('There has been a problem with your fetch operation: ' + error.message);
  this.setState({sending:false})
})

  }
}
calcuTotal(){

  return  Object.keys(this.props.cart).reduce((pre, item)=> this.props.menu[item] ? pre+this.props.menu[item].price*this.props.cart[item].count : 0, 0)
}


  render() {
    //console.log(this.props)
  //this.props.cart?  console.log(this.props.cart.combine):console.log("123")
    const {finished, stepIndex} = this.state;
    const contentStyle = {margin: '0 16px'};

    return (
      <div style={{'backgroundColor':'#fff9e6', width: '100%', maxWidth: 700, margin: 'auto'}}>
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
                  disabled = {this.state.sending}
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
