import { connect } from 'react-redux'
import { setSelectedOrder, getOrdersAsync, rfgridClientLogin } from '../../actions/orders'
import OrderOverview from './OrderOverview.component'

const mapStateToProps = (state, ownProps) => {
  return {
    selectedEntry: state.orders.selectedEntry
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    'rfgridClientLogin': () => {
      return dispatch(rfgridClientLogin())
    },
    'getOrdersAsync': () => {
      return dispatch(getOrdersAsync())
    },
    'setSelectedOrder': (order) => {
      dispatch(setSelectedOrder(order))
    }
  }
}

const OrderOverviewCont = connect(
  mapStateToProps,
  mapDispatchToProps
)(OrderOverview)

export default OrderOverviewCont
