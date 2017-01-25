/* @flow */
import React from 'react'

import {TableRow, TableRowColumn} from 'material-ui/Table'
import LockOpen from 'material-ui/svg-icons/action/lock-open'
import VpnKey from 'material-ui/svg-icons/communication/vpn-key'

let iconstyle = {'height': 16, 'width': 16}
let handedOutColor = '#ec5400'

export default class Order extends React.Component {
  render () {
    let {order, isSelected, setSelectedOrder} = this.props
    let clickHandler = (e) => setSelectedOrder(order)
    return (
      <TableRow key={order._id} selected={isSelected} onClick={(e) => clickHandler(e)}>
        <TableRowColumn style={{'width': 70}}>{order.human_readable_id}</TableRowColumn>
        <TableRowColumn>{order.stand_name}<br /> {order.stand_number}</TableRowColumn>
        <TableRowColumn>{order.Creator.name}<br />{order.Creator.email}</TableRowColumn>
        <TableRowColumn>{order.contact_name}<br />{order.contact_email}<br />{order.contact_phone}</TableRowColumn>
        <TableRowColumn>{order.people_pro_location}</TableRowColumn>
        <TableRowColumn>
          {
            order.PlumbingItem.map(item => {
              if (item.quantity > 0) {
                let letter = item.name === 'Toilet A' ? 'A' : 'B'
                letter = !item.name.startsWith('Toilet') ? 'U' : letter
                return (
                  <span key={item.name} style={{'marginRight': '1.5em'}}>
                    {item.quantity}{letter}
                  </span>
                )
              }
            })
          }
        </TableRowColumn>
        <TableRowColumn>{order.OrderStatus}</TableRowColumn>
        <TableRowColumn>
          <div className='container'>
            <div className='row'>
              <div className='col-xs-1'>
                <LockOpen color={handedOutColor} style={iconstyle} /> {order.locksHandedOut}
              </div>
              <div className='col-xs-1'>
                <LockOpen style={iconstyle} /> {order.locksReturned}
              </div>
            </div>
            <div className='row'>
              <div className='col-xs-1'>
                <VpnKey color={handedOutColor} style={iconstyle} /> {order.keysHandedOut}
              </div>
              <div className='col-xs-1'>
                <VpnKey style={iconstyle} /> {order.keysReturned}
              </div>
            </div>
          </div>
        </TableRowColumn>
      </TableRow>
    )
  }
}

Order.propTypes = {
  order: React.PropTypes.object,
  isSelected: React.PropTypes.bool,
  setSelectedOrder: React.PropTypes.func
}
