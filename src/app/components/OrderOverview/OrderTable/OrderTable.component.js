/* @flow */
import React from 'react'

import {Table, TableBody, TableFooter, TableHeader, TableHeaderColumn, TableRow} from 'material-ui/Table'

import Order from './../order/Order.container'

const HeaderRow = () =>
  <TableRow>
    <TableHeaderColumn tooltip='The ID'>ID</TableHeaderColumn>
    <TableHeaderColumn tooltip='The Name'>Name</TableHeaderColumn>
    <TableHeaderColumn tooltip='The Status'>Status</TableHeaderColumn>
    <TableHeaderColumn tooltip='Lobenummer'>Lobenummer</TableHeaderColumn>
  </TableRow>

export default class OrderTable extends React.Component {
  render () {
    let { orders, selectedId } = this.props
    return (
      <Table height='300px' fixedHeader fixedFooter selectable>
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
        <TableFooter>
          <HeaderRow />
        </TableFooter>
      </Table>
    )
  }
}

OrderTable.propTypes = {
  orders: React.PropTypes.array,
  selectedId: React.PropTypes.string,
  setSelectedOrder: React.PropTypes.func
}
