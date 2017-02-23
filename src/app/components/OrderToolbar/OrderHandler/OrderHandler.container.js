
import {connect} from 'react-redux'
import OrderHandler from './OrderHandler.component'
import lakutil from '../../../utils'
import {setSelectedOrder} from '../../../actions/orders'

const mapStateToProps = (state, ownProps) => {
  return {
    initialValues: state.orders.selectedEntry, // redux-form intialization
    toolbarSaveable: lakutil.toolbarSaveable(state.form.toolbar)
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    'setSelectedOrder': (order) => {
      dispatch(setSelectedOrder(order))
    }
  }
}

const OrderHandlerCont = connect(
  mapStateToProps,
  mapDispatchToProps
)(OrderHandler)

export default OrderHandlerCont
