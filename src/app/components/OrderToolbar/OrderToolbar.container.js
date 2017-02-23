
import {connect} from 'react-redux'
import OrderToolbar from './OrderToolbar.component'
import {setSelectedOrder} from '../../actions/orders'

const mapStateToProps = (state, ownProps) => {
  return {
    selectedEntry: state.orders.selectedEntry
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
