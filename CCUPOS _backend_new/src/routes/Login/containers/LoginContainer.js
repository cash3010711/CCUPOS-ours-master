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
import { SIGNUP_PATH, LIST_PATH} from 'constants/paths'
import LoginForm from '../components/LoginForm/LoginForm'
import cssclasses from './LoginContainer.scss'
import IconButton from 'material-ui-next/IconButton'
import Dialog  , { DialogTitle, DialogContent }from 'material-ui-next/Dialog'
import { withStyles } from 'material-ui-next/styles'

const styles = theme => ({
  providerbutton: {
    maxHeight: 64,
    maxWidth: 64,
    minHeight: 64,
    minWidth: 64
  }
}

)
@UserIsNotAuthenticated // redirect to list page if logged in
@firebaseConnect()
@connect(
  // Map state to props
  ({ firebase }) => ({
    authError: pathToJS(firebase, 'authError')
  })
)
class Login extends Component {
  static contextTypes = {
    router: PropTypes.object.isRequired
  }
  static propTypes = {
    firebase: PropTypes.shape({
      login: PropTypes.func.isRequired
    }),
    authError: PropTypes.shape({
      message: PropTypes.string // eslint-disable-line react/no-unused-prop-types
    })
  }

  state = {
    snackCanOpen: false,
    loging:false
  }

  handleLogin = loginData => {
    this.setState({
      snackCanOpen: true,
      loging :true
    })

    return this.props.firebase.login(loginData).then(account => this.context.router.push(LIST_PATH)).catch(()=>this.setState({loging:false}))
  }

  providerLogin = provider => this.handleLogin({ provider, type: 'popup' })

  render () {
    const {authError, classes} = this.props
    const { snackCanOpen, loging } = this.state

    return (
      <div className={cssclasses.container}>
        <Paper className={cssclasses.panel}>
          <img height="130" width="130" src='/image/logo.png' /> <br />
          <LoginForm onSubmit={this.handleLogin} />
        </Paper>
        <div className={cssclasses.or}>
          或使用以下登入
        </div>
        <div className={cssclasses.providers}>
          <IconButton className={classes.providerbutton}
            aria-label='google' onClick={() => this.providerLogin('google')}>
            <img src='/image/google_provider.png' className={classes.providerbutton} />
          </IconButton>
          <IconButton className={classes.providerbutton}
            aria-label='facebook' onClick={() => this.providerLogin('facebook')}>
            <img src='/image/fb_provider.png' className={classes.providerbutton} />
          </IconButton>
          <Dialog open={ loging&&   !(isLoaded(authError) && !isEmpty(authError)) ? true:false} /*onRequestClose={this.handlecanceldialogClose}*/>
            <DialogContent>
                  <h2>登入中...</h2>
            </DialogContent>
          </Dialog>
        </div>
        <div className={cssclasses.signup}>
          <span className={cssclasses['signup-label']}>
            沒有帳號嗎?
          </span>
          <Link className={cssclasses['signup-link']} to={SIGNUP_PATH}>
            註冊一個吧!
          </Link>

        </div>
        {
          isLoaded(authError) && !isEmpty(authError) && snackCanOpen &&
            <Snackbar
              style={{color: '#ffd699'}}
              open={isLoaded(authError) && !isEmpty(authError) && snackCanOpen}
              message={authError ? authError.code=='auth/operation-not-supported-in-this-envirnoment' ? '請離開私密瀏覽模式後再造訪本網站'  :authError.message   : '登入失敗'}
              action='close'
              autoHideDuration={3000}
            />
        }
      </div>
    )
  }
}
Login.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Login)
