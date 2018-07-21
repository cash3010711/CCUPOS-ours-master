import React, {Component, PropTypes} from 'react'
import MediaQuery from 'react-responsive';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
import TextField from 'material-ui/TextField';
import { addToCart,addToCartCustom } from 'store/cartActions'
import { connect } from 'react-redux'
import Notifications from 'react-notification-system-redux';
import Dialog , { DialogTitle, DialogContent } from 'material-ui-next/Dialog'
import FlatButton from 'material-ui/FlatButton'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import equal from 'deep-equal'
import { withStyles } from 'material-ui-next/styles'

const icedesciption = { 0:'微冰', 1 : '少冰' , 2: '正常冰'}
const sugardesciption = { 0:'微糖', 1 : '半糖' , 2: '正常糖'}
const count = [];
for (let i = 0; i < 20; i++ ) {
  count.push(<MenuItem value={i} key={i} primaryText={(i===0)?'0':i} />);
}

const styles = theme =>({

  dialog:{
    Width: 300,
    overflowX:'auto'
  }
}

)

@connect()
class Menubuttonfiled extends Component {



  static propTypes = {
      itemkey: PropTypes.string.isRequired,
      item: PropTypes.object.isRequired,
      dialogopen: PropTypes.bool.isRequired,
      closedialog:PropTypes.func.isRequired
  }

  constructor(props) {
      super(props);
      this.state = {count : 0 , sugar:2, ice:2, open:this.props.dialogopen};

    }

  componentWillReceiveProps(nextProps){
      if(nextProps.dialogopen===true)
      this.setState({open: nextProps.dialogopen});
    }

  shouldComponentUpdate(nextProps, nextState) {
      return !(equal(this.props,nextProps) && equal(this.state,nextState))
         //return shallowCompare(this, nextProps, nextState);
       }

  componentWillUnmount(){

    this.props.closedialog()
  }
  handleOpen = () => {

        this.setState({open: true});
        };

  handleClose = () => {
        this.setState({open: false});
        this.props.closedialog()
        };


  handleSugarChange = (event, index, sugar) => {this.setState({sugar})};
  handleIceChange = (event, index, ice) => {this.setState({ice})};
  handleCountChange = (event, index, count) => {this.setState({count})};
    render () {
        //console.log('render')
        const {classes, itemkey,item} = this.props

        return (


                  <div>

                  <IconButton onClick={()=> {
                   this.handleOpen()
                  }

                  }
                    tooltip="加入購物車" tooltipPosition="top-center">
                    <FontIcon color={'#ffffff'} className="fa fa-cart-plus"/>
                  </IconButton>
                  {this.state.open?
                  (
                  <Dialog
                   //title={this.state.item ? this.state.item.name : null }
                   //actions={actions}
                   //modal={false}
                   open={this.state.open}
                   onRequestClose={this.handleClose}
                   //autoScrollBodyContent= {true}
                   className={classes.dialog}
                 >
                   <DialogTitle>{item.name}</DialogTitle>
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
                  {item.ice?
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
                {item.sugar?
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
                  <FlatButton label="關閉" onClick= {this.handleClose} />
                  <FlatButton label="購買" onClick= {()=> {
                    if(this.state.count > 0){
                    (item.sugar || item.ice)
                    ?
                    this.props.dispatch(addToCartCustom(itemkey,this.state.count,this.state.sugar,this.state.ice))
                    :
                    this.props.dispatch(addToCart(itemkey,this.state.count))
                    this.props.dispatch( Notifications.success({
                      title: "訂單",
                      message:` ${item.name}  ${item.sugar?sugardesciption[this.state.sugar]:''} ${item.ice?icedesciption[this.state.ice]:''} * ${this.state.count} 加入購物車`,
                      level: "success",
                      position: "tr"
                    }));
                    this.setState( {count : 0,sugar:2,ice:2})
                    this.handleClose()
                  }}
                }
                   />
                 </center>
                  </DialogContent>
                 </Dialog>
               ):null
               }
                </div>

                )
    }
}


Menubuttonfiled.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Menubuttonfiled);
