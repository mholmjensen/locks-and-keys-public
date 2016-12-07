/* @flow */

import React from 'react'

import { List, ListItem } from 'material-ui/List'
import { cyan500 } from 'material-ui/styles/colors'

import Badge from 'material-ui/Badge'
import Avatar from 'material-ui/Avatar'

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

OrderInformation.propTypes = {
  order: React.PropTypes.object
}

// Decorate the form component
export default OrderInformation
