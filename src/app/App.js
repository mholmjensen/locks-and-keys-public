import React from 'react'
import ReactDOM from 'react-dom'

import thunkMiddleware from 'redux-thunk'
import createLogger from 'redux-logger'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'

import rootReducer from './reducers'
const loggerMiddleware = createLogger()

// Initial state of store is handled by individual reducers
const store = createStore(
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
