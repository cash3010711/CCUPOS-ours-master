import React , {PropTypes} from 'react'
import Navbar from 'containers/Navbar/Navbar'
import Sidebar from 'containers/Sidebar/Sidebar'
import classes from './CoreLayout.scss'
import 'styles/core.scss'
import Notifications from 'react-notification-system-redux';
import { connect } from 'react-redux'
import equal from 'deep-equal'
import { firebaseConnect,pathToJS} from 'react-redux-firebase'
import PushNotification from './PushNotification'

function mapStateToProps(state) {
  return{ notifications: state.notifications };
}

@firebaseConnect()
@connect(  mapStateToProps)
@connect(
  ({firebase})  => ({
    auth: pathToJS(firebase, 'auth'),
})
)


class CoreLayout extends React.Component {

  shouldComponentUpdate(nextProps, nextState) {

    return !(equal(this.props,nextProps) && equal(this.state,nextState))
       //return shallowCompare(this, nextProps, nextState);
     }



    render() {

      const {notifications} = this.props;
      const style = {
        Containers: {
          tr: {
            top: '60px',
            bottom: 'auto',
            left: 'auto',
            right: '0px'
              }
            }
     };

      return (

  <div className={classes.container} >
    {this.props.auth?<PushNotification {...this.props} />:null}
    <Navbar />
    <Sidebar    />
    <div className={classes.children}>

      <Notifications notifications={notifications}  style={style}  />
      {this.props.children}
    </div>
  </div>

)
  }

}


export default CoreLayout
