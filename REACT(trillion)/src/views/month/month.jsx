import base from '../../rebase';
import React from "react";
import PropTypes from "prop-types";
// react plugin for creating charts
import ChartistGraph from "react-chartist";
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

import ReactDOM from 'react-dom';
import Slider, { Range } from 'rc-slider';
import { Tooltip as RcTooltip } from 'rc-tooltip';
// We can just import Slider or Range to reduce bundle size
// import Slider from 'rc-slider/lib/Slider';
// import Range from 'rc-slider/lib/Range';
import 'rc-slider/assets/index.css';

import { LineChart, PieChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Line, Pie } from 'recharts';



import {
  ContentCopy,
  Store,
  InfoOutline,
  Warning,
  DateRange,
  LocalOffer,
  Update,
  ArrowUpward,
  AccessTime,
  Accessibility
} from "@material-ui/icons";
import { withStyles, Grid } from "material-ui";

import {
  StatsCard,
  ChartCard,
  TasksCard,
  RegularCard,
  Table,
  ItemGrid
} from "components";

import {
  dailySalesChart,
  emailsSubscriptionChart,
  completedTasksChart,
  weekSubscriptionChart
} from "variables/charts";

import dashboardStyle from "assets/jss/material-dashboard-react/dashboardStyle";

class Dashboard extends React.Component {

    componentDidMount(){
        base.syncState(`users`, {
            context: this,
            state: `users`,
            asArray: false
        });
        base.syncState(`preorders`, {
            context: this,
            state: `preorders`,
            asArray: false
        });
        base.syncState(`menu`, {
            context: this,
            state: `menu`,
            asArray: false
        });
        base.syncState(`orders`, {
            context: this,
            state: `orders`,
            asArray: false
        });
    }
  state = {
    value: 0,
	anchorEl: null,
	anchorEl2: null,
	chart : "linechart",
	interval : "week",
	view : [0,6],
	time : [1451577600000,1577808000000],
	minview : 0,
	maxview : 6,
	mintime : 1451577600000,
	maxtime : 1577808000000,
  };
  handleChange = (event, value) => {
    this.setState({ value });
  };

  handleChangeIndex = index => {
    this.setState({ value: index });
  };
  
  handleClickInterval = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleCloseInterval = () => {
    this.setState({ anchorEl: null });
  };
  handleCloseIntervalDay = () => {
    this.setState({ anchorEl: null , interval: "day" , minview: 0 , maxview: 23 , view: [0,23]});
  };
  handleCloseIntervalWeek = () => {
    this.setState({ anchorEl: null , interval: "week" , minview: 0 , maxview: 6 , view: [0,6]});
  };
  handleCloseIntervalMonth = () => {
    this.setState({ anchorEl: null , interval: "month" , minview: 0 , maxview: 30 , view: [0,30]});
  };
  handleCloseIntervalYear = () => {
    this.setState({ anchorEl: null , interval: "year" , minview: 0 , maxview: 11 , view: [0,11]});
  };
  
  handleClickChart = event => {
    this.setState({ anchorEl2: event.currentTarget });
  };

  handleCloseChart = () => {
    this.setState({ anchorEl2: null });
  };
  
  handleCloseChartLine = () => {
    this.setState({ anchorEl2: null , chart: "linechart" });
  };
  
  handleCloseChartPie = () => {
    this.setState({ anchorEl2: null , chart: "piechart"});
  };
  
  setViewRange(minR,maxR){
	  this.setState({minview: minR,maxview: maxR})
  }
  
  getRandomColor() {
    var letters = '0123456789ABCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
	}
  
  linechardata(name){
	  return(<Line type="monotone" dataKey={name} stroke={this.getRandomColor()} />)
  }
  
  render() {
	const { anchorEl } = this.state;
	const { anchorEl2 } = this.state;
	
	const createSliderWithTooltip = Slider.createSliderWithTooltip;
	const Range = createSliderWithTooltip(Slider.Range);
	const Handle = Slider.Handle;
	
	
	const handle = (props) => {
  const { value, dragging, index, ...restProps } = props;
  return (
    <Tooltip
      prefixCls="rc-slider-tooltip"
      overlay={value}
      visible={dragging}
      placement="top"
      key={index}
    >
      <Handle value={value} {...restProps} />
    </Tooltip>
  );
};
	const wrapperStyle = { width: 400, margin: 50 };
	
	const salesVolumeDay=[{name: '00:00'},{name: '01:00'},{name: '02:00'},{name: '03:00'},{name: '04:00'},{name: '05:00'},{name: '06:00'},{name: '07:00'},{name: '08:00'},{name: '09:00'},{name: '10:00'},{name: '11:00'},{name: '12:00'},{name: '13:00'},{name: '14:00'},{name: '15:00'},{name: '16:00'},{name: '17:00'},{name: '18:00'},{name: '19:00'},{name: '20:00'},{name: '21:00'},{name: '22:00'},{name: '23:00'},]
	const salesVolumeWeek=[{name: 'SUN'},{name: 'MON'},{name: 'TUE'},{name: 'WED'},{name: 'THU'},{name: 'FRI'},{name: 'SAT'},]
	const salesVolumeMonth=[{name: '1'},{name: '2'},{name: '3'},{name: '4'},{name: '5'},{name: '6'},{name: '7'},{name: '8'},{name: '9'},{name: '10'},{name: '11'},{name: '12'},{name: '13'},{name: '14'},{name: '15'},{name: '16'},{name: '17'},{name: '18'},{name: '19'},{name: '20'},{name: '21'},{name: '22'},{name: '23'},{name: '24'},{name: '25'},{name: '26'},{name: '27'},{name: '28'},{name: '29'},{name: '30'},{name: '31'},]
	const salesVolumeYear=[{name: 'JAN'},{name: 'FEB'},{name: 'MAR'},{name: 'APR'},{name: 'MAY'},{name: 'JUN'},{name: 'JUL'},{name: 'AUG'},{name: 'SEP'},{name: 'OCT'},{name: 'NOV'},{name: 'DEC'},]
	
	let dayCount = new Object()
	let weekCount = new Object()
	let monthCount = new Object()
	let yearCount = new Object()
	var realtime
	var i
	
	
	for(i=0;i<24;i++){
　		dayCount[i]=new Object()
		dayCount[i].name=salesVolumeDay[i].name
	}
	
	for(i=0;i<7;i++){
　		weekCount[i]=new Object()
		weekCount[i].name=salesVolumeWeek[i].name
	}
	
	for(i=0;i<31;i++){
　		monthCount[i]=new Object()
		monthCount[i].name=salesVolumeMonth[i].name
	}
	
	for(i=0;i<12;i++){
　		yearCount[i]=new Object()
		yearCount[i].name=salesVolumeYear[i].name
	}
	
	
	
	this.state.orders?Object.keys(this.state.orders).map((userid) =>{
        Object.keys(this.state.orders[userid]).map((orderid) => {
			if(this.state.orders[userid][orderid].createdAt>this.state.time[0]&&this.state.orders[userid][orderid].createdAt<this.state.time[1]){
			realtime=new Date(this.state.orders[userid][orderid].createdAt);
			(dayCount[realtime.getHours()] == null ? dayCount[realtime.getHours()] = new Object() : null)
            Object.keys(this.state.orders[userid][orderid].order_list).map((product) => {
				
				if(dayCount[realtime.getHours()][product] == null){
					dayCount[realtime.getHours()][product] = this.state.orders[userid][orderid].order_list[product].count           
				}
				else{
					dayCount[realtime.getHours()][product] += this.state.orders[userid][orderid].order_list[product].count 
				}        
            })
			}})
    }):null
	
	this.state.orders?Object.keys(this.state.orders).map((userid) =>{
        Object.keys(this.state.orders[userid]).map((orderid) => {
			if(this.state.orders[userid][orderid].createdAt>this.state.time[0]&&this.state.orders[userid][orderid].createdAt<this.state.time[1]){
			realtime=new Date(this.state.orders[userid][orderid].createdAt);
			(weekCount[realtime.getDay()] == null ? weekCount[realtime.getDay()] = new Object() : null)
            Object.keys(this.state.orders[userid][orderid].order_list).map((product) => {
				if(weekCount[realtime.getDay()][product] == null){
					weekCount[realtime.getDay()][product] = this.state.orders[userid][orderid].order_list[product].count           
				}
				else{
					weekCount[realtime.getDay()][product] += this.state.orders[userid][orderid].order_list[product].count 
				}        
            })
			}})
    }):null
	
	this.state.orders?Object.keys(this.state.orders).map((userid) =>{
        Object.keys(this.state.orders[userid]).map((orderid) => {
			if(this.state.orders[userid][orderid].createdAt>this.state.time[0]&&this.state.orders[userid][orderid].createdAt<this.state.time[1]){
			realtime=new Date(this.state.orders[userid][orderid].createdAt);
			(monthCount[realtime.getDate()] == null ? monthCount[realtime.getDate()] = new Object() : null)
            Object.keys(this.state.orders[userid][orderid].order_list).map((product) => {
				if(monthCount[realtime.getDate()][product] == null){
					monthCount[realtime.getDate()][product] = this.state.orders[userid][orderid].order_list[product].count           
				}
				else{
					monthCount[realtime.getDate()][product] += this.state.orders[userid][orderid].order_list[product].count 
				}        
            })
			}})
    }):null
	
	this.state.orders?Object.keys(this.state.orders).map((userid) =>{
        Object.keys(this.state.orders[userid]).map((orderid) => {
			if(this.state.orders[userid][orderid].createdAt>this.state.time[0]&&this.state.orders[userid][orderid].createdAt<this.state.time[1]){
			realtime=new Date(this.state.orders[userid][orderid].createdAt);
			(yearCount[realtime.getMonth()] == null ? yearCount[realtime.getMonth()] = new Object() : null)
            Object.keys(this.state.orders[userid][orderid].order_list).map((product) => {
				if(yearCount[realtime.getMonth()][product] == null){
					yearCount[realtime.getMonth()][product] = this.state.orders[userid][orderid].order_list[product].count           
				}
				else{
					yearCount[realtime.getMonth()][product] += this.state.orders[userid][orderid].order_list[product].count 
				}        
            })
			}})
    }):null
	
	if(this.state.interval ==  "day"){
		var dataDay=[]
	for(i=this.state.view[0];i<=this.state.view[1];i++){
		dataDay.push(dayCount[i])
	}
	}
	else if(this.state.interval ==  "week"){
		var dataWeek=[]
	for(i=this.state.view[0];i<=this.state.view[1];i++){
		dataWeek.push(weekCount[i])
	}
	}
	else if(this.state.interval ==  "month"){
		var dataMonth=[]
	for(i=this.state.view[0];i<=this.state.view[1];i++){
		dataMonth.push(monthCount[i])
	}
	}
	else if(this.state.interval ==  "year"){
		var dataYear=[]
	for(i=this.state.view[0];i<=this.state.view[1];i++){
		dataYear.push(yearCount[i])
	}
	}
					   
	let pieCount = new Object()
    let pieData = []

    this.state.orders?Object.keys(this.state.orders).map((userid) =>{
        Object.keys(this.state.orders[userid]).map((orderid) => {
			if(this.state.orders[userid][orderid].createdAt>this.state.time[0]&&this.state.orders[userid][orderid].createdAt<this.state.time[1]){
            Object.keys(this.state.orders[userid][orderid].order_list).map((product) => {
            if(pieCount[product] == null){
                pieCount[product] = this.state.orders[userid][orderid].order_list[product].count           
            }else{
                pieCount[product] += this.state.orders[userid][orderid].order_list[product].count 
            }    
                    
            })
			}})
    }):null
	
	Object.keys(pieCount).map((pieorder)=>{
		pieData.push({name: pieorder, value: pieCount[pieorder]})
	})
	
    /*let menuCount = new Object()
    let tempCount = new Object()

    this.state.orders?Object.keys(this.state.orders).map((userid) =>{
        Object.keys(this.state.orders[userid]).map((orderid) => {
            Object.keys(this.state.orders[userid][orderid].order_list).map((product) => {
            if(menuCount[product] == null){
                menuCount[product] = this.state.orders[userid][orderid].order_list[product].count           
            }else{
                menuCount[product] += this.state.orders[userid][orderid].order_list[product].count 
            }    
                    
            })
        })
    }):null

    let allCount = Object.keys(menuCount).map(item => menuCount[item])

    let newData = this.state.menu ? Object.keys(this.state.menu).map(item => 
    [this.state.menu[item].image, this.state.menu[item].name, menuCount[item], '$'+this.state.menu[item].price.toString()]
    ):[['loading...', 'loading...', 'loading...', 'loading...']]
    
    
    let Total = this.state.menu ? Object.keys(this.state.menu).map(item => 
    menuCount[item] *= this.state.menu[item].price.toString()
    ).reduce((sum, elem) => sum + elem):NaN*/
    
    return (
		<div>
			<Grid container>
			<ItemGrid xs={12} sm={12} md={12}>
				<RegularCard
				cardTitle="銷貨"
				cardSubtitle="賣出多少商品"
				/>      
			</ItemGrid>
			</Grid>
			<Button
			aria-owns={anchorEl ? 'simple-menu' : null}
			aria-haspopup="true"
			onClick={this.handleClickInterval}
			>
			時間{this.state.interval}
			</Button>
			<Menu
			id="simple-menu"
			anchorEl={anchorEl}
			open={Boolean(anchorEl)}
			onClose={this.handleCloseInterval}
			>
			<MenuItem onClick={this.handleCloseIntervalDay}>日</MenuItem>
			<MenuItem onClick={this.handleCloseIntervalWeek}>周</MenuItem>
			<MenuItem onClick={this.handleCloseIntervalMonth}>月</MenuItem>
			<MenuItem onClick={this.handleCloseIntervalYear}>年</MenuItem>
			</Menu>
			<Button
			aria-owns={anchorEl2 ? 'simple-menu' : null}
			aria-haspopup="true"
			onClick={this.handleClickChart}
			>
			圖表類型{this.state.chart}
			</Button>
			<Menu
			id="simple-menu2"
			anchorEl={anchorEl2}
			open={Boolean(anchorEl2)}
			onClose={this.handleCloseChart}
			>
			<MenuItem onClick={this.handleCloseChartLine}>Linechart</MenuItem>
			<MenuItem onClick={this.handleCloseChartPie}>Piechart</MenuItem>
			</Menu>
			<div>
				<div style={wrapperStyle}>
					<p>顯示範圍</p>
					{this.state.interval == "day" ?
					<Range min={0} max={23} defaultValue={this.state.view} tipFormatter={value => value} onAfterChange={value=>this.setState({view: value})} />
					:null}
					{this.state.interval == "week" ?
					<Range min={0} max={6} defaultValue={this.state.view} tipFormatter={value => value} onAfterChange={value=>this.setState({view: value})} />
					:null}
					{this.state.interval == "month" ?
					<Range min={0} max={30} defaultValue={this.state.view} tipFormatter={value => value} onAfterChange={value=>this.setState({view: value})} />
					:null}
					{this.state.interval == "year" ?
					<Range min={0} max={11} defaultValue={this.state.view} tipFormatter={value => value} onAfterChange={value=>this.setState({view: value})} />
					:null}
					
				</div>
				<div style={wrapperStyle}>
					<p>資料範圍</p>
					<p>{new Date(this.state.time[0]).toString()}</p>
					<p>{new Date(this.state.time[1]).toString()}</p>
					<Range min={this.state.mintime} max={this.state.maxtime} defaultValue={this.state.time} step={3600000} tipFormatter={value => value} onAfterChange={value=>this.setState({time: value})} />
				</div>
			</div>
			{this.state.chart == "linechart" && this.state.interval == "day" ?
			<LineChart width={1400} height={700} data={dataDay}
				margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
				<CartesianGrid strokeDasharray="3 3" />
				<XAxis dataKey="name" />
				<YAxis />
				<Tooltip />
				<Legend />
				{this.state.menu ? Object.keys(this.state.menu).map((goodname)=>{return this.linechardata(goodname)}) : null }
			</LineChart>
			:null}
			{this.state.chart == "linechart" && this.state.interval == "week" ?
			<LineChart width={1400} height={700} data={dataWeek}
				margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
				<CartesianGrid strokeDasharray="3 3" />
				<XAxis dataKey="name" />
				<YAxis />
				<Tooltip />
				<Legend />
				{this.state.menu ? Object.keys(this.state.menu).map((goodname)=>{return this.linechardata(goodname)}) : null }
			</LineChart>
			:null}
			{this.state.chart == "linechart" && this.state.interval == "month" ?
			<LineChart width={1400} height={700} data={dataMonth}
				margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
				<CartesianGrid strokeDasharray="3 3" />
				<XAxis dataKey="name" />
				<YAxis />
				<Tooltip />
				<Legend />
				{this.state.menu ? Object.keys(this.state.menu).map((goodname)=>{return this.linechardata(goodname)}) : null }
			</LineChart>
			:null}
			{this.state.chart == "linechart" && this.state.interval == "year" ?
			<LineChart width={1400} height={700} data={dataYear}
				margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
				<CartesianGrid strokeDasharray="3 3" />
				<XAxis dataKey="name" />
				<YAxis />
				<Tooltip />
				<Legend />
				{this.state.menu ? Object.keys(this.state.menu).map((goodname)=>{return this.linechardata(goodname)}) : null }
			</LineChart>
			:null}
			{this.state.chart == "piechart" ?
			<PieChart width={730} height={250}>
				<Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={60} outerRadius={80} fill="#82ca9d" label={(name, value)=>`${name}: ${value}`} />
			</PieChart>
			:null}
		</div>
    );
  }
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(dashboardStyle)(Dashboard);
