import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import {
  isLoaded,
  pathToJS
  // orderedToJS,
  // populatedDataToJS
} from 'react-redux-firebase'
import { UserIsAuthenticated } from 'utils/router'
import Getorders from '../components/Getorders'

@UserIsAuthenticated // redirect to /login if user is not authenticated

@connect(
  ({ firebase}) => ({
    auth: pathToJS(firebase, 'auth'),

  })
)

export default class Order extends Component {
  static propTypes = {
      auth: PropTypes.object,
    }


  render() {

    if (!isLoaded(this.props.auth)) {
    return <div>Loading...</div>
    }
    else return <Getorders  />

  }
}
