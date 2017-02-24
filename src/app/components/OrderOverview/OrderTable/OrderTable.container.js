/* @flow */

import {connect} from 'react-redux'
import {setSelectedOrder, setSort} from '../../../actions/orders'
import lakutil from '../../../utils'
import OrderTable from './OrderTable.component'

const mapStateToProps = (state, ownProps) => {
  return {
    viewSettings: {
      sortBy: state.orders.sortBy,
      sortDirection: state.orders.sortDirection
    },
    toolbarSaveable: lakutil.toolbarSaveable(state.form.toolbar)
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
