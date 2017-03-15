
import {connect} from 'react-redux'
import DataContext from './DataContext.component'

import {clearOrders, getOrdersAsync} from '../../actions/orders'
const mapStateToProps = (state, ownProps) => {
  return {
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    'clearOrders': function () {
      dispatch(clearOrders())
    },
    'getOrdersAsync': () => {
      return dispatch(getOrdersAsync())
    }
  }
}

const DataContextCont = connect(
  mapStateToProps,
  mapDispatchToProps
)(DataContext)

export default DataContextCont
