/* @flow */

import React from 'react'
import { Field, reduxForm } from 'redux-form'
import s from './OrderToolbar.css'

const PlainStringField = (field) => {
  return (
    <div className={s.editableInputRow + ' form-group'}>
      <label>{field.label}</label><br />
      <input {...field.input} type='text' />
      {field.meta.touched && field.meta.error &&
        <span className='error'>{field.meta.error}</span>}
    </div>
  )
}

const OrderForm = (props) => {
  const { pristine, submitting } = props
  return <div>
    <form className='form-inline'>
      <Field name='locks_handed_out' label='Locks handed out' component={PlainStringField} />
      <Field name='keys_handed_out' label='Keys handed out' component={PlainStringField} />
      <Field name='locks_returned' label='Locks returned' component={PlainStringField} />
      <Field name='keys_returned' label='Keys returned' component={PlainStringField} />
      <div>
        <button className='btn btn-default' type='button' disabled={pristine || submitting}>Submit</button>
      </div>
    </form>
  </div>
}

const OrderInformation = (props) => {
  const { order } = props
  return (
    <div>
      <p>
        Bestillingen foretaget af <a href={order.Creator.email}>{order.Creator.name}</a>
      </p>
      <ul>
        {
          order.PlumbingItem.map(item => {
            return (
              <li key={item.name}>
                {item.name} // {item.description} // {item.price} // {item.quantity}
              </li>
            )
          })
        }
      </ul>
    </div>
  )
}

class OrderToolbar extends React.Component {
  v (values) {
    // Do something with the form values
    console.log(values)
  }
  render () {
    let { handleSubmit } = this.props // from reduxForm
    let { selectedEntry } = this.props
    return (
      <div className={s.root}>
        <h2>Ordrebehandling</h2>
        {selectedEntry && <div>
          <OrderInformation order={selectedEntry} />
          <OrderForm onSubmit={handleSubmit(this.v)} />
        </div>}
      </div>
    )
  }
}

OrderToolbar.propTypes = {
  selectedEntry: React.PropTypes.object
}

// Decorate the form component
export default reduxForm({
  form: 'toolbar', // a unique name for this form
  enableReinitialize: true
})(OrderToolbar)
