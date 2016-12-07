
import { connect } from 'react-redux'
import OrderToolbar from './OrderToolbar.component'
import { setSelectedOrder, saveOrderData } from '../../actions/orders'
import { formValueSelector } from 'redux-form';

const selector = formValueSelector('toolbar')

const mapStateToProps = (state, ownProps) => {
  let locks_handed_out = selector(state, 'locks_handed_out')
  let locks_returned = selector(state, 'locks_returned')
  let keys_handed_out = selector(state, 'keys_handed_out')
  let keys_returned = selector(state, 'keys_returned')
  let formPayload = {
    locks_handed_out,
    locks_returned,
    keys_handed_out,
    keys_returned
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
