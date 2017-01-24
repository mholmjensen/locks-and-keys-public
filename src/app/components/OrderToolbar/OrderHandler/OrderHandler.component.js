/* @flow */

import React from 'react'
import {Field} from 'redux-form'
import TextField from 'material-ui/TextField'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import ContentSave from 'material-ui/svg-icons/content/save'

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

const OrderHandler = ({onSave, formSaveable}) => {
  return <div>
    <form>
      <Field name='locksHandedOut' label='Locks handed out' component={renderTextField} />
      <Field name='locksReturned' label='Locks returned' component={renderTextField} />
      <Field name='keysHandedOut' label='Keys handed out' component={renderTextField} />
      <Field name='keysReturned' label='Keys returned' component={renderTextField} />
      <Field name='notes' label='Notes' multiLine component={renderTextField} />
    </form>
    <FloatingActionButton disabled={!formSaveable} onClick={onSave}>
      <ContentSave />
    </FloatingActionButton>
  </div>
}

OrderHandler.propTypes = {
  onSave: React.PropTypes.func,
  formSaveable: React.PropTypes.bool
}

export default OrderHandler
