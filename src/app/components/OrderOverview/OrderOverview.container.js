import {connect} from 'react-redux'
import {setSelectedOrder} from '../../actions/orders'
import lakutil from '../../utils'
import OrderOverview from './OrderOverview.component'

const mapStateToProps = (state, ownProps) => {
  return {
    selectedEntry: state.orders.selectedEntry,
    entriesLoaded: state.orders.entriesLoaded,
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

const OrderOverviewCont = connect(
  mapStateToProps,
  mapDispatchToProps
)(OrderOverview)

export default OrderOverviewCont
