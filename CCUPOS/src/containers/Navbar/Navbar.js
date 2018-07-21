import React, { Component, PropTypes } from 'react'
import classes from './Navbar.scss'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import {
  firebaseConnect,
  pathToJS,
  isLoaded,
  isEmpty
} from 'react-redux-firebase'
import {
  LIST_PATH,
  ACCOUNT_PATH,
  LOGIN_PATH,
  SIGNUP_PATH
} from 'constants/paths'
import Badge from 'material-ui/Badge'
// Components
import AppBar from 'material-ui/AppBar'
import IconMenu from 'material-ui/IconMenu'
import IconButton from 'material-ui/IconButton'
import MenuItem from 'material-ui/MenuItem'
import FlatButton from 'material-ui/FlatButton'
import DownArrow from 'material-ui/svg-icons/hardware/keyboard-arrow-down'
import Avatar from 'material-ui/Avatar'
import defaultUserImage from 'static/User.png'
import { openSidebar } from 'store/sidebarActions'
import FontIcon from 'material-ui/FontIcon'
import MediaQuery from 'react-responsive'
import { translate } from 'react-i18next'

const buttonStyle = {
  color: 'blueGrey700',
  textDecoration: 'none',
  alignSelf: 'center',
  fontSize: '50px'
}



const avatarStyles = {
  wrapper: { marginTop: 0 },
  button: { marginRight: '.5rem', width: '200px', height: '64px' },
  buttonSm: { marginRight: '.5rem', width: '30px', height: '64px', padding: '0' }
}

@firebaseConnect()
@connect(
  ({firebase , cart})  => ({
    authError: pathToJS(firebase, 'authError'),
    auth: pathToJS(firebase, 'auth'),
    account: pathToJS(firebase, 'profile'),
    cart: cart
})

)

class Navbar extends Component {
  static contextTypes = {
    router: PropTypes.object.isRequired
  }

  static propTypes = {
    auth: PropTypes.object,
    account: PropTypes.object,
    firebase: PropTypes.object.isRequired,
  }
  constructor(){
        super()
        this.handleToggle = this.handleToggle.bind(this)

    }

  handleLogout = () => {
    this.props.firebase.logout()
    this.context.router.push('/')
  }

  handleToggle = () => {
      this.props.dispatch(openSidebar())
  }

  calcuNumber(){

    const cart = this.props.cart;
    return Object.keys(cart).reduce((val, old)=>val+cart[old].count, 0)
  }

  render () {

    const { account, t } = this.props
    const accountExists = isLoaded(account) && !isEmpty(account)
    const iconButton = (
      <IconButton style={avatarStyles.button} disableTouchRipple>
        <div className={classes.avatar}>
          <div className='hidden-mobile'>
            <Avatar
              src={accountExists && account.avatarUrl ? account.avatarUrl : defaultUserImage}
            />
          </div>
          <div className={classes['avatar-text']}>
            <span className={`${classes['avatar-text-name']} hidden-mobile`}>
              { accountExists && account.displayName ? account.displayName : 'User' }
            </span>
            <DownArrow color='blueGrey700' />
          </div>
        </div>
      </IconButton>
    )

    const mainMenu = (
      <div className={classes.menu}>
        <Link to={SIGNUP_PATH}>
          <FlatButton
            label={t('signup')}
            style={buttonStyle}
          />
        </Link>
        <Link to={LOGIN_PATH}>
          <FlatButton
            label={t('login')}
            style={buttonStyle}
          />
        </Link>
        <Badge badgeContent={this.calcuNumber()} secondary={true} style={{maxWidth:70}} badgeStyle={{top: 10, right: 10}}>
                <Link to="/cart">
            <IconButton tooltip="Cart">
          <FontIcon className="fa fa-shopping-cart" />
                    </IconButton>
            </Link>
       </Badge>
      </div>
    )

    const rightMenu = accountExists ? (

    <div >

      <MediaQuery minDeviceWidth={700}>
      <IconMenu
        iconButtonElement={iconButton}
        targetOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
        animated={false}

      >
        <MenuItem
          primaryText={t('account')}
          onClick={() => this.context.router.push(ACCOUNT_PATH)}
        />
        <MenuItem
          primaryText={t('logout')}
          onClick={this.handleLogout}
        />
      </IconMenu>
    </MediaQuery>

      <Badge >
              <Link to="/account">
          <IconButton tooltip="account">
        <FontIcon className="fa fa-user" />
                  </IconButton>
          </Link>
    </Badge>

      <Badge badgeContent={this.calcuNumber()} secondary={true} badgeStyle={{top: 20, right: 20}}>
              <Link to="/cart">
          <IconButton tooltip="Cart">
        <FontIcon className="fa fa-shopping-cart" />
                  </IconButton>
          </Link>
     </Badge>
   </div>
    ) : mainMenu
    return (
      <div  >

      <AppBar

        onLeftIconButtonTouchTap={this.handleToggle}
        iconElementRight={rightMenu}
        style = {{background:'rgba(215,215,177,0.6)' ,  height: '65px'} }
        iconStyleRight={accountExists ? avatarStyles.wrapper : {}}
        className={classes.appBar}

      >



      </AppBar>
      </div>
    )
  }
}

export default translate()(Navbar)
