/* @flow weak */

import { jsonParse, statusCheck, requestFailed } from './async.utils'
import fetchJsonp from 'fetch-jsonp'

let ACCESSTOKEN
let authChallenge = {
  method: 'POST',
  headers: new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' }),
  body: 'grant_type=password&username=rfgriduser&password=rfgriduser',
  mode: 'no-cors'
}

function rfgridAuthentication () {
  if (ACCESSTOKEN) {
    console.error('Attemping to authenticate with ACCESSTOKEN already set, skipping request')
    return Promise.resolve(true)
  }
  return fetch('backend/rfgrid/octopussy/token', authChallenge)
    .then(statusCheck)
    .then(jsonParse)
    .then((r) => {
      ACCESSTOKEN = r.access_token
      return true
    })
    .catch(requestFailed)
}

let authedRequestOpts = (additionalRequestOpts = {}) => {
  if (ACCESSTOKEN) {
    let authHeaders = new Headers()
    authHeaders.append('Authorization', 'Bearer ' + ACCESSTOKEN)
    let authedOpts = { method: 'GET', headers: authHeaders, mode: 'cors' } // CORS mode necessary for Authorization header to be acceptable to fetch
    let reqOpts = Object.assign({}, authedOpts, additionalRequestOpts)
    return reqOpts
  } else {
    throw Error('ACCESSTOKEN not set, cannot make authedRequest')
  }
}

let rfgridClient = {
  login: rfgridAuthentication,
  authedRequest: (resource = '', additionalRequestOpts = {}) => {
    let o = authedRequestOpts(additionalRequestOpts)
    return fetch('backend/rfgrid/octopussy/' + resource, o)
  },
  plumbingordersRequest: () => {
    return fetchJsonp('http://172.28.128.3/PlumbingOrders/json_export.json', { timeout: 20000 })
      .then(jsonParse)
      .then((response) => {
        return response.orders
      })
      .catch(requestFailed)
  }
}

export default rfgridClient
