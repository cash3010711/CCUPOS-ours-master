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
import {LOGIN_PATH, LIST_PATH} from 'constants/paths'
import { UserIsNotAuthenticated } from 'utils/router'
import SignupForm from '../components/SignupForm/SignupForm'
import cssclasses from './SignupContainer.scss'
import IconButton from 'material-ui-next/IconButton'
import { withStyles } from 'material-ui-next/styles'
import Dialog  , { DialogTitle, DialogContent }from 'material-ui-next/Dialog'
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
  ({firebase}) => ({
    authError: pathToJS(firebase, 'authError')
  })
)
class Signup extends Component {
  static contextTypes = {
    router: PropTypes.object.isRequired
  }
  static propTypes = {
    firebase: PropTypes.object,
    authError: PropTypes.object
  }

  state = {
    snackCanOpen: false,
    loging:false
  }

  handleSignup = (creds) => {
    this.setState({
      snackCanOpen: true
    })
    const { createUser, login } = this.props.firebase
    createUser(creds, { email: creds.email, displayName: creds.username })
      .then(() => {
        login(creds)
      })
  }

  providerLogin = (provider) => {
    this.setState({
      snackCanOpen: true,
      loging:true
    })
    this.props.firebase
   .login({ provider, type: 'popup' })
   .then(account => this.context.router.push(LIST_PATH))
   .catch(()=>this.setState({loging:false}))
    //this.props.firebase.login({ provider })
  }

  render () {
    const { authError, classes } = this.props
    const { snackCanOpen, loging} = this.state
    /*<GoogleButton onClick={() => this.providerLogin('google')} />*/
    return (
      <div className={cssclasses.container}>
        <Paper className={cssclasses.panel}>
          <img height="130" width="130" src='image/logo.png' /> <br />
          <SignupForm onSubmit={this.handleSignup} />
        </Paper>
        <div className={cssclasses.or}>
          或使用以下註冊
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
        </div>
        <Dialog open={ loging&&   !(isLoaded(authError) && !isEmpty(authError)) ? true:false} /*onRequestClose={this.handlecanceldialogClose}*/>
          <DialogContent>
                <h2>登入中...</h2>
          </DialogContent>
        </Dialog>
        <div className={cssclasses.login}>
          <span className={cssclasses['login-label']}>
            已經有帳號了嗎?
          </span>
          <Link className={cssclasses['login-link']} to={LOGIN_PATH}>
            請登入
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
              onRequestClose={() => this.setState({ snackCanOpen: false })}
            />
        }
      </div>
    )
  }
}

Signup.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Signup)
