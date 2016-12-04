import { connect } from 'react-redux'
import { getOrdersAsync, rfgridClientLogin } from '../../actions/orders'
import OrderOverview from './OrderOverview.component'

const mapStateToProps = (state, ownProps) => {
  return { // Becomes Props on Selection
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
    }
  }
}

const OrderOverviewCont = connect(
  mapStateToProps,
  mapDispatchToProps
)(OrderOverview)

export default OrderOverviewCont
