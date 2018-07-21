import React, {Component, PropTypes} from 'react'
import { addToCart } from 'store/cartActions'
import { connect } from 'react-redux'
import Notifications from 'react-notification-system-redux'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'

const icedesciption = { 0:'正常冰', 1 : '少冰' , 2: '微冰'}
const sugardesciption = { 0:'正常糖', 1 : '少糖' , 2: '微糖'}
const count = []

for (let i = 0; i < 30; i++ ) {
  count.push(<MenuItem value={i} key={i} primaryText={(i===0)?'0':i} />);
}

@connect()
export default class Menubuttondialog extends Component {



  static propTypes = {
      itemkey: PropTypes.string.isRequired,
      item: PropTypes.object.isRequired,
      open: PropTypes.bool.isRequired,
      closedialog: PropTypes.func.isRequired,
  }

  constructor(props) {
        super(props);
        this.state = {count : 0 , sugar:0, ice:0, open: this.props.open};
      }

  componentWillReceiveProps(nextProps){
      this.setState({open: nextProps.open});
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

        const {size, itemkey,item} = this.props
        //console.log(this.props.item)
        return (
                  <div>

                  <Dialog
                   modal={false}
                   open={this.state.open}
                   onRequestClose={this.handleClose}
                   autoScrollBodyContent= {true}
                 >
                  <h1>{this.props.item.name}</h1>
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
                      <br/>
                  </div>


                  {this.props.item.ice?(this.props.item.ice===true)?
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
                  :null:null
                   }
                  {this.props.item.sugar?(this.props.item.sugar===true)?
                  (<div style={{display: 'inline'}}>
                    <SelectField
                      floatingLabelText="冰塊"
                      value={this.state.ice}
                      onChange={this.handleIceChange}
                      fullWidth = {true}
                      >
                        <MenuItem value={0} primaryText={icedesciption[0]} />
                        <MenuItem value={1} primaryText={icedesciption[1]} />
                        <MenuItem value={2} primaryText={icedesciption[2]} />
                      </SelectField>
                      <br/>
                  </div>)
                  :null:null
                  }
                  <br/><br/>
                  <center>
                  <FlatButton label="關閉" onClick= {this.handleClose} />
                  <FlatButton label="購買" onClick= {()=> {
                    if(this.state.count > 0){
                    this.props.dispatch(addToCart(itemkey,this.state.count));
                    this.props.dispatch( Notifications.success({
                      title: "訂單",
                      message: item.name + ' '+sugardesciption[this.state.sugar]+ ' '+icedesciption[this.state.ice]+"*"+this.state.count+' ' +"加入購物車",
                      level: "success",
                      position: "tr"
                    }));
                    this.setState( {count : 0,sugar:0,ice:0})
                    this.handleClose()
                  }}
                }
                   />
                 </center>
                 </Dialog>
                </div>

                )
    }
}
