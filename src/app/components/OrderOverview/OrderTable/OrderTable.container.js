/* @flow */

import { connect } from 'react-redux'
import { setSelectedOrder } from '../../../actions/orders'
import OrderTable from './OrderTable.component'
import { formValueSelector } from 'redux-form';

function recurseForString (obj, string) { // TODO use usergrid backed search, or cut down on json size/fields
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

const selector = formValueSelector('datafilter')

const mapStateToProps = (state, ownProps) => {
  let lk = selector(state, 'lookup') || ''
  let rc = parseInt(selector(state, 'resultCount')) || 50

  let filteredOrders = state.orders.entries.filter((o) => recurseForString(o, lk))
  let cappedOrders = filteredOrders.slice(0, rc)
  return {
    orders: cappedOrders,
    lookup: lk,
    resultCount: rc,
    initialValues: {  // redux-form intialization
      lookup: '',
      resultCount: 50
    }
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
