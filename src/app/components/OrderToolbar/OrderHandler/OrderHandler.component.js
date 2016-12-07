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
      <Field name='locks_handed_out' label='Locks handed out' component={renderTextField} />
      <Field name='locks_returned' label='Locks returned' component={renderTextField} />
      <Field name='keys_handed_out' label='Keys handed out' component={renderTextField} />
      <Field name='keys_returned' label='Keys returned' component={renderTextField} />
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
