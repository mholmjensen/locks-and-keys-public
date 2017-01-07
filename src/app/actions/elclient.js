/* @flow weak */

import { jsonParse, requestFailed } from './async.utils'
import fetchJsonp from 'fetch-jsonp'

class ElClient {
  plumbingordersRequest () {
    console.log('plumbingordersRequest')
    return fetchJsonp('http://172.28.128.3/PlumbingOrders/json_export.json', { timeout: 20000 })
      .then(jsonParse)
      .then((response) => {
        console.log('plumbingordersRequest response')
        return response.orders
      })
      .catch(requestFailed)
  }
}

export default () => new ElClient()
