
import {connect} from 'react-redux'
import OrderToolbar from './OrderToolbar.component'
import {setSelectedOrder} from '../../actions/orders'
import {formValueSelector} from 'redux-form'

const selector = formValueSelector('toolbar')

function makeFormPayload (state) {
  let locksHandedOut = selector(state, 'locksHandedOut') || ''
  let locksReturned = selector(state, 'locksReturned') || ''
  let keysHandedOut = selector(state, 'keysHandedOut') || ''
  let keysReturned = selector(state, 'keysReturned') || ''
  let notes = selector(state, 'notes') || ''
  return {
    locksHandedOut,
    locksReturned,
    keysHandedOut,
    keysReturned,
    notes
  }
}

function payloadDifferFromSelected (fp, e, key) {
  if (e && e[key]) {
    return e[key] !== fp[key] // form has a different value
  } else if (e && !e[key]) { // No data stored about e[key] (the order)
    return fp[key] !== '' // form has a non empty value
  }
  return false
}

function formPayloadDiffers (fp, e) {
  let differs = payloadDifferFromSelected(fp, e, 'locksHandedOut')
  differs = differs || payloadDifferFromSelected(fp, e, 'locksReturned')
  differs = differs || payloadDifferFromSelected(fp, e, 'keysHandedOut')
  differs = differs || payloadDifferFromSelected(fp, e, 'keysReturned')
  return differs || payloadDifferFromSelected(fp, e, 'notes')
}

const mapStateToProps = (state, ownProps) => {
  let formPayload = makeFormPayload(state)
  let saveable = formPayloadDiffers(formPayload, state.orders.selectedEntry)
  return {
    selectedEntry: state.orders.selectedEntry,
    formPayload, // TODO refactor into OrderHandler.container.js
    formSaveable: saveable,
    initialValues: state.orders.selectedEntry // redux-form intialization
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
