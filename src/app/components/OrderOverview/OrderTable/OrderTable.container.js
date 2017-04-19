/* @flow */

import {connect} from 'react-redux'
import {setSelectedOrder, setSort, setInfoMessage} from '../../../actions/orders'
import lakutil from '../../../utils'
import OrderTable from './OrderTable.component'

const mapStateToProps = (state, ownProps) => {
  return {
    viewSettings: {
      sortBy: state.orders.sortBy,
      sortDirection: state.orders.sortDirection
    },
    toolbarSaveable: lakutil.toolbarSaveable(state.form.toolbar),
    infoMessage: state.orders.infoMessage,
    infoDuration: state.orders.infoDuration
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    'setSelectedOrder': (order) => {
      dispatch(setSelectedOrder(order))
    },
    'setSort': (dataKey) => {
      dispatch(setSort(dataKey))
    },
    'setInfoMessage': (message, duration) => {
      dispatch(setInfoMessage(message, duration))
    }
  }
}

const OrderTableCont = connect(
  mapStateToProps,
  mapDispatchToProps
)(OrderTable)

export default OrderTableCont
