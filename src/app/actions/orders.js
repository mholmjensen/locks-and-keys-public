/* @flow */
import {SET_ORDERS, SET_SELECTED_ORDER, SET_ORDERS_LOADED, SET_SORT} from '../constants'

import ThunkClient from './thunkclient'

export function setSort (selectedDataKey) {
  return {
    type: SET_SORT,
    payload: { sortBy: selectedDataKey }
  }
}

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

export function setOrdersLoaded (ordersLoaded) {
  return dispatch => {
    dispatch({
      type: SET_ORDERS_LOADED,
      payload: { ordersLoaded }
    })
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
    })
  }
}
