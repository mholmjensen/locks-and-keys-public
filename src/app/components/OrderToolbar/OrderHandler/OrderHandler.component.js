/* @flow */

import React from 'react'
import {Field} from 'redux-form'

import TextField from 'material-ui/TextField'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import ContentSave from 'material-ui/svg-icons/content/save'
import IconButton from 'material-ui/IconButton'
import ReceiptIcon from 'material-ui/svg-icons/action/assignment'
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

const OrderHandler = ({onSave, formSaveable, orderId}) => {
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
        <Link to={orderId + '/handedout'}>
          <IconButton iconStyle={styles.iconHandedOut} style={styles.medium}>
            <ReceiptIcon />
          </IconButton>
        </Link>
        <Link to={orderId + '/returned'}>
          <IconButton iconStyle={styles.iconReturned} style={styles.medium}>
            <ReceiptIcon />
          </IconButton>
        </Link>
        <div className={s.flexspacer} />
        <div>
          <FloatingActionButton disabled={!formSaveable} onClick={onSave}>
            <ContentSave />
          </FloatingActionButton>
        </div>
      </div>
    </div>
  )
}

OrderHandler.propTypes = {
  onSave: React.PropTypes.func.isRequired,
  formSaveable: React.PropTypes.bool.isRequired,
  orderId: React.PropTypes.number.isRequired
}

export default OrderHandler
