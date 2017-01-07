/* @flow */

import React from 'react'
import {Field} from 'redux-form'
import TextField from 'material-ui/TextField'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import ContentSave from 'material-ui/svg-icons/content/save'

const renderTextField = ({ input, label, meta: { touched, error }, ...custom }) => (
  <TextField hintText={label}
    floatingLabelText={label}
    errorText={touched && error}
    {...input}
    {...custom}
  />
)

const OrderHandler = ({ pristine, submitting, saveOrderData }) => {
  return <div>
    <form>
      <Field name='locksHandedOut' label='Locks handed out' component={renderTextField} />
      <Field name='locksReturned' label='Locks returned' component={renderTextField} />
      <Field name='keysHandedOut' label='Keys handed out' component={renderTextField} />
      <Field name='keysReturned' label='Keys returned' component={renderTextField} />
      <FloatingActionButton disabled={pristine || submitting} onClick={saveOrderData}>
        <ContentSave />
      </FloatingActionButton>
    </form>
  </div>
}

OrderHandler.propTypes = {
  saveOrderData: React.PropTypes.func
}

export default OrderHandler
