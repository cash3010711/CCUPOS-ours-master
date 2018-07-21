import React, {Component, PropTypes} from 'react'
import Typography from 'material-ui-next/Typography'

const coffeeitem = ['Americano',"Cappuccino","Herbal_tea","Latte_ice","Latte_large_hot","Latte_small_hot","Milktea","Redtea"];
const fooditem = ["Chocolate_muffins","Chocolate_sundae","Deluxe_pizza","Honey_muffins","Original_muffins","Seafood_pizza","Smoked_chicken_pizza","Spaghetti_bolognese","Spaghettii_with_bacon_in_cream_sauce",
                      "Spaghettii_with_clam_in_green_sauce","Thick_toast_with_butter","Thick_toast_with_chocolate","Thick_toast_with_peanut","Vanilla_sundae"];

export default class waittime extends Component {
  static propTypes = {
      pipeline: PropTypes.object.isRequired,
      keyname: PropTypes.string.isRequired
  }
  constructor(props) {
    super(props);

    this.state = {
      wait : 0
    };

  }
  componentDidMount() {
    //this.intervalId = setInterval(this.waittime.bind(this), 1000);
    var coffee = this.props.pipeline.coffee;
    var food = this.props.pipeline.food;

    if(coffee != null && food != null) {
    //var currenttime = new Date();

    //if((currenttime.getTime() > coffee['machine1']) || (currenttime.getTime() >  coffee['machine2'])  ) this.setState({wait:0});
    //else if(coffee['machine1'] > coffee['machine2'] ) this.setState({wait:  (coffee['machine2'] - currenttime.getTime())});
    //else this.setState({wait: coffee['machine1'] - currenttime.getTime()});
    //this.setState({wait: (coffee['queuetime']/coffee['machinecount'] )});
    /*
    if( (coffeeitem.indexOf(this.props.keyname) != -1 ))
      this.setState({wait: (coffee['queuetime'])});
    else if( (fooditem.indexOf(this.props.keyname) != -1 ))
      this.setState({wait: (food['queuetime'])});
    */
    coffee['queuetime'] > food['queuetime'] ? this.setState({wait: (coffee['queuetime'])}):this.setState({wait: (food['queuetime'])})
    }
  }
  componentWillUnmount() {
   //clearInterval(this.intervalId);
  }

  componentWillReceiveProps(nextProps){

    var coffee =nextProps.pipeline.coffee;
    var food = nextProps.pipeline.food;
    if(coffee!= null || food != null ) {
      /*
    var currenttime = new Date();
    //console.log(coffee['machine1'] - currenttime.getTime())
    if((currenttime.getTime() > coffee['machine1']) || (currenttime.getTime() >  coffee['machine2'])  ) {  this.setState({wait:0});}
    else if(coffee['machine1'] > coffee['machine2'] ) {this.setState({wait:  (coffee['machine2'] - currenttime.getTime())});}
    else {this.setState({wait: coffee['machine1'] - currenttime.getTime()});}
    */
    /*
    if( (coffeeitem.indexOf(this.props.keyname) != -1 ))
      this.setState({wait: (coffee['queuetime'])});
    else if( (fooditem.indexOf(this.props.keyname) != -1 ))
      this.setState({wait: (food['queuetime'])});
      */
     coffee['queuetime'] > food['queuetime'] ? this.setState({wait: (coffee['queuetime'])}):this.setState({wait: (food['queuetime'])})
    }

  }
/*
  waittime(){
    if(this.state.wait > 0)
      this.setState({wait: (this.state.wait-1000)} )
  //fb.ref("/.info/serverTimeOffset").on('value', function(offset) {
  // var offsetVal = offset.val() || 0;
  // var serverTime = Date.now() + offsetVal;
  //});

  }

  millisToMinutesAndSeconds(millis) {
  var minutes = Math.floor(millis / 60000);
  var seconds = ((millis % 60000) / 1000).toFixed(0);
  return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
  }
*/
    render () {
     //console.log(this.props.time)
     //console.log(this.props.keyname)
        //console.log(this.props.time)
        return (
          <Typography component="p" style = {{'background':'rgba(215,215,177,0.6)' }}>
          訂單預計開始製作時間 : {(this.state.wait === 0) ? 'Now...' : '約'+Math.floor(this.state.wait/60)+'分'}
          </Typography >
        )
    }
}
