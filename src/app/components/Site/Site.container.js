
import {connect} from 'react-redux'
import Site from './Site.component'
import {setOrdersLoaded, setOrders} from '../../actions/orders'

const mapStateToProps = (state, ownProps) => {
  return {
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    'clearOrders': () => {
      dispatch(setOrdersLoaded([]))
      dispatch(setOrders())
    }
  }
}

const SiteCont = connect(
  mapStateToProps,
  mapDispatchToProps
)(Site)

export default SiteCont
