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
import PropTypes from 'prop-types';
import _ from 'lodash';
import {Responsive, WidthProvider} from 'react-grid-layout';
const ResponsiveReactGridLayout = WidthProvider(Responsive);
import RaisedButton from 'material-ui/RaisedButton';
import classes from './tablecontainers.scss'
import '../../../../node_modules/react-grid-layout/css/styles.css'
import '../../../../node_modules/react-resizable/css/styles.css'

// const populates = [
//   { child: 'owner', root: 'users', keyProp: 'key' }
// ]
//

@UserIsAuthenticated // redirect to /login if user is not authenticated
@firebaseConnect( [ '/table' ])
@connect(
  ({firebase}) => ({
    account: pathToJS(firebase, 'profile'),
    table: dataToJS(firebase, 'table'),


  })
)
export default class Table extends React.Component {

  static propTypes = {
     onLayoutChange: PropTypes.func.isRequired
   };

   static defaultProps = {
     className: "layout",
     rowHeight: 4,
     onLayoutChange: function() {},
     cols: {lg: 10, md: 10, sm: 10, xs: 10, xxs: 10},
     initialLayout: generateLayout()
   };

   state = {
     currentBreakpoint: 'lg',
     mounted: false,
     layouts: {lg: this.props.initialLayout},
   };

   componentDidMount() {
     this.setState({mounted: true});
   }

   generateDOM(table) {
     return _.map(this.state.layouts.lg, function (l, i) {
       return (
         (l.static) ?
         (
         <div key={l.i}   style={{'backgroundColor': 'gray' }}>
           {l.i}
         </div>
          )
       : table ? (table[l.i]!= undefined) ? table[l.i].taken ?
       (
       <div key={l.i}   style={{'backgroundColor': 'red' }}>
         {l.i}
       </div>
        )
       :
       (
       <div key={l.i}   style={{'backgroundColor': 'green' }}>
         {l.i}
       </div>
        )
       :
       (
       <div key={l.i}   style={{'backgroundColor': 'blue' }}>
         {l.i}
       </div>
        )
        :
        (
        <div key={l.i}   style={{'backgroundColor': 'blue' }}>
          {l.i}
        </div>
         )

       );
     });
   }

   onBreakpointChange = (breakpoint) => {
     this.setState({
       currentBreakpoint: breakpoint
     });
   };

   onLayoutChange = (layout, layouts) => {
     this.props.onLayoutChange(layout, layouts);
   };

   onNewLayout = () => {
     this.setState({
       layouts: {lg: generateLayout()}
     });
   };

   stringifyLayout() {
     return this.state.layouts.lg.map(function(l) {
       return <div className="layoutItem" key={l.i}><b>{l.i}</b>: [{l.x}, {l.y}, {l.w}, {l.h}]</div>;
     });
   }

  render(){

   const { table }= this.props
  //console.log(this.props)
     return (


       <div className={classes.container}>

       <ResponsiveReactGridLayout
         {...this.props}
         layouts={this.state.layouts}
         onBreakpointChange={this.onBreakpointChange}
         onLayoutChange={this.onLayoutChange}

         autoSize = {false}
         verticalCompact = {false}
         // WidthProvider option
         measureBeforeMount={false}
         // I like to have it animate on mount. If you don't, delete `useCSSTransforms` (it's default `true`)
         // and set `measureBeforeMount={true}`.
         useCSSTransforms={this.state.mounted}>
           {this.generateDOM(table)}
       </ResponsiveReactGridLayout>
     </div>
    );
  }
}

function generateLayout() {

  var layout = [
    {i: '櫃台', x: 1, y: 0, w: 1, h: 50 ,static: true},
{i: '窗戶2', x: 2, y: 0, w: 5.5, h: 2 ,static: true},
{i: '後門', x: 1, y: 70, w: 1, h: 2 ,static: true},
{i: '前門', x: 6.5, y: 70, w: 1, h: 2 ,static: true},
{i: '窗戶1', x: 2, y: 70, w: 4.5, h: 2 ,static: true},
{i: '沙發1', x: 2, y: 66, w: 0.8, h: 4 },
{i: '沙發2', x: 3, y: 66, w: 0.8, h: 4 },
{i: '沙發3', x: 4, y: 66, w: 0.8, h: 4 },
{i: '沙發4', x: 5, y: 66, w: 0.8, h: 4 },
{i: '沙發1_', x: 2, y: 62, w: 0.8, h: 4 },
{i: '沙發2_', x: 3, y: 62, w: 0.8, h: 4 },
{i: '沙發3_', x: 4, y: 62, w: 0.8, h: 4 },
{i: '沙發4_', x: 5, y: 62, w: 0.8, h: 4 },
{i: '窗位1', x: 2 , y: 2, w: 0.8, h: 4},
{i: '窗位2', x: 3 , y: 2, w: 0.8, h: 4},
{i: '窗位3', x: 4 , y: 2, w: 0.8, h: 4},
{i: '窗位4', x: 5 , y: 2, w: 0.8, h: 4},
{i: '桶子1', x: 7 , y: 40, w: 0.5, h: 10},
{i: '桶子2', x: 7 , y: 50, w: 0.5, h: 10},
{i: '角落', x: 7, y: 2, w: 0.5, h: 13},
{i: '吧檯3', x: 2, y: 8, w: 0.3, h:8 },
{i: '吧檯2', x: 2, y: 13, w: 0.3, h:8 },
{i: '吧檯1', x: 2, y: 18, w: 0.3, h:8 },
{i: '1_', x: 3, y: 22, w: 0.8, h: 5},
{i: '1', x: 3, y: 23, w: 0.8, h: 5},
{i: '2_', x: 5, y: 22, w: 0.8, h: 5},
{i: '2', x: 5, y: 23, w: 0.8, h: 5},
{i: '3_', x: 3, y: 39, w: 0.8, h: 5},
{i: '3', x: 3, y: 40, w: 0.8, h: 5},
{i: '4_', x: 5, y: 39, w: 0.8, h: 5},
{i: '4', x: 5, y: 40, w: 0.8, h: 5},
     ];
  return layout
 /*
  return _.map(_.range(0, 25), function (item, i) {
    var y = Math.ceil(Math.random() * 4) + 1;
    return {
      x: _.random(0, 5) * 2 % 12,
      y: Math.floor(i / 6) * y,
      w: 2,
      h: y,
      i: i.toString(),
      static: Math.random() < 0.05
    };
  });
  */
}
