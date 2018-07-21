import React, { Component, PropTypes } from 'react'
import Paper from 'material-ui/Paper'
import { connect } from 'react-redux'
import { firebaseConnect, pathToJS, isLoaded } from 'react-redux-firebase'
import { reduxFirebase as rfConfig } from 'config'
import { UserIsAuthenticated } from 'utils/router'
import defaultUserImageUrl from 'static/User.png'
import LoadingSpinner from 'components/LoadingSpinner'
import AccountForm from '../components/AccountForm/AccountForm'
import BodyForm from '../components/BodyForm/BodyForm'
import classes from './AccountContainer.scss'
import {Tabs, Tab} from 'material-ui/Tabs'
import SwipeableViews from 'react-swipeable-views'
import { translate } from 'react-i18next'

@UserIsAuthenticated
@firebaseConnect()
@connect(
  // Map redux state to props
  ({ firebase }) => ({
    auth: pathToJS(firebase, 'auth'),
    account: pathToJS(firebase, 'profile')
  })
)
 // redirect to /login if user is not authenticated
// add this.props.firebase
class Account extends Component {
  static propTypes = {
    account: PropTypes.object,
    auth: PropTypes.shape({
      uid: PropTypes.string
    }),
    firebase: PropTypes.shape({
      update: PropTypes.func.isRequired,
      logout: PropTypes.func.isRequired
    })
  }

  state = { modalOpen: false, slideIndex: 0 }

  handleLogout = () => this.props.firebase.logout()

  handleChange = (value) => {
  this.setState({
    slideIndex: value
  });
}

  toggleModal = () => {
    this.setState({
      modalOpen: !this.state.modalOpen
    })
  }

  updateAccount = newData =>
    this.props.firebase
      .update(`${rfConfig.userProfile}/${this.props.auth.uid}`, newData)
      .catch(err => {
        console.error('Error updating account', err) // eslint-disable-line no-console
        // TODO: Display error to user
      })

  render () {
    const { account, t} = this.props

    if (!isLoaded(account)) {
      return <LoadingSpinner />
    }

    return (

      <div className={classes.container}>
        <Tabs
        onChange={this.handleChange}
        value={this.state.slideIndex}
      >
        <Tab label={t('basicinformation')} value={0} />
        <Tab label={t('healthinformation')} value={1} />
        <Tab label={t('otherinformation')} value={2} />
        </Tabs>
        <SwipeableViews
         index={this.state.slideIndex}
         onChangeIndex={this.handleChange}
       >

        <Paper className={classes.pane}>
          <div className={classes.settings}>

            <div className={classes.meta}>
              <div className={classes.avatar}>
              <img
                style = { {style:'display:block' ,margin:'auto'}}
                className={classes.avatarCurrent}
                src={(account && account.avatarUrl) || defaultUserImageUrl}
                onClick={this.toggleModal}
              />
              </div>
              <AccountForm
                initialValues={account}
                account={account}
                onSubmit={this.updateAccount}
              />
            </div>
          </div>
        </Paper>

        <Paper className={classes.pane}>
          <div className={classes.settings}>

            <div className={classes.meta}>

              <BodyForm
                initialValues={account}
                account={account}
                onSubmit={this.updateAccount}
              />
            </div>
          </div>
        </Paper>

        </SwipeableViews>
      </div>

    )
  }
}

export default translate()(Account)
