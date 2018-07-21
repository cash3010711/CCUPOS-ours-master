import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import GoogleButton from 'react-google-button'
import { connect } from 'react-redux'
import {
  firebaseConnect,
  isLoaded,
  isEmpty,
  pathToJS
} from 'react-redux-firebase'
import Paper from 'material-ui/Paper'
import Snackbar from 'material-ui/Snackbar'
import { UserIsNotAuthenticated } from 'utils/router'
import { SIGNUP_PATH } from 'constants/paths'
import LoginForm from '../components/LoginForm/LoginForm'
import classes from './LoginContainer.scss'
import logo from 'image/logo.png'

@UserIsNotAuthenticated // redirect to list page if logged in
@firebaseConnect()
@connect(
  // Map state to props
  ({ firebase }) => ({
    authError: pathToJS(firebase, 'authError')
  })
)
export default class Signup extends Component {
  static propTypes = {
    firebase: PropTypes.shape({
      login: PropTypes.func.isRequired
    }),
    authError: PropTypes.shape({
      message: PropTypes.string // eslint-disable-line react/no-unused-prop-types
    })
  }

  state = {
    snackCanOpen: false
  }

  handleLogin = loginData => {
    this.setState({
      snackCanOpen: true
    })

    this.props.firebase.login(loginData)
  }

  providerLogin = (provider) =>
    this.handleLogin({ provider })

  render () {
    const { authError } = this.props
    const { snackCanOpen } = this.state

    return (
      <div className={classes.container}>
        <Paper className={classes.panel}>
          <img src={logo} alt=""/><br/>
          <LoginForm onSubmit={this.handleLogin} />
        </Paper>
        <div className={classes.or}>
          或
        </div>
        <div className={classes.providers}>
          <GoogleButton onClick={() => this.providerLogin('google')} />
        </div>
        <div className={classes.signup}>
          <span className={classes['signup-label']}>
            沒有帳號嗎?
          </span>
          <Link className={classes['signup-link']} to={SIGNUP_PATH}>
            註冊一個吧!
          </Link>
          
        </div>
        {
          isLoaded(authError) && !isEmpty(authError) && snackCanOpen &&
            <Snackbar
              open={isLoaded(authError) && !isEmpty(authError) && snackCanOpen}
              message={authError ? authError.message : 'Signup error'}
              action='close'
              autoHideDuration={3000}
            />
        }
      </div>
    )
  }
}
