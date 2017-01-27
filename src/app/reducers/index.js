/* @flow */

import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import {firebaseStateReducer} from 'redux-react-firebase'
import orders from './orders'
import login from './login'

const rootReducer = combineReducers({
  orders,
  login,
  form: formReducer,     // <---- Mounted at 'form' for redux-form
  firebase: firebaseStateReducer
})

export default rootReducer
