
import {connect} from 'react-redux'
import OrderToolbar from './OrderToolbar.component'
import lakutil from '../../utils'
import {setSelectedOrder} from '../../actions/orders'

const mapStateToProps = (state, ownProps) => {
  return {
    selectedEntry: state.orders.selectedEntry,
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

const OrderToolbarCont = connect(
  mapStateToProps,
  mapDispatchToProps
)(OrderToolbar)

export default OrderToolbarCont
