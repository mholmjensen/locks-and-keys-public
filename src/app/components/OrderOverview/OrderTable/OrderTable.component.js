/* @flow */
import React from 'react'
import s from './OrderTable.css'

import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow} from 'material-ui/Table'
import { Field, reduxForm } from 'redux-form'

import TextField from 'material-ui/TextField'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'

import Avatar from 'material-ui/Avatar';
import Chip from 'material-ui/Chip';
import Badge from 'material-ui/Badge';
import DoneAll from 'material-ui/svg-icons/action/done-all'
import SearchIcon from 'material-ui/svg-icons/action/search'
import CloseIcon from 'material-ui/svg-icons/navigation/close'

import Order from './../order/Order.container'

const renderTextField = ({ input, label, meta: { touched, error }, ...custom }) => (
  <TextField hintText={label}
    floatingLabelText={label}
    errorText={touched && error}
    {...input}
    {...custom}
  />
)

const renderSelectField = ({ input, label, meta: { touched, error }, children, ...custom }) => (
  <SelectField
    floatingLabelText={label}
    errorText={touched && error}
    {...input}
    onChange={(event, index, value) => input.onChange(value)}
    children={children}
    {...custom}/>
)

const HeaderRow = () =>
  <TableRow>
    <TableHeaderColumn tooltip='Order number' style={{'width': 70}}>#</TableHeaderColumn>
    <TableHeaderColumn tooltip='Stand name, number and location'>Stand</TableHeaderColumn>
    <TableHeaderColumn tooltip='Contact details'>Contact</TableHeaderColumn>
    <TableHeaderColumn tooltip='Locks (handed out, returned) and Keys (handed out, returned)'>Management</TableHeaderColumn>
  </TableRow>

class OrderTable extends React.Component {
  displaySearchHelp () {
    // TODO implement this action for showing modal dialog with explanation
    // Or implement stored searches
  }
  render () {
    let { orders, selectedId, reset, lookup, resultCount } = this.props
    let clearSearchStyle = lookup !== '' ? {} : {opacity: '0.1'}
    let onChange = (v) => console.log(v)
    return (
      <Table fixedHeader selectable>
        <TableHeader displaySelectAll={false}>
          <TableRow>
            <TableHeaderColumn colSpan='3' style={{textAlign: 'center'}}>
              <div className={s.superheader}>
                <div className={s.searchflex}>
                  <SearchIcon />
                  <Field name='lookup' label='Search' component={renderTextField} style={{width: '80%'}}/>
                  <CloseIcon label='Clear search entry' onClick={() => reset()} style={clearSearchStyle}/>
                </div>
                <div>
                  <Chip onTouchTap={this.displaySearchHelp}>
                    <Avatar size={32}>{orders.length}</Avatar>
                    results
                  </Chip>
                </div>
                <div>
                  <Field name='resultCount' floatingLabelText='Results limit' value={resultCount} component={renderSelectField}>
                    <MenuItem value={20} primaryText='20' />
                    <MenuItem value={50} primaryText='50' />
                    <MenuItem value={100} primaryText='100' />
                  </Field>
                </div>
              </div>
            </TableHeaderColumn>
          </TableRow>
          <HeaderRow />
        </TableHeader>
        <TableBody displayRowCheckbox deselectOnClickaway showRowHover stripedRows>
          {orders.map(order => {
            let is = order._id === selectedId
            return (
              <Order key={order._id} order={order} isSelected={is} />
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
  resultCount: React.PropTypes.number,
  selectedId: React.PropTypes.string,
  setSelectedOrder: React.PropTypes.func
}

export default reduxForm({
  form: 'datafilter' // a unique name for this
})(OrderTable)
