
import { connect } from 'react-redux'
import OrderToolbar from './OrderToolbar.component'
import { setSelectedOrder, saveOrderData } from '../../actions/orders'
import { formValueSelector } from 'redux-form'

const selector = formValueSelector('toolbar')

const mapStateToProps = (state, ownProps) => {
  let locksHandedOut = selector(state, 'locksHandedOut') || ''
  let locksReturned = selector(state, 'locksReturned') || ''
  let keysHandedOut = selector(state, 'keysHandedOut') || ''
  let keysReturned = selector(state, 'keysReturned') || ''
  let formPayload = {
    locksHandedOut,
    locksReturned,
    keysHandedOut,
    keysReturned
  }
  return { // Becomes Props on Selection
    selectedEntry: state.orders.selectedEntry,
    formPayload,
    initialValues: state.orders.selectedEntry // redux-form intialization
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    'setSelectedOrder': (order) => {
      dispatch(setSelectedOrder(order))
    },
    'saveOrderData': (uuid, values) => {
      dispatch(saveOrderData(uuid, values))
    }
  }
}

const OrderToolbarCont = connect(
  mapStateToProps,
  mapDispatchToProps
)(OrderToolbar)

export default OrderToolbarCont
