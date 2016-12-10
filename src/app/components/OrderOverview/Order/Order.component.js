/* @flow */
import React from 'react'
import s from './Order.css'

import {TableRow, TableRowColumn} from 'material-ui/Table'
import LockOpen from 'material-ui/svg-icons/action/lock-open'
import VpnKey from 'material-ui/svg-icons/communication/vpn-key'

let iconstyle = {'height': 16, 'width': 16}
let returnedColor = '#ec5400'
export default class Order extends React.Component {
  render () {
    let { order, isSelected, setSelectedOrder } = this.props
    let clickHandler = (e) => setSelectedOrder(order)
    return (
      <TableRow key={order._id} selected={isSelected} onClick={(e) => clickHandler(e)}>
        <TableRowColumn style={{'width': 70}}>{order.human_readable_id}</TableRowColumn>
        <TableRowColumn>{order.stand_name}<br /> {order.people_pro_location}<br /> {order.stand_number}</TableRowColumn>
        <TableRowColumn>{order.contact_name}<br />{order.contact_email}<br />{order.contact_phone}</TableRowColumn>
        <TableRowColumn>
          <div className='container'>
            <div className='row'>
              <div className='col-xs-2'>
                <LockOpen style={iconstyle} /> {order.locks_handed_out}
              </div>
              <div className='col-xs-2'>
                <LockOpen color={returnedColor} style={iconstyle} /> {order.locks_returned}
              </div>
            </div>
            <div className='row'>
              <div className='col-xs-2'>
                <VpnKey style={iconstyle} /> {order.keys_handed_out}
              </div>
              <div className='col-xs-2'>
                <VpnKey color={returnedColor} style={iconstyle} /> {order.keys_returned}
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
