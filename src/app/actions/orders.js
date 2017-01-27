/* @flow */

import {SET_ORDERS, SET_SELECTED_ORDER, SET_PAGINATION_AT} from '../constants'

import ThunkClient from './thunkclient'

export function clearOrders () {
  return {
    type: SET_ORDERS,
    payload: { orders: [] }
  }
}

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

// Async (thunk'ed) actions
let client = ThunkClient()
export function getOrdersAsync (limit = 999) {
  return dispatch => {
    return client.plumbingordersRequest()
    .then(plumbingordersData => {
      let data = plumbingordersData.map((d) => {
        let usedKeys = ['_id', 'Creator', 'PlumbingItem', 'stand_name', 'stand_number', 'contact_name', 'contact_phone', 'contact_email', 'people_pro_location', 'OrderStatus', 'human_readable_id', 'organisation_name', 'remarks', 'Comment']
        let usedData = {}
        usedKeys.forEach(key => { usedData[key] = d.PlumbingOrder[key] })
        return usedData
      })
      dispatch(setOrders(data))
      if (data.length > 0) { // TODO remove for release, data[0] has no firebase data at this point
        dispatch(setSelectedOrder(data[0]))
      }
    })
  }
}
