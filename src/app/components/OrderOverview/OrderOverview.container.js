import {connect} from 'react-redux'
import {setSelectedOrder, getOrdersAsync} from '../../actions/orders'
import OrderOverview from './OrderOverview.component'

const mapStateToProps = (state, ownProps) => {
  return {
    selectedEntry: state.orders.selectedEntry
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
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
