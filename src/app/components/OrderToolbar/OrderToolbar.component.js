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

import IconButton from 'material-ui/IconButton'
import NavigationClose from 'material-ui/svg-icons/navigation/close'
import Divider from 'material-ui/Divider'
import Drawer from 'material-ui/Drawer'
import AppBar from 'material-ui/AppBar'

import Badge from 'material-ui/Badge'
import Avatar from 'material-ui/Avatar'

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

const AllCards = (props) =>
  <div>
    <div>
      <Card initiallyExpanded>
        <CardHeader title='Locks and keys' subtitle={props.order.human_readable_id} actAsExpander showExpandableButton />
        <CardText expandable>
          <OrderForm />
        </CardText>
      </Card>
    </div>
    <Divider />
    <div>
      <Card initiallyExpanded>
        <CardHeader title='Order information' subtitle={props.order.human_readable_id} actAsExpander showExpandableButton />
        <CardText expandable>
          <OrderInformation order={props.order} />
        </CardText>
      </Card>
    </div>
    <Divider />
    <div>
      <Card initiallyExpanded>
        <CardHeader title='Contact information' subtitle={props.order.human_readable_id} actAsExpander showExpandableButton />
        <CardText expandable>
          <ContactInformation order={props.order} />
        </CardText>
      </Card>
    </div>
  </div>

class OrderToolbar extends React.Component {
  v (values) {
    // TODO dispatch actions to store changes on submit
  }

  render () {
    let { handleSubmit } = this.props // from reduxForm
    let { selectedEntry, setSelectedOrder } = this.props
    let isEmptyObject = (obj) => {
      Object.keys(obj).length === 0 && obj.constructor === Object
    }
    return <div>
      {selectedEntry &&
        <Drawer width={300} openSecondary open={isEmptyObject(selectedEntry)}>
          <AppBar
            title={'Order #' + selectedEntry.human_readable_id}
            showMenuIconButton={false}
            iconElementRight={<IconButton><NavigationClose /></IconButton>}
            onRightIconButtonTouchTap={() => setSelectedOrder()}
          />
          <div>
            <AllCards order={selectedEntry} onSubmit={handleSubmit(this.v)} />
          </div>
        </Drawer>
      }
    </div>
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
