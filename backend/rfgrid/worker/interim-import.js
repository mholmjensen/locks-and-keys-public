var fetch = require('node-fetch');
var deepcopy = require('deepcopy');

function statusCheck (response) {
  if (response.status >= 200 && response.status < 300) {
    return Promise.resolve(response)
  } else if (response.status === 401 || response.status === 404) {
    return Promise.reject()
  } else {
    return Promise.reject(new Error(response.statusText))
  }
}

function jsonParse (response) {
  return response.json()
}

function requestFailed (error, name) {
  if (error) {
    console.log('Request to backend failed', name || '', error)
  }
}


var ACCESSTOKEN = ''

var ordersUrl = 'http://localhost:8080/rfgrid/octopussy/plumbingorders'
var authUrl = 'http://localhost:8080/rfgrid/octopussy/token'
var importUrl = 'http://172.28.128.3/PlumbingOrders/json_export.json'

var insertCount = 0
var failedInsertCount = 0

function insertOrder(json) {
  return fetch(ordersUrl, { method: 'POST', body: JSON.stringify(json), headers: { Authorization: 'Bearer ' + ACCESSTOKEN } })
  .then(jsonParse)
  .then(data => {
    insertCount += 1
    if(data.error) {
      console.log('Skipping insert', insertCount, '|', data.error, data.error_description)
    } else {
      console.log('  inserted', insertCount, '|', JSON.stringify(data).length, data.entities[0].name, data.entities[0].uuid)
    }
    return data
  })
  .catch(err => {
    failedInsertCount += 1
    requestFailed(err, 'insertOrder')
  })
}

function authWithUsergrid() {
  var authPayload = 'grant_type=password&username=rfgriduser&password=rfgriduser'
  return fetch(authUrl, { method: 'POST', body: authPayload })
  .then(jsonParse)
  .then(data => {
    if(data.access_token) {
      console.log("Authed succesfully", data.access_token)
      ACCESSTOKEN = data.access_token
      fetch(ordersUrl + '?limit=99990', { method: 'DELETE', headers: { Authorization: 'Bearer ' + ACCESSTOKEN } })
      .then(() => {
        getOrdersAsync()
      })
    } else {
      console.log('No access_token from usergrid auth request', data.error)
    }
  })
}

function getOrdersAsync () {
  console.log('Fetching orders from saerbestilling:', importUrl)
  return fetch(importUrl, { jsonpCallback: 'callback', jsonpCallbackFunction: 'callback' })
  .then(jsonParse)
  .then(data => {
    let makeBatch = (slice) => {
      return slice.map((order) => {
        var plumbingorder = deepcopy(order.PlumbingOrder)
        plumbingorder.name = plumbingorder.human_readable_id
        plumbingorder.Area = ''
        return insertOrder(plumbingorder)
      })
    }
    let startAndWait = (from, orders) => {
      if (from >= orders.length) {
        return
      }
      var batchSize = 25
      var to = data.orders.length > from + batchSize ? from + batchSize : data.orders.length
      console.log('- Starting batch insert from', from, 'to', to)
      Promise.all(makeBatch(data.orders.slice(from, to))).then(() => {
        console.log('- Finished inserting', from, 'to', to)
        startAndWait(to, orders)
      })
    }
    startAndWait(0, data.orders)
  })
  .catch(requestFailed)
}

authWithUsergrid()
