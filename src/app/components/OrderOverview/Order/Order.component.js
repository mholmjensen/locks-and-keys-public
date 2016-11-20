/* @flow */
import React from 'react'
import s from './Order.css'

import {TableRow, TableRowColumn} from 'material-ui/Table'

export default class Order extends React.Component {
  render () {
    let { order, isSelected, setSelectedOrder } = this.props
    let clickHandler = (e) => setSelectedOrder(order)
    return (
      <TableRow key={order._id} selected={isSelected} onClick={(e) => clickHandler(e)}>
        <TableRowColumn>xYx</TableRowColumn>
        <TableRowColumn>{order.stand_name}</TableRowColumn>
        <TableRowColumn>{order.contact_name}</TableRowColumn>
        <TableRowColumn>{order.human_readable_id}</TableRowColumn>
      </TableRow>
    )
  }
}

Order.propTypes = {
  order: React.PropTypes.object,
  isSelected: React.PropTypes.bool,
  setSelectedOrder: React.PropTypes.func
}
