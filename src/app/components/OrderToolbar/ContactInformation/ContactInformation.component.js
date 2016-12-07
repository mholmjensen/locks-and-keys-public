/* @flow */

import React from 'react'

import {List, ListItem} from 'material-ui/List'

import LocationOn from 'material-ui/svg-icons/communication/location-on'
import Contacts from 'material-ui/svg-icons/communication/contacts'
import Business from 'material-ui/svg-icons/communication/business'
import Phone from 'material-ui/svg-icons/communication/phone'
import Email from 'material-ui/svg-icons/communication/email'

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

ContactInformation.propTypes = {
  order: React.PropTypes.object
}

// Decorate the form component
export default ContactInformation
