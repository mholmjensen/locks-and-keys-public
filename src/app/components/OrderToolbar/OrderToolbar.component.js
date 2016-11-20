/* @flow */

import React from 'react'
import { Field, reduxForm } from 'redux-form'
import s from './OrderToolbar.css'

import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card'
import {List, ListItem} from 'material-ui/List'
import ContentInbox from 'material-ui/svg-icons/content/inbox'
import Contacts from 'material-ui/svg-icons/communication/contacts'

import FloatingActionButton from 'material-ui/FloatingActionButton'
import ContentSave from 'material-ui/svg-icons/content/save'

import TextField from 'material-ui/TextField'
import Divider from 'material-ui/Divider'

const renderTextField = ({ input, label, meta: { touched, error }, ...custom }) => (
  <TextField hintText={label}
    floatingLabelText={label}
    errorText={touched && error}
    {...input}
    {...custom}
  />
)

const OrderForm = (props) => {
  const { pristine, submitting } = props
  return <div>
    <form>
      <Field name='locks_handed_out' label='Locks handed out' component={renderTextField} />
      <Field name='keys_handed_out' label='Keys handed out' component={renderTextField} />
      <Field name='locks_returned' label='Locks returned' component={renderTextField} />
      <Field name='keys_returned' label='Keys returned' component={renderTextField} />
      <FloatingActionButton disabled={pristine || submitting}>
        <ContentSave />
      </FloatingActionButton>
    </form>
  </div>
}

const OrderInformation = (props) => {
  const { order } = props
  return (
    <div>
      <List>
        <ListItem primaryText='Inbox' leftIcon={<ContentInbox />} />
        <ListItem primaryText='Inbox' leftIcon={<Contacts />} />
      </List>
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
        {selectedEntry && <div>
          <Card initiallyExpanded>
            <CardHeader title='Nøglehåndtering' actAsExpander showExpandableButton />
            <CardText expandable>
              <OrderForm onSubmit={handleSubmit(this.v)} />
            </CardText>
          </Card>
          <Card initiallyExpanded>
            <CardHeader title='Ordredetaljer' actAsExpander showExpandableButton />
            <CardText expandable>
              <OrderInformation order={selectedEntry} />
            </CardText>
          </Card>
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
