/* @flow */
/* global EL_CONFIG:false */
/* eslint no-undef: "error" */

import fetchJsonp from 'fetch-jsonp'

class ThunkClient {
  statusCheck (response) {
    if (response.status >= 200 && response.status < 300) {
      return Promise.resolve(response)
    } else if (response.status === 401 || response.status === 404) {
      return Promise.reject()
    } else {
      return Promise.reject(new Error(response.statusText))
    }
  }

  jsonParse (response) {
    return response.json()
  }

  requestFailed (error) {
    if (error) {
      console.log('Error, request to backend failed', error)
    }
  }

  plumbingordersRequest () {
    return fetchJsonp(EL_CONFIG.host, { timeout: EL_CONFIG.timeout })
      .then(this.jsonParse)
      .then((response) => {
        return response.orders
      })
      .catch(this.requestFailed)
  }
}

export default () => new ThunkClient()
