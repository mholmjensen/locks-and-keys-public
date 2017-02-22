
import {connect} from 'react-redux'
import Receipt from './Receipt.component'
const mapStateToProps = (state, ownProps) => {
  return {
    orders: state.orders.entries
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
  }
}

const ReceiptCont = connect(
  mapStateToProps,
  mapDispatchToProps
)(Receipt)

export default ReceiptCont
