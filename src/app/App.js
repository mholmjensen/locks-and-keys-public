/* @flow */
/* global FIREBASE_CONFIG:true */
/* eslint no-undef: "error" */

import React from 'react'
import ReactDOM from 'react-dom'

import thunkMiddleware from 'redux-thunk'
import createLogger from 'redux-logger'
import {Provider} from 'react-redux'
import {createStore, applyMiddleware, compose} from 'redux'
import {reduxReactFirebase} from 'redux-react-firebase'

import rootReducer from './reducers'
import {Container} from './components/Container/Container'

const loggerMiddleware = createLogger()

const createStoreWithFirebase = compose(
  reduxReactFirebase(FIREBASE_CONFIG, {userProfile: 'users'})
)(createStore)

var middleWare = applyMiddleware(thunkMiddleware)// lets us dispatch() functions (for async support)

if (FIREBASE_CONFIG.authDomain.startsWith('locks-and-keys-staging.firebaseapp.com')) {
  middleWare = applyMiddleware(
    thunkMiddleware,
    loggerMiddleware
  )
}

// Initial state of store is handled by individual reducers
const store = createStoreWithFirebase(
  rootReducer,
  middleWare
)

ReactDOM.render(
  <Provider store={store}>
    <Container />
  </Provider>,
  document.getElementById('root')
)
