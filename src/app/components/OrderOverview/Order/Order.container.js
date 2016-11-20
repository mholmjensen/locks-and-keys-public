/* @flow */

import { connect } from 'react-redux'
import { setSelectedOrder } from '../../../actions/orders'
import { setEditedEntry } from '../../../actions/toolbar'
import Order from './Order.component'

const mapStateToProps = (state, ownProps) => {
  return {
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    'setSelectedOrder': (order) => {
      dispatch(setSelectedOrder(order))
    },
    'setEditedEntry': (order) => {
      dispatch(setEditedEntry(order))
    }
  }
}

const OrderCont = connect(
  mapStateToProps,
  mapDispatchToProps
)(Order)

export default OrderCont
