/* @flow */
import React from 'react'

import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow} from 'material-ui/Table'

import Order from './../order/Order.container'

const HeaderRow = () =>
  <TableRow>
    <TableHeaderColumn tooltip='Order number' style={{'width': 70}}>#</TableHeaderColumn>
    <TableHeaderColumn tooltip='Stand name, number and location'>Stand</TableHeaderColumn>
    <TableHeaderColumn tooltip='Contact details'>Contact</TableHeaderColumn>
    <TableHeaderColumn tooltip='Locks (handed out, returned) and Keys (handed out, returned)'>Management</TableHeaderColumn>
  </TableRow>

export default class OrderTable extends React.Component {
  render () {
    let { orders, selectedId } = this.props
    return (
      <Table height='400px' fixedHeader selectable>
        <TableHeader displaySelectAll={false}>
          <HeaderRow />
        </TableHeader>
        <TableBody displayRowCheckbox deselectOnClickaway showRowHover stripedRows>
          {orders.map(order => {
            let is = order.PlumbingOrder._id === selectedId
            return (
              <Order key={order.PlumbingOrder._id} order={order.PlumbingOrder} isSelected={is} />
            )
          })}
        </TableBody>
      </Table>
    )
  }
}

OrderTable.propTypes = {
  orders: React.PropTypes.array,
  selectedId: React.PropTypes.string,
  setSelectedOrder: React.PropTypes.func
}
