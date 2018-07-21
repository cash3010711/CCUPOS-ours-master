import React, { Component, PropTypes } from 'react'
import Drawer from 'material-ui-next/Drawer'
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui-next/List'
import FontIcon from 'material-ui/FontIcon'
import Divider from 'material-ui-next/Divider'
import Card, { CardActions, CardContent, CardMedia } from 'material-ui-next/Card'
import Typography from 'material-ui-next/Typography'
import { connect } from 'react-redux'
import {
  firebaseConnect,
    pathToJS,
    isLoaded,
    isEmpty
} from 'react-redux-firebase'

import style from 'styles/sidebar'
import { setSidebar, closeSidebar, setLanguage } from 'store/sidebarActions'
import i18n from '../../i18n'
import Select from 'material-ui-next/Select'
import { FormHelperText } from 'material-ui-next/Form'
import { translate } from 'react-i18next'
//import MenuItem from 'material-ui/MenuItem'
import {
  LIST_PATH,
  CART_PATH,
  FAVORITE_PATH,
  ORDER_PATH,
  TABLE_PATH,
  INSTRUCTIONS_PATH
} from 'constants/paths'

@firebaseConnect()
@connect(
  ({firebase , cart})  => ({
    account: pathToJS(firebase, 'profile'),
})

)

class Sidebar extends Component{
  static contextTypes = {
    router: PropTypes.object.isRequired
  }
  constructor(props) {
  super(props)
  this.state = {
    language : this.props.language ?  this.props.language :'zh-TW'
    }
  }
  handleLogout = () => {
    this.props.dispatch(closeSidebar())
    this.props.firebase.logout()
    this.context.router.push('/')
  }
  handleLanguageChange =  event => {
    i18n.changeLanguage( event.target.value)
    this.props.dispatch(setLanguage(event.target.value))
    this.setState({ language: event.target.value });
   };

    render(){
      const { account, t } = this.props
      const accountExists = isLoaded(account) && !isEmpty(account)

        return(

               <Drawer  open={this.props.open} onRequestClose={()=>this.props.dispatch(setSidebar(false))}>
                 <Card style={{ width : 200 ,background:'rgba(215,215,177,0.6)'}}>
                  <CardMedia
                style={{ height: 200 }}
                image="/image/logo.png"
                onClick={() => { this.context.router.push(LIST_PATH);  this.props.dispatch(closeSidebar())}}
                title="logo"
                />
                <center>
                Language:
                <Select
                    style={{margin:3}}
                    native
                    value={this.state.language}
                    onChange={this.handleLanguageChange}

                    >

                      <option key={'zh-TW'} value="zh-TW">繁體中文</option>
                      <option key={'en'} value="en">English</option>

                    </Select>
                  </center>
                </Card>

                 <div tabIndex={0} role="button" style={{ width : 200}}>

                 <List >
                  <Divider />
                 <ListItem button onClick={() => { this.context.router.push(LIST_PATH);  this.props.dispatch(closeSidebar())}}  >
                 <ListItemIcon>
                  <FontIcon style={style.sidebarFontSize()} className="fa fa-home" />
                 </ListItemIcon>
                 <ListItemText primary={t('menu')} />
                 </ListItem>
                 <ListItem button onClick={() => { this.context.router.push(CART_PATH);  this.props.dispatch(closeSidebar())}} >
                 <ListItemIcon>
                  <FontIcon style={style.sidebarFontSize()} className="fa fa-shopping-cart" />
                 </ListItemIcon>
                 <ListItemText primary={t('cart')}  />
                 </ListItem>
                 <ListItem button onClick={() => { this.context.router.push(ORDER_PATH);  this.props.dispatch(closeSidebar())}}>
                 <ListItemIcon>
                  <FontIcon style={style.sidebarFontSize()} className="fa fa-list-alt" />
                 </ListItemIcon>
                 <ListItemText primary={t('order')}  />
                 </ListItem>
                 <Divider />
                 <ListItem button onClick={() => { this.context.router.push(FAVORITE_PATH);  this.props.dispatch(closeSidebar())}} >
                 <ListItemIcon>
                  <FontIcon style={style.sidebarFontSize()} className="fa fa-heart" />
                 </ListItemIcon>
                 <ListItemText primary={t('recommand')}  />
                 </ListItem>
                 <ListItem button onClick={() => { this.context.router.push(TABLE_PATH);  this.props.dispatch(closeSidebar())}} >
                 <ListItemIcon>
                  <FontIcon style={style.sidebarFontSize()} className="fa fa-users" />
                 </ListItemIcon>
                 <ListItemText primary={t('table')}  />
                 </ListItem>
                 <ListItem button onClick={() => { this.context.router.push(INSTRUCTIONS_PATH);  this.props.dispatch(closeSidebar())}} >
                 <ListItemIcon>
                  <FontIcon style={style.sidebarFontSize()} className="fa fa-question-circle" />
                 </ListItemIcon>
                 <ListItemText primary={t('information')}  />
                 </ListItem>
                   <Divider />
                  {accountExists?
                 <ListItem button onClick={() => { this.handleLogout(); this.props.dispatch(closeSidebar())}} >
                 <ListItemIcon>
                  <FontIcon style={style.sidebarFontSize()} className="fa fa-sign-out" />
                 </ListItemIcon>
                 <ListItemText primary={t('logout')}  />
                 </ListItem>
                  :null}
               </List>

              </div>
                 </Drawer>
      
        )
    }
}

function mapStateToProps(state) {
    return {
        open: state.sidebar.open
    }
}

export default translate()(connect(mapStateToProps)(Sidebar))
