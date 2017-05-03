/* @flow */
/* global EL_CONFIG:false */
/* eslint no-undef: "error" */

import fetchJsonp from 'fetch-jsonp'

class ThunkClient {
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
