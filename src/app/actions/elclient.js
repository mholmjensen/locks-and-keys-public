/* @flow weak */

import { jsonParse, requestFailed } from './async.utils'
import fetchJsonp from 'fetch-jsonp'

class ElClient {
  plumbingordersRequest () {
    console.log('Making request for orders data to', EL_CONFIG.host, '[timeout =', EL_CONFIG.timeout, ']')
    return fetchJsonp(EL_CONFIG.host, { timeout: EL_CONFIG.timeout })
      .then(jsonParse)
      .then((response) => {
        return response.orders
      })
      .catch(requestFailed)
  }
}

export default () => new ElClient()
