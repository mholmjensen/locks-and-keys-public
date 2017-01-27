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
const loggerMiddleware = createLogger()

const createStoreWithFirebase = compose(
  reduxReactFirebase(FIREBASE_CONFIG, {userProfile: 'users'}),
)(createStore)

// Initial state of store is handled by individual reducers
const store = createStoreWithFirebase(
  rootReducer,
  applyMiddleware(
    thunkMiddleware, // lets us dispatch() functions (for async support)
    loggerMiddleware
  )
)

import {Container} from './components/Container/Container'

ReactDOM.render(
  <Provider store={store}>
    <Container />
  </Provider>,
  document.getElementById('root')
)
