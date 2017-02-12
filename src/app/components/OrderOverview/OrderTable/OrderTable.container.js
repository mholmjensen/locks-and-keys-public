/* @flow */

import {connect} from 'react-redux'
import {setSelectedOrder, setSort} from '../../../actions/orders'
import {formValueSelector} from 'redux-form'

import OrderTable from './OrderTable.component'

function recurseForString (obj, string) {
  if (!obj) return false
  if (string === '') return true

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
  let lookup = selector(state, 'lookup') || ''

  let filteredOrders = state.orders.entries.filter((o) => recurseForString(o, lookup))
  let totalOrderCount = state.orders.entries.length

  return {
    orders: filteredOrders,
    viewSettings: {
      lookup,
      totalOrderCount,
      sortBy: state.orders.sortBy,
      sortDirection: state.orders.sortDirection
    }
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    'setSelectedOrder': (order) => {
      dispatch(setSelectedOrder(order))
    },
    'setSort': (dataKey) => {
      dispatch(setSort(dataKey))
    }
  }
}

const OrderTableCont = connect(
  mapStateToProps,
  mapDispatchToProps
)(OrderTable)

export default OrderTableCont
