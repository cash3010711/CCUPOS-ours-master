import React , {PropTypes} from 'react'
import Navbar from 'containers/Navbar/Navbar'
import Sidebar from 'containers/Sidebar/Sidebar'
import classes from './CoreLayout.scss'
import 'styles/core.scss'
import Notifications from 'react-notification-system-redux';
import { connect } from 'react-redux'

function mapStateToProps(state) {
  return{ notifications: state.notifications };
}


@connect(
  mapStateToProps
)
class CoreLayout extends React.Component {

    render() {

      const {notifications} = this.props;

      return (
  <div className={classes.container} >
    <Notifications notifications={notifications}   />
    <Navbar />
    <Sidebar    />
    <div className={classes.children}>
      {this.props.children}
    </div>
  </div>
)
  }

}


export default CoreLayout
