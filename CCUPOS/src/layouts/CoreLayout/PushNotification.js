import React , {PropTypes} from 'react'
import { reduxFirebase as rfConfig } from 'config'

class PushNotification extends React.Component {

  componentDidMount () {

    const messaging = this.props.firebase.messaging()
   /*react-redux-firebase沒有寫好,如無法使用需修改/node_moudle/react-redux-firebase/lib/compose.js 新增require('firebase/messaging');*/
      messaging.requestPermission()
   .then(()=> {
     console.log('Notification permission granted.');
    return messaging.getToken()
  })
  .then((token)=>{
    this.props.firebase
      .update(`${rfConfig.userProfile}/${this.props.auth.uid}`, {'deviceId':`${token}`})
      .catch(err => {
        console.error('Error updating account', err) // eslint-disable-line no-console
        // TODO: Display error to user
      })
    //console.log(token)


  })
    .catch(function(err) {
      console.log('Unable to get permission to notify.', err);
    });


  }


    render() {
     return (null);
  }

}

export default PushNotification
