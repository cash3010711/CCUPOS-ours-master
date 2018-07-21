import React, { Component, PropTypes } from 'react'
import Drawer from 'material-ui/Drawer'
import {Link} from 'react-router'
import FontIcon from 'material-ui/FontIcon'
import {List, ListItem} from 'material-ui/List';
import { connect } from 'react-redux'
import {
  firebaseConnect
} from 'react-redux-firebase'

import style from 'styles/sidebar'
import { setSidebar, closeSidebar } from 'store/sidebarActions'

@firebaseConnect()

class Sidebar extends React.Component{
  static contextTypes = {
    router: PropTypes.object.isRequired
  }

  handleLogout = () => {
    this.props.dispatch(closeSidebar())
    this.props.firebase.logout()
    this.context.router.push('/')
  }

    render(){
        return(
            <div>
               <Drawer docked={false} open={this.props.open} onRequestChange={(open) => this.props.dispatch(setSidebar(open))}>
                    <List>
                        <Link to="/"><ListItem onTouchTap={() => this.props.dispatch(closeSidebar())} primaryText="菜單" leftIcon={<FontIcon style={style.sidebarFontSize()} className="fa fa-home"/>}/></Link>
                        <Link to="/cart"><ListItem onTouchTap={() => this.props.dispatch(closeSidebar())} primaryText="進貨" leftIcon={<FontIcon style={style.sidebarFontSize()} className="fa fa-shopping-cart"/>}/></Link>
                        <Link to="/order"><ListItem onTouchTap={() => this.props.dispatch(closeSidebar())} primaryText="訂單" leftIcon={<FontIcon style={style.sidebarFontSize()} className="fa fa-list-alt"/>}/></Link>
                        <Link to="/flowio"><ListItem onTouchTap={() => this.props.dispatch(closeSidebar())} primaryText="進出貨及庫存查詢" leftIcon={<FontIcon style={style.sidebarFontSize()} className="fa fa-heart"/>}/></Link>
                        <ListItem primaryText="登出" onTouchTap={this.handleLogout} leftIcon={<FontIcon style={style.sidebarFontSize()} className="fa fa-sign-out"/>}/>
                    </List>
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
