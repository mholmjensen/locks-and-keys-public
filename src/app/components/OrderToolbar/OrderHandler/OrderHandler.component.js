/* @flow */

import React from 'react'
import { Field, reduxForm } from 'redux-form'
import { cyan500 } from 'material-ui/styles/colors'

import { List, ListItem } from 'material-ui/List'
import TextField from 'material-ui/TextField'

import Badge from 'material-ui/Badge'
import Avatar from 'material-ui/Avatar'
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

const OrderHandler = (props) => {
  const { pristine, submitting, saveOrderData } = props
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
  order: React.PropTypes.object,
  saveOrderData: React.PropTypes.func
}

// Decorate the form component
export default OrderHandler
