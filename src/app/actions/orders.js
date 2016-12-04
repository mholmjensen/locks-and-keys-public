/* @flow weak */

import { SET_ORDERS, SET_SELECTED_ORDER } from '../constants'
import { jsonParse, statusCheck, requestFailed } from './async.utils'

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

// Async actions

let ordersUrl = 'backend/rfgrid/octopussy/plumbingorders'
let authUrl = 'backend/rfgrid/octopussy/token'
let authChallenge = {
  method: 'POST',
  body: 'grant_type=password&username=rfgriduser&password=rfgriduser',
  headers: new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' }),
  mode: 'no-cors'
}

let ACCESSTOKEN = ''
let authedPipe = (additionalRequestOpts = {}) => {
  if (ACCESSTOKEN) {
    let authHeaders = new Headers()
    authHeaders.append('Authorization', 'Bearer ' + ACCESSTOKEN)
    let authedOpts = { method: 'GET', headers: authHeaders, mode: 'cors' } // CORS mode necessary for Authorization header to be acceptable to fetch
    return Object.assign({}, authedOpts, additionalRequestOpts)
  } else {
    throw Error('ACCESSTOKEN not set, cannot make authedPipe')
  }
}

function rfgridAuthentication () {
  return fetch(authUrl, authChallenge)
    .then(statusCheck)
    .then(jsonParse)
    .then((r) => { return r.access_token })
    .catch(requestFailed)
}

export function rfgridClientLogin () {
  return dispatch => {
    return rfgridAuthentication()
    .then((grantedAccessToken) => {
      ACCESSTOKEN = grantedAccessToken
      return true
    })
    .catch(requestFailed)
  }
}

export function getOrdersAsync () {
  return dispatch => {
    // TODO pagination
    return fetch(ordersUrl + '?ql=select * order by human_readable_id&limit=30', authedPipe())
    .then(statusCheck)
    .then(jsonParse)
    .then(data => {
      dispatch(setOrders(data.entities))
      return data
    })
    .then(data => {
      if (data.entities.length > 0) {
        dispatch(setSelectedOrder(data.entities[0]))
      }
    })
    .catch(requestFailed)
  }
}
