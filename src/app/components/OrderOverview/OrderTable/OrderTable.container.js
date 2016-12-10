/* @flow */

import {connect} from 'react-redux'
import {setSelectedOrder, setPaginationAt} from '../../../actions/orders'
import {formValueSelector} from 'redux-form'

import OrderTable from './OrderTable.component'

function recurseForString (obj, string) { // TODO use server backed search, and/or cut down on json size/fields
  if (string === '') {
    return true
  }
  if (obj instanceof String || typeof obj === 'string') { // LHS does not hold for e.g. "str"
    return obj.toLowerCase().includes(string.toLowerCase())
  } else if (obj instanceof Object) {
    for (let key in obj) {
      if (obj.hasOwnProperty(key)) {
        if (recurseForString(obj[key], string)) {
          return true
        }
      }
    }
  }
  return false
}

const selector = formValueSelector('datafilter')
const mapStateToProps = (state, ownProps) => {
  let lookup = selector(state, 'lookup')
  let resultCap = parseInt(selector(state, 'resultCap'))

  let filteredOrders = state.orders.entries.filter((o) => recurseForString(o, lookup))
  let filterCount = filteredOrders.length
  let totalOrderCount = state.orders.entries.length
  let paginationCount = Math.ceil(filterCount / resultCap)
  let paginationAt = state.orders.paginationAt
  let batchStart = paginationAt * resultCap
  let batchEnd = Math.min(batchStart + resultCap, filterCount)
  if (resultCap === 10000) {
    batchStart = 0
    batchEnd = filterCount
  }
  let orders = filteredOrders.slice(batchStart, batchEnd)
  return {
    orders,
    pagination: {
      lookup,
      resultCap,
      filterCount,
      totalOrderCount,
      count: paginationCount,
      at: paginationAt,
      start: batchStart + 1,
      end: batchEnd
    },
    initialValues: {  // redux-form intialization
      lookup: '',
      resultCap: 25
    }
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    'setSelectedOrder': (order) => {
      dispatch(setSelectedOrder(order))
    },
    'setPaginationAt': (at) => {
      dispatch(setPaginationAt(at))
    }
  }
}

const OrderTableCont = connect(
  mapStateToProps,
  mapDispatchToProps
)(OrderTable)

export default OrderTableCont
