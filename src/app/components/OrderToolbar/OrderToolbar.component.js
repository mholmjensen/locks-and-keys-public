/* @flow */

import React from 'react'
import { Field, reduxForm } from 'redux-form'
import s from './OrderToolbar.css'

import {Card, CardHeader, CardText} from 'material-ui/Card'
import {List, ListItem} from 'material-ui/List'
import {cyan500} from 'material-ui/styles/colors'

import LocationOn from 'material-ui/svg-icons/communication/location-on'
import Contacts from 'material-ui/svg-icons/communication/contacts'
import Business from 'material-ui/svg-icons/communication/business'
import Phone from 'material-ui/svg-icons/communication/phone'
import Email from 'material-ui/svg-icons/communication/email'

import FloatingActionButton from 'material-ui/FloatingActionButton'
import ContentSave from 'material-ui/svg-icons/content/save'

import Badge from 'material-ui/Badge'
import Avatar from 'material-ui/Avatar'
// import Receipt from 'material-ui/svg-icons/action/receipt'
import TextField from 'material-ui/TextField'

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
      <Field name='locks_returned' label='Locks returned' component={renderTextField} />
      <Field name='keys_handed_out' label='Keys handed out' component={renderTextField} />
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
    <List>
      {
        order.PlumbingItem.map(item => {
          if (item.quantity > 0) {
            let letter = item.name === 'Toilet A' ? 'A' : 'B'
            letter = !item.name.startsWith('Toilet') ? 'U' : letter
            return (
              <ListItem key={item.name}
                leftAvatar={<Avatar>{letter}</Avatar>}
                rightIcon={<Badge badgeContent={item.quantity} badgeStyle={{'top': -5, color: cyan500}}>{item.price}</Badge>}
                primaryText={item.name}
                secondaryText={item.description}
                secondaryTextLines={2}
              />
            )
          }
        })
      }
    </List>
  )
}

const ContactInformation = (props) => {
  const { order } = props
  return (
    <div>
      <List>
        <ListItem primaryText={order.contact_name} leftIcon={<Contacts />} />
        <ListItem primaryText={order.contact_phone} leftIcon={<Phone />} />
        <ListItem primaryText={order.contact_email} leftIcon={<Email />} />
        <ListItem primaryText={order.people_pro_location} leftIcon={<LocationOn />} />
        <ListItem primaryText={order.organisation_name} leftIcon={<Business />} />
      </List>
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
          <div className='container'>
            <div className='row'>
              <div className='col-md-4'>
                <Card initiallyExpanded>
                  <CardHeader title='Locks and keys' actAsExpander showExpandableButton />
                  <CardText expandable>
                    <OrderForm onSubmit={handleSubmit(this.v)} />
                  </CardText>
                </Card>
              </div>
              <div className='col-md-4'>
                <Card initiallyExpanded>
                  <CardHeader title='Order information' actAsExpander showExpandableButton />
                  <CardText expandable>
                    <OrderInformation order={selectedEntry} />
                  </CardText>
                </Card>
              </div>
              <div className='col-md-4'>
                <Card initiallyExpanded>
                  <CardHeader title='Contact information' actAsExpander showExpandableButton />
                  <CardText expandable>
                    <ContactInformation order={selectedEntry} />
                  </CardText>
                </Card>
              </div>
            </div>
          </div>
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
