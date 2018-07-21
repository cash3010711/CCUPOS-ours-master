import { combineReducers } from 'redux'
import { firebaseStateReducer as firebase } from 'react-redux-firebase'
import locationReducer from './location'
import { reducer as form } from 'redux-form'
import sidebarReducers from './sidebarReducers';
import cartReducers from './cartReducers';
import billcombineReducers from './billcombineReducers'
import {reducer as notifications} from 'react-notification-system-redux';

export const makeRootReducer = (asyncReducers) => {
  return combineReducers({
    // Add sync reducers here
    firebase,
    notifications,
    sidebar: sidebarReducers,
    cart: cartReducers,
    combine: billcombineReducers,
    form,
    location: locationReducer,
    ...asyncReducers
  })
}

export const injectReducer = (store, { key, reducer }) => {
  store.asyncReducers[key] = reducer
  store.replaceReducer(makeRootReducer(store.asyncReducers))
}

export default makeRootReducer
