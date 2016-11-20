/* @flow */

import { connect } from 'react-redux'
import { setSelectedOrder } from '../../../actions/orders'
import OrderTable from './OrderTable.component'

function recurseForString (obj, string) {
  if (string === '') {
    return true
  }
  if (obj instanceof String || typeof obj === 'string') { // LHS does not hold for e.g. "str"
    return obj.includes(string)
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

const mapStateToProps = (state, ownProps) => {
  let lk = state.form.tablefilter ? state.form.tablefilter.values.lookup : ''
  let allOrders = state.orders.entries
  let filteredOrders = allOrders.filter((o) => recurseForString(o, lk))

  return {
    orders: filteredOrders,
    initialValues: {lookup: ''} // redux-form intialization
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    'setSelectedOrder': (order) => {
      dispatch(setSelectedOrder(order))
    }
  }
}

const OrderTableCont = connect(
  mapStateToProps,
  mapDispatchToProps
)(OrderTable)

export default OrderTableCont
