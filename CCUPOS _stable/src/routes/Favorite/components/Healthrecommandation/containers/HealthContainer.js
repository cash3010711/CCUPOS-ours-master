import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import {
  firebaseConnect,
  isLoaded,
  isEmpty,
  pathToJS,
  dataToJS,
  getFirebase
  // orderedToJS,
  // populatedDataToJS
} from 'react-redux-firebase'
import { UserIsAuthenticated } from 'utils/router'
import {GridList, GridTile} from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import Subheader from 'material-ui/Subheader';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import {List, ListItem} from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import Gethealth from '../components/Healthrecommandation'

@UserIsAuthenticated // redirect to /login if user is not authenticated

@connect(
  ({ firebase}) => ({
    auth: pathToJS(firebase, 'auth'),

  })
)

export default class Health extends Component {
  static propTypes = {
      auth: PropTypes.object,
    }


  render() {

    if (!isLoaded(this.props.auth)) {
    return <div>Loading...</div>
    }
  return <Gethealth   />

  }
}
