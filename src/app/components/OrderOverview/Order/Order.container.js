/* @flow */

import { connect } from 'react-redux'
import { setSelectedOrder } from '../../../actions/orders'
import Order from './Order.component'

const mapStateToProps = (state, ownProps) => {
  return {
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    'setSelectedOrder': (order) => {
      dispatch(setSelectedOrder(order))
    }
  }
}

const OrderCont = connect(
  mapStateToProps,
  mapDispatchToProps
)(Order)

export default OrderCont
