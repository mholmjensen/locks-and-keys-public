/* @flow */

import {connect} from 'react-redux'
import {setSelectedOrder, setSort} from '../../../actions/orders'
import OrderTable from './OrderTable.component'

const mapStateToProps = (state, ownProps) => {
  return {
    viewSettings: {
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
