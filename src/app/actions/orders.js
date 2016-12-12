/* @flow weak */

import { UPDATE_ORDER_VALUES, SET_ORDERS, SET_SELECTED_ORDER, SET_PAGINATION_AT } from '../constants'
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
export function rfgridClientLogin () {
  return dispatch => {
    return rfgrid.login()
  }
}

export function getOrdersAsync (limit = 999) {
  return dispatch => {
    let p1 = rfgrid.plumbingordersRequest()
    let p2 = rfgrid.authedRequest('plumbingorders?ql=select * order by human_readable_id&limit=' + limit).then(jsonParse)

    return Promise.all([p1, p2])
    .then(([plumbingordersData, locksKeysData]) => {
      let data = plumbingordersData.map((d) => {
        let matchedData = locksKeysData.entities.find((lkData) => lkData.el_id === d.PlumbingOrder._id)
        return Object.assign({}, d.PlumbingOrder, matchedData)
      })
      dispatch(setOrders(data))
      if (data.length > 0) {
        dispatch(setSelectedOrder(data[0]))
      }
    })
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
        dispatch(updateOrderValues(result.entities[0].el_id, result.entities[0])) // TODO hacky with these ids..
      }
    })
    .catch(requestFailed)
  }
}
