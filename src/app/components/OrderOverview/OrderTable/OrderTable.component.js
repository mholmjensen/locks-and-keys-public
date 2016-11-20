/* @flow */
import React from 'react'
import s from './OrderTable.css'

import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow} from 'material-ui/Table'
import { Field, reduxForm } from 'redux-form'

import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'

import Order from './../order/Order.container'

const renderTextField = ({ input, label, meta: { touched, error }, ...custom }) => (
  <TextField hintText={label}
    floatingLabelText={label}
    errorText={touched && error}
    {...input}
    {...custom}
  />
)

const HeaderRow = () =>
  <TableRow>
    <TableHeaderColumn tooltip='Order number' style={{'width': 70}}>#</TableHeaderColumn>
    <TableHeaderColumn tooltip='Stand name, number and location'>Stand</TableHeaderColumn>
    <TableHeaderColumn tooltip='Contact details'>Contact</TableHeaderColumn>
    <TableHeaderColumn tooltip='Locks (handed out, returned) and Keys (handed out, returned)'>Management</TableHeaderColumn>
  </TableRow>

class OrderTable extends React.Component {
  render () {
    let { orders, selectedId, reset } = this.props
    return (
      <Table height='800px' fixedHeader selectable>
        <TableHeader displaySelectAll={false}>
          <TableRow>
            <TableHeaderColumn colSpan='3' style={{textAlign: 'center'}}>
              <div className={s.superheader}>
                <RaisedButton label='Clear filter' onClick={() => reset()} />
                <Field name='lookup' label='Search' component={renderTextField} />
              </div>
            </TableHeaderColumn>
          </TableRow>
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
  lookup: React.PropTypes.string,
  selectedId: React.PropTypes.string,
  setSelectedOrder: React.PropTypes.func
}

export default reduxForm({
  form: 'tablefilter' // a unique name for this
})(OrderTable)
