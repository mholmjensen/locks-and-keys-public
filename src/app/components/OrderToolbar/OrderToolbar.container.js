
import { connect } from 'react-redux'
import OrderToolbar from './OrderToolbar.component'
import { setSelectedOrder } from '../../actions/orders'

const mapStateToProps = (state, ownProps) => {
  return { // Becomes Props on Selection
    selectedEntry: state.orders.selectedEntry,
    initialValues: state.orders.selectedEntry // redux-form intialization
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    'setSelectedOrder': (order) => {
      dispatch(setSelectedOrder(order))
    }
  }
}

const OrderToolbarCont = connect(
  mapStateToProps,
  mapDispatchToProps
)(OrderToolbar)

export default OrderToolbarCont
