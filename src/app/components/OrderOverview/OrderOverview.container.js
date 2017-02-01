import {connect} from 'react-redux'
import {setSelectedOrder, getOrdersAsync, clearOrders} from '../../actions/orders'
import OrderOverview from './OrderOverview.component'

const mapStateToProps = (state, ownProps) => {
  return {
    selectedEntry: state.orders.selectedEntry,
    entriesLoaded: state.orders.entriesLoaded
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    'getOrdersAsync': () => {
      return dispatch(getOrdersAsync())
    },
    'setSelectedOrder': (order) => {
      dispatch(setSelectedOrder(order))
    },
    'clearOrders': () => {
      dispatch(clearOrders())
    }
  }
}

const OrderOverviewCont = connect(
  mapStateToProps,
  mapDispatchToProps
)(OrderOverview)

export default OrderOverviewCont
