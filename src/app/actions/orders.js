/* @flow weak */

import { UPDATE_ORDER_VALUES, SET_ORDERS, SET_SELECTED_ORDER, SET_PAGINATION_AT } from '../constants'

import ThunkClient from './thunkclient'

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

export function setPaginationAt (paginationAt) {
  return {
    type: SET_PAGINATION_AT,
    payload: { paginationAt }
  }
}

export function updateOrderValues (uuid, values) {
  return {
    type: UPDATE_ORDER_VALUES,
    payload: { uuid, values }
  }
}

// Async (thunk'ed) actions
let client = ThunkClient()
export function getOrdersAsync (limit = 999) {
  return dispatch => {
    return client.plumbingordersRequest()
    .then(plumbingordersData => {
      let data = plumbingordersData.map((d) => {
        let o = d.PlumbingOrder // TODO select fields we actually use
        return o
      })
      dispatch(setOrders(data))
      if (data.length > 0) {
        dispatch(setSelectedOrder(data[0]))
      }
    })
  }
}
