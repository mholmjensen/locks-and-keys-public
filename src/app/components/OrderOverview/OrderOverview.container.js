import { connect } from 'react-redux'
import { getOrdersAsync } from '../../actions/orders'
import OrderOverview from './OrderOverview.component'

const mapStateToProps = (state, ownProps) => {
  return { // Becomes Props on Selection
    selectedEntry: state.orders.selectedEntry
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    'getOrdersAsync': () => {
      dispatch(getOrdersAsync())
    }
  }
}

const OrderOverviewCont = connect(
  mapStateToProps,
  mapDispatchToProps
)(OrderOverview)

export default OrderOverviewCont
