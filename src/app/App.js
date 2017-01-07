import React from 'react'
import ReactDOM from 'react-dom'

import thunkMiddleware from 'redux-thunk'
import createLogger from 'redux-logger'
import {Provider} from 'react-redux'
import {createStore, applyMiddleware, compose} from 'redux'
import {reduxReactFirebase} from 'redux-react-firebase'

import rootReducer from './reducers'
const loggerMiddleware = createLogger()

const config = {
  apiKey: 'AIzaSyDl1OSOhOXi675utk-sh8h1i8P7H2Xkq9g',
  authDomain: 'rf-locks-and-keys.firebaseapp.com',
  databaseURL: 'https://rf-locks-and-keys.firebaseio.com',
  storageBucket: 'rf-locks-and-keys.appspot.com'
}

const createStoreWithFirebase = compose(
  reduxReactFirebase(config, {userProfile: 'users'}),
)(createStore)

// Initial state of store is handled by individual reducers
const store = createStoreWithFirebase(
  rootReducer,
  applyMiddleware(
    thunkMiddleware, // lets us dispatch() functions (for async support)
    loggerMiddleware
  )
)

import {Container} from './components/Container'

ReactDOM.render(
  <Provider store={store}>
    <Container />
  </Provider>,
  document.getElementById('root')
)
