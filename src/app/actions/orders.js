/* @flow weak */

import { UPDATE_ORDER_VALUES, SET_ORDERS, SET_SELECTED_ORDER } from '../constants'
import { jsonParse, statusCheck, requestFailed } from './async.utils'
import rfgrid from './rfgrid'

export function setOrders (orders) {
  return {
    type: SET_ORDERS,
    payload: { orders }
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

export function updateOrderValues (uuid, values) {
  return {
    type: UPDATE_ORDER_VALUES,
    payload: { uuid, values }
  }
}

// Async actions
export function rfgridClientLogin () {
  return dispatch => {
    return rfgrid.login()
  }
}

export function getOrdersAsync (limit = 999) {
  return dispatch => {
    return rfgrid.authedRequest('plumbingorders?ql=select * order by human_readable_id&limit=' + limit)
    .then(statusCheck)
    .then(jsonParse)
    .then(data => {
      dispatch(setOrders(data.entities))
      if (data.entities.length > 0) {
        dispatch(setSelectedOrder(data.entities[0]))
      }
      return data
    })
    .catch(requestFailed)
  }
}

export function saveOrderData (uuid, values) {
  return dispatch => {
    let updateRequest = { method: 'PUT', body: JSON.stringify(values), mode: 'cors' }
    return rfgrid.authedRequest('plumbingorders/' + uuid, updateRequest)
    .then(statusCheck)
    .then(jsonParse)
    .then(result => {
      if (result.entities.length > 0) {
        dispatch(updateOrderValues(uuid, result.entities[0]))
      }
    })
    .catch(requestFailed)
  }
}
