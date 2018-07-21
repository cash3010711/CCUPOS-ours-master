import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import {
  firebaseConnect,
  isLoaded,
  isEmpty,
  pathToJS,
  dataToJS,
  // orderedToJS,
  // populatedDataToJS
} from 'react-redux-firebase'
import { UserIsAuthenticated } from 'utils/router'
import { ListItem } from 'material-ui/List'
import {GridList, GridTile} from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
import Subheader from 'material-ui/Subheader';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';
import { gridMenu } from 'styles/sidebar'
import { addToCart } from 'store/cartActions'
// const populates = [
//   { child: 'owner', root: 'users', keyProp: 'key' }
// ]



@UserIsAuthenticated // redirect to /login if user is not authenticated

@firebaseConnect([
   '/menu' // sync full list of todos
  // { path: '/projects', type: 'once' } // for loading once instead of binding
  //{ path: 'todos', queryParams: ['limitToFirst=20'] } // limit to first 20
  // { path: 'todos', queryParams: ['limitToFirst=20'], populates } // populate
  // { path: 'todos', queryParams: ['orderByChild=text'] }, // list todos alphabetically
])
@connect(
  ({firebase}) => ({
  menu: dataToJS(firebase, 'menu'),

  })
)
export default class Menu extends React.Component {

  renderMenuItem(key, item) {
    return (
      <GridTile key={key} title={item.name} subtitle={`NT ${item.price}`}
        actionIcon={
          <div>
            <IconButton onClick={()=> this.props.dispatch(addToCart(key))}><FontIcon color={'#ffffff'} className="fa fa-cart-plus"/></IconButton>
          </div>
        }>
        <img src={`/image/fk/${item.image}.jpg`} alt=""/>
      </GridTile>
    )
  }
  static propTypes = {
      menu: PropTypes.object,
      firebase: PropTypes.object
    }

  render() {
    const { firebase, menu } = this.props;


    // Build Todos list if todos exist and are loaded
    const todosList = !isLoaded(menu)
      ? 'Loading'
      : isEmpty(menu)
        ? 'Todo list is empty'
        : '123'

    return (
      <div>
        <GridList cellHeight={300} style={gridMenu} >
          { this.props.menu
            ? Object.keys(this.props.menu).sort().map(item => this.renderMenuItem(item, this.props.menu[item]))
            : <h1>Loading...</h1> }
        </GridList>

      </div>
    )
  }
}
