// We only need to import the modules necessary for initial render
import CoreLayout from '../layouts/CoreLayout/CoreLayout'
import MenuRoute from './Menu'
import LoginRoute from './Login'
import SignupRoute from './Signup'
import CartRoute from './Cart'
import OrderRoute from './Order'
import FavoriteRoute from './Favorite'
import AccountRoute from './Account'
import TableRoute from './Table'
import RecoverRoute from './Recover'
import InstructionsRoute from './Instructions'
import HealthrecommandationRoute from './Favorite/components/Healthrecommandation'
/*  Note: Instead of using JSX, we recommend using react-router
    PlainRoute objects to build route definitions.   */

export const createRoutes = (store) => ({
  path: '/',
  component: CoreLayout,
  indexRoute: MenuRoute(store),
  childRoutes: [
    AccountRoute(store),
    LoginRoute(store),
    SignupRoute(store),
    CartRoute(store),
    OrderRoute(store),
    FavoriteRoute(store),
    TableRoute(store),
    RecoverRoute(store),
    HealthrecommandationRoute(store),
    InstructionsRoute(store)
    //NotFoundRoute(store)
  ]
})

/*  Note: childRoutes can be chunked or otherwise loaded programmatically
    using getChildRoutes with the following signature:

    getChildRoutes (location, cb) {
      require.ensure([], (require) => {
        cb(null, [
          // Remove imports!
          require('./Counter').default(store)
        ])
      })
    }

    However, this is not necessary for code-splitting! It simply provides
    an API for async route definitions. Your code splitting should occur
    inside the route `getComponent` function, since it is only invoked
    when the route exists and matches.
*/

export default createRoutes
