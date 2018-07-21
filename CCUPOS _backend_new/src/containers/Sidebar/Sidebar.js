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
import { setSidebar, closeSidebar } from 'store/sidebarActions'
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

  handleLogout = () => {
    this.props.dispatch(closeSidebar())
    this.props.firebase.logout()
    this.context.router.push('/')
  }

    render(){
      const { account} = this.props
      const accountExists = isLoaded(account) && !isEmpty(account)
        return(
            <div>
               <Drawer  open={this.props.open} onRequestClose={()=>this.props.dispatch(setSidebar(false))}>
                 <Card style={{ width : 200 ,background:'rgba(215,215,177,0.6)'}}>
                  <CardMedia
                style={{ height: 200 }}
                image="/image/logo.png"
                onClick={() => { this.context.router.push(LIST_PATH);  this.props.dispatch(closeSidebar())}}
                title="logo"
                />


                </Card>
                 <div tabIndex={0} role="button">
                 <div style={{ width : 200}}>
                 <List >
                  <Divider />
                 <ListItem button onClick={() => { this.context.router.push(LIST_PATH);  this.props.dispatch(closeSidebar())}}  >
                 <ListItemIcon>
                  <FontIcon style={style.sidebarFontSize()} className="fa fa-home" />
                 </ListItemIcon>
                 <ListItemText primary="菜單" />
                 </ListItem>

                 <ListItem button onClick={() => { this.context.router.push(ORDER_PATH);  this.props.dispatch(closeSidebar())}}>
                 <ListItemIcon>
                  <FontIcon style={style.sidebarFontSize()} className="fa fa-list-alt" />
                 </ListItemIcon>
                 <ListItemText primary="銷售紀錄" />
                 </ListItem>

                 <ListItem button onClick={() => { this.context.router.push(TABLE_PATH);  this.props.dispatch(closeSidebar())}} >
                 <ListItemIcon>
                  <FontIcon style={style.sidebarFontSize()} className="fa fa-users" />
                 </ListItemIcon>
                 <ListItemText primary="店內座位" />
                 </ListItem>

                   <Divider />
                  {accountExists?
                 <ListItem button onClick={() => { this.handleLogout(); this.props.dispatch(closeSidebar())}} >
                 <ListItemIcon>
                  <FontIcon style={style.sidebarFontSize()} className="fa fa-sign-out" />
                 </ListItemIcon>
                 <ListItemText primary="登出" />
                 </ListItem>
                  :null}
               </List>
             </div>
              </div>
                 </Drawer>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        open: state.sidebar.open
    }
}

export default connect(mapStateToProps)(Sidebar)
