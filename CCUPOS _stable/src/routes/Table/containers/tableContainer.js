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
    //  breakpoints: {lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0},
     cols: {lg: 9, md: 9, sm: 10, xs: 10, xxs: 10},
     initialLayout: generateLayout(),
   };

   state = {
     currentBreakpoint: 'xxs',
     mounted: false,
     layouts: {lg: this.props.initialLayout},
   };

   componentDidMount() {
     this.setState({mounted: true});
   }

   generateDOM(table) {
     return _.map(this.state.layouts.lg, function (l, i) {
       return (
         <div key={l.i}>
         {
           (l.static) ? table ? (table[l.i] != undefined) ?
           (
            {
              1: (
                {
                  0: (
                    <div>
                     <img src="/image/table/table1_0.png" alt="table1_0" height="120%" width="120%"/>
                    </div>
                  ),
                  1: (
                    <div>
                    <img src="/image/table/table1_1.png" alt="table1_1" height="120%" width="120%"/>
                    </div>
                  )
                }[table[l.i].taken]
              ),
              2: (
                {
                  0: (
                    <div>
                    <img src="/image/table/table2_0.png" alt="table2_0" height="120%" width="120%"/>
                    </div>
                  ),
                  1: (
                    <div>
                    <img src="/image/table/table2_1.png" alt="table2_1" height="120%" width="120%"/>
                    </div>
                  )
                }[table[l.i].taken]
              ),
              3: (
                {
                  0: (
                    <div>
                    <img src="/image/table/table3_0.png" alt="table3_0" height="120%" width="120%"/>
                    </div>
                  ),
                  1: (
                    <div>
                    <img src="/image/table/table3_1.png" alt="table3_1" height="120%" width="120%"/>
                    </div>
                  )
                }[table[l.i].taken]
              ),
              4: (
                {
                  0: (
                    <div>
                    <img src="/image/table/table4_0.png" alt="table4_0" height="120%" width="120%"/>
                    </div>
                  ),
                  1: (
                    <div>
                    <img src="/image/table/table4_1.png" alt="table4_1" height="120%" width="120%"/>
                    </div>
                  )
                }[table[l.i].taken]
              ),
              5: (
                {
                  0: (
                    <div>
                      <img src="/image/table/table5_0.png" alt="table5_0" height="120%" width="120%"/>
                    </div>
                  ),
                  1: (
                    <div>
                      <img src="/image/table/table5_1.png" alt="table5_1" height="120%" width="120%"/>
                    </div>
                  )
                }[table[l.i].taken]
              ),
              6: (
                {
                  0: (
                    <div>
                      <img src="/image/table/table6_0.png" alt="table6_0" height="120%" width="120%"/>
                    </div>
                  ),
                  1: (
                    <div>
                      <img src="/image/table/table6_1.png" alt="table6_1" height="120%" width="120%"/>
                    </div>
                  )
                }[table[l.i].taken]
              ),
              7: (
                {
                  0: (
                    <div>
                      <img src="/image/table/table7_0.png" alt="table7_0" height="250%" width="250%"/>
                    </div>
                  ),
                  1: (
                    <div>
                      <img src="/image/table/table7_1.png" alt="table7_1" height="250%" width="250%"/>
                    </div>
                  ),
                  2: (
                    <div>
                      <img src="/image/table/table7_2.png" alt="table7_2" height="250%" width="250%"/>
                    </div>
                  )
                }[table[l.i].taken]
              ),
              8: (
                {
                  0: (
                    <div>
                      <img src="/image/table/table8_0.png" alt="table8_0" height="130%" width="130%"/>
                    </div>
                  ),
                  1: (
                    <div>
                      <img src="/image/table/table8_1.png" alt="table8_1" height="130%" width="130%"/>
                    </div>
                  ),
                  2: (
                    <div>
                      <img src="/image/table/table8_2.png" alt="table8_2" height="130%" width="130%"/>
                    </div>
                  )
                }[table[l.i].taken]
              ),
              9: (
                {
                  0: (
                    <div>
                      <img src="/image/table/table9_0.png" alt="table9_0" height="130%" width="130%"/>
                    </div>
                  ),
                  1: (
                    <div>
                      <img src="/image/table/table9_1.png" alt="table9_1" height="130%" width="130%"/>
                    </div>
                  ),
                  2: (
                    <div>
                      <img src="/image/table/table9_2.png" alt="table9_2" height="130%" width="130%"/>
                    </div>
                  )
                }[table[l.i].taken]
              ),
              10: (
                {
                  0: (
                    <div>
                      <img src="/image/table/table10_0.png" alt="table10_0" height="130%" width="130%"/>
                    </div>
                  ),
                  1: (
                    <div>
                      <img src="/image/table/table10_1.png" alt="table10_1" height="130%" width="130%"/>
                    </div>
                  ),
                  2: (
                    <div>
                      <img src="/image/table/table10_2.png" alt="table10_2" height="130%" width="130%"/>
                    </div>
                  )
                }[table[l.i].taken]
              ),
              11: (
                {
                  0: (
                    <div>
                      <img src="/image/table/table11_0.png" alt="table11_0" height="130%" width="130%"/>
                    </div>
                  ),
                  1: (
                    <div>
                      <img src="/image/table/table11_1.png" alt="table11_1" height="130%" width="130%"/>
                    </div>
                  ),
                  2: (
                    <div>
                      <img src="/image/table/table11_2.png" alt="table11_2" height="130%" width="130%"/>
                    </div>
                  )
                }[table[l.i].taken]
              ),
              12: (
                {
                  0: (
                    <div>
                      <img src="/image/table/table12_0.png" alt="table12_0" height="300%" width="300%"/>
                    </div>
                  ),
                  1: (
                    <div>
                      <img src="/image/table/table12_1.png" alt="table12_1" height="300%" width="300%"/>
                    </div>
                  ),
                  2: (
                    <div>
                      <img src="/image/table/table12_2.png" alt="table12_2" height="300%" width="300%"/>
                    </div>
                  )
                }[table[l.i].taken]
              ),
              13: (
                {
                  0: (
                    <div>
                      <img src="/image/table/table13_0.png" alt="table13_0" height="300%" width="300%"/>
                    </div>
                  ),
                  1: (
                    <div>
                      <img src="/image/table/table13_1.png" alt="table13_1" height="300%" width="300%"/>
                    </div>
                  ),
                  2: (
                    <div>
                      <img src="/image/table/table13_2.png" alt="table13_2" height="300%" width="300%"/>
                    </div>
                  )
                }[table[l.i].taken]
              ),
              14: (
                {
                  0: (
                    <div>
                      <img src="/image/table/table14_0.png" alt="table14_0" height="110%" width="110%"/>
                    </div>
                  ),
                  1: (
                    <div>
                      <img src="/image/table/table14_1.png" alt="table14_1" height="110%" width="110%"/>
                    </div>
                  ),
                  2: (
                    <div>
                      <img src="/image/table/table14_2.png" alt="table14_2" height="110%" width="110%"/>
                    </div>
                  )
                }[table[l.i].taken]
              ),
              15: (
                {
                  0: (
                    <div>
                      <img src="/image/table/table15_0.png" alt="table15_0" height="110%" width="110%"/>
                    </div>
                  ),
                  1: (
                    <div>
                      <img src="/image/table/table15_1.png" alt="table15_1" height="110%" width="110%"/>
                    </div>
                  ),
                  2: (
                    <div>
                      <img src="/image/table/table15_2.png" alt="table15_2" height="110%" width="110%"/>
                    </div>
                  )
                }[table[l.i].taken]
              ),
              16: (
                {
                  0: (
                    <div>
                      <img src="/image/table/table16_0.png" alt="table16_0" height="110%" width="110%"/>
                    </div>
                  ),
                  1: (
                    <div>
                      <img src="/image/table/table16_1.png" alt="table16_1" height="110%" width="110%"/>
                    </div>
                  ),
                  2: (
                    <div>
                      <img src="/image/table/table16_2.png" alt="table16_2" height="110%" width="110%"/>
                    </div>
                  )
                }[table[l.i].taken]
              ),
              17: (
                {
                  0: (
                    <div>
                      <img src="/image/table/table17_0.png" alt="table17_0" height="110%" width="110%"/>
                    </div>
                  ),
                  1: (
                    <div>
                      <img src="/image/table/table17_1.png" alt="table17_1" height="110%" width="110%"/>
                    </div>
                  ),
                  2: (
                    <div>
                      <img src="/image/table/table17_2.png" alt="table17_2" height="110%" width="110%"/>
                    </div>
                  )
                }[table[l.i].taken]
              ),
              18: (
                {
                  0: (
                    <div>
                      <img src="/image/table/table18_0.png" alt="table18_0" height="110%" width="110%"/>
                    </div>
                  ),
                  1: (
                    <div>
                      <img src="/image/table/table18_1.png" alt="table18_1" height="110%" width="110%"/>
                    </div>
                  ),
                  2: (
                    <div>
                      <img src="/image/table/table18_2.png" alt="table18_2" height="110%" width="110%"/>
                    </div>
                  )
                }[table[l.i].taken]
              ),
              counter: (
                <div>
                  <img src="/image/table/counter.png" alt="counter" height="170%" width="130%"/>
                </div>
              ),
              longbar: (
                <div>
                  <img src="/image/table/longbar.png" alt="longbar" height="800%" width="250%"/>
                </div>
              ),
              shortbar: (
                <div>
                  <img src="/image/table/shortbar.png" alt="shortbar" height="150%" width="300%"/>
                </div>
              ),
            }[l.i]
           )
           : <span></span> // !(table[l.i] != undefined)
           : <span></span> // !table
           : <span></span> // !l.static
         }
         </div>);
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
  // console.log(this.props)
     return (


     <div style={{background:'#ddd', width: '100%', minHeight:window.innerHeight-65,maxWidth:700, margin: 'auto'}}>

       <ResponsiveReactGridLayout
         {...this.props}
         layouts={this.state.layouts}
         onBreakpointChange={this.onBreakpointChange}
         onLayoutChange={this.onLayoutChange}
         style={{maxWidth:700}}
         autoSize = {true}
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
    {i: 'counter', x: 0, y: 0, w: 1.4, h: 15, static: true},
    {i: 'shortbar', x: 1.5, y: 1.5, w: 0.3, h: 1, static: true},
    {i: 'longbar', x: 2.7, y: 0, w: 2, h: 0.5, static: true},
    // {i: 'windows2', x: 2, y: 0, w: 5.5, h: 2 ,static: true},
    // {i: 'backdoor', x: 1, y: 70, w: 1, h: 2 ,static: true},
    // {i: 'frontdoor', x: 6.5, y: 70, w: 1, h: 2 ,static: true},
    // {i: 'windows1', x: 2, y: 70, w: 4.5, h: 2 ,static: true},
    {i: '1', x: 3, y: 0.5, w: 1, h: 1, static: true},
    {i: '2', x: 4, y: 0.5, w: 1, h: 1, static: true},
    {i: '3', x: 5, y: 0.5, w: 1, h: 1, static: true},
    {i: '4', x: 6, y: 0.5, w: 1, h: 1, static: true},
    {i: '5', x: 2, y: 2, w: 1, h: 1, static: true},
    {i: '6', x: 2, y: 7, w: 1, h: 1, static: true},
    {i: '7', x: 7.7, y: 0, w: 1, h: 1, static: true},
    {i: '8', x: 3.5, y: 10, w: 1, h: 1, static: true},
    {i: '9', x: 5.5, y: 10, w: 1, h: 1, static: true},
    {i: '10', x: 3.5, y: 20, w: 1, h: 1, static: true},
    {i: '11', x: 5.5, y: 20, w: 1, h: 1, static: true},
    {i: '12', x: 7.5, y: 13, w: 1, h: 1, static: true},
    {i: '13', x: 7.5, y: 20, w: 1, h: 1, static: true},
    {i: '14', x: 3, y: 29, w: 1, h: 1,static: true},
    {i: '15', x: 4, y: 29, w: 1, h: 1,static: true},
    {i: '16', x: 5, y: 29, w: 1, h: 1,static: true},
    {i: '17', x: 6, y: 29, w: 1, h: 1,static: true},
    {i: '18', x: 7, y: 29, w: 1, h: 1,static: true},
  ];
  return layout;}
