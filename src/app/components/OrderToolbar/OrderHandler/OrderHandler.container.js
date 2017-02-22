
import {connect} from 'react-redux'
import OrderHandler from './OrderHandler.component'

const mapStateToProps = (state, ownProps) => {
  return {
    initialValues: state.orders.selectedEntry // redux-form intialization
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
  }
}

const OrderHandlerCont = connect(
  mapStateToProps,
  mapDispatchToProps
)(OrderHandler)

export default OrderHandlerCont
