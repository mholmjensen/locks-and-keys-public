/* @flow */

import React from 'react'
import {connect} from 'react-redux'
import {firebase, helpers} from 'redux-react-firebase'
import {Field, reduxForm, formValueSelector} from 'redux-form'

import TextField from 'material-ui/TextField'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import ContentSave from 'material-ui/svg-icons/content/save'
import IconButton from 'material-ui/IconButton'
import ReceiptIcon from 'material-ui/svg-icons/action/receipt'
import {Link} from 'react-router'

import s from './OrderHandler.css'

const renderTextField = ({input, label, meta: { touched, error }, ...custom}) => (
  <TextField fullWidth hintText={label}
    floatingLabelText={label}
    errorText={touched && error}
    {...input}
    {...custom}
  />
)
renderTextField.propTypes = {
  label: React.PropTypes.string,
  input: React.PropTypes.object,
  meta: React.PropTypes.object
}
let baseicon = {
  width: 36,
  height: 36
}
const styles = {
  iconHandedOut: {
    ...baseicon,
    color: '#ec5400'
  },
  iconReturned: {
    ...baseicon
  },
  medium: {
    width: 72,
    height: 72,
    padding: 18
  }
}
const selector = formValueSelector('toolbar')

@firebase()
@connect(
  (state, props) => ({
    locksAndKeys: helpers.dataToJS(state.firebase, `locksAndKeys`)
  })
)
@connect(
  state => ({
    formPayload: {
      locksHandedOut: selector(state, 'locksHandedOut') || '',
      locksReturned: selector(state, 'locksReturned') || '',
      keysHandedOut: selector(state, 'keysHandedOut') || '',
      keysReturned: selector(state, 'keysReturned') || '',
      notes: selector(state, 'notes') || ''
    }
  })
)
class OrderHandler extends React.Component {
  render () {
    let {order, formPayload, firebase, setSelectedOrder, toolbarSaveable} = this.props
    let onSave = () => {
      firebase.set('locksAndKeys/' + order._id, formPayload)
      .then((x) => {
        let savedOrder = Object.assign({}, order)
        Object.keys(formPayload).forEach((k) => {
          savedOrder[k] = formPayload[k]
        })
        setSelectedOrder(savedOrder)
      })
      .catch((err) => {
        console.warn('failed trying firebase.set(', 'locksAndKeys/' + order._id, formPayload, ')', err)
        setSelectedOrder(order)
      })
    }
    return (
      <div>
        <div>
          <form>
            <Field name='locksHandedOut' label='Locks handed out' component={renderTextField} />
            <Field name='locksReturned' label='Locks returned' component={renderTextField} />
            <Field name='keysHandedOut' label='Keys handed out' component={renderTextField} />
            <Field name='keysReturned' label='Keys returned' component={renderTextField} />
            <Field name='notes' label='Notes' multiLine component={renderTextField} />
          </form>
        </div>
        <div className={s.actionRow}>
          <Link to={order.human_readable_id + '/handedout'} target='_blank'>
            <IconButton iconStyle={styles.iconHandedOut} style={styles.medium}>
              <ReceiptIcon />
            </IconButton>
          </Link>
          <Link to={order.human_readable_id + '/returned'} target='_blank'>
            <IconButton iconStyle={styles.iconReturned} style={styles.medium}>
              <ReceiptIcon />
            </IconButton>
          </Link>
          <div className={s.flexspacer} />
          <div>
            <FloatingActionButton disabled={!toolbarSaveable} onClick={onSave}>
              <ContentSave />
            </FloatingActionButton>
          </div>
        </div>
      </div>
    )
  }
}
OrderHandler.propTypes = {
  order: React.PropTypes.object.isRequired,
  locksAndKeys: React.PropTypes.object,
  firebase: React.PropTypes.object,
  formPayload: React.PropTypes.object,
  toolbarSaveable: React.PropTypes.bool.isRequired,
  setSelectedOrder: React.PropTypes.func.isRequired
}
// Decorate the form component
export default reduxForm({
  form: 'toolbar', // a unique name for this form
  enableReinitialize: true
})(OrderHandler)
