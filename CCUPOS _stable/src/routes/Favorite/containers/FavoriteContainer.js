import React from 'react'

import { UserIsAuthenticated } from 'utils/router'
import Navigation from '../components/Navigation/Navigation'

@UserIsAuthenticated // redirect to /login if user is not authenticated



export default class Favorite extends React.Component {

  render() {
    return (

      <div style={{'backgroundColor':'#fff9e6','height':'100%','width':'100%'}}>


     <Navigation />


      </div>

    );
  }
}
