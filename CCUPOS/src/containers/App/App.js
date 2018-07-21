import React, { Component, PropTypes } from 'react'
import { browserHistory, Router } from 'react-router'
import { Provider } from 'react-redux'

// Themeing/Styling
import Theme from '../../theme'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import {  createMuiTheme } from 'material-ui-next/styles'
import { I18nextProvider } from 'react-i18next';
import i18n from '../../i18n';
// Tap Plugin
//import injectTapEventPlugin from 'react-tap-event-plugin'
//injectTapEventPlugin()

export default class AppContainer extends Component {
  static childContextTypes = {
    muiTheme: PropTypes.object,
    theme: PropTypes.object
  }

  getChildContext = () => (
    {
      muiTheme: getMuiTheme(Theme), theme: createMuiTheme()
    }
  )

  static propTypes = {
    routes: PropTypes.object.isRequired,
    store: PropTypes.object.isRequired
  }

  render () {
    const { routes, store } = this.props
    return (
      <Provider store={store}>
        <div style={{ height: '100%' }}>
           <I18nextProvider i18n={ i18n }>
          <Router history={browserHistory}>
            {routes}
          </Router>
           </I18nextProvider>
        </div>
      </Provider>
    )
  }
}
