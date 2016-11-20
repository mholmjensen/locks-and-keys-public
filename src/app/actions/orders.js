/* @flow weak */

import { SET_ORDERS, SET_SELECTED_ORDER } from '../constants'
import { jsonParse, requestFailed } from './async.utils'

import fetchJsonp from 'fetch-jsonp'

export function setOrders (orders) {
  return {
    type: SET_ORDERS,
    payload: { orders }
  }
}

export function getOrdersAsync () {
  return dispatch => {
    return fetchJsonp('http://172.28.128.3/PlumbingOrders/json_export.json', {
      jsonpCallback: 'callback',
      jsonpCallbackFunction: 'callback'
    })
      .then(jsonParse)
      .then(data => {
        dispatch(setOrders(data.orders))
        return data
      })
      .then(data => {
        if (data.length > 0) {
          dispatch(setSelectedOrder(data[0].PlumbingOrder))
        }
      }).catch(requestFailed)
  }
}

export function setSelectedOrder (order) {
  return dispatch => {
    dispatch({
      type: SET_SELECTED_ORDER,
      payload: { order }
    })
  }
}
